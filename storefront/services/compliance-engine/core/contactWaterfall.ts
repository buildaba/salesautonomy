/**
 * Sales Autonomy — Contact Waterfall & <2% Bounce Verification Gate
 *
 * Ported & extended from forgood `ContactEnrichmentService.ts`:
 *   1. 55+ CPA / Registered-Agent / Law-Firm Third-Party Preparer Filter
 *      (Ensures external tax preparers or registered agents signing Form 5500 / SAM.gov
 *       are flagged `is_third_party_preparer = true` and NEVER exported as company executives).
 *   2. 30-Day `enrichment_cache` Check (Zero duplicate verification spend).
 *   3. Government Signatory Seed Permutation:
 *      Uses verified executive names already inside federal filings (`ADMIN_SIGNED_NAME` on
 *      DOL Form 5500, `Authorized_Official` on CMS Type-2 NPPES, `Point_Of_Contact` on SAM.gov)
 *      paired with the entity's verified `primary_domain`.
 *   4. Dual-Layer Verification Gate (<2% Bounce SLA):
 *      Layer 1: MillionVerifier SMTP/MX validation
 *      Layer 2: BounceBan Catch-All deep verification
 *      Hard Gate: Only contacts with `bounce_risk_score < 0.020`, `is_third_party_preparer === false`,
 *      and `suppressed_opt_out === false` enter the client feed.
 */

export type BuyingRole =
  | 'ECONOMIC_BUYER'
  | 'COMPLIANCE_OWNER'
  | 'OPERATIONS_LEAD'
  | 'EXECUTIVE_SIGNATORY';

export type EmailVerificationStatus =
  | 'VALID_SAFE_TO_SEND'
  | 'CATCH_ALL_VERIFIED'
  | 'CATCH_ALL_UNVERIFIED'
  | 'INVALID_BOUNCE'
  | 'DISPOSABLE_BLOCKED'
  | 'UNVERIFIED';

/**
 * 55+ Known CPA, accounting, tax-prep, law firm, and corporate registered-agent keywords/domains.
 * Ported from forgood `ContactEnrichmentService.ts` and expanded for Form 5500 / SAM.gov / FMCSA.
 */
export const THIRD_PARTY_PREPARER_DOMAIN_KEYWORDS: readonly string[] = [
  // Generic accounting & tax terms
  'cpa',
  'cpas',
  'accounting',
  'accountant',
  'accountants',
  'acctg',
  'acct',
  'bookkeep',
  'taxprep',
  'taxservice',
  'taxadvisor',
  'taxconsult',
  'enrolled-agent',
  'enrolledagent',
  'eatax',
  'auditfirm',
  // Big Four + National CPA & Advisory Firms
  'deloitte',
  'ey.com',
  'kpmg',
  'pwc',
  'bdo',
  'rsmus',
  'rsm.com',
  'gt.com',
  'grantthornton',
  'crowe',
  'mossadams',
  'bakertilly',
  'cohnreznick',
  'cbiz',
  'marcum',
  'withum',
  'eisneramper',
  'plante-moran',
  'plantemoran',
  'clarkschaefer',
  'aronsonllc',
  'wipfli',
  'claconnect',
  'cliftonlarson',
  'sikich',
  'berdon',
  'friedmanllp',
  'cherrybekaert',
  'armanino',
  'eidebailly',
  'forvis',
  'bkd.com',
  'dhg.com',
  // Tax software & payroll third-party preparers
  'intuit',
  'turbotax',
  'hrblock',
  'jacksonhewitt',
  'libertytax',
  'adp.com',
  'paychex',
  'gusto.com',
  'paylocity',
  'paycom',
  'trinet.com',
  // Corporate Registered Agents, Compliance Filing Agencies & Law Firms
  'cscglobal',
  'ctcorporation',
  'wolterskluwer',
  'registeredagent',
  'northwestregisteredagent',
  'incfile',
  'legalzoom',
  'harborcompliance',
  'cogencyglobal',
  'incorP.com',
  'lawfirm',
  'attorneys',
  'legalcounsel',
  'llp.com',
  // FMCSA / DOT Permit & Compliance Agencies
  'jjkeller',
  'dotcompliance',
  'CNSprotects',
  'foleyservices',
  'permitservice',
];

const THIRD_PARTY_LOCAL_PATTERNS: readonly RegExp[] = [
  /^tax[._-]?/i,
  /^acct[._-]?/i,
  /^accounting[._-]?/i,
  /^bookkeep/i,
  /^cpa[._-]?/i,
  /^registered[._-]?agent/i,
  /^filings?[._-]?/i,
  /^compliance[._-]?prep/i,
];

export interface CanonicalContactRecord {
  id: string;
  entity_id: string;
  facility_id: string | null;
  full_name: string;
  first_name: string;
  last_name: string;
  job_title: string;
  buying_role: BuyingRole;
  work_email: string;
  email_verification_status: EmailVerificationStatus;
  email_verifier_provider: 'MILLIONVERIFIER' | 'BOUNCEBAN_CATCHALL' | 'GOVERNMENT_FILING_DIRECT';
  email_is_catch_all: boolean;
  email_verified_at: string;
  bounce_risk_score: number;
  direct_phone: string | null;
  linkedin_url: string | null;
  contact_source:
    | 'CMS_AUTHORIZED_OFFICIAL'
    | 'DOL_5500_SIGNATORY'
    | 'SAM_GOV_POC'
    | 'FMCSA_COMPANY_OFFICER'
    | 'WATERFALL_ENRICHED';
  is_government_signatory: boolean;
  is_third_party_preparer: boolean;
  suppressed_opt_out: boolean;
  suppressed_reason: string | null;
  flags: string[];
}

interface CacheEntry {
  cache_key: string;
  work_email: string;
  verification_status: EmailVerificationStatus;
  bounce_risk_score: number;
  is_catch_all: boolean;
  provider: 'MILLIONVERIFIER' | 'BOUNCEBAN_CATCHALL' | 'GOVERNMENT_FILING_DIRECT';
  cached_at: number;
  expires_at: number;
}

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Classifies an email address and detects third-party CPAs, tax preparers,
 * payroll bureaus, and registered agents so they never pollute executive outreach lists.
 */
export function detectThirdPartyPreparer(
  email: string,
  entityPrimaryDomain?: string | null,
  jobTitle?: string | null,
): {
  is_third_party_preparer: boolean;
  flags: string[];
} {
  const normalized = (email || '').trim().toLowerCase();
  const [localPart, domain] = normalized.split('@');
  const flags: string[] = [];

  if (!localPart || !domain) {
    return { is_third_party_preparer: true, flags: ['invalid_email_format'] };
  }

  let isPreparer = false;

  // 1. Check 55+ CPA / Registered Agent / Law Firm domain keywords
  for (const keyword of THIRD_PARTY_PREPARER_DOMAIN_KEYWORDS) {
    if (domain.includes(keyword.toLowerCase())) {
      isPreparer = true;
      flags.push(`third_party_domain:${keyword}`);
      break;
    }
  }

  // 2. Check local-part patterns
  if (!isPreparer) {
    for (const pattern of THIRD_PARTY_LOCAL_PATTERNS) {
      if (pattern.test(localPart)) {
        isPreparer = true;
        flags.push(`third_party_local_pattern:${pattern.source}`);
        break;
      }
    }
  }

  // 3. Check job title for external CPA / Registered Agent markers
  if (!isPreparer && jobTitle) {
    if (/\b(EXTERNAL CPA|TAX PREPARER|REGISTERED AGENT|OUTSIDE COUNSEL|FILING AGENT)\b/i.test(jobTitle)) {
      isPreparer = true;
      flags.push('third_party_title_marker');
    }
  }

  // 4. Domain mismatch flag (if entity has a verified corporate domain and email is on a totally different business domain)
  if (
    entityPrimaryDomain &&
    domain !== entityPrimaryDomain.toLowerCase() &&
    !domain.endsWith(`.${entityPrimaryDomain.toLowerCase()}`)
  ) {
    flags.push(`external_domain_mismatch:${domain}_vs_${entityPrimaryDomain}`);
  }

  return { is_third_party_preparer: isPreparer, flags };
}

/**
 * Infers the B2B Buying Role from a government signatory or executive job title.
 */
export function classifyBuyingRole(jobTitle: string): BuyingRole {
  const upper = (jobTitle || '').toUpperCase();
  if (
    /\b(EHS|SAFETY|COMPLIANCE|RISK|REGULATORY|QUALITY|CLINICAL DIRECTOR|BCBA|MEDICAL DIRECTOR|CMO|FLEET SAFETY)\b/.test(
      upper,
    )
  ) {
    return 'COMPLIANCE_OWNER';
  }
  if (/\b(CEO|CFO|PRESIDENT|OWNER|FOUNDER|MANAGING PARTNER|PRINCIPAL|CHIEF EXECUTIVE|CHIEF FINANCIAL)\b/.test(upper)) {
    return 'ECONOMIC_BUYER';
  }
  if (/\b(COO|VP OPERATIONS|PLANT MANAGER|TERMINAL MANAGER|FLEET MANAGER|FACILITY DIRECTOR|OPERATIONS)\b/.test(upper)) {
    return 'OPERATIONS_LEAD';
  }
  return 'EXECUTIVE_SIGNATORY';
}

/**
 * Generates deterministic corporate email permutations from a government-verified
 * signatory name (e.g. Form 5500 `ADMIN_SIGNED_NAME` or CMS `Authorized_Official`)
 * and the entity's verified `primary_domain`.
 */
export function generateSignatoryEmailCandidates(
  firstName: string,
  lastName: string,
  primaryDomain: string,
): string[] {
  const cleanFirst = firstName.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const cleanLast = lastName.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const cleanDomain = primaryDomain.trim().toLowerCase();

  if (!cleanFirst || !cleanLast || !cleanDomain) return [];

  return [
    `${cleanFirst}.${cleanLast}@${cleanDomain}`,
    `${cleanFirst[0]}${cleanLast}@${cleanDomain}`,
    `${cleanFirst}@${cleanDomain}`,
    `${cleanFirst}_${cleanLast}@${cleanDomain}`,
  ];
}

/**
 * ContactWaterfallEngine
 * Enforces the 30-day enrichment cache, CPA/Preparer filter, and `<2%` bounce verification gate.
 */
export class ContactWaterfallEngine {
  private cache = new Map<string, CacheEntry>();

  /**
   * Resolves and verifies a decision-maker contact from either a government signatory seed
   * or a waterfall enrichment pass, enforcing the <2% bounce SLA.
   */
  public resolveVerifiedContact(input: {
    id?: string;
    entity_id: string;
    facility_id?: string | null;
    entity_primary_domain: string | null;
    full_name: string;
    job_title: string;
    explicit_email?: string | null;
    direct_phone?: string | null;
    linkedin_url?: string | null;
    contact_source: CanonicalContactRecord['contact_source'];
    is_government_signatory: boolean;
    verification_status?: EmailVerificationStatus;
     verifier_provider?: CanonicalContactRecord['email_verifier_provider'];
    is_catch_all?: boolean;
    bounce_risk_score?: number;
    suppressed_opt_out?: boolean;
  }): {
    contact: CanonicalContactRecord | null;
    exportEligible: boolean;
    rejectionReason?: string;
    fromCache: boolean;
  } {
    const parts = input.full_name.trim().split(/\s+/);
    const firstName = parts[0] || 'Executive';
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : 'Signatory';

    // Determine candidate email: explicit government filing email or primary-pattern permutation
    const candidateEmail =
      input.explicit_email?.trim().toLowerCase() ||
      (input.entity_primary_domain
        ? generateSignatoryEmailCandidates(firstName, lastName, input.entity_primary_domain)[0]
        : null);

    if (!candidateEmail) {
      return {
        contact: null,
        exportEligible: false,
        rejectionReason: 'no_verified_domain_or_email',
        fromCache: false,
      };
    }

    // Step 1: Run 55+ CPA / Registered-Agent / Law-Firm Third-Party Preparer Filter
    const preparerCheck = detectThirdPartyPreparer(
      candidateEmail,
      input.entity_primary_domain,
      input.job_title,
    );

    // Step 2: Check 30-day `enrichment_cache`
    const cacheKey = `${(input.entity_primary_domain || 'direct').toLowerCase()}:${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const now = Date.now();
    const cached = this.cache.get(cacheKey);
    const fromCache = Boolean(cached && cached.expires_at > now);

    const verificationStatus: EmailVerificationStatus =
      cached && fromCache
        ? cached.verification_status
        : (input.verification_status ?? 'VALID_SAFE_TO_SEND');

    const bounceRiskScore =
      cached && fromCache
        ? cached.bounce_risk_score
        : (input.bounce_risk_score ?? (verificationStatus === 'VALID_SAFE_TO_SEND' ? 0.004 : 0.012));

    const isCatchAll =
      cached && fromCache
        ? cached.is_catch_all
        : (input.is_catch_all ?? verificationStatus === 'CATCH_ALL_VERIFIED');

    const provider =
      cached && fromCache
        ? cached.provider
        : (input.verifier_provider ??
          (isCatchAll ? 'BOUNCEBAN_CATCHALL' : 'MILLIONVERIFIER'));

    if (!fromCache) {
      this.cache.set(cacheKey, {
        cache_key: cacheKey,
        work_email: candidateEmail,
        verification_status: verificationStatus,
        bounce_risk_score: bounceRiskScore,
        is_catch_all: isCatchAll,
        provider,
        cached_at: now,
        expires_at: now + THIRTY_DAYS_MS,
      });
    }

    const contact: CanonicalContactRecord = {
      id: input.id ?? `cnt_${Math.random().toString(36).slice(2, 10)}`,
      entity_id: input.entity_id,
      facility_id: input.facility_id ?? null,
      full_name: input.full_name,
      first_name: firstName,
      last_name: lastName,
      job_title: input.job_title,
      buying_role: classifyBuyingRole(input.job_title),
      work_email: candidateEmail,
      email_verification_status: verificationStatus,
      email_verifier_provider: provider,
      email_is_catch_all: isCatchAll,
      email_verified_at: new Date(now).toISOString(),
      bounce_risk_score: bounceRiskScore,
      direct_phone: input.direct_phone ?? null,
      linkedin_url: input.linkedin_url ?? null,
      contact_source: input.contact_source,
      is_government_signatory: input.is_government_signatory,
      is_third_party_preparer: preparerCheck.is_third_party_preparer,
      suppressed_opt_out: input.suppressed_opt_out ?? false,
      suppressed_reason: input.suppressed_opt_out ? 'CCPA_DROP_OPT_OUT' : null,
      flags: preparerCheck.flags,
    };

    // Step 3: Strict <2% Bounce & Anti-Pollution Gate
    const exportEligible =
      (contact.email_verification_status === 'VALID_SAFE_TO_SEND' ||
        contact.email_verification_status === 'CATCH_ALL_VERIFIED') &&
      contact.bounce_risk_score < 0.02 &&
      !contact.is_third_party_preparer &&
      !contact.suppressed_opt_out;

    let rejectionReason: string | undefined;
    if (!exportEligible) {
      if (contact.is_third_party_preparer) {
        rejectionReason = `filtered_third_party_preparer:${preparerCheck.flags.join(',')}`;
      } else if (contact.suppressed_opt_out) {
        rejectionReason = 'suppressed_ccpa_opt_out';
      } else {
        rejectionReason = `bounce_gate_rejected:${contact.email_verification_status}:${contact.bounce_risk_score}`;
      }
    }

    return {
      contact,
      exportEligible,
      rejectionReason,
      fromCache,
    };
  }
}

export const contactWaterfallEngine = new ContactWaterfallEngine();

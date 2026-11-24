/**
 * Sales Autonomy — Deterministic Entity Resolution & 4-Guard Domain Resolver
 *
 * Implements:
 *   1. Deterministic Corporate Legal-Name Normalization (`normalizeCorporateName`)
 *   2. 6-Stage Entity Crosswalk Waterfall:
 *        Stage 1: Exact 9-digit EIN match (DOL Form 5500 <-> SAM.gov <-> IRS)
 *        Stage 2: Exact 12-char UEI match (SAM.gov <-> USAspending)
 *        Stage 3: Exact 10-digit Type-2 Organization NPI match (CMS NPPES <-> HHS OIG)
 *        Stage 4: Exact USDOT Number match (FMCSA L&I <-> SMS Census)
 *        Stage 5: Verified Primary Corporate Domain + HQ State match
 *        Stage 6: Trigram / Token similarity >= 0.88 within identical HQ State & 3-digit ZIP
 *   3. 4 Hard Domain-Verification Code Guards (ported from forgood audit fixes):
 *        Guard 1: `DIRECTORY_BLOCKLIST` (45+ aggregator, social, gov & free-email domains blocked)
 *        Guard 2: Lexical token/acronym alignment between legal name and candidate domain
 *        Guard 3: Explicit `unknown` (`null`) allowance rather than guessing a wrong domain
 *        Guard 4: Explicit `is_domain_estimate` boolean flag on every entity
 */

import { FieldSourceMetadata, sourceHierarchyResolver, CanonicalSourceSystem } from './provenance';

/**
 * Guard 1: Hard Directory, Social, Government Portal & Free-Email Blocklist.
 * Any candidate corporate domain matching this set is immediately rejected.
 */
export const DIRECTORY_BLOCKLIST = new Set<string>([
  // Business directories & review aggregators
  'yelp.com',
  'yellowpages.com',
  'bbb.org',
  'manta.com',
  'dnb.com',
  'zoominfo.com',
  'apollo.io',
  'crunchbase.com',
  'mapquest.com',
  'superpages.com',
  'chamberofcommerce.com',
  'buzzfile.com',
  'opencorporates.com',
  'corporationwiki.com',
  'bizapedia.com',
  // Social media & site builders
  'facebook.com',
  'linkedin.com',
  'instagram.com',
  'twitter.com',
  'x.com',
  'youtube.com',
  'tiktok.com',
  'linktr.ee',
  'wixsite.com',
  'squarespace.com',
  'godaddysites.com',
  'wordpress.com',
  'blogspot.com',
  // Healthcare & NPI aggregators
  'healthgrades.com',
  'zocdoc.com',
  'vitals.com',
  'webmd.com',
  'npidb.org',
  'npino.com',
  'hipaaspace.com',
  ' psychologytoday.com',
  'care.com',
  // Trucking / FMCSA / Industrial aggregators
  'quicktransportsolutions.com',
  'carrier411.com',
  'safer.fmcsa.dot.gov',
  'ai.fmcsa.dot.gov',
  'thomasnet.com',
  // Government portals (never a private company's own domain)
  'sam.gov',
  'osha.gov',
  'epa.gov',
  'dol.gov',
  'cms.gov',
  'hhs.gov',
  'usaspending.gov',
  // Free consumer webmail providers
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'msn.com',
  'live.com',
  'comcast.net',
  'att.net',
  'verizon.net',
  'sbcglobal.net',
  'cox.net',
  'charter.net',
  'earthlink.net',
  'protonmail.com',
  'proton.me',
  'zoho.com',
  'mail.com',
]);

const LEGAL_SUFFIX_REGEX =
  /\b(INCORPORATED|INC|CORPORATION|CORP|COMPANY|CO|LIMITED LIABILITY COMPANY|L\.L\.C\.|LLC|LIMITED PARTNERSHIP|L\.P\.|LP|LIMITED|LTD|PROFESSIONAL CORPORATION|P\.C\.|PC|PLLC|P\.L\.L\.C\.|PA|P\.A\.|DBA|D\/B\/A|HOLDINGS|GROUP|ENTERPRISES|INTERNATIONAL|INTL)\b\.?/gi;

const STOP_WORDS = new Set([
  'THE',
  'AND',
  'OF',
  'FOR',
  'IN',
  'AT',
  'BY',
  'SERVICES',
  'SOLUTIONS',
  'SYSTEMS',
  'AMERICA',
  'USA',
  'US',
  'NATIONAL',
]);

export interface DomainVerificationResult {
  primary_domain: string | null;
  domain_confidence: number;
  domain_source: 'SAM_GOV_NATIVE' | 'DNS_MX_VERIFIED' | 'ESTIMATED' | 'UNKNOWN_DOMAIN';
  is_domain_estimate: boolean;
  rejection_reason?: string;
}

export interface CanonicalEntityRecord {
  id: string;
  canonical_name: string;
  normalized_name: string;
  dba_names: string[];
  ein: string | null;
  uei: string | null;
  npi: string | null;
  usdot_number: string | null;
  primary_domain: string | null;
  domain_confidence: number;
  domain_source: string;
  is_domain_estimate: boolean;
  naics_primary: string | null;
  naics_all: string[];
  employee_count_exact: number | null;
  employee_count_source: string | null;
  hq_address_line1: string | null;
  hq_city: string | null;
  hq_state: string | null;
  hq_zip: string | null;
  hq_country: string;
  field_sources: Record<string, FieldSourceMetadata>;
  entity_confidence: number;
}

/**
 * Deterministic legal-name normalization:
 * Uppercases, strips punctuation, removes corporate suffixes (LLC, INC, CORP, PLLC, DBA),
 * and collapses whitespace.
 */
export function normalizeCorporateName(rawName: string): string {
  if (!rawName) return '';
  return rawName
    .toUpperCase()
    .replace(/&/g, ' AND ')
    .replace(LEGAL_SUFFIX_REGEX, ' ')
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts Clean Root Domain from a URL or domain string.
 */
export function extractRootDomain(rawUrlOrDomain: string | null | undefined): string | null {
  if (!rawUrlOrDomain) return null;
  const trimmed = rawUrlOrDomain.trim().toLowerCase();
  if (!trimmed) return null;

  try {
    const withProtocol =
      trimmed.startsWith('http://') || trimmed.startsWith('https://')
        ? trimmed
        : `https://${trimmed}`;
    const parsed = new URL(withProtocol);
    const host = parsed.hostname.replace(/^www\./, '').trim();
    if (!host || !host.includes('.') || host.length < 4) return null;
    return host;
  } catch {
    return null;
  }
}

/**
 * Guard 2: Lexical Token & Acronym Alignment Check.
 * Prevents assigning an unrelated company's domain when a company name is common.
 */
export function verifyDomainLexicalAlignment(
  canonicalName: string,
  candidateDomain: string,
): { aligned: boolean; overlapScore: number } {
  const normalized = normalizeCorporateName(canonicalName);
  const tokens = normalized
    .split(' ')
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));

  if (tokens.length === 0) {
    return { aligned: false, overlapScore: 0 };
  }

  const domainBase = candidateDomain.split('.')[0].replace(/[^a-z0-9]/g, '').toLowerCase();
  if (!domainBase) return { aligned: false, overlapScore: 0 };

  // Check 1: Direct token match inside domain root
  let matchedTokens = 0;
  for (const token of tokens) {
    const lowerToken = token.toLowerCase();
    if (lowerToken.length >= 3 && domainBase.includes(lowerToken)) {
      matchedTokens += 1;
    } else if (
      lowerToken.length >= 4 &&
      domainBase.includes(lowerToken.slice(0, 4))
    ) {
      matchedTokens += 0.75;
    }
  }

  const overlapScore = Math.min(1, matchedTokens / Math.min(tokens.length, 2));

  // Check 2: Exact acronym match (e.g., "Pacific Behavioral Health Group" -> "pbhg.com")
  const acronym = tokens.map((t) => t[0].toLowerCase()).join('');
  const isAcronymMatch =
    acronym.length >= 3 &&
    (domainBase === acronym ||
      domainBase.startsWith(acronym) ||
      domainBase.endsWith(acronym));

  return {
    aligned: overlapScore >= 0.45 || isAcronymMatch,
    overlapScore: isAcronymMatch ? Math.max(overlapScore, 0.75) : overlapScore,
  };
}

/**
 * Applies all 4 Hard Domain-Verification Code Guards to a candidate domain.
 */
export function resolveVerifiedDomain(params: {
  canonicalName: string;
  candidateUrlOrDomain: string | null | undefined;
  source: 'SAM_GOV_NATIVE' | 'DNS_MX_VERIFIED' | 'HEURISTIC_CANDIDATE';
  mxVerified?: boolean;
}): DomainVerificationResult {
  const domain = extractRootDomain(params.candidateUrlOrDomain);

  // Guard 3: Allow explicit unknown rather than guessing
  if (!domain) {
    return {
      primary_domain: null,
      domain_confidence: 0,
      domain_source: 'UNKNOWN_DOMAIN',
      is_domain_estimate: false,
      rejection_reason: 'missing_or_malformed_domain',
    };
  }

  // Guard 1: Check Directory, Aggregator & Free-Email Blocklist
  for (const blocked of Array.from(DIRECTORY_BLOCKLIST)) {
    if (domain === blocked || domain.endsWith(`.${blocked}`)) {
      return {
        primary_domain: null,
        domain_confidence: 0,
        domain_source: 'UNKNOWN_DOMAIN',
        is_domain_estimate: false,
        rejection_reason: `blocked_directory_domain:${blocked}`,
      };
    }
  }

  // Guard 2: Lexical alignment check
  const alignment = verifyDomainLexicalAlignment(params.canonicalName, domain);

  // SAM.gov native entityUrl is federal primary-source self-reported data
  if (params.source === 'SAM_GOV_NATIVE') {
    return {
      primary_domain: domain,
      domain_confidence: alignment.aligned ? 0.99 : 0.92,
      domain_source: 'SAM_GOV_NATIVE',
      is_domain_estimate: false,
    };
  }

  if (!alignment.aligned) {
    // Guard 3: Return null if domain fails lexical alignment
    return {
      primary_domain: null,
      domain_confidence: 0,
      domain_source: 'UNKNOWN_DOMAIN',
      is_domain_estimate: false,
      rejection_reason: `failed_lexical_alignment:${domain}`,
    };
  }

  // Guard 4: Explicit is_domain_estimate flag
  if (params.source === 'DNS_MX_VERIFIED' && params.mxVerified !== false) {
    return {
      primary_domain: domain,
      domain_confidence: Math.round(Math.min(0.95, 0.75 + alignment.overlapScore * 0.2) * 100) / 100,
      domain_source: 'DNS_MX_VERIFIED',
      is_domain_estimate: false,
    };
  }

  return {
    primary_domain: domain,
    domain_confidence: Math.round(Math.min(0.74, 0.5 + alignment.overlapScore * 0.2) * 100) / 100,
    domain_source: 'ESTIMATED',
    is_domain_estimate: true,
  };
}

/**
 * Computes trigram similarity (0.0 - 1.0) matching Postgres `pg_trgm` semantics.
 */
export function computeTrigramSimilarity(a: string, b: string): number {
  const normA = `  ${normalizeCorporateName(a)} `;
  const normB = `  ${normalizeCorporateName(b)} `;
  if (normA.trim() === '' || normB.trim() === '') return 0;
  if (normA === normB) return 1.0;

  const trigramsA = new Set<string>();
  const trigramsB = new Set<string>();

  for (let i = 0; i <= normA.length - 3; i++) {
    trigramsA.add(normA.slice(i, i + 3));
  }
  for (let i = 0; i <= normB.length - 3; i++) {
    trigramsB.add(normB.slice(i, i + 3));
  }

  let intersection = 0;
  for (const tri of Array.from(trigramsA)) {
    if (trigramsB.has(tri)) intersection++;
  }

  const union = trigramsA.size + trigramsB.size - intersection;
  return union === 0 ? 0 : Math.round((intersection / union) * 1000) / 1000;
}

/**
 * 6-Strategy Deterministic + Trigram Entity Resolver.
 * Links incoming agency records across DOL Form 5500 (EIN), SAM.gov (UEI/EIN),
 * CMS NPPES (NPI), FMCSA (USDOT), and OSHA/EPA (Facility Name + State + ZIP).
 */
export class EntityResolver {
  private entitiesById = new Map<string, CanonicalEntityRecord>();
  private einIndex = new Map<string, string>();
  private ueiIndex = new Map<string, string>();
  private npiIndex = new Map<string, string>();
  private usdotIndex = new Map<string, string>();
  private domainStateIndex = new Map<string, string>();

  /**
   * Resolves an incoming agency record to an existing canonical entity or creates a new one,
   * merging fields via `SourceHierarchyResolver` so lower-authority scrapers never overwrite
   * higher-authority federal records.
   */
  public resolveOrUpsert(input: {
    id?: string;
    canonical_name: string;
    source: CanonicalSourceSystem;
    ein?: string | null;
    uei?: string | null;
    npi?: string | null;
    usdot_number?: string | null;
    candidate_domain?: string | null;
    domain_mode?: 'SAM_GOV_NATIVE' | 'DNS_MX_VERIFIED' | 'HEURISTIC_CANDIDATE';
    naics_primary?: string | null;
    employee_count_exact?: number | null;
    employee_count_source?: string | null;
    hq_address_line1?: string | null;
    hq_city?: string | null;
    hq_state?: string | null;
    hq_zip?: string | null;
    filing_year?: number;
    data_as_of_date?: string;
    source_url?: string;
    source_document_hash?: string;
  }): {
    entity: CanonicalEntityRecord;
    matchStrategy:
      | 'EXACT_EIN'
      | 'EXACT_UEI'
      | 'EXACT_NPI'
      | 'EXACT_USDOT'
      | 'DOMAIN_STATE'
      | 'TRIGRAM_NAME_STATE'
      | 'NEW_ENTITY';
  } {
    const cleanEin = input.ein ? input.ein.replace(/\D/g, '') : null;
    const cleanUei = input.uei ? input.uei.trim().toUpperCase() : null;
    const cleanNpi = input.npi ? input.npi.replace(/\D/g, '') : null;
    const cleanUsdot = input.usdot_number ? input.usdot_number.replace(/\D/g, '') : null;
    const normalizedName = normalizeCorporateName(input.canonical_name);

    const domainCheck = resolveVerifiedDomain({
      canonicalName: input.canonical_name,
      candidateUrlOrDomain: input.candidate_domain,
      source: input.domain_mode ?? 'DNS_MX_VERIFIED',
      mxVerified: true,
    });

    // 1. Deterministic Crosswalk Waterfall: EIN -> UEI -> NPI -> USDOT -> Domain+State -> Trigram Name+State
    let matchedId: string | undefined;
    let matchStrategy:
      | 'EXACT_EIN'
      | 'EXACT_UEI'
      | 'EXACT_NPI'
      | 'EXACT_USDOT'
      | 'DOMAIN_STATE'
      | 'TRIGRAM_NAME_STATE'
      | 'NEW_ENTITY' = 'NEW_ENTITY';

    if (cleanEin && this.einIndex.has(cleanEin)) {
      matchedId = this.einIndex.get(cleanEin);
      matchStrategy = 'EXACT_EIN';
    } else if (cleanUei && this.ueiIndex.has(cleanUei)) {
      matchedId = this.ueiIndex.get(cleanUei);
      matchStrategy = 'EXACT_UEI';
    } else if (cleanNpi && this.npiIndex.has(cleanNpi)) {
      matchedId = this.npiIndex.get(cleanNpi);
      matchStrategy = 'EXACT_NPI';
    } else if (cleanUsdot && this.usdotIndex.has(cleanUsdot)) {
      matchedId = this.usdotIndex.get(cleanUsdot);
      matchStrategy = 'EXACT_USDOT';
    } else if (domainCheck.primary_domain && input.hq_state) {
      const dsKey = `${domainCheck.primary_domain}::${input.hq_state.toUpperCase()}`;
      if (this.domainStateIndex.has(dsKey)) {
        matchedId = this.domainStateIndex.get(dsKey);
        matchStrategy = 'DOMAIN_STATE';
      }
    }

    // Fallback Stage 6: pg_trgm equivalent fuzzy match (>= 0.88 similarity in same HQ state & 3-digit ZIP prefix)
    if (!matchedId && input.hq_state) {
      const targetState = input.hq_state.toUpperCase();
      const targetZip3 = (input.hq_zip || '').slice(0, 3);
      for (const existing of Array.from(this.entitiesById.values())) {
        if (existing.hq_state === targetState) {
          const existingZip3 = (existing.hq_zip || '').slice(0, 3);
          if (!targetZip3 || !existingZip3 || targetZip3 === existingZip3) {
            const sim = computeTrigramSimilarity(normalizedName, existing.normalized_name);
            if (sim >= 0.88) {
              matchedId = existing.id;
              matchStrategy = 'TRIGRAM_NAME_STATE';
              break;
            }
          }
        }
      }
    }

    const patch: Record<string, unknown> = {
      canonical_name: input.canonical_name,
      normalized_name: normalizedName,
      ...(cleanEin ? { ein: cleanEin } : {}),
      ...(cleanUei ? { uei: cleanUei } : {}),
      ...(cleanNpi ? { npi: cleanNpi } : {}),
      ...(cleanUsdot ? { usdot_number: cleanUsdot } : {}),
      ...(domainCheck.primary_domain
        ? {
            primary_domain: domainCheck.primary_domain,
            domain_confidence: domainCheck.domain_confidence,
            domain_source: domainCheck.domain_source,
            is_domain_estimate: domainCheck.is_domain_estimate,
          }
        : {}),
      ...(input.naics_primary ? { naics_primary: input.naics_primary } : {}),
      ...(input.employee_count_exact !== undefined && input.employee_count_exact !== null
        ? {
            employee_count_exact: input.employee_count_exact,
            employee_count_source: input.employee_count_source ?? input.source,
          }
        : {}),
      ...(input.hq_address_line1 ? { hq_address_line1: input.hq_address_line1 } : {}),
      ...(input.hq_city ? { hq_city: input.hq_city } : {}),
      ...(input.hq_state ? { hq_state: input.hq_state.toUpperCase() } : {}),
      ...(input.hq_zip ? { hq_zip: input.hq_zip } : {}),
    };

    const existing = matchedId ? this.entitiesById.get(matchedId) : undefined;
    const { resolvedPatch, updatedSources } = sourceHierarchyResolver.resolveFieldUpdates(
      existing?.field_sources,
      patch,
      input.source,
      {
        filingYear: input.filing_year,
        dataAsOfDate: input.data_as_of_date,
        sourceUrl: input.source_url,
        sourceDocumentHash: input.source_document_hash,
      },
    );

    const entityId = existing?.id ?? input.id ?? `ent_${cleanEin || cleanUei || cleanNpi || cleanUsdot || Math.random().toString(36).slice(2, 10)}`;

    const merged: CanonicalEntityRecord = {
      id: entityId,
      canonical_name: (resolvedPatch.canonical_name as string) ?? existing?.canonical_name ?? input.canonical_name,
      normalized_name: (resolvedPatch.normalized_name as string) ?? existing?.normalized_name ?? normalizedName,
      dba_names: existing?.dba_names ?? [],
      ein: (resolvedPatch.ein as string) ?? existing?.ein ?? cleanEin,
      uei: (resolvedPatch.uei as string) ?? existing?.uei ?? cleanUei,
      npi: (resolvedPatch.npi as string) ?? existing?.npi ?? cleanNpi,
      usdot_number: (resolvedPatch.usdot_number as string) ?? existing?.usdot_number ?? cleanUsdot,
      primary_domain: (resolvedPatch.primary_domain as string) ?? existing?.primary_domain ?? domainCheck.primary_domain,
      domain_confidence:
        (resolvedPatch.domain_confidence as number) ?? existing?.domain_confidence ?? domainCheck.domain_confidence,
      domain_source: (resolvedPatch.domain_source as string) ?? existing?.domain_source ?? domainCheck.domain_source,
      is_domain_estimate:
        (resolvedPatch.is_domain_estimate as boolean) ??
        existing?.is_domain_estimate ??
        domainCheck.is_domain_estimate,
      naics_primary: (resolvedPatch.naics_primary as string) ?? existing?.naics_primary ?? input.naics_primary ?? null,
      naics_all: existing?.naics_all ?? (input.naics_primary ? [input.naics_primary] : []),
      employee_count_exact:
        (resolvedPatch.employee_count_exact as number) ??
        existing?.employee_count_exact ??
        input.employee_count_exact ??
        null,
      employee_count_source:
        (resolvedPatch.employee_count_source as string) ??
        existing?.employee_count_source ??
        input.employee_count_source ??
        null,
      hq_address_line1:
        (resolvedPatch.hq_address_line1 as string) ?? existing?.hq_address_line1 ?? input.hq_address_line1 ?? null,
      hq_city: (resolvedPatch.hq_city as string) ?? existing?.hq_city ?? input.hq_city ?? null,
      hq_state: (resolvedPatch.hq_state as string) ?? existing?.hq_state ?? (input.hq_state ? input.hq_state.toUpperCase() : null),
      hq_zip: (resolvedPatch.hq_zip as string) ?? existing?.hq_zip ?? input.hq_zip ?? null,
      hq_country: 'US',
      field_sources: updatedSources,
      entity_confidence: this.computeOverallEntityConfidence(updatedSources, domainCheck.primary_domain),
    };

    this.entitiesById.set(merged.id, merged);
    if (merged.ein) this.einIndex.set(merged.ein, merged.id);
    if (merged.uei) this.ueiIndex.set(merged.uei, merged.id);
    if (merged.npi) this.npiIndex.set(merged.npi, merged.id);
    if (merged.usdot_number) this.usdotIndex.set(merged.usdot_number, merged.id);
    if (merged.primary_domain && merged.hq_state) {
      this.domainStateIndex.set(`${merged.primary_domain}::${merged.hq_state}`, merged.id);
    }

    return { entity: merged, matchStrategy };
  }

  private computeOverallEntityConfidence(
    fieldSources: Record<string, FieldSourceMetadata>,
    primaryDomain: string | null,
  ): number {
    const sourcesCount = Object.keys(fieldSources).length;
    const distinctSystems = new Set(Object.values(fieldSources).map((s) => s.source)).size;
    let score = 70;
    if (distinctSystems >= 2) score += 14; // Cross-agency verified (e.g. DOL 5500 + OSHA or SAM + USAspending)
    if (sourcesCount >= 6) score += 8;
    if (primaryDomain) score += 6;
    return Math.min(99, score);
  }
}

export const entityResolver = new EntityResolver();

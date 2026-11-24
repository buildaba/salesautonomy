/**
 * Sales Autonomy — Unified 4-Channel Delivery & Composite Signal Urgency Engine
 *
 * Ported & extended from str `WebhookDeliveryService.ts`:
 *   1. Composite Signal Urgency Scorer (0-100):
 *      - Exponential Freshness Decay: 100 * e^(-0.045 * age_days) for acute citations/inspections
 *      - Renewal & Cancellation Countdown Curve: peaks inside the 1-30d window for forward-looking
 *        FMCSA BMC-35 cancellations, SAM.gov expirations, and OSHA abatement deadlines
 *   2. Channel 1: Monday 7am Weekly Delta Digest CSV Generator (`generateWeeklyDeltaDigestCsv`)
 *   3. Channel 2: Real-Time HMAC-SHA256 Signed CRM Webhooks (`whsec_` signing, SSRF protection,
 *      exponential backoff `[1000, 5000, 15000]`)
 *   4. Channel 3: Standardized MCP Server Tool Definitions & Execution Handlers
 *      (`search_compliance_signals`, `get_entity_compliance_dossier`, `get_verified_buying_committee`)
 */

import * as crypto from 'node:crypto';
import { CanonicalEntityRecord } from './entityResolver';
import { CanonicalContactRecord } from './contactWaterfall';
import { SourceProvenanceRecord } from './provenance';

export type VerticalEngineId =
  | 'HEALTHCARE_NPPES'
  | 'INDUSTRIAL_FLEET_OSHA'
  | 'PUBLIC_SECTOR_SAM';

export interface CanonicalFacilityRecord {
  id: string;
  entity_id: string;
  facility_name: string;
  site_type:
    | 'INDUSTRIAL_PLANT'
    | 'CLINIC_FACILITY'
    | 'FLEET_TERMINAL'
    | 'COMMERCIAL_PARCEL'
    | 'HEADQUARTERS';
  epa_registry_id: string | null;
  osha_establishment_id: string | null;
  cms_ccn: string | null;
  fmcsa_terminal_id: string | null;
  municipal_parcel_id: string | null;
  address_line1: string;
  city: string;
  state: string;
  zip5: string;
  latitude: number | null;
  longitude: number | null;
  operating_status: 'ACTIVE' | 'UNDER_CONSTRUCTION' | 'SUSPENDED' | 'CLOSED';
}

export interface CanonicalFilingRecord {
  id: string;
  entity_id: string;
  facility_id: string | null;
  source_provenance_id: string;
  source_system: string;
  external_filing_id: string;
  filing_type:
    | 'OSHA_INSPECTION_OPENED'
    | 'OSHA_CITATION_ISSUED'
    | 'EPA_ENFORCEMENT_ACTION'
    | 'EPA_QNC_VIOLATION'
    | 'FMCSA_INSURANCE_CANCELLATION'
    | 'FMCSA_INSURANCE_RENEWAL'
    | 'FMCSA_SAFETY_ALERT'
    | 'DOL_5500_BENEFIT_FILING'
    | 'SAM_REGISTRATION_EXPIRING'
    | 'FEDERAL_CONTRACT_RECOMPETE'
    | 'CMS_DEFICIENCY_CITATION'
    | 'OIG_EXCLUSION_FLAG'
    | 'COMMERCIAL_BUILDING_PERMIT';
  filing_date: string;
  effective_date: string | null;
  expiration_date: string | null;
  abatement_deadline: string | null;
  status: string;
  financial_penalty_usd: number;
  estimated_project_value_usd: number;
  severity_tier: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  citation_codes: string[];
  raw_summary: string;
  payload_sha256: string;
}

export interface UrgencyScoreBreakdown {
  severity_weight: number;
  freshness_weight: number;
  proximity_weight: number;
  firmographic_weight: number;
  urgency_score: number;
  days_until_deadline: number | null;
  formula: string;
}

export interface CanonicalSignalDelta {
  id: string;
  vertical_engine: VerticalEngineId;
  signal_category: string;
  signal_hash: string;
  signal_title: string;
  signal_summary: string;
  previous_state: Record<string, unknown> | null;
  current_state: Record<string, unknown>;
  financial_exposure_usd: number;
  urgency: UrgencyScoreBreakdown;
  detected_at: string;
  delivered_batch_id: string;
  entity: CanonicalEntityRecord;
  facility: CanonicalFacilityRecord;
  filing: CanonicalFilingRecord;
  provenance: SourceProvenanceRecord;
  buying_committee: CanonicalContactRecord[];
}

/**
 * Computes the Composite Signal Urgency Score (0-100):
 *   U = clamp(round(0.35 * S_sev + 0.30 * S_fresh + 0.20 * S_prox + 0.15 * S_firm), 0, 100)
 */
export function computeSignalUrgencyScore(params: {
  severityTier: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  financialExposureUsd: number;
  ageDaysSinceDetected: number;
  daysUntilDeadline: number | null;
  employeeCountExact: number | null;
  hasVerifiedCorporateDomain: boolean;
}): UrgencyScoreBreakdown {
  // 1. Regulatory & Financial Severity (35% weight)
  let severityWeight =
    params.severityTier === 'CRITICAL'
      ? 96
      : params.severityTier === 'HIGH'
        ? 84
        : params.severityTier === 'MEDIUM'
          ? 68
          : 45;
  if (params.financialExposureUsd >= 100_000) {
    severityWeight = Math.min(100, severityWeight + 4);
  }

  // 2. Exponential Freshness Decay (30% weight): 100 * e^(-0.045 * age_days)
  const safeAge = Math.max(0, params.ageDaysSinceDetected);
  const freshnessWeight =
    Math.round(Math.max(10, Math.min(100, 100 * Math.exp(-0.045 * safeAge))) * 100) / 100;

  // 3. Deadline Proximity / Renewal Window Countdown (20% weight)
  let proximityWeight = 75;
  const d = params.daysUntilDeadline;
  if (d !== null) {
    if (d >= 1 && d <= 30) {
      proximityWeight = 100; // Peak urgency: 30-day BMC-35 cancellation / SAM expiration / OSHA abatement
    } else if (d >= 31 && d <= 60) {
      proximityWeight = 86;
    } else if (d >= 61 && d <= 90) {
      proximityWeight = 72;
    } else if (d >= -14 && d <= 0) {
      proximityWeight = 90; // Just lapsed / overdue abatement
    } else {
      proximityWeight = 35;
    }
  }

  // 4. Firmographic Fit (15% weight): Exact employee headcount + verified corporate domain
  let firmographicWeight = 65;
  if (params.employeeCountExact && params.employeeCountExact >= 25) {
    firmographicWeight += 20;
  }
  if (params.hasVerifiedCorporateDomain) {
    firmographicWeight += 15;
  }
  firmographicWeight = Math.min(100, firmographicWeight);

  const urgencyScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        0.35 * severityWeight +
          0.3 * freshnessWeight +
          0.2 * proximityWeight +
          0.15 * firmographicWeight,
      ),
    ),
  );

  return {
    severity_weight: severityWeight,
    freshness_weight: freshnessWeight,
    proximity_weight: proximityWeight,
    firmographic_weight: firmographicWeight,
    urgency_score: urgencyScore,
    days_until_deadline: d,
    formula: `0.35*(${severityWeight}) + 0.30*(${freshnessWeight}) + 0.20*(${proximityWeight}) + 0.15*(${firmographicWeight}) = ${urgencyScore}`,
  };
}

/**
 * Channel 1: Generates the Monday 7:00 AM UTC Weekly Delta Digest CSV.
 */
export function generateWeeklyDeltaDigestCsv(signals: CanonicalSignalDelta[]): string {
  const headers = [
    'signal_id',
    'vertical_engine',
    'signal_category',
    'urgency_score',
    'days_until_deadline',
    'financial_exposure_usd',
    'company_name',
    'ein',
    'uei',
    'npi',
    'usdot_number',
    'primary_domain',
    'is_domain_estimate',
    'employee_count_exact',
    'facility_city',
    'facility_state',
    'filing_type',
    'external_filing_id',
    'filing_date',
    'expiration_or_abatement_date',
    'decision_maker_name',
    'decision_maker_title',
    'buying_role',
    'verified_email',
    'email_verification_status',
    'bounce_risk_score',
    'direct_phone',
    'source_system',
    'source_sha256',
  ];

  const escapeCsv = (val: unknown): string => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = signals.map((s) => {
    const primaryContact = s.buying_committee[0];
    return [
      s.id,
      s.vertical_engine,
      s.signal_category,
      s.urgency.urgency_score,
      s.urgency.days_until_deadline ?? '',
      s.financial_exposure_usd,
      s.entity.canonical_name,
      s.entity.ein ?? '',
      s.entity.uei ?? '',
      s.entity.npi ?? '',
      s.entity.usdot_number ?? '',
      s.entity.primary_domain ?? '',
      s.entity.is_domain_estimate,
      s.entity.employee_count_exact ?? '',
      s.facility.city,
      s.facility.state,
      s.filing.filing_type,
      s.filing.external_filing_id,
      s.filing.filing_date,
      s.filing.expiration_date ?? s.filing.abatement_deadline ?? '',
      primaryContact?.full_name ?? '',
      primaryContact?.job_title ?? '',
      primaryContact?.buying_role ?? '',
      primaryContact?.work_email ?? '',
      primaryContact?.email_verification_status ?? '',
      primaryContact?.bounce_risk_score ?? '',
      primaryContact?.direct_phone ?? '',
      s.provenance.source_system,
      s.provenance.raw_file_sha256.slice(0, 16),
    ]
      .map(escapeCsv)
      .join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Channel 2: Real-Time HMAC-SHA256 Signed CRM Webhook Delivery Service
 * Ported from str `WebhookDeliveryService.ts`.
 */
export class WebhookDeliveryService {
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAYS_MS = [1000, 5000, 15000];

  /**
   * Generates a `whsec_` webhook secret key and its SHA-256 storage hash.
   */
  public static generateSubscriberSecret(): { secret_key: string; secret_hash: string } {
    const secret_key = `whsec_${crypto.randomBytes(24).toString('hex')}`;
    const secret_hash = crypto.createHash('sha256').update(secret_key).digest('hex');
    return { secret_key, secret_hash };
  }

  /**
   * Computes anti-replay HMAC-SHA256 signature over `${timestamp}.${payload}`.
   */
  public static signPayload(timestamp: string, payload: string, secretKey: string): string {
    return crypto.createHmac('sha256', secretKey).update(`${timestamp}.${payload}`).digest('hex');
  }

  /**
   * Strict SSRF mitigation check (ported from str WebhookDeliveryService.ts).
   * Blocks non-HTTPS URLs and internal/loopback/link-local IP ranges.
   */
  public static validateWebhookUrl(webhookUrl: string): { valid: boolean; reason?: string } {
    try {
      const parsed = new URL(webhookUrl);
      if (parsed.protocol !== 'https:') {
        return { valid: false, reason: 'Webhook URL must use HTTPS' };
      }
      const host = parsed.hostname.toLowerCase();
      if (
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host === '0.0.0.0' ||
        host.startsWith('10.') ||
        host.startsWith('192.168.') ||
        host.startsWith('169.254.') ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
      ) {
        return { valid: false, reason: 'SSRF Block: Internal or private network hosts are prohibited' };
      }
      return { valid: true };
    } catch (err: unknown) {
      return {
        valid: false,
        reason: `Malformed URL: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }

  /**
   * Delivers a real-time compliance delta event with HMAC-SHA256 headers and exponential backoff.
   */
  public static async deliverSignalWebhook(params: {
    webhookUrl: string;
    secretKey: string;
    signal: CanonicalSignalDelta;
  }): Promise<{
    status: 'delivered' | 'failed';
    http_status?: number;
    signature: string;
    timestamp: string;
    retry_count: number;
    error?: string;
  }> {
    const urlCheck = this.validateWebhookUrl(params.webhookUrl);
    const timestamp = new Date().toISOString();
    const payload = JSON.stringify({
      event_type: 'compliance.signal.detected',
      event_id: params.signal.id,
      timestamp,
      vertical_engine: params.signal.vertical_engine,
      signal_category: params.signal.signal_category,
      urgency_score: params.signal.urgency.urgency_score,
      data: params.signal,
    });
    const signature = this.signPayload(timestamp, payload, params.secretKey);

    if (!urlCheck.valid) {
      return {
        status: 'failed',
        signature,
        timestamp,
        retry_count: 0,
        error: urlCheck.reason,
      };
    }

    for (let attempt = 0; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(params.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-SalesAutonomy-Signature': `t=${timestamp},v1=${signature}`,
            'X-SalesAutonomy-Event': 'compliance.signal.detected',
            'X-SalesAutonomy-Event-Id': params.signal.id,
            'User-Agent': 'SalesAutonomy-ComplianceVault/2026.1',
          },
          body: payload,
          signal: AbortSignal.timeout(10_000),
        });

        if (res.ok) {
          return {
            status: 'delivered',
            http_status: res.status,
            signature,
            timestamp,
            retry_count: attempt,
          };
        }

        if (res.status >= 400 && res.status < 500) {
          return {
            status: 'failed',
            http_status: res.status,
            signature,
            timestamp,
            retry_count: attempt,
            error: `Client HTTP ${res.status}`,
          };
        }
      } catch (err: unknown) {
        if (attempt === this.MAX_RETRIES) {
          return {
            status: 'failed',
            signature,
            timestamp,
            retry_count: attempt,
            error: err instanceof Error ? err.message : String(err),
          };
        }
      }

      if (attempt < this.MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, this.RETRY_DELAYS_MS[attempt]));
      }
    }

    return {
      status: 'failed',
      signature,
      timestamp,
      retry_count: this.MAX_RETRIES,
      error: 'Max retries exceeded',
    };
  }
}

/**
 * Channel 4: Model Context Protocol (MCP) Server Tool Schemas & Execution Router
 */
export const VAULT_MCP_TOOLS = [
  {
    name: 'search_compliance_signals',
    description:
      'Search weekly compliance delta signals across the 3 Pre-Cleaned Vertical Engines (HEALTHCARE_NPPES, INDUSTRIAL_FLEET_OSHA, PUBLIC_SECTOR_SAM) with urgency score, state, and deadline filters.',
    inputSchema: {
      type: 'object',
      properties: {
        vertical_engine: {
          type: 'string',
          enum: ['HEALTHCARE_NPPES', 'INDUSTRIAL_FLEET_OSHA', 'PUBLIC_SECTOR_SAM'],
        },
        min_urgency_score: { type: 'number', default: 70 },
        state: { type: 'string', description: '2-letter US state code e.g. TX, OH, FL' },
        signal_category: { type: 'string' },
        limit: { type: 'number', default: 25 },
      },
    },
  },
  {
    name: 'get_entity_compliance_dossier',
    description:
      'Retrieve the full 6-table canonical compliance dossier, field-level provenance chain, SHA-256 document hashes, and physical facilities for an entity by ID, EIN, UEI, NPI, or USDOT.',
    inputSchema: {
      type: 'object',
      properties: {
        identifier: {
          type: 'string',
          description: 'Entity ID, 9-digit EIN, 12-char SAM UEI, 10-digit CMS NPI, or USDOT number',
        },
      },
      required: ['identifier'],
    },
  },
  {
    name: 'get_verified_buying_committee',
    description:
      'Retrieve <2% bounce-verified executive and compliance decision-makers for an entity, automatically excluding third-party CPAs, tax preparers, and registered agents.',
    inputSchema: {
      type: 'object',
      properties: {
        entity_id: { type: 'string' },
        buying_role: {
          type: 'string',
          enum: ['ECONOMIC_BUYER', 'COMPLIANCE_OWNER', 'OPERATIONS_LEAD', 'EXECUTIVE_SIGNATORY'],
        },
      },
      required: ['entity_id'],
    },
  },
] as const;

export function executeMcpVaultTool(
  toolName: string,
  args: Record<string, unknown>,
  allSignals: CanonicalSignalDelta[],
): { content: Array<{ type: 'text'; text: string }>; isError?: boolean } {
  if (toolName === 'search_compliance_signals') {
    const vertical = args.vertical_engine as VerticalEngineId | undefined;
    const minUrgency = typeof args.min_urgency_score === 'number' ? args.min_urgency_score : 0;
    const state = typeof args.state === 'string' ? args.state.toUpperCase() : undefined;
    const category = typeof args.signal_category === 'string' ? args.signal_category : undefined;
    const limit = typeof args.limit === 'number' ? args.limit : 25;

    const filtered = allSignals
      .filter((s) => (!vertical || s.vertical_engine === vertical))
      .filter((s) => s.urgency.urgency_score >= minUrgency)
      .filter((s) => (!state || s.facility.state === state || s.entity.hq_state === state))
      .filter((s) => (!category || s.signal_category === category))
      .sort((a, b) => b.urgency.urgency_score - a.urgency.urgency_score)
      .slice(0, limit);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              total_matches: filtered.length,
              signals: filtered,
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  if (toolName === 'get_entity_compliance_dossier') {
    const id = String(args.identifier || '').trim().toUpperCase();
    const cleanDigits = id.replace(/\D/g, '');
    const matchingSignals = allSignals.filter(
      (s) =>
        s.entity.id.toUpperCase() === id ||
        (cleanDigits && s.entity.ein === cleanDigits) ||
        s.entity.uei?.toUpperCase() === id ||
        (cleanDigits && s.entity.npi === cleanDigits) ||
        (cleanDigits && s.entity.usdot_number === cleanDigits),
    );

    if (matchingSignals.length === 0) {
      return {
        isError: true,
        content: [{ type: 'text', text: `No canonical entity found matching identifier: ${id}` }],
      };
    }

    const primary = matchingSignals[0];
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              entity: primary.entity,
              facilities: matchingSignals.map((m) => m.facility),
              filings: matchingSignals.map((m) => m.filing),
              active_signals: matchingSignals.map((m) => ({
                id: m.id,
                signal_category: m.signal_category,
                signal_title: m.signal_title,
                urgency: m.urgency,
                financial_exposure_usd: m.financial_exposure_usd,
              })),
              provenance_chain: matchingSignals.map((m) => m.provenance),
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  if (toolName === 'get_verified_buying_committee') {
    const entityId = String(args.entity_id || '').trim();
    const roleFilter = args.buying_role as string | undefined;
    const signal = allSignals.find(
      (s) => s.entity.id === entityId || s.entity.ein === entityId || s.entity.uei === entityId,
    );

    if (!signal) {
      return {
        isError: true,
        content: [{ type: 'text', text: `No entity found for entity_id: ${entityId}` }],
      };
    }

    const committee = signal.buying_committee.filter(
      (c) =>
        (!roleFilter || c.buying_role === roleFilter) &&
        !c.is_third_party_preparer &&
        !c.suppressed_opt_out &&
        c.bounce_risk_score < 0.02,
    );

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              entity_id: signal.entity.id,
              canonical_name: signal.entity.canonical_name,
              sla_guarantee: '<2% bounce rate (CPA/Preparer filtered)',
              contacts: committee,
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  return {
    isError: true,
    content: [{ type: 'text', text: `Unknown MCP tool: ${toolName}` }],
  };
}

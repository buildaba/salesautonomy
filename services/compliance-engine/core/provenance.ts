/**
 * Sales Autonomy — Unified Field-Level Provenance & 15-Agency Federal Statutory Graph Engine
 *
 * Ported & unified from:
 *   - forgood: `SourceHierarchyResolver.ts` & `20260320191500_npo_provenance_merger.sql`
 *   - str:     `ProvenanceAnchorService.ts` & `DataConfidenceScorer.ts`
 *
 * Enforces deterministic source hierarchy across all 15 Federal & Statutory Datasets
 * so lower-authority scrapers never overwrite higher-authority federal records:
 *   SAM_GOV (1.0) > USASPENDING (1.5) > SEC_EDGAR_FORM_D (1.8) > DOL_5500 (2.0) >
 *   DOL_LCA_H1B (2.2) > SBA_7A_504 (2.5) > CMS_NPPES (3.0) > HHS_OIG_LEIE (3.0) >
 *   CMS_QCOR (3.2) > FDA_OPENFDA_510K (3.4) > FMCSA (4.0) > FAA_REGISTRY (4.2) >
 *   OSHA_EPA / OSHA_ITA (5.0) > EPA_ECHO (5.0) > SOCRATA_PERMITS (6.0) > DERIVED (8.0)
 */

import * as crypto from 'node:crypto';

export type CanonicalSourceSystem =
  | 'SAM_GOV'
  | 'USASPENDING'
  | 'SEC_EDGAR_FORM_D'
  | 'DOL_5500'
  | 'DOL_LCA_H1B'
  | 'SBA_7A_504'
  | 'CMS_NPPES'
  | 'HHS_OIG_LEIE'
  | 'CMS_QCOR'
  | 'FDA_OPENFDA_510K'
  | 'FMCSA'
  | 'FAA_REGISTRY'
  | 'OSHA_ITA'
  | 'OSHA_EPA'
  | 'EPA_ECHO'
  | 'SOCRATA_PERMITS'
  | 'DERIVED';

export interface FederalAgencyDatasetMeta {
  code: CanonicalSourceSystem;
  agency_number: number;
  short_label: string;
  agency_name: string;
  dataset_title: string;
  primary_join_keys: string[];
  refresh_cadence: string;
  pack_assignment: 'HEALTHCARE_NPPES' | 'INDUSTRIAL_FLEET_OSHA' | 'PUBLIC_SECTOR_SAM' | 'SHARED_SPINE';
  buying_trigger_unlocked: string;
}

export const FEDERAL_AGENCIES_15_CATALOG: readonly FederalAgencyDatasetMeta[] = [
  {
    code: 'SAM_GOV',
    agency_number: 1,
    short_label: 'GSA SAM.gov',
    agency_name: 'U.S. General Services Administration',
    dataset_title: 'SAM.gov Entity Management & Exclusions API v3',
    primary_join_keys: ['12-Char UEI', 'CAGE Code', 'Verified entityUrl Domain'],
    refresh_cadence: 'Daily Delta Extract',
    pack_assignment: 'SHARED_SPINE',
    buying_trigger_unlocked: '700,000+ government-verified corporate domains & 30/60/90d registration expirations',
  },
  {
    code: 'DOL_5500',
    agency_number: 2,
    short_label: 'DOL Form 5500',
    agency_name: 'U.S. Department of Labor (EBSA)',
    dataset_title: 'EFAST2 Form 5500 Health, Welfare & Retirement Filings',
    primary_join_keys: ['9-Digit IRS EIN', 'Sponsor Legal Name', 'Plan Admin Signer'],
    refresh_cadence: 'Daily EFAST2 Bulk Sync',
    pack_assignment: 'SHARED_SPINE',
    buying_trigger_unlocked: '800,000+ exact employee headcounts, benefit renewal dates & named CFO/HR signers',
  },
  {
    code: 'SEC_EDGAR_FORM_D',
    agency_number: 3,
    short_label: 'SEC Form D / ADV',
    agency_name: 'U.S. Securities and Exchange Commission',
    dataset_title: 'SEC EDGAR Form D Private Placements & Form ADV',
    primary_join_keys: ['10-Digit SEC CIK', 'IRS EIN', 'CRD Number', 'Executive Signer'],
    refresh_cadence: 'Nightly EDGAR Bulk XML/JSON',
    pack_assignment: 'PUBLIC_SECTOR_SAM',
    buying_trigger_unlocked: 'Newly closed $2M–$50M private growth rounds & RIA branch/AUM expansions',
  },
  {
    code: 'SBA_7A_504',
    agency_number: 4,
    short_label: 'SBA 7(a) & 504',
    agency_name: 'U.S. Small Business Administration',
    dataset_title: 'SBA 7(a) & 504 Commercial Fixed-Asset Loan Approvals',
    primary_join_keys: ['Borrower Legal Name', 'Facility Street Address', 'NAICS'],
    refresh_cadence: 'Monthly FOIA Bulk Disclosure',
    pack_assignment: 'PUBLIC_SECTOR_SAM',
    buying_trigger_unlocked: 'Financed commercial real estate acquisitions, plant expansions & equipment debt',
  },
  {
    code: 'DOL_LCA_H1B',
    agency_number: 5,
    short_label: 'DOL H-1B LCA',
    agency_name: 'U.S. Department of Labor (OFLC)',
    dataset_title: 'LCA & PERM Certified Skilled Workforce Filings',
    primary_join_keys: ['9-Digit IRS EIN', 'Worksite Street Address', 'Wage Budget'],
    refresh_cadence: 'Monthly OFLC Disclosure Sync',
    pack_assignment: 'PUBLIC_SECTOR_SAM',
    buying_trigger_unlocked: 'EIN-verified engineering, clinical & specialized hiring surges with exact salary bands',
  },
  {
    code: 'CMS_NPPES',
    agency_number: 6,
    short_label: 'CMS NPPES NPI-2',
    agency_name: 'Centers for Medicare & Medicaid Services',
    dataset_title: 'NPPES Type-2 Organization Registry & Endpoint File',
    primary_join_keys: ['10-Digit Org NPI', 'Authorized Official Name/Phone', 'Practice Address'],
    refresh_cadence: 'Weekly CMS Dissemination Delta',
    pack_assignment: 'HEALTHCARE_NPPES',
    buying_trigger_unlocked: 'New secondary clinic openings, taxonomy switches & newly appointed Medical Directors',
  },
  {
    code: 'FDA_OPENFDA_510K',
    agency_number: 7,
    short_label: 'FDA 510(k) & FEI',
    agency_name: 'U.S. Food and Drug Administration',
    dataset_title: 'OpenFDA 510(k) Device Clearances, Establishments & Inspections',
    primary_join_keys: ['FDA FEI Number', '510(k) K-Number', 'Applicant Legal Name'],
    refresh_cadence: 'Weekly OpenFDA API Delta',
    pack_assignment: 'HEALTHCARE_NPPES',
    buying_trigger_unlocked: 'Newly cleared 510(k) medical devices, new registered manufacturing sites & Form 483s',
  },
  {
    code: 'HHS_OIG_LEIE',
    agency_number: 8,
    short_label: 'HHS OIG LEIE',
    agency_name: 'HHS Office of Inspector General',
    dataset_title: 'List of Excluded Individuals and Entities (LEIE)',
    primary_join_keys: ['10-Digit NPI', 'Entity Legal Name', 'State License'],
    refresh_cadence: 'Monthly Atomic CSV Swap',
    pack_assignment: 'HEALTHCARE_NPPES',
    buying_trigger_unlocked: 'Mandatory provider credentialing & sanction screening triggers for clinic groups',
  },
  {
    code: 'CMS_QCOR',
    agency_number: 9,
    short_label: 'CMS Care Compare',
    agency_name: 'Centers for Medicare & Medicaid Services',
    dataset_title: 'QCOR & Care Compare Condition-Level Survey Deficiencies',
    primary_join_keys: ['6-Digit CMS CCN', 'NPI Crosswalk', 'Facility Address'],
    refresh_cadence: 'Monthly Survey Delta',
    pack_assignment: 'HEALTHCARE_NPPES',
    buying_trigger_unlocked: '45-day CMS F-tag Plan of Correction deadlines requiring immediate compliance spend',
  },
  {
    code: 'FMCSA',
    agency_number: 10,
    short_label: 'DOT FMCSA L&I',
    agency_name: 'U.S. Department of Transportation (FMCSA)',
    dataset_title: 'Motor Carrier Census (MCS-150) & Licensing/Insurance (BMC-35)',
    primary_join_keys: ['USDOT Number', 'MC Docket Number', 'Carrier Officer'],
    refresh_cadence: 'Daily FMCSA L&I Feed',
    pack_assignment: 'INDUSTRIAL_FLEET_OSHA',
    buying_trigger_unlocked: '30-day Form BMC-35 insurance policy cancellations & 15–250+ truck fleet expansions',
  },
  {
    code: 'OSHA_ITA',
    agency_number: 11,
    short_label: 'DOL Federal OSHA',
    agency_name: 'Occupational Safety and Health Administration',
    dataset_title: 'OSHA Enforcement Inspections & High-Penalty Citations',
    primary_join_keys: ['OSHA Establishment ID', 'Plant Street Address', 'NAICS'],
    refresh_cadence: 'Nightly OSHA Enforcement Delta',
    pack_assignment: 'INDUSTRIAL_FLEET_OSHA',
    buying_trigger_unlocked: 'Newly opened OSHA workplace inspections & 30–90 day hazard abatement deadlines',
  },
  {
    code: 'EPA_ECHO',
    agency_number: 12,
    short_label: 'EPA ECHO / FRS',
    agency_name: 'U.S. Environmental Protection Agency',
    dataset_title: 'EPA ECHO Enforcement & 12-Digit Facility Registry Service (FRS)',
    primary_join_keys: ['12-Digit EPA FRS ID', 'Parent EIN Crosswalk', 'Lat/Long'],
    refresh_cadence: 'Weekly EPA ECHO Sync',
    pack_assignment: 'INDUSTRIAL_FLEET_OSHA',
    buying_trigger_unlocked: 'Significant Non-Compliance (SNC) flags under Clean Air, Clean Water & RCRA permits',
  },
  {
    code: 'FAA_REGISTRY',
    agency_number: 13,
    short_label: 'FAA Fleet Registry',
    agency_name: 'Federal Aviation Administration',
    dataset_title: 'FAA Civil Aircraft Registry & Part 135 Commercial Operators',
    primary_join_keys: ['FAA N-Number', 'Serial Number', 'Corporate Registrant Address'],
    refresh_cadence: 'Weekly FAA Releasable File',
    pack_assignment: 'INDUSTRIAL_FLEET_OSHA',
    buying_trigger_unlocked: 'Corporate aircraft acquisitions, ownership transfers & commercial fleet financing triggers',
  },
  {
    code: 'USASPENDING',
    agency_number: 14,
    short_label: 'USAspending / FPDS',
    agency_name: 'U.S. Department of the Treasury',
    dataset_title: 'USAspending & FPDS-NG Federal Contract Awards & Modifications',
    primary_join_keys: ['12-Char Recipient UEI', 'PIID Contract Number', 'Awarding Agency'],
    refresh_cadence: 'Daily USAspending API v2 Delta',
    pack_assignment: 'PUBLIC_SECTOR_SAM',
    buying_trigger_unlocked: 'First-time federal prime contract awards & 90-day incumbent recompete windows',
  },
  {
    code: 'SOCRATA_PERMITS',
    agency_number: 15,
    short_label: 'Socrata Permits',
    agency_name: 'Municipal Building Departments (Socrata / ArcGIS)',
    dataset_title: 'Commercial & Industrial Building Permits (>$250,000 Valuation)',
    primary_join_keys: ['Municipal Permit ID', 'Parcel PIN', 'Tenant & GC Legal Name'],
    refresh_cadence: 'Daily Municipal Socrata Sync',
    pack_assignment: 'PUBLIC_SECTOR_SAM',
    buying_trigger_unlocked: 'High-value commercial tenant buildouts, refrigerated warehouses & surgical suites',
  },
];

export type VerificationTier =
  | 'MACHINE_EXTRACTED'
  | 'CONSENSUS_VERIFIED'
  | 'HUMAN_VERIFIED'
  | 'ATTORNEY_REVIEWED';

export type ConfidenceLevel = 'VERIFIED' | 'GOOD' | 'AGING' | 'STALE' | 'UNKNOWN';

/**
 * Lower number = Higher authority.
 * Directly mirrors `public.enrichment_source_priority` in Postgres.
 */
export const SOURCE_PRIORITY: Record<string, number> = {
  SAM_GOV: 1.0,
  USASPENDING: 1.5,
  SEC_EDGAR_FORM_D: 1.8,
  DOL_5500: 2.0,
  DOL_LCA_H1B: 2.2,
  SBA_7A_504: 2.5,
  CMS_NPPES: 3.0,
  HHS_OIG_LEIE: 3.0,
  CMS_QCOR: 3.2,
  FDA_OPENFDA_510K: 3.4,
  FMCSA: 4.0,
  FAA_REGISTRY: 4.2,
  OSHA_EPA: 5.0,
  OSHA_ITA: 5.0,
  EPA_ECHO: 5.0,
  SOCRATA_PERMITS: 6.0,
  DERIVED: 8.0,
};

/**
 * 4-Axis Confidence Scorer weights by source system (0.00 - 1.00)
 */
const SOURCE_AUTHORITY_WEIGHTS: Record<string, number> = {
  SAM_GOV: 1.0,
  USASPENDING: 0.98,
  SEC_EDGAR_FORM_D: 0.98,
  DOL_5500: 0.98,
  DOL_LCA_H1B: 0.97,
  SBA_7A_504: 0.96,
  CMS_NPPES: 0.96,
  HHS_OIG_LEIE: 0.98,
  CMS_QCOR: 0.96,
  FDA_OPENFDA_510K: 0.97,
  FMCSA: 0.95,
  FAA_REGISTRY: 0.95,
  OSHA_EPA: 0.94,
  OSHA_ITA: 0.94,
  EPA_ECHO: 0.94,
  SOCRATA_PERMITS: 0.88,
  DERIVED: 0.68,
  UNKNOWN: 0.35,
};

const VERIFICATION_TIER_BONUS: Record<VerificationTier, number> = {
  ATTORNEY_REVIEWED: 15,
  HUMAN_VERIFIED: 10,
  CONSENSUS_VERIFIED: 5,
  MACHINE_EXTRACTED: 0,
};

export interface FieldSourceMetadata {
  source: CanonicalSourceSystem | string;
  priority: number;
  fetched_at: string;
  data_as_of_date?: string | null;
  filing_year?: number | null;
  source_url?: string | null;
  source_document_hash?: string | null;
  citation_text?: string | null;
  verification_tier?: VerificationTier;
  cross_validated?: boolean;
  consensus_conflict?: boolean;
}

export interface SourceProvenanceRecord {
  id: string;
  source_system: CanonicalSourceSystem;
  source_url: string;
  extract_date: string;
  raw_file_sha256: string;
  record_count: number;
  schema_version: string;
  ingestion_status: 'RUNNING' | 'COMPLETED' | 'FAILED';
  metadata: Record<string, unknown>;
}

export interface ConfidenceBadge {
  score: number;
  level: ConfidenceLevel;
  label: string;
  verifiedAt: string | null;
  dataAsOfDate: string | null;
  source: string | null;
  sourceUrl: string | null;
  sourceDocumentHash: string | null;
  verificationTier: VerificationTier;
  isHighAuthority: boolean;
  isInstitutionalGrade: boolean;
}

/**
 * Deterministic SHA-256 helper for raw payloads and immutable snapshot auditing.
 */
export function computeSha256(content: string | Record<string, unknown>): string {
  const normalized =
    typeof content === 'string'
      ? content
      : JSON.stringify(content, Object.keys(content).sort());
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Deterministic Signal Delta Hash: SHA-256(entityKey || filingKey || statePayloadHash)
 * Ensures idempotent signal generation across weekly delta runs.
 */
export function computeSignalHash(
  entityKey: string,
  filingKey: string,
  currentState: Record<string, unknown>,
): string {
  const stateHash = computeSha256(currentState);
  return computeSha256(`${entityKey}::${filingKey}::${stateHash}`);
}

/**
 * Recency decay curve (ported from str DataConfidenceScorer.ts):
 * 1.0 for <30 days, decaying smoothly to 0.40 beyond 365 days.
 */
export function computeRecencyWeight(verifiedAt: string | null | undefined): number {
  if (!verifiedAt) return 0.45;
  const days = Math.floor((Date.now() - new Date(verifiedAt).getTime()) / 86_400_000);
  if (days < 0) return 1.0;
  if (days < 30) return 1.0;
  if (days < 60) return 0.95;
  if (days < 90) return 0.9;
  if (days < 180) return 0.75;
  if (days < 270) return 0.6;
  if (days < 365) return 0.5;
  return 0.4;
}

/**
 * Computes a 0-100 confidence score for a single canonical field across 4 orthogonal axes.
 */
export function computeFieldConfidence(
  fieldSource: FieldSourceMetadata | undefined | null,
  fieldValue: unknown,
): number {
  if (
    fieldValue === null ||
    fieldValue === undefined ||
    fieldValue === '' ||
    fieldValue === 'UNKNOWN'
  ) {
    return 0;
  }

  if (!fieldSource) {
    return 30;
  }

  const sourceKey = String(fieldSource.source || 'UNKNOWN');
  const authorityWeight = SOURCE_AUTHORITY_WEIGHTS[sourceKey] ?? SOURCE_AUTHORITY_WEIGHTS.UNKNOWN;
  const freshnessWeight = computeRecencyWeight(fieldSource.fetched_at);
  const baseScore = authorityWeight * freshnessWeight * 100;

  const tier = fieldSource.verification_tier ?? 'MACHINE_EXTRACTED';
  const tierBonus = VERIFICATION_TIER_BONUS[tier] ?? 0;

  let anchorAdjustment = 0;
  if (fieldSource.cross_validated) anchorAdjustment += 8;
  if (fieldSource.data_as_of_date) anchorAdjustment += 3;
  if (fieldSource.source_document_hash) anchorAdjustment += 2;
  if (fieldSource.consensus_conflict) anchorAdjustment -= 10;

  return Math.min(100, Math.max(0, Math.round(baseScore + tierBonus + anchorAdjustment)));
}

/**
 * Builds an institutional confidence badge for a specific field on an entity or filing.
 */
export function buildConfidenceBadge(
  record: Record<string, unknown>,
  fieldSources: Record<string, FieldSourceMetadata> | undefined | null,
  fieldName: string,
): ConfidenceBadge {
  const value = record[fieldName];
  const meta = fieldSources?.[fieldName];
  const score = computeFieldConfidence(meta, value);

  let level: ConfidenceLevel = 'UNKNOWN';
  let label = 'No Data';
  if (score >= 85) {
    level = 'VERIFIED';
    label = 'Verified Primary Source';
  } else if (score >= 70) {
    level = 'GOOD';
    label = 'Corroborated';
  } else if (score >= 50) {
    level = 'AGING';
    label = 'Aging Snapshot';
  } else if (score > 0) {
    level = 'STALE';
    label = 'Stale / Unverified';
  }

  const sourceUrl = meta?.source_url ?? null;
  const isHighAuthority = Boolean(
    (meta?.source && (SOURCE_PRIORITY[meta.source] ?? 99) <= 6.0) ||
      (sourceUrl && (sourceUrl.includes('.gov') || sourceUrl.includes('.mil'))),
  );

  const tier: VerificationTier = meta?.verification_tier ?? 'MACHINE_EXTRACTED';
  const isInstitutionalGrade = Boolean(
    isHighAuthority &&
      meta?.source_document_hash &&
      meta?.data_as_of_date &&
      score >= 80,
  );

  return {
    score,
    level,
    label,
    verifiedAt: meta?.fetched_at ?? null,
    dataAsOfDate: meta?.data_as_of_date ?? null,
    source: meta?.source ?? null,
    sourceUrl,
    sourceDocumentHash: meta?.source_document_hash ?? null,
    verificationTier: tier,
    isHighAuthority,
    isInstitutionalGrade,
  };
}

/**
 * SourceHierarchyResolver (ported from forgood `SourceHierarchyResolver.ts`)
 * Prevents lower-authority ingestion runs from clobbering higher-authority federal fields.
 */
export class SourceHierarchyResolver {
  public resolveFieldUpdates(
    currentFieldSources: Record<string, FieldSourceMetadata> | null | undefined,
    incomingPatch: Record<string, unknown>,
    source: CanonicalSourceSystem | string,
    options?: {
      filingYear?: number;
      dataAsOfDate?: string;
      sourceUrl?: string;
      sourceDocumentHash?: string;
      verificationTier?: VerificationTier;
      crossValidated?: boolean;
    },
  ): {
    resolvedPatch: Record<string, unknown>;
    updatedSources: Record<string, FieldSourceMetadata>;
    skippedFields: string[];
  } {
    const resolvedPatch: Record<string, unknown> = {};
    const updatedSources: Record<string, FieldSourceMetadata> = {
      ...(currentFieldSources || {}),
    };
    const skippedFields: string[] = [];
    const now = new Date().toISOString();
    const incomingPriority = SOURCE_PRIORITY[source] ?? 99;

    for (const [field, value] of Object.entries(incomingPatch)) {
      if (value === undefined) continue;

      const existingMeta = updatedSources[field];
      if (this.shouldWrite(existingMeta, source, options?.filingYear)) {
        resolvedPatch[field] = value;
        updatedSources[field] = {
          source,
          priority: incomingPriority,
          fetched_at: now,
          filing_year: options?.filingYear ?? existingMeta?.filing_year ?? null,
          data_as_of_date: options?.dataAsOfDate ?? existingMeta?.data_as_of_date ?? null,
          source_url: options?.sourceUrl ?? existingMeta?.source_url ?? null,
          source_document_hash:
            options?.sourceDocumentHash ?? existingMeta?.source_document_hash ?? null,
          verification_tier:
            options?.verificationTier ?? existingMeta?.verification_tier ?? 'CONSENSUS_VERIFIED',
          cross_validated:
            options?.crossValidated ?? (existingMeta !== undefined && existingMeta.source !== source),
        };
      } else {
        skippedFields.push(field);
      }
    }

    return { resolvedPatch, updatedSources, skippedFields };
  }

  public shouldWrite(
    existingMeta: FieldSourceMetadata | undefined,
    newSource: string,
    newFilingYear?: number,
  ): boolean {
    if (!existingMeta) return true;

    const existingPriority = SOURCE_PRIORITY[existingMeta.source] ?? 99;
    const newPriority = SOURCE_PRIORITY[newSource] ?? 99;

    if (newPriority < existingPriority) return true;

    if (newPriority === existingPriority) {
      if (
        newFilingYear !== undefined &&
        existingMeta.filing_year !== undefined &&
        existingMeta.filing_year !== null
      ) {
        return newFilingYear >= existingMeta.filing_year;
      }
      return true;
    }

    return false;
  }

  /**
   * Creates an immutable `sources_provenance` snapshot entry with SHA-256 verification.
   */
  public createProvenanceSnapshot(params: {
    source_system: CanonicalSourceSystem;
    source_url: string;
    extract_date?: string;
    raw_payload_sample: string | Record<string, unknown>;
    record_count: number;
    metadata?: Record<string, unknown>;
  }): SourceProvenanceRecord {
    const extractDate = params.extract_date ?? new Date().toISOString().slice(0, 10);
    const rawSha = computeSha256(params.raw_payload_sample);
    return {
      id: crypto.randomUUID(),
      source_system: params.source_system,
      source_url: params.source_url,
      extract_date: extractDate,
      raw_file_sha256: rawSha,
      record_count: params.record_count,
      schema_version: '2026.2-15agency',
      ingestion_status: 'COMPLETED',
      metadata: params.metadata ?? {},
    };
  }
}

export const sourceHierarchyResolver = new SourceHierarchyResolver();

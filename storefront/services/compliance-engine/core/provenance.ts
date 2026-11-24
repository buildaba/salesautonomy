/**
 * Sales Autonomy — Unified Field-Level Provenance & 4-Axis Confidence Engine
 *
 * Ported & unified from:
 *   - forgood: `SourceHierarchyResolver.ts` & `20260320191500_npo_provenance_merger.sql`
 *   - str:     `ProvenanceAnchorService.ts` & `DataConfidenceScorer.ts`
 *
 * Enforces deterministic source hierarchy so lower-authority scrapers never overwrite
 * higher-authority federal records:
 *   SAM_GOV (1.0) > DOL_5500 (2.0) > CMS_NPPES (3.0) > FMCSA (4.0) > OSHA_EPA (5.0) > SOCRATA_PERMITS (6.0) > DERIVED (8.0)
 */

import * as crypto from 'node:crypto';

export type CanonicalSourceSystem =
  | 'SAM_GOV'
  | 'DOL_5500'
  | 'CMS_NPPES'
  | 'HHS_OIG_LEIE'
  | 'FMCSA'
  | 'OSHA_ITA'
  | 'OSHA_EPA'
  | 'EPA_ECHO'
  | 'USASPENDING'
  | 'SOCRATA_PERMITS'
  | 'DERIVED';

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
  DOL_5500: 2.0,
  CMS_NPPES: 3.0,
  HHS_OIG_LEIE: 3.0,
  FMCSA: 4.0,
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
  DOL_5500: 0.98,
  CMS_NPPES: 0.96,
  HHS_OIG_LEIE: 0.98,
  FMCSA: 0.95,
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
 * Computes a 0-100 confidence score for a single canonical field across 4 orthogonal axes:
 *   1. Source Authority Weight (SAM_GOV > DOL_5500 > CMS_NPPES > FMCSA > OSHA_EPA > SOCRATA > DERIVED)
 *   2. Recency Weight (exponential freshness decay)
 *   3. Verification Tier Bonus (Machine < Consensus < Human < Attorney)
 *   4. Tamper-Evident Anchoring Bonus (SHA-256 hash + legislative effective date + cross-validation)
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

    // Rule 1: Lower priority number = higher federal authority
    if (newPriority < existingPriority) return true;

    // Rule 2: Same authority tier -> prefer newer or equal filing year
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
      schema_version: '2026.1',
      ingestion_status: 'COMPLETED',
      metadata: params.metadata ?? {},
    };
  }
}

export const sourceHierarchyResolver = new SourceHierarchyResolver();

-- ============================================================================
-- Migration: 20261124000000_canonical_compliance_vault.sql
-- Purpose:   Sales Autonomy Universal 6-Table Canonical Compliance & Signal Vault
--            + Atomic JSONB Provenance Merger (ported from forgood)
--            + Daily Signal Urgency Decay & Renewal Countdown Function
--            + Multi-Tenant Row-Level Security (RLS) & v_client_compliance_feed
-- ============================================================================

SET search_path TO public, extensions;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- 0. SOURCE HIERARCHY PRIORITY TABLE & JSONB MERGE HELPERS
--    Authority hierarchy: SAM_GOV > DOL_5500 > CMS_NPPES > FMCSA > OSHA_EPA > SOCRATA_PERMITS > DERIVED
--    Lower priority number = Higher federal authority
-- ============================================================================

CREATE OR REPLACE FUNCTION public.jsonb_safe_merge(base JSONB, p_overlay JSONB)
RETURNS JSONB AS $$
BEGIN
    IF base IS NULL THEN RETURN p_overlay; END IF;
    IF p_overlay IS NULL THEN RETURN base; END IF;
    RETURN base || p_overlay;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION public.jsonb_object_keys_array(j JSONB)
RETURNS TEXT[] AS $$
    SELECT ARRAY(SELECT jsonb_object_keys(j));
$$ LANGUAGE sql IMMUTABLE;

CREATE TABLE IF NOT EXISTS public.enrichment_source_priority (
    source TEXT PRIMARY KEY,
    priority NUMERIC NOT NULL, -- Lower = higher authority
    description TEXT
);

INSERT INTO public.enrichment_source_priority (source, priority, description) VALUES
    ('SAM_GOV',         1.0, 'Federal SAM.gov Entity Management & Assistance API (Highest Authority)'),
    ('DOL_5500',        2.0, 'U.S. Department of Labor EFAST2 Form 5500 Benefit Filings'),
    ('CMS_NPPES',       3.0, 'CMS NPPES Type-2 Organization Registry & HHS OIG LEIE'),
    ('FMCSA',           4.0, 'U.S. DOT FMCSA Licensing & Insurance (L&I) & SMS Census'),
    ('OSHA_EPA',        5.0, 'DOL OSHA Enforcement Inspections & EPA ECHO Facility Registry'),
    ('SOCRATA_PERMITS', 6.0, 'Municipal Socrata / ArcGIS Commercial Building Permits'),
    ('DERIVED',         8.0, 'Derived / Heuristic / Third-Party Enriched Attributes')
ON CONFLICT (source) DO UPDATE
SET priority = EXCLUDED.priority,
    description = EXCLUDED.description;

ALTER TABLE public.enrichment_source_priority ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- TABLE 1: sources_provenance (Immutable Audit Log & Raw Snapshot History)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.sources_provenance (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_system       TEXT NOT NULL CHECK (source_system IN (
                            'SAM_GOV', 'DOL_5500', 'CMS_NPPES', 'HHS_OIG_LEIE',
                            'FMCSA', 'OSHA_ITA', 'EPA_ECHO', 'USASPENDING',
                            'SOCRATA_PERMITS'
                        )),
    source_url          TEXT NOT NULL,
    extract_date        DATE NOT NULL,
    raw_file_sha256     TEXT NOT NULL,
    record_count        INTEGER NOT NULL DEFAULT 0,
    schema_version      TEXT NOT NULL DEFAULT '2026.1',
    ingestion_status    TEXT NOT NULL DEFAULT 'COMPLETED'
                        CHECK (ingestion_status IN ('RUNNING', 'COMPLETED', 'FAILED')),
    metadata            JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (source_system, extract_date, raw_file_sha256)
);

-- ============================================================================
-- TABLE 2: entities (The Golden Corporate Backbone)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.entities (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canonical_name          TEXT NOT NULL,
    normalized_name         TEXT NOT NULL,
    dba_names               TEXT[] NOT NULL DEFAULT '{}',

    -- Deterministic Government Crosswalk Keys
    ein                     TEXT UNIQUE,        -- 9-digit IRS/DOL/SAM Employer ID
    uei                     TEXT UNIQUE,        -- 12-char SAM.gov Unique Entity ID
    npi                     TEXT UNIQUE,        -- 10-digit CMS Type-2 Org NPI
    usdot_number            TEXT UNIQUE,        -- FMCSA USDOT Number

    -- Web & Firmographic Spine
    primary_domain          TEXT,
    domain_confidence       NUMERIC(4,2) DEFAULT 0.00,
    domain_source           TEXT,               -- 'SAM_GOV_NATIVE' | 'DNS_MX_VERIFIED' | 'ESTIMATED'
    is_domain_estimate      BOOLEAN NOT NULL DEFAULT FALSE,
    naics_primary           TEXT,
    naics_all               TEXT[] NOT NULL DEFAULT '{}',
    employee_count_exact    INTEGER,            -- Verified via DOL Form 5500 or OSHA ITA
    employee_count_source   TEXT,
    hq_address_line1        TEXT,
    hq_city                 TEXT,
    hq_state                CHAR(2),
    hq_zip                  TEXT,
    hq_country              CHAR(2) NOT NULL DEFAULT 'US',

    -- Field-Level Provenance Tracker (ported from forgood + str)
    field_sources           JSONB NOT NULL DEFAULT '{}'::jsonb,
    metadata                JSONB NOT NULL DEFAULT '{}'::jsonb,
    _update_source          TEXT,
    entity_confidence       INTEGER NOT NULL DEFAULT 50 CHECK (entity_confidence BETWEEN 0 AND 100),

    first_seen_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_verified_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entities_normalized_name ON public.entities (normalized_name);
CREATE INDEX IF NOT EXISTS idx_entities_ein ON public.entities (ein) WHERE ein IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_entities_uei ON public.entities (uei) WHERE uei IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_entities_npi ON public.entities (npi) WHERE npi IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_entities_usdot ON public.entities (usdot_number) WHERE usdot_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_entities_domain ON public.entities (primary_domain) WHERE primary_domain IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_entities_naics_state ON public.entities (naics_primary, hq_state);

-- ============================================================================
-- TABLE 3: facilities_sites (Physical Plant, Clinic, or Fleet Terminal Registry)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.facilities_sites (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id               UUID NOT NULL REFERENCES public.entities(id) ON DELETE CASCADE,
    facility_name           TEXT NOT NULL,
    site_type               TEXT NOT NULL CHECK (site_type IN (
                                'INDUSTRIAL_PLANT', 'CLINIC_FACILITY', 'FLEET_TERMINAL',
                                'COMMERCIAL_PARCEL', 'HEADQUARTERS'
                            )),

    -- Agency Facility Identifiers
    epa_registry_id         TEXT UNIQUE,        -- EPA FRS 12-digit Registry ID
    osha_establishment_id   TEXT,               -- OSHA Inspection Establishment Key
    cms_ccn                 TEXT UNIQUE,        -- CMS Certification Number (6-char)
    fmcsa_terminal_id       TEXT,
    municipal_parcel_id     TEXT,

    -- Standardized Physical Location
    address_line1           TEXT NOT NULL,
    city                    TEXT NOT NULL,
    state                   CHAR(2) NOT NULL,
    zip5                    CHAR(5) NOT NULL,
    county_fips             CHAR(5),
    latitude                NUMERIC(9,6),
    longitude               NUMERIC(9,6),

    operating_status        TEXT NOT NULL DEFAULT 'ACTIVE'
                            CHECK (operating_status IN ('ACTIVE', 'UNDER_CONSTRUCTION', 'SUSPENDED', 'CLOSED')),
    source_provenance_id    UUID REFERENCES public.sources_provenance(id),
    field_sources           JSONB NOT NULL DEFAULT '{}'::jsonb,
    last_inspected_at       DATE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_facilities_entity_id ON public.facilities_sites (entity_id);
CREATE INDEX IF NOT EXISTS idx_facilities_state_zip ON public.facilities_sites (state, zip5);

-- ============================================================================
-- TABLE 4: compliance_filings (Raw Regulatory Events, Citations, Renewals & Permits)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.compliance_filings (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id                   UUID NOT NULL REFERENCES public.entities(id) ON DELETE CASCADE,
    facility_id                 UUID REFERENCES public.facilities_sites(id) ON DELETE SET NULL,
    source_provenance_id        UUID NOT NULL REFERENCES public.sources_provenance(id),

    source_system               TEXT NOT NULL,
    external_filing_id          TEXT NOT NULL,  -- e.g. OSHA activity_nr, SAM UEI+year, Permit #
    filing_type                 TEXT NOT NULL CHECK (filing_type IN (
                                    'OSHA_INSPECTION_OPENED', 'OSHA_CITATION_ISSUED',
                                    'EPA_ENFORCEMENT_ACTION', 'EPA_QNC_VIOLATION',
                                    'FMCSA_INSURANCE_CANCELLATION', 'FMCSA_INSURANCE_RENEWAL',
                                    'FMCSA_SAFETY_ALERT', 'DOL_5500_BENEFIT_FILING',
                                    'SAM_REGISTRATION_EXPIRING', 'FEDERAL_CONTRACT_RECOMPETE',
                                    'CMS_DEFICIENCY_CITATION', 'OIG_EXCLUSION_FLAG',
                                    'COMMERCIAL_BUILDING_PERMIT'
                                )),

    -- Temporal Lifecycle
    filing_date                 DATE NOT NULL,
    effective_date              DATE,
    expiration_date             DATE,           -- Critical for 30/60/90d renewal countdowns
    abatement_deadline          DATE,           -- Critical for OSHA/EPA remediation urgency
    status                      TEXT NOT NULL,  -- 'OPEN', 'PENDING_CANCELLATION', 'EXPIRING_SOON', 'CITED', 'ISSUED'

    -- Financial & Regulatory Exposure
    financial_penalty_usd       NUMERIC(14,2) DEFAULT 0.00,
    estimated_project_value_usd NUMERIC(14,2) DEFAULT 0.00,
    severity_tier               TEXT NOT NULL CHECK (severity_tier IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
    citation_codes              TEXT[] NOT NULL DEFAULT '{}', -- e.g. ['1910.147', '1910.1200']

    raw_summary                 TEXT NOT NULL,
    raw_payload                 JSONB NOT NULL DEFAULT '{}'::jsonb,
    payload_sha256              TEXT NOT NULL,  -- Used by DuckDB delta engine to detect state mutations

    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (source_system, external_filing_id)
);

CREATE INDEX IF NOT EXISTS idx_filings_entity_id ON public.compliance_filings (entity_id);
CREATE INDEX IF NOT EXISTS idx_filings_type_date ON public.compliance_filings (filing_type, filing_date DESC);
CREATE INDEX IF NOT EXISTS idx_filings_expiration ON public.compliance_filings (expiration_date) WHERE expiration_date IS NOT NULL;

-- ============================================================================
-- TABLE 5: signals_deltas (The Monetizable Weekly Delta & Urgency Engine)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.signals_deltas (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id               UUID NOT NULL REFERENCES public.entities(id) ON DELETE CASCADE,
    facility_id             UUID REFERENCES public.facilities_sites(id) ON DELETE SET NULL,
    filing_id               UUID NOT NULL REFERENCES public.compliance_filings(id) ON DELETE CASCADE,
    source_provenance_id    UUID NOT NULL REFERENCES public.sources_provenance(id),

    -- Vertical Engine Routing
    vertical_engine         TEXT NOT NULL CHECK (vertical_engine IN (
                                'HEALTHCARE_NPPES',
                                'INDUSTRIAL_FLEET_OSHA',
                                'PUBLIC_SECTOR_SAM'
                            )),
    signal_category         TEXT NOT NULL,      -- e.g. 'INSURANCE_CANCELLATION_30D', 'NEW_OSHA_CITATION', 'SAM_EXPIRING_60D'
    signal_hash             TEXT NOT NULL UNIQUE, -- Deterministic SHA-256(entity_id || filing_id || current_state_hash)

    -- Human-Readable Executive Intelligence
    signal_title            TEXT NOT NULL,
    signal_summary          TEXT NOT NULL,
    previous_state          JSONB,              -- Null if net-new filing; populated on status transition
    current_state           JSONB NOT NULL,

    -- Quantitative Urgency & Scoring Inputs
    financial_exposure_usd  NUMERIC(14,2) DEFAULT 0.00,
    days_until_deadline     INTEGER,            -- Positive = days remaining; Negative = days overdue
    severity_weight         NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    freshness_weight        NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    proximity_weight        NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    firmographic_weight     NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    urgency_score           INTEGER NOT NULL CHECK (urgency_score BETWEEN 0 AND 100),

    detected_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at              TIMESTAMPTZ,
    is_active               BOOLEAN NOT NULL DEFAULT TRUE,
    delivered_batch_id      TEXT                -- Tracks Monday 7am digest batch e.g. '2026-W48'
);

CREATE INDEX IF NOT EXISTS idx_signals_vertical_urgency ON public.signals_deltas (vertical_engine, urgency_score DESC) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_signals_detected_at ON public.signals_deltas (detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_signals_entity_id ON public.signals_deltas (entity_id);

-- ============================================================================
-- TABLE 6: contacts (<2% Bounce-Verified Decision-Maker Graph)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.contacts (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id                   UUID NOT NULL REFERENCES public.entities(id) ON DELETE CASCADE,
    facility_id                 UUID REFERENCES public.facilities_sites(id) ON DELETE SET NULL,

    full_name                   TEXT NOT NULL,
    first_name                  TEXT NOT NULL,
    last_name                   TEXT NOT NULL,
    job_title                   TEXT NOT NULL,
    buying_role                 TEXT NOT NULL CHECK (buying_role IN (
                                    'ECONOMIC_BUYER', 'COMPLIANCE_OWNER', 'OPERATIONS_LEAD', 'EXECUTIVE_SIGNATORY'
                                )),

    -- Contact Channels & Strict Verification Metadata
    work_email                  TEXT,
    email_verification_status   TEXT NOT NULL DEFAULT 'UNVERIFIED'
                                CHECK (email_verification_status IN (
                                    'VALID_SAFE_TO_SEND', 'CATCH_ALL_VERIFIED', 'CATCH_ALL_UNVERIFIED',
                                    'INVALID_BOUNCE', 'DISPOSABLE_BLOCKED', 'UNVERIFIED'
                                )),
    email_verifier_provider     TEXT,           -- 'MILLIONVERIFIER', 'BOUNCEBAN_CATCHALL', 'GOVERNMENT_FILING_DIRECT'
    email_is_catch_all          BOOLEAN NOT NULL DEFAULT FALSE,
    email_verified_at           TIMESTAMPTZ,
    bounce_risk_score           NUMERIC(4,3) NOT NULL DEFAULT 1.000, -- Must be < 0.020 for client export

    direct_phone                TEXT,
    linkedin_url                TEXT,

    -- Provenance & Anti-Pollution Guards
    contact_source              TEXT NOT NULL,  -- 'CMS_AUTHORIZED_OFFICIAL', 'DOL_5500_SIGNATORY', 'SAM_GOV_POC', 'WATERFALL_ENRICHED'
    is_government_signatory     BOOLEAN NOT NULL DEFAULT FALSE,
    is_third_party_preparer     BOOLEAN NOT NULL DEFAULT FALSE, -- MUST BE FALSE for client export (filters out CPAs/Lawyers)

    -- Privacy & Compliance Guardrails (CCPA / California DROP / CAN-SPAM)
    suppressed_opt_out          BOOLEAN NOT NULL DEFAULT FALSE,
    suppressed_reason           TEXT,

    field_sources               JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (entity_id, work_email)
);

CREATE INDEX IF NOT EXISTS idx_contacts_deliverable ON public.contacts (entity_id, buying_role)
WHERE email_verification_status IN ('VALID_SAFE_TO_SEND', 'CATCH_ALL_VERIFIED')
  AND bounce_risk_score < 0.020
  AND is_third_party_preparer = FALSE
  AND suppressed_opt_out = FALSE;

-- ============================================================================
-- SUPPORTING TABLE 7: enrichment_cache (30-Day Contact & Verification Cache)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.enrichment_cache (
    cache_key           TEXT PRIMARY KEY, -- e.g. lower(domain || ':' || first_name || '.' || last_name)
    entity_id           UUID REFERENCES public.entities(id) ON DELETE SET NULL,
    domain              TEXT NOT NULL,
    full_name           TEXT,
    work_email          TEXT NOT NULL,
    verification_status TEXT NOT NULL,
    bounce_risk_score   NUMERIC(4,3) NOT NULL DEFAULT 1.000,
    is_catch_all        BOOLEAN NOT NULL DEFAULT FALSE,
    provider            TEXT NOT NULL,
    raw_result          JSONB NOT NULL DEFAULT '{}'::jsonb,
    cached_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at          TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days')
);

CREATE INDEX IF NOT EXISTS idx_enrichment_cache_domain ON public.enrichment_cache (domain, expires_at DESC);

-- ============================================================================
-- SUPPORTING TABLE 8: client_subscriptions (Multi-Tenant Entitlements & Webhooks)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.client_subscriptions (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_user_id              UUID NOT NULL,  -- Maps to auth.uid()
    organization_name           TEXT NOT NULL,
    plan_tier                   TEXT NOT NULL CHECK (plan_tier IN ('STARTER', 'GROWTH', 'ENTERPRISE')),
    vertical_engines            TEXT[] NOT NULL, -- e.g. ARRAY['INDUSTRIAL_FLEET_OSHA']
    allowed_signal_categories   TEXT[] DEFAULT NULL, -- NULL = all categories in vertical
    allowed_states              TEXT[] DEFAULT NULL, -- NULL = nationwide
    allowed_naics_prefixes      TEXT[] DEFAULT NULL, -- e.g. ARRAY['31', '32', '33', '484']
    min_urgency_score           INTEGER NOT NULL DEFAULT 60,
    webhook_url                 TEXT,
    webhook_secret_hash         TEXT,
    is_active                   BOOLEAN NOT NULL DEFAULT TRUE,
    current_period_ends_at      TIMESTAMPTZ NOT NULL,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_subs_user ON public.client_subscriptions (client_user_id) WHERE is_active = TRUE;

-- ============================================================================
-- ATOMIC PROVENANCE-AWARE ENTITY UPDATE FUNCTION
-- Ported from forgood (20260320191500_npo_provenance_merger.sql)
-- Prevents lower-authority scrapers from overwriting higher-authority federal records:
-- SAM_GOV (1.0) > DOL_5500 (2.0) > CMS_NPPES (3.0) > FMCSA (4.0) > OSHA_EPA (5.0) > SOCRATA_PERMITS (6.0) > DERIVED (8.0)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.fn_provenance_update(
    p_entity_id UUID,
    p_source TEXT,
    p_patch JSONB,
    p_metadata_overlay JSONB DEFAULT NULL,
    p_filing_year INTEGER DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
    v_record RECORD;
    v_new_priority NUMERIC;
    v_existing_priority NUMERIC;
    v_existing_year INTEGER;
    v_field TEXT;
    v_value JSONB;
    v_resolved_patch JSONB := '{}'::JSONB;
    v_field_sources JSONB;
    v_now TEXT := NOW()::TEXT;
BEGIN
    -- 1. Lock the entity row for atomic read-modify-write
    SELECT id, field_sources, metadata
    INTO v_record
    FROM public.entities
    WHERE id = p_entity_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN NULL;
    END IF;

    -- 2. Look up incoming source authority priority (lower = higher authority)
    SELECT priority INTO v_new_priority
    FROM public.enrichment_source_priority
    WHERE source = p_source;

    IF v_new_priority IS NULL THEN
        v_new_priority := 99; -- Unknown sources get lowest authority
    END IF;

    v_field_sources := COALESCE(v_record.field_sources, '{}'::JSONB);

    -- 3. Evaluate each incoming field against existing field provenance
    FOR v_field, v_value IN SELECT * FROM jsonb_each(p_patch)
    LOOP
        IF v_field IN ('id', '_update_source', 'field_sources', 'metadata', 'first_seen_at') THEN
            CONTINUE;
        END IF;

        v_existing_priority := 99;
        v_existing_year := NULL;

        IF v_field_sources ? v_field AND (v_field_sources->v_field) ? 'source' THEN
            SELECT COALESCE(esp.priority, 99)
            INTO v_existing_priority
            FROM public.enrichment_source_priority esp
            WHERE esp.source = v_field_sources->v_field->>'source';

            IF (v_field_sources->v_field) ? 'filing_year' AND (v_field_sources->v_field->>'filing_year') IS NOT NULL THEN
                v_existing_year := (v_field_sources->v_field->>'filing_year')::INTEGER;
            END IF;
        END IF;

        -- Higher authority wins (lower number), or same authority with newer/equal filing_year
        IF v_new_priority < v_existing_priority OR (
            v_new_priority = v_existing_priority AND (
                p_filing_year IS NULL OR v_existing_year IS NULL OR p_filing_year >= v_existing_year
            )
        ) THEN
            v_resolved_patch := v_resolved_patch || jsonb_build_object(v_field, v_value);

            v_field_sources := v_field_sources || jsonb_build_object(
                v_field,
                jsonb_build_object(
                    'source', p_source,
                    'priority', v_new_priority,
                    'fetched_at', v_now,
                    'filing_year', p_filing_year
                )
            );
        END IF;
    END LOOP;

    -- 4. Nothing to write after hierarchy filtering
    IF v_resolved_patch = '{}'::JSONB AND p_metadata_overlay IS NULL THEN
        RETURN jsonb_build_object('id', v_record.id, 'skipped', true, 'reason', 'lower_authority_rejected');
    END IF;

    -- 5. Atomic metadata JSONB merge
    IF p_metadata_overlay IS NOT NULL THEN
        v_resolved_patch := v_resolved_patch || jsonb_build_object(
            'metadata', public.jsonb_safe_merge(v_record.metadata, p_metadata_overlay)
        );
    END IF;

    -- 6. Always persist updated provenance map and timestamps
    v_resolved_patch := v_resolved_patch || jsonb_build_object(
        'field_sources', v_field_sources,
        '_update_source', p_source,
        'last_verified_at', v_now,
        'updated_at', v_now
    );

    -- 7. Execute atomic dynamic update with strict type casting
    EXECUTE format(
        'UPDATE public.entities SET %s WHERE id = $1',
        (SELECT string_agg(format('%I = ($2->>%L)::%s', key, key,
            CASE
                WHEN key IN ('is_domain_estimate') THEN 'boolean'
                WHEN key IN ('domain_confidence') THEN 'numeric'
                WHEN key IN ('employee_count_exact', 'entity_confidence') THEN 'integer'
                WHEN key IN ('dba_names', 'naics_all') THEN 'text[]'
                WHEN key IN ('metadata', 'field_sources') THEN 'jsonb'
                WHEN key IN ('last_verified_at', 'updated_at') THEN 'timestamptz'
                ELSE 'text'
            END
        ), ', ')
        FROM jsonb_each(v_resolved_patch))
    ) USING v_record.id, v_resolved_patch;

    RETURN jsonb_build_object(
        'id', v_record.id,
        'skipped', false,
        'source', p_source,
        'priority', v_new_priority,
        'fields_updated', public.jsonb_object_keys_array(v_resolved_patch)
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- DAILY SIGNAL URGENCY DECAY & FORWARD-LOOKING RENEWAL COUNTDOWN ENGINE
-- Recalculates urgency_score (0-100) across all active signals:
--   U = clamp(round(0.35 * S_sev + 0.30 * S_fresh + 0.20 * S_prox + 0.15 * S_firm), 0, 100)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.refresh_daily_signal_urgency()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_updated INTEGER;
BEGIN
    WITH recalculated AS (
        SELECT
            s.id,
            CASE
                WHEN f.expiration_date IS NOT NULL THEN (f.expiration_date - CURRENT_DATE)
                WHEN f.abatement_deadline IS NOT NULL THEN (f.abatement_deadline - CURRENT_DATE)
                ELSE NULL
            END AS new_days_until_deadline,

            -- Freshness decay: 100 * e^(-0.045 * age_days)
            GREATEST(10.0, LEAST(100.0,
                100.0 * EXP(-0.045 * GREATEST(0, EXTRACT(DAY FROM (NOW() - s.detected_at))))
            )) AS new_freshness_weight,

            -- Deadline proximity curve (peaks inside the 1-30 day cancellation/expiration window)
            CASE
                WHEN COALESCE(f.expiration_date, f.abatement_deadline) IS NULL THEN s.proximity_weight
                WHEN (COALESCE(f.expiration_date, f.abatement_deadline) - CURRENT_DATE) BETWEEN 1 AND 30 THEN 100.0
                WHEN (COALESCE(f.expiration_date, f.abatement_deadline) - CURRENT_DATE) BETWEEN 31 AND 60 THEN 85.0
                WHEN (COALESCE(f.expiration_date, f.abatement_deadline) - CURRENT_DATE) BETWEEN 61 AND 90 THEN 70.0
                WHEN (COALESCE(f.expiration_date, f.abatement_deadline) - CURRENT_DATE) BETWEEN -14 AND 0 THEN 90.0
                ELSE 25.0
            END AS new_proximity_weight
        FROM public.signals_deltas s
        JOIN public.compliance_filings f ON f.id = s.filing_id
        WHERE s.is_active = TRUE
    )
    UPDATE public.signals_deltas s
    SET
        days_until_deadline = r.new_days_until_deadline,
        freshness_weight    = ROUND(r.new_freshness_weight::numeric, 2),
        proximity_weight    = ROUND(r.new_proximity_weight::numeric, 2),
        urgency_score       = LEAST(100, GREATEST(0, ROUND(
                                (0.35 * s.severity_weight) +
                                (0.30 * r.new_freshness_weight) +
                                (0.20 * r.new_proximity_weight) +
                                (0.15 * s.firmographic_weight)
                              )::integer)),
        is_active           = CASE
                                WHEN r.new_days_until_deadline < -30 THEN FALSE
                                ELSE TRUE
                              END
    FROM recalculated r
    WHERE s.id = r.id;

    GET DIAGNOSTICS v_updated = ROW_COUNT;
    RETURN v_updated;
END;
$$;

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS) & STANDARDIZED CLIENT COMPLIANCE FEED VIEW
-- ============================================================================

ALTER TABLE public.sources_provenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_filings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signals_deltas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrichment_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "clients_view_own_subscriptions" ON public.client_subscriptions;
CREATE POLICY "clients_view_own_subscriptions"
ON public.client_subscriptions
FOR SELECT
TO authenticated
USING (client_user_id = auth.uid());

DROP POLICY IF EXISTS "clients_view_subscribed_signals" ON public.signals_deltas;
CREATE POLICY "clients_view_subscribed_signals"
ON public.signals_deltas
FOR SELECT
TO authenticated
USING (
    is_active = TRUE
    AND EXISTS (
        SELECT 1
        FROM public.client_subscriptions sub
        JOIN public.entities e ON e.id = signals_deltas.entity_id
        WHERE sub.client_user_id = auth.uid()
          AND sub.is_active = TRUE
          AND sub.current_period_ends_at > NOW()
          AND signals_deltas.vertical_engine = ANY(sub.vertical_engines)
          AND signals_deltas.urgency_score >= sub.min_urgency_score
          AND (sub.allowed_signal_categories IS NULL OR signals_deltas.signal_category = ANY(sub.allowed_signal_categories))
          AND (sub.allowed_states IS NULL OR e.hq_state = ANY(sub.allowed_states))
    )
);

CREATE OR REPLACE VIEW public.v_client_compliance_feed
WITH (security_invoker = true)
AS
SELECT
    s.id AS signal_id,
    s.vertical_engine,
    s.signal_category,
    s.urgency_score,
    s.signal_title,
    s.signal_summary,
    s.financial_exposure_usd,
    s.days_until_deadline,
    s.detected_at,
    s.signal_hash,
    e.id AS entity_id,
    e.canonical_name AS company_name,
    e.ein,
    e.uei,
    e.npi,
    e.usdot_number,
    e.primary_domain,
    e.is_domain_estimate,
    e.naics_primary,
    e.employee_count_exact,
    e.hq_city,
    e.hq_state,
    f.external_filing_id,
    f.filing_type,
    f.filing_date,
    f.expiration_date,
    f.abatement_deadline,
    f.citation_codes,
    c.full_name AS contact_name,
    c.job_title AS contact_title,
    c.buying_role AS contact_role,
    c.work_email AS verified_email,
    c.email_verification_status,
    c.bounce_risk_score,
    c.direct_phone,
    c.linkedin_url,
    sp.source_system,
    sp.source_url,
    sp.extract_date,
    sp.raw_file_sha256
FROM public.signals_deltas s
JOIN public.entities e ON e.id = s.entity_id
JOIN public.compliance_filings f ON f.id = s.filing_id
JOIN public.sources_provenance sp ON sp.id = s.source_provenance_id
LEFT JOIN LATERAL (
    SELECT *
    FROM public.contacts ct
    WHERE ct.entity_id = e.id
      AND ct.email_verification_status IN ('VALID_SAFE_TO_SEND', 'CATCH_ALL_VERIFIED')
      AND ct.bounce_risk_score < 0.020
      AND ct.is_third_party_preparer = FALSE
      AND ct.suppressed_opt_out = FALSE
    ORDER BY
        CASE ct.buying_role
            WHEN 'COMPLIANCE_OWNER' THEN 1
            WHEN 'ECONOMIC_BUYER' THEN 2
            WHEN 'EXECUTIVE_SIGNATORY' THEN 3
            ELSE 4
        END,
        ct.bounce_risk_score ASC
    LIMIT 1
) c ON TRUE
WHERE s.is_active = TRUE;

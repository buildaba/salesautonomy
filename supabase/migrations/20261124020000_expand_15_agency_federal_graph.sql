-- ============================================================================
-- Migration: 20261124020000_expand_15_agency_federal_graph.sql
-- Purpose:   Expand Sales Autonomy Canonical 6-Table Schema to all 15 Federal
--            & Statutory Agencies + Multi-Agency Signal Stacking (`stacked_agencies`)
-- ============================================================================

SET search_path TO public, extensions;

-- 1. Expand enrichment_source_priority to all 15 Federal & Statutory Datasets
INSERT INTO public.enrichment_source_priority (source, priority, description) VALUES
    ('SAM_GOV',           1.0, 'GSA SAM.gov Entity Management & Exclusions API v3 (UEI/CAGE/700K Domains)'),
    ('USASPENDING',       1.5, 'U.S. Treasury USAspending & FPDS-NG Federal Prime/Sub Contract Awards'),
    ('SEC_EDGAR_FORM_D',  1.8, 'SEC EDGAR Form D Private Placements & Form ADV Growth Filings (CIK/EIN)'),
    ('DOL_5500',          2.0, 'U.S. Dept. of Labor EFAST2 Form 5500 Health & Welfare Benefit Filings (EIN)'),
    ('DOL_LCA_H1B',       2.2, 'U.S. Dept. of Labor OFLC H-1B LCA & PERM Certified Workforce Filings (EIN)'),
    ('SBA_7A_504',        2.5, 'U.S. Small Business Administration 7(a) & 504 Commercial Fixed-Asset Loans'),
    ('CMS_NPPES',         3.0, 'CMS NPPES Type-2 Organization Registry & Authorized Officials (NPI-2)'),
    ('HHS_OIG_LEIE',      3.0, 'HHS Office of Inspector General Federal Healthcare Exclusion Table'),
    ('CMS_QCOR',          3.2, 'CMS Care Compare & QCOR Condition-Level Survey Deficiencies (CCN)'),
    ('FDA_OPENFDA_510K',  3.4, 'U.S. FDA OpenFDA 510(k) Device Clearances & Establishment Registrations (FEI)'),
    ('FMCSA',             4.0, 'U.S. DOT FMCSA Motor Carrier Census & Form BMC-35/91X Insurance Filings'),
    ('FAA_REGISTRY',      4.2, 'U.S. FAA Civil Aircraft Registry & Part 135 Commercial Fleet Operators'),
    ('OSHA_EPA',          5.0, 'DOL Federal OSHA Enforcement Inspections & EPA ECHO Facility Registry'),
    ('OSHA_ITA',          5.0, 'DOL Federal OSHA Injury Tracking Application & Open Workplace Inspections'),
    ('EPA_ECHO',          5.0, 'U.S. EPA ECHO Enforcement & 12-Digit Facility Registry Service (FRS)'),
    ('SOCRATA_PERMITS',   6.0, 'Municipal Socrata & ArcGIS Commercial Building Permits (>$250K)'),
    ('DERIVED',           8.0, 'Derived / Heuristic / Third-Party Enriched Attributes')
ON CONFLICT (source) DO UPDATE
SET priority = EXCLUDED.priority,
    description = EXCLUDED.description;

-- 2. Expand sources_provenance.source_system check constraint to all 15 Federal Agencies
ALTER TABLE public.sources_provenance
    DROP CONSTRAINT IF EXISTS sources_provenance_source_system_check;

ALTER TABLE public.sources_provenance
    ADD CONSTRAINT sources_provenance_source_system_check
    CHECK (source_system IN (
        'SAM_GOV', 'USASPENDING', 'SEC_EDGAR_FORM_D', 'DOL_5500', 'DOL_LCA_H1B',
        'SBA_7A_504', 'CMS_NPPES', 'HHS_OIG_LEIE', 'CMS_QCOR', 'FDA_OPENFDA_510K',
        'FMCSA', 'FAA_REGISTRY', 'OSHA_ITA', 'OSHA_EPA', 'EPA_ECHO',
        'SOCRATA_PERMITS', 'DERIVED'
    ));

-- 3. Expand compliance_filings.filing_type check constraint
ALTER TABLE public.compliance_filings
    DROP CONSTRAINT IF EXISTS compliance_filings_filing_type_check;

ALTER TABLE public.compliance_filings
    ADD CONSTRAINT compliance_filings_filing_type_check
    CHECK (filing_type IN (
        'OSHA_INSPECTION_OPENED', 'OSHA_CITATION_ISSUED',
        'EPA_ENFORCEMENT_ACTION', 'EPA_QNC_VIOLATION',
        'FMCSA_INSURANCE_CANCELLATION', 'FMCSA_INSURANCE_RENEWAL',
        'FMCSA_SAFETY_ALERT', 'DOL_5500_BENEFIT_FILING',
        'SAM_REGISTRATION_EXPIRING', 'FEDERAL_CONTRACT_RECOMPETE',
        'CMS_DEFICIENCY_CITATION', 'OIG_EXCLUSION_FLAG',
        'COMMERCIAL_BUILDING_PERMIT', 'FDA_510K_DEVICE_CLEARANCE',
        'SEC_FORM_D_GROWTH_FINANCING', 'SBA_504_EXPANSION_LOAN',
        'DOL_H1B_SKILLED_HIRING_SURGE', 'FAA_COMMERCIAL_FLEET_REGISTRATION'
    ));

-- 4. Add stacked_agencies array column to signals_deltas
ALTER TABLE public.signals_deltas
    ADD COLUMN IF NOT EXISTS stacked_agencies TEXT[] NOT NULL DEFAULT '{}';

-- 5. Backfill stacked_agencies on existing 66 live canonical signals in Postgres
UPDATE public.signals_deltas
SET stacked_agencies = CASE
    WHEN vertical_engine = 'HEALTHCARE_NPPES' THEN ARRAY['CMS_NPPES', 'DOL_5500', 'SAM_GOV', 'HHS_OIG_LEIE']
    WHEN vertical_engine = 'INDUSTRIAL_FLEET_OSHA' THEN ARRAY['FMCSA', 'DOL_5500', 'OSHA_ITA', 'EPA_ECHO']
    WHEN vertical_engine = 'PUBLIC_SECTOR_SAM' THEN ARRAY['SOCRATA_PERMITS', 'SAM_GOV', 'SBA_7A_504', 'DOL_LCA_H1B']
    ELSE ARRAY['DOL_5500', 'SAM_GOV']
END
WHERE array_length(stacked_agencies, 1) IS NULL;

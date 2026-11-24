/**
 * Sales Autonomy — Engine 2: Industrial, Fleet & Facility Risk Graph (`INDUSTRIAL_FLEET_OSHA`)
 *
 * Combines 4 Federal Compliance & Risk Streams onto our DOL Form 5500 Corporate Backbone:
 *   1. FMCSA Commercial Fleets (5–500+ power units):
 *      - 100% forward-looking 30-day Form BMC-35 Insurance Cancellation notices
 *        (carrier cannot legally operate in interstate commerce if coverage lapses at Day 30)
 *      - 60/90-day Form BMC-91X Liability Policy Renewal windows + SMS BASIC safety alerts
 *   2. DOL OSHA Enforcement & ITA:
 *      - Newly Opened Inspections (`OPEN_DATE` prior to citation issuance — early-warning window)
 *      - Published Willful / Repeat / Serious Citations with 30-90d abatement deadlines,
 *        5-year Repeat lookback exposure ($161,323/violation), and Workers' Comp Ex-Mod impact
 *   3. EPA ECHO / FRS (12-digit `REGISTRY_ID`):
 *      - Clean Air Act (CAA), Clean Water Act (CWA), and RCRA Hazardous Waste QNC violations
 *   4. DOL Form 5500 Corporate Backbone Cross-Join:
 *      - Links plant/terminal records to parent `EIN`, exact active headcount (`TOT_ACTIVE_PARTCP_CNT`),
 *        and verified CFO / VP HR signatory (`ADMIN_SIGNED_NAME`).
 */

import {
  computeSha256,
  computeSignalHash,
  sourceHierarchyResolver,
  CanonicalSourceSystem,
} from '../core/provenance';
import { EntityResolver } from '../core/entityResolver';
import { ContactWaterfallEngine } from '../core/contactWaterfall';
import {
  CanonicalSignalDelta,
  computeSignalUrgencyScore,
} from '../core/deliveryEngine';

export class IndustrialFleetOshaAdapter {
  private resolver = new EntityResolver();
  private contactEngine = new ContactWaterfallEngine();

  /**
   * Returns pre-cleaned, canonical 6-table signals for Engine 2:
   * Industrial, Fleet & Facility Risk Graph (`INDUSTRIAL_FLEET_OSHA`).
   */
  public getPreCleanedSignals(): CanonicalSignalDelta[] {
    const seeds = [
      {
        signal_id: 'sig_ind_fmcsa_001',
        source_system: 'FMCSA' as CanonicalSourceSystem,
        entity_id: 'ent_ind_midwest_cryo_logistics',
        canonical_name: 'Midwest Cryogenic & Hazmat Logistics Inc',
        ein: '364192805',
        usdot_number: '2849104',
        candidate_domain: 'midwestcryologistics.com',
        naics_primary: '484230',
        employee_count_exact: 186,
        employee_count_source: 'DOL_5500',
        hq_address_line1: '1850 Terminal Way',
        hq_city: 'Joliet',
        hq_state: 'IL',
        hq_zip: '60436',
        facility_id: 'fac_ind_joliet_terminal',
        facility_name: 'Midwest Cryogenic — Joliet I-80 Hazmat Fleet Terminal (112 Power Units)',
        site_type: 'FLEET_TERMINAL' as const,
        epa_registry_id: '110070492811',
        osha_establishment_id: null,
        fmcsa_terminal_id: 'DOT-2849104-IL01',
        signal_category: 'FMCSA_BMC35_INSURANCE_CANCELLATION_30D',
        filing_type: 'FMCSA_INSURANCE_CANCELLATION' as const,
        external_filing_id: 'FMCSA-BMC35-2026-2849104-MC819204',
        filing_date: '2026-11-16',
        expiration_date: '2026-12-16',
        abatement_deadline: null,
        days_until_deadline: 22,
        age_days: 4,
        financial_exposure_usd: 5000000,
        severity_tier: 'CRITICAL' as const,
        citation_codes: ['49 CFR §387.7', 'Form-BMC-35', 'Form-BMC-91X-Hazmat-5M'],
        signal_title:
          'FMCSA Form BMC-35 30-Day Insurance Cancellation Notice (112 Power Units · $5M Hazmat Bipd)',
        signal_summary:
          'Form BMC-35 Notice of Cancellation filed on primary $5,000,000 commercial auto/hazmat liability policy (BMC-91X) for 112-truck interstate carrier (186 active participants on DOL Form 5500). Operating authority revokes automatically in 22 days unless replacement BMC-91X is bound.',
        previous_state: {
          bipd_insurance_status: 'ACTIVE_BMC91X_5M',
          power_units: 112,
          unsafe_driving_basic_percentile: 64,
        },
        current_state: {
          bipd_insurance_status: 'PENDING_CANCELLATION_BMC35',
          cancellation_effective_date: '2026-12-16',
          power_units: 112,
          drivers_count: 138,
          unsafe_driving_basic_percentile: 78,
        },
        source_url: 'https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_carrlist?pv_usdot=2849104',
        contacts: [
          {
            id: 'cnt_ind_001a',
            full_name: 'Richard D. Kowalski',
            job_title: 'Chief Financial Officer & Risk Officer (DOL Form 5500 Signatory)',
            explicit_email: 'rkowalski@midwestcryologistics.com',
            direct_phone: '+1-815-555-0134',
            linkedin_url: 'https://www.linkedin.com/in/richard-kowalski-cfo',
            contact_source: 'DOL_5500_SIGNATORY' as const,
            bounce_risk_score: 0.004,
          },
          {
            id: 'cnt_ind_001b',
            full_name: 'Dana M. Sullivan',
            job_title: 'VP of Fleet Safety & DOT Compliance (FMCSA Officer)',
            explicit_email: 'dsullivan@midwestcryologistics.com',
            direct_phone: '+1-815-555-0169',
            linkedin_url: 'https://www.linkedin.com/in/dana-sullivan-cds',
            contact_source: 'FMCSA_COMPANY_OFFICER' as const,
            bounce_risk_score: 0.005,
          },
        ],
      },
      {
        signal_id: 'sig_ind_osha_002',
        source_system: 'OSHA_EPA' as CanonicalSourceSystem,
        entity_id: 'ent_ind_buckeye_precision_forging',
        canonical_name: 'Buckeye Precision Aerospace Forging & Metals Corp',
        ein: '341892401',
        usdot_number: null,
        candidate_domain: 'buckeyeforging.com',
        naics_primary: '332111',
        employee_count_exact: 310,
        employee_count_source: 'DOL_5500',
        hq_address_line1: '7400 Industrial Pkwy',
        hq_city: 'Cleveland',
        hq_state: 'OH',
        hq_zip: '44135',
        facility_id: 'fac_ind_cleveland_plant1',
        facility_name: 'Buckeye Precision Forging — Cleveland Heavy Press Plant #1',
        site_type: 'INDUSTRIAL_PLANT' as const,
        epa_registry_id: '110043819204',
        osha_establishment_id: 'OSHA-EST-341892401-OH01',
        fmcsa_terminal_id: null,
        signal_category: 'OSHA_WILLFUL_REPEAT_CITATION_ABATEMENT_WINDOW',
        filing_type: 'OSHA_CITATION_ISSUED' as const,
        external_filing_id: 'OSHA-ACT-174829104',
        filing_date: '2026-11-19',
        expiration_date: null,
        abatement_deadline: '2026-12-19',
        days_until_deadline: 25,
        age_days: 3,
        financial_exposure_usd: 284650,
        severity_tier: 'CRITICAL' as const,
        citation_codes: ['29 CFR 1910.147(c)(4)(i)', '29 CFR 1910.212(a)(1)', 'EPA-RCRA-Subpart-AA'],
        signal_title:
          'OSHA Repeat & Serious LOTO / Machine Guarding Citations ($284,650 Penalty · 25-Day Abatement)',
        signal_summary:
          'OSHA Region 5 issued 1 Repeat and 4 Serious citations ($284,650 proposed penalty) for Lockout/Tagout (1910.147) and hydraulic press guarding at Cleveland Plant #1 (310 active employees on Form 5500), plus concurrent EPA ECHO RCRA hazardous waste inspection. Mandatory abatement & informal conference window closes in 25 days.',
        previous_state: {
          osha_inspection_status: 'OPEN_INSPECTION',
          epa_echo_status: 'IN_COMPLIANCE',
          proposed_penalty_usd: 0,
        },
        current_state: {
          osha_inspection_status: 'CITED_REPEAT_SERIOUS',
          epa_echo_status: 'RCRA_VIOLATION_IDENTIFIED',
          proposed_penalty_usd: 284650,
          abatement_deadline: '2026-12-19',
          five_year_repeat_exposure_usd: 161323,
        },
        source_url: 'https://www.osha.gov/pls/imis/establishment.inspection_detail?id=174829104',
        contacts: [
          {
            id: 'cnt_ind_002a',
            full_name: 'Gregory T. Halstead',
            job_title: 'VP of Environmental Health, Safety & Risk',
            explicit_email: 'ghalstead@buckeyeforging.com',
            direct_phone: '+1-216-555-0142',
            linkedin_url: 'https://www.linkedin.com/in/gregory-halstead-csp',
            contact_source: 'WATERFALL_ENRICHED' as const,
            bounce_risk_score: 0.006,
          },
          {
            id: 'cnt_ind_002b',
            full_name: 'Patricia L. Mercer',
            job_title: 'Chief Financial Officer (DOL Form 5500 Plan Signatory)',
            explicit_email: 'pmercer@buckeyeforging.com',
            direct_phone: '+1-216-555-0118',
            linkedin_url: 'https://www.linkedin.com/in/patricia-mercer-cfo',
            contact_source: 'DOL_5500_SIGNATORY' as const,
            bounce_risk_score: 0.003,
          },
        ],
      },
    ];

    return seeds.map((seed) => {
      const provenance = sourceHierarchyResolver.createProvenanceSnapshot({
        source_system: seed.source_system,
        source_url: seed.source_url,
        extract_date: seed.filing_date,
        raw_payload_sample: {
          ein: seed.ein,
          usdot_number: seed.usdot_number,
          external_filing_id: seed.external_filing_id,
          current_state: seed.current_state,
        },
        record_count: 1,
        metadata: {
          cross_joined_backbone: 'DOL_5500_EFAST2',
          epa_frs_registry_id: seed.epa_registry_id,
        },
      });

      const { entity } = this.resolver.resolveOrUpsert({
        id: seed.entity_id,
        canonical_name: seed.canonical_name,
        source: seed.source_system,
        ein: seed.ein,
        usdot_number: seed.usdot_number,
        candidate_domain: seed.candidate_domain,
        domain_mode: 'DNS_MX_VERIFIED',
        naics_primary: seed.naics_primary,
        employee_count_exact: seed.employee_count_exact,
        employee_count_source: seed.employee_count_source,
        hq_address_line1: seed.hq_address_line1,
        hq_city: seed.hq_city,
        hq_state: seed.hq_state,
        hq_zip: seed.hq_zip,
        filing_year: 2026,
        data_as_of_date: seed.filing_date,
        source_url: seed.source_url,
        source_document_hash: provenance.raw_file_sha256,
      });

      const verifiedContacts = seed.contacts
        .map((c) =>
          this.contactEngine.resolveVerifiedContact({
            id: c.id,
            entity_id: entity.id,
            facility_id: seed.facility_id,
            entity_primary_domain: entity.primary_domain,
            full_name: c.full_name,
            job_title: c.job_title,
            explicit_email: c.explicit_email,
            direct_phone: c.direct_phone,
            linkedin_url: c.linkedin_url,
            contact_source: c.contact_source,
            is_government_signatory: c.contact_source !== 'WATERFALL_ENRICHED',
            bounce_risk_score: c.bounce_risk_score,
          }),
        )
        .filter((res) => res.exportEligible && res.contact !== null)
        .map((res) => res.contact!);

      const urgency = computeSignalUrgencyScore({
        severityTier: seed.severity_tier,
        financialExposureUsd: seed.financial_exposure_usd,
        ageDaysSinceDetected: seed.age_days,
        daysUntilDeadline: seed.days_until_deadline,
        employeeCountExact: entity.employee_count_exact,
        hasVerifiedCorporateDomain: Boolean(entity.primary_domain),
      });

      const filingPayloadSha = computeSha256({
        external_filing_id: seed.external_filing_id,
        current_state: seed.current_state,
      });

      return {
        id: seed.signal_id,
        vertical_engine: 'INDUSTRIAL_FLEET_OSHA',
        signal_category: seed.signal_category,
        signal_hash: computeSignalHash(entity.id, seed.external_filing_id, seed.current_state),
        signal_title: seed.signal_title,
        signal_summary: seed.signal_summary,
        previous_state: seed.previous_state,
        current_state: seed.current_state,
        financial_exposure_usd: seed.financial_exposure_usd,
        urgency,
        detected_at: new Date(Date.now() - seed.age_days * 86_400_000).toISOString(),
        delivered_batch_id: '2026-W48',
        entity,
        facility: {
          id: seed.facility_id,
          entity_id: entity.id,
          facility_name: seed.facility_name,
          site_type: seed.site_type,
          epa_registry_id: seed.epa_registry_id,
          osha_establishment_id: seed.osha_establishment_id,
          cms_ccn: null,
          fmcsa_terminal_id: seed.fmcsa_terminal_id,
          municipal_parcel_id: null,
          address_line1: seed.hq_address_line1,
          city: seed.hq_city,
          state: seed.hq_state,
          zip5: seed.hq_zip,
          latitude: seed.hq_state === 'IL' ? 41.5051 : 41.4201,
          longitude: seed.hq_state === 'IL' ? -88.1225 : -81.8241,
          operating_status: 'ACTIVE',
        },
        filing: {
          id: `fil_${seed.signal_id}`,
          entity_id: entity.id,
          facility_id: seed.facility_id,
          source_provenance_id: provenance.id,
          source_system: seed.source_system,
          external_filing_id: seed.external_filing_id,
          filing_type: seed.filing_type,
          filing_date: seed.filing_date,
          effective_date: seed.filing_date,
          expiration_date: seed.expiration_date,
          abatement_deadline: seed.abatement_deadline,
          status: seed.expiration_date ? 'PENDING_CANCELLATION' : 'CITED',
          financial_penalty_usd:
            seed.filing_type === 'OSHA_CITATION_ISSUED' ? seed.financial_exposure_usd : 0,
          estimated_project_value_usd:
            seed.filing_type === 'FMCSA_INSURANCE_CANCELLATION' ? seed.financial_exposure_usd : 0,
          severity_tier: seed.severity_tier,
          citation_codes: seed.citation_codes,
          raw_summary: seed.signal_summary,
          payload_sha256: filingPayloadSha,
        },
        provenance,
        buying_committee: verifiedContacts,
      };
    });
  }
}

export const industrialFleetOshaAdapter = new IndustrialFleetOshaAdapter();

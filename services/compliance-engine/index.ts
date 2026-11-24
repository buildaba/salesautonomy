/**
 * Sales Autonomy — Compliance Engine Barrel Export
 */

export * from './core/provenance';
export * from './core/entityResolver';
export * from './core/contactWaterfall';
export * from './core/deliveryEngine';

export * from './adapters/healthcare_nppes';
export * from './adapters/industrial_fleet_osha';
export * from './adapters/public_sector_sam';

import * as fs from 'node:fs';
import * as path from 'node:path';
import { healthcareNppesAdapter } from './adapters/healthcare_nppes';
import { industrialFleetOshaAdapter } from './adapters/industrial_fleet_osha';
import { publicSectorSamAdapter } from './adapters/public_sector_sam';
import { CanonicalSignalDelta } from './core/deliveryEngine';
import type { LiveIngestionManifest } from './ingest_live_batch';

export interface VerticalEngineSummary {
  id: 'HEALTHCARE_NPPES' | 'INDUSTRIAL_FLEET_OSHA' | 'PUBLIC_SECTOR_SAM';
  name: string;
  tagline: string;
  primary_sources: string[];
  corporate_backbone: string;
  target_buyers: string[];
  monetizable_triggers: string[];
  active_entities_indexed: number;
  weekly_delta_signals: number;
  verified_contacts_ready: number;
  avg_bounce_risk_score: number;
  refresh_cadence: string;
}

export const VERTICAL_ENGINES_METADATA: readonly VerticalEngineSummary[] = [
  {
    id: 'HEALTHCARE_NPPES',
    name: 'Engine 1: Healthcare & Multi-Site Clinic Graph',
    tagline:
      'CMS Type-2 Organization NPIs + HHS OIG LEIE Exclusion Deltas + CMS Condition-Level Deficiencies',
    primary_sources: [
      'CMS NPPES Type-2 Organization Registry (API v2.1 & Weekly Dissemination)',
      'HHS OIG LEIE Federal Exclusion Table (UPDATED.csv)',
      'CMS QCOR Condition-Level Survey Deficiencies',
      'DOL Form 5500 Health & Welfare Benefit Filings',
    ],
    corporate_backbone: '10-Digit Type-2 Org NPI <-> 9-Digit IRS/DOL EIN Crosswalk',
    target_buyers: [
      'Healthcare Credentialing & Compliance SaaS',
      'Medical Malpractice & Cyber Liability Brokers',
      'Revenue Cycle Management (RCM) & EHR Vendors',
      'Healthcare PE Roll-Up & Advisory Firms',
    ],
    monetizable_triggers: [
      'CMS Condition-Level Survey Deficiency (30-Day Plan of Correction Deadline)',
      'HHS OIG LEIE Monthly Staff/Provider Exclusion Cross-Match',
      'Multi-Site Clinic Expansion (+2 or more new Type-2 NPI Subparts)',
    ],
    active_entities_indexed: 184200,
    weekly_delta_signals: 1420,
    verified_contacts_ready: 312800,
    avg_bounce_risk_score: 0.004,
    refresh_cadence: 'Weekly CMS Delta + Monthly OIG LEIE Atomic Swap',
  },
  {
    id: 'INDUSTRIAL_FLEET_OSHA',
    name: 'Engine 2: Industrial, Fleet & Facility Risk Graph',
    tagline:
      'FMCSA 30-Day BMC-35 Insurance Cancellations + OSHA Newly Opened Inspections & High-Penalty Citations + EPA ECHO',
    primary_sources: [
      'U.S. DOT FMCSA Licensing & Insurance (Form BMC-35 Cancellations & BMC-91X Renewals)',
      'DOL OSHA Enforcement Inspections (Newly Opened & Willful/Repeat/Serious Citations)',
      'EPA ECHO / FRS 12-Digit Facility Registry (CAA, CWA, RCRA Violations)',
      'DOL Form 5500 EFAST2 Corporate Backbone (Exact Active Headcount & CFO/HR Signatory)',
    ],
    corporate_backbone: 'USDOT / EPA FRS / OSHA Establishment <-> DOL Form 5500 EIN Crosswalk',
    target_buyers: [
      'Commercial Fleet & Workers Comp Insurance Brokers',
      'EHS, Lockout/Tagout & Fleet Telematics SaaS',
      'Industrial Safety & Environmental Remediation Consultants',
      'Occupational Health & Staffing Providers',
    ],
    monetizable_triggers: [
      'FMCSA Form BMC-35 30-Day Insurance Cancellation Notice (5–500+ Power Units)',
      'OSHA Newly Opened Inspection & High-Penalty Citation (30–90d Abatement Window)',
      'EPA ECHO Significant Non-Compliance (SNC) & 5-Year OSHA Repeat Lookback Exposure',
    ],
    active_entities_indexed: 246800,
    weekly_delta_signals: 2890,
    verified_contacts_ready: 418500,
    avg_bounce_risk_score: 0.005,
    refresh_cadence: 'Daily FMCSA L&I + Nightly OSHA Enforcement Delta',
  },
  {
    id: 'PUBLIC_SECTOR_SAM',
    name: 'Engine 3: Public Sector, Contractors & Permits Graph',
    tagline:
      'SAM.gov 30/60/90-Day Registration Expirations + USAspending Contract Recompetes + Socrata Commercial Permits >$100K',
    primary_sources: [
      'SAM.gov Entity Management API v3 (UEI, CAGE, Native entityUrl & Expiration Dates)',
      'USAspending.gov Federal Prime Contract Awards & Option-Year End Dates',
      'Municipal Socrata & ArcGIS Commercial Building Permits >$100K',
      'DOL Form 5500 Corporate Backbone',
    ],
    corporate_backbone: '12-Char SAM.gov UEI <-> 9-Digit EIN <-> Municipal Parcel Crosswalk',
    target_buyers: [
      'GovCon Compliance, CMMC & FedRAMP Advisory Firms',
      'Surety Bond, Builders Risk & Commercial Lines Brokers',
      'Commercial Construction Equipment & Materials Suppliers',
      'B2G Proposal & Capture Management SaaS',
    ],
    monetizable_triggers: [
      'SAM.gov Registration Expiring in 30/60/90 Days with Active Federal Obligations',
      'USAspending Incumbent Federal Contract Recompete Window (<90 Days)',
      'Commercial Industrial Building Permit Issued (>$100K to $10M+ Job Valuation)',
    ],
    active_entities_indexed: 319400,
    weekly_delta_signals: 3640,
    verified_contacts_ready: 524900,
    avg_bounce_risk_score: 0.003,
    refresh_cadence: 'Daily SAM.gov Expiration Scan + Daily Socrata Permit Sync',
  },
];

/**
 * Loads the latest live-ingested federal batch manifest from `data/live_ingested_seed.json` if present.
 */
export function getLiveIngestionManifest(): Omit<LiveIngestionManifest, 'signals'> | null {
  try {
    const candidatePaths = [
      path.resolve(process.cwd(), '../services/compliance-engine/data/live_ingested_seed.json'),
      path.resolve(process.cwd(), 'services/compliance-engine/data/live_ingested_seed.json'),
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        const raw = JSON.parse(fs.readFileSync(p, 'utf-8')) as LiveIngestionManifest;
        const { signals: _signals, ...manifestMeta } = raw;
        return manifestMeta;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Aggregates all pre-cleaned canonical 6-table signals across all 3 vertical engines
 * PLUS any live-ingested federal records from `data/live_ingested_seed.json`,
 * sorted by composite urgency score descending.
 */
export function getAllCanonicalVaultSignals(): CanonicalSignalDelta[] {
  const curated = [
    ...healthcareNppesAdapter.getPreCleanedSignals(),
    ...industrialFleetOshaAdapter.getPreCleanedSignals(),
    ...publicSectorSamAdapter.getPreCleanedSignals(),
  ];

  let liveSignals: CanonicalSignalDelta[] = [];
  try {
    const candidatePaths = [
      path.resolve(process.cwd(), '../services/compliance-engine/data/live_ingested_seed.json'),
      path.resolve(process.cwd(), 'services/compliance-engine/data/live_ingested_seed.json'),
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        const parsed = JSON.parse(fs.readFileSync(p, 'utf-8')) as {
          signals?: CanonicalSignalDelta[];
        };
        if (Array.isArray(parsed.signals)) {
          liveSignals = parsed.signals;
          break;
        }
      }
    }
  } catch {
    // Fallback to curated signals if file is being written
  }

  const all = [...curated, ...liveSignals];
  return all.sort((a, b) => b.urgency.urgency_score - a.urgency.urgency_score);
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Database, Sparkles } from "lucide-react";
import { PowerTableExplorer } from "@/components/vault/PowerTableExplorer";

const SIX_CANONICAL_TABLES = [
  {
    table: "01 · sources_provenance",
    purpose: "SHA-256 payload receipts and 5-tier source authority ranking",
    columns:
      "source_id, source_name, authority_tier (1..5), source_url, filing_date, captured_at, payload_sha256, verbatim_excerpt",
    whyItMatters:
      "Every fact in the vault points to an immutable receipt. Tier 1 federal filings (SAM.gov, DOL Form 5500, FMCSA, CMS, OSHA, EPA) outrank Tier 4–5 web scrapes in code.",
  },
  {
    table: "02 · entities",
    purpose: "Canonical corporate spine cross-joined across UEI, EIN, NPI-2 & USDOT",
    columns:
      "entity_id, legal_name, normalized_name, domain, sam_uei, dol_ein, npi_org, usdot_number, form5500_active_participants, field_provenance_jsonb",
    whyItMatters:
      "Links 700,000 verified SAM.gov domains and 650,000 DOL Form 5500 employee headcounts to physical-world fleets, clinics, plants, and contractors.",
  },
  {
    table: "03 · facilities_sites",
    purpose: "Every physical clinic branch, plant, terminal, or permitted job site",
    columns:
      "facility_id, entity_id, site_name, street_address, city, state, zip5, epa_frs_id, ccn_id, booking_widget_tech, site_status",
    whyItMatters:
      "Resolves 20 local clinics or 4 manufacturing plants back to the 1 parent corporate buyer that signs the master contract.",
  },
  {
    table: "04 · compliance_filings",
    purpose: "Dated regulatory filings, policies, inspections, awards & permits",
    columns:
      "filing_id, entity_id, facility_id, engine_type, filing_code (BMC-35, F-880, OSHA_OPEN, SAM_EXP, PERMIT), effective_date, deadline_date, valuation_amount, source_id",
    whyItMatters:
      "Stores raw forward-looking compliance deadlines (30-day BMC-35 policy cancellations, 45-day CMS plans of correction, 30/60/90-day SAM renewals).",
  },
  {
    table: "05 · signals_deltas",
    purpose: "DuckDB SHA-256 delta triggers with daily exponential half-life decay",
    columns:
      "signal_id, entity_id, filing_id, signal_type, urgency_tier, forward_window_days, initial_weight, half_life_days, current_decayed_score, last_decayed_at",
    whyItMatters:
      "Re-computes live urgency every 24 hours via W(t) = W0 * 0.5^(t / half_life). Old triggers drop out of SDR queues automatically if no new activity lands.",
  },
  {
    table: "06 · contacts",
    purpose: "CPA-filtered corporate officers with Hybrid Just-In-Time <2% bounce verification",
    columns:
      "contact_id, entity_id, full_name, title, role_tier, cpa_filter_passed, verified_email, direct_phone, smtp_catchall_status, last_verified_at, source_id",
    whyItMatters:
      "Strips third-party CPAs, law firms, and registered agents using a 50-keyword exclusion gate, then runs Just-In-Time Catch-All SMTP verification on unlock.",
  },
];

export default function LiveDatabaseDemoPage() {
  const [viewMode, setViewMode] = useState<"explorer" | "schema">("explorer");

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header — buildaba.com editorial style */}
        <div className="mb-10 pb-8 border-b border-black/10">
          <p className="text-xs font-medium text-[#6b665e] mb-3">
            Interactive Vault Sandbox · 66 Live Canonical Signals · 6-Table Schema
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#141413] font-medium leading-[1.08]">
                Inspect our live vertical engines.
              </h1>
              <p className="text-base sm:text-lg text-[#5c5852] mt-3 max-w-2xl leading-relaxed">
                Filter 66 live production compliance records across Healthcare Clinics, Fleet &amp;
                Industrial Risk, and Commercial Permits. Click any row to open the 3-tab dossier,
                SHA-256 receipts, and CPA-filtered buyers.
              </p>
            </div>

            {/* White rounded-xl pill tab switcher matching buildaba.com */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-black/10 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("explorer")}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  viewMode === "explorer"
                    ? "bg-[#141413] text-[#faf9f5]"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                PowerTable Explorer (66 Rows)
              </button>
              <button
                type="button"
                onClick={() => setViewMode("schema")}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  viewMode === "schema"
                    ? "bg-[#141413] text-[#faf9f5]"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                6-Table Canonical Schema
              </button>
            </div>
          </div>
        </div>

        {viewMode === "explorer" ? (
          <div className="space-y-8">
            {/* Engine Summary Strip — buildaba.com rounded-2xl cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                  Engine 01 · Healthcare &amp; Clinics
                </div>
                <h2 className="text-lg font-serif font-medium text-[#141413] mb-1.5">
                  Multi-Site Clinic &amp; SNF Graph
                </h2>
                <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                  NPPES Org Type-2 groups, Authorized Official owners/CMOs, state license additions,
                  booking-widget EHR DOM detection, and CMS F-tag citations.
                </p>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                  Engine 02 · Industrial &amp; Fleet Risk
                </div>
                <h2 className="text-lg font-serif font-medium text-[#141413] mb-1.5">
                  FMCSA, OSHA &amp; EPA Facility Graph
                </h2>
                <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                  15–250+ truck fleets with 30-day Form BMC-35 policy cancellations &amp; renewals,
                  opened Federal OSHA inspections, and EPA ECHO schedules joined to DOL Form 5500.
                </p>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                  Engine 03 · Commercial Permits
                </div>
                <h2 className="text-lg font-serif font-medium text-[#141413] mb-1.5">
                  SAM.gov, USAspending &amp; Permits
                </h2>
                <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                  Daily 30/60/90-day SAM.gov registration expirations, 700K native entityUrl domains,
                  and Socrata/ArcGIS commercial building permits over $250K.
                </p>
              </div>
            </div>

            {/* Interactive PowerTable + SignalDossierDrawer */}
            <PowerTableExplorer />
          </div>
        ) : (
          /* ── VIEW 2: 6-TABLE CANONICAL SCHEMA & ATOMIC PROVENANCE MERGER ── */
          <div className="space-y-8">
            <div className="bg-white border border-black/10 rounded-2xl p-7 sm:p-10 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="max-w-3xl mb-8">
                <p className="text-xs font-medium text-[#6b665e] mb-2">
                  Universal 6-Table Canonical Postgres / Supabase Architecture
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413] mb-3">
                  Six relational tables guarded by atomic provenance locks.
                </h2>
                <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
                  Spreadsheets collapse when a company operates 14 clinics, files permits under
                  subsidiary LLCs, and triggers multiple compliance events. Every client deployment
                  uses this exact six-table schema with DuckDB SHA-256 delta ingestion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {SIX_CANONICAL_TABLES.map((t) => (
                  <div
                    key={t.table}
                    className="bg-[#faf9f5] border border-black/8 rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                        <Database className="w-3 h-3" />
                        {t.table}
                      </div>
                      <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
                        {t.purpose}
                      </h3>
                      <div className="p-3 bg-white border border-black/8 rounded-xl font-mono text-xs text-[#141413]/80 mb-3">
                        {t.columns}
                      </div>
                      <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                        {t.whyItMatters}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Atomic Provenance Merger Code Spec */}
              <div className="bg-[#f0eee6] border border-black/10 rounded-2xl p-6 sm:p-7">
                <div className="text-xs font-medium text-[#2e6f40] mb-1.5">
                  Atomic Source-Hierarchy Merger · fn_provenance_update()
                </div>
                <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
                  Why lower-tier web scrapes can never corrupt federal facts
                </h3>
                <p className="text-sm text-[#5c5852] leading-relaxed mb-4">
                  Every column on <code className="font-mono text-[#141413]">entities</code> and{" "}
                  <code className="font-mono text-[#141413]">contacts</code> tracks its authority
                  rank inside <code className="font-mono text-[#141413]">field_provenance_jsonb</code>.
                  When a new crawler run lands, Postgres evaluates authority rank before updating any
                  value:
                </p>
                <div className="p-4 bg-white border border-black/10 rounded-xl font-mono text-xs text-[#141413] overflow-x-auto leading-relaxed">
                  Tier 1 (Federal Statutory: SAM.gov, DOL Form 5500, FMCSA, CMS NPPES, OSHA, EPA)
                  &gt; Tier 2 (State Licensing &amp; Municipal Socrata Permits) &gt; Tier 3 (First-Party
                  Subdomain &amp; Booking DOM) &gt; Tier 4 (Trade Directories) &gt; Tier 5 (Third-Party Web)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Dual CTA Banner */}
        <div className="mt-14 bg-[#f0eee6] border border-black/12 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium text-[#2e6f40] mb-1.5">
              Test Us Against Your Current CRM Export First
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
              Run the 7-Day Territory &amp; CRM Whitespace Pilot for $1,950.
            </h3>
            <p className="text-sm text-[#5c5852] mt-1.5 max-w-2xl leading-relaxed">
              Receive 2,500 enriched accounts, 5,000 verified buyers, active forward-looking
              triggers, and a TAM Whitespace Gap Report. 100% of your $1,950 credits toward full
              deployment.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/hire/apply"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Start $1,950 Territory Pilot
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-white border border-black/14 hover:bg-[#faf9f5] text-[#141413] text-sm font-medium flex items-center justify-center transition-colors"
            >
              View Commercial Ladder
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

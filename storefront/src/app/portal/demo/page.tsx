"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-10 pb-8 border-b border-black/10">
          <div className="inline-block mb-4 px-3.5 py-1 rounded-full border border-black/10 text-[#111111]/70 text-xs uppercase tracking-[0.15em] font-medium">
            Interactive Vault Sandbox • 3 Pre-Cleaned Vertical Engines &amp; 6-Table Canonical Schema
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-[#111111] leading-[1.06]">
                Inspect Our Live Vertical Engines.
              </h1>
              <p className="text-lg text-[#111111]/65 font-light mt-3 max-w-2xl leading-relaxed">
                Filter 12 red-team-verified records across Healthcare Clinics, Industrial/Fleet Risk, and Public Sector Permits. Click any row to inspect the 3-tab dossier, SHA-256 receipts, and CPA-filtered buyers.
              </p>
            </div>

            {/* Toggle: Interactive PowerTable vs 6-Table Canonical Schema */}
            <div className="flex border border-black/15 bg-white p-1 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("explorer")}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer ${
                  viewMode === "explorer"
                    ? "bg-[#111111] text-white"
                    : "text-[#111111]/70 hover:text-[#111111]"
                }`}
              >
                PowerTable Explorer (12 Rows)
              </button>
              <button
                type="button"
                onClick={() => setViewMode("schema")}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer ${
                  viewMode === "schema"
                    ? "bg-[#111111] text-white"
                    : "text-[#111111]/70 hover:text-[#111111]"
                }`}
              >
                6-Table Canonical Schema
              </button>
            </div>
          </div>
        </div>

        {viewMode === "explorer" ? (
          <div className="space-y-10">
            {/* Engine Summary Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
              <div className="bg-white p-6">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#d9534f] font-semibold mb-1">
                  Engine 01 • Healthcare &amp; Clinics
                </div>
                <h2 className="text-xl font-serif text-[#111111] mb-1.5">
                  Multi-Site Clinic &amp; SNF Graph
                </h2>
                <p className="text-xs text-[#111111]/65 leading-relaxed">
                  NPPES Org Type-2 groups, Authorized Official owners/CMOs, state license additions, booking-widget EHR DOM detection, CMS F-tag citations, and OIG LEIE checks.
                </p>
              </div>
              <div className="bg-white p-6">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#d9534f] font-semibold mb-1">
                  Engine 02 • Industrial &amp; Fleet Risk
                </div>
                <h2 className="text-xl font-serif text-[#111111] mb-1.5">
                  FMCSA, OSHA &amp; EPA Facility Graph
                </h2>
                <p className="text-xs text-[#111111]/65 leading-relaxed">
                  5–500+ truck fleets with 30-day Form BMC-35 policy cancellations &amp; 60/90-day renewals, newly opened Federal OSHA inspections, and EPA ECHO schedules joined to DOL Form 5500 EINs.
                </p>
              </div>
              <div className="bg-white p-6">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#d9534f] font-semibold mb-1">
                  Engine 03 • Public Sector &amp; Permits
                </div>
                <h2 className="text-xl font-serif text-[#111111] mb-1.5">
                  SAM.gov, USAspending &amp; Permits
                </h2>
                <p className="text-xs text-[#111111]/65 leading-relaxed">
                  Daily 30/60/90-day SAM.gov registration expirations, 700K native entityUrl domains, USAspending contract recompete windows, and Socrata/ArcGIS commercial building permits &gt;$100K.
                </p>
              </div>
            </div>

            {/* Interactive PowerTable + SignalDossierDrawer */}
            <PowerTableExplorer />
          </div>
        ) : (
          /* ── VIEW 2: 6-TABLE CANONICAL SCHEMA & ATOMIC PROVENANCE MERGER ── */
          <div className="space-y-10">
            <div className="bg-white border border-black/10 p-8 md:p-12">
              <div className="max-w-3xl mb-10">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
                  Universal 6-Table Canonical Postgres / Supabase Architecture
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#111111] mb-4">
                  Six relational tables guarded by atomic provenance locks.
                </h2>
                <p className="text-base text-[#111111]/65 font-light leading-relaxed">
                  Spreadsheets collapse when a company operates 14 clinics, files permits under subsidiary LLCs, and triggers multiple compliance events. Every client deployment uses this exact six-table schema with DuckDB SHA-256 delta ingestion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10 mb-10">
                {SIX_CANONICAL_TABLES.map((t) => (
                  <div
                    key={t.table}
                    className="bg-[#fcfaf8] p-8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono uppercase tracking-[0.15em] text-[#d9534f] font-medium mb-2">
                        {t.table}
                      </div>
                      <h3 className="text-2xl font-serif text-[#111111] mb-2">
                        {t.purpose}
                      </h3>
                      <div className="p-3 bg-white border border-black/10 font-mono text-xs text-[#111111]/75 mb-4">
                        {t.columns}
                      </div>
                      <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
                        {t.whyItMatters}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Atomic Provenance Merger Code Spec */}
              <div className="bg-[#f5f4ef] border border-black/15 p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
                  Atomic Source-Hierarchy Merger • fn_provenance_update()
                </div>
                <h3 className="text-2xl font-serif text-[#111111] mb-3">
                  Why lower-tier web scrapes can never corrupt federal facts
                </h3>
                <p className="text-sm text-[#111111]/70 font-light leading-relaxed mb-4">
                  Every column on <code className="font-mono">entities</code> and{" "}
                  <code className="font-mono">contacts</code> tracks its authority rank inside{" "}
                  <code className="font-mono">field_provenance_jsonb</code>. When a new crawler run
                  lands, Postgres evaluates authority rank before updating any value:
                </p>
                <div className="p-4 bg-white border border-black/10 font-mono text-xs text-[#111111]/85 overflow-x-auto leading-relaxed">
                  Tier 1 (Federal Statutory: SAM.gov, DOL Form 5500, FMCSA, CMS NPPES, OSHA, EPA)
                  &gt; Tier 2 (State Licensing &amp; Municipal Socrata Permits) &gt; Tier 3 (First-Party
                  Subdomain &amp; Booking DOM) &gt; Tier 4 (Trade Directories) &gt; Tier 5 (Third-Party Web)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Dual CTA Banner */}
        <div className="mt-16 bg-[#f5f4ef] border border-black/10 p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              Test Us Against Your Current CRM Export First
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-[#111111]">
              Run the 7-Day Territory &amp; CRM Whitespace Pilot for $1,950.
            </h3>
            <p className="text-sm text-[#111111]/65 font-light mt-1">
              Receive 2,500 enriched accounts, 5,000 verified buyers, active forward-looking triggers, and a TAM Whitespace Gap Report. 100% of your $1,950 credits toward full deployment.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <Link
              href="/hire/apply"
              className="px-7 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium text-center transition-colors"
            >
              Start $1,950 Territory Pilot →
            </Link>
            <Link
              href="/pricing"
              className="px-7 py-3.5 bg-white border border-black/20 hover:border-black text-[#111111] text-xs uppercase tracking-[0.15em] font-medium text-center transition-colors"
            >
              View Commercial Ladder →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Check, Layers } from "lucide-react";

const DATA_PLAYS = [
  {
    num: "Play 01 · Shared Corporate Backbone (SAM.gov + DOL Form 5500)",
    title: "700K Verified Domains Joined to 650K EIN Headcounts & CFOs",
    tagline: "SAM.gov entityUrl + DOL EFAST2 Form 5500 + 50-Keyword CPA Filter",
    steps: [
      "Pull 700,000+ active SAM.gov entities with their government-verified entityUrl corporate domain and UEI/CAGE identifiers.",
      "Cross-join 650,000+ DOL Form 5500 welfare and retirement filings by EIN and normalized legal name to attach exact active employee headcount.",
      "Extract the Form 5500 Plan Administrator and SAM.gov Government Business POC, then run our 50-keyword CPA and registered-agent exclusion filter.",
      "Lock every verified Tier 1 federal field inside Postgres via fn_provenance_update so lower-tier web scrapes can never overwrite it.",
    ],
  },
  {
    num: "Play 02 · Engine 1 (Healthcare & Multi-Site Clinic Graph)",
    title: "NPPES Org Type-2 Groups, Clinic Owners & CMS F-Tag Triggers",
    tagline: "CMS NPPES Monthly Delta + Care Compare F-Tags + Booking Widget DOM",
    steps: [
      "Group individual Type-1 providers and secondary practice addresses under their parent NPPES Organization Type-2 entity and Form 5500 EIN.",
      "Extract the named Authorized Official (Practice Owner, Managing Partner, or CMO) and check every entity against the OIG LEIE exclusion list.",
      "Inspect clinic patient-booking subdomains to detect live EHR and scheduling software (Athenahealth, ModMed EMA, Dentrix Enterprise, NextGen).",
      "Alert reps when a group adds a new state clinic license, pulls a medical build-out permit, or enters a 45-day CMS F-tag Plan of Correction window.",
    ],
  },
  {
    num: "Play 03 · Engine 2 (Industrial, Fleet & Facility Risk Graph)",
    title: "30-Day BMC-35 Insurance Cancellations & Newly Opened OSHA Inspections",
    tagline: "FMCSA L&I Daily Feed + Federal OSHA OPEN_DATE + EPA ECHO + Form 5500",
    steps: [
      "Ingest daily FMCSA Licensing & Insurance (L&I) active and pending feeds for 15–250+ truck fleets to catch Form BMC-35 30-day policy cancellation notices.",
      "Roll forward Form BMC-91X policy effective dates to flag 60-day and 90-day annual insurance renewal windows before brokers lock the account.",
      "Track newly opened Federal OSHA inspections (OPEN_DATE within 7 days), 30–90 day abatement deadlines, and repeat-violation Ex-Mod spike risk.",
      "Cross-join USDOT and EPA FRS plant IDs against DOL Form 5500 to deliver the internal CFO, VP of HR, and VP of Fleet Safety.",
    ],
  },
  {
    num: "Play 04 · Engine 3 (Public Sector, Contractors & Permits Graph)",
    title: "SAM.gov 30/60/90d Expirations, Recompetes & Permits >$250K",
    tagline: "SAM.gov API v3 + USAspending Delta + Socrata/ArcGIS Permit Portals",
    steps: [
      "Monitor SAM.gov registrationExpirationDate daily to surface federal and municipal contractors 30, 60, and 90 days before their bidding eligibility lapses.",
      "Join USAspending contract awards to flag first-time prime or sub-award winners and active contracts entering a 60-day recompete window.",
      "Pull commercial and industrial building permits >$250K from Socrata and ArcGIS municipal portals and resolve subsidiary permit LLCs to parent accounts.",
      "Verify the internal VP of Contracts, CISO, or VP of Procurement through our Hybrid Just-In-Time Catch-All SMTP pipeline (<2% bounce SLA).",
    ],
  },
  {
    num: "Play 05 · DuckDB SHA-256 Deltas & Exponential Decay",
    title: "Daily Half-Life Signal Decay Wired Into HubSpot, Salesforce & Clay",
    tagline: "DuckDB Hash Diff + Postgres pg_cron + Non-Destructive CRM Sync",
    steps: [
      "Hash every incoming statutory record with SHA-256 inside DuckDB so only genuine field changes emit a new row into signals_deltas.",
      "Run a daily pg_cron exponential decay job W(t) = W0 * 0.5^(t / half_life) so aging triggers lose priority every 24 hours automatically.",
      "Suppress existing customers, open opportunities, and CCPA/DROP opt-outs before routing fresh 30/60/90-day triggers into SDR queues.",
      "Write dated Signal objects and SHA-256 provenance URLs into HubSpot, Salesforce, or Clay without overwriting rep-owned notes.",
    ],
  },
];

export default function DataPlaysPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413]">
      {/* Hero Section — buildaba.com left-aligned calm editorial style */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#6b665e] mb-4">
              Open-Book Vertical Data Engineering Architecture
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif tracking-tight mb-5 leading-[1.08] text-[#141413] font-medium">
              How we build the three vertical databases you cannot buy from Apollo.
            </h1>
            <p className="text-base sm:text-lg text-[#5c5852] mb-8 leading-relaxed">
              Here are the exact five engineering plays that power our Healthcare, Fleet &amp;
              Industrial, and Commercial Permit vaults. Test our pre-cleaned records against your
              CRM in 7 days for $1,950, or plug straight into our API and managed CRM deployment.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/hire/apply"
                className="min-h-[48px] px-6 py-3.5 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Start 7-Day Territory Pilot ($1,950)
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portal/demo"
                className="min-h-[48px] px-6 py-3.5 rounded-xl bg-white border border-black/14 hover:bg-[#f0eee6] text-[#141413] text-sm font-medium transition-colors flex items-center justify-center"
              >
                Inspect 66 Live Rows in PowerTable
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Data Plays List */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-black/10">
        <div className="space-y-8">
          {DATA_PLAYS.map((play, idx) => (
            <div
              key={idx}
              className="bg-white border border-black/10 rounded-2xl p-7 sm:p-9 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/8">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-1 rounded-md mb-2.5">
                    <Layers className="w-3.5 h-3.5" />
                    {play.num}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
                    {play.title}
                  </h2>
                  <p className="text-xs font-mono text-[#6b665e] mt-1.5">Stack: {play.tagline}</p>
                </div>
                <Link
                  href="/hire/apply"
                  className="min-h-[42px] px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-xs sm:text-sm font-medium transition-colors self-start md:self-auto shrink-0 inline-flex items-center gap-2"
                >
                  Deploy This Engine
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                {play.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-[#faf9f5] border border-black/8 rounded-xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] mb-2">
                        <Check className="w-3.5 h-3.5" />
                        Step 0{sIdx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 border-t border-black/10 bg-[#f0eee6]/65">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium text-[#2e6f40] mb-2">
            7-Day Territory &amp; CRM Whitespace Pilot
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight mb-4 text-[#141413] font-medium">
            See how many physical-world buyers your CRM is missing.
          </h2>
          <p className="text-base sm:text-lg text-[#5c5852] leading-relaxed mb-8 max-w-2xl">
            Start with our 7-Day Territory &amp; CRM Whitespace Pilot for $1,950 (100% credited
            toward full deployment), or subscribe to our PowerTable &amp; Credit-Metered API Plan
            for $799/mo.
          </p>
          <Link
            href="/hire/apply"
            className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3.5 rounded-xl bg-[#141413] text-[#faf9f5] hover:bg-[#2a2927] text-sm font-medium transition-colors shadow-sm"
          >
            Scope Your 7-Day Territory Pilot
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

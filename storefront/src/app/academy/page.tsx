"use client";

import Link from "next/link";

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
      "Ingest daily FMCSA Licensing & Insurance (L&I) active and pending feeds for 5–500+ truck fleets to catch Form BMC-35 30-day policy cancellation notices.",
      "Roll forward Form BMC-91X policy effective dates to flag 60-day and 90-day annual insurance renewal windows before brokers lock the account.",
      "Track newly opened Federal OSHA inspections (OPEN_DATE within 7 days), 30–90 day abatement deadlines, and repeat-violation Ex-Mod spike risk.",
      "Cross-join USDOT and EPA FRS plant IDs against DOL Form 5500 to deliver the internal CFO, VP of HR, and VP of Fleet Safety.",
    ],
  },
  {
    num: "Play 04 · Engine 3 (Public Sector, Contractors & Permits Graph)",
    title: "SAM.gov 30/60/90d Expirations, Recompetes & Permits >$100K",
    tagline: "SAM.gov API v3 + USAspending Delta + Socrata/ArcGIS Permit Portals",
    steps: [
      "Monitor SAM.gov registrationExpirationDate daily to surface federal and municipal contractors 30, 60, and 90 days before their bidding eligibility lapses.",
      "Join USAspending contract awards to flag first-time prime or sub-award winners and active contracts entering a 60-day recompete window.",
      "Pull commercial and industrial building permits >$100K from Socrata and ArcGIS municipal portals and resolve subsidiary permit LLCs to parent accounts.",
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
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111]">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="inline-block mb-8 px-4 py-1.5 rounded-full border border-black/10 text-[#111111]/70 text-sm font-medium tracking-wide">
          Our Open-Book Vertical Data Engineering Architecture
        </div>
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8 leading-[1.08]">
          How we build the three engines
          <br />
          <span className="text-[#111111]/60 italic font-light">
            you cannot buy from Apollo.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[#111111]/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Here are the exact five engineering plays that power our Healthcare, Industrial/Fleet, and Public Sector engines. Test our pre-cleaned records against your CRM in 7 days for $1,950, or plug straight into our API and managed CRM deployment.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/hire/apply"
            className="px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white font-medium transition-colors text-base w-full sm:w-auto"
          >
            Start 7-Day Territory Pilot ($1,950)
          </Link>
          <Link
            href="/portal/demo"
            className="px-8 py-4 bg-white border border-black/20 hover:border-black text-[#111111] font-medium transition-colors text-base w-full sm:w-auto"
          >
            Inspect 12 Live Rows in PowerTable
          </Link>
        </div>
      </section>

      {/* 5 Data Plays List */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-black/10">
        <div className="space-y-10">
          {DATA_PLAYS.map((play, idx) => (
            <div
              key={idx}
              className="bg-white border border-black/10 p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-black/10">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
                    {play.num}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#111111]">
                    {play.title}
                  </h2>
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#111111]/50 mt-2">
                    Stack: {play.tagline}
                  </p>
                </div>
                <Link
                  href="/hire/apply"
                  className="px-6 py-3 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium transition-colors self-start md:self-auto shrink-0"
                >
                  Deploy This Engine →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-black/10 border border-black/10 mt-8">
                {play.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-[#fcfaf8] p-6">
                    <div className="text-[11px] uppercase tracking-[0.15em] text-[#d9534f] font-medium mb-2">
                      Step 0{sIdx + 1}
                    </div>
                    <p className="text-sm text-[#111111]/80 font-light leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 border-t border-black/10 bg-[#f5f4ef]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-6 text-[#111111]">
            Ready to see how many physical-world buyers your CRM is missing?
          </h2>
          <p className="text-lg text-[#111111]/70 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Start with our 7-Day Territory &amp; CRM Whitespace Pilot for $1,950 (100% credited toward full deployment), or subscribe to our PowerTable &amp; Credit-Metered API Plan for $799/mo.
          </p>
          <Link
            href="/hire/apply"
            className="inline-block px-8 py-4 bg-[#111111] text-white hover:bg-[#333333] font-medium transition-colors"
          >
            Scope Your 7-Day Territory Pilot →
          </Link>
        </div>
      </section>
    </div>
  );
}

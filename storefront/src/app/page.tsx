"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PowerTableExplorer } from "@/components/vault/PowerTableExplorer";

const VERTICAL_ENGINES = [
  {
    id: "Engine 1 · Healthcare & Clinics",
    title: "Healthcare & Multi-Site Clinic Graph",
    subtitle:
      "NPPES Type-2 Groups • Authorized Officials • CMS Deficiencies • Booking Widget EHR",
    whyStandardFails:
      "Apollo lists a 14-clinic orthopedic group as 12 employees and has no idea who owns the practice or which EHR runs their booking page.",
    schemaSummary: [
      { label: "Entity Backbone", value: "NPPES Org Type-2 + EIN" },
      { label: "Verified Headcount", value: "DOL Form 5500 Active Lives" },
      { label: "Booking Tech", value: "Athena / ModMed / Dentrix" },
      { label: "Forward Trigger", value: "CMS F-Tag & Build Permits" },
      { label: "Decision Makers", value: "Authorized Official, COO, CFO" },
      { label: "Compliance Gate", value: "OIG LEIE + 50-Word CPA Filter" },
    ],
    sampleRows: [
      {
        account: "Summit Orthopedic & Spine Partners PLLC",
        fact: "14 clinic sites in TX. Filed $1.42M surgical build-out permit #BP-2026-88412 in Frisco. Booking widget runs Athenahealth.",
        source: "CMS NPPES Type-2 + Frisco Permit API + DOL Form 5500 (184 Staff)",
        contact: "Dana Mercer (COO) & Dr. Gregory Vance (Authorized Official)",
      },
      {
        account: "ClearView Dermatology & Aesthetics LLC",
        fact: "9 clinics in FL. Added 3 Florida clinic establishment licenses and migrated patient portal to ModMed EMA.",
        source: "FL Health Board + NPPES Delta + DOL Form 5500 (126 Staff)",
        contact: "Marcus Torres (VP Clinical Operations) • <2% Bounce Verified",
      },
      {
        account: "Heritage Post-Acute & Rehab Holdings Inc.",
        fact: "11 skilled nursing facilities in OH/IN. Cited for CMS F-880 deficiency with a 45-day mandatory Plan of Correction window open.",
        source: "CMS Care Compare CCN #365412 + DOL Form 5500 (412 Staff)",
        contact: "Rebecca Lin (Chief Compliance & Clinical Officer)",
      },
    ],
  },
  {
    id: "Engine 2 · Industrial & Fleet Risk",
    title: "Industrial, Fleet & Facility Risk Graph",
    subtitle:
      "FMCSA 5–500+ Truck Fleets • Form BMC-35 30d Cancellations • OSHA Open Inspections • EPA ECHO",
    whyStandardFails:
      "ZoomInfo never tells you when a 120-truck carrier gets hit with a 30-day insurance cancellation notice or a newly opened Federal OSHA inspection.",
    schemaSummary: [
      { label: "Fleet & Plant Spine", value: "USDOT + OSHA + EPA FRS" },
      { label: "Corporate Join", value: "DOL Form 5500 EIN & Staff" },
      { label: "30-Day Trigger", value: "Form BMC-35 Policy Cancel" },
      { label: "60/90-Day Trigger", value: "BMC-91X Renewal & Abatement" },
      { label: "Decision Makers", value: "Form 5500 CFO, HR & VP Safety" },
      { label: "CPA Filter Gate", value: "Strips 3rd-Party Tax Preparers" },
    ],
    sampleRows: [
      {
        account: "Heartland Cold Logistics & Freight LLC",
        fact: "118 power units in IL. Form BMC-35 Notice of Cancellation filed on primary $1M BIPD policy (#CA-9948102); coverage ends in 24 days.",
        source: "FMCSA L&I Daily Feed + DOL Form 5500 EIN 36-4189201 (148 Staff)",
        contact: "Brett Vance (CFO) & Duane Miller (VP Fleet Safety)",
      },
      {
        account: "Midwest Precision Stamping & Forge Inc.",
        fact: "3 plants in MI/OH. Federal OSHA Region 5 opened unprogrammed inspection #172948102 five days ago with machine-guarding abatement due.",
        source: "DOL OSHA Enforcement Feed + Form 5500 EIN 38-2910485 (230 Staff)",
        contact: "Kevin McAllister (VP EHS) & Sarah Lindqvist (VP HR & Risk)",
      },
      {
        account: "Apex Bulk Chemical & Tank Lines Inc.",
        fact: "245 hazmat power units in TX. Primary $5M Form BMC-91X policy reaches annual renewal anniversary in 58 days.",
        source: "FMCSA L&I Policy Roll-Forward + Form 5500 (310 Staff)",
        contact: "Travis Hollister (Chief Financial Officer) • Verified Direct Email",
      },
    ],
  },
  {
    id: "Engine 3 · Public Sector & Permits",
    title: "Public Sector, Contractors & Permits Graph",
    subtitle:
      "SAM.gov 30/60/90d Expirations • Native entityUrl Domains • USAspending Awards • Permits >$100K",
    whyStandardFails:
      "Government filings and municipal permits list subsidiary LLCs and UEI codes without linking them to corporate domains, headcount, or executives.",
    schemaSummary: [
      { label: "Verified Domains", value: "700K SAM.gov entityUrl Rows" },
      { label: "Forward Horizon", value: "30/60/90d SAM Expirations" },
      { label: "Award Velocity", value: "USAspending Recompetes" },
      { label: "Municipal Trigger", value: "Commercial Permits >$100K" },
      { label: "Decision Makers", value: "Gov Business POC, CFO, CISO" },
      { label: "Entity Resolution", value: "LLC & Address -> Parent Account" },
    ],
    sampleRows: [
      {
        account: "Precision Aerospace & Defense Systems Inc.",
        fact: "SAM.gov registration (UEI J8K4M9N2P1Q7) expires in 26 days while holding $14.8M in active Air Force sub-awards.",
        source: "SAM.gov API v3 + USAspending #FA8650-26-C + Form 5500 (215 Staff)",
        contact: "Rachel Vance (VP Contracts & SAM Gov Business POC)",
      },
      {
        account: "Vanguard Tilt-Wall & Industrial Builders LLC",
        fact: "Issued $6.2M industrial electrical and racking permit #IND-26-0914 for 240,000 sq ft hub in Memphis, TN (matched from VDC Tilt-Wall II LLC).",
        source: "Shelby County Socrata Permit API + SAM.gov UEI (164 Staff)",
        contact: "Lucas Sterling (VP Preconstruction & Procurement)",
      },
      {
        account: "Sentinel Federal Cyber & Cloud Integrators LLC",
        fact: "Won $8.4M DHS prime task order while core $14M cyber operations contract enters its 60-day recompete window.",
        source: "USAspending Award Delta API + SAM.gov entityUrl (142 Staff)",
        contact: "David Chen (CISO & VP Delivery) • Verified Direct Dial",
      },
    ],
  },
];

export default function SalesAutonomyLandingPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(VERTICAL_ENGINES[0].id);
  const [targetMarketInput, setTargetMarketInput] = useState("");

  const activeDb =
    VERTICAL_ENGINES.find((d) => d.id === selectedTab) || VERTICAL_ENGINES[0];

  const handleSandboxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/hire/apply");
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] font-sans">
      {/* ── HERO SECTION: CLEAR, DIRECT, ZERO FLUFF ─────────────────────── */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-8 px-4 py-1.5 rounded-full border border-black/10 text-[#111111]/75 text-xs md:text-sm font-medium tracking-wide">
            For B2B SaaS, Vertical Tech, Mid-Market GTM Teams (5–50 Reps) &amp; Clay Agencies
          </div>

          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8 leading-[1.05] text-[#111111]">
            Three pre-cleaned vertical databases
            <br />
            <span className="text-[#111111]/60 italic font-light">
              Apollo and ZoomInfo cannot see.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#111111]/65 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Your SDRs are starving because standard databases miss physical facilities, fleet insurance cancellations, clinic owners, and government filings. We link federal and municipal triggers to 700,000 verified SAM.gov domains and 650,000 DOL Form 5500 headcounts and CFO signers.
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
              className="px-8 py-4 bg-transparent border border-black/20 hover:border-black hover:bg-black/5 text-[#111111] font-medium transition-colors text-base w-full sm:w-auto"
            >
              Open Live PowerTable Explorer
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white border border-black/10 hover:border-black/40 text-[#111111]/80 hover:text-[#111111] font-medium transition-colors text-base w-full sm:w-auto"
            >
              See Pilot &amp; Deployment Pricing
            </Link>
          </div>

          {/* 4 Plain-English Proof Metrics */}
          <div className="mt-24 pt-12 border-t border-black/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-2">
                  7 Days
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#111111]/50 font-medium">
                  To 2,500 Enriched Pilot Accounts ($1,950)
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-2">
                  700K + 650K
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#111111]/50 font-medium">
                  SAM.gov Domains + Form 5500 EIN Backbone
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-2">
                  &lt; 2%
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#111111]/50 font-medium">
                  Just-In-Time Catch-All Bounce SLA
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-2">
                  100% Cited
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#111111]/50 font-medium">
                  SHA-256 Receipt &amp; Source URL Per Cell
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE SHARED CORPORATE BACKBONE + 3 VERTICAL ENGINES ─ */}
      <section className="py-24 px-6 border-t border-black/10 bg-[#f5f4ef]/60">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
                3 Pre-Cleaned Vertical Engines • 1 Shared Corporate Backbone
              </div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111]">
                Physical-World Triggers Joined to Real Corporate Buyers
              </h2>
              <p className="text-base md:text-lg text-[#111111]/65 font-light mt-3 max-w-3xl leading-relaxed">
                Raw government portals do not give you websites or employee counts. We cross-join every clinic, fleet, plant, and permit against 700,000 SAM.gov verified domains and 650,000 DOL Form 5500 filings—stripping out third-party CPAs with a 50-keyword filter.
              </p>
            </div>
            <Link
              href="/portal/demo"
              className="text-sm font-medium text-[#111111] underline underline-offset-4 hover:text-[#d9534f] shrink-0"
            >
              Open full 6-table schema explorer →
            </Link>
          </div>

          {/* Interactive Vertical Engine Tabs */}
          <div className="flex flex-wrap gap-px bg-black/10 border border-black/10 mb-10 w-fit">
            {VERTICAL_ENGINES.map((db) => (
              <button
                key={db.id}
                type="button"
                onClick={() => setSelectedTab(db.id)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer ${
                  selectedTab === db.id
                    ? "bg-[#111111] text-white"
                    : "bg-white text-[#111111]/70 hover:bg-[#fcfaf8] hover:text-[#111111]"
                }`}
              >
                {db.id}
              </button>
            ))}
          </div>

          {/* Active Engine Overview Card */}
          <div className="bg-white border border-black/10 p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-8 border-b border-black/10">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 bg-[#111111] text-white text-[11px] uppercase tracking-[0.15em] font-medium">
                    Canonical 6-Table Postgres Vault
                  </span>
                  <span className="px-3 py-1 border border-black/15 text-[#111111]/70 text-[11px] uppercase tracking-[0.15em]">
                    ✓ DuckDB SHA-256 Delta Engine
                  </span>
                  <span className="px-3 py-1 bg-[#f5f4ef] text-[#111111]/60 text-[11px] uppercase tracking-[0.15em]">
                    HubSpot · Salesforce · Clay · REST &amp; MCP API
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-[#111111]">
                  {activeDb.title}
                </h3>
                <p className="text-sm text-[#111111]/50 mt-1 font-mono">
                  {activeDb.subtitle}
                </p>
                <p className="text-lg md:text-xl text-[#111111]/85 font-serif mt-4 leading-relaxed">
                  &ldquo;{activeDb.whyStandardFails}&rdquo;
                </p>
              </div>

              <Link
                href="/hire/apply"
                className="px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-sm font-medium transition-colors self-start shrink-0"
              >
                Run $1,950 Territory Pilot →
              </Link>
            </div>

            {/* 6-Block Custom Schema Summary */}
            <div className="mt-8 mb-3 text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium">
              Engine Architecture &amp; Corporate Backbone Joins
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-black/10 border border-black/10 mb-10">
              {activeDb.schemaSummary.map((col) => (
                <div key={col.label} className="bg-[#fcfaf8] p-5">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                    {col.label}
                  </div>
                  <div className="text-base font-serif text-[#111111]">
                    {col.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Sample Verified Rows */}
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
              Sample Forward-Looking Triggers With Verbatim Source Evidence
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
              {activeDb.sampleRows.map((row, i) => (
                <div
                  key={i}
                  className="bg-[#fcfaf8] p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.12em] font-medium text-[#111111] mb-2">
                      {row.account}
                    </div>
                    <p className="text-sm md:text-base font-serif text-[#111111]/85 leading-relaxed mb-6">
                      &ldquo;{row.fact}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-black/10 text-xs space-y-1.5">
                    <div className="font-medium text-[#111111]">{row.contact}</div>
                    <div className="text-[11px] text-[#111111]/55">
                      Source: {row.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Interactive PowerTable Explorer */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
              Interactive Live Preview • Filter All 12 Red-Team-Verified Records &amp; Open 3-Tab Dossiers
            </div>
            <Link
              href="/portal/demo"
              className="text-xs font-medium text-[#111111] underline underline-offset-4 hover:text-[#d9534f]"
            >
              View Full-Screen Explorer + 6-Table Schema →
            </Link>
          </div>
          <PowerTableExplorer />
        </div>
      </section>

      {/* ── SECTION 3: HOW WE KEEP THE DATA HONEST (NO AI HALLUCINATIONS) ─ */}
      <section className="py-24 px-6 border-t border-black/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
                Why Mid-Market GTM Teams Trust Our Rows
              </div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111]">
                Atomic provenance locks. Zero third-party CPA noise.
              </h2>
              <p className="text-lg text-[#111111]/65 font-light mt-3 max-w-2xl leading-relaxed">
                If a sales rep quotes a wrong number or emails an outside tax accountant, you lose the deal. We enforce strict code gates before any row enters your CRM.
              </p>
            </div>
            <Link
              href="/credibility"
              className="text-sm font-medium text-[#111111] underline underline-offset-4 hover:text-[#d9534f] shrink-0"
            >
              Read our 6-table verification spec →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
            {[
              {
                num: "01 · fn_provenance_update Lock",
                title: "Atomic Source Hierarchy",
                tagline: "Tier 1 Federal Filings Never Get Overwritten",
                desc: "Every cell stores its source authority tier (1 to 5), SHA-256 payload hash, and capture timestamp. A lower-tier directory scrape can never overwrite a verified federal filing.",
              },
              {
                num: "02 · 50-Keyword CPA Filter",
                title: "Real Officers, Not Registered Agents",
                tagline: "Clean DOL Form 5500 & SAM.gov Signers",
                desc: "Government filings are full of outside CPAs, law firms, and registered agents. Our 50-keyword filter strips third-party preparers so your SDRs only call internal CFOs, COOs, and owners.",
              },
              {
                num: "03 · Forward-Looking Triggers",
                title: "30/60/90-Day Action Windows",
                tagline: "Catch Buyers Before the Deadline Hits",
                desc: "We track Form BMC-35 30-day insurance cancellations, newly opened Federal OSHA inspections, and SAM.gov registration expirations—then decay stale signals automatically every 24 hours.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#fcfaf8] p-10 md:p-12 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-4">
                    {item.num}
                  </div>
                  <h3 className="text-3xl font-serif text-[#111111] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#111111]/45 font-medium mb-6">
                    {item.tagline}
                  </p>
                  <p className="text-[#111111]/65 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: COMMERCIAL LADDER PREVIEW ($1,950 PILOT -> FULL VAULT) */}
      <section className="py-24 px-6 border-t border-black/10 bg-[#f5f4ef]/60">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-black/10 p-10 md:p-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-black/10">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
                  Fits on a VP&apos;s Corporate Card • 100% Credited to Full Deployment
                </div>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111]">
                  Start With a 7-Day Territory &amp; CRM Whitespace Pilot for $1,950.
                </h2>
                <p className="text-lg text-[#111111]/65 font-light mt-4 max-w-2xl leading-relaxed">
                  Upload your current CRM account export. Within 7 days, we match it against one of our three vertical engines and hand you 2,500 enriched accounts, 5,000 verified buyers, active 30/60/90-day triggers, and a TAM Whitespace Gap Report.
                </p>
              </div>
              <div className="shrink-0 md:text-right">
                <div className="text-4xl md:text-5xl font-serif text-[#111111]">
                  $1,950
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/50 mt-1">
                  7-Day Pilot • 100% Rollover Credit
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
              {[
                "Wedge Pilot ($1,950 One-Time): 2,500 net-new/enriched accounts + 5,000 verified contacts + TAM Whitespace Gap Report in 7 days",
                "Tier 1 Self-Serve & Clay Agency Plan ($799/mo Quarterly): PowerTable UI across 1 engine, 1,250 company unlocks/mo, and REST/MCP API",
                "Tier 2 Managed CRM Deployment ($9,500 Build + $1,950/mo): $7,550 net after Pilot credit. Full bi-directional HubSpot/Salesforce sync + 3,500 unlocks/mo",
                "Tier 3 Private Warehouse & All-3-Engines Vault ($18,000 Build + $3,950/mo): Direct Snowflake, BigQuery, or dedicated Supabase VPC sync across all 3 engines",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-[#111111]/80 font-light"
                >
                  <span className="text-[#111111] font-medium mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/50">
                4 Delivery Outputs: Digest CSV/Parquet · Supabase RLS View · CRM Webhook · REST/MCP API
              </div>
              <Link
                href="/hire/apply"
                className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white text-sm font-medium text-center transition-colors shrink-0"
              >
                Scope Your $1,950 Territory Pilot →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: BOTTOM CONVERSION BAR ────────────────────────────── */}
      <section className="py-24 px-6 border-t border-black/10 bg-[#fcfaf8]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
            Stop Feeding Your SDRs Stale Directory Scrapes
          </div>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-[#111111] mb-6">
            See how many target accounts
            <br />
            <span className="italic font-light text-[#111111]/65">
              your CRM is missing today.
            </span>
          </h2>
          <p className="text-lg text-[#111111]/65 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Enter your company domain or vertical below. We will run a free market count across our three vertical engines and scope your 7-day $1,950 Territory Pilot.
          </p>

          <form
            onSubmit={handleSandboxSubmit}
            className="max-w-xl mx-auto flex flex-col sm:flex-row items-stretch border border-black/20 bg-white p-1.5 shadow-xs"
          >
            <input
              type="text"
              value={targetMarketInput}
              onChange={(e) => setTargetMarketInput(e.target.value)}
              placeholder="e.g. 20–200 truck fleets in TX/IL, or multi-site ortho clinics"
              className="flex-1 px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-sm font-medium transition-colors cursor-pointer shrink-0"
            >
              Run Free Market Count →
            </button>
          </form>

          <p className="text-xs text-[#111111]/50 mt-4 font-light">
            Free whitespace count before you spend a dollar. 100% of your $1,950 pilot rolls into Tier 2 or Tier 3 deployment.
          </p>
        </div>
      </section>
    </div>
  );
}

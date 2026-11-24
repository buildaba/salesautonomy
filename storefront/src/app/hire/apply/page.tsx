"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const ENGINE_TEMPLATES: Record<
  string,
  {
    label: string;
    companyName: string;
    verticalEngine: string;
    targetMarket: string;
    tierChoice: string;
    qualifyingFact1: string;
    qualifyingFact2: string;
    publicSources: string;
    triggerSignal: string;
    buyerTitles: string;
    deliveryTarget: string;
  }
> = {
  engine1: {
    label: "Engine 1: Healthcare & Multi-Site Clinics",
    companyName: "PulseFlow Health SaaS",
    verticalEngine: "Engine 1: Healthcare & Multi-Site Clinic Graph",
    targetMarket:
      "U.S. Multi-Site Orthopedic, Dermatology, Dental & Behavioral Clinic Groups (3 to 45 Locations)",
    tierChoice:
      "Wedge Pilot: 7-Day Territory & CRM Whitespace Pilot ($1,950 • 100% Rollover Credit)",
    qualifyingFact1:
      "NPPES Org Type-2 true clinic site count + booking-widget EHR DOM (Athena, ModMed, Dentrix)",
    qualifyingFact2:
      "DOL Form 5500 EIN headcount + OIG LEIE exclusion check + CMS F-tag survey history",
    publicSources:
      "CMS NPPES Type-2 + DOL Form 5500 + State Medical/Dental Boards + CMS Care Compare",
    triggerSignal:
      "New clinic build-out permit, state license expansion, or 45-day CMS F-tag Plan of Correction",
    buyerTitles:
      "Authorized Official (Owner/CMO), Chief Operating Officer, CFO (Form 5500 Signer)",
    deliveryTarget:
      "HubSpot Bi-Directional Sync + PowerTable Sandbox + TAM Whitespace Gap Report",
  },
  engine2: {
    label: "Engine 2: Industrial, Fleet & Facility Risk",
    companyName: "GridShield Fleet & EHS Tech",
    verticalEngine: "Engine 2: Industrial, Fleet & Facility Risk Graph",
    targetMarket:
      "U.S. 15–250+ Truck Fleets, Refrigerated Carriers & Multi-Plant Manufacturers",
    tierChoice:
      "Tier 2: Managed CRM Deployment & Signal Sync ($9,500 Build + $1,950/mo • $7,550 After Pilot)",
    qualifyingFact1:
      "FMCSA MCS-150 verified power units/drivers + active Form BMC-35/91X insurance policy dates",
    qualifyingFact2:
      "Cross-joined DOL Form 5500 EIN, exact active employee count & welfare plan spend",
    publicSources:
      "FMCSA L&I Daily Active/Pending + Federal OSHA Inspection Feed + EPA ECHO + DOL Form 5500",
    triggerSignal:
      "30-day Form BMC-35 insurance cancellation, 60/90d policy renewal, or newly opened Federal OSHA inspection",
    buyerTitles:
      "CFO & VP HR (CPA-Filtered Form 5500 Signers), VP Fleet Safety, VP EHS & Plant Ops",
    deliveryTarget:
      "Salesforce Account & Custom Signal Object + Weekly SDR Queue Routing",
  },
  engine3: {
    label: "Engine 3: Public Sector, Contractors & Permits",
    companyName: "Apex GovCon & Construction Cloud",
    verticalEngine: "Engine 3: Public Sector, Contractors & Permits Graph",
    targetMarket:
      "Defense/Federal Sub-Contractors, Heavy Civil Builders & Commercial General Contractors",
    tierChoice:
      "Tier 1: PowerTable & Credit-Metered API Plan ($799/mo Paid Quarterly • 1,250 Unlocks/mo)",
    qualifyingFact1:
      "SAM.gov UEI/CAGE + native entityUrl verified domain + active USAspending obligations",
    qualifyingFact2:
      "Subsidiary permit LLC resolved to parent corporate entity + Form 5500 employee headcount",
    publicSources:
      "SAM.gov Entity API v3 + USAspending Award Delta + Socrata/ArcGIS Municipal Permits + Form 5500",
    triggerSignal:
      "30/60/90-day SAM.gov registration expiration, contract recompete window, or commercial permit >$250K",
    buyerTitles:
      "SAM.gov Government Business POC (CPA-Filtered), CFO, CISO, VP Preconstruction",
    deliveryTarget:
      "PowerTable UI + Clay Webhook + Weekly Digest CSV/Parquet & REST/MCP API",
  },
};

export default function RequestSandboxPage() {
  const [submitted, setSubmitted] = useState(false);
  const [activePreset, setActivePreset] = useState("engine1");

  const [companyName, setCompanyName] = useState(
    ENGINE_TEMPLATES.engine1.companyName
  );
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [verticalEngine, setVerticalEngine] = useState(
    ENGINE_TEMPLATES.engine1.verticalEngine
  );
  const [targetMarket, setTargetMarket] = useState(
    ENGINE_TEMPLATES.engine1.targetMarket
  );
  const [tierChoice, setTierChoice] = useState(
    ENGINE_TEMPLATES.engine1.tierChoice
  );

  // 6-Block Custom Database Spec
  const [qualifyingFact1, setQualifyingFact1] = useState(
    ENGINE_TEMPLATES.engine1.qualifyingFact1
  );
  const [qualifyingFact2, setQualifyingFact2] = useState(
    ENGINE_TEMPLATES.engine1.qualifyingFact2
  );
  const [publicSources, setPublicSources] = useState(
    ENGINE_TEMPLATES.engine1.publicSources
  );
  const [triggerSignal, setTriggerSignal] = useState(
    ENGINE_TEMPLATES.engine1.triggerSignal
  );
  const [buyerTitles, setBuyerTitles] = useState(
    ENGINE_TEMPLATES.engine1.buyerTitles
  );
  const [deliveryTarget, setDeliveryTarget] = useState(
    ENGINE_TEMPLATES.engine1.deliveryTarget
  );

  const loadSample = (key: string) => {
    const s = ENGINE_TEMPLATES[key];
    if (!s) return;
    setActivePreset(key);
    setCompanyName(s.companyName);
    setVerticalEngine(s.verticalEngine);
    setTargetMarket(s.targetMarket);
    setTierChoice(s.tierChoice);
    setQualifyingFact1(s.qualifyingFact1);
    setQualifyingFact2(s.qualifyingFact2);
    setPublicSources(s.publicSources);
    setTriggerSignal(s.triggerSignal);
    setBuyerTitles(s.buyerTitles);
    setDeliveryTarget(s.deliveryTarget);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header — buildaba.com left-aligned calm editorial style */}
        <div className="mb-12 pb-8 border-b border-black/10">
          <p className="text-xs font-medium text-[#6b665e] mb-3">
            7-Day Territory &amp; CRM Whitespace Pilot · $1,950 One-Time · 100% Rollover Credit
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#141413] font-medium leading-[1.08]">
                Scope your vertical pilot or deployment.
              </h1>
              <p className="text-base sm:text-lg text-[#5c5852] max-w-2xl mt-3 leading-relaxed">
                Pick one of our three pre-cleaned vertical engines below. Within 24 hours, we send
                your free territory row count and launch link for your 7-day, 2,500-account
                Whitespace Pilot.
              </p>
            </div>
            <Link
              href="/portal/demo"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2e6f40] hover:underline shrink-0"
            >
              Inspect PowerTable Explorer (66 Live Rows)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {submitted ? (
          <div className="max-w-3xl mx-auto bg-white border border-black/10 rounded-2xl p-8 sm:p-10 space-y-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-1 rounded-md mb-3">
                <Check className="w-3.5 h-3.5" />
                Territory Pilot &amp; Engine Scope Received
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413] mb-2">
                We are running your territory count for {companyName}.
              </h2>
              <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
                Within 24 hours, our data engineers will send your exact vertical row count, CRM
                whitespace match instructions, and 7-day Pilot launch link to{" "}
                <span className="text-[#141413] font-medium">
                  {contactEmail || "your work email"}
                </span>
                .
              </p>
            </div>

            <div className="p-6 bg-[#faf9f5] border border-black/8 rounded-xl space-y-3">
              <div className="text-xs font-medium text-[#6b665e]">What Happens Next</div>
              <ul className="space-y-2.5 text-sm text-[#141413]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-medium">Free Territory Count (24 Hours):</strong> We
                    query {verticalEngine} plus our SAM.gov + DOL Form 5500 backbone to confirm your
                    exact addressable account and trigger volume.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-medium">
                      7-Day Territory &amp; CRM Whitespace Pilot ($1,950):
                    </strong>{" "}
                    We match your CRM export and deliver 2,500 enriched accounts, 5,000
                    CPA-filtered buyers, active 30/60/90d triggers, and a TAM Whitespace Gap Report.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-medium">100% Rollover Credit:</strong> Roll all $1,950
                    directly into Tier 2 Managed CRM Deployment ($9,500 → $7,550 net) or Tier 3
                    Private Warehouse Vault ($18,000 → $16,050 net).
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/portal/demo"
                className="flex-1 min-h-[46px] rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] font-medium py-3 text-center transition-colors text-sm flex items-center justify-center gap-2"
              >
                Explore Live PowerTable
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="min-h-[46px] px-6 py-3 rounded-xl bg-white border border-black/15 text-sm font-medium text-[#141413] hover:bg-[#f0eee6] cursor-pointer"
              >
                Edit Pilot Scope
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Pilot & Engine Specification Builder */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              {/* Step 0: Quick-Fill Vertical Engine Templates */}
              <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="mb-4">
                  <p className="text-xs font-medium text-[#2e6f40] mb-1">
                    Select One of Our 3 Pre-Cleaned Vertical Engines
                  </p>
                  <h2 className="text-xl font-serif font-medium text-[#141413]">
                    Load a verified vertical engine preset below
                  </h2>
                </div>

                <div className="inline-flex flex-wrap p-1 rounded-xl bg-[#f0eee6] border border-black/8 gap-1">
                  {[
                    { key: "engine1", label: "01 · Healthcare Clinics" },
                    { key: "engine2", label: "02 · Fleet & Industrial Risk" },
                    { key: "engine3", label: "03 · Commercial Permits" },
                  ].map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => loadSample(s.key)}
                      className={`text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer font-medium ${
                        activePreset === s.key
                          ? "bg-[#141413] text-[#faf9f5] shadow-xs"
                          : "text-[#5c5852] hover:text-[#141413]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Part 01: Your Team & Commercial Tier */}
              <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="border-b border-black/8 pb-3">
                  <div className="text-xs font-medium text-[#6b665e]">
                    01 · Your GTM Team &amp; Commercial Tier
                  </div>
                  <p className="text-xs text-[#5c5852] mt-1">
                    Where should we send your free territory count and 7-day Whitespace Pilot link?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Alex Mercer, VP Sales / RevOps"
                      className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@yourcompany.com"
                      className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                      Your Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                      Pre-Cleaned Vertical Engine
                    </label>
                    <select
                      value={verticalEngine}
                      onChange={(e) => setVerticalEngine(e.target.value)}
                      className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                    >
                      <option value="Engine 1: Healthcare & Multi-Site Clinic Graph">
                        Engine 1: Healthcare &amp; Multi-Site Clinic Graph
                      </option>
                      <option value="Engine 2: Industrial, Fleet & Facility Risk Graph">
                        Engine 2: Industrial, Fleet &amp; Facility Risk Graph
                      </option>
                      <option value="Engine 3: Public Sector, Contractors & Permits Graph">
                        Engine 3: Public Sector, Contractors &amp; Permits Graph
                      </option>
                      <option value="All 3 Vertical Engines (Enterprise Multi-Engine)">
                        All 3 Vertical Engines (Enterprise Multi-Engine)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    Commercial Entry Point
                  </label>
                  <select
                    value={tierChoice}
                    onChange={(e) => setTierChoice(e.target.value)}
                    className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                  >
                    <option value="Wedge Pilot: 7-Day Territory & CRM Whitespace Pilot ($1,950 • 100% Rollover Credit)">
                      Wedge Pilot: 7-Day Territory &amp; CRM Whitespace Pilot ($1,950 One-Time • 100% Rollover)
                    </option>
                    <option value="Tier 1: PowerTable & Credit-Metered API Plan ($799/mo Paid Quarterly • 1,250 Unlocks/mo)">
                      Tier 1: PowerTable &amp; Credit-Metered API Plan ($799/mo Paid Quarterly • 1,250 Unlocks/mo)
                    </option>
                    <option value="Tier 2: Managed CRM Deployment & Signal Sync ($9,500 Build + $1,950/mo • $7,550 After Pilot)">
                      Tier 2: Managed CRM Deployment &amp; Signal Sync ($9,500 One-Time + $1,950/mo)
                    </option>
                    <option value="Tier 3: Private Warehouse & All-3-Engines Vault ($18,000 Build + $3,950/mo)">
                      Tier 3: Private Warehouse &amp; All-3-Engines Vault ($18,000 One-Time + $3,950/mo)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    Target Territory &amp; ICP Slice *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    placeholder="e.g. 20–250 truck fleets in Midwest/South, or multi-site clinics in TX/FL"
                    className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                  />
                </div>
              </div>

              {/* Part 02: Qualifying Facts, Forward Triggers & CRM Sync */}
              <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 space-y-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="border-b border-black/8 pb-3">
                  <div className="text-xs font-medium text-[#2e6f40]">
                    02 · Qualifying Facts &amp; Forward-Looking Triggers
                  </div>
                  <p className="text-xs text-[#5c5852] mt-1">
                    Confirm the exact federal/municipal columns and 30/60/90-day triggers for your
                    territory slice.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    Primary Vertical Fact (e.g. Power Units &amp; BMC-35 Status, NPPES Site Count)
                  </label>
                  <input
                    type="text"
                    required
                    value={qualifyingFact1}
                    onChange={(e) => setQualifyingFact1(e.target.value)}
                    className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    Corporate Backbone Join (SAM.gov Domain + DOL Form 5500 Headcount &amp; Signer)
                  </label>
                  <input
                    type="text"
                    required
                    value={qualifyingFact2}
                    onChange={(e) => setQualifyingFact2(e.target.value)}
                    className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    30/60/90-Day Forward-Looking Trigger to Route to SDRs
                  </label>
                  <input
                    type="text"
                    required
                    value={triggerSignal}
                    onChange={(e) => setTriggerSignal(e.target.value)}
                    className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                      Primary Statutory Sources
                    </label>
                    <input
                      type="text"
                      required
                      value={publicSources}
                      onChange={(e) => setPublicSources(e.target.value)}
                      className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                      CPA-Filtered Buying Committee Titles
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerTitles}
                      onChange={(e) => setBuyerTitles(e.target.value)}
                      className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    Delivery Output (PowerTable, HubSpot, Salesforce, Clay, Snowflake)
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryTarget}
                    onChange={(e) => setDeliveryTarget(e.target.value)}
                    className="w-full bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-black/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[50px] rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] font-medium py-3.5 px-6 transition-colors text-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                Get Free Territory Count &amp; Launch $1,950 Pilot
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* RIGHT COLUMN: Live Pilot & Engine Specification Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-[#6b665e]">
                  Live Pilot &amp; Vault Specification
                </span>
                <span className="text-xs font-medium text-[#2e6f40]">
                  6-Table Canonical Schema
                </span>
              </div>

              <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 space-y-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                {/* Header */}
                <div className="border-b border-black/8 pb-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#141413] text-[#faf9f5] text-xs font-medium">
                      {verticalEngine}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ecfdf5] border border-[#a7f3d0] text-[#2e6f40] text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      SHA-256 Receipts
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-[#141413]">
                    {companyName || "Your Company"} — Vertical Deployment
                  </h3>
                  <p className="text-xs text-[#5c5852] mt-1">
                    Target Slice: <strong className="text-[#141413]">{targetMarket}</strong>
                  </p>
                </div>

                {/* Spec Blocks */}
                <div>
                  <div className="text-xs font-medium text-[#6b665e] mb-2.5">
                    Pre-Cleaned Columns &amp; Signal Routing
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Primary Vertical Fact", value: qualifyingFact1 },
                      { label: "Corporate Backbone Join", value: qualifyingFact2 },
                      { label: "30/60/90d Forward Trigger", value: triggerSignal },
                      { label: "Statutory Data Sources", value: publicSources },
                      { label: "CPA-Filtered Committee", value: buyerTitles },
                      { label: "Delivery Output", value: deliveryTarget },
                    ].map((b) => (
                      <div
                        key={b.label}
                        className="bg-[#faf9f5] border border-black/8 rounded-xl p-3"
                      >
                        <div className="text-[11px] text-[#6b665e]">{b.label}</div>
                        <div className="text-xs font-medium text-[#141413] mt-0.5">{b.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rollover Math Box */}
                <div className="p-4 bg-[#f0eee6] border border-black/10 rounded-xl space-y-1.5">
                  <div className="text-xs font-medium text-[#2e6f40]">
                    Selected Commercial Option
                  </div>
                  <div className="text-xs font-medium text-[#141413]">{tierChoice}</div>
                  <p className="text-xs text-[#5c5852] leading-relaxed">
                    Start with the $1,950 7-Day Territory &amp; CRM Whitespace Pilot (2,500
                    accounts + 5,000 verified contacts + TAM Whitespace Gap Report). 100% of your
                    $1,950 credits toward Tier 2 or Tier 3 deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

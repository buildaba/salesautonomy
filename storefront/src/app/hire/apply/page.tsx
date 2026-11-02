"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";

const SAMPLE_COMPANIES: Record<
  string,
  {
    label: string;
    companyName: string;
    maskedLabel: string;
    fundingBadge: string;
    roleTrack: string;
    stageArr: string;
    acvBand: string;
    quotaMath: string;
    pipelineMix: string;
    buyerPersona: string;
    cycleAndRamp: string;
    compRange: string;
    managerWho: string;
    managerQuote: string;
    repWho: string;
    repQuote: string;
    customerWho: string;
    customerQuote: string;
  }
> = {
  ae: {
    label: "Sample: Series A Founding AE",
    companyName: "Acme Security AI",
    maskedLabel: "Series A Cloud Security SaaS",
    fundingBadge: "Series A • $18M Raised • 34 Mos Runway",
    roleTrack: "Founding Account Executive (AE #1)",
    stageArr: "$2.4M ARR (3x YoY)",
    acvBand: "$55K–$120K ($72K Med)",
    quotaMath: "$850K Quota • 3.7x OTE",
    pipelineMix: "45% Inbound / 55% Outbound",
    buyerPersona: "VP Eng / CISO / CTO",
    cycleAndRamp: "45–75d • 4-Mo Ramp Draw",
    compRange: "$115K Base / $230K OTE + 0.25% Equity",
    managerWho: "Co-Founder & CEO (Hiring Manager)",
    managerQuote:
      "I currently take 12 qualified discovery calls a week myself. You'll inherit half of my active calendar on Day 1 while we co-sell your first 5 deals.",
    repWho: "Lead GTM Engineer (Current Teammate)",
    repQuote:
      "Our Clay + signal enrichment engine is already live. Every Monday morning you get 25 warm accounts showing active production triggers.",
    customerWho: "CISO at Series C FinTech (Customer Who Bought)",
    customerQuote:
      "Deployed in 20 minutes during our PoC and immediately surfaced 4 critical production exposures our legacy scanner missed.",
  },
  gtme: {
    label: "Sample: Series B GTM Engineer",
    companyName: "VectorFlow Dev",
    maskedLabel: "Series B AI Developer Platform",
    fundingBadge: "Series B • $42M Raised • 36+ Mos Runway",
    roleTrack: "Lead GTM Engineer & Outbound Architect",
    stageArr: "$9.5M → $24M ARR Target",
    acvBand: "Clay, HubSpot, Postgres, Python",
    quotaMath: "Supports 8 MM & Ent AEs",
    pipelineMix: "18,000 Devs on Free Tier (PLG)",
    buyerPersona: "VP Engineering / AI Leads",
    cycleAndRamp: "Reports to CRO • $8K/mo Stack Budget",
    compRange: "$160K Base + $40K Bonus + 0.15% Equity",
    managerWho: "Chief Revenue Officer (Hiring Manager)",
    managerQuote:
      "You won't be treated like a ticket-taking CRM admin. You own the entire signal-to-outbound architecture and sit in executive revenue staff weekly.",
    repWho: "Senior Enterprise AE (Internal Customer)",
    repQuote:
      "We have thousands of developers using our SDK daily. We need a builder who can turn usage spikes into automated executive outbound.",
    customerWho: "VP of Engineering at Public SaaS (Customer)",
    customerQuote:
      "Our engineers adopted the tool bottom-up before procurement even knew about it. Fastest technical sign-off I've approved in 3 years.",
  },
  vp: {
    label: "Sample: Series A VP of Sales",
    companyName: "BuildPay FinTech",
    maskedLabel: "Series A Vertical Construction FinTech",
    fundingBadge: "Series A • $15M Raised • 118% NRR",
    roleTrack: "VP of Sales (First Executive Sales Leader)",
    stageArr: "$3.8M ARR (118% NRR)",
    acvBand: "$60K–$140K ($82K Med)",
    quotaMath: "3 of 4 Current AEs >100% Quota",
    pipelineMix: "Scale 4 → 12 AEs in 18 Mos",
    buyerPersona: "CFO / Controller / Owner",
    cycleAndRamp: "45–60d Cycle • High Inbound",
    compRange: "$190K Base / $360K OTE + 1.0% Equity",
    managerWho: "Founder & CEO (Hiring Manager)",
    managerQuote:
      "Product-market fit is proven—3 of our 4 early AEs are over 100% quota. I want a true partner to own hiring, forecasting, and enterprise deal coaching.",
    repWho: "Founding Account Executive (Direct Report)",
    repQuote:
      "Win rates on qualified CFO demos are over 38%. Once a controller sees the automated reconciliation, the ROI math sells itself.",
    customerWho: "CFO at $400M General Contractor (Customer)",
    customerQuote:
      "Cut our monthly close by 6 days in the first quarter. We referred two peer CFOs in our construction peer group.",
  },
};

export default function HireApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedRefLink, setCopiedRefLink] = useState<string | null>(null);

  // Company Identity
  const [companyName, setCompanyName] = useState("Acme Security AI");
  const [maskedLabel, setMaskedLabel] = useState("Series A Cloud Security SaaS");
  const [fundingBadge, setFundingBadge] = useState("Series A • $18M Raised • 34 Mos Runway");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Part 01: Standardized 6-Block Company & Role Profile
  const [roleTrack, setRoleTrack] = useState("Founding Account Executive (AE #1)");
  const [stageArr, setStageArr] = useState("$2.4M ARR (3x YoY)");
  const [acvBand, setAcvBand] = useState("$55K–$120K ($72K Med)");
  const [quotaMath, setQuotaMath] = useState("$850K Quota • 3.7x OTE");
  const [pipelineMix, setPipelineMix] = useState("45% Inbound / 55% Outbound");
  const [buyerPersona, setBuyerPersona] = useState("VP Eng / CISO / CTO");
  const [cycleAndRamp, setCycleAndRamp] = useState("45–75d • 4-Mo Ramp Draw");
  const [compRange, setCompRange] = useState("$115K Base / $230K OTE + 0.25% Equity");

  // Part 02: Published Reverse References (Hiring Manager, Current Rep/Teammate, Customer)
  const [managerWho, setManagerWho] = useState("Co-Founder & CEO (Hiring Manager)");
  const [managerQuote, setManagerQuote] = useState(
    "I currently take 12 qualified discovery calls a week myself. You'll inherit half of my active calendar on Day 1 while we co-sell your first 5 deals."
  );
  const [repWho, setRepWho] = useState("Lead GTM Engineer (Current Teammate)");
  const [repQuote, setRepQuote] = useState(
    "Our Clay + signal enrichment engine is already live. Every Monday morning you get 25 warm accounts showing active production triggers."
  );
  const [customerWho, setCustomerWho] = useState("CISO at Series C FinTech (Customer Who Bought)");
  const [customerQuote, setCustomerQuote] = useState(
    "Deployed in 20 minutes during our PoC and immediately surfaced 4 critical production exposures our legacy scanner missed."
  );

  const loadSample = (key: string) => {
    const s = SAMPLE_COMPANIES[key];
    if (!s) return;
    setCompanyName(s.companyName);
    setMaskedLabel(s.maskedLabel);
    setFundingBadge(s.fundingBadge);
    setRoleTrack(s.roleTrack);
    setStageArr(s.stageArr);
    setAcvBand(s.acvBand);
    setQuotaMath(s.quotaMath);
    setPipelineMix(s.pipelineMix);
    setBuyerPersona(s.buyerPersona);
    setCycleAndRamp(s.cycleAndRamp);
    setCompRange(s.compRange);
    setManagerWho(s.managerWho);
    setManagerQuote(s.managerQuote);
    setRepWho(s.repWho);
    setRepQuote(s.repQuote);
    setCustomerWho(s.customerWho);
    setCustomerQuote(s.customerQuote);
  };

  const handleCopyRefInvite = (type: string) => {
    const slug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "company";
    const url = `https://www.salesautonomy.com/company-vouch/${slug}?role=${type}`;
    navigator.clipboard.writeText(url);
    setCopiedRefLink(type);
    setTimeout(() => setCopiedRefLink(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-12 pb-8 border-b border-black/10">
          <div className="inline-block mb-4 px-3.5 py-1 rounded-full border border-black/10 text-[#111111]/70 text-xs uppercase tracking-[0.15em] font-medium">
            The Candidate-Facing Company &amp; Role Profile • Bench Pass ($2,500/mo • $0 Placement Fee)
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-[#111111] leading-[1.08]">
                Build Your Company &amp; Role Profile
              </h1>
              <p className="text-lg text-[#111111]/60 max-w-2xl font-light mt-3 leading-relaxed">
                Top employed sellers ignore vague job descriptions. Build your standardized 6-Block Company &amp; Role Profile and publish verified reverse references (from you, a teammate, and a customer) so candidates say yes when you request a warm intro.
              </p>
            </div>
            <Link
              href="/portal/demo"
              className="text-xs uppercase tracking-[0.15em] text-[#d9534f] font-medium hover:underline shrink-0"
            >
              See Live Bench Examples →
            </Link>
          </div>
        </div>

        {submitted ? (
          <div className="max-w-3xl mx-auto bg-white border border-black/10 p-8 md:p-12 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
                Company Profile &amp; Shortlist Filter Locked
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#111111]">
                {companyName}&apos;s Candidate-Facing Profile is Ready
              </h2>
              <p className="text-sm text-[#111111]/65 font-light mt-2 leading-relaxed">
                Whenever you click <strong className="text-[#111111]">Request Warm Intro</strong> on a stealth candidate, they will receive this standardized 6-Block Company &amp; Role Dossier. We also sent your Bench Pass activation link to{" "}
                <strong className="text-[#111111]">{contactEmail || "your email"}</strong>.
              </p>
            </div>

            {/* 1-Click Reverse Reference Invite Links */}
            <div className="p-8 bg-[#fcfaf8] border border-black/10 space-y-5">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/50 font-medium mb-1">
                  Optional · Send 30-Second Reverse Reference Links
                </div>
                <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
                  Want a current AE, engineer, or customer to verify their quote on your Company Profile via LinkedIn? Copy a 1-click link below:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/10 border border-black/10">
                {[
                  { id: "founder", label: "1. Hiring Manager Verify", sub: "Verifies leadership & ramp style" },
                  { id: "rep", label: "2. Current Rep / Eng Link", sub: "Verifies pipeline & quota reality" },
                  { id: "customer", label: "3. Customer Vouch Link", sub: "Verifies product pull & ROI" },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleCopyRefInvite(v.id)}
                    className="p-5 bg-white hover:bg-[#f5f4ef] text-left transition-colors cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-base text-[#111111]">{v.label}</span>
                        {copiedRefLink === v.id ? (
                          <Check size={14} className="text-[#111111]" />
                        ) : (
                          <Copy size={14} className="text-[#111111]/40" />
                        )}
                      </div>
                      <p className="text-xs text-[#111111]/55 font-light">{v.sub}</p>
                    </div>
                    <div className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[#d9534f] font-medium">
                      {copiedRefLink === v.id ? "Copied Link ✓" : "Copy 30-Sec Link →"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-[0.2em] text-[#111111]/60 hover:text-[#111111] cursor-pointer"
              >
                ← Edit Company &amp; Role Profile
              </button>
              <Link
                href="/portal/demo"
                className="px-6 py-3.5 bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors"
              >
                Browse Matching Candidates on the Live Bench →
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: BUILDER FORM (6 COLS) */}
            <form onSubmit={handleSubmit} className="lg:col-span-6 space-y-8">
              {/* Instant Template Loader */}
              <div className="p-6 bg-[#f5f4ef] border border-black/15 space-y-3">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  1-Click Role Templates
                </div>
                <p className="text-xs text-[#111111]/65 font-light leading-relaxed">
                  Load a standardized Company &amp; Role template below and customize any block—watch your Candidate-Facing Dossier update live on the right.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {Object.entries(SAMPLE_COMPANIES).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => loadSample(key)}
                      className="px-3 py-1.5 bg-white hover:bg-[#111111] hover:text-white border border-black/15 text-xs font-medium text-[#111111] transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 1: COMPANY IDENTITY & RUNWAY */}
              <div className="p-8 bg-white border border-black/10 space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  01 · Company Identity &amp; Stage Header
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Category / Descriptor
                    </label>
                    <input
                      type="text"
                      required
                      value={maskedLabel}
                      onChange={(e) => setMaskedLabel(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Role Title
                    </label>
                    <input
                      type="text"
                      required
                      value={roleTrack}
                      onChange={(e) => setRoleTrack(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Funding &amp; Runway Badge
                    </label>
                    <input
                      type="text"
                      required
                      value={fundingBadge}
                      onChange={(e) => setFundingBadge(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                    Verified Comp &amp; Equity Band (Shown Upfront to Candidates)
                  </label>
                  <input
                    type="text"
                    required
                    value={compRange}
                    onChange={(e) => setCompRange(e.target.value)}
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                  />
                </div>
              </div>

              {/* SECTION 2: THE 6 STANDARDIZED COMPANY & ROLE BLOCKS */}
              <div className="p-8 bg-white border border-black/10 space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  02 · Standardized 6-Block Role Mechanics (Matches Candidate Schema 1:1)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Block 01 · Stage &amp; ARR Growth
                    </label>
                    <input
                      type="text"
                      value={stageArr}
                      onChange={(e) => setStageArr(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Block 02 · Deal Band (ACV) / Stack
                    </label>
                    <input
                      type="text"
                      value={acvBand}
                      onChange={(e) => setAcvBand(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Block 03 · Quota &amp; Team Attainment Math
                    </label>
                    <input
                      type="text"
                      value={quotaMath}
                      onChange={(e) => setQuotaMath(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Block 04 · Pipeline Reality (Inbound vs Outbound)
                    </label>
                    <input
                      type="text"
                      value={pipelineMix}
                      onChange={(e) => setPipelineMix(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Block 05 · Primary Buyer Persona
                    </label>
                    <input
                      type="text"
                      value={buyerPersona}
                      onChange={(e) => setBuyerPersona(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Block 06 · Sales Cycle &amp; Ramp Terms
                    </label>
                    <input
                      type="text"
                      value={cycleAndRamp}
                      onChange={(e) => setCycleAndRamp(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: PUBLISHED REVERSE REFERENCES */}
              <div className="p-8 bg-white border border-black/10 space-y-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                    03 · Published Reverse References (Why Top Talent Accepts Your Intro)
                  </div>
                  <p className="text-xs text-[#111111]/60 font-light mt-1">
                    Candidates publish vouches from their former boss, SE, and buyer. You publish 3 short notes from the Hiring Manager, a current teammate, and a customer.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      1. Hiring Manager / Founder Note
                    </label>
                    <input
                      type="text"
                      value={managerWho}
                      onChange={(e) => setManagerWho(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-1.5 text-xs text-[#111111] mb-1.5"
                    />
                    <textarea
                      rows={2}
                      value={managerQuote}
                      onChange={(e) => setManagerQuote(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-xs text-[#111111] resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      2. Current Rep / Engineer Note
                    </label>
                    <input
                      type="text"
                      value={repWho}
                      onChange={(e) => setRepWho(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-1.5 text-xs text-[#111111] mb-1.5"
                    />
                    <textarea
                      rows={2}
                      value={repQuote}
                      onChange={(e) => setRepQuote(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-xs text-[#111111] resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      3. Customer Why-We-Bought Note
                    </label>
                    <input
                      type="text"
                      value={customerWho}
                      onChange={(e) => setCustomerWho(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-1.5 text-xs text-[#111111] mb-1.5"
                    />
                    <textarea
                      rows={2}
                      value={customerQuote}
                      onChange={(e) => setCustomerQuote(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-xs text-[#111111] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: YOUR WORK EMAIL */}
              <div className="p-8 bg-white border border-black/10 space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  04 · Activate Your Bench Pass &amp; Publish Profile
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                  />
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Work Email"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#111111] hover:bg-[#333333] text-white font-medium py-4 px-6 text-sm uppercase tracking-[0.15em] transition-colors cursor-pointer"
                >
                  Publish Company Profile &amp; Unlock Bench Pass →
                </button>
              </div>
            </form>

            {/* RIGHT COLUMN: LIVE CANDIDATE-FACING COMPANY & ROLE DOSSIER PREVIEW (6 COLS) */}
            <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  Live Preview · What Candidates See When You Request an Intro
                </span>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/45">
                  1:1 Symmetrical Dossier
                </span>
              </div>

              <div className="bg-white border border-black/15 p-8 space-y-6 shadow-xs">
                {/* Top Header */}
                <div className="pb-6 border-b border-black/10 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#111111] text-white text-[10px] uppercase tracking-[0.15em] font-medium">
                      {roleTrack}
                    </span>
                    <span className="px-2.5 py-1 bg-[#f5f4ef] text-[#111111]/70 text-[10px] uppercase tracking-[0.15em]">
                      {fundingBadge}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-serif text-[#111111]">
                        {companyName}{" "}
                        <span className="text-[#111111]/50 italic font-light text-lg">
                          — {maskedLabel}
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-black/5">
                    <span className="uppercase tracking-[0.15em] text-[10px] text-[#111111]/45">
                      Verified Comp &amp; Equity Offer:
                    </span>
                    <span className="font-serif text-sm text-[#111111] font-medium">
                      {compRange}
                    </span>
                  </div>
                </div>

                {/* Part 1: 6-Block Company & Role Grid */}
                <div>
                  <div className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-[#111111]/45 font-medium">
                    Part 01 · Standardized 6-Block Company &amp; Role Profile
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-black/10 border border-black/10">
                    <div className="bg-[#fcfaf8] p-4">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                        01 · Stage &amp; ARR
                      </div>
                      <div className="text-sm font-serif text-[#111111]">{stageArr}</div>
                    </div>
                    <div className="bg-[#fcfaf8] p-4">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                        02 · Deal Band / Stack
                      </div>
                      <div className="text-sm font-serif text-[#111111]">{acvBand}</div>
                    </div>
                    <div className="bg-[#fcfaf8] p-4">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                        03 · Quota &amp; Team Math
                      </div>
                      <div className="text-sm font-serif text-[#111111]">{quotaMath}</div>
                    </div>
                    <div className="bg-[#fcfaf8] p-4">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                        04 · Pipeline Reality
                      </div>
                      <div className="text-sm font-serif text-[#111111]">{pipelineMix}</div>
                    </div>
                    <div className="bg-[#fcfaf8] p-4">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                        05 · Primary Buyer
                      </div>
                      <div className="text-sm font-serif text-[#111111]">{buyerPersona}</div>
                    </div>
                    <div className="bg-[#fcfaf8] p-4">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                        06 · Cycle &amp; Ramp
                      </div>
                      <div className="text-sm font-serif text-[#111111]">{cycleAndRamp}</div>
                    </div>
                  </div>
                </div>

                {/* Part 2: Published Reverse References */}
                <div>
                  <div className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                    Part 02 · Published Reverse References (Verified on Profile)
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { who: managerWho, quote: managerQuote },
                      { who: repWho, quote: repQuote },
                      { who: customerWho, quote: customerQuote },
                    ].map((ref, idx) => (
                      <div key={idx} className="bg-[#fcfaf8] border border-black/10 p-4">
                        <p className="text-xs font-serif italic text-[#111111]/85 leading-relaxed mb-2">
                          &ldquo;{ref.quote}&rdquo;
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-[#111111]/60 pt-2 border-t border-black/5">
                          <span className="font-medium text-[#111111]">— {ref.who}</span>
                          <span className="uppercase tracking-widest text-[#111111]/45">
                            ✓ LinkedIn Verified
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const CANDIDATES = [
  {
    handle: "Candidate #JM-204",
    track: "Founding / Mid-Market AE",
    roleCategory: "Founding AE",
    currentCompany: "Currently at Series B Cybersecurity SaaS",
    stealth: "Stealth Active • Employers Blocked: 2 Domains",
    compFloor: "$100K Base / $200K OTE",
    blocks: [
      { label: "01 · Stage Scaled", value: "$1.4M → $8M ARR" },
      { label: "02 · Deal Band (ACV)", value: "$50K–$150K ($95K Med)" },
      { label: "03 · Attainment", value: "142% Avg (3 Yrs)" },
      { label: "04 · Pipeline Mix", value: "65% Self-Sourced" },
      { label: "05 · Primary Buyer", value: "VP Eng / CTO / CISO" },
      { label: "06 · Cycle & Territory", value: "60–90d • Greenfield" },
    ],
    references: [
      {
        who: "Former VP of Sales (Direct Manager)",
        meta: "Managed Jordan for 9 quarters",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Jordan was my #1 rep for 9 straight quarters. She built her own target list from scratch and never waited on marketing for pipeline.",
      },
      {
        who: "Lead Solutions Engineer (Teammate)",
        meta: "Partnered on 40+ technical deals",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Best AE I've partnered with. She runs real technical discovery on Call #1 and never pulls me into unqualified demos.",
      },
      {
        who: "VP of Engineering (Customer Who Bought)",
        meta: "Signed $110K annual agreement",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "She understood our architecture bottleneck better than any vendor we evaluated and helped me build the ROI case for our CFO.",
      },
    ],
  },
  {
    handle: "Candidate #AK-118",
    track: "Founding Account Executive",
    roleCategory: "Founding AE",
    currentCompany: "Currently at Series A DevTools SaaS",
    stealth: "Stealth Active • Employers Blocked: 3 Domains",
    compFloor: "$95K Base / $190K OTE",
    blocks: [
      { label: "01 · Stage Scaled", value: "$400K → $4.2M ARR" },
      { label: "02 · Deal Band (ACV)", value: "$50K–$150K ($78K Med)" },
      { label: "03 · Attainment", value: "131% Quota (#2 of 24)" },
      { label: "04 · Pipeline Mix", value: "70% Self-Sourced" },
      { label: "05 · Primary Buyer", value: "CTO / Platform Eng" },
      { label: "06 · Cycle & Territory", value: "30–60d • Greenfield" },
    ],
    references: [
      {
        who: "Co-Founder & CEO (Direct Manager)",
        meta: "Hired Alex as Founding AE #1",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Alex closed our first 18 mid-market logos. Give him a clear ICP and he will fill the calendar within two weeks.",
      },
      {
        who: "Head of Product (Teammate)",
        meta: "Partnered on enterprise roadmap",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Brings crisp, structured customer feedback from lost and won deals without ever asking us to build one-off features.",
      },
      {
        who: "CTO at Series C Fintech (Customer Who Bought)",
        meta: "Signed $85K annual agreement",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Straight shooter. Didn't oversell the roadmap, ran a tight 3-week technical evaluation, and delivered everything he promised.",
      },
    ],
  },
  {
    handle: "Candidate #DL-309",
    track: "GTM Engineer / Outbound Systems",
    roleCategory: "GTM Engineer",
    currentCompany: "Currently at Series B AI Infrastructure Co.",
    stealth: "Stealth Active • Employers Blocked: 1 Domain",
    compFloor: "$145K Base + Equity",
    blocks: [
      { label: "01 · Stage Scaled", value: "$3M → $18M ARR" },
      { label: "02 · Core Stack", value: "Clay, HubSpot, Python, SQL" },
      { label: "03 · Pipeline Impact", value: "$3.4M Sourced / Qtr" },
      { label: "04 · Rep Leverage", value: "14 Hrs/Wk Saved Per AE" },
      { label: "05 · Target Buyer", value: "Technical & GTM Leaders" },
      { label: "06 · Infrastructure", value: "Signal Routing + Multi-Domain" },
    ],
    references: [
      {
        who: "VP of Revenue Operations (Direct Manager)",
        meta: "Managed Devon for 2 years",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Replaced three outbound agencies in his first 60 days. His Clay and CRM routing architecture ran with zero downtime.",
      },
      {
        who: "Senior Enterprise AE (Internal Stakeholder)",
        meta: "Supported by Devon's outbound engine",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Every morning I wake up to 15 enriched target accounts with verified triggers and draft messaging that actually sounds human.",
      },
      {
        who: "Head of Growth (Teammate)",
        meta: "Co-owned outbound pipeline",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Rare builder who understands both SQL/webhooks and how a VP of Engineering actually reads a cold email.",
      },
    ],
  },
  {
    handle: "Candidate #SR-512",
    track: "VP of Sales / Head of Sales",
    roleCategory: "VP of Sales",
    currentCompany: "Currently at Series B Vertical SaaS",
    stealth: "Stealth Active • Employers Blocked: 4 Domains",
    compFloor: "$180K Base / $350K OTE + Equity",
    blocks: [
      { label: "01 · Stage Scaled", value: "$2M → $22M ARR" },
      { label: "02 · Team Built", value: "Hired & Scaled 4 → 18 AEs" },
      { label: "03 · Team Attainment", value: "78% of Reps >100% Quota" },
      { label: "04 · Deal Band (ACV)", value: "$75K–$250K Enterprise" },
      { label: "05 · Primary Buyer", value: "CFO / COO / VP Ops" },
      { label: "06 · Forecast Accuracy", value: "Within ±6% for 8 Qtrs" },
    ],
    references: [
      {
        who: "Founder & CEO (Direct Manager)",
        meta: "Worked together from Series A to Series B",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Took founder-led sales off my plate in 45 days, rewrote our discovery playbook, and hired 14 AEs with less than 10% regrettable attrition.",
      },
      {
        who: "Enterprise Account Executive (Direct Report)",
        meta: "Promoted from Mid-Market to Enterprise",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Best sales leader I've worked for. Jumps into live CFO calls to help close $200K deals instead of just inspecting CRM dashboards.",
      },
      {
        who: "CFO at Public Logistics Co. (Customer Who Bought)",
        meta: "Signed $240K multi-year agreement",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Ran the most disciplined executive evaluation we've seen from a Series B vendor. Clear ROI model and zero end-of-quarter games.",
      },
    ],
  },
];

const COMPANIES = [
  {
    id: "Role #CO-101",
    companyName: "Vanta-Stage Cloud Security SaaS",
    roleTitle: "Founding Account Executive (AE #1)",
    roleCategory: "Founding AE",
    fundingBadge: "Series A • $18M Raised • 34 Mos Runway",
    compOffer: "$115K Base / $230K OTE + 0.25% Equity",
    blocks: [
      { label: "01 · Stage & ARR", value: "$2.4M ARR (3x YoY)" },
      { label: "02 · Deal Band (ACV)", value: "$55K–$120K ($72K Med)" },
      { label: "03 · Quota & Team Math", value: "$850K Quota • 3.7x OTE" },
      { label: "04 · Pipeline Reality", value: "45% Inbound / 55% Outbound" },
      { label: "05 · Primary Buyer", value: "VP Eng / CISO / CTO" },
      { label: "06 · Sales Cycle & Ramp", value: "45–75d • 4-Mo Guaranteed Draw" },
    ],
    references: [
      {
        who: "Co-Founder & CEO (Hiring Manager)",
        meta: "Closed the first $2.4M ARR founder-led",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "I currently take 12 qualified discovery calls a week myself. You'll inherit half of my active calendar on Day 1 while we co-sell your first 5 deals—zero micromanagement or busywork.",
      },
      {
        who: "Lead GTM Engineer (Current Teammate)",
        meta: "Joined 8 months ago • Owns Clay & CRM stack",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Our Clay + signal enrichment engine is already live. Every Monday morning you get 25 warm accounts showing active Kubernetes security triggers.",
      },
      {
        who: "CISO at Series C FinTech (Customer Who Bought)",
        meta: "Signed $95K annual contract in 38 days",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Deployed in 20 minutes during our technical PoC and immediately surfaced 4 critical production exposures our legacy scanner missed.",
      },
    ],
  },
  {
    id: "Role #CO-108",
    companyName: "Series B AI Developer Platform",
    roleTitle: "Lead GTM Engineer & Outbound Architect",
    roleCategory: "GTM Engineer",
    fundingBadge: "Series B • $42M Raised • 36+ Mos Runway",
    compOffer: "$160K Base + $40K Bonus + 0.15% Equity",
    blocks: [
      { label: "01 · Stage & ARR", value: "$9.5M → $24M ARR Target" },
      { label: "02 · Tech Stack Owned", value: "Clay, HubSpot, Postgres, Python" },
      { label: "03 · Team Supported", value: "8 Mid-Market & Enterprise AEs" },
      { label: "04 · Current Baseline", value: "18,000 Devs on Free Tier (PLG)" },
      { label: "05 · Target Buyer", value: "VP Engineering / AI Leads" },
      { label: "06 · Reporting & Budget", value: "Reports to CRO • $8K/mo Tool Budget" },
    ],
    references: [
      {
        who: "Chief Revenue Officer (Hiring Manager)",
        meta: "Previously scaled Series A→D DevTools",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "You won't be treated like a ticket-taking CRM admin. You own the entire signal-to-outbound architecture and sit in executive revenue staff weekly.",
      },
      {
        who: "Senior Enterprise AE (Internal Customer)",
        meta: "152% of $1.2M Quota Last Year",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "We have ribuan of developers using our open-source SDK daily. We need a builder who can turn usage spikes into automated executive outbound.",
      },
      {
        who: "VP of Engineering at Public SaaS (Customer)",
        meta: "Expanded from $30K pilot to $180K/yr",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Our engineers adopted the tool bottom-up before procurement even knew about it. Fastest technical sign-off I've approved in 3 years.",
      },
    ],
  },
  {
    id: "Role #CO-114",
    companyName: "Series A Vertical Construction FinTech",
    roleTitle: "VP of Sales (First Executive Sales Leader)",
    roleCategory: "VP of Sales",
    fundingBadge: "Series A • $15M Raised • Profitable Unit Economics",
    compOffer: "$190K Base / $360K OTE + 1.0% Equity",
    blocks: [
      { label: "01 · Stage & ARR", value: "$3.8M ARR (118% NRR)" },
      { label: "02 · Deal Band (ACV)", value: "$60K–$140K ($82K Med)" },
      { label: "03 · Team & Attainment", value: "4 AEs Live (3 of 4 >100% Quota)" },
      { label: "04 · Hiring Mandate", value: "Scale 4 → 12 AEs Over 18 Mos" },
      { label: "05 · Primary Buyer", value: "CFO / Controller / Owner" },
      { label: "06 · Sales Cycle", value: "45–60 Days • High Inbound" },
    ],
    references: [
      {
        who: "Founder & CEO (Hiring Manager)",
        meta: "2x Founder • Prior $140M Exit",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Product-market fit is proven—3 of our 4 early AEs are over 100% quota. I want a true partner to own hiring, forecasting, and enterprise deal coaching.",
      },
      {
        who: "Founding Account Executive (Direct Report)",
        meta: "Employee #4 • Closed $1.3M ARR last year",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Win rates on qualified CFO demos are over 38%. Once a controller sees the automated lien-waiver reconciliation, the ROI math sells itself.",
      },
      {
        who: "CFO at $400M General Contractor (Customer)",
        meta: "Signed $115K multi-year agreement",
        verified: "LinkedIn + Work Email Verified",
        quote:
          "Cut our monthly close by 6 days in the first quarter. We referred two peer CFOs in our construction peer group.",
      },
    ],
  },
];

export default function LiveBenchPage() {
  const [benchMode, setBenchMode] = useState<"candidates" | "companies">("candidates");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [requestedHandles, setRequestedHandles] = useState<Record<string, boolean>>({});

  const filteredCandidates =
    selectedRole === "All"
      ? CANDIDATES
      : CANDIDATES.filter((c) => c.roleCategory === selectedRole);

  const filteredCompanies =
    selectedRole === "All"
      ? COMPANIES
      : COMPANIES.filter((c) => c.roleCategory === selectedRole);

  const toggleIntroRequest = (handle: string) => {
    setRequestedHandles((prev) => ({ ...prev, [handle]: true }));
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
              The Two-Sided Live Bench • Updated Weekly
            </div>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-[#111111]">
              {benchMode === "candidates"
                ? "Candidate Profiles & Published References"
                : "Company Profiles & Published Reverse References"}
            </h1>
            <p className="text-base md:text-lg text-[#111111]/65 font-light mt-3 max-w-3xl leading-relaxed">
              {benchMode === "candidates"
                ? "Every candidate on the bench has completed the same 6-Block Operator Profile and published direct, LinkedIn-verified references from former managers, teammates, and customers."
                : "Every hiring company on the bench publishes a candidate-facing 6-Block Company & Role Profile—including real quota attainment, pipeline split, comp floor, and verified reverse references from the hiring manager, a current rep, and a customer."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link
              href="/hire/apply"
              className="px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium text-center transition-colors"
            >
              Build Company Profile &amp; Unlock Bench →
            </Link>
            <Link
              href="/academy/apply"
              className="px-6 py-3 bg-white border border-black/15 hover:border-black text-[#111111] text-xs uppercase tracking-[0.15em] font-medium text-center transition-colors"
            >
              Candidate? Build Stealth Profile
            </Link>
          </div>
        </div>

        {/* Two-Sided Bench Switcher (Candidates vs Companies & Roles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/10 border border-black/10 mb-8">
          <button
            type="button"
            onClick={() => setBenchMode("candidates")}
            className={`p-5 text-left transition-colors cursor-pointer flex items-center justify-between ${
              benchMode === "candidates"
                ? "bg-[#111111] text-white"
                : "bg-white text-[#111111]/70 hover:bg-[#f5f4ef]"
            }`}
          >
            <div>
              <div
                className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${
                  benchMode === "candidates" ? "text-white/60" : "text-[#d9534f]"
                }`}
              >
                For Hiring Companies
              </div>
              <div className="text-xl font-serif">
                01 · Active Candidate Bench ({CANDIDATES.length})
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest">View Candidates →</span>
          </button>

          <button
            type="button"
            onClick={() => setBenchMode("companies")}
            className={`p-5 text-left transition-colors cursor-pointer flex items-center justify-between ${
              benchMode === "companies"
                ? "bg-[#111111] text-white"
                : "bg-white text-[#111111]/70 hover:bg-[#f5f4ef]"
            }`}
          >
            <div>
              <div
                className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${
                  benchMode === "companies" ? "text-white/60" : "text-[#d9534f]"
                }`}
              >
                For Candidates (What Companies Send You)
              </div>
              <div className="text-xl font-serif">
                02 · Standardized Company &amp; Role Profiles ({COMPANIES.length})
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest">View Companies →</span>
          </button>
        </div>

        {/* Role Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-px bg-black/10 border border-black/10">
            {["All", "Founding AE", "VP of Sales", "GTM Engineer"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer ${
                  selectedRole === role
                    ? "bg-[#111111] text-white"
                    : "bg-[#fcfaf8] text-[#111111]/65 hover:bg-[#f5f4ef] hover:text-[#111111]"
                }`}
              >
                {role === "All"
                  ? `All Tracks (${
                      benchMode === "candidates" ? CANDIDATES.length : COMPANIES.length
                    })`
                  : role}
              </button>
            ))}
          </div>

          <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/50">
            {benchMode === "candidates"
              ? "✓ 1 LinkedIn ID = 1 Profile • ✓ References Verified via LinkedIn + Work Email"
              : "✓ Verified Quota & Comp Math • ✓ Reverse References from Boss, Rep & Customer"}
          </div>
        </div>

        {/* MODE 1: CANDIDATE CARDS */}
        {benchMode === "candidates" && (
          <div className="space-y-10">
            {filteredCandidates.map((c) => {
              const isRequested = !!requestedHandles[c.handle];
              return (
                <div
                  key={c.handle}
                  className="bg-white border border-black/10 p-8 md:p-12 space-y-8"
                >
                  {/* Top Identity Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className="px-3 py-1 bg-[#111111] text-white text-[10px] uppercase tracking-[0.15em] font-medium">
                          {c.track}
                        </span>
                        <span className="px-3 py-1 border border-black/15 text-[#111111]/70 text-[10px] uppercase tracking-[0.15em]">
                          ✓ 1-of-1 LinkedIn Verified
                        </span>
                        <span className="px-3 py-1 bg-[#f5f4ef] text-[#111111]/65 text-[10px] uppercase tracking-[0.15em]">
                          {c.stealth}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif text-[#111111]">
                        {c.handle}{" "}
                        <span className="text-[#111111]/50 italic font-light text-xl">
                          — {c.currentCompany}
                        </span>
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 self-start md:self-center shrink-0">
                      <div className="text-left sm:text-right">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Minimum Comp to Move
                        </div>
                        <div className="text-sm font-serif text-[#111111]">{c.compFloor}</div>
                      </div>

                      {isRequested ? (
                        <Link
                          href="/hire/apply"
                          className="px-6 py-3.5 bg-[#d9534f] text-white text-xs uppercase tracking-[0.15em] font-medium transition-colors"
                        >
                          Build Company Profile to Send Intro →
                        </Link>
                      ) : (
                        <button
                          onClick={() => toggleIntroRequest(c.handle)}
                          className="px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer"
                        >
                          Request Warm Intro →
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Part 1: 6-Block Standardized Profile */}
                  <div>
                    <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium">
                      Part 01 · Standardized 6-Block Candidate Profile
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-black/10 border border-black/10">
                      {c.blocks.map((b) => (
                        <div key={b.label} className="bg-[#fcfaf8] p-5">
                          <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                            {b.label}
                          </div>
                          <div className="text-base md:text-lg font-serif text-[#111111]">
                            {b.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part 2: Published References */}
                  <div>
                    <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                      Part 02 · Published References (Verified via LinkedIn + Work Email)
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
                      {c.references.map((ref, rIdx) => (
                        <div
                          key={rIdx}
                          className="bg-[#fcfaf8] p-6 flex flex-col justify-between"
                        >
                          <p className="text-sm font-serif italic text-[#111111]/85 leading-relaxed mb-5">
                            &ldquo;{ref.quote}&rdquo;
                          </p>
                          <div className="border-t border-black/10 pt-3 flex items-center justify-between gap-2 text-[11px]">
                            <div>
                              <div className="font-medium text-[#111111]">{ref.who}</div>
                              <div className="text-[#111111]/50 text-[10px] mt-0.5">{ref.meta}</div>
                            </div>
                            <span className="text-[#111111]/55 shrink-0 uppercase tracking-wider text-[10px]">
                              ✓ Verified
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE 2: COMPANY & ROLE PROFILES (CANDIDATE-FACING) */}
        {benchMode === "companies" && (
          <div className="space-y-10">
            {filteredCompanies.map((co) => {
              const isRequested = !!requestedHandles[co.id];
              return (
                <div
                  key={co.id}
                  className="bg-white border border-black/10 p-8 md:p-12 space-y-8"
                >
                  {/* Top Company & Role Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className="px-3 py-1 bg-[#111111] text-white text-[10px] uppercase tracking-[0.15em] font-medium">
                          {co.roleTitle}
                        </span>
                        <span className="px-3 py-1 border border-black/15 text-[#111111]/70 text-[10px] uppercase tracking-[0.15em]">
                          ✓ Verified Bench Pass Member
                        </span>
                        <span className="px-3 py-1 bg-[#f5f4ef] text-[#111111]/65 text-[10px] uppercase tracking-[0.15em]">
                          {co.fundingBadge}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif text-[#111111]">
                        {co.id}{" "}
                        <span className="text-[#111111]/50 italic font-light text-xl">
                          — {co.companyName}
                        </span>
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 self-start md:self-center shrink-0">
                      <div className="text-left sm:text-right">
                        <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Verified Comp &amp; Equity
                        </div>
                        <div className="text-sm font-serif text-[#111111]">{co.compOffer}</div>
                      </div>

                      {isRequested ? (
                        <Link
                          href="/academy/apply"
                          className="px-6 py-3.5 bg-[#d9534f] text-white text-xs uppercase tracking-[0.15em] font-medium transition-colors"
                        >
                          Complete Stealth Profile to Unlock Intro →
                        </Link>
                      ) : (
                        <button
                          onClick={() => toggleIntroRequest(co.id)}
                          className="px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer"
                        >
                          Request Intro as Candidate →
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Part 1: 6-Block Standardized Company & Role Profile */}
                  <div>
                    <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium">
                      Part 01 · Standardized 6-Block Company &amp; Role Profile (No Vague JDs)
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-black/10 border border-black/10">
                      {co.blocks.map((b) => (
                        <div key={b.label} className="bg-[#fcfaf8] p-5">
                          <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                            {b.label}
                          </div>
                          <div className="text-base md:text-lg font-serif text-[#111111]">
                            {b.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part 2: Published Reverse References */}
                  <div>
                    <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                      Part 02 · Published Reverse References (Hiring Manager, Current Rep &amp; Customer)
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
                      {co.references.map((ref, rIdx) => (
                        <div
                          key={rIdx}
                          className="bg-[#fcfaf8] p-6 flex flex-col justify-between"
                        >
                          <p className="text-sm font-serif italic text-[#111111]/85 leading-relaxed mb-5">
                            &ldquo;{ref.quote}&rdquo;
                          </p>
                          <div className="border-t border-black/10 pt-3 flex items-center justify-between gap-2 text-[11px]">
                            <div>
                              <div className="font-medium text-[#111111]">{ref.who}</div>
                              <div className="text-[#111111]/50 text-[10px] mt-0.5">{ref.meta}</div>
                            </div>
                            <span className="text-[#111111]/55 shrink-0 uppercase tracking-wider text-[10px]">
                              ✓ Verified
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Bench Pass CTA */}
        <div className="mt-16 bg-[#f5f4ef] border border-black/10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              Symmetrical Two-Sided Profiles • $2,500/mo Bench Pass • $0 Placement Fee
            </div>
            <h3 className="text-3xl font-serif text-[#111111]">
              Publish your 6-Block Company Profile &amp; unlock the Candidate Bench.
            </h3>
            <p className="text-sm text-[#111111]/65 font-light mt-2 max-w-xl leading-relaxed">
              When you request an intro to a stealth candidate, they receive your standardized 6-Block Company &amp; Role Profile and your published reverse references—driving an 80%+ intro acceptance rate.
            </p>
          </div>
          <Link
            href="/hire/apply"
            className="px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium shrink-0 transition-colors"
          >
            Build Company &amp; Role Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

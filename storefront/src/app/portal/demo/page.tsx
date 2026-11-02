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

export default function LiveBenchPage() {
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [requestedHandles, setRequestedHandles] = useState<Record<string, boolean>>({});

  const filteredCandidates =
    selectedRole === "All"
      ? CANDIDATES
      : CANDIDATES.filter((c) => c.roleCategory === selectedRole);

  const toggleIntroRequest = (handle: string) => {
    setRequestedHandles((prev) => ({ ...prev, [handle]: true }));
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
              The Live Bench • Updated Weekly
            </div>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-[#111111]">
              Standardized Profiles &amp; Published References
            </h1>
            <p className="text-base md:text-lg text-[#111111]/65 font-light mt-3 max-w-3xl leading-relaxed">
              Every candidate on the bench has completed the same 6-Block Operator Profile and published direct, LinkedIn-verified references from former managers, teammates, and customers. Activate a Bench Pass to unlock your matched shortlist and request double-opt-in warm intros.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link
              href="/hire/apply"
              className="px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium text-center transition-colors"
            >
              Get a Bench Pass ($2,500/mo) →
            </Link>
            <Link
              href="/academy/apply"
              className="px-6 py-3 bg-white border border-black/15 hover:border-black text-[#111111] text-xs uppercase tracking-[0.15em] font-medium text-center transition-colors"
            >
              Candidate? Publish Your Profile
            </Link>
          </div>
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
                {role === "All" ? `All Tracks (${CANDIDATES.length})` : role}
              </button>
            ))}
          </div>

          <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/50">
            ✓ 1 LinkedIn ID = 1 Profile • ✓ References Verified via LinkedIn + Work Email
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="space-y-10">
          {filteredCandidates.map((c) => {
            const isRequested = !!requestedHandles[c.handle];
            return (
              <div key={c.handle} className="bg-white border border-black/10 p-8 md:p-12 space-y-8">
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
                        Activate Bench Pass to Complete Intro →
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
                    Part 01 · Standardized 6-Block Profile
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

        {/* Bottom Bench Pass CTA */}
        <div className="mt-16 bg-[#f5f4ef] border border-black/10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              The Bench Pass • $2,500/mo • $0 Placement Fee
            </div>
            <h3 className="text-3xl font-serif text-[#111111]">
              Want your matched shortlist &amp; direct warm intros?
            </h3>
            <p className="text-sm text-[#111111]/65 font-light mt-2 max-w-xl leading-relaxed">
              Configure your 6-Block Role Spec in 60 seconds. Unlock unlimited double-opt-in warm introductions to every matching candidate on the Live Bench with zero back-end commission fees.
            </p>
          </div>
          <Link
            href="/hire/apply"
            className="px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium shrink-0 transition-colors"
          >
            Activate Bench Pass →
          </Link>
        </div>
      </div>
    </div>
  );
}

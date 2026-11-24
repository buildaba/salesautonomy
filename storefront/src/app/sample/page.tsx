"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, ChevronDown, Code2, ShieldCheck } from "lucide-react";
import { PowerTableExplorer } from "@/components/vault/PowerTableExplorer";

const DATA_BUILDING_BLOCKS = [
  {
    step: "01 · Official Proof Link",
    title: "Every fact links back to the original filing",
    plainSummary:
      "Your reps never guess where a number came from. Every employee count, permit value, and expiration date links straight to the public record.",
    techTable: "sources_provenance",
    techDetail:
      "Stores source authority tier (1–5), filing date, capture timestamp, verbatim excerpt, and SHA-256 payload hash.",
  },
  {
    step: "02 · Real Parent Company",
    title: "We merge messy LLC names into one clean account",
    plainSummary:
      "Government filings hide real companies behind dozens of local LLCs. We tie them back to the true parent company, real website, and verified staff count.",
    techTable: "entities",
    techDetail:
      "Canonical corporate spine cross-joined across EIN, SAM.gov UEI, CMS NPI-2, and USDOT with field_provenance_jsonb locks.",
  },
  {
    step: "03 · Every Physical Location",
    title: "See every clinic, plant, or job site under one roof",
    plainSummary:
      "Know whether a prospect runs 2 locations or 22—plus what booking software their clinics use—before your rep dials.",
    techTable: "facilities_sites",
    techDetail:
      "Links branch clinics, manufacturing plants, fleet terminals, and permitted sites back to parent entity_id.",
  },
  {
    step: "04 · Active Deadlines",
    title: "Track real dates that force buyers to act",
    plainSummary:
      "We watch 30-day truck insurance cancellations, new OSHA inspections, Medicare correction deadlines, building permits, and expiring federal contracts.",
    techTable: "compliance_filings",
    techDetail:
      "Structured filings across BMC-35, BMC-91X, OSHA OPEN_DATE, CMS F-Tags, SAM.gov expirations, and municipal permits.",
  },
  {
    step: "05 · Live Urgency Score",
    title: "Old alerts drop off automatically",
    plainSummary:
      "Fresh deadlines stay at the top of your reps' list. Once a deadline gets old, it moves out of the way automatically.",
    techTable: "signals_deltas",
    techDetail:
      "DuckDB SHA-256 delta detection with daily pg_cron exponential decay W(t) = W0 * 0.5^(t / half_life).",
  },
  {
    step: "06 · Verified Decision-Makers",
    title: "Real executives—never outside accountants",
    plainSummary:
      "Raw filings are full of outside CPAs and law firms. We strip third-party filers out and check executive emails right before unlock (<2% bounce).",
    techTable: "contacts",
    techDetail:
      "55+ keyword CPA/registered-agent exclusion gate plus Just-In-Time Catch-All SMTP verification.",
  },
];

const SOURCE_RANKING = [
  {
    rank: "1",
    label: "Federal Filings",
    detail: "Highest trust — official U.S. government records (DOT, OSHA, Medicare, Labor, SAM.gov)",
  },
  {
    rank: "2",
    label: "State & City Permits",
    detail: "State clinic licenses and local commercial building permits",
  },
  {
    rank: "3",
    label: "Company Websites",
    detail: "Live patient booking tools and official company pages",
  },
  {
    rank: "4",
    label: "Industry Directories",
    detail: "Trade lists and association databases",
  },
  {
    rank: "5",
    label: "General Web",
    detail: "Lowest trust — can never overwrite facts from #1 through #4",
  },
];

function DemoContent() {
  const searchParams = useSearchParams();
  const initialIndustry =
    searchParams.get("industry") || searchParams.get("engine") || undefined;

  const [viewMode, setViewMode] = useState<"explorer" | "howItWorks">("explorer");
  const [showTechSpecs, setShowTechSpecs] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-10 pb-8 border-b border-black/10">
          <p className="text-xs font-medium text-[#6b665e] mb-3">
            Live Sample Explorer · 12 Verified Accounts Across 3 Industries
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#141413] font-medium leading-[1.08]">
                Browse live sample leads.
              </h1>
              <p className="text-base sm:text-lg text-[#5c5852] mt-3 max-w-2xl leading-relaxed">
                Filter real examples across healthcare clinics, trucking fleets, factories, and
                government contractors. Click any account to inspect official proof and verified
                buyers.
              </p>
            </div>

            {/* Clean View Switcher */}
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
                Live Sample Leads (12)
              </button>
              <button
                type="button"
                onClick={() => setViewMode("howItWorks")}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  viewMode === "howItWorks"
                    ? "bg-[#141413] text-[#faf9f5]"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                How the Data Works
              </button>
            </div>
          </div>
        </div>

        {viewMode === "explorer" ? (
          <div className="space-y-8">
            {/* Industry Summary Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                  01 · Healthcare &amp; Clinics
                </div>
                <h2 className="text-lg font-serif font-medium text-[#141413] mb-1.5">
                  Expanding Clinic Groups
                </h2>
                <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                  Multi-site medical, dental, and nursing groups adding locations, switching booking
                  software, or fixing Medicare inspection citations.
                </p>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                  02 · Trucking &amp; Factories
                </div>
                <h2 className="text-lg font-serif font-medium text-[#141413] mb-1.5">
                  Fleet &amp; Plant Deadlines
                </h2>
                <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                  Commercial fleets facing 30-day insurance cancellations or renewals, plus factories
                  hit with fresh OSHA or EPA inspections.
                </p>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                  03 · Gov Contractors &amp; Builders
                </div>
                <h2 className="text-lg font-serif font-medium text-[#141413] mb-1.5">
                  Contracts &amp; Large Permits
                </h2>
                <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                  Contractors with expiring federal bidding registrations, contracts entering re-bid,
                  and builders pulling $100K+ commercial permits.
                </p>
              </div>
            </div>

            {/* Interactive Explorer */}
            <PowerTableExplorer initialIndustry={initialIndustry} />
          </div>
        ) : (
          /* ── VIEW 2: PLAIN-ENGLISH DATA ARCHITECTURE (+ OPTIONAL DEV TOGGLE) ── */
          <div className="space-y-8">
            {/* Hero Accuracy Card — Plain-English Rewrite of the Screenshot Card */}
            <div className="bg-white border border-black/12 rounded-2xl p-7 sm:p-10 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-1 rounded-md mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                How We Keep Data Accurate
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413] mb-3">
                Official records always beat web scrapes.
              </h2>
              <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed max-w-3xl mb-6">
                Most lead tools overwrite good data with bad web scrapes. We rank every source from
                1 to 5. Once a federal filing confirms a company&apos;s staff count or owner, a
                random web scrape can never replace it.
              </p>

              <div className="space-y-2.5">
                {SOURCE_RANKING.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-start sm:items-center gap-3.5 p-3.5 rounded-xl bg-[#faf9f5] border border-black/8"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#141413] text-[#faf9f5] text-xs font-semibold flex items-center justify-center shrink-0">
                      {item.rank}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2.5 text-sm">
                      <span className="font-medium text-[#141413] shrink-0">{item.label}</span>
                      <span className="hidden sm:inline text-[#6b665e]">—</span>
                      <span className="text-[#5c5852] text-xs sm:text-sm">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Plain-English Building Blocks */}
            <div className="bg-white border border-black/10 rounded-2xl p-7 sm:p-10 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-[#6b665e] mb-2">
                    What Goes Into Every Account Record
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413] mb-2">
                    Six clean layers behind every lead.
                  </h2>
                  <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
                    Flat spreadsheets break when one company runs 14 clinics under different LLCs.
                    We link every location, filing, deadline, and decision-maker into one clean
                    view.
                  </p>
                </div>

                {/* Optional Toggle for Technical / Data Teams */}
                <button
                  type="button"
                  onClick={() => setShowTechSpecs((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/14 bg-[#faf9f5] hover:bg-[#f0eee6] text-xs font-medium text-[#141413] transition-colors cursor-pointer self-start md:self-auto shrink-0"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#2e6f40]" />
                  <span>
                    {showTechSpecs
                      ? "Hide Technical Specs"
                      : "Technical Specs (For Data Teams)"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      showTechSpecs ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {DATA_BUILDING_BLOCKS.map((block) => (
                  <div
                    key={block.step}
                    className="bg-[#faf9f5] border border-black/8 rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                        <Check className="w-3 h-3" />
                        {block.step}
                      </div>
                      <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
                        {block.title}
                      </h3>
                      <p className="text-sm text-[#5c5852] leading-relaxed">
                        {block.plainSummary}
                      </p>

                      {showTechSpecs && (
                        <div className="mt-4 pt-3 border-t border-black/8">
                          <div className="text-[11px] font-mono font-medium text-[#141413] mb-1">
                            Table: {block.techTable}
                          </div>
                          <p className="text-xs font-mono text-[#6b665e] leading-relaxed">
                            {block.techDetail}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {showTechSpecs && (
                <div className="mt-6 p-5 rounded-xl bg-[#f0eee6] border border-black/10 text-xs font-mono text-[#3d3a34] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span>
                    Postgres trigger <strong className="text-[#141413]">fn_provenance_update()</strong>{" "}
                    enforces Tier 1–5 precedence inside{" "}
                    <strong className="text-[#141413]">field_provenance_jsonb</strong>. Live JSON
                    &amp; MCP endpoint available at <strong className="text-[#141413]">/api/vault</strong>.
                  </span>
                  <Link
                    href="/api/vault"
                    className="text-[#141413] underline underline-offset-4 font-sans font-medium shrink-0"
                  >
                    Inspect JSON API →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-14 bg-[#f0eee6] border border-black/12 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium text-[#2e6f40] mb-1.5">
              Test Us Against Your Current CRM First
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
              Start a 7-Day Territory Pilot for $1,950.
            </h3>
            <p className="text-sm text-[#5c5852] mt-1.5 max-w-2xl leading-relaxed">
              Get 2,500 target accounts, 5,000 verified decision-makers, active deadlines, and a
              Missing Accounts Report. Every dollar credits toward full CRM sync if you upgrade.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/pilot"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Start 7-Day Pilot ($1,950)
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-white border border-black/14 hover:bg-[#faf9f5] text-[#141413] text-sm font-medium flex items-center justify-center transition-colors"
            >
              See Plans &amp; Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveDatabaseDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24 px-6">
          <div className="max-w-6xl mx-auto text-sm text-[#5c5852]">
            Loading sample leads…
          </div>
        </div>
      }
    >
      <DemoContent />
    </Suspense>
  );
}

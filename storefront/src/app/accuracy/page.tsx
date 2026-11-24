import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Accuracy & Proof — Sales Autonomy",
  description:
    "Official records always beat web scrapes. See how we verify real executives, link direct proof to every fact, and guarantee <2% email bounce.",
};

export default function CredibilityPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pb-16 border-b border-black/10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#6b665e] mb-3">
            Data Accuracy &amp; Proof · Built for Sales Teams
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif tracking-tight leading-[1.08] text-[#141413] font-medium mb-5">
            Why sales reps trust every account we send.
          </h1>
          <p className="text-base sm:text-lg text-[#5c5852] leading-relaxed">
            When a rep calls an outside accountant by mistake or quotes a wrong headcount, the deal
            dies fast. Every account passes three strict accuracy checks before it ever enters your
            CRM.
          </p>
        </div>
      </section>

      {/* Section 1: 3 Accuracy Checks */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-black/10">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-medium text-[#2e6f40] mb-2">
            01 · Three Checks Before Delivery
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
            Official facts first. Real buyers only. Zero guesswork.
          </h2>
          <p className="text-base text-[#5c5852] leading-relaxed">
            Every record across healthcare, trucking, and government contracting passes these three
            rules automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Check 1 · Official Trust Ranking
            </div>
            <h3 className="text-xl font-serif font-medium text-[#141413] mb-2.5">
              Official records always beat web scrapes
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              We rank every source from 1 (federal filings) down to 5 (general web). Once an
              official filing confirms headcount or ownership, a low-trust web scrape can never
              overwrite it.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Check 2 · Real Executive Filter
            </div>
            <h3 className="text-xl font-serif font-medium text-[#141413] mb-2.5">
              Strips out outside CPAs and law firms
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Raw government filings list outside tax preparers, lawyers, and registered agents. Our
              filter removes third-party filers so your reps only call real CFOs, COOs, Safety VPs,
              and owners.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Check 3 · Direct Proof Links
            </div>
            <h3 className="text-xl font-serif font-medium text-[#141413] mb-2.5">
              Every fact has a source—never guessed
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Every key fact includes a direct link to the public filing, the date we checked it,
              and the exact text from the record. If a company did not report a number, we leave it
              blank.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Timing & Deliverability */}
      <section className="py-20 bg-[#f0eee6]/55 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              02 · Timing &amp; Email Deliverability
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Reach buyers 30 to 90 days before the deadline.
            </h2>
            <p className="text-base text-[#5c5852] leading-relaxed">
              Press releases come out after the money is spent. We track upcoming deadlines and
              check executive emails right when you unlock them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="text-xs font-medium text-[#6b665e] mb-2">
                Insurance &amp; Contract Countdowns
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2.5">
                30, 60, and 90-Day Renewal Windows
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                We catch 30-day truck insurance cancellation notices, upcoming annual fleet renewals,
                and expiring federal bidding registrations before competitors call.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="text-xs font-medium text-[#6b665e] mb-2">
                Safety &amp; Facility Triggers
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2.5">
                Fresh Inspections &amp; Build Permits
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                Instead of waiting months for closed fines, we flag newly opened OSHA inspections,
                45-day Medicare correction deadlines, and newly issued $100K+ building permits.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="text-xs font-medium text-[#6b665e] mb-2">
                Live Inbox Verification
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2.5">
                &lt; 2% Email Bounce Guarantee
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                Checking millions of emails months early leads to bounces. We confirm corporate
                officers from official filings, then run live inbox checks the moment you unlock
                them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: CRM Safety & Privacy */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              03 · Safe CRM Sync &amp; B2B Compliance
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-4">
              Safe CRM writes. Clean B2B privacy rules.
            </h2>
            <p className="text-base text-[#5c5852] leading-relaxed mb-6">
              Your team gets clean accounts without risking rep notes, domain health, or privacy
              compliance.
            </p>
            <ul className="space-y-3.5 text-sm text-[#141413]">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong>Four easy delivery options:</strong> Weekly spreadsheets, live search
                  portal, direct CRM sync (HubSpot, Salesforce, Clay), or REST &amp; MCP API.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong>Never overwrites rep notes:</strong> Our sync only fills blank fields and
                  attaches dated trigger alerts—rep-edited notes stay untouched.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong>Stale leads drop off automatically:</strong> Urgency scores drop daily as
                  deadlines pass, keeping rep call lists fresh.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong>Strictly B2B public records:</strong> Covers business entities and
                  corporate officers only, with automatic opt-out suppression (Non-FCRA).
                </span>
              </li>
            </ul>

            <div className="mt-7 pt-6 border-t border-black/10 text-xs text-[#6b665e]">
              Want the Postgres tables, SHA-256 verification specs, or API endpoints for your data
              team?{" "}
              <Link
                href="/sample"
                className="text-[#141413] font-medium underline underline-offset-4 hover:text-[#2e6f40]"
              >
                Open How the Data Works → Technical Specs
              </Link>
              .
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#f0eee6] border border-black/12 rounded-2xl p-8 space-y-5">
            <div className="text-xs font-medium text-[#2e6f40]">
              Audit Us Against Your CRM First
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
              Test 2,500 accounts in your territory in 7 days for $1,950.
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Send us your current CRM export. We deliver 2,500 matched accounts, 5,000 verified
              decision-makers, active deadlines, and a Missing Accounts Report—with 100% credited
              toward full setup.
            </p>
            <div className="pt-2 flex flex-col gap-3">
              <Link
                href="/pilot"
                className="min-h-[46px] px-6 py-3 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Start 7-Day Pilot ($1,950)
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sample"
                className="min-h-[46px] px-6 py-3 rounded-xl bg-white border border-black/14 hover:bg-[#faf9f5] text-[#141413] text-sm font-medium flex items-center justify-center transition-colors"
              >
                Browse Live Sample Leads
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

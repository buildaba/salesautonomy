import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Plans & Pricing — Sales Autonomy",
  description:
    "Start with a 7-day Territory Pilot for $1,950. Get verified buyers with active deadlines synced straight into HubSpot, Salesforce, Clay, or spreadsheets.",
};

const PLANS = [
  {
    badge: "Self-Serve & Outbound Agencies",
    name: "Self-Serve Portal & API",
    setupPrice: "$0 Setup",
    setupMeta: "Ready on Day 1",
    monthlyPrice: "$799/mo",
    monthlyMeta: "Billed quarterly ($2,397 / quarter)",
    summary:
      "For lean sales teams and outbound agencies that want live search, weekly CSV digests, and verified contact unlocks in 1 industry.",
    features: [
      "Full search portal across 1 industry (Healthcare, Trucking, or Gov Contractors)",
      "1,250 company unlocks/month (~2,500 verified buyers)",
      "Real executives only—outside accountants and lawyers screened out",
      "Fresh email checks on unlock (<2% bounce guarantee)",
      "Weekly Monday CSV digest + outbound webhook feed",
      "REST and MCP API access for Clay and internal tools",
    ],
    ctaLabel: "Start Self-Serve Plan",
  },
  {
    badge: "Most Popular · Mid-Market Sales Teams",
    name: "Managed CRM Sync",
    setupPrice: "$9,500",
    setupMeta: "One-time setup ($7,550 after Pilot credit)",
    monthlyPrice: "$1,950/mo",
    monthlyMeta: "Ongoing weekly sync & refresh",
    summary:
      "For 5–50 rep sales teams that want a full national industry wired straight into HubSpot, Salesforce, or Clay with automatic rep routing.",
    featured: true,
    features: [
      "Full national industry synced directly into HubSpot, Salesforce, or Clay",
      "3,500 company unlocks/month (~7,000 verified decision-makers)",
      "Custom account scoring so hottest deadlines hit rep queues first",
      "Old alerts drop off automatically once deadlines pass",
      "Monthly contact refresh plus executive job-change alerts",
      "Safe CRM sync: fills blank fields and never overwrites rep notes",
    ],
    ctaLabel: "Start With $1,950 Pilot",
  },
  {
    badge: "Enterprise · All 3 Industries",
    name: "Private Warehouse & All Industries",
    setupPrice: "$18,000",
    setupMeta: "One-time setup ($16,050 after Pilot credit)",
    monthlyPrice: "$3,950/mo",
    monthlyMeta: "All 3 industries + custom SLA",
    summary:
      "For larger revenue teams, vertical software companies, and portfolio ops needing direct warehouse sync across every industry we track.",
    features: [
      "All 3 industries unlocked (Healthcare, Trucking & Factories, Gov Contractors)",
      "Direct sync to Snowflake, BigQuery, AWS RDS, or private Postgres",
      "10,000 company unlocks/month with live email verification",
      "Human review for complex parent companies and holding groups",
      "Custom data processing agreement, opt-out sync, and audit logs",
      "99.5% uptime SLA with 1-business-day data fix guarantee",
    ],
    ctaLabel: "Talk to Us About Enterprise",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 pb-10 border-b border-black/10 max-w-3xl">
          <p className="text-xs font-medium text-[#6b665e] mb-3">
            Simple, Transparent Pricing · Max 5 Customers Per Territory
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif tracking-tight leading-[1.08] text-[#141413] font-medium mb-4">
            Test us for 7 days first. Scale when your reps book meetings.
          </h1>
          <p className="text-base sm:text-lg text-[#5c5852] leading-relaxed">
            Our three industry databases are already built and cleaned. You do not wait two months
            for custom scrapers. Start with a 7-day pilot for $1,950, or jump straight into a
            monthly plan.
          </p>
        </div>

        {/* 7-Day Territory Pilot Banner */}
        <div className="bg-white border border-black/12 rounded-2xl p-7 sm:p-10 mb-14 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-7 border-b border-black/10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ecfdf5] text-[#2e6f40] border border-[#a7f3d0] text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Best Place to Start · Delivered in 7 Days
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#f0eee6] text-xs font-medium text-[#141413]">
                  100% Credited Toward Full Setup
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
                The 7-Day Territory Pilot
              </h2>
              <p className="text-sm sm:text-base text-[#5c5852] mt-2 max-w-2xl leading-relaxed">
                Send us your current CRM account list. We match it against 1 of our 3 industries and
                show you every qualified clinic, fleet, factory, or contractor your CRM is missing.
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <div className="text-4xl sm:text-5xl font-serif text-[#141413]">$1,950</div>
              <div className="text-xs text-[#6b665e] mt-1">One-Time · Ready in 7 Days</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-7 border-b border-black/10">
            {[
              "2,500 target accounts matched against your existing CRM list",
              "5,000 verified decision-maker emails (<2% bounce guarantee)",
              "Active 30, 60, and 90-day deadlines plus a Missing Accounts Report",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 text-sm text-[#141413] leading-relaxed"
              >
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-[#5c5852]">
              <strong className="text-[#141413] font-medium">100% Credit Guarantee:</strong> Upgrade
              within 30 days and your full $1,950 comes right off Managed CRM Sync ($9,500 → $7,550)
              or Enterprise ($18,000 → $16,050).
            </div>
            <Link
              href="/hire/apply"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[#141413] text-[#faf9f5] text-sm font-medium hover:bg-[#2a2927] transition-colors inline-flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              Start 7-Day Pilot ($1,950)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`p-7 sm:p-8 rounded-2xl flex flex-col justify-between transition-all ${
                plan.featured
                  ? "bg-[#f0eee6] border border-black/15 shadow-[0_6px_20px_rgba(20,20,19,0.05)]"
                  : "bg-white border border-black/10 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                      plan.featured
                        ? "bg-[#2e6f40] text-white"
                        : "bg-[#f0eee6] text-[#5c5852]"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#141413] mb-2.5">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#5c5852] leading-relaxed mb-6">{plan.summary}</p>

                {/* Price Box */}
                <div className="grid grid-cols-2 gap-3 mb-7">
                  <div className="bg-white/90 border border-black/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-[#6b665e] mb-0.5">Setup</div>
                    <div className="text-xl sm:text-2xl font-serif text-[#141413]">
                      {plan.setupPrice}
                    </div>
                    <div className="text-[11px] text-[#5c5852] mt-1 leading-snug">
                      {plan.setupMeta}
                    </div>
                  </div>
                  <div className="bg-white/90 border border-black/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-[#2e6f40] font-medium mb-0.5">
                      Monthly
                    </div>
                    <div className="text-xl sm:text-2xl font-serif text-[#141413]">
                      {plan.monthlyPrice}
                    </div>
                    <div className="text-[11px] text-[#5c5852] mt-1 leading-snug">
                      {plan.monthlyMeta}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-[#141413] leading-relaxed"
                    >
                      <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/hire/apply"
                className={`w-full min-h-[46px] py-3 px-5 rounded-xl text-sm font-medium text-center transition-colors flex items-center justify-center gap-2 ${
                  plan.featured
                    ? "bg-[#141413] text-[#faf9f5] hover:bg-[#2a2927] shadow-sm"
                    : "bg-white border border-black/15 text-[#141413] hover:bg-[#f0eee6]"
                }`}
              >
                {plan.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* 3 Plain-English Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="text-xs font-medium text-[#2e6f40] mb-1.5">
              01 · Ready in 7 Days
            </div>
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              Fast Delivery, Zero Custom Scraper Delays
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              We already maintain clean federal and municipal feeds across all three industries.
              Your team gets verified accounts in 7 days instead of waiting 60 days.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="text-xs font-medium text-[#2e6f40] mb-1.5">
              02 · &lt;2% Bounce Guarantee
            </div>
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              Emails Checked Right Before You Unlock
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              We verify up to 2 executive emails per company live when you unlock them. If bounces
              ever top 2%, we replace them 2-for-1 automatically.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="text-xs font-medium text-[#2e6f40] mb-1.5">
              03 · Protected Territories &amp; Privacy
            </div>
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              Max 5 Subscribers · Strictly B2B
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              We cap every regional territory at 5 active customers. Every record covers business
              officers and public filings with automatic opt-out protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

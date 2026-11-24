import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Vertical Database & CRM Deployment Pricing — Sales Autonomy",
  description:
    "Start with a 7-day Territory & CRM Whitespace Pilot for $1,950. Deploy our pre-cleaned vertical market engines into HubSpot, Salesforce, Clay, or your private warehouse.",
};

const COMMERCIAL_TIERS = [
  {
    badge: "Tier 1 · Self-Serve & Clay Agencies",
    name: "PowerTable & Credit-Metered API Plan",
    buildPrice: "$0 Setup",
    buildMeta: "Pre-Cleaned Engine Ready Day 1",
    retainerPrice: "$799/mo",
    retainerMeta: "Paid Quarterly ($2,397 / Quarter)",
    summary:
      "For focused GTM teams and Clay outbound agencies that want direct UI search, weekly delta webhooks, and metered contact unlocks across 1 Vertical Engine.",
    features: [
      "Full PowerTable UI search across 1 Pre-Cleaned Vertical Engine",
      "1,250 unique company contact unlocks/month (~2,500 verified buyers)",
      "Shared SAM.gov (700K domains) + DOL Form 5500 (650K EINs) corporate backbone",
      "50-keyword CPA/registered-agent filter + <2% bounce Just-In-Time verification",
      "Weekly delta CSV/Parquet digest + outbound webhook feed",
      "Read-only REST API & MCP server for Clay and internal agents",
    ],
    ctaLabel: "Start Tier 1 Quarterly Plan",
  },
  {
    badge: "Tier 2 · Most Popular (Mid-Market GTM)",
    name: "Managed CRM Deployment & Signal Sync",
    buildPrice: "$9,500",
    buildMeta: "One-Time Build ($7,550 Net After Pilot Credit)",
    retainerPrice: "$1,950/mo",
    retainerMeta: "Ongoing Signal & Decay Sync",
    summary:
      "For 5–50 rep GTM teams that want a full national vertical database wired bi-directionally into HubSpot, Salesforce, or Clay with automated SDR routing.",
    featured: true,
    features: [
      "Full national vertical database deployed & synced to HubSpot, Salesforce, or Clay",
      "3,500 unique company contact unlocks/month (~7,000 verified decision-makers)",
      "Custom ICP win-rate scoring + daily exponential signal decay (pg_cron half-life math)",
      "Forward-looking 30/60/90d triggers (BMC-35, OSHA, SAM expirations) routed to SDR queues",
      "Continuous 3%/mo contact-decay replacement & champion job-change alerts",
      "Non-destructive CRM write lock: fills gaps and never overwrites rep-owned notes",
    ],
    ctaLabel: "Start With $1,950 Territory Pilot",
  },
  {
    badge: "Tier 3 · Enterprise Multi-Engine Vault",
    name: "Private Warehouse & All-3-Engines Vault",
    buildPrice: "$18,000",
    buildMeta: "One-Time Build ($16,050 Net After Pilot Credit)",
    retainerPrice: "$3,950/mo",
    retainerMeta: "All 3 Vertical Engines + Custom SLA",
    summary:
      "For enterprise revenue teams, vertical software platforms, and PE portfolio ops requiring direct warehouse sync across all 3 Vertical Engines.",
    features: [
      "All 3 Vertical Engines unlocked (Healthcare Clinics + Fleet Risk + Commercial Permits)",
      "Direct Snowflake, BigQuery, AWS RDS, or dedicated single-tenant Supabase VPC sync",
      "10,000 unique company contact unlocks/month with bulk Catch-All SMTP verification",
      "100% human-reviewed exception QA queue for complex holding-company hierarchies",
      "Custom Data Processing Agreement (DPA), CCPA/DROP opt-out sync, and audit logs",
      "99.5% uptime SLA + 1-business-day data defect remediation guarantee",
    ],
    ctaLabel: "Scope Enterprise Warehouse Sync",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header — buildaba.com left-aligned calm editorial style */}
        <div className="mb-14 pb-10 border-b border-black/10 max-w-3xl">
          <p className="text-xs font-medium text-[#6b665e] mb-3">
            Pre-Cleaned Vertical Engines · Transparent Commercial Ladder
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif tracking-tight leading-[1.08] text-[#141413] font-medium mb-4">
            Start on a corporate card. Scale when your reps book meetings.
          </h1>
          <p className="text-base sm:text-lg text-[#5c5852] leading-relaxed">
            Because our three vertical engines and shared SAM.gov + DOL Form 5500 corporate backbone
            are already pre-cleaned, you do not wait 60 days for custom scrapers. Start with a
            7-day Territory Whitespace Pilot for $1,950, or plug straight into our self-serve API or
            managed CRM deployment.
          </p>
        </div>

        {/* Wedge Offer (Top Banner): The 7-Day Territory & CRM Whitespace Pilot — $1,950 One-Time */}
        <div className="bg-white border border-black/12 rounded-2xl p-7 sm:p-10 mb-14 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-7 border-b border-black/10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ecfdf5] text-[#2e6f40] border border-[#a7f3d0] text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Wedge Offer · Fits on a VP&apos;s Corporate Card
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#f0eee6] text-xs font-medium text-[#141413]">
                  100% Credited Toward Tier 2 or Tier 3 Deployment
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
                The 7-Day Territory &amp; CRM Whitespace Pilot
              </h2>
              <p className="text-sm sm:text-base text-[#5c5852] mt-2 max-w-2xl leading-relaxed">
                Send us your current CRM account export. We match it against 1 of our 3 pre-cleaned
                vertical engines and deliver a live sandbox plus a TAM Whitespace Gap Report showing
                every physical facility, fleet, clinic, and active trigger your CRM is missing.
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <div className="text-4xl sm:text-5xl font-serif text-[#141413]">$1,950</div>
              <div className="text-xs text-[#6b665e] mt-1">One-Time · Delivered in 7 Days</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-7 border-b border-black/10">
            {[
              "2,500 net-new or enriched accounts matched against your existing CRM export",
              "5,000 CPA-filtered decision-makers verified to <2% email bounce rate",
              "Active 30/60/90-day forward-looking triggers in a live PowerTable + TAM Whitespace Gap Report",
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
              <strong className="text-[#141413] font-medium">100% Rollover Credit:</strong> Upgrade
              within 30 days and your entire $1,950 pilot fee deducts from Tier 2 ($9,500 → $7,550
              net) or Tier 3 ($18,000 → $16,050 net).
            </div>
            <Link
              href="/hire/apply"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[#141413] text-[#faf9f5] text-sm font-medium hover:bg-[#2a2927] transition-colors inline-flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              Launch 7-Day Pilot ($1,950)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Commercial Tiers — buildaba.com rounded-2xl cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 items-stretch">
          {COMMERCIAL_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`p-7 sm:p-8 rounded-2xl flex flex-col justify-between transition-all ${
                tier.featured
                  ? "bg-[#f0eee6] border border-black/15 shadow-[0_6px_20px_rgba(20,20,19,0.05)]"
                  : "bg-white border border-black/10 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                      tier.featured
                        ? "bg-[#2e6f40] text-white"
                        : "bg-[#f0eee6] text-[#5c5852]"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#141413] mb-2.5">
                  {tier.name}
                </h3>
                <p className="text-sm text-[#5c5852] leading-relaxed mb-6">{tier.summary}</p>

                {/* Dual Price Box: Deployment + Monthly Subscription */}
                <div className="grid grid-cols-2 gap-3 mb-7">
                  <div className="bg-white/90 border border-black/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-[#6b665e] mb-0.5">Deployment</div>
                    <div className="text-xl sm:text-2xl font-serif text-[#141413]">
                      {tier.buildPrice}
                    </div>
                    <div className="text-[11px] text-[#5c5852] mt-1 leading-snug">
                      {tier.buildMeta}
                    </div>
                  </div>
                  <div className="bg-white/90 border border-black/8 rounded-xl p-3.5">
                    <div className="text-[11px] text-[#2e6f40] font-medium mb-0.5">
                      Subscription
                    </div>
                    <div className="text-xl sm:text-2xl font-serif text-[#141413]">
                      {tier.retainerPrice}
                    </div>
                    <div className="text-[11px] text-[#5c5852] mt-1 leading-snug">
                      {tier.retainerMeta}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
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
                  tier.featured
                    ? "bg-[#141413] text-[#faf9f5] hover:bg-[#2a2927] shadow-sm"
                    : "bg-white border border-black/15 text-[#141413] hover:bg-[#f0eee6]"
                }`}
              >
                {tier.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* 3-Box Unit Economics & Anti-Saturation Guardrails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="text-xs font-medium text-[#2e6f40] mb-1.5">
              01 · Why Pre-Cleaned Verticals?
            </div>
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              Fast Delivery, Zero Bespoke Risk
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Instead of charging you to invent brittle scrapers from scratch, we maintain three
              deep vertical engines anchored on federal statutory filings. You get verified rows in
              7 days instead of 60.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="text-xs font-medium text-[#2e6f40] mb-1.5">
              02 · Credit-Metered Contact Unlocks
            </div>
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              Just-In-Time Catch-All Verification
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Every company unlock verifies up to 2 corporate officers in real time through our
              Catch-All SMTP firewall, guaranteeing &lt;2% bounce rate and blocking bulk database
              resale.
            </p>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="text-xs font-medium text-[#2e6f40] mb-1.5">
              03 · Compliance &amp; Privacy Built In
            </div>
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              CCPA/DROP, CAN-SPAM &amp; Non-FCRA
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              All records strictly cover B2B corporate officers and statutory public filings. We
              enforce automated opt-out suppression and non-destructive CRM field ownership rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

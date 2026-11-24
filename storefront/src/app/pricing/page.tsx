import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Vertical Database & CRM Deployment Pricing — Sales Autonomy",
  description:
    "Start with a 7-day Territory & CRM Whitespace Pilot for $1,950. Deploy our pre-cleaned vertical market engines into HubSpot, Salesforce, Clay, or your private warehouse.",
};

const COMMERCIAL_TIERS = [
  {
    badge: "TIER 1 · SELF-SERVE & CLAY AGENCIES",
    name: "PowerTable & Credit-Metered API Plan",
    buildPrice: "$0 Setup",
    buildMeta: "Pre-Cleaned Engine Ready Day 1",
    retainerPrice: "$799/mo",
    retainerMeta: "Paid Quarterly ($2,397 / Quarter)",
    summary:
      "For smaller GTM teams and Clay outbound agencies that want direct UI search, weekly delta webhooks, and metered contact unlocks across 1 Vertical Engine.",
    features: [
      "Full PowerTable UI search across 1 Pre-Cleaned Vertical Engine",
      "1,250 unique company contact unlocks/month (~2,500 verified buyers)",
      "Shared SAM.gov (700K domains) + DOL Form 5500 (650K EINs) corporate backbone",
      "50-keyword CPA/registered-agent filter + <2% bounce Just-In-Time verification",
      "Weekly delta CSV/Parquet digest + outbound webhook feed",
      "Read-only REST API & MCP server for Clay and internal agents",
    ],
    ctaLabel: "Start Tier 1 Quarterly Plan →",
  },
  {
    badge: "TIER 2 · MOST POPULAR (MID-MARKET GTM TEAMS)",
    name: "Managed CRM Deployment & Signal Sync",
    buildPrice: "$9,500",
    buildMeta: "One-Time Deployment ($7,550 Net After $1,950 Pilot Credit)",
    retainerPrice: "$1,950/mo",
    retainerMeta: "Ongoing Signal & Decay Sync",
    summary:
      "For 5–50 rep GTM teams that want a full national vertical database wired bi-directionally into HubSpot, Salesforce, or Clay with automated SDR routing.",
    featured: true,
    features: [
      "Full national vertical database deployed & synced bi-directionally to HubSpot, Salesforce, or Clay",
      "3,500 unique company contact unlocks/month (~7,000 verified decision-makers)",
      "Custom ICP win-rate scoring + daily exponential signal decay (pg_cron half-life math)",
      "Forward-looking 30/60/90d triggers (BMC-35 cancellations, OSHA open inspections, SAM expirations) routed to SDR queues",
      "Continuous 3%/mo contact-decay replacement & champion job-change alerts",
      "Non-destructive CRM write lock: fills gaps and never overwrites rep-owned notes",
    ],
    ctaLabel: "Start With $1,950 Territory Pilot →",
  },
  {
    badge: "TIER 3 · ENTERPRISE / MULTI-ENGINE VAULT",
    name: "Private Warehouse & All-3-Engines Vault",
    buildPrice: "$18,000",
    buildMeta: "One-Time Deployment ($16,050 Net After Pilot Credit)",
    retainerPrice: "$3,950/mo",
    retainerMeta: "All 3 Vertical Engines + Custom SLA",
    summary:
      "For enterprise revenue teams, vertical software platforms, and PE portfolio ops requiring direct warehouse sync across all 3 Vertical Engines.",
    features: [
      "All 3 Vertical Engines unlocked (Healthcare Clinics + Industrial/Fleet Risk + Public Sector/Permits)",
      "Direct Snowflake, BigQuery, AWS RDS, or dedicated single-tenant Supabase VPC sync",
      "10,000 unique company contact unlocks/month with bulk Catch-All SMTP verification",
      "100% human-reviewed exception QA queue for complex holding-company hierarchies",
      "Custom Data Processing Agreement (DPA), CCPA/DROP opt-out sync, and audit logs",
      "99.5% uptime SLA + 1-business-day data defect remediation guarantee",
    ],
    ctaLabel: "Scope Enterprise Warehouse Sync →",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 border-b border-black/10 pb-12">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#d9534f] mb-4">
            PRE-CLEANED VERTICAL ENGINES · TRANSPARENT COMMERCIAL LADDER
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.02] text-[#111111] max-w-4xl">
            Start on a corporate card.{" "}
            <span className="italic font-light text-[#111111]/70">
              Scale when your reps book meetings.
            </span>
          </h1>
          <p className="text-xl font-serif text-[#111111]/70 max-w-3xl mt-6 leading-relaxed">
            Because our three vertical engines and shared SAM.gov + DOL Form 5500 corporate backbone are already pre-cleaned, you do not wait 60 days for custom scrapers. Start with a 7-day Territory Whitespace Pilot for $1,950, or plug straight into our self-serve API or managed CRM deployment.
          </p>
        </div>

        {/* Wedge Offer (Top Banner): The 7-Day Territory & CRM Whitespace Pilot — $1,950 One-Time */}
        <div className="bg-white border-2 border-[#111111] p-8 md:p-12 mb-16 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3 py-1 bg-[#d9534f] text-white text-[10px] font-bold tracking-[0.18em] uppercase">
                  WEDGE OFFER · FITS ON A VP&apos;S CORPORATE CARD
                </span>
                <span className="px-3 py-1 bg-[#f5f4ef] border border-black/15 text-[10px] font-bold uppercase tracking-widest text-[#111111]">
                  100% Credited Toward Tier 2 or Tier 3 Deployment
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#111111]">
                The 7-Day Territory &amp; CRM Whitespace Pilot
              </h2>
              <p className="text-base text-[#111111]/70 font-light mt-2 max-w-2xl leading-relaxed">
                Send us your current CRM account export. We match it against 1 of our 3 pre-cleaned vertical engines and deliver a live sandbox plus a TAM Whitespace Gap Report showing every physical facility, fleet, clinic, and active trigger your CRM is missing.
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <div className="text-4xl md:text-5xl font-serif text-[#111111]">$1,950</div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/55 mt-1">
                One-Time • Delivered in 7 Days
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-black/10">
            {[
              "2,500 net-new or enriched accounts matched against your existing CRM export",
              "5,000 CPA-filtered decision-makers verified to <2% email bounce rate",
              "Active 30/60/90-day forward-looking triggers in a live PowerTable + TAM Whitespace Gap Report",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 text-sm text-[#111111]/85 leading-relaxed"
              >
                <Check className="w-4 h-4 text-[#d9534f] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-[#111111]/65">
              <strong>100% Rollover Credit:</strong> Upgrade within 30 days and your entire $1,950 pilot fee deducts from Tier 2 ($9,500 → $7,550 net) or Tier 3 ($18,000 → $16,050 net).
            </div>
            <Link
              href="/hire/apply"
              className="px-7 py-3.5 bg-[#111111] text-[#fcfaf8] text-xs font-bold uppercase tracking-widest hover:bg-[#333333] transition-colors inline-flex items-center justify-center gap-2 shrink-0"
            >
              Launch 7-Day Pilot ($1,950) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Commercial Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-black/10 border border-black/10 mb-16">
          {COMMERCIAL_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`p-8 md:p-10 flex flex-col justify-between ${
                tier.featured ? "bg-white" : "bg-[#fcfaf8]"
              }`}
            >
              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d9534f] mb-3">
                  {tier.badge}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-[#111111] mb-3">
                  {tier.name}
                </h3>
                <p className="text-sm text-[#111111]/65 font-light leading-relaxed mb-8">
                  {tier.summary}
                </p>

                {/* Dual Price Box: Deployment + Monthly Subscription */}
                <div className="grid grid-cols-2 gap-px bg-black/10 border border-black/10 mb-8">
                  <div className="bg-[#f5f4ef] p-4">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/50 mb-1">
                      Deployment
                    </div>
                    <div className="text-2xl md:text-3xl font-serif text-[#111111]">
                      {tier.buildPrice}
                    </div>
                    <div className="text-[11px] text-[#111111]/60 mt-1 leading-snug">
                      {tier.buildMeta}
                    </div>
                  </div>
                  <div className="bg-[#f5f4ef] p-4">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#d9534f] font-medium mb-1">
                      Subscription
                    </div>
                    <div className="text-2xl md:text-3xl font-serif text-[#111111]">
                      {tier.retainerPrice}
                    </div>
                    <div className="text-[11px] text-[#111111]/60 mt-1 leading-snug">
                      {tier.retainerMeta}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3.5 mb-10">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-[#111111]/80 font-light leading-relaxed"
                    >
                      <Check className="w-4 h-4 text-[#d9534f] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/hire/apply"
                className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest text-center transition-colors ${
                  tier.featured
                    ? "bg-[#111111] text-white hover:bg-[#333333]"
                    : "border border-black/20 text-[#111111] hover:border-black hover:bg-black/5"
                }`}
              >
                {tier.ctaLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* 3-Box Unit Economics & Anti-Saturation Guardrails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
          <div className="bg-[#fcfaf8] p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              01 · Why Pre-Cleaned Verticals?
            </div>
            <h3 className="text-xl font-serif text-[#111111] mb-2">
              Fast Delivery, Zero Bespoke Risk
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Instead of charging you to invent brittle scrapers from scratch, we maintain three deep vertical engines anchored on federal statutory filings. You get verified rows in 7 days instead of 60.
            </p>
          </div>
          <div className="bg-[#fcfaf8] p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              02 · Credit-Metered Contact Unlocks
            </div>
            <h3 className="text-xl font-serif text-[#111111] mb-2">
              Just-In-Time Catch-All Verification
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Every company unlock verifies up to 2 corporate officers in real time through our Catch-All SMTP firewall, guaranteeing &lt;2% bounce rate and blocking bulk database resale.
            </p>
          </div>
          <div className="bg-[#fcfaf8] p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              03 · Compliance &amp; Privacy Built In
            </div>
            <h3 className="text-xl font-serif text-[#111111] mb-2">
              CCPA/DROP, CAN-SPAM &amp; Non-FCRA
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              All records strictly cover B2B corporate officers and statutory public filings. We enforce automated opt-out suppression and non-destructive CRM field ownership rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

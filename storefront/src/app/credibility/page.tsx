import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Verify Data — Sales Autonomy",
  description:
    "Every cell in your vertical database carries a SHA-256 receipt, an atomic source-hierarchy lock, a 50-keyword CPA filter, and <2% bounce Just-In-Time verification.",
};

export default function CredibilityPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24">
      {/* Hero — buildaba.com left-aligned calm editorial style */}
      <section className="max-w-6xl mx-auto px-6 pb-16 border-b border-black/10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#6b665e] mb-4">
            Red-Team-Audited Data Engineering &amp; Provenance Spec
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif tracking-tight leading-[1.08] text-[#141413] font-medium mb-5">
            Guarded in Postgres, never in a prompt.
          </h1>
          <p className="text-base sm:text-lg text-[#5c5852] leading-relaxed">
            When an SDR calls an outside CPA by mistake or quotes a stale insurance policy date,
            trust in your CRM dies. Here are the exact code gates that keep our three vertical
            engines accurate, cited, and legally compliant.
          </p>
        </div>
      </section>

      {/* Section 1: 3 Verification Gates */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-black/10">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-medium text-[#6b665e] mb-2">
            01 · Three Code Gates Before Any Row Enters Your Vault
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
            Atomic authority locks. SHA-256 receipts. Zero CPA noise.
          </h2>
          <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
            Every record across our Healthcare, Industrial/Fleet, and Commercial Permit engines
            passes three deterministic Postgres and DuckDB checks before it reaches your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
              Gate 1 · fn_provenance_update Lock
            </div>
            <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
              5-Tier Source Authority Hierarchy
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Our Postgres trigger <code className="font-mono text-[#141413]">fn_provenance_update</code>{" "}
              ranks every source from Tier 1 (Federal Statutory: SAM.gov, DOL Form 5500, FMCSA, CMS,
              OSHA, EPA) down to Tier 5 (Web). A lower-tier scrape can never overwrite a higher-tier
              filing.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
              Gate 2 · 50-Keyword CPA Filter
            </div>
            <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
              Strips Third-Party Preparers
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Raw Form 5500 and SAM.gov filings often list outside accountants, law firms, or
              registered agents. Our 50-keyword filter (
              <code className="font-mono text-[#141413]">
                CPA, LLP, Tax, Advisory, Registered Agent
              </code>
              ) quarantines third-party signers before contact enrichment.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
              Gate 3 · DuckDB SHA-256 Receipts
            </div>
            <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
              Verbatim Proof &amp; Estimate Flags
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Every cell links to a{" "}
              <code className="font-mono text-[#141413]">sources_provenance</code> row storing the
              SHA-256 payload hash, capture timestamp, verbatim excerpt, and{" "}
              <code className="font-mono text-[#141413]">is_estimate</code> flag. Undisclosed fields
              stay <code className="font-mono text-[#141413]">unknown</code>—never guessed.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Forward-Looking Trigger Math & Hybrid JIT Contact Verification */}
      <section className="py-20 border-b border-black/10 bg-[#f0eee6]/55">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              02 · Forward-Looking Signals &amp; Just-In-Time Verification
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Catch buyers 30 to 90 days before the deadline.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Backward-looking press releases arrive too late. We engineer forward-looking statutory
              windows and verify decision-maker emails at the exact moment of unlock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="text-xs font-medium text-[#6b665e] mb-2">FMCSA &amp; SAM.gov Math</div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
                30/60/90-Day Renewal Horizons
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                We capture Form BMC-35 30-day insurance cancellation notices, calculate 60/90-day
                Form BMC-91X policy anniversary renewals, and track daily SAM.gov{" "}
                <code className="font-mono text-[#141413]">registrationExpirationDate</code>{" "}
                countdowns alongside active USAspending contracts.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="text-xs font-medium text-[#6b665e] mb-2">
                OSHA, EPA &amp; CMS Windows
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
                Open Inspections &amp; Abatement
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                Instead of waiting months for closed citations, we flag newly opened Federal OSHA
                inspections (<code className="font-mono text-[#141413]">OPEN_DATE</code>), 30–90 day
                machine-guarding abatement windows, Repeat-Violation Ex-Mod risk, and 45-day CMS
                F-tag Plans of Correction.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="text-xs font-medium text-[#6b665e] mb-2">
                Hybrid Just-In-Time Waterfall
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
                &lt; 2% Email Bounce SLA
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                Pre-verifying millions of emails wastes money and goes stale in 30 days. We pre-map
                corporate officers from Form 5500, NPPES, and SAM.gov, then fire real-time Catch-All
                SMTP verification at the moment of unlock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 4 Delivery Outputs & Compliance Guardrails */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              03 · Four Delivery Outputs &amp; Privacy Guardrails
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-4">
              Isolated vaults. Safe CRM writes. Full regulatory compliance.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed mb-6">
              Every client receives four synchronized outputs backed by strict CRM governance and
              statutory B2B privacy compliance:
            </p>
            <ul className="space-y-3 text-sm text-[#141413]">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium">4 Standardized Delivery Outputs:</strong> Weekly
                  Digest CSV/Parquet, isolated Supabase RLS View, bi-directional CRM/Clay Webhook,
                  and read-only REST/MCP API
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium">Never overwrites rep notes:</strong>{" "}
                  Non-destructive CRM sync fills blank fields and writes dated Signal records
                  without touching human-edited fields
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium">Daily pg_cron Half-Life Decay:</strong> Signals
                  decay via <code className="font-mono">W(t) = W0 * 0.5^(t/half_life)</code> so cold
                  accounts drop out of SDR queues automatically
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium">CCPA/DROP, CAN-SPAM &amp; Non-FCRA:</strong>{" "}
                  Strictly B2B corporate records with automated opt-out suppression and immutable
                  audit logs
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 sm:p-9 space-y-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              Audit Us Against Your CRM First
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
              Test our data on 2,500 accounts in your territory in 7 days for $1,950.
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Send us your current CRM export. We match it against one of our three vertical engines
              and deliver 2,500 net-new/enriched accounts, 5,000 verified contacts, active
              30/60/90-day triggers, and a TAM Whitespace Gap Report—with 100% of your $1,950
              credited toward full deployment.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/hire/apply"
                className="min-h-[46px] px-5 py-3 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Start $1,950 Territory Pilot
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portal/demo"
                className="min-h-[46px] px-5 py-3 rounded-xl bg-white border border-black/15 hover:bg-[#f0eee6] text-[#141413] text-sm font-medium flex items-center justify-center transition-colors"
              >
                Open PowerTable Explorer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Verify Data — Sales Autonomy",
  description:
    "Every cell in your vertical database carries a SHA-256 receipt, an atomic source-hierarchy lock, a 50-keyword CPA filter, and <2% bounce Just-In-Time verification.",
};

export default function CredibilityPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20 border-b border-black/10">
        <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-4">
          Red-Team-Audited Data Engineering &amp; Provenance Spec
        </div>
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.05] text-[#111111] mb-8">
          Guarded in Postgres,{" "}
          <span className="italic font-light text-[#111111]/65">
            never in a prompt.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[#111111]/70 font-light leading-relaxed max-w-3xl">
          When an SDR calls an outside CPA by mistake or quotes a stale insurance policy date, trust in your CRM dies. Here are the exact code gates that keep our three vertical engines accurate, cited, and legally compliant.
        </p>
      </section>

      {/* Section 1: 3 Verification Gates */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-black/10">
        <div className="mb-14 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium mb-3">
            01 · Three Code Gates Before Any Row Enters Your Vault
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-4">
            Atomic authority locks. SHA-256 receipts. Zero CPA noise.
          </h2>
          <p className="text-lg text-[#111111]/65 font-light leading-relaxed">
            Every record across our Healthcare, Industrial/Fleet, and Public Sector engines must pass three deterministic Postgres and DuckDB checks before it reaches your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
          <div className="bg-[#fcfaf8] p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
              Gate 1 · fn_provenance_update Lock
            </div>
            <h3 className="text-2xl font-serif text-[#111111] mb-3">
              5-Tier Source Authority Hierarchy
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Our Postgres trigger <code className="font-mono">fn_provenance_update</code> ranks every source from Tier 1 (Federal Statutory: SAM.gov, DOL Form 5500, FMCSA, CMS, OSHA, EPA) down to Tier 5 (Web). A lower-tier scrape can never overwrite a higher-tier filing.
            </p>
          </div>

          <div className="bg-[#fcfaf8] p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
              Gate 2 · 50-Keyword CPA &amp; Agent Filter
            </div>
            <h3 className="text-2xl font-serif text-[#111111] mb-3">
              Strips Third-Party Preparers
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Raw Form 5500 and SAM.gov filings often list outside accountants, law firms, or registered agents. Our 50-keyword filter (<code className="font-mono">CPA, LLP, Tax, Advisory, Registered Agent, Benefits Admin</code>) quarantined third-party signers before contact enrichment.
            </p>
          </div>

          <div className="bg-[#fcfaf8] p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
              Gate 3 · DuckDB SHA-256 Receipts
            </div>
            <h3 className="text-2xl font-serif text-[#111111] mb-3">
              Verbatim Proof &amp; Estimate Flags
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Every cell links to a <code className="font-mono">sources_provenance</code> row storing the SHA-256 payload hash, capture timestamp, verbatim excerpt, and <code className="font-mono">is_estimate</code> flag. Undisclosed fields stay <code className="font-mono">unknown</code>—never guessed.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Forward-Looking Trigger Math & Hybrid JIT Contact Verification */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-black/10 bg-[#f5f4ef]/60">
        <div className="mb-14 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
            02 · Forward-Looking Signals &amp; Just-In-Time Verification
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-4">
            Catch buyers 30 to 90 days before the deadline.
          </h2>
          <p className="text-lg text-[#111111]/65 font-light leading-relaxed">
            Backward-looking press releases arrive too late. We engineer forward-looking statutory windows and verify decision-maker emails at the exact moment of unlock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
          <div className="bg-white p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium mb-3">
              FMCSA &amp; SAM.gov Math
            </div>
            <h3 className="text-2xl font-serif text-[#111111] mb-3">
              30/60/90-Day Renewal Horizons
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              We capture Form BMC-35 30-day insurance cancellation notices, calculate 60/90-day Form BMC-91X policy anniversary renewals, and track daily SAM.gov <code className="font-mono">registrationExpirationDate</code> countdowns alongside active USAspending contracts.
            </p>
          </div>

          <div className="bg-white p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium mb-3">
              OSHA, EPA &amp; CMS Windows
            </div>
            <h3 className="text-2xl font-serif text-[#111111] mb-3">
              Open Inspections &amp; Abatement
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Instead of waiting months for closed citations, we flag newly opened Federal OSHA inspections (<code className="font-mono">OPEN_DATE</code>), 30–90 day machine-guarding abatement windows, Repeat-Violation Ex-Mod risk, and 45-day CMS F-tag Plans of Correction.
            </p>
          </div>

          <div className="bg-white p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium mb-3">
              Hybrid Just-In-Time Waterfall
            </div>
            <h3 className="text-2xl font-serif text-[#111111] mb-3">
              &lt; 2% Email Bounce SLA
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Pre-verifying millions of emails wastes money and goes stale in 30 days. We pre-map corporate officers from Form 5500, NPPES, and SAM.gov, then fire real-time Catch-All SMTP verification at the moment of unlock.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 4 Delivery Outputs & Compliance Guardrails */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
              03 · Four Delivery Outputs &amp; Privacy Guardrails
            </div>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-6">
              Isolated vaults. Safe CRM writes. Full regulatory compliance.
            </h2>
            <p className="text-lg text-[#111111]/65 font-light leading-relaxed mb-6">
              Every client receives four synchronized outputs backed by strict CRM governance and statutory B2B privacy compliance:
            </p>
            <ul className="space-y-3 text-sm text-[#111111]/80 font-light">
              <li className="flex items-start gap-3">
                <span className="text-[#d9534f] font-medium">✓</span>
                <span>
                  <strong>4 Standardized Delivery Outputs:</strong> Weekly Digest CSV/Parquet, isolated Supabase RLS View, bi-directional CRM/Clay Webhook, and read-only REST/MCP API
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d9534f] font-medium">✓</span>
                <span>
                  <strong>Never overwrites rep notes:</strong> Non-destructive CRM sync fills blank fields and writes dated Signal records without touching human-edited fields
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d9534f] font-medium">✓</span>
                <span>
                  <strong>Daily pg_cron Half-Life Decay:</strong> Signals decay via <code className="font-mono">W(t) = W0 * 0.5^(t/half_life)</code> so cold accounts drop out of SDR queues automatically
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d9534f] font-medium">✓</span>
                <span>
                  <strong>CCPA/DROP, CAN-SPAM &amp; Non-FCRA:</strong> Strictly B2B corporate records with automated opt-out suppression and immutable audit logs
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-black/10 p-8 md:p-10 space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium">
              Audit Us Against Your CRM First
            </div>
            <h3 className="text-3xl font-serif text-[#111111]">
              Test our data on 2,500 accounts in your territory in 7 days for $1,950.
            </h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Send us your current CRM export. We match it against one of our three vertical engines and deliver 2,500 net-new/enriched accounts, 5,000 verified contacts, active 30/60/90-day triggers, and a TAM Whitespace Gap Report—with 100% of your $1,950 credited toward full deployment.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/hire/apply"
                className="px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.15em] font-medium text-center transition-colors"
              >
                Start $1,950 Territory Pilot →
              </Link>
              <Link
                href="/portal/demo"
                className="px-6 py-3.5 border border-black/20 hover:border-black text-[#111111] text-xs uppercase tracking-[0.15em] font-medium text-center transition-colors"
              >
                Open PowerTable Explorer →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

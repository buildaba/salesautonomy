import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Accuracy, GAO/OIG Audits & Legal Compliance — Sales Autonomy",
  description:
    "Raw government datasets have a 40%–48% error rate on self-reported fields. See how our 4-Gate Corroboration Engine and 15-Agency Federal Graph turn noisy filings into verified B2B intelligence.",
};

const GAO_OIG_AUDIT_TABLE = [
  {
    agency: "CMS NPPES & Care Compare",
    auditFinding:
      "HHS-OIG Audits (OEI-07-11-00570 & A-09-20-02007) found 48% of sampled NPPES provider addresses/phones were inaccurate and 67% of nursing facilities had deficiency reporting gaps.",
    whatRots:
      "Self-reported practice mailing addresses, stale phones, and outsourced billing/credentialing vendors listed as contacts.",
    whatWeTrust:
      "New Type-2 Org NPI enumeration timestamps + FDA 510(k) clearance letters + HHS OIG LEIE exclusions corroborated against the clinic's live website DOM today.",
  },
  {
    agency: "DOL Form 5500 & H-1B LCA",
    auditFinding:
      "DOL-OIG & GAO Audits found a 7 to 9.5 month filing lag on Form 5500 plus 41% schedule inconsistencies, PEO/trust obfuscation, and third-party TPA/CPA signers.",
    whatRots:
      "Raw plan contact phone numbers, holding-trust names, and uncorroborated single-year headcounts.",
    whatWeTrust:
      "9-Digit IRS EIN + CPA-Audited Schedule H (mandatory for 100+ employees under ERISA) cross-validated with zero-lag pre-hire DOL H-1B LCA workforce filings.",
  },
  {
    agency: "U.S. DOT FMCSA (MCS-150 vs. L&I)",
    auditFinding:
      "National Academy of Sciences & DOT-OIG found MCS-150 Census truck counts and emails are self-reported every 24 months and polluted by permit-runner Gmail accounts.",
    whatRots:
      "Self-reported biennial MCS-150 vehicle estimates, permit-agency emails, and stale 'Active' flags on defunct 1-truck carriers.",
    whatWeTrust:
      "Form BMC-35 & BMC-91X filed directly by the insurance underwriter ($1M+ legal liability until 30 days after filing) + active highway weigh-station inspections on 15–250+ truck fleets.",
  },
  {
    agency: "SAM.gov & USAspending",
    auditFinding:
      "GAO procurement audits flagged virtual-office addresses, registered agents, and inactive shell registrants in unvalidated SAM profiles.",
    whatRots:
      "Self-reported size declarations, registered-agent mailing addresses, and dormant registrations with zero award history.",
    whatWeTrust:
      "12-Char UEI + 700K native entityUrl domains + registrationExpirationDate countdowns strictly paired with active Treasury USAspending obligated contract dollars (where EFT payments freeze if SAM lapses).",
  },
  {
    agency: "OSHA, EPA, SBA & Permits",
    auditFinding:
      "Municipal permit and SBA loan filings frequently list single-purpose real estate holding LLCs ('1200 Main St LLC') or permit expediters instead of the operating business.",
    whatRots:
      "Raw permit 'Owner' shell LLC names and third-party architect/expediter phone numbers.",
    whatWeTrust:
      "Federal OSHA Inspector physical OPEN_DATE + Bank-underwritten SBA 504 approvals + State-licensed General Contractors cross-walked by physical parcel address to the operating corporate tenant.",
  },
];

export default function CredibilityPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pb-16 border-b border-black/10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#2e6f40] mb-3">
            GAO &amp; OIG Audit-Hardened Data Engineering · 4-Gate Corroboration · 2026 Compliant
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif tracking-tight leading-[1.08] text-[#141413] font-medium mb-5">
            Raw government data is 48% broken. Here is how we fix it.
          </h1>
          <p className="text-base sm:text-lg text-[#5c5852] leading-relaxed">
            Anyone can download a public government CSV. Federal Inspector General (OIG) and GAO
            audits prove that raw self-reported government files are riddled with 9-month lags,
            real-estate shell LLCs, outside CPAs, and stale addresses. We never ship raw government
            rows—we isolate <strong>payment-, underwriter-, and inspector-enforced events</strong>{" "}
            and corroborate every account across 15 federal feeds and a live DNS/SMTP heartbeat.
          </p>
        </div>
      </section>

      {/* Section 1: The GAO & OIG Federal Audit Reality Matrix */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-black/10">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-medium text-[#2e6f40] mb-2">
            01 · The Federal Watchdog Audit Matrix (GAO &amp; OIG Findings)
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
            We separate self-reported census garbage from liability-backed truth.
          </h2>
          <p className="text-base text-[#5c5852] leading-relaxed">
            Inside every federal agency, there are two completely different classes of data: fields
            a company casually self-reports once every two years, and fields enforced by an
            insurance underwriter, a bank, a field inspector, or a Treasury payment block.
          </p>
        </div>

        <div className="space-y-4">
          {GAO_OIG_AUDIT_TABLE.map((row) => (
            <div
              key={row.agency}
              className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-black/8">
                <h3 className="text-xl font-serif font-medium text-[#141413]">{row.agency}</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#faf9f5] border border-black/10 text-xs text-[#5c5852]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#d97706]" />
                  {row.auditFinding}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#faf9f5] border border-black/8">
                  <div className="text-xs font-medium text-[#6b665e] mb-1">
                    What Rots in the Raw Government File (Quarantined)
                  </div>
                  <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                    {row.whatRots}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#ecfdf5]/60 border border-[#a7f3d0]">
                  <div className="text-xs font-medium text-[#2e6f40] mb-1">
                    What Our Engine Trusts &amp; Cross-Validates (Ground Truth)
                  </div>
                  <p className="text-xs sm:text-sm text-[#141413] leading-relaxed">
                    {row.whatWeTrust}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: The 4 Corroboration Gates */}
      <section className="py-20 bg-[#f0eee6]/55 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              02 · Four Deterministic Code Gates Before Any Row Ships
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              How we turn noisy government filings into &lt;2% bounce intelligence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Gate 1 · Friction-Gated Events Only
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
                Underwriter, Inspector, Bank, or Payment Friction
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                We only trigger outreach when an independent third party enforces the event: an
                insurance underwriter files a 30-day Form BMC-35 cancellation, an OSHA inspector
                walks into a plant, the FDA clears a 510(k) device, a bank underwrites an SBA 504
                loan, or a city issues a &gt;$250K commercial building permit.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Gate 2 · Multi-Agency Triangulation (2+ Agencies)
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
                Defeats the 9-Month Form 5500 Lag
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                No account enters our active queue from a single lagged dataset. An annual DOL Form
                5500 EIN spine must be corroborated by at least one fresh operational signal (such
                as a new NPI-2 clinic registration, H-1B LCA hiring filing, SEC Form D financing,
                FMCSA policy event, or municipal permit).
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Gate 3 · Shell-LLC, PEO &amp; 55-Keyword CPA Filter
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
                Unmasks Real Operating Tenants &amp; Executives
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                We separate the filing&apos;s Registered Agent, Outside CPA, Permit Expediter, or
                Real Estate Holding LLC from the actual operating business. Our 55-keyword exclusion
                gate quarantines third-party preparers so your reps only call internal CFOs, COOs,
                Safety Directors, and Managing Partners.
              </p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-md mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Gate 4 · Live Digital Heartbeat &amp; Just-In-Time SMTP
              </div>
              <h3 className="text-xl font-serif font-medium text-[#141413] mb-2">
                Proves the Business &amp; Inbox Are Alive Today
              </h3>
              <p className="text-sm text-[#5c5852] leading-relaxed">
                Government records prove what was filed; our live digital check proves the business
                operates today. Every domain must pass a 4-guard DNS/MX mail-server check and
                140-domain directory blocklist, and every executive inbox passes a Just-In-Time
                Catch-All SMTP handshake (&lt;2.0% bounce SLA).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Legal, Privacy & Non-FCRA Compliance Architecture */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              03 · 2026 Regulatory &amp; Privacy Compliance Built Into Postgres
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-4">
              Public-domain provenance. CPPA DROP ready. Strictly Non-FCRA.
            </h2>
            <p className="text-base text-[#5c5852] leading-relaxed mb-6">
              Our legal and privacy guardrails are enforced at the database index level across every
              UI view, CSV export, CRM webhook, and MCP/Grokbot tool call:
            </p>
            <ul className="space-y-3.5 text-sm text-[#141413]">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong>17 U.S.C. § 105 &amp; OPEN Government Data Act:</strong> All 15 government
                  feeds are ingested via official public APIs and bulk downloads with immutable
                  SHA-256 receipts and zero CAPTCHA/paywall circumvention.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong>Field-Level CCPA / CPPA DROP Separation:</strong> We distinguish exempt
                  government-record fields (<code className="font-mono text-xs">Cal. Civ. Code § 1798.140(v)(2)</code>)
                  from appended work emails, and enforce global{" "}
                  <code className="font-mono text-xs">suppressed_opt_out = FALSE</code> filtering
                  plus{" "}
                  <Link
                    href="/privacy#opt-out"
                    className="text-[#2e6f40] underline underline-offset-4"
                  >
                    one-click self-serve suppression
                  </Link>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                <span>
                  <strong>Corporate Entities Only (Strict Non-FCRA &amp; Zero PHI):</strong> We
                  index corporate organizations (<code className="font-mono text-xs">NPI-2</code>{" "}
                  clinic groups, 15–250+ truck fleets, commercial LLCs/Inc.)—never consumer credit
                  profiles, patient PHI, or 1-truck sole proprietors.
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 bg-[#f0eee6] border border-black/12 rounded-2xl p-8 space-y-5">
            <div className="text-xs font-medium text-[#2e6f40]">
              Audit Our 4-Gate Pipeline Against Your CRM
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
              Test 2,500 corroborated accounts in your territory in 7 days for $1,950.
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Send us your current CRM export. We deliver 2,500 multi-agency corroborated accounts,
              5,000 CPA-filtered decision-makers verified to &lt;2% bounce, and a TAM Whitespace Gap
              Report—with 100% credited toward full deployment.
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
                Browse 76+ Live Stacked Signals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

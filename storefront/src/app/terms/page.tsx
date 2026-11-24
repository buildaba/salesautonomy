import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="pb-10 mb-10 border-b border-black/10">
          <p className="text-xs font-medium text-[#2e6f40] mb-3">
            Commercial Licensing Terms · Strict Non-FCRA Covenant · Public-Record Attribution
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-[#141413] mb-3">
            Terms of Service &amp; Data License Agreement
          </h1>
          <p className="text-sm text-[#6b665e]">Last Updated: November 24, 2026</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              1. Scope of Service &amp; B2B Territory License
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Sales Autonomy (&ldquo;Provider&rdquo;) grants Customer a limited, non-exclusive,
              non-transferable, credit-metered license to access our 15-Agency Federal Statutory
              Graph, Vertical Market Packs, PowerTable UI, CRM Webhooks, REST API (
              <code className="font-mono text-xs">/api/v1/signals</code>), and Remote MCP Server (
              <code className="font-mono text-xs">/api/mcp</code>) solely for Customer&apos;s
              internal B2B sales, marketing, and revenue operations. Bulk resale, syndication, or
              redistribution of raw or enriched records to third parties is strictly prohibited.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              2. Strict Non-FCRA Notice &amp; Prohibited Eligibility Uses (15 U.S.C. § 1681)
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Sales Autonomy is <strong>NOT</strong> a &ldquo;Consumer Reporting Agency&rdquo; as
              defined by the Fair Credit Reporting Act (15 U.S.C. § 1681 et seq.) (&ldquo;FCRA&rdquo;),
              and the data, urgency scores, and compliance signals provided do{" "}
              <strong>NOT</strong> constitute &ldquo;Consumer Reports.&rdquo; Customer expressly
              covenants that it will never use any Sales Autonomy data, signal, or score in whole or
              in part as a factor in determining any individual natural person&apos;s or sole
              proprietor&apos;s eligibility for: (a) personal or consumer credit or lending; (b)
              insurance underwriting, pricing, or policy cancellation; (c) employment, hiring, or
              background screening; (d) tenant housing; or (e) any other purpose regulated under the
              FCRA.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              3. Federal &amp; Municipal Public-Record Attribution &amp; Non-Endorsement
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Underlying statutory records are sourced from public U.S. federal and municipal data
              feeds (including GSA SAM.gov, DOL EFAST2 Form 5500, DOL OFLC LCA, CMS NPPES, HHS OIG
              LEIE, CMS QCOR, FDA OpenFDA, U.S. DOT FMCSA, DOL OSHA, U.S. EPA ECHO, FAA, SEC EDGAR,
              SBA, Treasury USAspending, and Municipal Socrata portals) pursuant to 17 U.S.C. § 105
              and the OPEN Government Data Act. Sales Autonomy is an independent commercial entity
              resolving, cross-walking, and enriching public filings; our platform is not affiliated
              with, endorsed by, or sponsored by any federal, state, or municipal government agency.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              4. Outbound Compliance (CAN-SPAM, TCPA &amp; Opt-Out Propagation)
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              When Customer initiates commercial email or telephone outreach using contacts unlocked
              through Sales Autonomy, Customer acts as the independent sender/initiator and is
              solely responsible for complying with the CAN-SPAM Act (15 U.S.C. § 7701), the
              Telephone Consumer Protection Act (47 U.S.C. § 227), and applicable state telemarketing
              laws. Customer agrees not to use automated dialing systems, pre-recorded voice blasts,
              or SMS text messaging to direct-dial numbers without documented prior express consent,
              and agrees to honor all recipient opt-out requests and{" "}
              <Link
                href="/privacy#opt-out"
                className="text-[#2e6f40] font-medium underline underline-offset-4"
              >
                Sales Autonomy suppression flags
              </Link>{" "}
              immediately.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              5. Credit-Metered Agent Firewall, Bounce SLA &amp; Billing
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              API, MCP, and PowerTable unlocks are metered according to Customer&apos;s active tier
              (e.g., 1,250 unique company unlocks/month on Tier 1; 3,500/month on Tier 2). Any
              verified executive email that hard-bounces above our &lt;2.0% contractual SLA is
              automatically replaced 2-for-1 on the next weekly territory sync. The $1,950 7-Day
              Territory Pilot fee is 100% credited toward Tier 2 or Tier 3 deployment when upgraded
              within 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

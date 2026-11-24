export default function AUPPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="pb-10 mb-10 border-b border-black/10">
          <p className="text-xs font-medium text-[#2e6f40] mb-3">
            Acceptable Use Policy · Agent &amp; MCP Rate Limits · Outbound Guardrails
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-[#141413] mb-3">
            Acceptable Use Policy (AUP)
          </h1>
          <p className="text-sm text-[#6b665e]">Last Updated: November 24, 2026</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              1. Prohibited Uses of Government &amp; Corporate Contact Data
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5c5852] leading-relaxed">
              <li>
                Using any record for FCRA-regulated credit, personal insurance underwriting,
                employment background screening, or tenant eligibility decisions.
              </li>
              <li>
                Reselling, sublicensing, or redistributing unlocked contacts to third-party data
                brokers or public repositories.
              </li>
              <li>
                Initiating automated robo-calls, pre-recorded voice drops, or unsolicited SMS text
                blasts in violation of the TCPA (47 U.S.C. § 227).
              </li>
              <li>
                Sending commercial email without a valid physical postal address and a functioning
                one-click unsubscribe link under CAN-SPAM.
              </li>
              <li>
                Contacting any individual or entity after they have opted out or been flagged with{" "}
                <code className="font-mono text-xs text-[#141413]">suppressed_opt_out = TRUE</code>.
              </li>
            </ul>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              2. Autonomous Agent, Grokbot &amp; MCP Rate-Limit Integrity
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Sales Autonomy explicitly supports autonomous agent consumption (including xAI
              Grokbot, Claude MCP, Cursor, and Clay) through our credit-metered endpoints (
              <code className="font-mono text-xs">/api/mcp</code> and{" "}
              <code className="font-mono text-xs">/api/v1/signals</code>). Customers may not rotate
              API keys across multiple organizations, bypass credit-metering firewalls, or run
              denial-of-service scraping loops against our web UI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

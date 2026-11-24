"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Terminal,
  Cpu,
  Code2,
  ShieldCheck,
  Play,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface GrokbotMcpModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEngine: string;
  stateFilter: string;
  urgencyFilter: string;
  searchQuery: string;
  creditsRemaining: number;
}

function mapUiEngineToApiEngine(uiEngine: string): string {
  if (uiEngine === "Healthcare & Clinics") return "HEALTHCARE_NPPES";
  if (uiEngine === "Trucking & Factories") return "INDUSTRIAL_FLEET_OSHA";
  if (uiEngine === "Gov Contractors & Builders") return "PUBLIC_SECTOR_SAM";
  return "ALL";
}

export function GrokbotMcpModal({
  isOpen,
  onClose,
  selectedEngine,
  stateFilter,
  urgencyFilter,
  searchQuery,
  creditsRemaining,
}: GrokbotMcpModalProps) {
  const [activeTab, setActiveTab] = useState<"grokbot" | "mcp" | "rest">("grokbot");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [liveTestOutput, setLiveTestOutput] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3005";

  const apiEngine = mapUiEngineToApiEngine(selectedEngine);
  const queryParams = new URLSearchParams();
  if (apiEngine !== "ALL") queryParams.set("engine", apiEngine);
  if (stateFilter !== "ALL") queryParams.set("state", stateFilter);
  if (urgencyFilter === "0–30 Days") queryParams.set("min_urgency", "80");
  if (searchQuery.trim()) queryParams.set("q", searchQuery.trim());
  queryParams.set("limit", "5");

  const previewApiUrl = `${origin}/api/v1/signals?${queryParams.toString()}`;

  const browserDemoParams = new URLSearchParams();
  if (selectedEngine !== "ALL") browserDemoParams.set("engine", selectedEngine);
  if (stateFilter !== "ALL") browserDemoParams.set("state", stateFilter);
  if (urgencyFilter !== "ALL") browserDemoParams.set("urgency", urgencyFilter);
  if (searchQuery.trim()) browserDemoParams.set("q", searchQuery.trim());
  const deterministicBrowserUrl = `${origin}/sample${
    browserDemoParams.toString() ? `?${browserDemoParams.toString()}` : ""
  }`;

  const grokbotChiefOfStaffPrompt = `You are my Chief-of-Staff Grokbot for outbound revenue.
Every Monday at 6:00 AM:
1. Read the Sales Autonomy machine spec at ${origin}/llms.txt
2. Run a zero-cost territory scan (0 credits) in your cloud terminal:
   curl -s "${previewApiUrl}"
3. Cross-check the returned primary_domain and ein values against our CRM so we skip existing customers and open deals.
4. For the top 5 highest-urgency signals (urgency_score >= 80), call the credit-metered unlock endpoint to get the CPA-filtered decision maker's verified email and statutory SHA-256 citation opener:
   curl -s -X POST "${origin}/api/v1/signals" -H "Content-Type: application/json" -H "x-api-key: sa_pilot_2026_demo" -d '{"action":"unlock_contacts","engine":"${apiEngine === "ALL" ? "INDUSTRIAL_FLEET_OSHA" : apiEngine}","state":"${stateFilter === "ALL" ? "TX" : stateFilter}","limit":5}'
5. Queue the citation-backed first lines for my approval.`;

  const mcpConfigJson = JSON.stringify(
    {
      mcpServers: {
        "sales-autonomy-vault": {
          url: `${origin}/api/mcp`,
          headers: {
            "x-api-key": "sa_pilot_2026_demo",
          },
        },
      },
    },
    null,
    2
  );

  const restUnlockCurl = `curl -s -X POST "${origin}/api/v1/signals" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: sa_pilot_2026_demo" \\
  -d '{
    "action": "unlock_contacts",
    "engine": "${apiEngine === "ALL" ? "HEALTHCARE_NPPES" : apiEngine}",
    "state": "${stateFilter === "ALL" ? "TX" : stateFilter}",
    "limit": 3
  }'`;

  const copyText = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const runLiveEndpointTest = async (mode: "mcp" | "rest_preview" | "rest_unlock") => {
    setIsTesting(true);
    setLiveTestOutput(null);
    try {
      if (mode === "mcp") {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "tools/call",
            params: {
              name: "generate_grokbot_outbound_brief",
              arguments: {
                vertical_engine:
                  apiEngine === "ALL" ? undefined : apiEngine,
                state: stateFilter === "ALL" ? undefined : stateFilter,
                limit: 2,
              },
            },
          }),
        });
        const data = await res.json();
        setLiveTestOutput(JSON.stringify(data, null, 2));
      } else if (mode === "rest_preview") {
        const res = await fetch(`/api/v1/signals?${queryParams.toString()}`);
        const data = await res.json();
        setLiveTestOutput(JSON.stringify(data, null, 2));
      } else {
        const res = await fetch("/api/v1/signals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "sa_pilot_2026_demo",
          },
          body: JSON.stringify({
            action: "unlock_contacts",
            engine: apiEngine === "ALL" ? undefined : apiEngine,
            state: stateFilter === "ALL" ? undefined : stateFilter,
            limit: 2,
          }),
        });
        const data = await res.json();
        setLiveTestOutput(JSON.stringify(data, null, 2));
      }
    } catch (err: unknown) {
      setLiveTestOutput(
        `Error testing endpoint: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[160] flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#faf9f5] text-[#141413] border border-black/12 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-white border-b border-black/10 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ecfdf5] border border-[#a7f3d0] text-[#2e6f40] text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  2026 Autonomous Agent &amp; MCP Gateway
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#f0eee6] text-xs font-medium text-[#141413]">
                  Credit Firewall Active · {creditsRemaining.toLocaleString()} Credits Remaining
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
                Connect Grokbot, Claude MCP, Cursor, or Clay
              </h2>
              <p className="text-xs sm:text-sm text-[#5c5852] mt-1">
                Every command below is pre-scoped to your active table filters (
                <strong className="text-[#141413]">{selectedEngine}</strong> · State:{" "}
                <strong className="text-[#141413]">{stateFilter}</strong>). Discovery scans cost 0
                credits; contact unlocks cost 1 credit per company.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-black/12 bg-[#faf9f5] hover:bg-[#f0eee6] text-[#141413] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 3-Tab Pill Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#f0eee6] border border-black/8 mt-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab("grokbot");
                setLiveTestOutput(null);
              }}
              className={`py-2.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                activeTab === "grokbot"
                  ? "bg-[#141413] text-[#faf9f5] shadow-xs"
                  : "text-[#5c5852] hover:text-[#141413]"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              1. xAI Grokbot (Cloud VM + Routine)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("mcp");
                setLiveTestOutput(null);
              }}
              className={`py-2.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                activeTab === "mcp"
                  ? "bg-[#141413] text-[#faf9f5] shadow-xs"
                  : "text-[#5c5852] hover:text-[#141413]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              2. Remote MCP Server (/api/mcp)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("rest");
                setLiveTestOutput(null);
              }}
              className={`py-2.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                activeTab === "rest"
                  ? "bg-[#141413] text-[#faf9f5] shadow-xs"
                  : "text-[#5c5852] hover:text-[#141413]"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              3. REST API v1 &amp; /llms.txt
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {activeTab === "grokbot" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-black/10 rounded-2xl p-5">
                  <div className="text-xs font-medium text-[#2e6f40] mb-1">
                    Mode A · Grokbot Cloud Computer Terminal
                  </div>
                  <h3 className="text-base font-serif font-medium text-[#141413] mb-1.5">
                    Zero-DOM-Scraping Terminal Skill
                  </h3>
                  <p className="text-xs text-[#5c5852] leading-relaxed">
                    Grokbot runs in a persistent cloud VM with its own terminal. Point your
                    Chief-of-Staff Grokbot at <code className="font-mono">/llms.txt</code> so its
                    specialist SDR bots pull deterministic JSON with SHA-256 filing receipts.
                  </p>
                </div>
                <div className="bg-white border border-black/10 rounded-2xl p-5">
                  <div className="text-xs font-medium text-[#2e6f40] mb-1">
                    Mode B · Grokbot &ldquo;Watch Me Once&rdquo; Browser URL
                  </div>
                  <h3 className="text-base font-serif font-medium text-[#141413] mb-1.5">
                    Deterministic URL-Synced Filter State
                  </h3>
                  <p className="text-xs text-[#5c5852] leading-relaxed mb-2.5">
                    Teaching Grokbot by browser demonstration? Bookmark or navigate directly to this
                    deterministic URL so Grokbot never misses a dropdown click:
                  </p>
                  <div className="flex items-center justify-between gap-2 bg-[#faf9f5] border border-black/10 rounded-xl px-3 py-2">
                    <code className="text-[11px] font-mono text-[#141413] truncate">
                      {deterministicBrowserUrl}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyText("browser-url", deterministicBrowserUrl)}
                      className="text-xs font-medium text-[#2e6f40] hover:underline shrink-0 cursor-pointer"
                    >
                      {copiedId === "browser-url" ? "Copied" : "Copy URL"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Copyable Grokbot Chief-of-Staff Prompt */}
              <div className="bg-white border border-black/10 rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="text-xs font-medium text-[#141413]">
                      Grokbot Chief-of-Staff Autonomous Monday 6:00 AM Routine
                    </div>
                    <p className="text-xs text-[#5c5852]">
                      Paste this prompt into Grokbot to automate weekly territory lead pulls and
                      citation-backed outbound drafting:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText("grokbot-prompt", grokbotChiefOfStaffPrompt)}
                    className="px-3.5 py-2 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === "grokbot-prompt" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#08d6a0]" />
                        Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Grokbot Routine
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#faf9f5] border border-black/10 font-mono text-xs text-[#141413] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {grokbotChiefOfStaffPrompt}
                </pre>
              </div>
            </>
          )}

          {activeTab === "mcp" && (
            <>
              <div className="bg-white border border-black/10 rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="text-xs font-medium text-[#2e6f40]">
                      JSON-RPC 2.0 Streamable HTTP · {origin}/api/mcp
                    </div>
                    <h3 className="text-base font-serif font-medium text-[#141413]">
                      Paste into Claude Desktop, Cursor (.cursor/mcp.json), or Clay MCP
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => runLiveEndpointTest("mcp")}
                      disabled={isTesting}
                      className="px-3.5 py-2 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] hover:bg-[#d1fae5] text-[#2e6f40] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      {isTesting ? "Running MCP Tool..." : "Test Live MCP Tool Call"}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyText("mcp-json", mcpConfigJson)}
                      className="px-3.5 py-2 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedId === "mcp-json" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#08d6a0]" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy MCP Config
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="p-4 rounded-xl bg-[#faf9f5] border border-black/10 font-mono text-xs text-[#141413] overflow-x-auto leading-relaxed">
                  {mcpConfigJson}
                </pre>
              </div>

              {/* 4 MCP Tools Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "search_compliance_signals",
                    cost: "0 Credits (Free Discovery)",
                    desc: "Filter all 66+ live canonical compliance signals by vertical_engine, state, and min_urgency_score.",
                  },
                  {
                    name: "get_entity_compliance_dossier",
                    cost: "0 Credits (Free Provenance)",
                    desc: "Inspect full 6-table entity dossier, physical facilities, and SHA-256 government filing receipts by EIN, NPI, UEI, or USDOT.",
                  },
                  {
                    name: "get_verified_buying_committee",
                    cost: "1 Credit / Entity Unlock",
                    desc: "Unmasks 50-keyword CPA-filtered corporate officers with <2% bounce SLA verification.",
                  },
                  {
                    name: "generate_grokbot_outbound_brief",
                    cost: "1 Credit / Entity Unlock",
                    desc: "Generates turnkey Grokbot / Clay outbound execution briefs with verified emails and statutory citation first lines.",
                  },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-white border border-black/10 rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <code className="text-xs font-mono font-semibold text-[#141413]">
                        {tool.name}
                      </code>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f0eee6] text-[#2e6f40]">
                        {tool.cost}
                      </span>
                    </div>
                    <p className="text-xs text-[#5c5852] leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "rest" && (
            <>
              <div className="bg-white border border-black/10 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-medium text-[#2e6f40]">
                      Credit-Metered Agent Firewall · /api/v1/signals
                    </div>
                    <h3 className="text-base font-serif font-medium text-[#141413]">
                      Separate Zero-Cost Discovery from Credit-Metered Contact Unlocks
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => runLiveEndpointTest("rest_preview")}
                      disabled={isTesting}
                      className="px-3 py-1.5 rounded-xl bg-[#f0eee6] hover:bg-[#e5e2d9] text-[#141413] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-[#2e6f40]" />
                      Test 0-Credit Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => runLiveEndpointTest("rest_unlock")}
                      disabled={isTesting}
                      className="px-3 py-1.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] hover:bg-[#d1fae5] text-[#2e6f40] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Test Credit-Metered Unlock
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-[#5c5852] mb-1.5">
                    <span>1. Zero-Cost Agent Discovery Scan (0 Credits · Emails Masked)</span>
                    <button
                      type="button"
                      onClick={() => copyText("rest-get", `curl -s "${previewApiUrl}"`)}
                      className="text-[#2e6f40] font-medium hover:underline cursor-pointer"
                    >
                      {copiedId === "rest-get" ? "Copied" : "Copy cURL"}
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#faf9f5] border border-black/10 font-mono text-xs text-[#141413] overflow-x-auto">
                    {`curl -s "${previewApiUrl}"`}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-[#5c5852] mb-1.5">
                    <span>
                      2. Credit-Metered Contact Unlock &amp; Outbound Brief (1 Credit / Company)
                    </span>
                    <button
                      type="button"
                      onClick={() => copyText("rest-post", restUnlockCurl)}
                      className="text-[#2e6f40] font-medium hover:underline cursor-pointer"
                    >
                      {copiedId === "rest-post" ? "Copied" : "Copy cURL"}
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#faf9f5] border border-black/10 font-mono text-xs text-[#141413] overflow-x-auto">
                    {restUnlockCurl}
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* Live Test Output Console */}
          {liveTestOutput && (
            <div className="bg-[#141413] text-[#faf9f5] rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#08d6a0]">
                  ● Live Response from Sales Autonomy Vault
                </span>
                <button
                  type="button"
                  onClick={() => setLiveTestOutput(null)}
                  className="text-xs text-[#faf9f5]/70 hover:text-white cursor-pointer"
                >
                  Clear Output
                </button>
              </div>
              <pre className="text-xs font-mono text-[#faf9f5]/90 overflow-x-auto max-h-64 overflow-y-auto leading-relaxed">
                {liveTestOutput}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-black/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-[#5c5852]">
            <span className="inline-flex items-center gap-1.5 text-[#2e6f40] font-medium">
              <ShieldCheck className="w-4 h-4" />
               Protected by Credit-Metered Agent Firewall
            </span>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#141413] font-medium hover:text-[#2e6f40] underline underline-offset-4"
            >
              Open /llms.txt Spec
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#141413] text-[#faf9f5] text-xs font-medium hover:bg-[#2a2927] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

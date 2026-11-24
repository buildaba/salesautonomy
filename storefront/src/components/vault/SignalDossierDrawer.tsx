"use client";

import { useState } from "react";
import { X, Check, ExternalLink, ShieldCheck, Lock, Unlock, Copy, Send } from "lucide-react";

export interface BuyingContact {
  id: string;
  fullName: string;
  title: string;
  roleTier: string;
  sourceOrigin: string;
  cpaFilterStatus: string;
  emailMasked: string;
  emailUnmasked: string;
  phoneMasked: string;
  phoneUnmasked: string;
  verificationMethod: string;
  bounceRisk: string;
}

export interface ProvenanceReceipt {
  fieldName: string;
  fieldValue: string;
  sourceName: string;
  sourceTier: number;
  sourceUrl: string;
  capturedAt: string;
  sha256Hash: string;
  isEstimate: boolean;
  verbatimExcerpt: string;
}

export interface VaultRecord {
  id: string;
  canonicalEntityId: string;
  engine:
    | "Healthcare & Multi-Site Clinic Graph"
    | "Industrial, Fleet & Facility Risk Graph"
    | "Public Sector, Contractors & Permits Graph";
  legalName: string;
  dbaName: string;
  domain: string;
  state: string;
  city: string;
  einOrIdentifier: string;
  verifiedHeadcount: string;
  siteCountOrFleet: string;
  signalType: string;
  signalHeadline: string;
  forwardWindowDays: number;
  urgencyTier: "Immediate (0-30d)" | "High (31-60d)" | "Active (61-90d)";
  initialWeight: number;
  daysElapsed: number;
  halfLifeDays: number;
  currentScore: number;
  qualifyingFactPrimary: string;
  qualifyingFactSecondary: string;
  repOpenerLine: string;
  provenanceReceipts: ProvenanceReceipt[];
  contacts: BuyingContact[];
}

interface SignalDossierDrawerProps {
  record: VaultRecord | null;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlockAccount: (recordId: string) => void;
  creditsRemaining: number;
}

export function SignalDossierDrawer({
  record,
  onClose,
  isUnlocked,
  onUnlockAccount,
  creditsRemaining,
}: SignalDossierDrawerProps) {
  const [activeTab, setActiveTab] = useState<"math" | "provenance" | "committee">("math");
  const [crmPushState, setCrmPushState] = useState<string | null>(null);
  const [copiedOpener, setCopiedOpener] = useState(false);

  if (!record) return null;

  const handleCopyOpener = () => {
    navigator.clipboard?.writeText(record.repOpenerLine);
    setCopiedOpener(true);
    setTimeout(() => setCopiedOpener(false), 2000);
  };

  const handleCrmPush = (target: string) => {
    setCrmPushState(target);
    setTimeout(() => setCrmPushState(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl bg-[#fcfaf8] text-[#111111] h-full overflow-y-auto border-l border-black/15 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drawer Header */}
        <div>
          <div className="sticky top-0 z-20 bg-[#fcfaf8]/95 backdrop-blur-xs border-b border-black/10 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[10px] uppercase tracking-[0.15em] font-medium">
                    {record.engine}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#d9534f]/10 text-[#d9534f] border border-[#d9534f]/30 text-[10px] uppercase tracking-[0.15em] font-medium">
                    {record.urgencyTier}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#f5f4ef] border border-black/10 text-[10px] font-mono text-[#111111]/70">
                    ID: {record.canonicalEntityId}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#111111]">
                  {record.legalName}
                </h2>
                <p className="text-xs font-mono text-[#111111]/60 mt-1">
                  DBA: {record.dbaName} • {record.domain} • {record.city}, {record.state} •{" "}
                  {record.einOrIdentifier}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 border border-black/15 bg-white hover:border-black text-[#111111] transition-colors cursor-pointer"
                aria-label="Close dossier drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3-Tab Switcher */}
            <div className="grid grid-cols-3 gap-px bg-black/10 border border-black/10 mt-5">
              <button
                type="button"
                onClick={() => setActiveTab("math")}
                className={`py-2.5 px-3 text-[11px] uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer ${
                  activeTab === "math"
                    ? "bg-[#111111] text-white"
                    : "bg-white text-[#111111]/70 hover:text-[#111111]"
                }`}
              >
                1. Signal &amp; Score Math
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("provenance")}
                className={`py-2.5 px-3 text-[11px] uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer ${
                  activeTab === "provenance"
                    ? "bg-[#111111] text-white"
                    : "bg-white text-[#111111]/70 hover:text-[#111111]"
                }`}
              >
                2. SHA-256 Receipts ({record.provenanceReceipts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("committee")}
                className={`py-2.5 px-3 text-[11px] uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer ${
                  activeTab === "committee"
                    ? "bg-[#111111] text-white"
                    : "bg-white text-[#111111]/70 hover:text-[#111111]"
                }`}
              >
                3. Buyers &amp; CRM Push ({record.contacts.length})
              </button>
            </div>
          </div>

          {/* Drawer Body Content */}
          <div className="p-6 space-y-6">
            {activeTab === "math" && (
              <>
                {/* Signal Summary Banner */}
                <div className="bg-white border border-black/15 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#d9534f] font-semibold">
                      Forward-Looking Trigger • {record.signalType}
                    </span>
                    <span className="text-xs font-mono text-[#111111]/60">
                      Action Window: {record.forwardWindowDays} Days Remaining
                    </span>
                  </div>
                  <h3 className="text-lg font-serif text-[#111111] mb-3">
                    {record.signalHeadline}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-black/10 text-xs">
                    <div>
                      <span className="text-[#111111]/50 block text-[10px] uppercase tracking-wider">
                        Primary Qualifying Fact
                      </span>
                      <span className="font-medium text-[#111111]">
                        {record.qualifyingFactPrimary}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#111111]/50 block text-[10px] uppercase tracking-wider">
                        Corporate Backbone Join
                      </span>
                      <span className="font-medium text-[#111111]">
                        {record.qualifyingFactSecondary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Half-Life Exponential Decay Math */}
                <div className="bg-[#f5f4ef] border border-black/10 p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#111111]/55 font-semibold mb-3">
                    Daily Exponential Decay Math (pg_cron Half-Life Formula)
                  </div>
                  <div className="grid grid-cols-4 gap-px bg-black/10 border border-black/10 mb-4">
                    <div className="bg-white p-3">
                      <div className="text-[10px] uppercase text-[#111111]/50">Initial W₀</div>
                      <div className="text-xl font-serif text-[#111111]">
                        {record.initialWeight} pts
                      </div>
                    </div>
                    <div className="bg-white p-3">
                      <div className="text-[10px] uppercase text-[#111111]/50">Age (t)</div>
                      <div className="text-xl font-serif text-[#111111]">
                        {record.daysElapsed}d old
                      </div>
                    </div>
                    <div className="bg-white p-3">
                      <div className="text-[10px] uppercase text-[#111111]/50">Half-Life</div>
                      <div className="text-xl font-serif text-[#111111]">
                        {record.halfLifeDays} days
                      </div>
                    </div>
                    <div className="bg-white p-3">
                      <div className="text-[10px] uppercase text-[#d9534f] font-semibold">
                        Live Score
                      </div>
                      <div className="text-xl font-serif text-[#d9534f] font-semibold">
                        {record.currentScore} / 100
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-black/10 font-mono text-xs text-[#111111]/80">
                    W(t) = {record.initialWeight} × 0.5^({record.daysElapsed} /{" "}
                    {record.halfLifeDays}) = <strong>{record.currentScore} pts</strong> • Stale
                    signals drop out of SDR queues automatically.
                  </div>
                </div>

                {/* Cited Rep Call / Email Opener */}
                <div className="bg-white border border-black/15 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#111111]/50 font-semibold">
                      Verified First-Sentence SDR Opener (Zero Hallucinations)
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyOpener}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#d9534f] hover:underline cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedOpener ? "Copied to Clipboard" : "Copy Opener"}
                    </button>
                  </div>
                  <p className="text-sm font-serif italic text-[#111111] bg-[#fcfaf8] p-4 border border-black/10 leading-relaxed">
                    &ldquo;{record.repOpenerLine}&rdquo;
                  </p>
                </div>
              </>
            )}

            {activeTab === "provenance" && (
              <div className="space-y-4">
                <div className="bg-[#f5f4ef] border border-black/10 p-4 text-xs text-[#111111]/75 leading-relaxed">
                  <strong className="text-[#111111]">
                    Atomic Source-Hierarchy Lock (fn_provenance_update):
                  </strong>{" "}
                  Higher-authority government filings (Tier 1) cannot be overwritten by lower-tier
                  directory or web scrapes (Tier 4–5). Every cell stores its SHA-256 payload hash.
                </div>

                {record.provenanceReceipts.map((r, idx) => (
                  <div key={idx} className="bg-white border border-black/15 p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#d9534f] font-semibold">
                          Column: {r.fieldName}
                        </span>
                        <div className="text-base font-serif text-[#111111] mt-0.5">
                          {r.fieldValue}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[10px] uppercase tracking-wider">
                          Tier {r.sourceTier} Authority
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#f5f4ef] border border-black/10 text-[10px] font-mono">
                          is_estimate: {r.isEstimate ? "true" : "false"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-serif text-[#111111]/80 bg-[#fcfaf8] p-3 border border-black/10">
                      Verbatim Excerpt: &ldquo;{r.verbatimExcerpt}&rdquo;
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-[#111111]/60">
                      <div>Source: {r.sourceName}</div>
                      <div>Captured: {r.capturedAt}</div>
                      <div className="sm:col-span-2 truncate">SHA-256: {r.sha256Hash}</div>
                    </div>

                    <div className="pt-1">
                      <a
                        href={r.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#111111] underline underline-offset-4 hover:text-[#d9534f]"
                      >
                        Inspect Raw Filing Source ({r.sourceUrl})
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "committee" && (
              <div className="space-y-5">
                {/* Credit Unlock Banner */}
                <div className="bg-[#f5f4ef] border border-black/15 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#d9534f] font-semibold">
                      Hybrid Just-In-Time Catch-All Verification (&lt;2% Bounce SLA)
                    </div>
                    <p className="text-xs text-[#111111]/75 mt-1">
                      50-keyword CPA &amp; registered-agent filter applied. Unlocks cost 1 company
                      credit ({creditsRemaining.toLocaleString()} / 1,250 remaining).
                    </p>
                  </div>
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-900 text-white text-xs uppercase tracking-wider font-medium shrink-0">
                      <Unlock className="w-3.5 h-3.5" /> Contacts Unlocked
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onUnlockAccount(record.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer shrink-0"
                    >
                      <Lock className="w-3.5 h-3.5" /> Unlock Account (1 Credit)
                    </button>
                  )}
                </div>

                {/* Contacts List */}
                <div className="space-y-3">
                  {record.contacts.map((c) => (
                    <div key={c.id} className="bg-white border border-black/15 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-black/10">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-serif text-[#111111]">{c.fullName}</h4>
                            <span className="px-2 py-0.5 bg-[#f5f4ef] border border-black/10 text-[10px] uppercase tracking-wider font-medium">
                              {c.roleTier}
                            </span>
                          </div>
                          <p className="text-xs text-[#111111]/65 mt-0.5">{c.title}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-900 text-[10px] font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" /> {c.cpaFilterStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs font-mono">
                        <div className="p-2.5 bg-[#fcfaf8] border border-black/10">
                          <div className="text-[10px] uppercase text-[#111111]/45 font-sans">
                            Direct Work Email
                          </div>
                          <div className="text-[#111111] font-medium mt-0.5">
                            {isUnlocked ? c.emailUnmasked : c.emailMasked}
                          </div>
                        </div>
                        <div className="p-2.5 bg-[#fcfaf8] border border-black/10">
                          <div className="text-[10px] uppercase text-[#111111]/45 font-sans">
                            Direct Dial / Mobile
                          </div>
                          <div className="text-[#111111] font-medium mt-0.5">
                            {isUnlocked ? c.phoneUnmasked : c.phoneMasked}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#111111]/55">
                        <span>Origin: {c.sourceOrigin}</span>
                        <span>
                          SMTP Gate: {c.verificationMethod} ({c.bounceRisk})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 1-Click CRM Push */}
                <div className="bg-white border border-black/15 p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#111111]/50 font-semibold mb-3">
                    1-Click Non-Destructive CRM &amp; Clay Push (Fills Gaps • Never Overwrites Reps)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {["HubSpot Custom Object", "Salesforce Account", "Clay Webhook"].map(
                      (target) => (
                        <button
                          key={target}
                          type="button"
                          onClick={() => handleCrmPush(target)}
                          className="py-2.5 px-3 border border-black/20 hover:border-black bg-[#fcfaf8] hover:bg-black/5 text-xs font-medium text-[#111111] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5 text-[#d9534f]" />
                          Push to {target}
                        </button>
                      )
                    )}
                  </div>
                  {crmPushState && (
                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>
                        Synced {record.legalName} + {record.contacts.length} verified buyers +{" "}
                        {record.provenanceReceipts.length} SHA-256 receipts to{" "}
                        <strong>{crmPushState}</strong>.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Drawer Footer */}
        <div className="sticky bottom-0 z-20 bg-[#fcfaf8] border-t border-black/10 p-4 flex items-center justify-between">
          <div className="text-xs text-[#111111]/60">
            Canonical Schema:{" "}
            <span className="font-mono text-[#111111]">
              entities → compliance_filings → signals_deltas
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#333333] transition-colors cursor-pointer"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
}

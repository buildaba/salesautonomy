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
    <div
      className="fixed inset-0 z-[150] flex justify-end bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#faf9f5] text-[#141413] h-full overflow-y-auto border-l border-black/12 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drawer Header */}
        <div>
          <div className="sticky top-0 z-20 bg-[#faf9f5]/95 backdrop-blur-xs border-b border-black/10 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#f0eee6] border border-black/8 text-[11px] font-medium text-[#3d3a34]">
                    {record.engine}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#ecfdf5] text-[#2e6f40] border border-[#a7f3d0] text-[11px] font-medium">
                    {record.urgencyTier}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-black/8 text-[11px] font-mono text-[#6b665e]">
                    {record.canonicalEntityId}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#141413] tracking-tight">
                  {record.legalName}
                </h2>
                <p className="text-xs font-mono text-[#5c5852] mt-1">
                  DBA: {record.dbaName} · {record.domain} · {record.city}, {record.state} ·{" "}
                  {record.einOrIdentifier}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl border border-black/12 bg-white hover:bg-[#f0eee6] text-[#141413] transition-colors cursor-pointer"
                aria-label="Close dossier drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3-Tab Pill Switcher (buildaba style) */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#f0eee6] border border-black/8 mt-5">
              <button
                type="button"
                onClick={() => setActiveTab("math")}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === "math"
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                1. Signal &amp; Score Math
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("provenance")}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === "provenance"
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                2. SHA-256 Receipts ({record.provenanceReceipts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("committee")}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === "committee"
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                3. Buyers &amp; CRM Push ({record.contacts.length})
              </button>
            </div>
          </div>

          {/* Drawer Body Content */}
          <div className="p-6 space-y-5">
            {activeTab === "math" && (
              <>
                {/* Signal Summary Banner */}
                <div className="bg-white border border-black/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#2e6f40]">
                      Forward-Looking Trigger · {record.signalType}
                    </span>
                    <span className="text-xs font-mono text-[#6b665e] tabular-nums">
                      Action Window: {record.forwardWindowDays}d left
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-medium text-[#141413] mb-4 leading-snug">
                    {record.signalHeadline}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/8 text-xs">
                    <div>
                      <span className="text-[#6b665e] block mb-0.5">
                        Primary Qualifying Fact
                      </span>
                      <span className="font-medium text-[#141413]">
                        {record.qualifyingFactPrimary}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6b665e] block mb-0.5">
                        Corporate Backbone Join
                      </span>
                      <span className="font-medium text-[#141413]">
                        {record.qualifyingFactSecondary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Half-Life Exponential Decay Math */}
                <div className="bg-[#f0eee6]/70 border border-black/10 rounded-2xl p-6">
                  <div className="text-xs font-medium text-[#5c5852] mb-3">
                    Daily Exponential Decay Math (pg_cron Half-Life Formula)
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 tabular-nums">
                    <div className="bg-white border border-black/8 rounded-xl p-3.5">
                      <div className="text-[11px] text-[#6b665e]">Initial W₀</div>
                      <div className="text-xl font-serif text-[#141413] mt-0.5">
                        {record.initialWeight} pts
                      </div>
                    </div>
                    <div className="bg-white border border-black/8 rounded-xl p-3.5">
                      <div className="text-[11px] text-[#6b665e]">Age (t)</div>
                      <div className="text-xl font-serif text-[#141413] mt-0.5">
                        {record.daysElapsed}d old
                      </div>
                    </div>
                    <div className="bg-white border border-black/8 rounded-xl p-3.5">
                      <div className="text-[11px] text-[#6b665e]">Half-Life</div>
                      <div className="text-xl font-serif text-[#141413] mt-0.5">
                        {record.halfLifeDays} days
                      </div>
                    </div>
                    <div className="bg-white border border-black/8 rounded-xl p-3.5">
                      <div className="text-[11px] text-[#2e6f40] font-medium">
                        Live Score
                      </div>
                      <div className="text-xl font-serif text-[#2e6f40] font-medium mt-0.5">
                        {record.currentScore} / 100
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-black/8 font-mono text-xs text-[#3d3a34]">
                    W(t) = {record.initialWeight} × 0.5^({record.daysElapsed} /{" "}
                    {record.halfLifeDays}) = <strong className="text-[#141413]">{record.currentScore} pts</strong> · Stale
                    signals drop out of SDR queues automatically.
                  </div>
                </div>

                {/* Cited Rep Call / Email Opener */}
                <div className="bg-white border border-black/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#6b665e]">
                      Verified First-Sentence SDR Opener
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyOpener}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f0eee6] hover:bg-[#e5e2d9] text-xs font-medium text-[#141413] cursor-pointer transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedOpener ? "Copied" : "Copy Opener"}
                    </button>
                  </div>
                  <p className="text-sm font-serif text-[#141413] bg-[#faf9f5] p-4 rounded-xl border border-black/8 leading-relaxed">
                    &ldquo;{record.repOpenerLine}&rdquo;
                  </p>
                </div>
              </>
            )}

            {activeTab === "provenance" && (
              <div className="space-y-4">
                <div className="bg-[#f0eee6]/70 border border-black/10 rounded-2xl p-4 text-xs text-[#3d3a34] leading-relaxed">
                  <strong className="text-[#141413]">
                    Atomic Source-Hierarchy Lock (fn_provenance_update):
                  </strong>{" "}
                  Higher-authority government filings (Tier 1) cannot be overwritten by lower-tier
                  directory scrapes (Tier 4–5). Every cell stores its SHA-256 payload hash.
                </div>

                {record.provenanceReceipts.map((r, idx) => (
                  <div key={idx} className="bg-white border border-black/10 rounded-2xl p-6 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/8 pb-3">
                      <div>
                        <span className="text-xs font-mono text-[#2e6f40] font-medium">
                          Column: {r.fieldName}
                        </span>
                        <div className="text-base font-serif font-medium text-[#141413] mt-0.5">
                          {r.fieldValue}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-[#141413] text-[#faf9f5] text-[10px] font-medium">
                          Tier {r.sourceTier} Authority
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-[#f0eee6] border border-black/8 text-[10px] font-mono text-[#3d3a34]">
                          is_estimate: {r.isEstimate ? "true" : "false"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-serif text-[#3d3a34] bg-[#faf9f5] p-3.5 rounded-xl border border-black/8 leading-relaxed">
                      Verbatim Excerpt: &ldquo;{r.verbatimExcerpt}&rdquo;
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-[#6b665e]">
                      <div>Source: {r.sourceName}</div>
                      <div>Captured: {r.capturedAt}</div>
                      <div className="sm:col-span-2 truncate">SHA-256: {r.sha256Hash}</div>
                    </div>

                    <div className="pt-1">
                      <a
                        href={r.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141413] underline underline-offset-4 hover:text-[#5c5852]"
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
                <div className="bg-[#f0eee6]/70 border border-black/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-[#2e6f40]">
                      Hybrid Just-In-Time Catch-All Verification (&lt;2% Bounce SLA)
                    </div>
                    <p className="text-xs text-[#5c5852] mt-1">
                      55-keyword CPA &amp; registered-agent filter applied. Unlocks cost 1 company
                      credit ({creditsRemaining.toLocaleString()} / 1,250 remaining).
                    </p>
                  </div>
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2e6f40] text-white text-xs font-medium shrink-0">
                      <Unlock className="w-3.5 h-3.5" /> Contacts Unlocked
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onUnlockAccount(record.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#141413] hover:bg-[#2c2b28] text-[#faf9f5] text-xs font-medium transition-colors cursor-pointer shrink-0"
                    >
                      <Lock className="w-3.5 h-3.5" /> Unlock Account (1 Credit)
                    </button>
                  )}
                </div>

                {/* Contacts List */}
                <div className="space-y-3">
                  {record.contacts.map((c) => (
                    <div key={c.id} className="bg-white border border-black/10 rounded-2xl p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-black/8">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-serif font-medium text-[#141413]">{c.fullName}</h4>
                            <span className="px-2 py-0.5 rounded-md bg-[#f0eee6] border border-black/8 text-[10px] font-medium text-[#3d3a34]">
                              {c.roleTier}
                            </span>
                          </div>
                          <p className="text-xs text-[#5c5852] mt-0.5">{c.title}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-[10px] font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" /> {c.cpaFilterStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-[#faf9f5] border border-black/8">
                          <div className="text-[10px] text-[#6b665e] font-sans">
                            Direct Work Email
                          </div>
                          <div className="text-[#141413] font-medium mt-0.5">
                            {isUnlocked ? c.emailUnmasked : c.emailMasked}
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-[#faf9f5] border border-black/8">
                          <div className="text-[10px] text-[#6b665e] font-sans">
                            Direct Dial / Mobile
                          </div>
                          <div className="text-[#141413] font-medium mt-0.5">
                            {isUnlocked ? c.phoneUnmasked : c.phoneMasked}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6b665e]">
                        <span>Origin: {c.sourceOrigin}</span>
                        <span>
                          SMTP Gate: {c.verificationMethod} ({c.bounceRisk})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 1-Click CRM Push */}
                <div className="bg-white border border-black/10 rounded-2xl p-5">
                  <div className="text-xs font-medium text-[#5c5852] mb-3">
                    1-Click Non-Destructive CRM &amp; Clay Push (Fills Gaps · Never Overwrites Reps)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {["HubSpot Custom Object", "Salesforce Account", "Clay Webhook"].map(
                      (target) => (
                        <button
                          key={target}
                          type="button"
                          onClick={() => handleCrmPush(target)}
                          className="py-2.5 px-3 rounded-xl border border-black/14 hover:bg-[#f0eee6] bg-[#faf9f5] text-xs font-medium text-[#141413] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5 text-[#2e6f40]" />
                          Push to {target}
                        </button>
                      )
                    )}
                  </div>
                  {crmPushState && (
                    <div className="mt-3 p-3 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#2e6f40] shrink-0" />
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
        <div className="sticky bottom-0 z-20 bg-[#faf9f5] border-t border-black/10 p-4 flex items-center justify-between">
          <div className="text-xs text-[#6b665e]">
            Schema:{" "}
            <span className="font-mono text-[#141413]">
              entities → compliance_filings → signals_deltas
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#141413] text-[#faf9f5] text-xs font-medium hover:bg-[#2c2b28] transition-colors cursor-pointer"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
}

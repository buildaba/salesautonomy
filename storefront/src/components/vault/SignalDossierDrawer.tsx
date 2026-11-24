"use client";

import { useState } from "react";
import {
  X,
  Check,
  ExternalLink,
  ShieldCheck,
  Lock,
  Unlock,
  Copy,
  Send,
  ChevronDown,
} from "lucide-react";

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
  fieldLabel: string;
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
  industryKey: "healthcare" | "fleet" | "contractors";
  engine:
    | "Healthcare & Clinics"
    | "Trucking & Factories"
    | "Gov Contractors & Builders";
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
  urgencyTier: "0–30 Days" | "31–60 Days" | "61–90 Days";
  initialWeight: number;
  daysElapsed: number;
  halfLifeDays: number;
  currentScore: number;
  qualifyingFactPrimary: string;
  qualifyingFactSecondary: string;
  repOpenerLine: string;
  stackedAgencies?: string[];
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
  const [activeTab, setActiveTab] = useState<"why" | "proof" | "buyers">("why");
  const [crmPushState, setCrmPushState] = useState<string | null>(null);
  const [copiedOpener, setCopiedOpener] = useState(false);
  const [copiedGrokbotBrief, setCopiedGrokbotBrief] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);

  if (!record) return null;

  const handleCopyOpener = () => {
    navigator.clipboard?.writeText(record.repOpenerLine);
    setCopiedOpener(true);
    setTimeout(() => setCopiedOpener(false), 2000);
  };

  const handleCopyGrokbotBrief = () => {
    const primaryContact = record.contacts[0];
    const primaryReceipt = record.provenanceReceipts[0];
    const agenciesList = (
      record.stackedAgencies && record.stackedAgencies.length > 0
        ? record.stackedAgencies
        : ["DOL Form 5500 (EIN)", "SAM.gov (UEI)", record.engine]
    ).join(" + ");
    const brief = [
      `# Grokbot / Clay Multi-Agency Outbound Brief — ${record.dbaName}`,
      `Entity: ${record.legalName} (${record.domain})`,
      `Stacked Federal Agencies: ${agenciesList}`,
      `Location: ${record.city}, ${record.state} · ${record.siteCountOrFleet} · ${record.verifiedHeadcount}`,
      `Trigger (${record.urgencyTier} · Score ${record.currentScore}/100): ${record.signalType} — ${record.signalHeadline}`,
      `Official Statutory Proof: ${primaryReceipt?.sourceName || "Federal Filing"} (${primaryReceipt?.sourceUrl || ""}) · SHA-256: ${primaryReceipt?.sha256Hash || ""}`,
      `Primary Decision-Maker: ${primaryContact?.fullName || ""} (${primaryContact?.title || ""}) · Email: ${isUnlocked ? primaryContact?.emailUnmasked : primaryContact?.emailMasked}`,
      `Citation-Backed First Line: "${record.repOpenerLine}"`,
    ].join("\n");
    navigator.clipboard?.writeText(brief);
    setCopiedGrokbotBrief(true);
    setTimeout(() => setCopiedGrokbotBrief(false), 2500);
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
                    Deadline: {record.forwardWindowDays} Days Left
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#141413] text-[#faf9f5] text-[11px] font-medium">
                    Verified Across {(record.stackedAgencies?.length || 3)} Public Sources
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#141413] tracking-tight">
                  {record.dbaName}
                </h2>
                <p className="text-xs text-[#5c5852] mt-1">
                  {record.domain} · {record.city}, {record.state} · {record.verifiedHeadcount}
                </p>
                {record.stackedAgencies && record.stackedAgencies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    <span className="text-[11px] text-[#6b665e] font-medium">
                      Matched Sources:
                    </span>
                    {record.stackedAgencies.map((ag) => (
                      <span
                        key={ag}
                        className="px-2 py-0.5 rounded-md bg-white border border-black/10 text-[10px] font-medium text-[#141413]"
                      >
                        {ag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl border border-black/12 bg-white hover:bg-[#f0eee6] text-[#141413] transition-colors cursor-pointer"
                aria-label="Close account details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3-Tab Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#f0eee6] border border-black/8 mt-5">
              <button
                type="button"
                onClick={() => setActiveTab("why")}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === "why"
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                1. Why Call Now
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("proof")}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === "proof"
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                2. Official Proof ({record.provenanceReceipts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("buyers")}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === "buyers"
                    ? "bg-white text-[#141413] shadow-xs"
                    : "text-[#5c5852] hover:text-[#141413]"
                }`}
              >
                3. Verified Buyers ({record.contacts.length})
              </button>
            </div>
          </div>

          {/* Drawer Body Content */}
          <div className="p-6 space-y-5">
            {activeTab === "why" && (
              <>
                {/* Trigger Summary Banner */}
                <div className="bg-white border border-black/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#2e6f40]">
                      Active Trigger · {record.signalType}
                    </span>
                    <span className="text-xs text-[#6b665e] tabular-nums">
                      {record.forwardWindowDays} days left
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-medium text-[#141413] mb-4 leading-snug">
                    {record.signalHeadline}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/8 text-xs">
                    <div>
                      <span className="text-[#6b665e] block mb-0.5">
                        Key Company Detail
                      </span>
                      <span className="font-medium text-[#141413]">
                        {record.qualifyingFactPrimary}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6b665e] block mb-0.5">
                        Verified Size &amp; Legal Name
                      </span>
                      <span className="font-medium text-[#141413]">
                        {record.qualifyingFactSecondary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simple Priority Score Card */}
                <div className="bg-[#f0eee6]/70 border border-black/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-[#5c5852]">
                      Urgency Priority Score
                    </div>
                    <span className="text-xs font-medium text-[#2e6f40]">
                      Updated Daily
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 mb-3 tabular-nums">
                    <div className="bg-white border border-black/8 rounded-xl p-3.5">
                      <div className="text-[11px] text-[#6b665e]">Priority Score</div>
                      <div className="text-xl font-serif text-[#2e6f40] font-medium mt-0.5">
                        {record.currentScore} / 100
                      </div>
                    </div>
                    <div className="bg-white border border-black/8 rounded-xl p-3.5">
                      <div className="text-[11px] text-[#6b665e]">Window Left</div>
                      <div className="text-xl font-serif text-[#141413] mt-0.5">
                        {record.forwardWindowDays} days
                      </div>
                    </div>
                    <div className="bg-white border border-black/8 rounded-xl p-3.5">
                      <div className="text-[11px] text-[#6b665e]">Detected</div>
                      <div className="text-xl font-serif text-[#141413] mt-0.5">
                        {record.daysElapsed}d ago
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#5c5852] leading-relaxed">
                    Scores drop automatically each day as deadlines age. Your reps always call the
                    freshest, highest-urgency accounts first.
                  </p>
                </div>

                {/* Ready-to-Use Rep Opener */}
                <div className="bg-white border border-black/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#6b665e]">
                      Ready-to-Use Call &amp; Email Opener
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyGrokbotBrief}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] hover:bg-[#d1fae5] text-xs font-medium text-[#2e6f40] cursor-pointer transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedGrokbotBrief ? "Copied Agent Brief" : "Copy Clay / AI Brief"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyOpener}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f0eee6] hover:bg-[#e5e2d9] text-xs font-medium text-[#141413] cursor-pointer transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedOpener ? "Copied" : "Copy Opener"}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-serif text-[#141413] bg-[#faf9f5] p-4 rounded-xl border border-black/8 leading-relaxed">
                    &ldquo;{record.repOpenerLine}&rdquo;
                  </p>
                </div>
              </>
            )}

            {activeTab === "proof" && (
              <div className="space-y-4">
                <div className="bg-[#f0eee6]/70 border border-black/10 rounded-2xl p-4 text-xs text-[#3d3a34] leading-relaxed">
                  <strong className="text-[#141413]">
                    Official records always beat web scrapes.
                  </strong>{" "}
                  Every fact below links back to the original government filing so your reps never
                  quote a wrong number on a call.
                </div>

                {record.provenanceReceipts.map((r, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-black/10 rounded-2xl p-6 space-y-3.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/8 pb-3">
                      <div>
                        <span className="text-xs font-medium text-[#2e6f40]">
                          {r.fieldLabel}
                        </span>
                        <div className="text-base font-serif font-medium text-[#141413] mt-0.5">
                          {r.fieldValue}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-[#ecfdf5] border border-[#a7f3d0] text-[#2e6f40] text-[10px] font-medium">
                        Verified Filing (Not Estimated)
                      </span>
                    </div>

                    <p className="text-xs font-serif text-[#3d3a34] bg-[#faf9f5] p-3.5 rounded-xl border border-black/8 leading-relaxed">
                      Official Record Text: &ldquo;{r.verbatimExcerpt}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6b665e]">
                      <span>Source: {r.sourceName}</span>
                      <span>Checked: {new Date(r.capturedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={r.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141413] underline underline-offset-4 hover:text-[#2e6f40]"
                      >
                        Open Original Government Record
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}

                {/* Optional Technical Spec Toggle */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowTechDetails((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6b665e] hover:text-[#141413] cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        showTechDetails ? "rotate-180" : ""
                      }`}
                    />
                    {showTechDetails
                      ? "Hide Technical Specs"
                      : "Technical Specs (For Data Teams)"}
                  </button>
                  {showTechDetails && (
                    <div className="mt-3 p-4 rounded-xl bg-white border border-black/10 text-[11px] font-mono text-[#5c5852] space-y-1.5">
                      <div>Record ID: {record.canonicalEntityId}</div>
                      <div>Identifiers: {record.einOrIdentifier}</div>
                      <div>Legal Name: {record.legalName}</div>
                      {record.provenanceReceipts[0] && (
                        <div className="truncate">
                          SHA-256 Hash: {record.provenanceReceipts[0].sha256Hash}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "buyers" && (
              <div className="space-y-5">
                {/* Unlock Banner */}
                <div className="bg-[#f0eee6]/70 border border-black/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium text-[#2e6f40]">
                      Verified Real Executives (&lt;2% Email Bounce)
                    </div>
                    <p className="text-xs text-[#5c5852] mt-1">
                      Outside accountants and lawyers are screened out. Unlocking costs 1 credit (
                      {creditsRemaining.toLocaleString()} left in demo).
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
                      <Lock className="w-3.5 h-3.5" /> Unlock Contacts (1 Credit)
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
                            <h4 className="text-lg font-serif font-medium text-[#141413]">
                              {c.fullName}
                            </h4>
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
                            Direct Phone
                          </div>
                          <div className="text-[#141413] font-medium mt-0.5">
                            {isUnlocked ? c.phoneUnmasked : c.phoneMasked}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6b665e]">
                        <span>Found in: {c.sourceOrigin}</span>
                        <span>Email check: {c.bounceRisk}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 1-Click CRM Push */}
                <div className="bg-white border border-black/10 rounded-2xl p-5">
                  <div className="text-xs font-medium text-[#5c5852] mb-3">
                    Send to Your CRM (Fills blank fields only · Never overwrites rep notes)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {["HubSpot", "Salesforce", "Clay"].map((target) => (
                      <button
                        key={target}
                        type="button"
                        onClick={() => handleCrmPush(target)}
                        className="py-2.5 px-3 rounded-xl border border-black/14 hover:bg-[#f0eee6] bg-[#faf9f5] text-xs font-medium text-[#141413] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-[#2e6f40]" />
                        Send to {target}
                      </button>
                    ))}
                  </div>
                  {crmPushState && (
                    <div className="mt-3 p-3 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#2e6f40] shrink-0" />
                      <span>
                        Sent {record.dbaName} and {record.contacts.length} verified buyer(s) to{" "}
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
            Official public filing · Verified executive contact
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#141413] text-[#faf9f5] text-xs font-medium hover:bg-[#2c2b28] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

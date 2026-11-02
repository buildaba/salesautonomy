"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, Check, Copy } from "lucide-react";

type RoleTrack = "founding-ae" | "mm-ent-ae" | "vp-sales" | "gtm-engineer";

const ROLE_LABELS: Record<RoleTrack, string> = {
  "founding-ae": "Founding Account Executive",
  "mm-ent-ae": "Mid-Market / Enterprise AE",
  "vp-sales": "VP of Sales / Head of Sales",
  "gtm-engineer": "GTM Engineer / RevOps",
};

const SAMPLE_RESUMES: Record<string, { label: string; text: string }> = {
  ae: {
    label: "Sample: Founding AE",
    text: `Elena Vance | elena.vance@snyk.io | linkedin.com/in/elena-vance-ae
Founding Account Executive at Series A Developer Security SaaS (2023–Present)
• Joined at $900K ARR as first sales hire; scaled net-new ARR to $5.8M across Seed and Series A.
• 144% average quota attainment over 3 years ($85K median ACV, $210K largest deal, 60-day sales cycle).
• 75% self-sourced outbound pipeline built from scratch selling directly to CTOs, VPs of Engineering, and CISOs.`,
  },
  vp: {
    label: "Sample: VP of Sales",
    text: `Marcus Thorne | m.thorne@datadoghq.com | linkedin.com/in/marcus-thorne-vp
VP of Sales at Series B Cloud Infrastructure SaaS (2022–Present)
• Scaled ARR from $2.2M (Series A) to $14.5M (Series B) in 26 months.
• Hired and managed 12 Mid-Market & Enterprise AEs and 5 SDRs; 82% of reps hit 100%+ quota.
• Sold $95K ACV (60–120 day cycle) to Technical (CTO / VP Eng) and Finance (CFO) buyers.`,
  },
  gtme: {
    label: "Sample: GTM Engineer",
    text: `Devon Lin | devon@vercel.com | linkedin.com/in/devon-lin-gtm
Lead GTM Engineer & RevOps Architect at Series B AI Platform (2024–Present)
• Built automated outbound & signal enrichment architecture using Clay, HubSpot, Python, SQL, and Webhooks.
• Generated $3.4M in self-sourced outbound pipeline per quarter while saving 14 hours/week per AE.
• Partnered with GTM Leaders (CRO / VP Sales) and Technical buyers across Series A and Series B.`,
  },
};

export default function CandidateProfileBuilderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedVouch, setCopiedVouch] = useState<string | null>(null);

  // Fast Auto-Fill State
  const [resumeInput, setResumeInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [autoFillStatus, setAutoFillStatus] = useState<{
    extracted: string[];
    needsConfirm: string[];
  } | null>(null);

  // Identity & Anti-Gaming Anchor
  const [fullName, setFullName] = useState("Jordan Miller");
  const [email, setEmail] = useState("jordan.miller@hey.com");
  const [linkedinUrl, setLinkedinUrl] = useState("linkedin.com/in/jordan-miller-saas");

  // Stealth & Employer Protection
  const [stealthMode, setStealthMode] = useState(true);
  const [maskedCompanyLabel, setMaskedCompanyLabel] = useState("Series B Cybersecurity SaaS");
  const [blockedDomains, setBlockedDomains] = useState("currentcompany.io, sequoiacap.com");

  // Block 01: Role Track
  const [roleTrack, setRoleTrack] = useState<RoleTrack>("founding-ae");

  // Block 02: Commercial Environment
  const [stages, setStages] = useState<string[]>(["Seed (<$2M ARR)", "Series A ($2M–$10M)"]);
  const [acvBand, setAcvBand] = useState("$50K–$150K (Mid-Market)");
  const [salesCycle, setSalesCycle] = useState("60–120 Days");
  const [buyers, setBuyers] = useState<string[]>([
    "Technical (CTO / VP Eng / Sec)",
    "Finance & Ops (CFO / COO)",
  ]);

  // Block 03: Pipeline & Territory Reality
  const [pipelineMix, setPipelineMix] = useState("70%+ Self-Sourced Outbound");
  const [territoryType, setTerritoryType] = useState("Greenfield (Built from $0)");

  // Block 04: Role-Specific Hard Numbers
  const [annualQuota, setAnnualQuota] = useState("$900K Annual Quota");
  const [attainment, setAttainment] = useState("138% Avg (3 Yrs)");
  const [largestDeal, setLargestDeal] = useState("$240K ACV");
  const [arrScaled, setArrScaled] = useState("$1.5M → $9.5M ARR (24 mos)");
  const [teamManaged, setTeamManaged] = useState("10 AEs & 4 SDRs");
  const [teamQuotaPct, setTeamQuotaPct] = useState("78% of Reps at 100%+");
  const [gtmStack, setGtmStack] = useState("Clay, HubSpot, Python/SQL, Webhooks, Smartlead");
  const [systemsBuilt, setSystemsBuilt] = useState(
    "Automated signal-based outbound & enrichment engine"
  );
  const [pipelineImpact, setPipelineImpact] = useState(
    "$3.1M Sourced Pipeline / 15 hrs saved per rep/wk"
  );
  const [highlightNote, setHighlightNote] = useState(
    "Built the mid-market outbound motion from $1.4M to $8M ARR before our first SDR hire. Self-sourced 65% of closed revenue selling into VPs of Engineering and CISOs."
  );

  // Block 05: Vouch Invites
  const [managerEmail, setManagerEmail] = useState("");
  const [teammateEmail, setTeammateEmail] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  // Block 06: Next Role Preferences
  const [minBase, setMinBase] = useState("$100K");
  const [targetOte, setTargetOte] = useState("$200K+");
  const [workMode, setWorkMode] = useState("Remote or Hybrid");

  const toggleMulti = (list: string[], item: string, setter: (v: string[]) => void) => {
    if (list.includes(item)) {
      if (list.length > 1) setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleAutoFill = async (textToParse?: string) => {
    const raw = (textToParse ?? resumeInput).trim();
    if (!raw) return;
    setIsParsing(true);
    try {
      const res = await fetch("/api/parse-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: raw }),
      });
      const data = await res.json();
      if (res.ok && data) {
        if (data.fullName) setFullName(data.fullName);
        if (data.email) setEmail(data.email);
        if (data.linkedinUrl) setLinkedinUrl(data.linkedinUrl);
        if (data.maskedCompanyLabel) setMaskedCompanyLabel(data.maskedCompanyLabel);
        if (data.blockedDomains) setBlockedDomains(data.blockedDomains);
        if (data.roleTrack) setRoleTrack(data.roleTrack);
        if (data.stages) setStages(data.stages);
        if (data.acvBand) setAcvBand(data.acvBand);
        if (data.salesCycle) setSalesCycle(data.salesCycle);
        if (data.buyers) setBuyers(data.buyers);
        if (data.pipelineMix) setPipelineMix(data.pipelineMix);
        if (data.territoryType) setTerritoryType(data.territoryType);
        if (data.attainment) setAttainment(data.attainment);

        const bulletLines = raw
          .split(/\r?\n/)
          .filter((l) => l.trim().startsWith("•") || l.trim().startsWith("-"))
          .map((l) => l.replace(/^[•-]\s*/, "").trim());
        if (bulletLines.length > 0) {
          setHighlightNote(bulletLines.slice(0, 2).join(" "));
        }

        setAutoFillStatus({
          extracted: data.extractedFields || [
            "Identity & LinkedIn Handle",
            "Role Track",
            "Stage & Buyer Context",
            "Auto-Blocked Current Employer Domain",
          ],
          needsConfirm: data.needsConfirmation || [
            "Confirm Outbound % vs Inbound",
            "Confirm Target OTE Floor",
          ],
        });
      }
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setResumeInput(text.slice(0, 4000));
    await handleAutoFill(text.slice(0, 4000));
  };

  const initials = fullName
    .trim()
    .split(/\s+/)
    .map((n) => n[0]?.toUpperCase() || "X")
    .join("")
    .slice(0, 2);
  const candidateHandle = `Candidate #${initials || "JM"}-204`;

  const cleanLinkedinSlug = linkedinUrl
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");

  const handleCopyVouchLink = (type: string) => {
    const slug = cleanLinkedinSlug.split("/").pop() || "seller-204";
    const url = `https://salesautonomy.com/vouch/${slug}?role=${type}`;
    navigator.clipboard.writeText(url);
    setCopiedVouch(type);
    setTimeout(() => setCopiedVouch(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-black/10">
          <Link
            href="/academy"
            className="text-xs uppercase tracking-[0.2em] text-[#111111]/45 hover:text-[#111111] mb-4 inline-block"
          >
            ← Back to Candidate Overview
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-[#111111] leading-[1.08]">
                Build Your Standardized Profile
              </h1>
              <p className="text-lg text-[#111111]/60 font-light mt-3 max-w-2xl leading-relaxed">
                Drop your resume or LinkedIn PDF to pre-fill your profile in 10 seconds, then verify the 3 commercial numbers resumes leave out.
              </p>
            </div>
            <div className="px-4 py-2 bg-[#f5f4ef] border border-black/10 text-xs uppercase tracking-[0.15em] text-[#111111]/70 self-start">
              Stealth Default: <strong className="text-[#111111]">Identity Hidden</strong>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="max-w-3xl mx-auto bg-white border border-black/10 p-8 md:p-12 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
                Profile Standardized &amp; Deduplicated via LinkedIn
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#111111]">
                {stealthMode ? `${candidateHandle} is Live in Stealth Mode` : `${fullName}'s Profile is Live`}
              </h2>
              <p className="text-sm text-[#111111]/65 font-light mt-2 leading-relaxed">
                Anchored to <strong className="text-[#111111]">{cleanLinkedinSlug}</strong>. Domains blocked from viewing your profile:{" "}
                <strong className="text-[#111111]">{blockedDomains || "None"}</strong>.
              </p>
            </div>

            {/* 1-Click Vouch Links */}
            <div className="p-8 bg-[#fcfaf8] border border-black/10 space-y-5">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/50 font-medium mb-1">
                  Unlock Verified Status • Send Your 30-Second Vouch Links
                </div>
                <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
                  Profiles with at least 2 verified endorsements get 4x more interview requests. To prevent fake reviews, endorsers verify with their LinkedIn and work email in 30 seconds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/10 border border-black/10">
                {[
                  { id: "manager", label: "1. Former Manager Link", sub: "Verifies quota & rehire signal" },
                  { id: "teammate", label: "2. Teammate / SE Link", sub: "Verifies discovery & prep" },
                  { id: "buyer", label: "3. Customer / Buyer Link", sub: "Verifies trust & deal value" },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleCopyVouchLink(v.id)}
                    className="p-6 bg-white hover:bg-[#f5f4ef] text-left transition-colors cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-lg text-[#111111]">{v.label}</span>
                        {copiedVouch === v.id ? (
                          <Check size={14} className="text-[#111111]" />
                        ) : (
                          <Copy size={14} className="text-[#111111]/40" />
                        )}
                      </div>
                      <p className="text-xs text-[#111111]/55 font-light">{v.sub}</p>
                    </div>
                    <div className="mt-4 text-[11px] uppercase tracking-[0.15em] text-[#d9534f] font-medium">
                      {copiedVouch === v.id ? "Copied to clipboard ✓" : "Copy Vouch Link →"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/10">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-[0.2em] text-[#111111]/60 hover:text-[#111111] cursor-pointer"
              >
                ← Edit Profile Configuration
              </button>
              <Link
                href="/portal/demo"
                className="px-6 py-3.5 bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors"
              >
                See How Companies View Shortlists →
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: AUTO-FILL + 6-BLOCK CONFIGURATION FORM (7 COLS) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
              {/* STEP 0: 10-SECOND COMPLIANT RESUME / LINKEDIN PDF AUTO-FILL */}
              <div className="p-8 bg-[#f5f4ef] border border-black/15 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-1">
                      Step 0 · Optional 10-Second Auto-Fill
                    </div>
                    <h2 className="text-2xl font-serif text-[#111111]">
                      Pre-Fill from Your Resume or LinkedIn PDF
                    </h2>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/50">
                    Zero Invented Numbers
                  </span>
                </div>

                <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
                  Paste your resume or LinkedIn &ldquo;Save to PDF&rdquo; text below (or test a sample profile). We auto-fill your career history, auto-block your current employer&apos;s domain, and highlight the exact commercial numbers for you to confirm.
                </p>

                {/* 1-Click Sample Loaders */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/45 mr-1">
                    Try Instant Auto-Fill:
                  </span>
                  {Object.entries(SAMPLE_RESUMES).map(([key, sample]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setResumeInput(sample.text);
                        handleAutoFill(sample.text);
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-[#111111] hover:text-white border border-black/15 text-xs font-medium text-[#111111] transition-colors cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                  <label className="px-3 py-1.5 bg-white hover:bg-black/5 border border-black/15 text-xs font-medium text-[#111111] transition-colors cursor-pointer inline-flex items-center gap-1.5">
                    <Upload size={12} /> Upload .TXT / .MD
                    <input
                      type="file"
                      accept=".txt,.md,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <textarea
                    rows={3}
                    value={resumeInput}
                    onChange={(e) => setResumeInput(e.target.value)}
                    placeholder="Paste your resume text or LinkedIn 'About + Experience' section here..."
                    className="flex-1 bg-white border border-black/15 px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:border-black resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAutoFill()}
                    disabled={isParsing || !resumeInput.trim()}
                    className="px-6 py-3 bg-[#111111] text-white font-medium text-sm hover:bg-[#333333] disabled:opacity-40 transition-colors shrink-0 cursor-pointer"
                  >
                    {isParsing ? "Analyzing..." : "Auto-Fill Profile"}
                  </button>
                </div>

                {autoFillStatus && (
                  <div className="p-5 bg-white border border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.15em] text-[#111111] font-medium mb-2">
                        ✓ Extracted From Your Resume
                      </div>
                      <ul className="space-y-1">
                        {autoFillStatus.extracted.map((item) => (
                          <li key={item} className="text-xs text-[#111111]/70 font-light">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.15em] text-[#d9534f] font-medium mb-2">
                        ⚡ Please Confirm Below (Not on Resumes)
                      </div>
                      <ul className="space-y-1">
                        {autoFillStatus.needsConfirm.map((item) => (
                          <li key={item} className="text-xs text-[#111111]/70 font-light">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* STEALTH & ANTI-GAMING IDENTITY SHIELD */}
              <div className="p-8 bg-white border border-black/10 space-y-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium">
                      Identity &amp; Privacy
                    </div>
                    <h2 className="text-2xl font-serif text-[#111111] mt-1">
                      Stealth Shield &amp; LinkedIn Deduplication
                    </h2>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/45">
                    1 Profile Per LinkedIn ID
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55 font-medium block">
                      Full Name (Hidden in Stealth)
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55 font-medium block">
                      Private Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55 font-medium flex items-center justify-between">
                    <span>LinkedIn Profile URL (Prevents Fake or Duplicate Profiles)</span>
                    <span className="text-[#d9534f]">Unique Key</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="linkedin.com/in/your-handle"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-black"
                  />
                </div>

                {/* Stealth Toggle & Employer Blocklist */}
                <div className="p-6 bg-[#fcfaf8] border border-black/10 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-base font-serif text-[#111111]">
                        Stealth Mode (Hide Name &amp; Current Employer)
                      </div>
                      <p className="text-xs text-[#111111]/60 font-light mt-0.5">
                        Companies see your standardized numbers and endorsements first. You approve every intro before your name or LinkedIn is revealed.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStealthMode(!stealthMode)}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium border transition-colors shrink-0 cursor-pointer ${
                        stealthMode
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "bg-white text-[#111111]/60 border-black/20"
                      }`}
                    >
                      {stealthMode ? "Stealth ON" : "Visible"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/10">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/50 block">
                        Anonymized Company Descriptor
                      </label>
                      <input
                        type="text"
                        value={maskedCompanyLabel}
                        onChange={(e) => setMaskedCompanyLabel(e.target.value)}
                        className="w-full bg-white border border-black/15 px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/50 flex items-center justify-between">
                        <span>Blocked Domains (Employer / VCs)</span>
                        <span className="text-[#d9534f]">Shielded</span>
                      </label>
                      <input
                        type="text"
                        value={blockedDomains}
                        onChange={(e) => setBlockedDomains(e.target.value)}
                        className="w-full bg-white border border-black/15 px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCK 01: ROLE TRACK */}
              <div className="p-8 bg-white border border-black/10 space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  Block 01 · Standardized Role Track
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/10 border border-black/10">
                  {(Object.keys(ROLE_LABELS) as RoleTrack[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRoleTrack(key)}
                      className={`p-4 text-left transition-colors cursor-pointer ${
                        roleTrack === key
                          ? "bg-[#111111] text-white font-medium"
                          : "bg-[#fcfaf8] text-[#111111]/75 hover:bg-[#f5f4ef]"
                      }`}
                    >
                      <div className="text-sm font-serif">{ROLE_LABELS[key]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* BLOCK 02: COMMERCIAL ENVIRONMENT */}
              <div className="p-8 bg-white border border-black/10 space-y-5">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  Block 02 · Commercial Environment (Apples-to-Apples Context)
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/60 block">
                    Company Stages Where You Have Produced
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Seed (<$2M ARR)",
                      "Series A ($2M–$10M)",
                      "Series B ($10M–$30M)",
                      "Series C+ ($30M+)",
                    ].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleMulti(stages, s, setStages)}
                        className={`px-3.5 py-2 text-xs border transition-colors cursor-pointer ${
                          stages.includes(s)
                            ? "bg-[#111111] text-white border-[#111111] font-medium"
                            : "bg-[#fcfaf8] text-[#111111]/70 border-black/15 hover:border-black/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/60 block">
                      Median Deal Size (ACV)
                    </label>
                    <select
                      value={acvBand}
                      onChange={(e) => setAcvBand(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-black"
                    >
                      <option value="<$15K (High Velocity)">&lt;$15K (High Velocity)</option>
                      <option value="$15K–$50K (SMB / Lower MM)">$15K–$50K (SMB / Lower MM)</option>
                      <option value="$50K–$150K (Mid-Market)">$50K–$150K (Mid-Market)</option>
                      <option value="$150K–$500K+ (Enterprise)">$150K–$500K+ (Enterprise)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/60 block">
                      Typical Sales Cycle
                    </label>
                    <select
                      value={salesCycle}
                      onChange={(e) => setSalesCycle(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-black"
                    >
                      <option value="<30 Days (Transactional)">&lt;30 Days (Transactional)</option>
                      <option value="30–60 Days">30–60 Days</option>
                      <option value="60–120 Days">60–120 Days</option>
                      <option value="120–180+ Days (Complex)">120–180+ Days (Complex)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/60 block">
                    Primary Buyers Sold To
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Technical (CTO / VP Eng / Sec)",
                      "Finance & Ops (CFO / COO)",
                      "GTM Leaders (CRO / VP Sales / CMO)",
                      "HR / Legal / Departmental",
                      "Founders / SMB Owners",
                    ].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleMulti(buyers, b, setBuyers)}
                        className={`px-3.5 py-2 text-xs border transition-colors cursor-pointer ${
                          buyers.includes(b)
                            ? "bg-[#111111] text-white border-[#111111] font-medium"
                            : "bg-[#fcfaf8] text-[#111111]/70 border-black/15 hover:border-black/40"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* BLOCK 03: PIPELINE & TERRITORY REALITY */}
              <div className="p-8 bg-white border border-black/10 space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  Block 03 · Pipeline Source &amp; Territory Reality
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/60 block">
                      How Your Pipeline Was Generated
                    </label>
                    <select
                      value={pipelineMix}
                      onChange={(e) => setPipelineMix(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-black"
                    >
                      <option value="70%+ Self-Sourced Outbound">70%+ Self-Sourced Outbound</option>
                      <option value="50/50 Outbound & Inbound">50/50 Outbound &amp; Inbound</option>
                      <option value="Mostly Inbound / PLG-Assist">Mostly Inbound / PLG-Assist</option>
                      <option value="Named Enterprise / Expansion">Named Enterprise / Expansion</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/60 block">
                      Territory Condition When Joined
                    </label>
                    <select
                      value={territoryType}
                      onChange={(e) => setTerritoryType(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111] focus:outline-none focus:border-black"
                    >
                      <option value="Greenfield (Built from $0)">Greenfield (Built from $0)</option>
                      <option value="Rebuilt / Turnaround Patch">Rebuilt / Turnaround Patch</option>
                      <option value="Established / Inherited Book">Established / Inherited Book</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* BLOCK 04: ROLE-SPECIFIC HARD NUMBERS */}
              <div className="p-8 bg-white border border-black/10 space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  Block 04 · Verified Numbers ({ROLE_LABELS[roleTrack]})
                </div>

                {(roleTrack === "founding-ae" || roleTrack === "mm-ent-ae") && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        Annual Quota
                      </label>
                      <input
                        type="text"
                        value={annualQuota}
                        onChange={(e) => setAnnualQuota(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        Multi-Yr Attainment
                      </label>
                      <input
                        type="text"
                        value={attainment}
                        onChange={(e) => setAttainment(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        Largest Deal Closed
                      </label>
                      <input
                        type="text"
                        value={largestDeal}
                        onChange={(e) => setLargestDeal(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                  </div>
                )}

                {roleTrack === "vp-sales" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        ARR Scaled (From → To)
                      </label>
                      <input
                        type="text"
                        value={arrScaled}
                        onChange={(e) => setArrScaled(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        Team Built &amp; Managed
                      </label>
                      <input
                        type="text"
                        value={teamManaged}
                        onChange={(e) => setTeamManaged(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        % Reps Hitting Quota
                      </label>
                      <input
                        type="text"
                        value={teamQuotaPct}
                        onChange={(e) => setTeamQuotaPct(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                  </div>
                )}

                {roleTrack === "gtm-engineer" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        Production Stack
                      </label>
                      <input
                        type="text"
                        value={gtmStack}
                        onChange={(e) => setGtmStack(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        Core System Shipped
                      </label>
                      <input
                        type="text"
                        value={systemsBuilt}
                        onChange={(e) => setSystemsBuilt(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                        Quantified Pipeline Impact
                      </label>
                      <input
                        type="text"
                        value={pipelineImpact}
                        onChange={(e) => setPipelineImpact(e.target.value)}
                        className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 pt-2">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55 block">
                    2-Sentence Proof (What you personally built or closed)
                  </label>
                  <textarea
                    rows={2}
                    value={highlightNote}
                    onChange={(e) => setHighlightNote(e.target.value)}
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111] resize-none focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* BLOCK 05: 360° VOUCH INVITES */}
              <div className="p-8 bg-white border border-black/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                    Block 05 · 360° Endorsements (Unlocks Verified Badge)
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/45">
                    LinkedIn-Verified Only
                  </span>
                </div>
                <p className="text-xs text-[#111111]/60 font-light leading-relaxed">
                  Enter the work email of a former manager, a cross-functional teammate (like an SE), or a buyer you sold to—or copy your vouch links after saving.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="email"
                    value={managerEmail}
                    onChange={(e) => setManagerEmail(e.target.value)}
                    placeholder="Former Manager Email"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2.5 text-xs text-[#111111]"
                  />
                  <input
                    type="email"
                    value={teammateEmail}
                    onChange={(e) => setTeammateEmail(e.target.value)}
                    placeholder="Teammate / SE Email"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2.5 text-xs text-[#111111]"
                  />
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="Customer / Buyer Email"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2.5 text-xs text-[#111111]"
                  />
                </div>
              </div>

              {/* BLOCK 06: NEXT ROLE & COMP FLOOR */}
              <div className="p-8 bg-white border border-black/10 space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  Block 06 · Next Role &amp; Comp Floor
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Min Base Salary
                    </label>
                    <input
                      type="text"
                      value={minBase}
                      onChange={(e) => setMinBase(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Target OTE Floor
                    </label>
                    <input
                      type="text"
                      value={targetOte}
                      onChange={(e) => setTargetOte(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#111111]/55">
                      Work Mode
                    </label>
                    <select
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2 text-sm text-[#111111]"
                    >
                      <option value="Remote Only">Remote Only</option>
                      <option value="Remote or Hybrid">Remote or Hybrid</option>
                      <option value="In-Office / Hybrid (SF/NYC/Austin)">
                        In-Office / Hybrid (SF/NYC/Austin)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-[#333333] text-white font-medium py-4 px-6 text-base transition-colors cursor-pointer"
              >
                Save Standardized Profile &amp; Generate My 360° Vouch Links →
              </button>
            </form>

            {/* RIGHT COLUMN: LIVE STANDARDIZED PROFILE PREVIEW (5 COLS, STICKY) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                  ● Live Dossier Preview
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-[#111111]/45">
                  {stealthMode ? "Stealth Shield Active" : "Public Identity"}
                </span>
              </div>

              <div className="bg-white border border-black/15 p-8 shadow-sm space-y-6">
                {/* Card Header */}
                <div className="border-b border-black/10 pb-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[10px] uppercase tracking-[0.15em] font-medium">
                      {ROLE_LABELS[roleTrack]}
                    </span>
                    <span className="px-2.5 py-0.5 border border-black/15 text-[#111111]/70 text-[10px] uppercase tracking-[0.15em]">
                      ✓ LinkedIn Deduped
                    </span>
                    {stealthMode && (
                      <span className="px-2.5 py-0.5 bg-[#f5f4ef] text-[#111111]/65 text-[10px] uppercase tracking-[0.15em]">
                        Stealth ON
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif text-[#111111]">
                    {stealthMode ? candidateHandle : fullName}
                  </h3>
                  <p className="text-xs text-[#111111]/55 font-light mt-1">
                    {stealthMode
                      ? `Currently at ${maskedCompanyLabel || "Confidential SaaS"}`
                      : `${maskedCompanyLabel} • ${cleanLinkedinSlug}`}
                  </p>
                </div>

                {/* Standardized Metrics Grid */}
                <div className="grid grid-cols-3 gap-px bg-black/10 border border-black/10">
                  {roleTrack === "vp-sales" ? (
                    <>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          ARR Scaled
                        </div>
                        <div className="text-sm font-serif text-[#111111] mt-1">{arrScaled}</div>
                      </div>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Team Scope
                        </div>
                        <div className="text-sm font-serif text-[#111111] mt-1">{teamManaged}</div>
                      </div>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Team Quota
                        </div>
                        <div className="text-sm font-serif text-[#111111] mt-1">{teamQuotaPct}</div>
                      </div>
                    </>
                  ) : roleTrack === "gtm-engineer" ? (
                    <>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Core Stack
                        </div>
                        <div className="text-xs font-serif text-[#111111] mt-1 truncate">
                          {gtmStack}
                        </div>
                      </div>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Impact
                        </div>
                        <div className="text-xs font-serif text-[#111111] mt-1 truncate">
                          {pipelineImpact}
                        </div>
                      </div>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Target ACV
                        </div>
                        <div className="text-xs font-serif text-[#111111] mt-1">
                          {acvBand.split(" ")[0]}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Attainment
                        </div>
                        <div className="text-sm font-serif text-[#111111] mt-1">{attainment}</div>
                      </div>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Deal Band
                        </div>
                        <div className="text-sm font-serif text-[#111111] mt-1">
                          {acvBand.split(" ")[0]}
                        </div>
                      </div>
                      <div className="bg-[#fcfaf8] p-3.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-[#111111]/45">
                          Pipeline Mix
                        </div>
                        <div className="text-sm font-serif text-[#111111] mt-1">
                          {pipelineMix.split(" ")[0]} Outbound
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Environment Tags */}
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45">
                    Standardized Environment &amp; Buyer Fit
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stages.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-[#fcfaf8] border border-black/10 text-[11px] text-[#111111]/75"
                      >
                        {s}
                      </span>
                    ))}
                    <span className="px-2.5 py-1 bg-[#fcfaf8] border border-black/10 text-[11px] text-[#111111]/75">
                      Cycle: {salesCycle}
                    </span>
                    <span className="px-2.5 py-1 bg-[#fcfaf8] border border-black/10 text-[11px] text-[#111111]/75">
                      {territoryType}
                    </span>
                    {buyers.map((b) => (
                      <span
                        key={b}
                        className="px-2.5 py-1 bg-[#f5f4ef] border border-black/15 text-[11px] text-[#111111] font-medium"
                      >
                        Buyer: {b.split(" (")[0]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Proof Summary */}
                <div className="p-4 bg-[#fcfaf8] border border-black/10">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                    Verified Track Record Summary
                  </div>
                  <p className="text-xs text-[#111111]/80 font-light leading-relaxed">
                    {highlightNote}
                  </p>
                </div>

                {/* 360 Vouch Slots */}
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 flex items-center justify-between">
                    <span>360° Vouch Slots (LinkedIn Verified)</span>
                    <span>3 Slots</span>
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-black/10 border border-black/10">
                    {[
                      { role: "Former Boss", active: Boolean(managerEmail) },
                      { role: "Peer / SE", active: Boolean(teammateEmail) },
                      { role: "Buyer Sold To", active: Boolean(buyerEmail) },
                    ].map((slot) => (
                      <div
                        key={slot.role}
                        className={`p-3 text-center ${
                          slot.active ? "bg-[#f5f4ef] text-[#111111]" : "bg-[#fcfaf8] text-[#111111]/50"
                        }`}
                      >
                        <div className="text-[11px] font-medium">{slot.role}</div>
                        <div className="text-[10px] font-light mt-0.5">
                          {slot.active ? "Invite Queued ✓" : "Link on Save"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Comp & Blocked Domains */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#111111]/60">
                  <span>
                    Floor: <strong className="text-[#111111]">{minBase} Base / {targetOte} OTE</strong>
                  </span>
                  <span>{workMode}</span>
                </div>
                {stealthMode && blockedDomains && (
                  <div className="px-3.5 py-2 bg-[#f5f4ef] border border-black/10 text-[11px] text-[#111111]/60 flex items-center justify-between">
                    <span>Shielded from domains:</span>
                    <span className="font-medium text-[#111111] truncate max-w-[190px]">
                      {blockedDomains}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

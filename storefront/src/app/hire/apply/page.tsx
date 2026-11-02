"use client";

import { useState } from "react";
import Link from "next/link";

export default function HireApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Standardized 6-Block Role Configuration
  const [roleTrack, setRoleTrack] = useState("Founding Account Executive");
  const [stage, setStage] = useState("Series A ($2M–$10M ARR)");
  const [acvBand, setAcvBand] = useState("$50K–$150K (Mid-Market)");
  const [salesCycle, setSalesCycle] = useState("60–120 Days");
  const [buyerPersona, setBuyerPersona] = useState("Technical (CTO / VP Eng / Sec)");
  const [pipelineMix, setPipelineMix] = useState("70%+ Self-Sourced Outbound");
  const [compRange, setCompRange] = useState("$100K Base / $200K OTE");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-black/10 text-[#111111]/70 text-sm font-medium tracking-wide">
            The Bench Pass • $2,500/mo • $0 Placement Fee
          </div>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-[#111111] mb-4 leading-[1.08]">
            Unlock Your Shortlist
          </h1>
          <p className="text-lg text-[#111111]/60 max-w-xl mx-auto font-light leading-relaxed">
            Configure your role using the exact same 6 blocks our candidates use. We filter the Live Bench to match your spec so you can review standardized profiles, read published references, and request warm intros immediately.
          </p>
        </div>

        <div className="bg-white border border-black/10 p-8 md:p-12">
          {submitted ? (
            <div className="py-6 text-center space-y-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
                6-Block Role Spec Locked
              </div>
              <h2 className="text-3xl font-serif text-[#111111]">
                Your Matched Shortlist Is Ready for {company || "Your Team"}
              </h2>
              <p className="text-sm text-[#111111]/65 font-light max-w-md mx-auto leading-relaxed">
                We matched your spec (
                <strong className="text-[#111111]">
                  {roleTrack} • {acvBand} • {buyerPersona}
                </strong>
                ) against the Live Bench and sent your Bench Pass activation link to{" "}
                <strong className="text-[#111111]">{email}</strong>.
              </p>

              <div className="p-6 bg-[#fcfaf8] border border-black/10 max-w-lg mx-auto text-left text-xs space-y-2 text-[#111111]/75">
                <div className="uppercase tracking-[0.15em] text-[#111111]/45 font-medium mb-2">
                  Your 6-Block Shortlist Filter
                </div>
                <div>
                  • Track &amp; Stage: <strong className="text-[#111111]">{roleTrack}</strong> ({stage})
                </div>
                <div>
                  • Deal Mechanics: <strong className="text-[#111111]">{acvBand} • {salesCycle}</strong>
                </div>
                <div>
                  • Buyer &amp; Motion:{" "}
                  <strong className="text-[#111111]">{buyerPersona} • {pipelineMix}</strong>
                </div>
                <div>
                  • Comp Band: <strong className="text-[#111111]">{compRange}</strong>
                </div>
                <div>
                  • Pass Terms: <strong className="text-[#111111]">$2,500/mo Bench Pass • $0 Placement Fee</strong>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/portal/demo"
                  className="px-6 py-3.5 bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors"
                >
                  Browse Matching Profiles on the Live Bench →
                </Link>
                <Link
                  href="/"
                  className="text-xs uppercase tracking-[0.2em] text-[#111111]/60 hover:text-[#111111]"
                >
                  ← Return to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Bench Pass Summary Banner */}
              <div className="p-6 bg-[#fcfaf8] border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-1">
                    Included with Your Bench Pass
                  </div>
                  <div className="text-lg font-serif text-[#111111]">
                    Standardized Profiles + Published References + Unlimited Warm Intros
                  </div>
                </div>
                <div className="sm:text-right shrink-0">
                  <div className="text-xl font-serif text-[#111111]">$2,500/mo</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/50">
                    $0 Placement Fee • Cancel Anytime
                  </div>
                </div>
              </div>

              {/* STEP 1: STANDARDIZED 6-BLOCK ROLE SPEC */}
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium block">
                  01 · Your 6-Block Role Spec (Matches Candidate Profiles 1:1)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55">
                      Role Track
                    </label>
                    <select
                      value={roleTrack}
                      onChange={(e) => setRoleTrack(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                    >
                      <option value="Founding Account Executive">Founding Account Executive</option>
                      <option value="Mid-Market / Enterprise AE">Mid-Market / Enterprise AE</option>
                      <option value="VP of Sales / Head of Sales">VP of Sales / Head of Sales</option>
                      <option value="GTM Engineer / RevOps">GTM Engineer / RevOps</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55">
                      Your Company Stage
                    </label>
                    <select
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                    >
                      <option value="Seed (<$2M ARR)">Seed (&lt;$2M ARR)</option>
                      <option value="Series A ($2M–$10M ARR)">Series A ($2M–$10M ARR)</option>
                      <option value="Series B ($10M–$30M ARR)">Series B ($10M–$30M ARR)</option>
                      <option value="Series C+ ($30M+ ARR)">Series C+ ($30M+ ARR)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55">
                      Target Deal Size (ACV)
                    </label>
                    <select
                      value={acvBand}
                      onChange={(e) => setAcvBand(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                    >
                      <option value="<$15K (High Velocity)">&lt;$15K (High Velocity)</option>
                      <option value="$15K–$50K (SMB / Lower MM)">$15K–$50K (SMB / Lower MM)</option>
                      <option value="$50K–$150K (Mid-Market)">$50K–$150K (Mid-Market)</option>
                      <option value="$150K–$500K+ (Enterprise)">$150K–$500K+ (Enterprise)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55">
                      Expected Sales Cycle
                    </label>
                    <select
                      value={salesCycle}
                      onChange={(e) => setSalesCycle(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                    >
                      <option value="<30 Days">&lt;30 Days</option>
                      <option value="30–60 Days">30–60 Days</option>
                      <option value="60–120 Days">60–120 Days</option>
                      <option value="120–180+ Days">120–180+ Days</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55">
                      Primary Buyer Persona
                    </label>
                    <select
                      value={buyerPersona}
                      onChange={(e) => setBuyerPersona(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                    >
                      <option value="Technical (CTO / VP Eng / Sec)">
                        Technical (CTO / VP Eng / Sec)
                      </option>
                      <option value="Finance & Ops (CFO / COO)">Finance &amp; Ops (CFO / COO)</option>
                      <option value="GTM Leaders (CRO / VP Sales / CMO)">
                        GTM Leaders (CRO / VP Sales / CMO)
                      </option>
                      <option value="HR / Legal / Departmental">HR / Legal / Departmental</option>
                      <option value="Founders / SMB Owners">Founders / SMB Owners</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55">
                      Pipeline Motion Required
                    </label>
                    <select
                      value={pipelineMix}
                      onChange={(e) => setPipelineMix(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                    >
                      <option value="70%+ Self-Sourced Outbound">70%+ Self-Sourced Outbound</option>
                      <option value="50/50 Outbound & Inbound">50/50 Outbound &amp; Inbound</option>
                      <option value="Mostly Inbound / PLG-Assist">Mostly Inbound / PLG-Assist</option>
                      <option value="Named Enterprise / Expansion">Named Enterprise / Expansion</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55">
                      Target Base / OTE Range
                    </label>
                    <input
                      type="text"
                      required
                      value={compRange}
                      onChange={(e) => setCompRange(e.target.value)}
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] text-[#111111]/55">
                      Any Must-Haves (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Sold devtools from Seed to Series A"
                      className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: YOUR DETAILS */}
              <div className="space-y-4 pt-6 border-t border-black/10">
                <label className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium block">
                  02 · Where Should We Unlock Your Shortlist?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company Name"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                  />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work Email"
                    className="w-full bg-[#fcfaf8] border border-black/15 px-3.5 py-2.5 text-sm text-[#111111]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-[#333333] text-white font-medium py-4 px-6 text-base transition-colors cursor-pointer"
              >
                Unlock Matched Shortlist &amp; Bench Pass →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

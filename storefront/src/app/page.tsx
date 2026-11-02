"use client";

import Link from "next/link";

export default function SalesAutonomyLandingPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] font-sans">
      
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-8 px-4 py-1.5 rounded-full border border-black/10 text-[#111111]/70 text-sm font-medium tracking-wide">
            Standardized GTM Profiles &amp; Published References
          </div>

          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8 leading-[1.08] text-[#111111]">
            The standardized profile.
            <br />
            <span className="text-[#111111]/60 italic font-light">
              The verified references. Nothing else.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#111111]/65 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            A symmetrical marketplace for Founding AEs, Enterprise Sellers, VPs of Sales, and GTM Engineers. Candidates publish a standardized 6-block profile and verified references. Hiring companies publish a standardized 6-block role profile and verified reverse references—before Call #1.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/portal/demo"
              className="px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white font-medium transition-colors text-base w-full sm:w-auto"
            >
              Browse the Live Bench
            </Link>
            <Link
              href="/hire/apply"
              className="px-8 py-4 bg-transparent border border-black/20 hover:border-black hover:bg-black/5 text-[#111111] font-medium transition-colors text-base w-full sm:w-auto"
            >
              Get a Bench Pass ($0 Placement Fee)
            </Link>
            <Link
              href="/academy/apply"
              className="px-8 py-4 bg-white border border-black/10 hover:border-black/40 text-[#111111]/80 hover:text-[#111111] font-medium transition-colors text-base w-full sm:w-auto"
            >
              For Candidates: Build Stealth Profile
            </Link>
          </div>

          {/* 4 Editorial Proof Metrics */}
          <div className="mt-24 pt-12 border-t border-black/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-2">
                  6 Blocks
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#111111]/50 font-medium">
                  Standardized Per Profile
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-2">
                  360°
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#111111]/50 font-medium">
                  Published References on Profile
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-2">
                  100%
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#111111]/50 font-medium">
                  Stealth &amp; Domain-Shielded
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111] mb-2">
                  $0
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.15em] text-[#111111]/50 font-medium">
                  Back-End Commission Fee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THREE PILLARS (Books-style Hairline Grid) ────────── */}
      <section className="py-24 px-6 border-t border-black/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/40 font-medium mb-3">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111]">
              Two Signals That Actually Matter.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
            {[
              {
                num: "01 · Standardized 6-Block Profiles",
                title: "Apples-to-Apples on Both Sides",
                tagline: "Candidates & Hiring Companies",
                desc: "Every candidate is normalized across ARR stage scaled, ACV, attainment, pipeline mix, buyer persona, and comp floor. Every hiring company publishes an identical 6-block role profile showing real team quota attainment, inbound/outbound split, runway, and OTE."
              },
              {
                num: "02 · Published 360° References",
                title: "Verified Before Call #1",
                tagline: "Bosses, teammates & customers",
                desc: "Candidates publish LinkedIn-verified references from former VPs of Sales, Solutions Engineers, and buyers. Hiring companies publish reverse references from the Founder/VP, a current rep on the floor, and a paying customer."
              },
              {
                num: "03 · The Bench Pass",
                title: "Instant Shortlist + Warm Intros",
                tagline: "Zero back-end placement fees",
                desc: "Browse the anonymized bench for free. Activate a Bench Pass to publish your candidate-facing Company & Role Profile, filter your matched shortlist, and send double-opt-in warm intro requests."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#fcfaf8] p-10 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-4">
                    {item.num}
                  </div>
                  <h3 className="text-3xl font-serif text-[#111111] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#111111]/45 font-medium mb-6">
                    {item.tagline}
                  </p>
                  <p className="text-[#111111]/65 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SAMPLE STANDARDIZED CARD + PUBLISHED REFERENCES ──── */}
      <section className="py-24 px-6 border-t border-black/10 bg-[#f5f4ef]/60">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/40 font-medium mb-3">
                Inside Every Profile
              </div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111]">
                The Profile + The Published References
              </h2>
            </div>
            <Link
              href="/portal/demo"
              className="text-sm font-medium text-[#111111] underline underline-offset-4 hover:text-[#d9534f]"
            >
              Browse all candidates on the Live Bench →
            </Link>
          </div>

          {/* Sample Candidate Dossier Card */}
          <div className="bg-white border border-black/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-black/10">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-3 py-1 bg-[#111111] text-white text-[11px] uppercase tracking-[0.15em] font-medium">
                    Founding / Mid-Market AE
                  </span>
                  <span className="px-3 py-1 border border-black/15 text-[#111111]/70 text-[11px] uppercase tracking-[0.15em]">
                    ✓ 1-of-1 LinkedIn Verified
                  </span>
                  <span className="px-3 py-1 bg-[#f5f4ef] text-[#111111]/60 text-[11px] uppercase tracking-[0.15em]">
                    Stealth Active • Comp Floor: $100K Base / $200K OTE
                  </span>
                </div>
                <h3 className="text-3xl font-serif text-[#111111] mt-2">
                  Candidate #JM-204{" "}
                  <span className="text-[#111111]/50 italic font-light text-2xl">
                    — Currently at Series B Cybersecurity SaaS
                  </span>
                </h3>
              </div>

              <Link
                href="/hire/apply"
                className="px-6 py-3.5 bg-[#111111] hover:bg-[#333333] text-white text-sm font-medium transition-colors self-start md:self-center shrink-0"
              >
                Request Warm Intro →
              </Link>
            </div>

            {/* Part 1: The Standardized 6-Block Profile */}
            <div className="mt-8 mb-3 text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium">
              Part 01 · Standardized 6-Block Operator Profile
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-black/10 border border-black/10 mb-10">
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  01 · Stage Scaled
                </div>
                <div className="text-lg font-serif text-[#111111]">$1.4M → $8M ARR</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  02 · Deal Band (ACV)
                </div>
                <div className="text-lg font-serif text-[#111111]">$50K–$150K ($95K)</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  03 · Attainment
                </div>
                <div className="text-lg font-serif text-[#111111]">142% Avg (3 Yrs)</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  04 · Pipeline Mix
                </div>
                <div className="text-lg font-serif text-[#111111]">65% Self-Sourced</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  05 · Primary Buyer
                </div>
                <div className="text-lg font-serif text-[#111111]">VP Eng / CTO / CISO</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  06 · Cycle &amp; Territory
                </div>
                <div className="text-lg font-serif text-[#111111]">60–90d • Greenfield</div>
              </div>
            </div>

            {/* Part 2: Published References */}
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
              Part 02 · Published References (Verified via LinkedIn + Work Email)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
              {[
                {
                  who: "Former VP of Sales (Direct Manager)",
                  meta: "Managed Jordan for 9 quarters",
                  quote:
                    "Jordan was my #1 rep for 9 straight quarters. She built her own target list from scratch and never waited on marketing for pipeline."
                },
                {
                  who: "Lead Solutions Engineer (Teammate)",
                  meta: "Partnered on 40+ technical evaluations",
                  quote:
                    "Best AE I've partnered with. She runs real technical discovery on Call #1 and never pulls me into unqualified demos."
                },
                {
                  who: "VP of Engineering (Customer Who Bought)",
                  meta: "Signed $110K annual agreement",
                  quote:
                    "She understood our architecture bottleneck better than any vendor we evaluated and helped me build the ROI case for our CFO."
                }
              ].map((end, i) => (
                <div key={i} className="bg-[#fcfaf8] p-8 flex flex-col justify-between">
                  <p className="text-base font-serif italic text-[#111111]/85 leading-relaxed mb-6">
                    &ldquo;{end.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-medium text-[#111111]">{end.who}</div>
                      <div className="text-[11px] text-[#111111]/50 mt-0.5">{end.meta}</div>
                    </div>
                    <span className="uppercase tracking-widest text-[10px] text-[#111111]/55 shrink-0">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Candidate-Facing Company & Role Dossier Card */}
          <div className="bg-white border border-black/10 p-8 md:p-12 mt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-black/10">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-3 py-1 bg-[#111111] text-white text-[11px] uppercase tracking-[0.15em] font-medium">
                    Candidate-Facing Company &amp; Role Profile
                  </span>
                  <span className="px-3 py-1 border border-black/15 text-[#111111]/70 text-[11px] uppercase tracking-[0.15em]">
                    ✓ Founder &amp; Cap Table Verified
                  </span>
                  <span className="px-3 py-1 bg-[#f5f4ef] text-[#111111]/60 text-[11px] uppercase tracking-[0.15em]">
                    $165K Base / $330K OTE + 0.35% Equity
                  </span>
                </div>
                <h3 className="text-3xl font-serif text-[#111111] mt-2">
                  Role #CO-101 · Founding AE (Seat #1){" "}
                  <span className="text-[#111111]/50 italic font-light text-2xl">
                    — Series A Cloud Security SaaS ($2.8M ARR)
                  </span>
                </h3>
              </div>

              <Link
                href="/hire/apply"
                className="px-6 py-3.5 border border-black/20 hover:border-black text-[#111111] text-sm font-medium transition-colors self-start md:self-center shrink-0"
              >
                Build Your Company Profile →
              </Link>
            </div>

            {/* Part 1: The Standardized 6-Block Company & Role Profile */}
            <div className="mt-8 mb-3 text-xs uppercase tracking-[0.2em] text-[#111111]/45 font-medium">
              Part 01 · Standardized 6-Block Company &amp; Role Profile
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-black/10 border border-black/10 mb-10">
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  01 · Stage &amp; Runway
                </div>
                <div className="text-lg font-serif text-[#111111]">$2.8M ARR • 34 Mos</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  02 · Deal Band (ACV)
                </div>
                <div className="text-lg font-serif text-[#111111]">$45K–$120K ($68K)</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  03 · Quota &amp; Team Math
                </div>
                <div className="text-lg font-serif text-[#111111]">$900K Quota (3.6x)</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  04 · Pipeline Reality
                </div>
                <div className="text-lg font-serif text-[#111111]">45% Inb / 55% Outb</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  05 · Primary Buyer
                </div>
                <div className="text-lg font-serif text-[#111111]">CISO / VP Infra</div>
              </div>
              <div className="bg-[#fcfaf8] p-5">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#111111]/45 mb-1">
                  06 · Cycle &amp; Ramp
                </div>
                <div className="text-lg font-serif text-[#111111]">45–75d • 3m Draw</div>
              </div>
            </div>

            {/* Part 2: Published Reverse References */}
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium">
              Part 02 · Published Reverse References (Verified Team &amp; Customer Vouches)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
              {[
                {
                  who: "Co-Founder & CEO (Hiring Manager)",
                  meta: "Closed first 42 customers ($2.8M ARR)",
                  quote:
                    "I've personally closed our first $2.8M in ARR and documented every discovery call. You're walking into warm enterprise security evaluations and a 14-day POC that converts at 68%."
                },
                {
                  who: "Founding Staff Engineer (POC Partner)",
                  meta: "Joins technical evaluations directly",
                  quote:
                    "We deploy into the customer's AWS environment in 20 minutes. When a prospect asks for a custom compliance integration on a live deal, we ship it the same week."
                },
                {
                  who: "CISO at Series C FinTech (Customer)",
                  meta: "Signed $95K annual contract",
                  quote:
                    "Fastest security vendor evaluation we ran all year. Clear ROI in week one of the POC—no vaporware."
                }
              ].map((end, i) => (
                <div key={i} className="bg-[#fcfaf8] p-8 flex flex-col justify-between">
                  <p className="text-base font-serif italic text-[#111111]/85 leading-relaxed mb-6">
                    &ldquo;{end.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-medium text-[#111111]">{end.who}</div>
                      <div className="text-[11px] text-[#111111]/50 mt-0.5">{end.meta}</div>
                    </div>
                    <span className="uppercase tracking-widest text-[10px] text-[#111111]/55 shrink-0">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE BENCH PASS (One Simple Offer) ────────────────── */}
      <section className="py-24 px-6 border-t border-black/10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-black/10 p-10 md:p-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-black/10">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
                  The Bench Pass • Simple Flat Access
                </div>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111]">
                  One Pass. Unlimited Intros. $0 Placement Fee.
                </h2>
                <p className="text-lg text-[#111111]/65 font-light mt-4 max-w-2xl leading-relaxed">
                  No 25% headhunter commissions. No 6-week retainers. Configure your 6-Block Role Spec in 60 seconds, unlock your matched shortlist from our Live Bench, and request direct warm intros to candidates whose references are already verified.
                </p>
              </div>
              <div className="shrink-0 md:text-right">
                <div className="text-4xl md:text-5xl font-serif text-[#111111]">$2,500</div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/50 mt-1">
                  Per Month • Cancel Anytime
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
              {[
                "Instant access to all standardized 6-Block Candidate Profiles & published references",
                "1:1 shortlist filtering matched to your ARR stage, ACV band, buyer persona, and OTE",
                "1-click double-opt-in warm introductions (candidate identity unlocks on approval)",
                "Hire 1, 2, or 5 operators with $0 back-end placement commission"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-[#111111]/80 font-light">
                  <span className="text-[#111111] font-medium mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/50">
                Tracks Included: Founding AE · Mid-Market &amp; Enterprise AE · VP of Sales · GTM Engineer
              </div>
              <Link
                href="/hire/apply"
                className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white text-sm font-medium text-center transition-colors shrink-0"
              >
                Configure Role &amp; Unlock the Bench →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: TWO SELF-SERVE PATHS (Companies & Candidates) ────── */}
      <section className="py-24 px-6 border-t border-black/10 bg-[#f5f4ef]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
            <div className="bg-[#fcfaf8] p-10 md:p-14 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-3">
                  For Founders &amp; Sales Leaders
                </div>
                <h3 className="text-3xl font-serif text-[#111111] mb-4">
                  Unlock Your Shortlist in 60 Seconds
                </h3>
                <p className="text-[#111111]/65 font-light leading-relaxed mb-8">
                  Set your role track, ACV band, sales cycle, buyer persona, and comp range using our standardized 6-block intake. Immediately see matching profiles and published references.
                </p>
              </div>
              <Link
                href="/hire/apply"
                className="inline-block w-full text-center py-4 bg-[#111111] text-white hover:bg-[#333333] font-medium transition-colors"
              >
                Get a Bench Pass →
              </Link>
            </div>

            <div className="bg-[#fcfaf8] p-10 md:p-14 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/50 font-medium mb-3">
                  For Sellers, Leaders &amp; GTM Engineers
                </div>
                <h3 className="text-3xl font-serif text-[#111111] mb-4">
                  Build Your Profile &amp; Publish References
                </h3>
                <p className="text-[#111111]/65 font-light leading-relaxed mb-8">
                  Drop your resume to auto-fill your 6-block profile in 10 seconds, shield your current employer&apos;s domain, and invite former managers, teammates, and customers to publish verified references to your card.
                </p>
              </div>
              <Link
                href="/academy/apply"
                className="inline-block w-full text-center py-4 border border-black/20 hover:border-black hover:bg-black/5 text-[#111111] font-medium transition-colors"
              >
                Build My Stealth Profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

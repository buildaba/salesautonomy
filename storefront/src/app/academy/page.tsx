"use client";

import Link from "next/link";

const tracks = [
  {
    title: "Founding Account Executives",
    tagline: "Seed & Series A ($0 → $10M ARR)",
    description:
      "First 1–3 sellers working directly with technical founders. Built for self-sourced outbound hunters who want meaningful early equity and $160K–$240K+ OTE.",
  },
  {
    title: "Mid-Market & Enterprise AEs",
    tagline: "Series A to Series C ($5M → $50M+ ARR)",
    description:
      "$50K–$250K+ ACV multi-threaded technical and executive sales. Evaluated on verified multi-year quota attainment, deal mechanics, and $190K–$320K+ OTE.",
  },
  {
    title: "VPs of Sales & Heads of Sales",
    tagline: "Seed to Series C Leadership",
    description:
      "Player-coach and scale leaders who have built repeatable revenue teams. Evaluated on team quota distribution, rep retention, and ARR growth.",
  },
  {
    title: "GTM Engineers & RevOps",
    tagline: "Series A to Series C Systems",
    description:
      "Builders owning Clay, CRM architecture, enrichment, and outbound automation. Evaluated on production workflows shipped and pipeline generated.",
  },
];

export default function CandidateNetworkPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111]">
      {/* Hero Section (Matching localhost:3001/books) */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="inline-block mb-8 px-4 py-1.5 rounded-full border border-black/10 text-[#111111]/70 text-sm font-medium tracking-wide">
          For Candidates
        </div>
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-8 leading-[1.08]">
          One Standardized Profile.
          <br />
          <span className="text-[#111111]/60 italic font-light">
            100% Stealth Until You Say Yes.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[#111111]/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Resumes bury your actual deal numbers and put your privacy at risk. Auto-fill your standardized Seller Profile in 10 seconds, block your current employer&apos;s domain, and let vetted companies request introductions that beat your comp floor.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/academy/apply"
            className="px-8 py-4 bg-[#111111] hover:bg-[#333333] text-white font-medium transition-colors text-base w-full sm:w-auto"
          >
            Build My Stealth Profile (2 Mins)
          </Link>
        </div>
      </section>

      {/* 3 Pillars Section (Books-style hairline grid) */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
          {[
            {
              label: "01 · Privacy First",
              title: "Stealth Mode & Domain Blocking",
              tagline: "Hidden from your current employer",
              desc: "Your name and current company stay masked (e.g., 'Candidate #JM-204 • Series B Security'). Add your employer or investor domains to your blocklist so they never see your card. You see the company, role, and comp range before deciding to reveal your name.",
            },
            {
              label: "02 · Standardized Context",
              title: "Apples-to-Apples Deal Numbers",
              tagline: "10-second resume auto-fill",
              desc: "Hiring managers don't have to guess if your quota was inbound or self-sourced. Our 6-block profile normalizes your ACV band, sales cycle, buyer persona, and outbound split so founders immediately see your real value.",
            },
            {
              label: "03 · Anti-Gaming",
              title: "LinkedIn & 360° Verified",
              tagline: "1 LinkedIn ID = 1 Profile",
              desc: "Every profile is anchored to one unique LinkedIn URL. When you invite a former boss, Solutions Engineer, or customer to vouch for you, they verify via LinkedIn and work email—so real performers never compete with fake resumes.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#fcfaf8] p-10 md:p-12 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-4">
                  {item.label}
                </div>
                <h2 className="text-3xl font-serif text-[#111111] mb-2 leading-snug">
                  {item.title}
                </h2>
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
      </section>

      {/* 4 Tracks We Standardize */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-black/10">
        <div className="mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-[#111111]/40 font-medium mb-3">
            Role Taxonomy
          </div>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[#111111]">
            Four Tracks We Standardize &amp; Place
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
          {tracks.map((track, idx) => (
            <div key={idx} className="bg-[#fcfaf8] p-10 md:p-12 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#111111]/45 font-medium mb-3">
                  {track.tagline}
                </p>
                <h3 className="text-3xl font-serif text-[#111111] mb-4 leading-snug">
                  {track.title}
                </h3>
                <p className="text-[#111111]/65 font-light leading-relaxed mb-10">
                  {track.description}
                </p>
              </div>
              <Link
                href="/academy/apply"
                className="block w-full text-center py-3.5 border border-black/20 hover:border-black hover:bg-black/5 text-[#111111] font-medium transition-colors"
              >
                Build Profile for This Track
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA (Matching localhost:3001/books Bulk Orders section) */}
      <section className="py-24 px-6 border-t border-black/10 bg-[#f5f4ef]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-6 text-[#111111]">
            Always Free for Candidates. Always Confidential.
          </h2>
          <p className="text-lg text-[#111111]/70 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            We are paid by the companies doing the hiring. Nothing is ever sent to an employer without your explicit approval.
          </p>
          <Link
            href="/academy/apply"
            className="inline-block px-8 py-4 bg-[#111111] text-white hover:bg-[#333333] font-medium transition-colors"
          >
            Build My Standardized Profile →
          </Link>
        </div>
      </section>
    </div>
  );
}

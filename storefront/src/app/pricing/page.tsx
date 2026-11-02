import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "The Bench Pass — Sales Autonomy",
  description:
    "Unlock standardized 6-Block GTM candidate profiles, published LinkedIn-verified references, and unlimited warm introductions for one flat monthly pass with $0 placement fees.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#111111] pt-36 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 border-b border-black/10 pb-12">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#d9534f] mb-4">
            THE BENCH PASS
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.02] text-[#111111] max-w-4xl">
            The profile. The published references.{" "}
            <span className="italic font-light text-[#111111]/70">$0 placement fee.</span>
          </h1>
          <p className="text-xl font-serif text-[#111111]/70 max-w-2xl mt-6 leading-relaxed">
            Traditional agencies charge $35,000+ per hire to hand you unverified resumes. With a Bench Pass, you get direct access to our Live Bench of standardized 6-Block Candidate Profiles and their published, LinkedIn-verified references.
          </p>
        </div>

        {/* Single Clean Bench Pass Card */}
        <div className="bg-white border border-black/10 p-10 md:p-16 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d9534f]">
                  ALL-ACCESS SHORTLIST &amp; INTROS
                </span>
                <span className="px-3 py-1 bg-[#f5f4ef] border border-black/10 text-[10px] font-bold uppercase tracking-widest text-[#111111]">
                  $0 Back-End Commission
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-[#111111]">
                The Bench Pass
              </h2>
            </div>

            <div className="md:text-right">
              <div className="text-4xl md:text-5xl font-serif text-[#111111]">$2,500</div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/50 mt-1">
                Per Month • Cancel Anytime
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10 border-b border-black/10">
            {[
              "Instant shortlist filtered 1:1 to your 6-Block Role Spec (Stage, ACV, Cycle, Buyer, Motion, Comp)",
              "Full access to every candidate's Standardized 6-Block Operator Profile",
              "Full access to published references verified via LinkedIn & work email (Managers, SEs & Buyers)",
              "Unlimited 1-click double-opt-in warm introductions (stealth identity unlocks on candidate approval)",
              "New matching candidates delivered to your shortlist in every Monday Drop",
              "Hire 1, 2, or 5 operators from the bench with $0 back-end placement commission",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-[#111111]/80 leading-relaxed">
                <Check className="w-4 h-4 text-[#d9534f] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/45">
                Roles Included on the Bench
              </div>
              <div className="text-sm font-medium text-[#111111] mt-1">
                Founding AE · Mid-Market &amp; Enterprise AE · VP of Sales · GTM Engineer
              </div>
            </div>
            <Link
              href="/hire/apply"
              className="px-8 py-4 bg-[#111111] text-[#fcfaf8] text-xs font-bold uppercase tracking-widest hover:bg-[#111111]/85 transition-colors inline-flex items-center justify-center gap-2 shrink-0"
            >
              Configure Role &amp; Activate Pass <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3-Box Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
          <div className="bg-[#fcfaf8] p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              01 · Standardized Profile
            </div>
            <h3 className="text-xl font-serif text-[#111111] mb-2">No Vague Resumes</h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Every candidate card shows exact ARR stage scaled, median ACV, attainment, outbound split, buyer persona, and minimum OTE required to move.
            </p>
          </div>
          <div className="bg-[#fcfaf8] p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              02 · Published References
            </div>
            <h3 className="text-xl font-serif text-[#111111] mb-2">Read Vouches Upfront</h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Instead of waiting until week 6 of your interview process to check references, read verified quotes from former bosses, teammates, and customers before Call #1.
            </p>
          </div>
          <div className="bg-[#fcfaf8] p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-[#d9534f] font-medium mb-2">
              03 · Always Free for Talent
            </div>
            <h3 className="text-xl font-serif text-[#111111] mb-2">100% Candidate Stealth</h3>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Candidates join for free, block their current employer&apos;s domain, and only reveal their identity when they approve your intro request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

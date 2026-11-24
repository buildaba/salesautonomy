'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Database,
  ShieldCheck,
  Sparkles,
  FileSpreadsheet,
  Webhook,
  Code2,
  Truck,
  HeartPulse,
  HardHat,
  Target,
  Clock,
} from 'lucide-react';
import { PowerTableExplorer } from '@/components/vault/PowerTableExplorer';

interface IndustryMarket {
  id: 'healthcare' | 'fleet' | 'contractors';
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  sourceLabel: string;
  cadence: string;
  totalEntities: string;
  avgDealValue: string;
  icon: React.ComponentType<{ className?: string }>;
  whoBuys: string;
  whatWeClean: string[];
  sampleTrigger: {
    entity: string;
    location: string;
    signal: string;
    buyerAction: string;
  };
}

const INDUSTRY_MARKETS: IndustryMarket[] = [
  {
    id: 'healthcare',
    tabLabel: '01 · Healthcare & Clinics',
    badge: 'Healthcare & Multi-Site Clinics',
    title: 'Reach clinic groups expanding locations or fixing inspection issues.',
    subtitle:
      'Apollo often lists a 14-clinic orthopedic group as 12 employees and hides the true owner. We group every branch under the real parent company, detect their live patient booking software, and flag new permits or Medicare inspection deadlines.',
    sourceLabel: 'Federal clinic registries, Medicare surveys & city permits',
    cadence: 'Updated Weekly',
    totalEntities: '142,800+ Clinic Groups',
    avgDealValue: '3 to 50+ Locations',
    icon: HeartPulse,
    whoBuys:
      'Healthcare SaaS, billing platforms, EHR vendors, medical equipment teams, and clinical staffing firms.',
    whatWeClean: [
      'Links every branch clinic back to the single parent group that signs contracts',
      'Finds the real clinic owner, COO, or CFO—never an outside billing firm',
      'Detects live patient booking software like Athenahealth, ModMed, and Dentrix',
      'Alerts reps when a group pulls a build-out permit or gets a 45-day Medicare deadline',
    ],
    sampleTrigger: {
      entity: 'Summit Orthopedic & Spine Partners',
      location: 'Frisco, TX · 14 Clinics · 184 Staff',
      signal: 'Filed a $1.42M surgical suite build-out permit while running Athenahealth',
      buyerAction: 'Call the COO and Managing Partner before the new clinic opens',
    },
  },
  {
    id: 'fleet',
    tabLabel: '02 · Trucking & Factories',
    badge: 'Trucking Fleets & Industrial Plants',
    title: 'Catch fleets before insurance cancels and plants after OSHA arrives.',
    subtitle:
      'Standard lead tools have no idea when a 118-truck carrier gets a 30-day insurance cancellation notice or an OSHA safety visit. We track federal fleet, safety, and plant filings daily and filter out 1-truck operators.',
    sourceLabel: 'DOT fleet insurance feeds, OSHA inspections & benefit filings',
    cadence: 'Updated Daily',
    totalEntities: '68,400+ Fleets & Plants',
    avgDealValue: '15–500+ Trucks or Multi-Plant',
    icon: Truck,
    whoBuys:
      'Commercial insurance brokers, fleet dashcam and ELD vendors, safety consultants, fuel cards, and industrial suppliers.',
    whatWeClean: [
      'Filters out 1-truck owner-operators so reps only call commercial fleets',
      'Catches 30-day truck insurance cancellation notices and 60-day renewal dates',
      'Flags newly opened OSHA safety inspections within days—not months later',
      'Strips outside accountants from filings so you reach the real CFO and Safety VP',
    ],
    sampleTrigger: {
      entity: 'Heartland Cold Logistics & Freight',
      location: 'Joliet, IL · 118 Trucks · 148 Staff',
      signal: 'Primary $1M fleet insurance policy set to cancel in 24 days',
      buyerAction: 'Reach the CFO and VP of Fleet Safety before coverage lapses',
    },
  },
  {
    id: 'contractors',
    tabLabel: '03 · Gov Contractors & Builders',
    badge: 'Government Contractors & Commercial Builders',
    title: 'Spot expiring federal registrations, re-bids, and $100K+ permits.',
    subtitle:
      'City permits and federal contract files hide behind project LLCs and agency codes. We tie every permit and expiring contract back to the real parent company, verified employee count, and executive buyer.',
    sourceLabel: 'Federal contractor records, contract awards & city building permits',
    cadence: 'Updated Daily',
    totalEntities: '94,200+ Active Contractors',
    avgDealValue: '$100K+ Permits & Federal Awards',
    icon: HardHat,
    whoBuys:
      'Commercial HVAC and construction suppliers, cybersecurity teams, bonding brokers, equipment rentals, and govcon advisors.',
    whatWeClean: [
      'Tracks federal contractor registrations expiring in the next 30, 60, or 90 days',
      'Flags active government contracts entering a 60-day re-bid window',
      'Matches local project LLCs on $100K+ commercial permits to the parent builder',
      'Delivers verified direct emails for the VP of Contracts, Procurement Lead, or CFO',
    ],
    sampleTrigger: {
      entity: 'Precision Aerospace & Defense Systems',
      location: 'Reston, VA · 215 Staff · $14.8M Active Awards',
      signal: 'Federal bidding registration expires in 26 days with active Air Force contracts',
      buyerAction: 'Contact the VP of Contracts before bidding eligibility lapses',
    },
  },
];

const WHY_SWITCH_CARDS = [
  {
    eyebrow: 'For Founders & Sales Leaders',
    title: 'Stop paying reps to clean spreadsheets',
    body: 'Your reps lose hours every week hunting down parent companies and guessing emails. We deliver a clean, ready-to-call account list every Monday morning.',
    cta: 'Browse live sample leads',
    href: '#live-explorer',
    icon: Target,
  },
  {
    eyebrow: 'Built for Accuracy',
    title: 'Official records always beat web scrapes',
    body: 'Other tools overwrite good facts with bad scrapes and list outside accountants as owners. We verify real executives straight from government filings.',
    cta: 'See how we check data',
    href: '/accuracy',
    icon: ShieldCheck,
  },
  {
    eyebrow: 'Protected Territories',
    title: 'Never oversold to 10,000 other reps',
    body: 'Big databases sell the exact same contact to thousands of buyers. We cap every regional territory at 5 active customers so your emails get answered.',
    cta: 'See plans and territory caps',
    href: '/pricing',
    icon: Clock,
  },
];

const FAQS = [
  {
    q: 'Why use Sales Autonomy instead of Apollo or ZoomInfo?',
    a: 'Apollo and ZoomInfo scrape social profiles and sell the same cold lists to thousands of reps. In healthcare, trucking, and construction, real buying triggers show up in public government filings weeks first. We clean those filings, match the parent company, and give you verified executive emails.',
  },
  {
    q: 'How do you keep email bounces under 2%?',
    a: 'We check every executive email right before you unlock it—not six months earlier. If more than 2% of your list ever bounces, we replace every bounced contact 2-for-1 on your next sync.',
  },
  {
    q: 'What does the 5-customer territory cap mean?',
    a: 'Only 5 active customers can subscribe to the same industry and region at one time. Once 5 seats fill, new buyers join a waitlist or pick another territory.',
  },
  {
    q: 'How does the data reach our sales team?',
    a: 'Pick whatever fits your workflow: a clean Monday spreadsheet, our live search portal, automatic sync into HubSpot, Salesforce, or Clay, or a direct API for your data team.',
  },
];

export default function HomePage() {
  const [activeIndustryId, setActiveIndustryId] = useState<IndustryMarket['id']>('healthcare');
  const activeMarket =
    INDUSTRY_MARKETS.find((market) => market.id === activeIndustryId) ?? INDUSTRY_MARKETS[0];

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413]">
      {/* 1. HERO — Clear, Simple, Deadline-First */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#6b665e] mb-4">
              For B2B Sales Teams &amp; Outbound Agencies · Updated Daily · &lt;2% Bounce Guarantee
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-[3.65rem] font-serif tracking-tight mb-5 leading-[1.08] text-[#141413] font-medium">
              Call buyers who have a deadline right now.
            </h1>

            <p className="text-base sm:text-lg text-[#5c5852] max-w-2xl mb-8 leading-relaxed">
              Apollo and ZoomInfo tell you who exists, not who needs to buy. We watch public
              government filings every day—insurance cancellations, safety inspections, clinic
              expansions, and expiring contracts. Your reps get the exact executive to call before
              the deadline hits.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
              <a
                href="#live-explorer"
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl text-sm font-medium bg-[#141413] text-[#faf9f5] hover:bg-[#2a2927] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Browse Live Sample Leads
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/pilot"
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl text-sm font-medium bg-white border border-black/14 hover:bg-[#f0eee6] text-[#141413] transition-colors flex items-center justify-center gap-2"
              >
                Start a 7-Day Pilot — $1,950
              </Link>
            </div>
          </div>

          {/* 4 Plain-English Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-black/10">
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">7 Days</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                To get 2,500 ready-to-call accounts matched to your CRM
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">305,000+</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Multi-site clinics, fleets, factories, and contractors tracked
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">&lt; 2%</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Email bounce guarantee with 2-for-1 credit replacement
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">Max 5 Seats</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Per industry and region so your leads stay uncrowded
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 INDUSTRIES WE COVER */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs font-medium text-[#6b665e] mb-2">
                Three Real-World Markets Standard Tools Miss
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium">
                Pick your industry. Get buyers with active deadlines.
              </h2>
            </div>

            <div className="inline-flex flex-wrap p-1 rounded-xl bg-white border border-black/10 self-start">
              {INDUSTRY_MARKETS.map((market) => (
                <button
                  key={market.id}
                  type="button"
                  onClick={() => setActiveIndustryId(market.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    activeIndustryId === market.id
                      ? 'bg-[#141413] text-[#faf9f5]'
                      : 'text-[#5c5852] hover:text-[#141413]'
                  }`}
                >
                  {market.tabLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 bg-white border border-black/10 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-1 rounded-md">
                    <Sparkles className="w-3 h-3" />
                    {activeMarket.badge}
                  </span>
                  <span className="text-xs text-[#6b665e] font-medium">
                    {activeMarket.cadence}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#141413] font-medium mb-3 leading-snug">
                  {activeMarket.title}
                </h3>

                <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed mb-6">
                  {activeMarket.subtitle}
                </p>

                <div className="p-4 rounded-xl bg-[#faf9f5] border border-black/8 mb-6">
                  <div className="text-xs font-medium text-[#141413] mb-1">Who Buys This</div>
                  <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                    {activeMarket.whoBuys}
                  </p>
                </div>

                <div className="text-xs font-medium text-[#6b665e] mb-3">
                  What we clean before your reps see a single row:
                </div>
                <ul className="space-y-2.5 mb-6">
                  {activeMarket.whatWeClean.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-[#141413] leading-relaxed"
                    >
                      <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-black/8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-[#6b665e]">Official Public Sources</div>
                  <div className="text-xs font-medium text-[#141413] mt-0.5">
                    {activeMarket.sourceLabel}
                  </div>
                </div>
                <a
                  href="#live-explorer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] hover:text-[#2e6f40] transition-colors"
                >
                  See sample accounts below
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                  <div className="text-xs text-[#6b665e] mb-1">Verified Accounts</div>
                  <div className="text-lg sm:text-xl font-serif text-[#141413] font-medium">
                    {activeMarket.totalEntities}
                  </div>
                </div>
                <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                  <div className="text-xs text-[#6b665e] mb-1">Typical Buyer Size</div>
                  <div className="text-lg sm:text-xl font-serif text-[#141413] font-medium">
                    {activeMarket.avgDealValue}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex-1 flex flex-col justify-between shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-medium text-[#6b665e]">
                      Real Trigger Example
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded-md">
                      <Check className="w-3 h-3" />
                      Email Verified
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf9f5] border border-black/8 space-y-3 mb-5">
                    <div>
                      <div className="text-[11px] text-[#6b665e]">Company</div>
                      <div className="text-sm font-medium text-[#141413]">
                        {activeMarket.sampleTrigger.entity}
                      </div>
                      <div className="text-xs text-[#6b665e] mt-0.5">
                        {activeMarket.sampleTrigger.location}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-black/8">
                      <div className="text-[11px] text-[#6b665e]">What Just Happened</div>
                      <div className="text-xs font-medium text-[#141413] mt-0.5">
                        {activeMarket.sampleTrigger.signal}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-black/8">
                      <div className="text-[11px] text-[#6b665e]">Your Next Move</div>
                      <div className="text-xs text-[#2e6f40] font-medium mt-0.5">
                        {activeMarket.sampleTrigger.buyerAction}
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/pilot"
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#141413] text-[#faf9f5] text-xs sm:text-sm font-medium hover:bg-[#2a2927] transition-colors flex items-center justify-center gap-2"
                >
                  Start 7-Day Pilot ($1,950)
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE SAMPLE EXPLORER */}
      <section id="live-explorer" className="py-20 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Live Sample Explorer · 12 Verified Accounts Across 3 Industries
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Inspect real accounts before you spend a dollar.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Click any company to see why they need to buy right now, view the official filing
              proof, and unlock verified decision-maker contact info.
            </p>
          </div>

          <PowerTableExplorer />
        </div>
      </section>

      {/* 4. WHY SALES TEAMS SWITCH + 4 WAYS TO RECEIVE LEADS */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Built for Busy Sales Teams
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Clean accounts. Four easy ways to use them.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Whether your reps work from a Monday spreadsheet or your ops team syncs leads straight
              into HubSpot, Salesforce, or Clay, every account arrives clean and ready to call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {WHY_SWITCH_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group bg-white border border-black/10 hover:border-black/25 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-[0_1px_2px_rgba(20,20,19,0.03)] hover:shadow-[0_6px_20px_rgba(20,20,19,0.06)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-medium text-[#6b665e] px-2.5 py-1 rounded-md bg-[#faf9f5] border border-black/8">
                        {card.eyebrow}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#f0eee6] border border-black/8 flex items-center justify-center text-[#2e6f40]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-serif text-[#141413] font-medium mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#5c5852] leading-relaxed mb-6">{card.body}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] group-hover:translate-x-0.5 transition-transform">
                    {card.cta}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: FileSpreadsheet,
                title: '1. Monday Spreadsheet',
                desc: 'Clean CSV files with this week’s new triggers sent every Monday morning.',
              },
              {
                icon: Database,
                title: '2. Live Search Portal',
                desc: 'Filter by state, size, or deadline and unlock verified contacts on demand.',
              },
              {
                icon: Webhook,
                title: '3. Direct CRM Sync',
                desc: 'Send fresh accounts straight to HubSpot, Salesforce, or Clay without overwriting rep notes.',
              },
              {
                icon: Code2,
                title: '4. Developer API',
                desc: 'Clean REST and MCP endpoints for RevOps teams, data warehouses, and AI workflows.',
              },
            ].map((lane) => {
              const Icon = lane.icon;
              return (
                <div
                  key={lane.title}
                  className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#f0eee6] border border-black/8 flex items-center justify-center text-[#2e6f40] mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-medium text-[#141413] mb-1">{lane.title}</div>
                  <p className="text-xs text-[#5c5852] leading-relaxed">{lane.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SIMPLE PRICING PREVIEW */}
      <section className="py-24 border-t border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Simple, Transparent Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Test us for 7 days first. Scale when your reps book meetings.
            </h2>
            <p className="text-base text-[#5c5852]">
              No long-term contract needed to prove data quality. Every plan includes our 5-customer
              territory cap and &lt;2% email bounce guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Option 1: 7-Day Pilot / Self-Serve */}
            <div className="p-7 sm:p-9 rounded-2xl bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-[#6b665e]">
                    7-Day Territory Pilot
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-[#f0eee6] text-[#141413]">
                    Best Place to Start
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-serif text-[#141413]">$1,950</span>
                  <span className="text-sm text-[#6b665e]">one-time · or $799/mo self-serve</span>
                </div>
                <p className="text-sm text-[#5c5852] mb-6 leading-relaxed">
                  Send us your current CRM account list. In 7 days, we show you every qualified
                  buyer and active deadline your CRM is missing.
                </p>
                <ul className="space-y-3 text-sm text-[#141413] mb-8">
                  {[
                    '2,500 target accounts matched against your current CRM list',
                    '5,000 verified executive emails (<2% bounce guarantee)',
                    'Active 30, 60, and 90-day buying triggers with proof links',
                    'Missing Accounts Report showing gaps in your territory',
                    '100% of your $1,950 rolls into full CRM sync if you upgrade',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/pilot"
                className="w-full min-h-[46px] py-3 px-5 rounded-xl bg-white hover:bg-[#f0eee6] text-[#141413] border border-black/15 font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                Start 7-Day Pilot ($1,950)
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Option 2: Managed CRM Sync */}
            <div className="p-7 sm:p-9 rounded-2xl bg-[#f0eee6] text-[#141413] border border-black/14 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-[#5c5852]">
                    Managed CRM Sync
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-[#2e6f40] text-white">
                    Most Popular
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-serif text-[#141413]">$1,950</span>
                  <span className="text-sm text-[#5c5852]">
                    / month + $9,500 setup ($7,550 after Pilot credit)
                  </span>
                </div>
                <p className="text-sm text-[#5c5852] mb-6 leading-relaxed">
                  For 5–50 rep sales teams that want an entire national industry wired straight into
                  HubSpot, Salesforce, or Clay every week.
                </p>
                <ul className="space-y-3 text-sm text-[#141413] mb-8">
                  {[
                    'Full national industry database synced into your CRM',
                    '3,500 company unlocks/month (~7,000 verified buyers)',
                    'Fresh deadlines routed straight into rep queues each week',
                    'Automatic monthly contact refresh and job-change alerts',
                    'Never overwrites your reps’ existing notes or fields',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/pricing"
                className="w-full min-h-[46px] py-3 px-5 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Compare All Plans &amp; Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PLAIN-ENGLISH FAQS */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-medium text-[#6b665e] mb-2">Common Questions</p>
            <h2 className="text-3xl font-serif tracking-tight text-[#141413] font-medium">
              Straight answers on data quality, pricing, and delivery.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-white border border-black/10 rounded-2xl p-6 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
              >
                <h3 className="text-base font-serif font-medium text-[#141413] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#5c5852] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

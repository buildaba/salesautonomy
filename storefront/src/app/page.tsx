'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  stepNumber: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  sourceLabel: string;
  publicSources: string[];
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
    confirmedBy: string;
    buyerAction: string;
  };
}

const INDUSTRY_MARKETS: IndustryMarket[] = [
  {
    id: 'healthcare',
    stepNumber: '01',
    tabLabel: 'Healthcare & Life Sciences',
    badge: 'Healthcare, Clinics & MedTech',
    title: 'Reach expanding clinic groups and newly cleared MedTech teams.',
    subtitle:
      'Apollo often lists a 14-clinic group as 12 employees and hides the real owner. We connect 6 public records to catch new clinic build-outs, FDA approvals, 45-day Medicare deadlines, and hiring surges on the true parent company.',
    sourceLabel: 'Clinic registries, FDA approvals, Medicare inspections, permits & benefit filings',
    publicSources: [
      'Clinic Registry',
      'FDA Approvals',
      'Medicare Inspections',
      'Compliance Watchlist',
      'Benefits & Headcount',
      'Hiring Filings',
    ],
    cadence: 'Updated Weekly',
    totalEntities: '218,400+ Clinic & MedTech Groups',
    avgDealValue: '$18k – $95k Deal Buyers',
    icon: HeartPulse,
    whoBuys:
      'Healthcare SaaS, billing platforms, EHR vendors, medical device QA teams, and clinical staffing firms.',
    whatWeClean: [
      'Links every branch clinic and FDA filing back to the real parent company and staff count',
      'Pairs new clinic openings with city build-out permits and SBA expansion loans',
      'Finds the real clinic owner, COO, Medical Director, or Regulatory VP—never outside billing firms',
      'Alerts reps to 45-day Medicare correction deadlines and monthly compliance updates',
    ],
    sampleTrigger: {
      entity: 'Summit Orthopedic & Spine Partners',
      location: 'Frisco, TX · 14 Clinics · 184 Staff',
      signal: 'Filed a $1.42M surgical suite permit while operating 14 linked clinics',
      confirmedBy: '4 Public Sources: Clinic Registry · Building Permits · Benefits Filing · Compliance Watchlist',
      buyerAction: 'Call the COO and Managing Partner on EHR, billing, and staffing before opening day',
    },
  },
  {
    id: 'fleet',
    stepNumber: '02',
    tabLabel: 'Trucking & Industrial',
    badge: 'Trucking Fleets, Factories & Aviation',
    title: 'Catch fleets before insurance cancels and plants after OSHA arrives.',
    subtitle:
      'Standard lead lists are packed with 1-truck drivers using Gmail. We focus on 15 to 250+ truck fleets and multi-plant factories facing 30-day insurance cancellations, fresh OSHA visits, EPA notices, and fleet growth.',
    sourceLabel: 'DOT fleet insurance feeds, OSHA safety visits, EPA notices, FAA filings & SBA loans',
    publicSources: [
      'DOT Fleet & Insurance',
      'OSHA Safety',
      'EPA Filings',
      'FAA Aircraft',
      'Benefits & Headcount',
      'SBA Loans',
    ],
    cadence: 'Updated Daily',
    totalEntities: '274,600+ Fleets & Plants',
    avgDealValue: '$25k – $150k Deal Buyers',
    icon: Truck,
    whoBuys:
      'Commercial fleet and workers comp brokers, dashcam and ELD software, safety consultants, equipment finance, and industrial staffing.',
    whatWeClean: [
      'Filters out 1-truck owner-operators so reps only call commercial fleets and real plants',
      'Ties every truck fleet, factory site, and corporate aircraft back to one parent company',
      'Catches 30-day fleet insurance cancellations and 30 to 90-day OSHA fix deadlines early',
      'Strips outside accountants so your reps reach the internal CFO, HR lead, and Safety VP',
    ],
    sampleTrigger: {
      entity: 'Heartland Cold Chain Logistics',
      location: 'Dallas, TX · 74 Trucks · 148 Staff',
      signal: '30-day fleet insurance cancellation notice right after adding 28 new trucks',
      confirmedBy: '4 Public Sources: DOT Fleet & Insurance · Benefits Filing · OSHA Safety · EPA Filings',
      buyerAction: 'Reach the CFO and Safety Director before coverage lapses in 30 days',
    },
  },
  {
    id: 'contractors',
    stepNumber: '03',
    tabLabel: 'Builders & Gov Contractors',
    badge: 'Commercial Builders, Gov Contractors & Funded Firms',
    title: 'Spot fresh funding, $250K+ building permits, and expiring contracts.',
    subtitle:
      'When a company closes fresh funding, pulls a $250K+ building permit, and ramps up hiring in the same month, they are buying now. We tie 7 permit, loan, funding, and federal contract sources back to the real parent company and executive buyer.',
    sourceLabel: 'Building permits, federal contracts, SBA loans, private funding & hiring filings',
    publicSources: [
      'Building Permits',
      'Federal Contractors',
      'Federal Awards',
      'Private Funding',
      'SBA Loans',
      'Hiring Filings',
      'Benefits & Headcount',
    ],
    cadence: 'Updated Daily',
    totalEntities: '364,800+ Expanding Firms',
    avgDealValue: '$30k – $250k Deal Buyers',
    icon: HardHat,
    whoBuys:
      'Commercial HVAC and MEP suppliers, construction software, bonding brokers, govcon advisors, and B2B SaaS sales teams.',
    whatWeClean: [
      'Matches local project LLCs on $250K+ building permits back to the real parent company',
      'Pairs large commercial permits with SBA expansion loans and fresh private funding rounds',
      'Tracks federal contractor registrations expiring in 30, 60, or 90 days alongside active awards',
      'Flags engineering and technical hiring surges with real salary budgets by company',
    ],
    sampleTrigger: {
      entity: 'Vanguard Cold Storage & Distribution',
      location: 'Chicago, IL · $2.45M Permit · 215 Staff',
      signal: 'Pulled a $2.45M refrigerated warehouse permit backed by a new SBA commercial loan',
      confirmedBy: '4 Public Sources: Building Permits · SBA Loans · Benefits Filing · Federal Contractors',
      buyerAction: 'Call the Director of Facilities and Project Executive before vendor bids lock',
    },
  },
];

const PUBLIC_DATA_SOURCES = [
  {
    category: 'All Industries',
    tag: 'Real Staff Counts',
    name: 'Company Headcounts & Benefits',
    whyItMatters: 'Verified employee counts, annual plan renewals, and real CFO or HR signers.',
  },
  {
    category: 'Contractors',
    tag: '30–90d Deadlines',
    name: 'Federal Contractor Registry',
    whyItMatters: 'Verified company websites plus alerts when federal bidding registrations expire.',
  },
  {
    category: 'Builders & Sites',
    tag: '$250K+ Projects',
    name: 'Commercial Building Permits',
    whyItMatters: 'New clinic build-outs, warehouse upgrades, and commercial renovations over $250K.',
  },
  {
    category: 'Growth & Capital',
    tag: 'Funded Projects',
    name: 'SBA Commercial Loans',
    whyItMatters: 'Companies that just closed SBA loans for real estate, clinics, trucks, or equipment.',
  },
  {
    category: 'Growth & Capital',
    tag: '$2M–$50M Raises',
    name: 'Private Funding Rounds',
    whyItMatters: 'Growing private companies that just closed fresh capital and opened new budgets.',
  },
  {
    category: 'Hiring Surges',
    tag: 'Salary Budgets',
    name: 'Technical & Clinical Hiring Filings',
    whyItMatters: 'Work-visa filings showing active hiring surges and real salary bands by department.',
  },
  {
    category: 'Healthcare',
    tag: 'Clinic Locations',
    name: 'Multi-Site Clinic Registry',
    whyItMatters: 'Every clinic branch tied to its parent group, plus new openings and medical directors.',
  },
  {
    category: 'Healthcare',
    tag: 'New Launches',
    name: 'FDA Medical Device Approvals',
    whyItMatters: 'MedTech teams that just cleared a new FDA device and need production or sales help.',
  },
  {
    category: 'Healthcare',
    tag: '45-Day Deadlines',
    name: 'Medicare Inspection Deadlines',
    whyItMatters: 'Care groups facing a 45-day window to fix federal health and safety citations.',
  },
  {
    category: 'Healthcare',
    tag: 'Monthly Alerts',
    name: 'Healthcare Compliance Watchlist',
    whyItMatters: 'Monthly federal sanction updates that trigger urgent compliance and vetting reviews.',
  },
  {
    category: 'Trucking & Fleet',
    tag: '30-Day Deadlines',
    name: 'Truck Fleet & Insurance Filings',
    whyItMatters: 'Commercial fleets adding trucks or hit with a 30-day insurance cancellation notice.',
  },
  {
    category: 'Factories & Fleet',
    tag: 'Fresh Visits',
    name: 'OSHA Safety Inspections',
    whyItMatters: 'Newly opened workplace safety visits and 30 to 90-day fix windows at plants.',
  },
  {
    category: 'Manufacturing',
    tag: 'Compliance Fixes',
    name: 'EPA Environmental Notices',
    whyItMatters: 'Industrial plants flagged for air, water, or waste compliance fixes.',
  },
  {
    category: 'Aviation & Fleet',
    tag: 'New Assets',
    name: 'Corporate Aircraft & Charter Filings',
    whyItMatters: 'Companies buying business aircraft or expanding commercial charter fleets.',
  },
  {
    category: 'Contractors',
    tag: 'Active Awards',
    name: 'Federal Contract Awards & Re-Bids',
    whyItMatters: 'First-time government award winners and active contracts entering a 90-day re-bid.',
  },
];

const WHY_SWITCH_CARDS = [
  {
    eyebrow: 'For Sales Leaders & VPs',
    title: 'Multiple buying signs beat cold guesses',
    body: 'One isolated filing can be noise. When a company adds staff, closes an expansion loan, and pulls a $1.4M permit in the same month, your reps walk into a real budget conversation.',
    cta: 'Browse live sample leads',
    href: '#live-explorer',
    icon: Target,
  },
  {
    eyebrow: 'For RevOps & AI Workflows',
    title: 'Clean data wired straight into your stack',
    body: 'Stop wrestling with broken scrapers and messy CSVs. Sync verified accounts and proof links straight into HubSpot, Salesforce, Clay, or your AI sales tools in minutes.',
    cta: 'See API & agent docs',
    href: '/llms.txt',
    icon: ShieldCheck,
  },
  {
    eyebrow: 'Protected Territories',
    title: 'Never oversold to 10,000 other reps',
    body: 'Big databases sell the exact same contact to thousands of buyers. We cap every industry and region at 5 active customers so your emails get answered.',
    cta: 'Check territory availability',
    href: '/pricing',
    icon: Clock,
  },
];

const FAQS = [
  {
    q: 'Why combine 15 public sources instead of selling one government list?',
    a: 'Single public lists are missing websites, real staff counts, and decision-makers. By matching 15 government and city records onto the same parent company, your reps get clear proof of budget plus verified executive emails.',
  },
  {
    q: 'Why use Sales Autonomy instead of Apollo or ZoomInfo?',
    a: 'Apollo and ZoomInfo sell the same static profiles to thousands of reps. In healthcare, trucking, manufacturing, and construction, real buying deadlines show up in public filings weeks before buyers ever update LinkedIn.',
  },
  {
    q: 'How do you guarantee under 2% email bounces?',
    a: 'Raw government filings are full of outside accountants and law firms. We strip third-party filers out and verify every executive email right when you unlock it. If bounces ever top 2%, we replace them 2-for-1 automatically.',
  },
  {
    q: 'How does the data reach our sales team?',
    a: 'Pick what fits your team: a clean Monday spreadsheet, our live search portal, automatic sync into HubSpot, Salesforce, or Clay, or our API for RevOps and AI agents.',
  },
];

export default function HomePage() {
  const [activeIndustryId, setActiveIndustryId] = useState<IndustryMarket['id']>('healthcare');
  const activeMarket =
    INDUSTRY_MARKETS.find((market) => market.id === activeIndustryId) ?? INDUSTRY_MARKETS[0];

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413]">
      {/* 1. HERO — Clear, Direct, Deadline-First */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#2e6f40] mb-4">
              Built for B2B Sales Teams &amp; RevOps · Updated Daily · &lt;2% Email Bounce Guarantee
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-[3.65rem] font-serif tracking-tight mb-5 leading-[1.08] text-[#141413] font-medium">
              Call buyers who have a deadline right now.
            </h1>

            <p className="text-base sm:text-lg text-[#5c5852] max-w-2xl mb-8 leading-relaxed">
              Cold lists guess who might buy. We track 15 official public sources every
              day—insurance cancellations, safety visits, building permits, FDA approvals, and
              fresh funding. Your team gets the real parent company, official proof, and verified
              decision-makers before competitors ever hear about them.
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
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">15 Sources</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Combined into one clean company profile with official proof
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">857,800+</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Clinics, truck fleets, factories, and contractors tracked nationwide
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
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              Three Real-World Markets Standard Tools Miss
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium">
              Pick your industry. Get buyers with active deadlines.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Industries covered"
            className="grid grid-cols-1 md:grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-white border border-black/10 shadow-[0_1px_2px_rgba(20,20,19,0.03)] mb-6"
          >
            {INDUSTRY_MARKETS.map((market, index) => {
              const Icon = market.icon;
              const isActive = activeIndustryId === market.id;
              return (
                <button
                  key={market.id}
                  id={`industry-tab-${market.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="industry-market-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndustryId(market.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                      e.preventDefault();
                      const next = INDUSTRY_MARKETS[(index + 1) % INDUSTRY_MARKETS.length];
                      setActiveIndustryId(next.id);
                      document.getElementById(`industry-tab-${next.id}`)?.focus();
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                      e.preventDefault();
                      const prev =
                        INDUSTRY_MARKETS[
                          (index - 1 + INDUSTRY_MARKETS.length) % INDUSTRY_MARKETS.length
                        ];
                      setActiveIndustryId(prev.id);
                      document.getElementById(`industry-tab-${prev.id}`)?.focus();
                    } else if (e.key === 'Home') {
                      e.preventDefault();
                      setActiveIndustryId(INDUSTRY_MARKETS[0].id);
                      document.getElementById(`industry-tab-${INDUSTRY_MARKETS[0].id}`)?.focus();
                    } else if (e.key === 'End') {
                      e.preventDefault();
                      const last = INDUSTRY_MARKETS[INDUSTRY_MARKETS.length - 1];
                      setActiveIndustryId(last.id);
                      document.getElementById(`industry-tab-${last.id}`)?.focus();
                    }
                  }}
                  className={`group relative flex items-center gap-3.5 px-3.5 lg:px-4 py-3 rounded-[10px] text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413]/30 ${
                    isActive
                      ? 'text-[#faf9f5]'
                      : 'text-[#5c5852] hover:text-[#141413] hover:bg-[#f5f4ef]/85'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-industry-tab"
                      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                      className="absolute inset-0 rounded-[10px] bg-[#141413] shadow-[0_1px_2px_rgba(20,20,19,0.12),0_4px_12px_rgba(20,20,19,0.08)]"
                    />
                  )}
                  <span
                    className={`relative z-10 flex md:hidden lg:flex w-9 h-9 rounded-lg shrink-0 items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-white/12 text-[#faf9f5]'
                        : 'bg-[#f5f4ef] border border-black/[0.06] text-[#5c5852] group-hover:text-[#141413] group-hover:bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="relative z-10 min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium tabular-nums">
                      <span className={isActive ? 'text-[#faf9f5]/65' : 'text-[#6b665e]'}>
                        {market.stepNumber}
                      </span>
                      <span
                        aria-hidden="true"
                        className={isActive ? 'text-[#faf9f5]/55' : 'text-[#6b665e]/60'}
                      >
                        ·
                      </span>
                      <span
                        className={`truncate ${
                          isActive ? 'text-[#faf9f5]/75' : 'text-[#6b665e]'
                        }`}
                      >
                        {market.totalEntities}
                      </span>
                    </span>
                    <span
                      className={`block text-[13.5px] lg:text-sm font-medium tracking-[-0.01em] truncate mt-0.5 ${
                        isActive ? 'text-[#faf9f5]' : 'text-[#141413]'
                      }`}
                    >
                      {market.tabLabel}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="industry-market-panel"
            role="tabpanel"
            aria-labelledby={`industry-tab-${activeMarket.id}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
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

                <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed mb-5">
                  {activeMarket.subtitle}
                </p>

                {/* Plain-English Public Sources Strip */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-[#6b665e] mb-2">
                    Public records combined in this market:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeMarket.publicSources.map((src) => (
                      <span
                        key={src}
                        className="px-2.5 py-1 rounded-lg bg-[#faf9f5] border border-black/10 text-xs font-medium text-[#141413]"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                </div>

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

            {/* Right Column: Stats + Real Signal Example Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                  <div className="text-xs text-[#6b665e] mb-1">Verified Accounts</div>
                  <div className="text-lg sm:text-xl font-serif text-[#141413] font-medium">
                    {activeMarket.totalEntities}
                  </div>
                </div>
                <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                  <div className="text-xs text-[#6b665e] mb-1">Typical Deal Size</div>
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
                      <div className="text-[11px] text-[#6b665e]">Confirmed By</div>
                      <div className="text-xs text-[#2e6f40] font-medium mt-0.5">
                        {activeMarket.sampleTrigger.confirmedBy}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-black/8">
                      <div className="text-[11px] text-[#6b665e]">Your Next Move</div>
                      <div className="text-xs text-[#141413] font-medium mt-0.5">
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
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              Live Sample Explorer · 76+ Real Accounts Across 3 Industries
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Inspect real accounts before you spend a dollar.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Click any company below to see which public records matched, read the official proof
              link, and unlock verified executive contact info.
            </p>
          </div>

          <PowerTableExplorer />
        </div>
      </section>

      {/* 4. WHERE OUR BUYING SIGNALS COME FROM — Plain-English 15 Public Sources */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              15 Official Public Sources · Checked Every Day
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Where our buying signals come from.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              A single public list rarely tells the whole story. We combine 15 government and city
              records into one company profile, so your team sees real budgets and active deadlines
              on every lead.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PUBLIC_DATA_SOURCES.map((source) => (
              <div
                key={source.name}
                className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded-md">
                      {source.category}
                    </span>
                    <span className="text-[11px] font-medium text-[#6b665e] truncate">
                      {source.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-medium text-[#141413] mb-1.5">
                    {source.name}
                  </h3>
                  <p className="text-xs text-[#5c5852] leading-relaxed">{source.whyItMatters}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/10 text-xs text-[#5c5852]">
            <span>
              Want to see how we verify every filing and filter out outside accountants?
            </span>
            <div className="flex items-center gap-5">
              <Link
                href="/accuracy"
                className="font-medium text-[#141413] hover:text-[#2e6f40] underline underline-offset-4 transition-colors"
              >
                Read Data Accuracy Rules →
              </Link>
              <Link
                href="/sample"
                className="font-medium text-[#141413] hover:text-[#2e6f40] underline underline-offset-4 transition-colors"
              >
                Technical Specs for Data Teams →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY SALES TEAMS SWITCH + 4 WAYS TO RECEIVE LEADS */}
      <section className="py-20 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Built for Sales Teams, Brokers &amp; RevOps
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              True sales autonomy. Four easy ways to get your leads.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Reps can grab clean Monday spreadsheets or search accounts on their own. RevOps teams
              can sync every alert straight into HubSpot, Salesforce, Clay, or AI workflows.
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

          {/* 4 Plain-English Delivery Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: FileSpreadsheet,
                title: '1. Monday Spreadsheet',
                desc: 'Clean CSV files with this week’s fresh triggers sent every Monday at 6:00 AM.',
              },
              {
                icon: Database,
                title: '2. Live Search Portal',
                desc: 'Filter by state, company size, or deadline and unlock verified contacts on demand.',
              },
              {
                icon: Webhook,
                title: '3. Direct CRM & Clay Sync',
                desc: 'Send new accounts straight to HubSpot, Salesforce, or Clay without overwriting rep notes.',
              },
              {
                icon: Code2,
                title: '4. Developer & AI API',
                desc: 'Simple REST and MCP endpoints for data teams, warehouses, and automated outreach.',
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

      {/* 6. SIMPLE PRICING PREVIEW */}
      <section className="py-24 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Simple, Transparent Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Test us for 7 days first. Scale when your reps book meetings.
            </h2>
            <p className="text-base text-[#5c5852]">
              No long-term contract needed to prove data quality. Every plan includes our 15
              combined public sources, 5-customer territory cap, and &lt;2% email bounce guarantee.
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
                    'Active 30, 60, and 90-day buying triggers with official proof links',
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

      {/* 7. PLAIN-ENGLISH FAQS */}
      <section className="py-20 border-t border-black/10">
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

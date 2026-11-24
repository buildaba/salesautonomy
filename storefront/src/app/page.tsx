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
  Layers,
  Terminal,
} from 'lucide-react';
import { PowerTableExplorer } from '@/components/vault/PowerTableExplorer';

interface MarketEngine {
  id: 'healthcare' | 'logistics' | 'construction';
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  sourceLabel: string;
  stackedAgencies: string[];
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
    stackedProof: string;
    buyerAction: string;
  };
}

const MARKET_ENGINES: MarketEngine[] = [
  {
    id: 'healthcare',
    tabLabel: '01 · Healthcare & Life Sciences (6 Agencies)',
    badge: 'Pack 01 · Healthcare, Medical Devices & Life Sciences',
    title: 'Multi-Site Clinic & FDA Medical Device Expansion Graph',
    subtitle:
      'A single CMS NPPES clinic record is only one piece of the puzzle. We cross-walk 6 federal datasets by Type-2 NPI, FDA FEI, and IRS EIN so you catch multi-site clinic openings, newly cleared FDA 510(k) medical devices, 45-day CMS survey deadlines, and clinical H-1B hiring surges on the exact same parent organization.',
    sourceLabel: 'CMS NPPES v2.1 + FDA OpenFDA 510(k) + HHS OIG LEIE + CMS QCOR + DOL Form 5500 + DOL LCA',
    stackedAgencies: [
      'CMS NPPES NPI-2',
      'FDA 510(k) & FEI',
      'HHS OIG LEIE',
      'CMS Care Compare',
      'DOL Form 5500 (EIN)',
      'DOL H-1B LCA',
    ],
    cadence: 'Weekly CMS & OpenFDA SHA-256 Delta',
    totalEntities: '218,400+ Clinic & MedTech Groups',
    avgDealValue: '$18k – $95k ACV Buyers',
    icon: HeartPulse,
    whoBuys:
      'Built for Healthcare SaaS, RCM billing platforms, EHR vendors, Life Sciences QA & CDMO teams, and clinical staffing agencies.',
    whatWeClean: [
      'Cross-walks Type-2 Org NPIs and FDA 510(k) applicants to their DOL Form 5500 EIN & headcount',
      'Stacks new secondary clinic openings with municipal surgical buildout permits and SBA loans',
      'Identifies newly appointed Authorized Officials, Medical Directors, and VP Regulatory signers',
      'Flags 45-day CMS F-tag Plans of Correction and monthly HHS OIG LEIE exclusion deltas',
    ],
    sampleTrigger: {
      entity: 'Summit Orthopedic & Spine Partners PLLC',
      location: 'Frisco, TX · NPI 1942881042 · EIN 75-2948102',
      signal: 'New $1.42M Surgical Suite Permit + 14 Linked NPPES Clinics + 184 Form 5500 Staff',
      stackedProof: '4 Federal Agencies Stacked: CMS NPPES + DOL Form 5500 + Socrata Permit + OIG LEIE',
      buyerAction: 'Pitch EHR, RCM billing, and credentialing before opening day',
    },
  },
  {
    id: 'logistics',
    tabLabel: '02 · Fleet, Industrial & Aviation (6 Agencies)',
    badge: 'Pack 02 · Fleet, Industrial, Aviation & Manufacturing Risk',
    title: 'Commercial Fleet, OSHA Plant & EPA/FAA Risk Graph',
    subtitle:
      'We isolate commercial fleets operating 15 to 250+ trucks and multi-plant manufacturers, then stack 6 federal enforcement and asset registries onto their DOL Form 5500 EIN spine. Catch 30-day Form BMC-35 insurance cancellations, newly opened Federal OSHA inspections, EPA ECHO violations, and FAA corporate fleet acquisitions.',
    sourceLabel: 'DOT FMCSA L&I + Federal OSHA + EPA ECHO / FRS + FAA Registry + DOL Form 5500 + SBA 504',
    stackedAgencies: [
      'DOT FMCSA L&I',
      'DOL Federal OSHA',
      'EPA ECHO / FRS',
      'FAA Fleet Registry',
      'DOL Form 5500 (EIN)',
      'SBA 7(a) & 504',
    ],
    cadence: 'Daily DOT & Nightly OSHA Delta Sync',
    totalEntities: '274,600+ Commercial Fleets & Plants',
    avgDealValue: '$25k – $150k ACV Buyers',
    icon: Truck,
    whoBuys:
      'Built for Commercial Fleet & Workers Comp Insurance Brokers, EHS & Telematics SaaS, Equipment Finance, and Industrial Staffing.',
    whatWeClean: [
      'Filters out 1-truck owner-operators so reps only call 15–250+ unit fleets and multi-plant operators',
      'Joins USDOT, OSHA Establishment IDs, EPA 12-digit FRS IDs, and FAA N-Numbers to one parent EIN',
      'Catches 30-day Form BMC-35 insurance policy cancellations and 30–90d OSHA abatement deadlines',
      'Extracts CPA-filtered CFOs, VPs of HR, and Safety Directors directly from statutory filings',
    ],
    sampleTrigger: {
      entity: 'Heartland Cold Chain Logistics Inc.',
      location: 'Dallas, TX · USDOT #3849201 · EIN Cross-Walked',
      signal: '30-Day Form BMC-35 Insurance Cancellation Notice + +28 Power Units Added (74 Trucks)',
      stackedProof: '4 Federal Agencies Stacked: DOT FMCSA + DOL Form 5500 + Federal OSHA + EPA ECHO',
      buyerAction: 'Outreach to CFO & Safety Director before the 30-day insurance cancellation deadline',
    },
  },
  {
    id: 'construction',
    tabLabel: '03 · Permits, GovCon & Capital (7 Agencies)',
    badge: 'Pack 03 · Commercial Permits, GovCon & Capital Expansion',
    title: 'Commercial Buildouts, Federal Awards & SEC/SBA Capital Graph',
    subtitle:
      'When a company closes an SEC Form D private growth round or SBA 504 loan, pulls a $250K+ commercial building permit, and files DOL H-1B LCA hiring applications in the same 30-day window, they are actively buying across every category. We stack 7 capital, procurement, and permit feeds onto one corporate entity.',
    sourceLabel: 'Socrata Permits + SAM.gov + USAspending + SEC Form D/ADV + SBA 504 + DOL H-1B LCA + Form 5500',
    stackedAgencies: [
      'Socrata Permits',
      'GSA SAM.gov (UEI)',
      'USAspending / FPDS',
      'SEC Form D / ADV',
      'SBA 7(a) & 504',
      'DOL H-1B LCA',
      'DOL Form 5500',
    ],
    cadence: 'Daily SAM.gov, SEC EDGAR & Permit Sync',
    totalEntities: '364,800+ Expanding Builders & Contractors',
    avgDealValue: '$30k – $250k Project Buyers',
    icon: HardHat,
    whoBuys:
      'Built for Commercial HVAC & MEP Suppliers, Construction Tech, GovCon/CMMC Advisors, Surety Brokers, and B2B Enterprise SaaS.',
    whatWeClean: [
      'Cross-walks 700,000+ SAM.gov verified corporate domains (entityUrl) and UEIs to IRS EINs',
      'Pairs $250K–$10M+ commercial building permits with SBA 504 loans and SEC Form D financings',
      'Monitors daily 30/60/90-day SAM.gov registration expirations tied to active USAspending awards',
      'Layers DOL H-1B LCA engineering and technical hiring surges with exact salary budgets by EIN',
    ],
    sampleTrigger: {
      entity: 'Vanguard Cold Storage & Distribution',
      location: 'Chicago, IL · Valuation $2,450,000 · UEI & EIN Linked',
      signal: 'Commercial Permit Issued ($2.45M Refrigerated Warehouse) + SBA 504 Fixed-Asset Loan',
      stackedProof: '4 Federal Agencies Stacked: Socrata Permits + SBA 504 + DOL Form 5500 + SAM.gov',
      buyerAction: 'Immediate outreach to Director of Facilities & GC Project Executive',
    },
  },
];

const FIFTEEN_FEDERAL_AGENCIES = [
  { num: '01', name: 'GSA SAM.gov Entity API v3', key: '12-Char UEI + 700K Verified Domains', trigger: '30/60/90d registration expirations & CAGE verification' },
  { num: '02', name: 'DOL Form 5500 (EFAST2)', key: '9-Digit IRS EIN + CFO/HR Signer', trigger: '800K benefit plans, exact employee headcounts & renewal dates' },
  { num: '03', name: 'SEC EDGAR Form D & Form ADV', key: 'SEC CIK + IRS EIN + CRD', trigger: '$2M–$50M private growth rounds & RIA branch expansions' },
  { num: '04', name: 'SBA 7(a) & 504 Commercial Loans', key: 'Borrower Name + Facility Address', trigger: 'Financed commercial real estate & plant equipment expansions' },
  { num: '05', name: 'DOL H-1B LCA & PERM Workforce', key: '9-Digit IRS EIN + Salary Band', trigger: 'EIN-verified engineering, clinical & technical hiring surges' },
  { num: '06', name: 'CMS NPPES Type-2 Org Registry', key: '10-Digit Org NPI + Authorized Official', trigger: 'New secondary clinic locations & Medical Director changes' },
  { num: '07', name: 'FDA OpenFDA 510(k) & Establishments', key: 'FDA FEI + 510(k) K-Number', trigger: 'New cleared medical devices & registered manufacturing sites' },
  { num: '08', name: 'HHS OIG LEIE Exclusion Table', key: '10-Digit NPI + Entity Legal Name', trigger: 'Monthly healthcare sanction & credentialing compliance triggers' },
  { num: '09', name: 'CMS Care Compare / QCOR Surveys', key: '6-Digit CMS CCN + Facility Address', trigger: '45-day CMS F-tag Plan of Correction compliance deadlines' },
  { num: '10', name: 'U.S. DOT FMCSA Census & L&I', key: 'USDOT Number + MC Docket', trigger: '30-day Form BMC-35 insurance cancellations & fleet growth' },
  { num: '11', name: 'DOL Federal OSHA Enforcement', key: 'OSHA Establishment ID + NAICS', trigger: 'Newly opened workplace inspections & 30–90d abatement windows' },
  { num: '12', name: 'U.S. EPA ECHO & Facility Registry', key: '12-Digit EPA FRS ID + Parent EIN', trigger: 'Clean Air, Clean Water & RCRA Significant Non-Compliance' },
  { num: '13', name: 'FAA Civil Aircraft & Part 135 Fleet', key: 'FAA N-Number + Corporate Address', trigger: 'Corporate aircraft acquisitions & commercial charter expansion' },
  { num: '14', name: 'Treasury USAspending & FPDS-NG', key: 'Recipient UEI + Contract PIID', trigger: 'First-time federal prime awards & 90-day contract recompetes' },
  { num: '15', name: 'Municipal Socrata Building Permits', key: 'Permit ID + Parcel PIN + Tenant', trigger: 'Commercial & industrial tenant buildouts over $250,000' },
];

const BUYER_PROFILES = [
  {
    eyebrow: 'Vertical SaaS & Revenue Teams',
    title: 'Multi-agency signal stacking beats single-source scraping',
    body: 'A single government CSV is noisy. When one company trips a DOL Form 5500 headcount jump, an SBA 504 expansion loan, and a $1.4M municipal building permit in the same month, your reps walk into a guaranteed budget conversation.',
    cta: 'Explore 76+ stacked rows',
    href: '#live-explorer',
    icon: Target,
  },
  {
    eyebrow: 'RevOps, Clay & Grokbot Operators',
    title: 'One 6-table canonical schema wired for MCP & Grokbot',
    body: 'All 15 federal agencies normalize into the exact same 6 Postgres tables. Connect xAI Grokbot, Claude Desktop, Cursor, or Clay via /api/mcp and /api/v1/signals with a credit-metered firewall.',
    cta: 'View MCP & Grokbot spec',
    href: '/llms.txt',
    icon: Terminal,
  },
  {
    eyebrow: 'Commercial Brokers & Agencies',
    title: 'Exclusive territory caps so your leads stay fresh',
    body: 'Apollo and ZoomInfo sell the exact same static contact to 10,000 seats. We cap every vertical territory slice at 5 active subscribers so your outreach lands in uncrowded decision-maker inboxes.',
    cta: 'Check territory availability',
    href: '/pricing',
    icon: ShieldCheck,
  },
];

const FAQS = [
  {
    q: 'Why cross-join 15 federal datasets instead of selling just 1 or 2 government lists?',
    a: 'Because a single public dataset is easy for competitors to copy and often lacks corporate domains, employee headcounts, or executive buyers. By cross-walking 15 federal and municipal agencies onto one corporate spine (anchored by IRS EIN from DOL Form 5500 and UEI/domain from SAM.gov), every account carries stacked operational proof plus a verified decision-maker inbox.',
  },
  {
    q: 'How does "Graph in the Back, Packs in the Front" work?',
    a: 'Under the hood, our DuckDB and Supabase engine continuously cross-joins all 15 federal feeds into one 6-table entity graph. On the front end, you can either license a ready-to-run Vertical Pack (Healthcare & Life Sciences, Fleet & Industrial Risk, or Permits & Capital Expansion) or query across all 15 agencies via our Remote MCP Server (/api/mcp) and REST API (/api/v1/signals).',
  },
  {
    q: 'How do you guarantee a <2% email bounce rate across 15 agencies?',
    a: 'We strip third-party CPAs, law firms, and registered agents using a 50-keyword exclusion gate, then run Just-In-Time Catch-All SMTP verification at the moment you unlock an account. If any contact bounces above 2%, we replace it 2-for-1 automatically.',
  },
  {
    q: 'Can we connect xAI Grokbot, Claude Desktop, Cursor, or Clay directly?',
    a: 'Yes. Click "Connect Grokbot / MCP" inside the Live Lead Explorer below to copy our turnkey Grokbot Chief-of-Staff Monday 6:00 AM routine, our machine-readable /llms.txt spec, or our JSON-RPC 2.0 MCP config.',
  },
];

export default function HomePage() {
  const [activeEngineId, setActiveEngineId] = useState<MarketEngine['id']>('healthcare');
  const activeEngine =
    MARKET_ENGINES.find((engine) => engine.id === activeEngineId) ?? MARKET_ENGINES[0];

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413]">
      {/* 1. HERO — Calm left-aligned editorial layout matching buildaba.com */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#2e6f40] mb-4">
              15 Federal Agencies Cross-Walked by EIN, UEI &amp; Facility · MCP &amp; Grokbot Ready · &lt;2% Bounce SLA
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-[3.65rem] font-serif tracking-tight mb-5 leading-[1.08] text-[#141413] font-medium">
              The 15-agency federal statutory graph, packaged for B2B revenue teams.
            </h1>

            <p className="text-base sm:text-lg text-[#5c5852] max-w-2xl mb-8 leading-relaxed">
              Single-source government CSVs are unusable, and LinkedIn scrapers arrive months too
              late. We cross-join 15 federal and municipal filings—linking IRS EINs, SAM.gov domains,
              FDA clearances, DOT fleets, OSHA inspections, SEC Form D financings, and building
              permits—into three ready-to-buy vertical packs and a credit-metered MCP/Grokbot API.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
              <a
                href="#live-explorer"
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl text-sm font-medium bg-[#141413] text-[#faf9f5] hover:bg-[#2a2927] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Explore Live Vault (76+ Stacked Federal Signals)
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/pricing"
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl text-sm font-medium bg-white border border-black/14 hover:bg-[#f0eee6] text-[#141413] transition-colors flex items-center justify-center gap-2"
              >
                Launch a 7-Day Territory Pilot — $1,950
              </Link>
            </div>
          </div>

          {/* Left-aligned 4-column hairline stat strip matching buildaba.com */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-black/10">
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">15 Agencies</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Cross-walked onto one canonical EIN + UEI + facility corporate spine
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">857,800+</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Resolved multi-signal operating entities across 3 vertical packs
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">&lt; 2.0%</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Contractual hard-bounce SLA with 50-keyword CPA exclusion gate
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">MCP + Grokbot</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Zero-cost discovery scans + credit-metered unlocks via /api/mcp &amp; /llms.txt
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GRAPH IN THE BACK, PACKS IN THE FRONT — PracticePathShowcase style */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs font-medium text-[#2e6f40] mb-2">
                Graph in the Back · Ready-to-Buy Packs in the Front
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium">
                15 federal datasets stacked into 3 high-intent vertical packs.
              </h2>
            </div>

            {/* White rounded-xl pill tab switcher matching buildaba.com */}
            <div className="inline-flex flex-wrap p-1 rounded-xl bg-white border border-black/10 self-start gap-1">
              {MARKET_ENGINES.map((engine) => (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => setActiveEngineId(engine.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    activeEngineId === engine.id
                      ? 'bg-[#141413] text-[#faf9f5]'
                      : 'text-[#5c5852] hover:text-[#141413]'
                  }`}
                >
                  {engine.tabLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Active Engine Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 bg-white border border-black/10 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-1 rounded-md">
                    <Sparkles className="w-3 h-3" />
                    {activeEngine.badge}
                  </span>
                  <span className="text-xs font-mono text-[#6b665e]">
                    {activeEngine.cadence}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#141413] font-medium mb-3 leading-snug">
                  {activeEngine.title}
                </h3>

                <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed mb-5">
                  {activeEngine.subtitle}
                </p>

                {/* Stacked Agencies Pill Strip */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-[#6b665e] mb-2">
                    Stacked Federal &amp; Statutory Feeds Joined in This Pack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeEngine.stackedAgencies.map((ag) => (
                      <span
                        key={ag}
                        className="px-2.5 py-1 rounded-lg bg-[#faf9f5] border border-black/10 text-xs font-mono text-[#141413]"
                      >
                        {ag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#faf9f5] border border-black/8 mb-6">
                  <div className="text-xs font-medium text-[#141413] mb-1">Ideal GTM Teams</div>
                  <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                    {activeEngine.whoBuys}
                  </p>
                </div>

                <div className="text-xs font-medium text-[#6b665e] mb-3">
                  How our multi-agency entity graph resolves and enriches each account:
                </div>
                <ul className="space-y-2.5 mb-6">
                  {activeEngine.whatWeClean.map((bullet) => (
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
                  <div className="text-[11px] text-[#6b665e]">Cross-Walked Statutory Sources</div>
                  <div className="text-xs font-medium text-[#141413] mt-0.5">
                    {activeEngine.sourceLabel}
                  </div>
                </div>
                <a
                  href="#live-explorer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] hover:text-[#2e6f40] transition-colors"
                >
                  Inspect stacked rows below
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Stats + Real Signal Preview Card */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                  <div className="text-xs text-[#6b665e] mb-1">Clean Universe Size</div>
                  <div className="text-lg sm:text-xl font-serif text-[#141413] font-medium">
                    {activeEngine.totalEntities}
                  </div>
                </div>
                <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                  <div className="text-xs text-[#6b665e] mb-1">Subscriber Target ACV</div>
                  <div className="text-lg sm:text-xl font-serif text-[#141413] font-medium">
                    {activeEngine.avgDealValue}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex-1 flex flex-col justify-between shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-medium text-[#6b665e]">
                      Sample Multi-Agency Stacked Signal
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded-md">
                      <Check className="w-3 h-3" />
                      SHA-256 + SMTP Verified
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf9f5] border border-black/8 space-y-3 mb-5">
                    <div>
                      <div className="text-[11px] text-[#6b665e]">Resolved Operating Entity</div>
                      <div className="text-sm font-medium text-[#141413]">
                        {activeEngine.sampleTrigger.entity}
                      </div>
                      <div className="text-xs text-[#6b665e] mt-0.5">
                        {activeEngine.sampleTrigger.location}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-black/8">
                      <div className="text-[11px] text-[#6b665e]">Detected Filing Delta</div>
                      <div className="text-xs font-medium text-[#141413] mt-0.5">
                        {activeEngine.sampleTrigger.signal}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-black/8">
                      <div className="text-[11px] text-[#6b665e]">Stacked Federal Agencies</div>
                      <div className="text-xs font-mono text-[#2e6f40] font-medium mt-0.5">
                        {activeEngine.sampleTrigger.stackedProof}
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-black/8">
                      <div className="text-[11px] text-[#6b665e]">Immediate Revenue Play</div>
                      <div className="text-xs text-[#141413] font-medium mt-0.5">
                        {activeEngine.sampleTrigger.buyerAction}
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/pricing"
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#141413] text-[#faf9f5] text-xs sm:text-sm font-medium hover:bg-[#2a2927] transition-colors flex items-center justify-center gap-2"
                >
                  Reserve Territory Slice (Max 5 Subscribers)
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE POWER-TABLE EXPLORER (Connected to Supabase 6-Table Vault + Grokbot/MCP Gateway) */}
      <section id="live-explorer" className="py-20 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              Live Canonical Vault · 76+ Production Multi-Agency Signals · Grokbot &amp; MCP Ready
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Inspect the stacked federal filings before you buy.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Every row below shows which federal agencies (`DOL Form 5500`, `SAM.gov`, `FDA 510(k)`,
              `DOT FMCSA`, `Federal OSHA`, `SEC Form D`, `SBA 504`, `Socrata Permits`) converged on
              that company. Click <strong>Connect Grokbot / MCP</strong> to query the live graph from
              your agent terminal.
            </p>
          </div>

          <PowerTableExplorer />
        </div>
      </section>

      {/* 4. THE 15-AGENCY FEDERAL STATUTORY MATRIX — Visual Proof of the Back-End Graph */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-medium text-[#2e6f40] mb-2">
              The 15-Agency Federal Statutory Graph · Universal 6-Table Schema
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Every federal agency we cross-walk onto one corporate spine.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Because all 15 agencies normalize into our canonical 6-table Postgres schema (
              <code className="font-mono text-xs text-[#141413]">sources_provenance</code>,{' '}
              <code className="font-mono text-xs text-[#141413]">entities</code>,{' '}
              <code className="font-mono text-xs text-[#141413]">facilities_sites</code>,{' '}
              <code className="font-mono text-xs text-[#141413]">compliance_filings</code>,{' '}
              <code className="font-mono text-xs text-[#141413]">signals_deltas</code>,{' '}
              <code className="font-mono text-xs text-[#141413]">contacts</code>), your team gets
              stacked multi-agency evidence on every row.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FIFTEEN_FEDERAL_AGENCIES.map((agency) => (
              <div
                key={agency.num}
                className="bg-white border border-black/10 rounded-2xl p-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-mono font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded-md">
                      Agency {agency.num}
                    </span>
                    <span className="text-[11px] font-mono text-[#6b665e] truncate">
                      {agency.key}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-medium text-[#141413] mb-1.5">
                    {agency.name}
                  </h3>
                  <p className="text-xs text-[#5c5852] leading-relaxed">{agency.trigger}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHO IS SALES AUTONOMY FOR — WhoIsBuildAbaFor 3-card layout */}
      <section className="py-20 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Built for High-ACV Outbound Teams &amp; AI Agents
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              One 15-agency graph. Four ways to consume it.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Whether your reps work out of a clean Monday morning spreadsheet or your RevOps team
              pipes signals straight into Grokbot, Claude MCP, Clay, and Salesforce, every pack
              ships in the exact same 6-table schema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {BUYER_PROFILES.map((card) => {
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

          {/* 4 Delivery Output Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: FileSpreadsheet,
                title: '1. Weekly Territory Digest',
                desc: 'Clean CSV & Parquet files delivered every Monday at 6:00 AM EST.',
              },
              {
                icon: Database,
                title: '2. Supabase RLS View',
                desc: 'Direct read-only Postgres connection isolated to your licensed territory.',
              },
              {
                icon: Webhook,
                title: '3. CRM & Clay Webhooks',
                desc: 'HMAC-SHA256 signed JSON payloads pushed to HubSpot, Salesforce, or Clay.',
              },
              {
                icon: Code2,
                title: '4. Grokbot, MCP & REST API',
                desc: 'Credit-metered /api/mcp, /api/v1/signals, and /llms.txt for autonomous agents.',
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

      {/* 6. TRANSPARENT PRICING COMPARISON — buildaba.com side-by-side rounded-2xl cards */}
      <section className="py-24 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Simple, Credit-Capped Territory Licensing
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Start with a 7-day territory pilot or subscribe monthly.
            </h2>
            <p className="text-base text-[#5c5852]">
              No annual lock-in required to test our data quality. Every tier includes our
              multi-agency stacked signals, 5-subscriber territory cap, and &lt;2% hard-bounce
              replacement guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Tier 1: Self-Serve Vertical Pack / 7-Day Pilot */}
            <div className="p-7 sm:p-9 rounded-2xl bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-[#6b665e]">
                    Single Pack + MCP / Grokbot API
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-[#f0eee6] text-[#141413]">
                    Most Popular
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-serif text-[#141413]">$799</span>
                  <span className="text-sm text-[#6b665e]">/ month · or $1,950 one-time pilot</span>
                </div>
                <p className="text-sm text-[#5c5852] mb-6 leading-relaxed">
                  For focused GTM teams licensing 1 vertical market pack (6–7 cross-walked federal
                  agencies) with weekly delta syncs and MCP/API access.
                </p>
                <ul className="space-y-3 text-sm text-[#141413] mb-8">
                  {[
                    'Choose 1 Flagship Pack (Healthcare/FDA, Fleet/OSHA, or Permits/Capital)',
                    '1,250 unique company contact unlocks/mo (~2,500 verified buyers)',
                    'Zero-cost agent discovery scans via /api/mcp & /api/v1/signals',
                    '<2.0% hard-bounce SLA with 2-for-1 automatic replacement',
                    'Or start with a $1,950 7-Day Territory Pilot (2,500 rows)',
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
                className="w-full min-h-[46px] py-3 px-5 rounded-xl bg-white hover:bg-[#f0eee6] text-[#141413] border border-black/15 font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                Compare Self-Serve &amp; Pilot Tiers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tier 2: Growth / Managed CRM Deployment */}
            <div className="p-7 sm:p-9 rounded-2xl bg-[#f0eee6] text-[#141413] border border-black/14 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-[#5c5852]">
                    Full 15-Agency Graph &amp; Managed RevOps
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-[#2e6f40] text-white">
                    Exclusive Territory Lock
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-serif text-[#141413]">$1,950</span>
                  <span className="text-sm text-[#5c5852]">
                    / month · or $9,500 turnkey CRM build
                  </span>
                </div>
                <p className="text-sm text-[#5c5852] mb-6 leading-relaxed">
                  Full multi-agency signal ingestion across all 15 federal datasets wired directly
                  into HubSpot, Salesforce, Clay, or Grokbot.
                </p>
                <ul className="space-y-3 text-sm text-[#141413] mb-8">
                  {[
                    '3,500 unique company contact unlocks/mo (~7,000 verified buyers)',
                    'Cross-signal stacking across all 15 Federal & Municipal Datasets',
                    'Automated CRM & Clay webhooks + Remote MCP / Grokbot API',
                    'Dedicated Slack data engineering channel & custom scoring rules',
                    '100% of your $1,950 7-Day Pilot credits toward the $9,500 build',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/hire/apply"
                className="w-full min-h-[46px] py-3 px-5 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Reserve a Territory or Pilot
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ — Calm rounded-2xl cards */}
      <section className="py-20 border-t border-black/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-medium text-[#6b665e] mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl font-serif tracking-tight text-[#141413] font-medium">
              Clear answers on the 15-agency graph, provenance, and Grokbot/MCP.
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

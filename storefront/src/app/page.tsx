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
  Building2,
  Truck,
  HeartPulse,
  HardHat,
  Target,
  Layers,
} from 'lucide-react';
import { PowerTableExplorer } from '@/components/vault/PowerTableExplorer';

interface MarketEngine {
  id: 'healthcare' | 'logistics' | 'construction';
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

const MARKET_ENGINES: MarketEngine[] = [
  {
    id: 'healthcare',
    tabLabel: '01 · Healthcare Clinics (NPPES)',
    badge: 'Engine 01 · Healthcare & Medical Clinics',
    title: 'Multi-Site Medical & Behavioral Clinic Expansion Vault',
    subtitle:
      'Every week, thousands of medical, dental, and behavioral health groups register a new location or appoint a new Medical Director in CMS NPPES. Raw federal exports bury the real parent company under messy LLC names and call-center phone numbers. We resolve the actual operating group, clinic domain, and verified executive inbox.',
    sourceLabel: 'CMS NPPES v2.1 + State Licensing Boards',
    cadence: 'Weekly SHA-256 Delta Sync',
    totalEntities: '142,800+ Multi-Site Clinic Groups',
    avgDealValue: '$18k – $85k ACV Buyers',
    icon: HeartPulse,
    whoBuys:
      'Built for Healthcare SaaS, RCM billing platforms, EHR vendors, medical device reps, and clinical staffing agencies.',
    whatWeClean: [
      'Links individual Type-2 NPIs back to their true multi-site parent group',
      'Strips generic front-desk reception numbers and resolves the real clinic web domain',
      'Identifies newly appointed Authorized Officials, Medical Directors, and Practice Managers',
      'Flags taxonomy switches and brand-new secondary clinic openings within 7 days of filing',
    ],
    sampleTrigger: {
      entity: 'Apex Behavioral Health Partners LLC',
      location: 'Austin, TX · Taxonomy 103K00000X',
      signal: 'New Secondary Clinic NPI Registered + New Authorized Official Appointed',
      buyerAction: 'Pitch EHR, RCM billing, and credentialing before opening day',
    },
  },
  {
    id: 'logistics',
    tabLabel: '02 · Fleet & Carriers (FMCSA)',
    badge: 'Engine 02 · Commercial Fleet & Freight',
    title: 'Mid-Market Fleet & Hazmat Carrier Trigger Vault',
    subtitle:
      'The U.S. DOT FMCSA census tracks over 750,000 active motor carriers, but 80% are single-truck owner-operators using personal Gmail accounts. We isolate commercial fleets operating 15 to 250+ power units, track MCS-150 fleet expansion filings, and surface carriers within 90 days of insurance or safety renewal.',
    sourceLabel: 'U.S. DOT FMCSA Census + Biennial MCS-150 Filings',
    cadence: 'Daily DOT Delta Sync',
    totalEntities: '68,400+ Commercial Fleets (15–250+ Trucks)',
    avgDealValue: '$25k – $120k ACV Buyers',
    icon: Truck,
    whoBuys:
      'Built for Fleet Telematics, ELD & dashcam vendors, commercial trucking insurance brokers, fuel card issuers, and freight factoring firms.',
    whatWeClean: [
      'Filters out 1-truck owner-operators so your reps only call 15–250+ unit commercial fleets',
      'Replaces free webmail addresses from DOT filings with verified corporate fleet domains',
      'Tracks power-unit and CDL driver headcount jumps across biennial MCS-150 updates',
      'Maps direct contact records for VP of Fleet Operations, Safety Directors, and Carrier Principals',
    ],
    sampleTrigger: {
      entity: 'Heartland Cold Chain Logistics Inc.',
      location: 'Dallas, TX · USDOT #3849201',
      signal: 'MCS-150 Amendment: +28 Power Units Added (74 Total Trucks) + Hazmat Active',
      buyerAction: 'Outreach to Safety Director & Fleet VP for ELD, telematics, and fleet coverage',
    },
  },
  {
    id: 'construction',
    tabLabel: '03 · Commercial Permits & Industrial',
    badge: 'Engine 03 · Commercial Construction & Industrial',
    title: 'High-Value Commercial Permit & Facility Expansion Vault',
    subtitle:
      'When a company files a $250,000+ commercial tenant buildout, warehouse expansion, or industrial equipment permit, they buy everything from HVAC and security systems to waste management and commercial lending in the next 45 days. We unify municipal Socrata permit feeds and resolve the tenant and general contractor.',
    sourceLabel: 'Municipal Socrata Building Permits + OSHA / EPA ECHO',
    cadence: 'Daily Municipal Permit Sync',
    totalEntities: '94,200+ Active Commercial Buildouts ($250k+)',
    avgDealValue: '$30k – $250k Project Buyers',
    icon: HardHat,
    whoBuys:
      'Built for Commercial HVAC & MEP suppliers, construction tech SaaS, equipment rental fleets, commercial insurance, and B2B facility services.',
    whatWeClean: [
      'Filters out residential deck/roof permits to isolate $250,000+ commercial and industrial buildouts',
      'Resolves both the expanding corporate tenant and the licensed General Contractor of record',
      'Pairs municipal permit valuations with facility square footage and inspection milestones',
      'Verifies Project Executives, Facilities Directors, and Operations VPs with <2% bounce guarantee',
    ],
    sampleTrigger: {
      entity: 'Vanguard Cold Storage & Distribution',
      location: 'Phoenix, AZ · Valuation $2,450,000',
      signal: 'Commercial Industrial Permit Issued: 85,000 SqFt Refrigerated Warehouse Buildout',
      buyerAction: 'Immediate outreach to Director of Facilities & GC Project Executive',
    },
  },
];

const BUYER_PROFILES = [
  {
    eyebrow: 'Vertical SaaS & Revenue Teams',
    title: 'Stop paying your AEs to clean spreadsheets',
    body: 'Your account executives lose 8 hours a week hunting down parent companies, checking websites, and guessing emails from raw government CSVs. We hand your team a pre-cleaned territory table ready for outbound on Monday morning.',
    cta: 'Explore live rows',
    href: '#live-explorer',
    icon: Target,
  },
  {
    eyebrow: 'RevOps & GTM Engineers',
    title: 'Drop-in canonical schema with weekly SHA-256 deltas',
    body: 'Every vertical engine shares our 6-table canonical schema. Pull clean weekly deltas via CSV/Parquet, query an isolated Supabase RLS view, or stream triggers straight into HubSpot, Salesforce, or Clay.',
    cta: 'View delivery specs',
    href: '/credibility',
    icon: Layers,
  },
  {
    eyebrow: 'Commercial Brokers & Agencies',
    title: 'Exclusive territory caps so your leads stay fresh',
    body: 'Apollo and ZoomInfo sell the exact same static contact to 10,000 seats. We cap every vertical territory at 5 active subscribers so your outreach lands in uncrowded decision-maker inboxes.',
    cta: 'Check territory availability',
    href: '/pricing',
    icon: ShieldCheck,
  },
];

const FAQS = [
  {
    q: 'Why buy a pre-cleaned vertical database instead of using Apollo or ZoomInfo?',
    a: 'Horizontal contact tools scrape LinkedIn and sell the same static titles to tens of thousands of users. In regulated industries like healthcare clinics, commercial fleets, and industrial buildouts, the real buying trigger happens in public compliance filings first—weeks before anyone updates a social profile. We clean those filings, link the parent entity, and verify the executive email.',
  },
  {
    q: 'How do you guarantee a <2% email bounce rate?',
    a: 'Every decision-maker email passes a three-stage verification gate before entering the vault: DNS/MX record validation, catch-all domain heuristics, and live SMTP handshake status. If any contact in your territory digest bounces above 2%, we replace it 2-for-1 on your next weekly sync.',
  },
  {
    q: 'What does the 5-seat territory cap mean?',
    a: 'To protect outreach conversion rates, we allow a maximum of 5 active licensing organizations per vertical + regional territory slice. Once a slice reaches 5 subscribers, new buyers join a waitlist or select an adjacent region.',
  },
  {
    q: 'How is the data delivered to our team?',
    a: 'You choose the delivery lane that fits your stack: (1) Weekly clean CSV/Parquet territory digests, (2) Direct read-only Supabase Postgres RLS view, (3) Automated CRM webhooks into HubSpot, Salesforce, or Clay, or (4) REST & MCP API access for AI agents.',
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
            <p className="text-xs font-medium text-[#6b665e] mb-4">
              Vertical Market Intelligence · Weekly SHA-256 Compliance Deltas · &lt;2% Bounce SLA
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-[3.65rem] font-serif tracking-tight mb-5 leading-[1.08] text-[#141413] font-medium">
              Pre-cleaned vertical market databases for B2B revenue teams.
            </h1>

            <p className="text-base sm:text-lg text-[#5c5852] max-w-2xl mb-8 leading-relaxed">
              Public federal and municipal filings know who is expanding, hiring, or renewing weeks
              before LinkedIn does—but the raw files are unusable. We turn messy CMS NPPES, U.S. DOT
              FMCSA, and Municipal Permit records into deduplicated accounts and SMTP-verified
              decision makers.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
              <a
                href="#live-explorer"
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl text-sm font-medium bg-[#141413] text-[#faf9f5] hover:bg-[#2a2927] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Explore Live Vault (66 Verified Signals)
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
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">305,400+</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Resolved multi-site entities across 3 flagship vertical packs
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">&lt; 2.0%</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Contractual hard-bounce SLA with 2-for-1 credit replacement
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">Max 5 Seats</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Strict anti-saturation cap per vertical territory slice
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#141413]">6-Table Schema</div>
              <div className="text-xs text-[#6b665e] mt-0.5">
                Drop-in CSV/Parquet, Supabase RLS View, CRM Webhook, or API
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 FLAGSHIP VERTICAL DATABASES — PracticePathShowcase style */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-xs font-medium text-[#6b665e] mb-2">
                Three Flagship Vertical Market Packs
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium">
                Pick your market. We handle the entity resolution.
              </h2>
            </div>

            {/* White rounded-xl pill tab switcher matching buildaba.com */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-black/10 self-start">
              {MARKET_ENGINES.map((engine) => (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => setActiveEngineId(engine.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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

                <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed mb-6">
                  {activeEngine.subtitle}
                </p>

                <div className="p-4 rounded-xl bg-[#faf9f5] border border-black/8 mb-6">
                  <div className="text-xs font-medium text-[#141413] mb-1">Ideal GTM Teams</div>
                  <p className="text-xs sm:text-sm text-[#5c5852] leading-relaxed">
                    {activeEngine.whoBuys}
                  </p>
                </div>

                <div className="text-xs font-medium text-[#6b665e] mb-3">
                  What our data pipeline cleans before delivery:
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
                  <div className="text-[11px] text-[#6b665e]">Primary Federal / Municipal Feed</div>
                  <div className="text-xs font-medium text-[#141413] mt-0.5">
                    {activeEngine.sourceLabel}
                  </div>
                </div>
                <a
                  href="#live-explorer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] hover:text-[#2e6f40] transition-colors"
                >
                  Inspect live rows below
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
                      Sample Verified Signal Delta
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded-md">
                      <Check className="w-3 h-3" />
                      SMTP Verified
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
                      <div className="text-[11px] text-[#6b665e]">Immediate Revenue Play</div>
                      <div className="text-xs text-[#2e6f40] font-medium mt-0.5">
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

      {/* 3. LIVE POWER-TABLE EXPLORER (Connected to Supabase 6-Table Vault) */}
      <section id="live-explorer" className="py-20 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Live Canonical Vault · 66 Production Federal &amp; Municipal Signals
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Inspect the actual rows before you buy.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Click any row to open the full 3-tab Signal Dossier: inspect the raw government
              filing, SHA-256 provenance hash, normalized parent entity, and verified decision-maker
              contact record.
            </p>
          </div>

          <PowerTableExplorer />
        </div>
      </section>

      {/* 4. WHO IS SALES AUTONOMY FOR — WhoIsBuildAbaFor 3-card layout */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Built for High-ACV Outbound Teams
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              One canonical data pipeline. Four ways to consume it.
            </h2>
            <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
              Whether your reps work out of a clean Monday morning spreadsheet or your RevOps team
              pipes signals straight into Clay and Salesforce, every pack ships in the exact same
              6-table schema.
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
                desc: 'Signed JSON payloads pushed directly to HubSpot, Salesforce, or Clay.',
              },
              {
                icon: Code2,
                title: '4. REST & MCP Server API',
                desc: 'Sub-50ms query endpoint for internal SDR agents and automated workflows.',
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

      {/* 5. TRANSPARENT PRICING COMPARISON — buildaba.com side-by-side rounded-2xl cards */}
      <section className="py-24 border-t border-black/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-medium text-[#6b665e] mb-2">
              Simple, Credit-Capped Territory Licensing
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium mb-3">
              Start with a 7-day territory pilot or subscribe monthly.
            </h2>
            <p className="text-base text-[#5c5852]">
              No annual lock-in required to test our data quality. Every tier is protected by our
              5-subscriber territory cap and &lt;2% hard-bounce replacement guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Tier 1: Self-Serve Vertical Pack / 7-Day Pilot */}
            <div className="p-7 sm:p-9 rounded-2xl bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-[#6b665e]">
                    Vertical Pack Subscription
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
                  For focused GTM teams licensing 1 vertical database pack with weekly delta syncs
                  and verified executive contacts.
                </p>
                <ul className="space-y-3 text-sm text-[#141413] mb-8">
                  {[
                    'Choose 1 Flagship Vertical (Healthcare, Fleet, or Permits)',
                    'Up to 1,500 verified decision-maker contacts + signals / mo',
                    'Weekly SHA-256 delta digests (CSV, Parquet, & Supabase View)',
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

            {/* Tier 2: Growth / Managed CRM Deployment (Featured warm sand card like buildaba.com) */}
            <div className="p-7 sm:p-9 rounded-2xl bg-[#f0eee6] text-[#141413] border border-black/14 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-[#5c5852]">
                    Growth &amp; Managed RevOps
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
                  Full multi-territory signal ingestion wired directly into HubSpot, Salesforce, or
                  Clay with custom ICP scoring rules.
                </p>
                <ul className="space-y-3 text-sm text-[#141413] mb-8">
                  {[
                    'Up to 5,000 verified decision-maker contacts + signals / mo',
                    'Access across all 3 Vertical Market Packs + custom filters',
                    'Automated CRM & Clay webhooks + REST / MCP API access',
                    'Dedicated Slack data engineering channel & custom fields',
                    'Optional $9,500 Managed CRM Deployment & Territory Lock',
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

      {/* 6. FAQ — Calm rounded-2xl cards on warm sand section */}
      <section className="py-20 bg-[#f0eee6]/55 border-t border-black/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-medium text-[#6b665e] mb-2">Frequently Asked Questions</p>
            <h2 className="text-3xl font-serif tracking-tight text-[#141413] font-medium">
              Clear answers on data quality, provenance, and compliance.
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

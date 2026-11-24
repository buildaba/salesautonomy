"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const THREE_SIMPLE_STEPS = [
  {
    num: "Step 01",
    title: "We watch public filings every day",
    body: "Government agencies publish insurance cancellations, safety inspections, clinic expansions, building permits, and contract renewals before buyers ever talk to vendors.",
  },
  {
    num: "Step 02",
    title: "We clean the company and find real buyers",
    body: "We connect local LLCs back to the real parent company, attach verified employee counts, strip out outside accountants, and verify executive emails.",
  },
  {
    num: "Step 03",
    title: "We send urgent accounts to your team",
    body: "Every account arrives with a plain-English reason to call, an official proof link, and a verified executive—in your CRM, spreadsheet, or API.",
  },
];

const INDUSTRY_PLAYBOOKS = [
  {
    badge: "Playbook 01 · Healthcare & Clinics",
    title: "Spot expanding medical, dental, and nursing groups",
    summary:
      "Multi-location clinics hide behind dozens of separate LLCs and call-center phone numbers. We roll every branch up to the real parent group.",
    steps: [
      "Group every individual clinic location under its true parent company and verified employee count.",
      "Find the real clinic owner, Managing Partner, COO, or CFO—never an outside billing agency.",
      "Check patient booking pages to see live clinic software like Athenahealth, ModMed, or Dentrix.",
      "Alert your reps when a group adds state licenses, pulls a build-out permit, or gets a 45-day Medicare inspection deadline.",
    ],
  },
  {
    badge: "Playbook 02 · Trucking & Factories",
    title: "Catch fleets facing insurance deadlines and factories after OSHA visits",
    summary:
      "Most carrier lists are 80% single-truck drivers using Gmail. We isolate real commercial fleets and multi-plant manufacturers facing active compliance clocks.",
    steps: [
      "Filter out 1-truck owner-operators so your reps only call 15–500+ truck commercial fleets.",
      "Catch 30-day truck insurance cancellation notices and 60-day annual policy renewals before coverage lapses.",
      "Flag newly opened federal OSHA inspections and EPA compliance schedules within days—not months later.",
      "Match every fleet and plant to verified corporate benefit filings to reach the internal CFO, HR lead, and Safety VP.",
    ],
  },
  {
    badge: "Playbook 03 · Gov Contractors & Commercial Builders",
    title: "Track expiring federal registrations, re-bids, and $100K+ permits",
    summary:
      "City building permits and federal contractor lists hide behind project LLCs and ID codes. We connect them back to real decision-makers.",
    steps: [
      "Watch federal contractor registries daily to flag registrations expiring in 30, 60, or 90 days.",
      "Track active federal contracts entering a 60-day re-bid window alongside newly won awards.",
      "Pull commercial construction permits over $100K and resolve project LLCs back to the parent builder.",
      "Verify direct work emails for the VP of Contracts, Procurement Lead, or CFO before you unlock.",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pb-16 border-b border-black/10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#6b665e] mb-3">
            How It Works · Plain-English Overview
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif tracking-tight leading-[1.08] text-[#141413] font-medium mb-5">
            How we turn public filings into ready-to-call sales leads.
          </h1>
          <p className="text-base sm:text-lg text-[#5c5852] leading-relaxed mb-8">
            Raw government data is messy, scattered across dozens of portals, and full of outside
            accountants. Here is how we turn it into clean, verified buyers for your sales team.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/hire/apply"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              Start 7-Day Pilot ($1,950)
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portal/demo"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-white border border-black/14 hover:bg-[#f0eee6] text-[#141413] text-sm font-medium inline-flex items-center justify-center transition-colors"
            >
              Browse Live Sample Leads
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Simple Steps */}
      <section className="py-16 bg-[#f0eee6]/55 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREE_SIMPLE_STEPS.map((item) => (
              <div
                key={item.num}
                className="bg-white border border-black/10 rounded-2xl p-7 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
              >
                <div className="text-xs font-medium text-[#2e6f40] mb-2">{item.num}</div>
                <h2 className="text-xl font-serif font-medium text-[#141413] mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-[#5c5852] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Industry Playbooks */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#6b665e] mb-2">
            Step-by-Step by Industry
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-[#141413] font-medium">
            Exactly what we track in each market.
          </h2>
        </div>

        <div className="space-y-8">
          {INDUSTRY_PLAYBOOKS.map((play) => (
            <div
              key={play.badge}
              className="bg-white border border-black/10 rounded-2xl p-7 sm:p-10 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#ecfdf5] border border-[#a7f3d0] text-xs font-medium text-[#2e6f40] mb-3">
                    {play.badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413]">
                    {play.title}
                  </h3>
                  <p className="text-sm text-[#5c5852] mt-2 leading-relaxed">
                    {play.summary}
                  </p>
                </div>
                <Link
                  href="/hire/apply"
                  className="min-h-[42px] px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-xs font-medium transition-colors inline-flex items-center gap-1.5 self-start md:self-auto shrink-0"
                >
                  Run Pilot in This Industry
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {play.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-[#faf9f5] border border-black/8 rounded-xl p-5"
                  >
                    <div className="text-xs font-medium text-[#2e6f40] mb-2">
                      Step 0{sIdx + 1}
                    </div>
                    <p className="text-sm text-[#141413] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clean Delivery Recap */}
        <div className="mt-14 bg-[#f0eee6] border border-black/12 rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <p className="text-xs font-medium text-[#2e6f40] mb-2">
                Always Fresh · Never Messy
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#141413] mb-3">
                Ready to see how many active buyers your CRM is missing?
              </h2>
              <ul className="space-y-2 text-sm text-[#5c5852]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0" />
                  <span>Old alerts age out automatically so reps focus on live deadlines.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0" />
                  <span>Syncs safely into HubSpot, Salesforce, Clay, or Monday spreadsheets.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0" />
                  <span>Start with a 7-day pilot for $1,950 (100% credited toward upgrade).</span>
                </li>
              </ul>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3">
              <Link
                href="/hire/apply"
                className="min-h-[46px] px-6 py-3 rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                Get Free Territory Count
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/credibility"
                className="min-h-[46px] px-6 py-3 rounded-xl bg-white border border-black/14 hover:bg-[#faf9f5] text-[#141413] text-sm font-medium inline-flex items-center justify-center transition-colors"
              >
                Read Our Data Accuracy Rules
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

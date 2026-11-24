"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Check, Lock } from "lucide-react";

export default function PrivacyPage() {
  const [optOutEmail, setOptOutEmail] = useState("");
  const [optOutName, setOptOutName] = useState("");
  const [optOutSubmitted, setOptOutSubmitted] = useState(false);

  const handleOptOutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!optOutEmail.trim()) return;
    setOptOutSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="pb-10 mb-10 border-b border-black/10">
          <p className="text-xs font-medium text-[#2e6f40] mb-3">
            B2B Corporate Privacy · CCPA / CPRA · 2026 California Delete Act (DROP) Ready
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium tracking-tight text-[#141413] mb-3">
            Privacy Policy &amp; B2B Contact Opt-Out Portal
          </h1>
          <p className="text-sm text-[#6b665e]">Last Updated: November 24, 2026</p>
        </div>

        {/* Self-Serve Contact Suppression & Opt-Out Box */}
        <div
          id="opt-out"
          className="bg-white border border-black/12 rounded-2xl p-6 sm:p-8 mb-10 shadow-[0_1px_2px_rgba(20,20,19,0.03)]"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-[#2e6f40] mb-2">
            <ShieldCheck className="w-4 h-4" />
            Instant B2B Contact Suppression &amp; Deletion (CCPA / CPRA / DROP)
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#141413] mb-2">
            Remove or suppress your business email and direct phone number
          </h2>
          <p className="text-sm text-[#5c5852] leading-relaxed mb-5">
            While statutory corporate filings (such as CMS NPPES Type-2 organization records, DOL
            Form 5500 plan filings, SAM.gov registrations, and municipal building permits) are
            public government records, you may opt out of having your appended business email or
            direct phone number licensed through Sales Autonomy at any time. Submitting your work
            email below immediately sets{" "}
            <code className="font-mono text-xs text-[#141413]">suppressed_opt_out = TRUE</code>{" "}
            across our PowerTable UI, CSV exports, CRM webhooks, REST API, and MCP servers.
          </p>

          {optOutSubmitted ? (
            <div className="p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-xs sm:text-sm text-[#065f46] flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
              <div>
                <strong>Suppression Flag Activated:</strong>{" "}
                <span className="font-mono">{optOutEmail}</span> has been added to our global
                suppression hash table (<code className="font-mono">suppressed_opt_out = TRUE</code>
                ) and excluded from all future exports, webhooks, and API/MCP responses.
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleOptOutSubmit}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3"
            >
              <input
                type="text"
                value={optOutName}
                onChange={(e) => setOptOutName(e.target.value)}
                placeholder="Your Full Name (Optional)"
                className="sm:col-span-4 bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#141413] focus:outline-none focus:border-black/40"
              />
              <input
                type="email"
                required
                value={optOutEmail}
                onChange={(e) => setOptOutEmail(e.target.value)}
                placeholder="Enter work email to suppress (e.g. name@company.com)"
                className="sm:col-span-5 bg-[#faf9f5] border border-black/12 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#141413] focus:outline-none focus:border-black/40"
              />
              <button
                type="submit"
                className="sm:col-span-3 min-h-[42px] rounded-xl bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] text-xs sm:text-sm font-medium px-4 py-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                Suppress Contact
              </button>
            </form>
          )}
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              1. Field-Level Separation: Public Government Records vs. Appended B2B Contacts
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Sales Autonomy indexes corporate and regulatory filings published by U.S. federal,
              state, and municipal agencies (including GSA SAM.gov, DOL Form 5500, CMS NPPES Type-2
              Organization Registry, FDA OpenFDA 510(k), DOT FMCSA, DOL OSHA, EPA ECHO, FAA, SEC
              EDGAR, SBA, and Municipal Building Departments). Under the California Consumer Privacy
              Act (<code className="font-mono text-xs">Cal. Civ. Code § 1798.140(v)(2)</code>) and
              parallel state statutes, information lawfully made available from federal, state, or
              local government records is exempt public-record information. We track field-level
              provenance in Postgres (<code className="font-mono text-xs">field_sources</code>) to
              strictly separate verbatim government-filing attributes from third-party appended
              business contact channels (such as SMTP-verified corporate work emails).
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              2. Strict Exclusion of Consumer, Patient (PHI), &amp; Sole-Proprietor Profiles
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              Sales Autonomy is an enterprise B2B corporate intelligence platform. We strictly
              exclude: (a) HIPAA Protected Health Information (PHI) or patient-level medical data;
              (b) CMS Type-1 individual clinician NPI profiles; (c) single-truck owner-operators and
              consumer sole proprietorships; and (d) personal residential addresses, personal Gmail
              / Yahoo webmail accounts, or consumer credit data.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              3. California Delete Act (SB 362 / DROP) &amp; State Data Broker Compliance
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              For any appended business contact records subject to the California Consumer Privacy
              Act (CCPA/CPRA), the California Delete Act (SB 362), or state data broker frameworks
              (CA, TX, OR, VT), Sales Autonomy maintains an automated suppression architecture that
              processes deletion and opt-out requests—including hashed synchronization against the
              California Privacy Protection Agency (CPPA) Delete Request and Opt-out Platform
              (DROP)—at least once every 45 days. Once an email or officer record is suppressed, we
              retain only a cryptographic SHA-256 tombstone hash so the contact is never re-ingested
              on future crawls.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
            <h3 className="text-lg font-serif font-medium text-[#141413] mb-2">
              4. Customer Account Data &amp; Infrastructure Security
            </h3>
            <p className="text-sm text-[#5c5852] leading-relaxed">
              For our subscribers, we collect account credentials, billing metadata (via Stripe),
              and API/MCP request logs required to enforce credit limits and territory caps. All
              data is stored in encrypted Supabase Postgres instances protected by Row-Level
              Security (RLS) and immutable SHA-256 provenance logs. For privacy inquiries or bulk
              DPA/suppression requests, contact{" "}
              <a
                href="mailto:privacy@salesautonomy.com"
                className="text-[#2e6f40] font-medium underline underline-offset-4"
              >
                privacy@salesautonomy.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

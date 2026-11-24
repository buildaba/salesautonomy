"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const INDUSTRY_OPTIONS = [
  {
    id: "healthcare",
    label: "Healthcare & Clinics",
    desc: "Multi-site medical, dental, and nursing groups",
    defaultTarget: "Multi-site orthopedic, dermatology, or dental groups (3–40 clinics)",
  },
  {
    id: "fleet",
    label: "Trucking & Factories",
    desc: "Commercial truck fleets and manufacturing plants",
    defaultTarget: "15–250 truck fleets in the Midwest/South or multi-plant manufacturers",
  },
  {
    id: "contractors",
    label: "Gov Contractors & Builders",
    desc: "Federal contractors and commercial construction firms",
    defaultTarget: "Federal subcontractors or commercial builders pulling $250K+ permits",
  },
  {
    id: "all",
    label: "All 3 Industries",
    desc: "Enterprise or agency coverage across every market",
    defaultTarget: "Multi-industry territory coverage across the U.S.",
  },
];

const DELIVERY_OPTIONS = [
  "HubSpot",
  "Salesforce",
  "Clay",
  "Weekly CSV Spreadsheet",
  "API / Data Warehouse",
];

export default function StartPilotPage() {
  const [submitted, setSubmitted] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industryId, setIndustryId] = useState("healthcare");
  const [targetTerritory, setTargetTerritory] = useState(
    INDUSTRY_OPTIONS[0].defaultTarget
  );
  const [planChoice, setPlanChoice] = useState(
    "7-Day Territory Pilot ($1,950 one-time · 100% credit toward upgrade)"
  );
  const [deliveryMethod, setDeliveryMethod] = useState("HubSpot");

  const activeIndustry =
    INDUSTRY_OPTIONS.find((item) => item.id === industryId) || INDUSTRY_OPTIONS[0];

  const handleSelectIndustry = (id: string) => {
    setIndustryId(id);
    const match = INDUSTRY_OPTIONS.find((item) => item.id === id);
    if (match) {
      setTargetTerritory(match.defaultTarget);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="mb-12 pb-8 border-b border-black/10">
          <p className="text-xs font-medium text-[#6b665e] mb-3">
            7-Day Territory Pilot ($1,950) · Free Market Count First
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#141413] font-medium leading-[1.08]">
                Get a free market count in 24 hours.
              </h1>
              <p className="text-base sm:text-lg text-[#5c5852] mt-3 leading-relaxed">
                Tell us who you sell to below. We will count how many matching companies and active
                deadlines sit in your territory before you spend a dollar.
              </p>
            </div>
            <Link
              href="/portal/demo"
              className="text-sm font-medium text-[#141413] underline underline-offset-4 hover:text-[#2e6f40] shrink-0"
            >
              Browse live sample leads →
            </Link>
          </div>
        </div>

        {submitted ? (
          <div className="max-w-3xl mx-auto bg-white border border-black/10 rounded-2xl p-8 md:p-12 space-y-8 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2e6f40] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-1 rounded-md mb-3">
                <Check className="w-3.5 h-3.5" />
                Request Received
              </div>
              <h2 className="text-3xl font-serif font-medium text-[#141413] mb-2">
                We are running your territory count for {companyName || "your team"}.
              </h2>
              <p className="text-sm sm:text-base text-[#5c5852] leading-relaxed">
                Within 24 hours, we will email your exact account count, active trigger volume, and
                7-day pilot kickoff link to{" "}
                <strong className="text-[#141413] font-medium">
                  {contactEmail || "your work email"}
                </strong>
                .
              </p>
            </div>

            <div className="p-6 bg-[#faf9f5] border border-black/8 rounded-xl space-y-3.5">
              <div className="text-xs font-semibold text-[#141413]">What Happens Next</div>
              <ul className="space-y-2.5 text-sm text-[#5c5852]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141413]">Free Territory Count (24 Hours):</strong> We
                    check {activeIndustry.label} and send your exact count of matching companies.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141413]">7-Day Pilot ($1,950):</strong> You get 2,500
                    accounts, 5,000 verified executive emails, active deadlines, and a Missing
                    Accounts Report delivered to {deliveryMethod}.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141413]">100% Rollover Credit:</strong> Upgrade within
                    30 days and every dollar of your $1,950 comes off full CRM setup.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/portal/demo"
                className="flex-1 min-h-[46px] bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] font-medium py-3 px-5 rounded-xl text-center transition-colors text-sm flex items-center justify-center gap-2"
              >
                Browse Live Sample Leads
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-xl border border-black/14 bg-white hover:bg-[#f0eee6] text-sm font-medium text-[#141413] cursor-pointer"
              >
                Edit Request
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: 4-Step Simple Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              {/* Step 1: Your Info */}
              <div className="bg-white border border-black/10 rounded-2xl p-7 space-y-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div>
                  <div className="text-xs font-medium text-[#2e6f40] mb-1">Step 1 of 4</div>
                  <h2 className="text-xl font-serif font-medium text-[#141413]">
                    Where should we send your free territory count?
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full rounded-xl bg-[#faf9f5] border border-black/14 px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#141413]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@yourcompany.com"
                      className="w-full rounded-xl bg-[#faf9f5] border border-black/14 px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#141413]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your company name"
                    className="w-full rounded-xl bg-[#faf9f5] border border-black/14 px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                </div>
              </div>

              {/* Step 2: Industry */}
              <div className="bg-white border border-black/10 rounded-2xl p-7 space-y-4 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div>
                  <div className="text-xs font-medium text-[#2e6f40] mb-1">Step 2 of 4</div>
                  <h2 className="text-xl font-serif font-medium text-[#141413]">
                    Which industry do you sell into?
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INDUSTRY_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectIndustry(item.id)}
                      className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                        industryId === item.id
                          ? "bg-[#141413] text-[#faf9f5] border-[#141413]"
                          : "bg-[#faf9f5] text-[#141413] border-black/12 hover:border-black/30"
                      }`}
                    >
                      <div className="text-sm font-medium">{item.label}</div>
                      <div
                        className={`text-xs mt-1 ${
                          industryId === item.id ? "text-[#faf9f5]/75" : "text-[#6b665e]"
                        }`}
                      >
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Target Buyers & Plan */}
              <div className="bg-white border border-black/10 rounded-2xl p-7 space-y-5 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div>
                  <div className="text-xs font-medium text-[#2e6f40] mb-1">Step 3 of 4</div>
                  <h2 className="text-xl font-serif font-medium text-[#141413]">
                    Describe your ideal customer &amp; territory
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    Target States, Company Size, or Buyer Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetTerritory}
                    onChange={(e) => setTargetTerritory(e.target.value)}
                    placeholder="e.g. 20–200 truck fleets in TX and IL"
                    className="w-full rounded-xl bg-[#faf9f5] border border-black/14 px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5c5852] mb-1.5">
                    Starting Plan
                  </label>
                  <select
                    value={planChoice}
                    onChange={(e) => setPlanChoice(e.target.value)}
                    className="w-full rounded-xl bg-[#faf9f5] border border-black/14 px-3.5 py-2.5 text-sm text-[#141413] focus:outline-none focus:border-[#141413]"
                  >
                    <option value="7-Day Territory Pilot ($1,950 one-time · 100% credit toward upgrade)">
                      7-Day Territory Pilot ($1,950 one-time · 100% credit toward upgrade)
                    </option>
                    <option value="Self-Serve Portal & API ($799/mo billed quarterly)">
                      Self-Serve Portal &amp; API ($799/mo billed quarterly)
                    </option>
                    <option value="Managed CRM Sync ($9,500 setup + $1,950/mo)">
                      Managed CRM Sync ($9,500 setup + $1,950/mo)
                    </option>
                    <option value="Enterprise — All 3 Industries ($18,000 setup + $3,950/mo)">
                      Enterprise — All 3 Industries ($18,000 setup + $3,950/mo)
                    </option>
                  </select>
                </div>
              </div>

              {/* Step 4: CRM / Delivery */}
              <div className="bg-white border border-black/10 rounded-2xl p-7 space-y-4 shadow-[0_1px_2px_rgba(20,20,19,0.03)]">
                <div>
                  <div className="text-xs font-medium text-[#2e6f40] mb-1">Step 4 of 4</div>
                  <h2 className="text-xl font-serif font-medium text-[#141413]">
                    How does your team want to receive leads?
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {DELIVERY_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDeliveryMethod(option)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                        deliveryMethod === option
                          ? "bg-[#141413] text-[#faf9f5] border-[#141413]"
                          : "bg-[#faf9f5] text-[#141413] border-black/14 hover:bg-[#f0eee6]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[50px] bg-[#141413] hover:bg-[#2a2927] text-[#faf9f5] font-medium py-3.5 px-6 rounded-xl transition-colors text-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                Get My Free Territory Count
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* RIGHT COLUMN: Simple Pilot Summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-[#f0eee6] border border-black/12 rounded-2xl p-7 space-y-6">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#2e6f40] text-white text-xs font-medium mb-3">
                    7-Day Territory Pilot · $1,950
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-[#141413]">
                    What you get in 7 days
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5c5852] mt-1.5 leading-relaxed">
                    Zero commitment until you see your free market count first.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-[#141413]">
                  {[
                    "2,500 target accounts matched against your current CRM export",
                    "5,000 verified executive emails (<2% bounce guarantee)",
                    "Active 30, 60, and 90-day buying triggers with official proof links",
                    "Missing Accounts Report showing every buyer your CRM missed",
                    "100% of your $1,950 credits toward full CRM setup within 30 days",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#2e6f40] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-black/10 space-y-2 text-xs text-[#5c5852]">
                  <div>
                    <strong className="text-[#141413]">Selected Industry:</strong>{" "}
                    {activeIndustry.label}
                  </div>
                  <div>
                    <strong className="text-[#141413]">Delivery:</strong> {deliveryMethod}
                  </div>
                  <div>
                    <strong className="text-[#141413]">Territory Protection:</strong> Max 5
                    subscribers per industry &amp; region
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

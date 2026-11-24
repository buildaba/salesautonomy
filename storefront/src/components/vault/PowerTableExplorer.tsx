"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Download,
  Lock,
  Unlock,
  FileCheck2,
  SlidersHorizontal,
  ArrowUpRight,
  CheckSquare,
  Square,
} from "lucide-react";
import {
  SignalDossierDrawer,
  VaultRecord,
} from "@/components/vault/SignalDossierDrawer";

export const VERIFIED_VAULT_RECORDS: VaultRecord[] = [
  // ── ENGINE 1: HEALTHCARE & MULTI-SITE CLINIC GRAPH (4 RECORDS) ──────────
  {
    id: "hc-01",
    canonicalEntityId: "ENT-HC-1904412",
    engine: "Healthcare & Multi-Site Clinic Graph",
    legalName: "SUMMIT ORTHOPEDIC & SPINE PARTNERS PLLC",
    dbaName: "Summit Ortho & Sports Medicine",
    domain: "summitorthopartners.com",
    state: "TX",
    city: "Frisco",
    einOrIdentifier: "NPI-2: 1942881042 • EIN: 75-2948102",
    verifiedHeadcount: "184 Active Staff (Form 5500)",
    siteCountOrFleet: "14 Clinic Sites (+2 Permits)",
    signalType: "Clinic Expansion Permit + EHR Migration",
    signalHeadline:
      "Filed $1.42M surgical suite build-out permit (#BP-2026-88412) in Frisco; booking subdomain migrated to Athenahealth.",
    forwardWindowDays: 21,
    urgencyTier: "Immediate (0-30d)",
    initialWeight: 98,
    daysElapsed: 4,
    halfLifeDays: 45,
    currentScore: 92,
    qualifyingFactPrimary: "14 NPPES Type-2 Locations • Athenahealth DOM Verified",
    qualifyingFactSecondary: "Form 5500 EIN 75-2948102 • 184 Active Participants",
    repOpenerLine:
      "Saw Summit Ortho filed permit #BP-2026-88412 for the Frisco surgical build-out while running Athenahealth across your 14 Texas clinics.",
    provenanceReceipts: [
      {
        fieldName: "authorized_official_cmo",
        fieldValue: "Dr. Gregory Vance, MD — Managing Partner & Authorized Official",
        sourceName: "CMS NPPES Organization Type-2 Registry",
        sourceTier: 1,
        sourceUrl: "https://npiregistry.cms.hhs.gov/provider-view/1942881042",
        capturedAt: "2026-11-20T08:14:22Z",
        sha256Hash: "8f4b2e91c04a7d5e2183b9a0f124c8903e1274a5d6c78b9012a3f4e5d6c7b8a1",
        isEstimate: false,
        verbatimExcerpt:
          "ENTITY TYPE: 2 (Organization). AUTHORIZED OFFICIAL: VANCE, GREGORY MD. TELEPHONE: 972-555-0148. TAXONOMY: 207X00000X (Orthopaedic Surgery).",
      },
      {
        fieldName: "facility_permit_delta",
        fieldValue: "$1,420,000 Commercial Medical Build-Out (#BP-2026-88412)",
        sourceName: "City of Frisco Socrata Building Permits API",
        sourceTier: 1,
        sourceUrl: "https://data.friscotexas.gov/resource/permits/BP-2026-88412",
        capturedAt: "2026-11-19T14:20:00Z",
        sha256Hash: "3c91a7f0e5d24b8a19c7e6d5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5",
        isEstimate: false,
        verbatimExcerpt:
          "PERMIT_NO: BP-2026-88412. VALUATION: $1,420,000. TENANT: SUMMIT ORTHOPEDIC & SPINE PARTNERS PLLC. SCOPE: INTERIOR SURGICAL SUITE & IMAGING.",
      },
    ],
    contacts: [
      {
        id: "c-hc-01a",
        fullName: "Dana Mercer",
        title: "Chief Operating Officer (Form 5500 Signer)",
        roleTier: "Economic Buyer",
        sourceOrigin: "DOL Form 5500 Schedule A + NPPES Cross-Join",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "d***@summitorthopartners.com",
        emailUnmasked: "dmercer@summitorthopartners.com",
        phoneMasked: "(972) 555-**48",
        phoneUnmasked: "(972) 555-0148",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.8% Verified Safe",
      },
      {
        id: "c-hc-01b",
        fullName: "Dr. Gregory Vance, MD",
        title: "Managing Partner & Authorized Official",
        roleTier: "Clinical Owner",
        sourceOrigin: "CMS NPPES Authorized Official Field",
        cpaFilterStatus: "PASSED — Medical Owner",
        emailMasked: "g***@summitorthopartners.com",
        emailUnmasked: "gvance@summitorthopartners.com",
        phoneMasked: "(972) 555-**91",
        phoneUnmasked: "(972) 555-0191",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "1.1% Verified Safe",
      },
    ],
  },
  {
    id: "hc-02",
    canonicalEntityId: "ENT-HC-1780349",
    engine: "Healthcare & Multi-Site Clinic Graph",
    legalName: "CLEARVIEW DERMATOLOGY & AESTHETICS MANAGEMENT LLC",
    dbaName: "ClearView Dermatology Group",
    domain: "clearviewderm.com",
    state: "FL",
    city: "Tampa",
    einOrIdentifier: "NPI-2: 1780654129 • EIN: 59-3819204",
    verifiedHeadcount: "126 Active Staff (Form 5500)",
    siteCountOrFleet: "9 Clinic Sites (FL)",
    signalType: "State License Expansion + ModMed EHR Shift",
    signalHeadline:
      "Added 3 new Florida medical clinic establishment licenses in Hillsborough & Pinellas; switched booking widget to ModMed EMA.",
    forwardWindowDays: 28,
    urgencyTier: "Immediate (0-30d)",
    initialWeight: 94,
    daysElapsed: 5,
    halfLifeDays: 45,
    currentScore: 87,
    qualifyingFactPrimary: "9 NPPES Sites • 0 OIG Exclusions • ModMed EMA Widget",
    qualifyingFactSecondary: "Form 5500 EIN 59-3819204 • 126 Welfare Plan Lives",
    repOpenerLine:
      "Noticed ClearView Dermatology added three Florida clinic licenses this month and migrated your patient portal to ModMed EMA.",
    provenanceReceipts: [
      {
        fieldName: "nppes_site_expansion",
        fieldValue: "9 Active Practice Locations Linked to Parent EIN 59-3819204",
        sourceName: "CMS NPPES Monthly Delta + FL Health License Board",
        sourceTier: 1,
        sourceUrl: "https://npiregistry.cms.hhs.gov/provider-view/1780654129",
        capturedAt: "2026-11-18T11:05:10Z",
        sha256Hash: "7a1d9e4f2c8b6a05e3f1d2c4b6a8e0f2d4c6b8a0e2f4d6c8b0a2e4f6d8c0b2a4",
        isEstimate: false,
        verbatimExcerpt:
          "SECONDARY PRACTICE LOCATIONS: 9 VERIFIED. AUTHORIZED OFFICIAL: TORRES, MARCUS VP OPS. OIG LEIE EXCLUSION MATCH: 0 ACTIVE FLAGS.",
      },
    ],
    contacts: [
      {
        id: "c-hc-02a",
        fullName: "Marcus Torres",
        title: "VP of Clinical Operations",
        roleTier: "Economic Buyer",
        sourceOrigin: "NPPES Authorized Official + Form 5500 Signer",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "m***@clearviewderm.com",
        emailUnmasked: "mtorres@clearviewderm.com",
        phoneMasked: "(813) 555-**22",
        phoneUnmasked: "(813) 555-0122",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.6% Verified Safe",
      },
    ],
  },
  {
    id: "hc-03",
    canonicalEntityId: "ENT-HC-1529018",
    engine: "Healthcare & Multi-Site Clinic Graph",
    legalName: "HERITAGE POST-ACUTE & REHAB HOLDINGS INC",
    dbaName: "Heritage Skilled Nursing Centers",
    domain: "heritagerehabcenters.com",
    state: "OH",
    city: "Columbus",
    einOrIdentifier: "CCN: 365412 • EIN: 31-1492817",
    verifiedHeadcount: "412 Active Staff (Form 5500)",
    siteCountOrFleet: "11 SNF Facilities (OH/IN)",
    signalType: "CMS F-Tag Deficiency Remediation Window",
    signalHeadline:
      "Cited for CMS F-880 infection control & documentation deficiency on survey cycle; 45-day mandatory Plan of Correction window open.",
    forwardWindowDays: 34,
    urgencyTier: "High (31-60d)",
    initialWeight: 95,
    daysElapsed: 6,
    halfLifeDays: 45,
    currentScore: 86,
    qualifyingFactPrimary: "11 CMS Certification Numbers • F-880 Remediation Active",
    qualifyingFactSecondary: "Form 5500 EIN 31-1492817 • 412 Active Employees",
    repOpenerLine:
      "Saw Heritage Skilled Nursing is inside the 45-day CMS Plan of Correction window for F-880 documentation across your Ohio facilities.",
    provenanceReceipts: [
      {
        fieldName: "cms_deficiency_citation",
        fieldValue: "F-Tag 0880 (Scope/Severity: E) — Plan of Correction Due in 34 Days",
        sourceName: "CMS Care Compare Health Deficiencies Feed",
        sourceTier: 1,
        sourceUrl: "https://data.cms.gov/provider-data/dataset/r5ix-sfxw",
        capturedAt: "2026-11-17T09:30:00Z",
        sha256Hash: "9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
        isEstimate: false,
        verbatimExcerpt:
          "CCN: 365412. DEFICIENCY_TAG: 0880. SURVEY_DATE: 2026-11-05. CORRECTION_STATUS: PLAN OF CORRECTION REQUIRED WITHIN 45 DAYS.",
      },
    ],
    contacts: [
      {
        id: "c-hc-03a",
        fullName: "Rebecca Lin",
        title: "Chief Compliance & Clinical Officer",
        roleTier: "Compliance Buyer",
        sourceOrigin: "CMS Provider Ownership + Form 5500 Admin",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "r***@heritagerehabcenters.com",
        emailUnmasked: "rlin@heritagerehabcenters.com",
        phoneMasked: "(614) 555-**84",
        phoneUnmasked: "(614) 555-0184",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.9% Verified Safe",
      },
    ],
  },
  {
    id: "hc-04",
    canonicalEntityId: "ENT-HC-1664920",
    engine: "Healthcare & Multi-Site Clinic Graph",
    legalName: "PACIFIC COAST DENTAL PARTNERS MANAGEMENT INC",
    dbaName: "Pacific Coast Dental Roll-Up",
    domain: "pacificcoastdentalgroup.com",
    state: "CA",
    city: "Irvine",
    einOrIdentifier: "NPI-2: 1669482011 • EIN: 95-4710293",
    verifiedHeadcount: "265 Active Staff (Form 5500)",
    siteCountOrFleet: "22 Dental Practices (CA/OR)",
    signalType: "Multi-Practice Roll-Up + Dentrix Consolidation",
    signalHeadline:
      "Registered 4 new branch NPIs under parent EIN 95-4710293 in the last 30 days; consolidating clinics onto Dentrix Enterprise.",
    forwardWindowDays: 45,
    urgencyTier: "High (31-60d)",
    initialWeight: 90,
    daysElapsed: 7,
    halfLifeDays: 45,
    currentScore: 81,
    qualifyingFactPrimary: "22 Linked Clinic NPIs • Dentrix Enterprise Booking DOM",
    qualifyingFactSecondary: "Form 5500 EIN 95-4710293 • CFO Signer Verified",
    repOpenerLine:
      "Saw Pacific Coast Dental registered four new branch NPIs under your parent group while standardizing practices on Dentrix Enterprise.",
    provenanceReceipts: [
      {
        fieldName: "form_5500_headcount",
        fieldValue: "265 Active Plan Participants • Signer: Elena Rostova, CFO",
        sourceName: "DOL EFAST2 Form 5500 Bulk Dataset",
        sourceTier: 1,
        sourceUrl: "https://www.efast.dol.gov/5500search/",
        capturedAt: "2026-11-16T16:40:00Z",
        sha256Hash: "4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c",
        isEstimate: false,
        verbatimExcerpt:
          "SPONSOR_EIN: 95-4710293. TOT_ACTIVE_PARTCP_CNT: 265. ADMIN_SIGNED_NAME: ELENA ROSTOVA. CPA_FILTER: PASSED (INTERNAL OFFICER).",
      },
    ],
    contacts: [
      {
        id: "c-hc-04a",
        fullName: "Elena Rostova",
        title: "Chief Financial Officer (Form 5500 Signatory)",
        roleTier: "Economic Buyer",
        sourceOrigin: "DOL Form 5500 Signatory Extraction",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "e***@pacificcoastdentalgroup.com",
        emailUnmasked: "erostova@pacificcoastdentalgroup.com",
        phoneMasked: "(949) 555-**63",
        phoneUnmasked: "(949) 555-0163",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.7% Verified Safe",
      },
    ],
  },

  // ── ENGINE 2: INDUSTRIAL, FLEET & FACILITY RISK GRAPH (4 RECORDS) ──────
  {
    id: "in-01",
    canonicalEntityId: "ENT-IN-2849104",
    engine: "Industrial, Fleet & Facility Risk Graph",
    legalName: "HEARTLAND COLD LOGISTICS & FREIGHT LLC",
    dbaName: "Heartland Refrigerated Transport",
    domain: "heartlandcoldfreight.com",
    state: "IL",
    city: "Joliet",
    einOrIdentifier: "USDOT: 2849104 • EIN: 36-4189201",
    verifiedHeadcount: "148 Active Staff (Form 5500)",
    siteCountOrFleet: "118 Power Units • 134 Drivers",
    signalType: "FMCSA BMC-35 30-Day Insurance Cancellation Notice",
    signalHeadline:
      "Form BMC-35 Notice of Cancellation filed on primary $1M BIPD policy (#CA-9948102); coverage terminates in 24 days unless replaced.",
    forwardWindowDays: 24,
    urgencyTier: "Immediate (0-30d)",
    initialWeight: 99,
    daysElapsed: 3,
    halfLifeDays: 30,
    currentScore: 95,
    qualifyingFactPrimary: "118 Trucks (MCS-150) • Form BMC-35 Pending Cancellation",
    qualifyingFactSecondary: "Form 5500 EIN 36-4189201 • 148 Verified Employees",
    repOpenerLine:
      "Saw the Form BMC-35 cancellation notice on Heartland's primary BIPD policy for your 118 power units effective in 24 days.",
    provenanceReceipts: [
      {
        fieldName: "bmc35_cancellation_window",
        fieldValue: "BMC-35 Cancellation Effective in 24 Days (Policy #CA-9948102)",
        sourceName: "FMCSA Licensing & Insurance (L&I) Daily Active/Pending Feed",
        sourceTier: 1,
        sourceUrl: "https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_carrlist",
        capturedAt: "2026-11-21T06:00:00Z",
        sha256Hash: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
        isEstimate: false,
        verbatimExcerpt:
          "DOT_NUMBER: 2849104. FORM_CODE: BMC-35 (NOTICE OF CANCELLATION). POLICY_NO: CA-9948102. EFFECTIVE_CANCEL_DATE: +24 DAYS. POWER_UNITS: 118.",
      },
      {
        fieldName: "dol_5500_cross_join",
        fieldValue: "EIN 36-4189201 • 148 Active Employees • Signer: Brett Vance, CFO",
        sourceName: "DOL Form 5500 Corporate Backbone Join",
        sourceTier: 1,
        sourceUrl: "https://www.efast.dol.gov/5500search/",
        capturedAt: "2026-11-20T12:00:00Z",
        sha256Hash: "6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a",
        isEstimate: false,
        verbatimExcerpt:
          "SPONSOR_DFE_NAME: HEARTLAND COLD LOGISTICS & FREIGHT LLC. EIN: 36-4189201. TOT_ACTIVE_PARTCP_CNT: 148. ADMIN_SIGNER: BRETT VANCE.",
      },
    ],
    contacts: [
      {
        id: "c-in-01a",
        fullName: "Brett Vance",
        title: "Chief Financial Officer (Form 5500 Signatory)",
        roleTier: "Economic Buyer",
        sourceOrigin: "DOL Form 5500 + FMCSA Officer Join",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "b***@heartlandcoldfreight.com",
        emailUnmasked: "bvance@heartlandcoldfreight.com",
        phoneMasked: "(815) 555-**19",
        phoneUnmasked: "(815) 555-0119",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.5% Verified Safe",
      },
      {
        id: "c-in-01b",
        fullName: "Duane Miller",
        title: "VP of Fleet Safety & Compliance",
        roleTier: "Safety Champion",
        sourceOrigin: "FMCSA MCS-150 Safety Official Record",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "d***@heartlandcoldfreight.com",
        emailUnmasked: "dmiller@heartlandcoldfreight.com",
        phoneMasked: "(815) 555-**74",
        phoneUnmasked: "(815) 555-0174",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.9% Verified Safe",
      },
    ],
  },
  {
    id: "in-02",
    canonicalEntityId: "ENT-IN-3910482",
    engine: "Industrial, Fleet & Facility Risk Graph",
    legalName: "MIDWEST PRECISION STAMPING & FORGE INC",
    dbaName: "Midwest Precision Forge",
    domain: "midwestprecisionforge.com",
    state: "MI",
    city: "Grand Rapids",
    einOrIdentifier: "OSHA Activity: #172948102 • EIN: 38-2910485",
    verifiedHeadcount: "230 Active Staff (Form 5500)",
    siteCountOrFleet: "3 Manufacturing Plants (MI/OH)",
    signalType: "OSHA Newly Opened Inspection + 45d Abatement Window",
    signalHeadline:
      "Federal OSHA Region 5 opened unprogrammed safety inspection (`OPEN_DATE` 5 days ago) + active machine-guarding abatement deadline & Ex-Mod spike risk.",
    forwardWindowDays: 40,
    urgencyTier: "High (31-60d)",
    initialWeight: 96,
    daysElapsed: 5,
    halfLifeDays: 45,
    currentScore: 89,
    qualifyingFactPrimary: "Federal OSHA Open Inspection • Repeat Citation Ex-Mod Risk",
    qualifyingFactSecondary: "Form 5500 EIN 38-2910485 • 230 Active Employees",
    repOpenerLine:
      "Saw Federal OSHA Region 5 opened inspection #172948102 at your Grand Rapids stamping plant five days ago with machine-guarding abatement due.",
    provenanceReceipts: [
      {
        fieldName: "osha_open_inspection",
        fieldValue: "Activity #172948102 — Federal Jurisdiction (OPEN_DATE: 5 Days Ago)",
        sourceName: "DOL OSHA Enforcement Inspection Delta Feed",
        sourceTier: 1,
        sourceUrl: "https://www.osha.gov/pls/imis/establishment.html",
        capturedAt: "2026-11-20T09:10:00Z",
        sha256Hash: "5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
        isEstimate: false,
        verbatimExcerpt:
          "ACTIVITY_NR: 172948102. ESTAB_NAME: MIDWEST PRECISION STAMPING & FORGE INC. STATE_FLAG: FEDERAL. OPEN_DATE: -5 DAYS. ABATEMENT_WINDOW: 40 DAYS.",
      },
    ],
    contacts: [
      {
        id: "c-in-02a",
        fullName: "Kevin McAllister",
        title: "VP of EHS & Plant Operations",
        roleTier: "Technical Buyer",
        sourceOrigin: "EPA FRS / OSHA Establishment Contact",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "k***@midwestprecisionforge.com",
        emailUnmasked: "kmcallister@midwestprecisionforge.com",
        phoneMasked: "(616) 555-**38",
        phoneUnmasked: "(616) 555-0138",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.7% Verified Safe",
      },
      {
        id: "c-in-02b",
        fullName: "Sarah Lindqvist",
        title: "VP of Human Resources & Risk (Form 5500 Signer)",
        roleTier: "Economic Buyer",
        sourceOrigin: "DOL Form 5500 Signatory Extraction",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "s***@midwestprecisionforge.com",
        emailUnmasked: "slindqvist@midwestprecisionforge.com",
        phoneMasked: "(616) 555-**90",
        phoneUnmasked: "(616) 555-0190",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.6% Verified Safe",
      },
    ],
  },
  {
    id: "in-03",
    canonicalEntityId: "ENT-IN-4029183",
    engine: "Industrial, Fleet & Facility Risk Graph",
    legalName: "APEX BULK CHEMICAL & TANK LINES INC",
    dbaName: "Apex Hazmat Carriers",
    domain: "apexbulkcarriers.com",
    state: "TX",
    city: "Pasadena",
    einOrIdentifier: "USDOT: 1948271 • EIN: 74-2819403",
    verifiedHeadcount: "310 Active Staff (Form 5500)",
    siteCountOrFleet: "245 Power Units • Hazmat Endorsed",
    signalType: "FMCSA 60-Day Policy Renewal Window",
    signalHeadline:
      "Primary $5M Hazmat BIPD insurance filing (Form BMC-91X) reaches annual anniversary renewal in 58 days; Safety BASIC above threshold.",
    forwardWindowDays: 58,
    urgencyTier: "High (31-60d)",
    initialWeight: 93,
    daysElapsed: 4,
    halfLifeDays: 45,
    currentScore: 88,
    qualifyingFactPrimary: "245 Hazmat Power Units • $5M BMC-91X Renewal in 58d",
    qualifyingFactSecondary: "Form 5500 EIN 74-2819403 • $1.48M Welfare Premium Spend",
    repOpenerLine:
      "Noticed Apex Bulk Chemical's $5M BMC-91X policy for your 245 hazmat power units hits its annual renewal window in 58 days.",
    provenanceReceipts: [
      {
        fieldName: "bmc91x_policy_anniversary",
        fieldValue: "BMC-91X Effective Anniversary Renewal in 58 Days ($5,000,000 BIPD)",
        sourceName: "FMCSA L&I Insurance Effective Date Roll-Forward",
        sourceTier: 1,
        sourceUrl: "https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_carrlist",
        capturedAt: "2026-11-19T07:45:00Z",
        sha256Hash: "2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
        isEstimate: false,
        verbatimExcerpt:
          "DOT_NUMBER: 1948271. FORM: BMC-91X. COVERAGE: $5,000,000 HAZMAT BIPD. ANNIVERSARY_RENEWAL_WINDOW: 58 DAYS.",
      },
    ],
    contacts: [
      {
        id: "c-in-03a",
        fullName: "Travis Hollister",
        title: "Chief Financial Officer (Form 5500 Signatory)",
        roleTier: "Economic Buyer",
        sourceOrigin: "DOL Form 5500 Schedule A Signer",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "t***@apexbulkcarriers.com",
        emailUnmasked: "thollister@apexbulkcarriers.com",
        phoneMasked: "(281) 555-**55",
        phoneUnmasked: "(281) 555-0155",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.4% Verified Safe",
      },
    ],
  },
  {
    id: "in-04",
    canonicalEntityId: "ENT-IN-5192834",
    engine: "Industrial, Fleet & Facility Risk Graph",
    legalName: "VANGUARD FOOD PROCESSING & COLD STORAGE CORP",
    dbaName: "Vanguard Refrigerated Foods",
    domain: "vanguardcoldfoods.com",
    state: "NE",
    city: "Omaha",
    einOrIdentifier: "EPA FRS: 110049281732 • EIN: 47-0891234",
    verifiedHeadcount: "390 Active Staff (Form 5500)",
    siteCountOrFleet: "4 Processing Plants (680,000 Sq Ft)",
    signalType: "EPA ECHO Enforcement Action + Ammonia Permit",
    signalHeadline:
      "Flagged for Clean Air Act RMP compliance schedule at Omaha Plant #3; 75-day engineering remediation deadline active.",
    forwardWindowDays: 75,
    urgencyTier: "Active (61-90d)",
    initialWeight: 91,
    daysElapsed: 6,
    halfLifeDays: 45,
    currentScore: 83,
    qualifyingFactPrimary: "EPAFRS ID 110049281732 • Clean Air Act RMP Schedule",
    qualifyingFactSecondary: "Form 5500 EIN 47-0891234 • 390 Active Employees",
    repOpenerLine:
      "Saw Vanguard Food Processing has a 75-day EPA Clean Air Act RMP compliance window open for Plant #3 in Omaha.",
    provenanceReceipts: [
      {
        fieldName: "epa_echo_compliance_flag",
        fieldValue: "FRS #110049281732 — Clean Air Act RMP Remediation Schedule (75d)",
        sourceName: "EPA ECHO Exporter & FRS Facility Linkage",
        sourceTier: 1,
        sourceUrl: "https://echo.epa.gov/detailed-facility-report?fid=110049281732",
        capturedAt: "2026-11-18T15:12:00Z",
        sha256Hash: "8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
        isEstimate: false,
        verbatimExcerpt:
          "REGISTRY_ID: 110049281732. CAA_STATUS: SIGNIFICANT NONCOMPLIANCE / REMEDIATION SCHEDULE ACTIVE. NAICS: 311612.",
      },
    ],
    contacts: [
      {
        id: "c-in-04a",
        fullName: "Brian Whitaker",
        title: "VP of Engineering & Facilities",
        roleTier: "Technical Buyer",
        sourceOrigin: "EPA RMP Responsible Official + Form 5500",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "b***@vanguardcoldfoods.com",
        emailUnmasked: "bwhitaker@vanguardcoldfoods.com",
        phoneMasked: "(402) 555-**12",
        phoneUnmasked: "(402) 555-0112",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.8% Verified Safe",
      },
    ],
  },

  // ── ENGINE 3: PUBLIC SECTOR, CONTRACTORS & PERMITS GRAPH (4 RECORDS) ───
  {
    id: "ps-01",
    canonicalEntityId: "ENT-PS-8841209",
    engine: "Public Sector, Contractors & Permits Graph",
    legalName: "PRECISION AEROSPACE & DEFENSE SYSTEMS INC",
    dbaName: "Precision Aero Systems",
    domain: "precisionaerosystems.com",
    state: "VA",
    city: "Reston",
    einOrIdentifier: "UEI: J8K4M9N2P1Q7 • CAGE: 7X9K2",
    verifiedHeadcount: "215 Active Staff (Form 5500)",
    siteCountOrFleet: "$14.8M Active DoD Obligations",
    signalType: "SAM.gov 30-Day Registration Expiration + Active Contract",
    signalHeadline:
      "SAM.gov entity registration (`registrationExpirationDate`) expires in 26 days while holding $14.8M in active DoD Air Force sub-awards.",
    forwardWindowDays: 26,
    urgencyTier: "Immediate (0-30d)",
    initialWeight: 97,
    daysElapsed: 3,
    halfLifeDays: 30,
    currentScore: 93,
    qualifyingFactPrimary: "UEI J8K4M9N2P1Q7 Expires in 26d • Verified entityUrl Domain",
    qualifyingFactSecondary: "USAspending Award #FA8650-26-C • Form 5500 215 Staff",
    repOpenerLine:
      "Saw Precision Aerospace's SAM.gov registration (UEI J8K4M9N2P1Q7) expires in 26 days alongside your active Air Force contract #FA8650-26-C.",
    provenanceReceipts: [
      {
        fieldName: "sam_expiration_date",
        fieldValue: "UEI J8K4M9N2P1Q7 — registrationExpirationDate in 26 Days",
        sourceName: "SAM.gov Public Entity API v3 + USAspending Delta",
        sourceTier: 1,
        sourceUrl: "https://sam.gov/entity/J8K4M9N2P1Q7/coreData",
        capturedAt: "2026-11-21T04:30:00Z",
        sha256Hash: "0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
        isEstimate: false,
        verbatimExcerpt:
          "UEI: J8K4M9N2P1Q7. CAGE: 7X9K2. ENTITY_URL: https://precisionaerosystems.com. REGISTRATION_EXPIRATION_DATE: +26 DAYS. GOV_BIZ_POC: RACHEL VANCE.",
      },
    ],
    contacts: [
      {
        id: "c-ps-01a",
        fullName: "Rachel Vance",
        title: "VP of Contracts & Compliance (SAM Gov Business POC)",
        roleTier: "Economic Buyer",
        sourceOrigin: "SAM.gov Government Business POC (CPA Filtered)",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "r***@precisionaerosystems.com",
        emailUnmasked: "rvance@precisionaerosystems.com",
        phoneMasked: "(703) 555-**88",
        phoneUnmasked: "(703) 555-0188",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.4% Verified Safe",
      },
    ],
  },
  {
    id: "ps-02",
    canonicalEntityId: "ENT-PS-7731904",
    engine: "Public Sector, Contractors & Permits Graph",
    legalName: "VANGUARD TILT-WALL & INDUSTRIAL BUILDERS LLC",
    dbaName: "Vanguard Commercial Construction",
    domain: "vanguardbuilders.com",
    state: "TN",
    city: "Memphis",
    einOrIdentifier: "Permit: #IND-26-0914 • UEI: M4N8P2Q6R9T1",
    verifiedHeadcount: "164 Active Staff (Form 5500)",
    siteCountOrFleet: "7 Active Commercial Job Sites",
    signalType: "Commercial Building Permit >$5M Issued",
    signalHeadline:
      "Issued $6.2M industrial electrical, racking & cold-dock permit (#IND-26-0914) for 240,000 sq ft distribution hub in Shelby County, TN.",
    forwardWindowDays: 19,
    urgencyTier: "Immediate (0-30d)",
    initialWeight: 96,
    daysElapsed: 2,
    halfLifeDays: 30,
    currentScore: 94,
    qualifyingFactPrimary: "$6.2M Industrial Permit #IND-26-0914 • LLC Resolved to Parent",
    qualifyingFactSecondary: "SAM.gov UEI M4N8P2Q6R9T1 • Form 5500 164 Employees",
    repOpenerLine:
      "Saw Vanguard Builders pulled the $6.2M industrial electrical and racking permit (#IND-26-0914) for the 240,000 sq ft Memphis hub.",
    provenanceReceipts: [
      {
        fieldName: "commercial_permit_valuation",
        fieldValue: "$6,200,000 Industrial Permit #IND-26-0914 (Issued 48h Ago)",
        sourceName: "Municipal Socrata / ArcGIS Building Permit Portal",
        sourceTier: 1,
        sourceUrl: "https://data.memphistn.gov/permits/IND-26-0914",
        capturedAt: "2026-11-21T10:15:00Z",
        sha256Hash: "c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
        isEstimate: false,
        verbatimExcerpt:
          "PERMIT_ID: IND-26-0914. APPLICANT_LLC: VDC TILT-WALL II LLC -> RESOLVED_PARENT: VANGUARD TILT-WALL & INDUSTRIAL BUILDERS LLC. VALUATION: $6,200,000.",
      },
    ],
    contacts: [
      {
        id: "c-ps-02a",
        fullName: "Lucas Sterling",
        title: "VP of Preconstruction & Procurement",
        roleTier: "Economic Buyer",
        sourceOrigin: "Permit Applicant Officer + SAM.gov POC",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "l***@vanguardbuilders.com",
        emailUnmasked: "lsterling@vanguardbuilders.com",
        phoneMasked: "(901) 555-**41",
        phoneUnmasked: "(901) 555-0141",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.7% Verified Safe",
      },
    ],
  },
  {
    id: "ps-03",
    canonicalEntityId: "ENT-PS-6620193",
    engine: "Public Sector, Contractors & Permits Graph",
    legalName: "SENTINEL FEDERAL CYBER & CLOUD INTEGRATORS LLC",
    dbaName: "Sentinel Federal Cyber",
    domain: "sentinelfederal.com",
    state: "MD",
    city: "Bethesda",
    einOrIdentifier: "UEI: K9L2M5N8P3Q1 • CAGE: 8Y4M1",
    verifiedHeadcount: "142 Active Staff (Form 5500)",
    siteCountOrFleet: "$22.4M DHS & DoD Awards",
    signalType: "USAspending 60-Day Contract Recompete + First-Time Sub-Award",
    signalHeadline:
      "Awarded $8.4M DHS prime task order while core $14M cyber operations contract enters 60-day recompete window.",
    forwardWindowDays: 52,
    urgencyTier: "High (31-60d)",
    initialWeight: 92,
    daysElapsed: 5,
    halfLifeDays: 45,
    currentScore: 85,
    qualifyingFactPrimary: "USAspending Period-of-Performance Recompete in 52 Days",
    qualifyingFactSecondary: "SAM.gov Native entityUrl • Form 5500 142 Employees",
    repOpenerLine:
      "Noticed Sentinel Federal just won the $8.4M DHS task order right as your core cyber operations contract enters its 60-day recompete window.",
    provenanceReceipts: [
      {
        fieldName: "usaspending_recompete_window",
        fieldValue: "Award #70RTAC26C0004 — Period of Performance Ends in 52 Days",
        sourceName: "USAspending.gov Award Delta API v2",
        sourceTier: 1,
        sourceUrl: "https://www.usaspending.gov/award/CONT_AWD_70RTAC26C0004",
        capturedAt: "2026-11-18T18:00:00Z",
        sha256Hash: "e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
        isEstimate: false,
        verbatimExcerpt:
          "RECIPIENT_UEI: K9L2M5N8P3Q1. AWARD_AMOUNT: $8,400,000. NAICS: 541512. RECOMPETE_HORIZON: 52 DAYS.",
      },
    ],
    contacts: [
      {
        id: "c-ps-03a",
        fullName: "general.counsel / David Chen",
        title: "Chief Information Security Officer & VP Delivery",
        roleTier: "Technical Buyer",
        sourceOrigin: "SAM.gov Electronic Business POC + Form 5500",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "d***@sentinelfederal.com",
        emailUnmasked: "dchen@sentinelfederal.com",
        phoneMasked: "(301) 555-**67",
        phoneUnmasked: "(301) 555-0167",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.5% Verified Safe",
      },
    ],
  },
  {
    id: "ps-04",
    canonicalEntityId: "ENT-PS-5510928",
    engine: "Public Sector, Contractors & Permits Graph",
    legalName: "ATLAS MUNICIPAL INFRASTRUCTURE & PAVING CORP",
    dbaName: "Atlas Heavy Civil Contractors",
    domain: "atlasheavycivil.com",
    state: "NC",
    city: "Charlotte",
    einOrIdentifier: "UEI: R7T2V5W8X1Y4 • EIN: 56-1948273",
    verifiedHeadcount: "295 Active Staff (Form 5500)",
    siteCountOrFleet: "88 Heavy Trucks • $19.2M DOT Backlog",
    signalType: "SAM.gov 90-Day Renewal + DOT Infrastructure Award",
    signalHeadline:
      "SAM.gov entity registration enters 82-day renewal window following $7.6M NCDOT bridge & corridor award.",
    forwardWindowDays: 82,
    urgencyTier: "Active (61-90d)",
    initialWeight: 89,
    daysElapsed: 6,
    halfLifeDays: 45,
    currentScore: 81,
    qualifyingFactPrimary: "SAM UEI R7T2V5W8X1Y4 • $7.6M DOT Award • 88 Fleet Units",
    qualifyingFactSecondary: "Cross-Engine Join: SAM.gov + FMCSA + Form 5500 (295 Staff)",
    repOpenerLine:
      "Saw Atlas Heavy Civil won the $7.6M Charlotte corridor award with your SAM.gov registration coming due for renewal in 82 days.",
    provenanceReceipts: [
      {
        fieldName: "cross_engine_entity_spine",
        fieldValue: "Resolved Across SAM.gov (UEI) + DOL Form 5500 (EIN) + FMCSA (USDOT)",
        sourceName: "Canonical Entity Spine (sources_provenance Tier 1)",
        sourceTier: 1,
        sourceUrl: "https://sam.gov/entity/R7T2V5W8X1Y4/coreData",
        capturedAt: "2026-11-17T13:25:00Z",
        sha256Hash: "f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
        isEstimate: false,
        verbatimExcerpt:
          "UEI: R7T2V5W8X1Y4. MATCHED_EIN: 56-1948273. ACTIVE_PARTICIPANTS: 295. EXPIRATION_HORIZON: 82 DAYS.",
      },
    ],
    contacts: [
      {
        id: "c-ps-04a",
        fullName: "Hannah Bellamy",
        title: "Chief Financial Officer (Form 5500 & SAM Signer)",
        roleTier: "Economic Buyer",
        sourceOrigin: "DOL Form 5500 + SAM.gov Gov POC",
        cpaFilterStatus: "PASSED — Corporate Officer",
        emailMasked: "h***@atlasheavycivil.com",
        emailUnmasked: "hbellamy@atlasheavycivil.com",
        phoneMasked: "(704) 555-**29",
        phoneUnmasked: "(704) 555-0129",
        verificationMethod: "Just-In-Time Catch-All SMTP Passed",
        bounceRisk: "0.6% Verified Safe",
      },
    ],
  },
];

export function PowerTableExplorer() {
  const [selectedEngine, setSelectedEngine] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("ALL");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("ALL");
  const [signalTypeFilter, setSignalTypeFilter] = useState<string>("ALL");

  const [selectedIds, setSelectedIds] = useState<string[]>([
    "hc-01",
    "in-01",
    "ps-01",
  ]);
  const [unlockedIds, setUnlockedIds] = useState<string[]>(["hc-01"]);
  const [activeDrawerRecord, setActiveDrawerRecord] =
    useState<VaultRecord | null>(null);
  const [csvExportNotice, setCsvExportNotice] = useState<string | null>(null);

  // Starts at 1,250 monthly unlocks; decrements as new accounts are unlocked in session
  const baseCredits = 1250;
  const additionalUnlocks = unlockedIds.filter((id) => id !== "hc-01").length;
  const creditsRemaining = Math.max(0, baseCredits - additionalUnlocks);

  const uniqueStates = useMemo(() => {
    return Array.from(new Set(VERIFIED_VAULT_RECORDS.map((r) => r.state))).sort();
  }, []);

  const uniqueSignalTypes = useMemo(() => {
    return Array.from(
      new Set(VERIFIED_VAULT_RECORDS.map((r) => r.signalType))
    ).sort();
  }, []);

  const filteredRecords = useMemo(() => {
    return VERIFIED_VAULT_RECORDS.filter((r) => {
      if (selectedEngine !== "ALL" && r.engine !== selectedEngine) return false;
      if (stateFilter !== "ALL" && r.state !== stateFilter) return false;
      if (urgencyFilter !== "ALL" && r.urgencyTier !== urgencyFilter) return false;
      if (signalTypeFilter !== "ALL" && r.signalType !== signalTypeFilter)
        return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchText =
          `${r.legalName} ${r.dbaName} ${r.domain} ${r.city} ${r.state} ${r.einOrIdentifier} ${r.signalHeadline} ${r.qualifyingFactPrimary} ${r.qualifyingFactSecondary}`.toLowerCase();
        if (!matchText.includes(q)) return false;
      }
      return true;
    });
  }, [
    selectedEngine,
    stateFilter,
    urgencyFilter,
    signalTypeFilter,
    searchQuery,
  ]);

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllVisible = () => {
    const visibleIds = filteredRecords.map((r) => r.id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleUnlockAccount = (recordId: string) => {
    if (!unlockedIds.includes(recordId)) {
      setUnlockedIds((prev) => [...prev, recordId]);
    }
  };

  const handleBulkUnlockSelected = () => {
    const targetIds =
      selectedIds.length > 0 ? selectedIds : filteredRecords.map((r) => r.id);
    setUnlockedIds((prev) => Array.from(new Set([...prev, ...targetIds])));
  };

  const handleExportCsv = () => {
    const rowsToExport =
      selectedIds.length > 0
        ? VERIFIED_VAULT_RECORDS.filter((r) => selectedIds.includes(r.id))
        : filteredRecords;

    const headers = [
      "canonical_entity_id",
      "vertical_engine",
      "legal_name",
      "domain",
      "city",
      "state",
      "federal_identifiers",
      "verified_headcount",
      "signal_type",
      "urgency_tier",
      "forward_window_days",
      "live_decayed_score",
      "primary_contact_name",
      "primary_contact_title",
      "cpa_filter_status",
      "contact_email",
      "source_url",
      "sha256_receipt",
    ];

    const csvLines = [
      headers.join(","),
      ...rowsToExport.map((r) => {
        const isRowUnlocked = unlockedIds.includes(r.id);
        const primaryContact = r.contacts[0];
        const primaryReceipt = r.provenanceReceipts[0];
        return [
          r.canonicalEntityId,
          `"${r.engine}"`,
          `"${r.legalName}"`,
          r.domain,
          `"${r.city}"`,
          r.state,
          `"${r.einOrIdentifier}"`,
          `"${r.verifiedHeadcount}"`,
          `"${r.signalType}"`,
          `"${r.urgencyTier}"`,
          r.forwardWindowDays,
          r.currentScore,
          `"${primaryContact?.fullName || ""}"`,
          `"${primaryContact?.title || ""}"`,
          `"${primaryContact?.cpaFilterStatus || ""}"`,
          `"${
            isRowUnlocked
              ? primaryContact?.emailUnmasked
              : primaryContact?.emailMasked
          }"`,
          `"${primaryReceipt?.sourceUrl || ""}"`,
          `"${primaryReceipt?.sha256Hash || ""}"`,
        ].join(",");
      }),
    ];

    const blob = new Blob([csvLines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `sales-autonomy-vault-export-${rowsToExport.length}-rows.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCsvExportNotice(
      `Exported ${rowsToExport.length} verified records with SHA-256 provenance receipts.`
    );
    setTimeout(() => setCsvExportNotice(null), 4000);
  };

  return (
    <div className="bg-white border border-black/15 shadow-xs">
      {/* Top Bar: Credit Meter Counter & Bulk Actions */}
      <div className="bg-[#f5f4ef] border-b border-black/10 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-[#111111] text-white text-[11px] uppercase tracking-[0.15em] font-medium">
            PowerTable Vault Explorer
          </span>
          <span className="px-3 py-1 bg-white border border-black/15 text-[11px] font-mono text-[#111111]">
            <strong>
              {creditsRemaining.toLocaleString()} / 1,250 Monthly Contact Unlocks
              Available
            </strong>
          </span>
          <span className="text-xs text-[#111111]/65 hidden sm:inline">
            • 50-Keyword CPA Filter Active • &lt;2% Bounce SLA
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleBulkUnlockSelected}
            className="px-3.5 py-2 border border-black/20 bg-white hover:border-black text-xs font-medium text-[#111111] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Unlock className="w-3.5 h-3.5 text-[#d9534f]" />
            Unlock Selected ({selectedIds.length || filteredRecords.length})
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white text-xs uppercase tracking-wider font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            1-Click CSV Export ({selectedIds.length || filteredRecords.length} Rows)
          </button>
        </div>
      </div>

      {csvExportNotice && (
        <div className="bg-emerald-50 border-b border-emerald-300 px-6 py-2.5 text-xs text-emerald-950 flex items-center justify-between">
          <span>✓ {csvExportNotice}</span>
          <button
            type="button"
            onClick={() => setCsvExportNotice(null)}
            className="underline font-medium cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Vertical Engine Tabs */}
      <div className="border-b border-black/10 px-6 pt-4 bg-[#fcfaf8] flex flex-wrap gap-1.5">
        {[
          {
            id: "ALL",
            label: "All 3 Vertical Engines (12 Sample Rows)",
          },
          {
            id: "Healthcare & Multi-Site Clinic Graph",
            label: "Engine 1: Healthcare & Multi-Site Clinics (4)",
          },
          {
            id: "Industrial, Fleet & Facility Risk Graph",
            label: "Engine 2: Industrial, Fleet & Facility Risk (4)",
          },
          {
            id: "Public Sector, Contractors & Permits Graph",
            label: "Engine 3: Public Sector, Contractors & Permits (4)",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedEngine(tab.id)}
            className={`px-4 py-2.5 text-xs uppercase tracking-[0.12em] font-medium border-t border-x transition-colors cursor-pointer ${
              selectedEngine === tab.id
                ? "bg-white text-[#111111] border-black/15 -mb-px pb-3"
                : "bg-[#f5f4ef]/70 text-[#111111]/60 border-transparent hover:text-[#111111]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Bar: Search, State, Urgency Tier, Signal Type */}
      <div className="p-6 border-b border-black/10 bg-white grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-[#111111]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal name, EIN, USDOT, NPI, permit #, or trigger..."
            className="w-full bg-[#fcfaf8] border border-black/15 pl-10 pr-4 py-2.5 text-xs text-[#111111] placeholder:text-[#111111]/40 focus:outline-none focus:border-black"
          />
        </div>

        <div className="md:col-span-2">
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            aria-label="Filter by state"
            className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-black"
          >
            <option value="ALL">All States ({uniqueStates.length})</option>
            {uniqueStates.map((st) => (
              <option key={st} value={st}>
                State: {st}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            aria-label="Filter by urgency tier"
            className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-black"
          >
            <option value="ALL">All Urgency Windows</option>
            <option value="Immediate (0-30d)">Immediate (0-30d)</option>
            <option value="High (31-60d)">High (31-60d)</option>
            <option value="Active (61-90d)">Active (61-90d)</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={signalTypeFilter}
            onChange={(e) => setSignalTypeFilter(e.target.value)}
            aria-label="Filter by signal type"
            className="w-full bg-[#fcfaf8] border border-black/15 px-3 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-black"
          >
            <option value="ALL">All Forward Triggers ({uniqueSignalTypes.length})</option>
            {uniqueSignalTypes.map((sig) => (
              <option key={sig} value={sig}>
                {sig}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PowerTable Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f5f4ef] border-b border-black/10 text-[10px] uppercase tracking-[0.15em] text-[#111111]/55">
              <th className="py-3.5 px-4 w-10">
                <button
                  type="button"
                  onClick={toggleSelectAllVisible}
                  className="text-[#111111] cursor-pointer"
                  aria-label="Select all visible rows"
                >
                  {filteredRecords.length > 0 &&
                  filteredRecords.every((r) => selectedIds.includes(r.id)) ? (
                    <CheckSquare className="w-4 h-4" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="py-3.5 px-4">Canonical Entity &amp; Backbone IDs</th>
              <th className="py-3.5 px-4">Footprint &amp; Form 5500 Headcount</th>
              <th className="py-3.5 px-4">Forward-Looking Signal &amp; Window</th>
              <th className="py-3.5 px-4">Decayed Score</th>
              <th className="py-3.5 px-4">Verified Officer (CPA-Filtered)</th>
              <th className="py-3.5 px-4 text-right">Dossier &amp; Receipts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 text-xs">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 px-6 text-center text-[#111111]/60">
                  No accounts match that filter combination. Clear one filter or search
                  another keyword to inspect rows.
                </td>
              </tr>
            ) : (
              filteredRecords.map((rec) => {
                const isSelected = selectedIds.includes(rec.id);
                const isUnlocked = unlockedIds.includes(rec.id);
                const primaryBuyer = rec.contacts[0];

                return (
                  <tr
                    key={rec.id}
                    onClick={() => setActiveDrawerRecord(rec)}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#fcfaf8]"
                        : "bg-white hover:bg-[#fcfaf8]"
                    }`}
                  >
                    <td
                      className="py-4 px-4 align-top"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectRow(rec.id);
                      }}
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-[#111111]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#111111]/35" />
                      )}
                    </td>

                    <td className="py-4 px-4 align-top max-w-xs">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="px-2 py-0.5 bg-[#f5f4ef] border border-black/10 text-[9px] uppercase tracking-wider font-medium text-[#111111]/80">
                          {rec.state} • {rec.city}
                        </span>
                        <span className="text-[10px] font-mono text-[#111111]/50">
                          {rec.canonicalEntityId}
                        </span>
                      </div>
                      <div className="font-serif text-base text-[#111111] font-medium leading-snug">
                        {rec.legalName}
                      </div>
                      <div className="text-[11px] font-mono text-[#111111]/60 mt-0.5">
                        {rec.domain} • {rec.einOrIdentifier}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <div className="font-medium text-[#111111]">
                        {rec.siteCountOrFleet}
                      </div>
                      <div className="text-[11px] text-[#111111]/60 mt-0.5">
                        {rec.verifiedHeadcount}
                      </div>
                      <div className="text-[10px] font-mono text-[#111111]/50 mt-1">
                        {rec.qualifyingFactPrimary}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top max-w-sm">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span
                          className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold ${
                            rec.urgencyTier === "Immediate (0-30d)"
                              ? "bg-[#d9534f]/15 text-[#d9534f] border border-[#d9534f]/30"
                              : "bg-[#f5f4ef] text-[#111111] border border-black/15"
                          }`}
                        >
                          {rec.urgencyTier}
                        </span>
                        <span className="text-[11px] font-medium text-[#111111]">
                          {rec.signalType}
                        </span>
                      </div>
                      <p className="text-xs text-[#111111]/75 leading-relaxed">
                        {rec.signalHeadline}
                      </p>
                    </td>

                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <div className="text-lg font-serif font-medium text-[#111111]">
                        {rec.currentScore}
                        <span className="text-xs text-[#111111]/45">/100</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#111111]/50">
                        W₀={rec.initialWeight} • -{rec.daysElapsed}d decay
                      </div>
                    </td>

                    <td
                      className="py-4 px-4 align-top"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {primaryBuyer && (
                        <div>
                          <div className="font-medium text-[#111111]">
                            {primaryBuyer.fullName}
                          </div>
                          <div className="text-[11px] text-[#111111]/60">
                            {primaryBuyer.title}
                          </div>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="font-mono text-[11px] text-[#111111]">
                              {isUnlocked
                                ? primaryBuyer.emailUnmasked
                                : primaryBuyer.emailMasked}
                            </span>
                            {!isUnlocked ? (
                              <button
                                type="button"
                                onClick={() => handleUnlockAccount(rec.id)}
                                className="px-2 py-0.5 bg-[#111111] hover:bg-[#333333] text-white text-[10px] uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Lock className="w-2.5 h-2.5" /> Unlock
                              </button>
                            ) : (
                              <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-[9px] uppercase font-medium">
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDrawerRecord(rec);
                        }}
                        className="px-3 py-2 border border-black/20 hover:border-black bg-[#fcfaf8] text-[11px] font-medium text-[#111111] inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-[#d9534f]" />
                        Inspect Dossier
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-[#f5f4ef] border-t border-black/10 px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#111111]/65">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#d9534f]" />
          <span>
            Showing <strong>{filteredRecords.length}</strong> of{" "}
            <strong>{VERIFIED_VAULT_RECORDS.length}</strong> red-team-verified
            records • Click any row to open the 3-Tab Signal &amp; SHA-256
            Provenance Drawer.
          </span>
        </div>
        <div className="font-mono text-[11px]">
          Shared Backbone: SAM.gov (700K Domains) + DOL Form 5500 (650K EINs)
        </div>
      </div>

      {/* 3-Tab Slide-Over Signal Dossier Drawer */}
      <SignalDossierDrawer
        record={activeDrawerRecord}
        onClose={() => setActiveDrawerRecord(null)}
        isUnlocked={
          activeDrawerRecord
            ? unlockedIds.includes(activeDrawerRecord.id)
            : false
        }
        onUnlockAccount={handleUnlockAccount}
        creditsRemaining={creditsRemaining}
      />
    </div>
  );
}

# Sales Autonomy — Unified Compliance & B2B Signal Engine (`compliance-engine`)

## 1. The 90/10 Shared Architecture

90% of data engineering infrastructure is shared across every vertical in `/services/compliance-engine/core/`, while 10% lives in thin vertical adapters (`/services/compliance-engine/adapters/`):

- **Universal 6-Table Canonical Supabase Vault (`/supabase/migrations/20261124000000_canonical_compliance_vault.sql`):**
  1. `sources_provenance`: Immutable audit log with SHA-256 raw file hashes and federal agency snapshot metadata.
  2. `entities`: Golden Corporate Backbone linking `EIN` (DOL Form 5500 / IRS), `UEI` (SAM.gov), `NPI` (CMS Type-2 Organization), and `USDOT` (FMCSA), protected by `fn_provenance_update`.
  3. `facilities_sites`: Physical plants, multi-site clinics, commercial parcels, and fleet terminals.
  4. `compliance_filings`: Normalized citations, inspections, insurance cancellations, SAM expirations, and commercial permits.
  5. `signals_deltas`: Weekly state-transition delta engine with composite 0–100 urgency scores (`refresh_daily_signal_urgency()`).
  6. `contacts`: `<2%` bounce-verified executive & compliance buying committees with automatic third-party CPA/preparer filtering.

---

## 2. Core Pipeline Modules (`core/`)

| Module | Source Ported From | Responsibilities |
| :--- | :--- | :--- |
| `core/provenance.ts` | `forgood` (`SourceHierarchyResolver.ts`) + `str` (`ProvenanceAnchorService.ts`, `DataConfidenceScorer.ts`) | Enforces strict federal source authority (`SAM_GOV` > `DOL_5500` > `CMS_NPPES` > `FMCSA` > `OSHA_EPA` > `SOCRATA_PERMITS` > `DERIVED`), 4-axis confidence badges, and SHA-256 hash generation. |
| `core/entityResolver.ts` | `forgood` + `build-aba-app` | Deterministic legal-name normalization, 6-stage crosswalk (`EIN` -> `UEI` -> `NPI` -> `USDOT` -> `Domain+State` -> `pg_trgm` fuzzy match), and 4 Hard Domain-Verification Guards (`DIRECTORY_BLOCKLIST`, lexical token/acronym alignment, explicit `UNKNOWN_DOMAIN` allowance, and `is_domain_estimate`). |
| `core/contactWaterfall.ts` | `forgood` (`ContactEnrichmentService.ts`) | Blocks 55+ third-party CPA, registered-agent, and law-firm domains so external Form 5500/SAM preparers never pollute executive lists; enforces 30-day `enrichment_cache` and dual-layer MillionVerifier + BounceBan `<2%` bounce verification gate. |
| `core/deliveryEngine.ts` | `str` (`WebhookDeliveryService.ts`) | Computes composite urgency (`0.35*Severity + 0.30*Freshness + 0.20*Proximity + 0.15*Firmographic`), generates Monday 7am Delta Digest CSVs, delivers `whsec_` HMAC-SHA256 webhooks with SSRF protection, and exposes MCP tools (`search_compliance_signals`, `get_entity_compliance_dossier`, `get_verified_buying_committee`). |

---

## 3. The 3 Pre-Cleaned Vertical Engines (`adapters/`)

1. **Engine 1 — Healthcare & Multi-Site Clinic Graph (`adapters/healthcare_nppes.ts`):**
   - Ported from `build-aba-app` (`ingest_type2_nppes.ts` & `sync_oig_leie.mjs`).
   - Cross-joins CMS Type-2 Organization NPIs (`Authorized_Official` Owner/CMO), HHS OIG LEIE monthly exclusion delta (`UPDATED.csv`), CMS Condition-Level Deficiencies, and DOL Form 5500 clinic headcount.
2. **Engine 2 — Industrial, Fleet & Facility Risk Graph (`adapters/industrial_fleet_osha.ts`):**
   - Ingests FMCSA 30-day Form BMC-35 insurance cancellation notices & 60/90-day BMC-91X renewals (5–500+ power units), DOL OSHA newly opened inspections & high-penalty Willful/Repeat/Serious citations (30–90d abatement & 5-yr Repeat lookback), and EPA ECHO violations, cross-joined with our DOL Form 5500 Corporate Backbone (`EIN`, exact employee count, CFO/HR signatory).
3. **Engine 3 — Public Sector, Contractors & Permits Graph (`adapters/public_sector_sam.ts`):**
   - Ported from `forgood` (`SamGovAdapter.ts`, `UeiEinResolver.ts`) & `str` (`LiveCivicDataService.ts`).
   - Tracks daily forward-looking SAM.gov 30/60/90-day registration expirations, native `entityUrl` corporate domains, USAspending contract recompete windows, and Socrata/ArcGIS commercial building permits >$100K.

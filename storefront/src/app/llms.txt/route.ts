import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /llms.txt
 *
 * 2026 Standard Machine-Readable Manifest & Grokbot Skill Specification.
 * Automatically read by xAI Grokbot (Cloud VM Agent), Claude Code/Desktop,
 * Cursor, Claygent, and OpenAI Agents when pointed at salesautonomy.com.
 */
export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;

  const content = `# Sales Autonomy — Pre-Cleaned Vertical Market Databases (2026 Agent & MCP Spec)

> Sales Autonomy gives B2B sales reps, RevOps engineers, and autonomous GTM agents (xAI Grokbot, Claude MCP, Cursor, Clay, HubSpot MCP) full autonomy to research SHA-256 provenance-locked buyer signals from public government filings.

## 1. Three Pre-Cleaned Flagship Vertical Engines

1. \`HEALTHCARE_NPPES\` (Engine 01 · Healthcare & Multi-Site Clinics)
   - Sources: CMS NPPES v2.1 Organization Type-2 Registry, HHS OIG LEIE Exclusion Table, CMS QCOR Deficiencies, DOL Form 5500.
   - Triggers: New secondary clinic NPI registrations, newly appointed Authorized Officials/Medical Directors, 45-day CMS F-tag Plans of Correction.
2. \`INDUSTRIAL_FLEET_OSHA\` (Engine 02 · Commercial Fleet & Industrial Risk)
   - Sources: U.S. DOT FMCSA Census & Licensing/Insurance (Form BMC-35 / BMC-91X), Federal OSHA Inspections, EPA ECHO, DOL Form 5500.
   - Triggers: 30-day Form BMC-35 insurance policy cancellations (15-250+ power units), newly opened OSHA inspections, 30-90d abatement deadlines.
3. \`PUBLIC_SECTOR_SAM\` (Engine 03 · Commercial Permits & GovCon)
   - Sources: Municipal Socrata Commercial Building Permits (>$250K), SAM.gov Entity API v3 (700K verified domains), USAspending Awards.
   - Triggers: $250K-$10M+ commercial tenant buildout & warehouse permits, 30/60/90-day SAM.gov registration expirations, federal recompete windows.

---

## 2. Credit-Metered Agent Firewall (How Autonomous Agents Should Query)

To protect subscribers from runaway 24/7 agent loops, Sales Autonomy separates **Zero-Cost Discovery** from **Credit-Metered Contact Unlocks**:

- **Zero-Cost Preview Mode (0 Credits):** Querying \`GET ${origin}/api/v1/signals\` or calling MCP tool \`search_compliance_signals\` returns full canonical 6-table metadata, SHA-256 statutory filing receipts, and composite urgency scores (0-100), with decision-maker emails masked (\`d***@domain.com\`).
- **Credit-Metered Unlock Mode (1 Credit / Company):** Passing \`?unlock=true\` with header \`x-api-key: sa_pilot_2026_demo\` (or calling \`POST ${origin}/api/v1/signals\` or MCP tool \`generate_grokbot_outbound_brief\`) runs the 50-keyword CPA exclusion gate and Just-In-Time <2% bounce verification, returning unmasked executive emails, direct phones, and ready-to-send citation openers.

---

## 3. Quickstart for xAI Grokbot (Cloud Computer Terminal & Chief-of-Staff Delegation)

If you are an autonomous **Grokbot** operating in a persistent cloud VM with terminal and browser access, prefer the deterministic REST API or MCP endpoint over DOM scraping:

### A. Grokbot Terminal Commands (cURL)

\`\`\`bash
# Step 1: Zero-Cost Territory Scan (0 Credits Charged)
curl -s "${origin}/api/v1/signals?engine=INDUSTRIAL_FLEET_OSHA&state=TX&min_urgency=75&limit=10" | jq .

# Step 2: Credit-Metered Contact Unlock & Outbound Brief Generation (1 Credit / Entity)
curl -s -X POST "${origin}/api/v1/signals" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: sa_pilot_2026_demo" \\
  -d '{"action":"unlock_contacts","engine":"INDUSTRIAL_FLEET_OSHA","state":"TX","limit":5}' | jq .

# Step 3: Download Monday 6:00 AM Territory Delta Digest as CSV
curl -s "${origin}/api/v1/signals?engine=HEALTHCARE_NPPES&format=csv" -o monday_healthcare_deltas.csv
\`\`\`

### B. Grokbot "Learn by Demonstration" Browser Mode (Deterministic URL Params)

When automating the web UI at \`${origin}/\` or \`${origin}/sample\`, navigate directly via deterministic URL query parameters rather than clicking dropdowns:

- All Engines: \`${origin}/sample?engine=ALL\`
- Healthcare Clinics (TX, 0-30d): \`${origin}/sample?engine=healthcare&state=TX&urgency=0-30\`
- Fleet & Industrial Risk: \`${origin}/sample?engine=fleet&urgency=0-30\`
- Commercial Permits & GovCon: \`${origin}/sample?engine=permits\`

---

## 4. Remote Model Context Protocol (MCP) Server (\`${origin}/api/mcp\`)

Connect Claude Desktop, Claude Code, Cursor, Clay MCP, or Grokbot directly via JSON-RPC 2.0 Streamable HTTP:

\`\`\`json
{
  "mcpServers": {
    "sales-autonomy-vault": {
      "url": "${origin}/api/mcp",
      "headers": {
        "x-api-key": "sa_pilot_2026_demo"
      }
    }
  }
}
\`\`\`

### Available MCP Tools (\`POST ${origin}/api/mcp\`)
- \`search_compliance_signals(vertical_engine, min_urgency_score, state, limit)\` — Zero-cost discovery scan across the 66+ live canonical signals.
- \`get_entity_compliance_dossier(identifier)\` — Full 6-table dossier by Entity ID, EIN, SAM UEI, CMS NPI, or USDOT number with SHA-256 provenance hashes.
- \`get_verified_buying_committee(entity_id, buying_role)\` — Credit-metered unlock of CPA-filtered corporate officers with <2% bounce SLA.
- \`generate_grokbot_outbound_brief(vertical_engine, state, limit)\` — Returns turnkey outbound briefs with statutory filing citations and verified emails for specialist SDR bots.
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

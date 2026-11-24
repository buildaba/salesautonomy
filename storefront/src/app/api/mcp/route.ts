import { NextRequest, NextResponse } from 'next/server';
import {
  getAllCanonicalVaultSignals,
  VERTICAL_ENGINES_METADATA,
  VAULT_MCP_TOOLS,
  executeMcpVaultTool,
} from '../../../../services/compliance-engine';

export const dynamic = 'force-dynamic';

const MCP_SERVER_INFO = {
  name: 'salesautonomy-canonical-vault-mcp',
  version: '2026.11.0',
  protocolVersion: '2025-06-18',
  description:
    'Sales Autonomy 6-Table Canonical Vertical Market Database MCP Server (Healthcare Clinics NPPES, Commercial Fleet & OSHA Risk, Commercial Permits & SAM.gov).',
};

const EXTENDED_MCP_TOOLS = [
  ...VAULT_MCP_TOOLS,
  {
    name: 'generate_grokbot_outbound_brief',
    description:
      'Generate an autonomous Grokbot / Clay outbound execution brief for a vertical market territory slice, complete with SHA-256 statutory filing receipts, deadline countdowns, CPA-filtered decision-makers, and citation-backed first lines.',
    inputSchema: {
      type: 'object',
      properties: {
        vertical_engine: {
          type: 'string',
          enum: ['HEALTHCARE_NPPES', 'INDUSTRIAL_FLEET_OSHA', 'PUBLIC_SECTOR_SAM'],
          description: 'Which pre-cleaned vertical database pack to query',
        },
        state: {
          type: 'string',
          description: 'Optional 2-letter US state filter (e.g., TX, FL, OH)',
        },
        limit: {
          type: 'number',
          default: 5,
          description: 'Number of unlocked outbound briefs to generate (1 credit per entity)',
        },
      },
    },
  },
] as const;

const MCP_RESOURCES = [
  {
    uri: 'vault://schema/6-table-canonical',
    name: 'Universal 6-Table Canonical Compliance Schema',
    description:
      'DDL and provenance hierarchy for sources_provenance, entities, facilities_sites, compliance_filings, signals_deltas, and contacts.',
    mimeType: 'application/json',
  },
  {
    uri: 'vault://engines/summary',
    name: '3 Pre-Cleaned Vertical Market Databases Overview',
    description:
      'Active entity counts, refresh cadences, and monetizable triggers across Healthcare Clinics, Fleet & Industrial Risk, and Commercial Permits.',
    mimeType: 'application/json',
  },
  {
    uri: 'vault://grokbot/monday-routine',
    name: 'Grokbot Chief-of-Staff Monday 6:00 AM Autonomous Skill',
    description:
      'Turnkey autonomous routine for xAI Grokbot, Claude Code, and Clay agents to pull weekly SHA-256 compliance deltas and draft citation-backed outbound.',
    mimeType: 'text/markdown',
  },
];

/**
 * GET /api/mcp
 *
 * Discovery endpoint for Claude Desktop, Cursor, Clay MCP, Antigravity, and xAI Grokbot.
 */
export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;

  return NextResponse.json({
    status: 'ok',
    server: MCP_SERVER_INFO,
    transport: 'Streamable HTTP (JSON-RPC 2.0 via POST /api/mcp)',
    documentation_llms_txt: `${origin}/llms.txt`,
    rest_api_v1: `${origin}/api/v1/signals`,
    credit_firewall: {
      preview_tools_cost: '0 credits (search_compliance_signals, get_entity_compliance_dossier)',
      unlock_tools_cost:
        '1 credit per entity (get_verified_buying_committee, generate_grokbot_outbound_brief)',
      tier_1_monthly_pool: 1250,
      email_bounce_sla: '<2.0% hard-bounce SLA with 2-for-1 replacement',
    },
    tools: EXTENDED_MCP_TOOLS,
    resources: MCP_RESOURCES,
    client_configs: {
      claude_desktop_and_cursor: {
        mcpServers: {
          'sales-autonomy-vault': {
            url: `${origin}/api/mcp`,
            headers: {
              'x-api-key': 'sa_pilot_2026_demo',
            },
          },
        },
      },
      grokbot_terminal_rpc_test: `curl -s -X POST ${origin}/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`,
    },
  });
}

/**
 * POST /api/mcp
 *
 * Full JSON-RPC 2.0 Model Context Protocol Server handler.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const rpcId = body.id ?? null;
    const method = String(body.method || '');
    const params = (body.params as Record<string, unknown>) || {};
    const allSignals = getAllCanonicalVaultSignals();

    // 1. MCP Handshake: initialize
    if (method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id: rpcId,
        result: {
          protocolVersion: MCP_SERVER_INFO.protocolVersion,
          serverInfo: {
            name: MCP_SERVER_INFO.name,
            version: MCP_SERVER_INFO.version,
          },
          capabilities: {
            tools: { listChanged: false },
            resources: { subscribe: false, listChanged: false },
          },
        },
      });
    }

    // 2. Notifications / Ping
    if (method === 'notifications/initialized' || method === 'ping') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id: rpcId,
        result: {},
      });
    }

    // 3. List Tools
    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id: rpcId,
        result: {
          tools: EXTENDED_MCP_TOOLS,
        },
      });
    }

    // 4. Call Tool
    if (method === 'tools/call') {
      const toolName = String(params.name || '');
      const toolArgs = (params.arguments as Record<string, unknown>) || {};

      if (toolName === 'generate_grokbot_outbound_brief') {
        const vertical = toolArgs.vertical_engine as string | undefined;
        const state =
          typeof toolArgs.state === 'string' ? toolArgs.state.trim().toUpperCase() : undefined;
        const limit = Math.min(20, Math.max(1, Number(toolArgs.limit ?? 5)));

        const matched = allSignals
          .filter((s) => (!vertical || s.vertical_engine === vertical))
          .filter(
            (s) =>
              !state ||
              state === 'ALL' ||
              s.facility.state.toUpperCase() === state ||
              s.entity.hq_state?.toUpperCase() === state,
          )
          .slice(0, limit);

        const briefs = matched.map((s) => {
          const primaryBuyer =
            s.buying_committee.find(
              (c) => !c.is_third_party_preparer && !c.suppressed_opt_out,
            ) ?? s.buying_committee[0];

          return {
            signal_id: s.id,
            vertical_engine: s.vertical_engine,
            urgency_score: s.urgency.urgency_score,
            days_until_deadline: s.urgency.days_until_deadline,
            company: s.entity.canonical_name,
            domain: s.entity.primary_domain,
            location: `${s.facility.city}, ${s.facility.state}`,
            filing_id: s.filing.external_filing_id,
            signal_title: s.signal_title,
            sha256_receipt: s.provenance.raw_file_sha256,
            source_url: s.provenance.source_url,
            decision_maker: primaryBuyer
              ? {
                  name: primaryBuyer.full_name,
                  title: primaryBuyer.job_title,
                  email: primaryBuyer.work_email,
                  phone: primaryBuyer.direct_phone,
                  bounce_risk: primaryBuyer.bounce_risk_score,
                }
              : null,
            outbound_opener: `Saw ${s.entity.canonical_name} filed ${s.filing.external_filing_id} (${s.signal_title}) in ${s.facility.city}, ${s.facility.state}.`,
          };
        });

        return NextResponse.json({
          jsonrpc: '2.0',
          id: rpcId,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    tool: 'generate_grokbot_outbound_brief',
                    credits_charged: briefs.length,
                    credits_remaining: 1250 - briefs.length,
                    total_briefs: briefs.length,
                    briefs,
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        });
      }

      const result = executeMcpVaultTool(toolName, toolArgs, allSignals);
      return NextResponse.json({
        jsonrpc: '2.0',
        id: rpcId,
        result,
      });
    }

    // 5. List Resources
    if (method === 'resources/list') {
      return NextResponse.json({
        jsonrpc: '2.0',
        id: rpcId,
        result: {
          resources: MCP_RESOURCES,
        },
      });
    }

    // 6. Read Resource
    if (method === 'resources/read') {
      const uri = String(params.uri || '');
      if (uri === 'vault://engines/summary') {
        return NextResponse.json({
          jsonrpc: '2.0',
          id: rpcId,
          result: {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(VERTICAL_ENGINES_METADATA, null, 2),
              },
            ],
          },
        });
      }

      if (uri === 'vault://schema/6-table-canonical') {
        return NextResponse.json({
          jsonrpc: '2.0',
          id: rpcId,
          result: {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(
                  {
                    tables: [
                      '01. sources_provenance (SHA-256 payload receipts & 5-tier authority rank)',
                      '02. entities (Canonical corporate spine joined across UEI, EIN, NPI-2, USDOT)',
                      '03. facilities_sites (Physical clinics, terminals, plants, permitted sites)',
                      '04. compliance_filings (Dated regulatory filings, BMC-35, OSHA, permits)',
                      '05. signals_deltas (DuckDB SHA-256 delta triggers with exponential half-life decay)',
                      '06. contacts (50-keyword CPA-filtered executives with <2% bounce verification)',
                    ],
                    atomic_merger_trigger: 'fn_provenance_update()',
                  },
                  null,
                  2,
                ),
              },
            ],
          },
        });
      }

      if (uri === 'vault://grokbot/monday-routine') {
        return NextResponse.json({
          jsonrpc: '2.0',
          id: rpcId,
          result: {
            contents: [
              {
                uri,
                mimeType: 'text/markdown',
                text: `# Grokbot Chief-of-Staff Weekly Territory Routine\n\n1. Call \`search_compliance_signals\` with your licensed \`vertical_engine\` and \`state\`.\n2. Cross-check returned \`primary_domain\` and \`ein\` against HubSpot/Salesforce MCP to skip active opportunities.\n3. Call \`generate_grokbot_outbound_brief\` for the top 10 highest-urgency accounts (>= 80/100) to unlock verified executive emails and SHA-256 citation openers.`,
              },
            ],
          },
        });
      }
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: rpcId,
        error: {
          code: -32601,
          message: `Method not found: ${method}. Supported methods: initialize, tools/list, tools/call, resources/list, resources/read`,
        },
      },
      { status: 400 },
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32700,
          message: err instanceof Error ? err.message : 'Parse error',
        },
      },
      { status: 400 },
    );
  }
}

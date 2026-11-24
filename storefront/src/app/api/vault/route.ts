import { NextRequest, NextResponse } from 'next/server';
import {
  VERTICAL_ENGINES_METADATA,
  getAllCanonicalVaultSignals,
  getLiveIngestionManifest,
  SOURCE_PRIORITY,
  DIRECTORY_BLOCKLIST,
  THIRD_PARTY_PREPARER_DOMAIN_KEYWORDS,
  resolveVerifiedDomain,
  detectThirdPartyPreparer,
  generateWeeklyDeltaDigestCsv,
  VAULT_MCP_TOOLS,
  executeMcpVaultTool,
  WebhookDeliveryService,
  VerticalEngineId,
} from '../../../../services/compliance-engine';

export const dynamic = 'force-dynamic';

/**
 * GET /api/vault
 *
 * Returns:
 *   1. The 3 Pre-Cleaned Vertical Engines metadata, record counts & 6-table schema health.
 *   2. Filterable canonical 6-table compliance signals (`signals_deltas` joined with
 *      `entities`, `facilities_sites`, `compliance_filings`, `sources_provenance`, and
 *      `<2%` bounce-verified `contacts`).
 *   3. Optional `?format=csv` export generating the Monday 7:00 AM Weekly Delta Digest CSV.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const engineFilter = (searchParams.get('engine') ||
    searchParams.get('vertical_engine')) as VerticalEngineId | null;
  const minUrgency = Number(searchParams.get('min_urgency') ?? '0');
  const stateFilter = searchParams.get('state')?.trim().toUpperCase() || null;
  const categoryFilter = searchParams.get('category')?.trim().toUpperCase() || null;
  const query = searchParams.get('q')?.trim().toLowerCase() || null;
  const format = searchParams.get('format')?.trim().toLowerCase() || 'json';

  const allSignals = getAllCanonicalVaultSignals();

  const filteredSignals = allSignals.filter((signal) => {
    if (engineFilter && signal.vertical_engine !== engineFilter) return false;
    if (Number.isFinite(minUrgency) && signal.urgency.urgency_score < minUrgency) return false;
    if (
      stateFilter &&
      signal.facility.state.toUpperCase() !== stateFilter &&
      signal.entity.hq_state?.toUpperCase() !== stateFilter
    ) {
      return false;
    }
    if (categoryFilter && signal.signal_category.toUpperCase() !== categoryFilter) {
      return false;
    }
    if (query) {
      const haystack = [
        signal.signal_title,
        signal.signal_summary,
        signal.signal_category,
        signal.entity.canonical_name,
        signal.entity.ein,
        signal.entity.uei,
        signal.entity.npi,
        signal.entity.usdot_number,
        signal.entity.primary_domain,
        signal.facility.city,
        signal.facility.state,
        ...signal.filing.citation_codes,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  // Channel 1: Monday 7am Weekly Delta Digest CSV Download
  if (format === 'csv') {
    const csv = generateWeeklyDeltaDigestCsv(filteredSignals);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="salesautonomy_weekly_delta_digest_2026W48.csv"',
        'Cache-Control': 'no-store',
      },
    });
  }

  return NextResponse.json({
    status: 'ok',
    vault_version: '2026.11-canonical-6table',
    generated_at: new Date().toISOString(),
    architecture: {
      shared_pipeline_ratio: '90% Shared Canonical Spine / 10% Thin Vertical Adapters',
      canonical_tables: [
        'sources_provenance',
        'entities',
        'facilities_sites',
        'compliance_filings',
        'signals_deltas',
        'contacts',
      ],
      supporting_tables: [
        'enrichment_source_priority',
        'enrichment_cache',
        'client_subscriptions',
      ],
      rls_view: 'v_client_compliance_feed',
      source_authority_hierarchy: SOURCE_PRIORITY,
      quality_guards: {
        domain_directory_blocklist_count: DIRECTORY_BLOCKLIST.size,
        third_party_cpa_preparer_filter_count: THIRD_PARTY_PREPARER_DOMAIN_KEYWORDS.length,
        email_bounce_sla: '<2.0% hard gate (MillionVerifier + BounceBan Catch-All)',
        enrichment_cache_ttl_days: 30,
      },
      delivery_channels: [
        'MONDAY_7AM_DELTA_DIGEST_CSV',
        'SUPABASE_RLS_CLIENT_VIEW',
        'HMAC_SHA256_CRM_WEBHOOK',
        'MCP_JSON_RPC_API',
      ],
    },
    vertical_engines: VERTICAL_ENGINES_METADATA,
    live_ingestion_batch: getLiveIngestionManifest(),
    filters_applied: {
      vertical_engine: engineFilter,
      min_urgency: minUrgency,
      state: stateFilter,
      category: categoryFilter,
      q: query,
    },
    total_signals_returned: filteredSignals.length,
    signals: filteredSignals,
    mcp_capabilities: {
      endpoint: '/api/vault',
      protocol: 'JSON-RPC 2.0 / MCP Tools',
      tools: VAULT_MCP_TOOLS,
    },
  });
}

/**
 * POST /api/vault
 *
 * Supports:
 *   1. Model Context Protocol (MCP) JSON-RPC 2.0 requests:
 *      - `method: "tools/list"`
 *      - `method: "tools/call"` (`search_compliance_signals`, `get_entity_compliance_dossier`, `get_verified_buying_committee`)
 *   2. Direct pipeline diagnostic actions:
 *      - `action: "verify_domain"` (tests the 4 hard domain-verification guards)
 *      - `action: "classify_contact"` (tests the 55+ CPA / third-party preparer filter)
 *      - `action: "preview_webhook"` (generates `whsec_` HMAC-SHA256 signed webhook payload & SSRF check)
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const allSignals = getAllCanonicalVaultSignals();

    // 1. Handle standard MCP JSON-RPC 2.0 protocol
    if (body.jsonrpc === '2.0' || typeof body.method === 'string') {
      const rpcId = body.id ?? null;
      const method = String(body.method || '');

      if (method === 'tools/list') {
        return NextResponse.json({
          jsonrpc: '2.0',
          id: rpcId,
          result: {
            tools: VAULT_MCP_TOOLS,
          },
        });
      }

      if (method === 'tools/call') {
        const params = (body.params as Record<string, unknown>) || {};
        const toolName = String(params.name || '');
        const toolArgs = (params.arguments as Record<string, unknown>) || {};
        const result = executeMcpVaultTool(toolName, toolArgs, allSignals);

        return NextResponse.json({
          jsonrpc: '2.0',
          id: rpcId,
          result,
        });
      }

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id: rpcId,
          error: {
            code: -32601,
            message: `Unsupported MCP method: ${method}. Supported methods: tools/list, tools/call`,
          },
        },
        { status: 400 },
      );
    }

    // 2. Direct Pipeline Guard & Webhook Simulation Actions
    const action = String(body.action || '');

    if (action === 'verify_domain') {
      const result = resolveVerifiedDomain({
        canonicalName: String(body.canonical_name || ''),
        candidateUrlOrDomain: (body.candidate_domain as string) || null,
        source:
          (body.source as 'SAM_GOV_NATIVE' | 'DNS_MX_VERIFIED' | 'HEURISTIC_CANDIDATE') ||
          'DNS_MX_VERIFIED',
      });
      return NextResponse.json({ status: 'ok', action, result });
    }

    if (action === 'classify_contact') {
      const result = detectThirdPartyPreparer(
        String(body.email || ''),
        (body.entity_primary_domain as string) || null,
        (body.job_title as string) || null,
      );
      return NextResponse.json({ status: 'ok', action, result });
    }

    if (action === 'preview_webhook') {
      const signalId = String(body.signal_id || allSignals[0]?.id || '');
      const signal = allSignals.find((s) => s.id === signalId) || allSignals[0];
      const webhookUrl = String(body.webhook_url || 'https://hooks.client-crm.example.com/compliance');
      const urlValidation = WebhookDeliveryService.validateWebhookUrl(webhookUrl);
      const { secret_key } = WebhookDeliveryService.generateSubscriberSecret();
      const timestamp = new Date().toISOString();
      const payloadStr = JSON.stringify({
        event_type: 'compliance.signal.detected',
        event_id: signal.id,
        timestamp,
        vertical_engine: signal.vertical_engine,
        signal_category: signal.signal_category,
        urgency_score: signal.urgency.urgency_score,
      });
      const signature = WebhookDeliveryService.signPayload(timestamp, payloadStr, secret_key);

      return NextResponse.json({
        status: 'ok',
        action,
        ssrf_validation: urlValidation,
        headers: {
          'X-SalesAutonomy-Signature': `t=${timestamp},v1=${signature}`,
          'X-SalesAutonomy-Event': 'compliance.signal.detected',
          'X-SalesAutonomy-Event-Id': signal.id,
        },
        sample_signal_id: signal.id,
      });
    }

    return NextResponse.json(
      {
        status: 'error',
        message:
          'Provide an MCP JSON-RPC 2.0 payload (`method: "tools/list" | "tools/call"`) or `action: "verify_domain" | "classify_contact" | "preview_webhook"`.',
      },
      { status: 400 },
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        status: 'error',
        message: err instanceof Error ? err.message : 'Invalid JSON request body',
      },
      { status: 400 },
    );
  }
}

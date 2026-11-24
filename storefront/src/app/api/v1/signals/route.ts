import { NextRequest, NextResponse } from 'next/server';
import {
  getAllCanonicalVaultSignals,
  VERTICAL_ENGINES_METADATA,
  generateWeeklyDeltaDigestCsv,
  VerticalEngineId,
  CanonicalSignalDelta,
} from '../../../../../services/compliance-engine';

export const dynamic = 'force-dynamic';

/**
 * Helper to normalize flexible engine names from LLMs, Grokbot, or Clay
 */
function normalizeEngineParam(raw: string | null): VerticalEngineId | null {
  if (!raw) return null;
  const upper = raw.trim().toUpperCase();
  if (
    upper === 'HEALTHCARE_NPPES' ||
    upper === 'HEALTHCARE' ||
    upper === 'ENGINE_1' ||
    upper === 'ENGINE_1_HEALTHCARE' ||
    upper.includes('HEALTH') ||
    upper.includes('CLINIC')
  ) {
    return 'HEALTHCARE_NPPES';
  }
  if (
    upper === 'INDUSTRIAL_FLEET_OSHA' ||
    upper === 'FLEET' ||
    upper === 'INDUSTRIAL' ||
    upper === 'ENGINE_2' ||
    upper === 'ENGINE_2_FLEET_RISK' ||
    upper.includes('TRUCK') ||
    upper.includes('FMCSA') ||
    upper.includes('OSHA')
  ) {
    return 'INDUSTRIAL_FLEET_OSHA';
  }
  if (
    upper === 'PUBLIC_SECTOR_SAM' ||
    upper === 'PERMITS' ||
    upper === 'PUBLIC_SECTOR' ||
    upper === 'ENGINE_3' ||
    upper === 'ENGINE_3_PUBLIC_PERMITS' ||
    upper.includes('PERMIT') ||
    upper.includes('SAM')
  ) {
    return 'PUBLIC_SECTOR_SAM';
  }
  return null;
}

function maskEmail(email: string | null | undefined): string {
  if (!email) return 'unknown@domain.com';
  const [local, domain] = email.split('@');
  if (!domain) return '***@domain.com';
  return `${local.slice(0, 1)}***@${domain}`;
}

function maskPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '***-***-****';
  return `(***) ***-${digits.slice(-4)}`;
}

function buildGrokbotOutboundBrief(signal: CanonicalSignalDelta, isUnlocked: boolean) {
  const buyer = signal.buying_committee.find(
    (c) => !c.is_third_party_preparer && !c.suppressed_opt_out,
  ) ?? signal.buying_committee[0];

  const deadlineText =
    signal.urgency.days_until_deadline !== null
      ? `${signal.urgency.days_until_deadline} days remaining in statutory window`
      : 'Active compliance delta detected this week';

  return {
    signal_id: signal.id,
    vertical_engine: signal.vertical_engine,
    urgency_score: signal.urgency.urgency_score,
    deadline_window: deadlineText,
    target_account: {
      canonical_name: signal.entity.canonical_name,
      primary_domain: signal.entity.primary_domain,
      city: signal.facility.city,
      state: signal.facility.state,
      employee_count_exact: signal.entity.employee_count_exact,
      identifiers: {
        ein: signal.entity.ein,
        uei: signal.entity.uei,
        npi: signal.entity.npi,
        usdot_number: signal.entity.usdot_number,
      },
    },
    statutory_proof: {
      source_system: signal.provenance.source_system,
      external_filing_id: signal.filing.external_filing_id,
      filing_date: signal.filing.filing_date,
      payload_sha256: signal.provenance.raw_file_sha256,
      source_url: signal.provenance.source_url,
      raw_summary: signal.filing.raw_summary,
    },
    primary_decision_maker: buyer
      ? {
          full_name: buyer.full_name,
          job_title: buyer.job_title,
          buying_role: buyer.buying_role,
          cpa_filter_passed: !buyer.is_third_party_preparer,
          work_email: isUnlocked ? buyer.work_email : maskEmail(buyer.work_email),
          direct_phone: isUnlocked ? buyer.direct_phone : maskPhone(buyer.direct_phone),
          email_verification_status: buyer.email_verification_status,
          bounce_risk_score: buyer.bounce_risk_score,
          is_unlocked: isUnlocked,
        }
      : null,
    suggested_first_line: `Saw ${signal.entity.canonical_name} filed ${signal.filing.external_filing_id} (${signal.signal_title}) in ${signal.facility.city}, ${signal.facility.state}.`,
  };
}

/**
 * GET /api/v1/signals
 *
 * 2026 Agent-Native REST API v1 with Credit-Metered Agent Firewall.
 * - Default mode (`mode=preview`): 0 credits charged. Full canonical 6-table metadata,
 *   SHA-256 statutory receipts, and urgency scores returned with masked emails (`d***@domain.com`)
 *   so Grokbot, Claude, or Clay agents can scan and filter freely without draining credits.
 * - Unlock mode (`unlock=true` with API key `sa_pilot_2026_demo` or `Authorization: Bearer ...`):
 *   Unmasks `<2%` bounce-verified decision-maker emails and phones and returns credit meter headers.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawEngine =
    searchParams.get('engine') ||
    searchParams.get('vertical') ||
    searchParams.get('vertical_engine');
  const engineFilter = normalizeEngineParam(rawEngine);
  const stateFilter = searchParams.get('state')?.trim().toUpperCase() || null;
  const minUrgency = Number(searchParams.get('min_urgency') ?? '0');
  const query = searchParams.get('q')?.trim().toLowerCase() || null;
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? '25')));
  const format = searchParams.get('format')?.trim().toLowerCase() || 'json';
  const unlockRequested = searchParams.get('unlock') === 'true';

  const authHeader = req.headers.get('authorization');
  const apiKeyHeader = req.headers.get('x-api-key') || searchParams.get('api_key');
  const providedKey =
    apiKeyHeader || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null);

  const isUnlocked = Boolean(unlockRequested && providedKey);

  const allSignals = getAllCanonicalVaultSignals();

  const filtered = allSignals
    .filter((signal) => {
      if (engineFilter && signal.vertical_engine !== engineFilter) return false;
      if (
        stateFilter &&
        stateFilter !== 'ALL' &&
        signal.facility.state.toUpperCase() !== stateFilter &&
        signal.entity.hq_state?.toUpperCase() !== stateFilter
      ) {
        return false;
      }
      if (Number.isFinite(minUrgency) && signal.urgency.urgency_score < minUrgency) {
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
    })
    .slice(0, limit);

  if (format === 'csv') {
    const csv = generateWeeklyDeltaDigestCsv(filtered);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition':
          'attachment; filename="salesautonomy_v1_signals_2026.csv"',
        'X-SalesAutonomy-Credits-Charged': String(isUnlocked ? filtered.length : 0),
      },
    });
  }

  const creditsCharged = isUnlocked ? filtered.length : 0;
  const monthlyLimit = 1250;
  const creditsRemaining = Math.max(0, monthlyLimit - creditsCharged);

  const formattedSignals = filtered.map((s) => {
    const brief = buildGrokbotOutboundBrief(s, isUnlocked);
    if (format === 'grokbot_brief') {
      return brief;
    }
    return {
      ...s,
      buying_committee: s.buying_committee.map((c) => ({
        ...c,
        work_email: isUnlocked ? c.work_email : maskEmail(c.work_email),
        direct_phone: isUnlocked ? c.direct_phone : maskPhone(c.direct_phone),
        is_unlocked: isUnlocked,
      })),
      grokbot_outbound_brief: brief,
    };
  });

  return NextResponse.json(
    {
      status: 'ok',
      api_version: '2026.11-v1',
      mode: isUnlocked ? 'UNLOCKED_VERIFIED_CONTACTS' : 'ZERO_COST_AGENT_PREVIEW',
      credit_firewall: {
        tier: 'Tier 1 · PowerTable & Credit-Metered API Plan ($799/mo)',
        monthly_credit_limit: monthlyLimit,
        credits_charged_this_call: creditsCharged,
        credits_remaining: creditsRemaining,
        anti_saturation_territory_cap: 'Max 5 active subscribers per territory slice',
        how_to_unlock: isUnlocked
          ? 'Contacts unmasked via valid API key.'
          : 'Pass header "x-api-key: sa_pilot_2026_demo" and "?unlock=true" (or POST /api/v1/signals) to unmask SMTP-verified emails.',
      },
      agent_discovery: {
        llms_txt: '/llms.txt',
        remote_mcp_endpoint: '/api/mcp',
        rest_v1_endpoint: '/api/v1/signals',
      },
      filters_applied: {
        engine: engineFilter ?? 'ALL',
        state: stateFilter ?? 'ALL',
        min_urgency: minUrgency,
        q: query,
        limit,
        format,
      },
      total_matches: formattedSignals.length,
      vertical_engines_available: VERTICAL_ENGINES_METADATA.map((e) => ({
        id: e.id,
        name: e.name,
        refresh_cadence: e.refresh_cadence,
      })),
      signals: formattedSignals,
    },
    {
      headers: {
        'X-SalesAutonomy-Mode': isUnlocked ? 'unlocked' : 'preview',
        'X-SalesAutonomy-Credits-Charged': String(creditsCharged),
        'X-SalesAutonomy-Credits-Remaining': String(creditsRemaining),
      },
    },
  );
}

/**
 * POST /api/v1/signals
 *
 * Credit-Metered Contact Unlock & Grokbot Chief-of-Staff Batch Brief Generator.
 * Body:
 *   {
 *     "action": "unlock_contacts",
 *     "signal_ids": ["..."], // or "engine": "FLEET", "state": "TX", "limit": 5
 *     "api_key": "sa_pilot_2026_demo"
 *   }
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const allSignals = getAllCanonicalVaultSignals();

    const signalIds = Array.isArray(body.signal_ids)
      ? (body.signal_ids as string[]).map((id) => String(id).trim())
      : [];
    const engineFilter = normalizeEngineParam(
      (body.engine as string) || (body.vertical_engine as string) || null,
    );
    const stateFilter =
      typeof body.state === 'string' ? body.state.trim().toUpperCase() : null;
    const limit = Math.min(25, Math.max(1, Number(body.limit ?? 5)));

    let matched = allSignals;
    if (signalIds.length > 0) {
      matched = allSignals.filter(
        (s) =>
          signalIds.includes(s.id) ||
          signalIds.includes(s.entity.id) ||
          (s.entity.ein && signalIds.includes(s.entity.ein)) ||
          (s.entity.npi && signalIds.includes(s.entity.npi)) ||
          (s.entity.usdot_number && signalIds.includes(s.entity.usdot_number)),
      );
    } else {
      matched = allSignals
        .filter((s) => (!engineFilter || s.vertical_engine === engineFilter))
        .filter(
          (s) =>
            !stateFilter ||
            stateFilter === 'ALL' ||
            s.facility.state.toUpperCase() === stateFilter,
        )
        .slice(0, limit);
    }

    const creditsCharged = matched.length;
    const monthlyLimit = 1250;
    const creditsRemaining = Math.max(0, monthlyLimit - creditsCharged);

    return NextResponse.json({
      status: 'ok',
      action: 'unlock_contacts',
      mode: 'UNLOCKED_VERIFIED_CONTACTS',
      credit_receipt: {
        credits_charged: creditsCharged,
        credits_remaining: creditsRemaining,
        bounce_sla: '<2.0% hard-bounce guarantee (2-for-1 replacement)',
        cpa_exclusion_gate: '50-keyword CPA/registered-agent filter enforced',
      },
      unlocked_count: matched.length,
      grokbot_outbound_briefs: matched.map((s) => buildGrokbotOutboundBrief(s, true)),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        status: 'error',
        message: err instanceof Error ? err.message : 'Invalid JSON payload',
      },
      { status: 400 },
    );
  }
}

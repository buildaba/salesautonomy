import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing resume or LinkedIn text' }, { status: 400 });
    }

    const clean = text.trim();
    const lower = clean.toLowerCase();

    // 1. Extract Identity & Deduplication Key
    const emailMatch = clean.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const linkedinMatch = clean.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
    const lines = clean.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const guessedName = lines[0] && lines[0].length < 45 && !lines[0].includes('@')
      ? lines[0].replace(/\|.*$/, '').trim()
      : 'Alex Rivera';

    // 2. Detect Role Track
    let roleTrack: 'founding-ae' | 'mm-ent-ae' | 'vp-sales' | 'gtm-engineer' = 'founding-ae';
    if (lower.includes('vp of sales') || lower.includes('vice president of sales') || lower.includes('head of sales') || lower.includes('cro')) {
      roleTrack = 'vp-sales';
    } else if (lower.includes('gtm engineer') || lower.includes('revops') || (lower.includes('clay') && lower.includes('webhook'))) {
      roleTrack = 'gtm-engineer';
    } else if (lower.includes('enterprise account executive') || lower.includes('enterprise ae') || lower.includes('senior account executive')) {
      roleTrack = 'mm-ent-ae';
    } else if (lower.includes('founding account executive') || lower.includes('founding ae') || lower.includes('first sales hire')) {
      roleTrack = 'founding-ae';
    }

    // 3. Detect Company Stages
    const stages: string[] = [];
    if (lower.includes('seed')) stages.push('Seed (<$2M ARR)');
    if (lower.includes('series a')) stages.push('Series A ($2M–$10M)');
    if (lower.includes('series b')) stages.push('Series B ($10M–$30M)');
    if (lower.includes('series c') || lower.includes('series d') || lower.includes('public')) stages.push('Series C+ ($30M+)');
    if (stages.length === 0) stages.push('Series A ($2M–$10M)', 'Series B ($10M–$30M)');

    // 4. Detect ACV Band & Sales Cycle
    let acvBand = '$50K–$150K (Mid-Market)';
    let acvExplicit = false;
    if (lower.includes('$150k') || lower.includes('$200k') || lower.includes('$250k') || lower.includes('$300k')) {
      acvBand = '$150K–$500K+ (Enterprise)';
      acvExplicit = true;
    } else if (lower.includes('$60k') || lower.includes('$75k') || lower.includes('$85k') || lower.includes('$95k') || lower.includes('$100k') || lower.includes('$120k')) {
      acvBand = '$50K–$150K (Mid-Market)';
      acvExplicit = true;
    } else if (lower.includes('$20k') || lower.includes('$25k') || lower.includes('$30k') || lower.includes('$40k')) {
      acvBand = '$15K–$50K (SMB / Lower MM)';
      acvExplicit = true;
    }

    let salesCycle = '60–120 Days';
    let cycleExplicit = false;
    if (lower.includes('30-day') || lower.includes('45-day') || lower.includes('30–60')) {
      salesCycle = '30–60 Days';
      cycleExplicit = true;
    } else if (lower.includes('60-day') || lower.includes('90-day') || lower.includes('60–120')) {
      salesCycle = '60–120 Days';
      cycleExplicit = true;
    } else if (lower.includes('6-month') || lower.includes('180-day') || lower.includes('9-month')) {
      salesCycle = '120–180+ Days (Complex)';
      cycleExplicit = true;
    }

    // 5. Detect Buyer Personas
    const buyers: string[] = [];
    if (lower.includes('cto') || lower.includes('vp of engineering') || lower.includes('vp eng') || lower.includes('ciso') || lower.includes('developer') || lower.includes('security')) {
      buyers.push('Technical (CTO / VP Eng / Sec)');
    }
    if (lower.includes('cfo') || lower.includes('coo') || lower.includes('finance')) {
      buyers.push('Finance & Ops (CFO / COO)');
    }
    if (lower.includes('cro') || lower.includes('vp of sales') || lower.includes('cmo') || lower.includes('revops')) {
      buyers.push('GTM Leaders (CRO / VP Sales / CMO)');
    }
    if (buyers.length === 0) {
      buyers.push('Technical (CTO / VP Eng / Sec)');
    }

    // 6. Detect Pipeline Mix & Quota Metrics
    const pctMatch = clean.match(/(\d{2,3})%\s*(?:of\s+)?(?:quota|attainment)/i) || clean.match(/attainment[:\s]+(\d{2,3})%/i);
    const attainment = pctMatch ? `${pctMatch[1]}% Avg Attainment` : '132% Avg Attainment';

    const outboundMatch = clean.match(/(\d{2,3})%\s*self[- ]sourced/i);
    const pipelineMix = outboundMatch ? '70%+ Self-Sourced Outbound' : '50/50 Outbound & Inbound';
    const outboundExplicit = Boolean(outboundMatch);

    // 7. Auto-Detect Current Employer & Build Stealth Domain Shield
    const domainGuessMatch = clean.match(/@([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/);
    const genericDomains = ['gmail.com', 'hey.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'hotmail.com'];
    let blockedDomains = 'currentemployer.com';
    if (domainGuessMatch && !genericDomains.includes(domainGuessMatch[1].toLowerCase())) {
      blockedDomains = domainGuessMatch[1].toLowerCase();
    } else if (lower.includes('crowdstrike')) {
      blockedDomains = 'crowdstrike.com';
    } else if (lower.includes('datadog')) {
      blockedDomains = 'datadoghq.com';
    } else if (lower.includes('vercel')) {
      blockedDomains = 'vercel.com';
    } else if (lower.includes('snyk')) {
      blockedDomains = 'snyk.io';
    }

    // Determine which fields were explicitly extracted vs need 1-click confirmation
    const extractedFields: string[] = ['Identity & LinkedIn Handle', 'Role Track', 'Stage History', 'Buyer Personas', 'Stealth Employer Shield'];
    const needsConfirmation: string[] = [];
    if (!acvExplicit) needsConfirmation.push('Confirm Median Deal Size (ACV) vs Largest Deal');
    if (!outboundExplicit) needsConfirmation.push('Confirm Self-Sourced Outbound % vs Inbound');
    if (!cycleExplicit) needsConfirmation.push('Confirm Median Sales Cycle Length');
    needsConfirmation.push('Set Your Minimum Base & Target OTE Floor');

    return NextResponse.json({
      fullName: guessedName,
      email: emailMatch ? emailMatch[0] : 'alex.rivera@hey.com',
      linkedinUrl: linkedinMatch ? linkedinMatch[0].replace(/^https?:\/\/(www\.)?/, '') : `linkedin.com/in/${guessedName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      maskedCompanyLabel: stages[0]?.includes('Seed') ? 'Series A DevTools SaaS' : 'Series B Enterprise SaaS',
      blockedDomains,
      roleTrack,
      stages,
      acvBand,
      salesCycle,
      buyers,
      pipelineMix,
      territoryType: lower.includes('greenfield') || lower.includes('from scratch') || lower.includes('0 to') || lower.includes('$0')
        ? 'Greenfield (Built from $0)'
        : 'Established / Inherited Book',
      attainment,
      extractedFields,
      needsConfirmation,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to parse resume text' }, { status: 500 });
  }
}

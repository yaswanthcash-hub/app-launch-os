/**
 * App Launch OS — Scoring Engine
 * Computes deterministic Launch Readiness Score™ (0-100) with multi-pillar breakdown,
 * progress bar generator, and launch survival verdict.
 */

function generateProgressBar(score, totalBlocks = 20) {
  const filled = Math.round((score / 100) * totalBlocks);
  const empty = Math.max(0, totalBlocks - filled);
  return '█'.repeat(filled) + '░'.repeat(empty);
}

function computeScore(allResults) {
  let blockers = 0;
  let warnings = 0;
  let passed = 0;

  const categorized = {
    APPLE: [],
    GOOGLE: [],
    UX: [],
    PERFORMANCE: []
  };

  for (const item of allResults) {
    if (item.status === 'BLOCKER') blockers++;
    else if (item.status === 'WARNING') warnings++;
    else passed++;

    if (categorized[item.category]) {
      categorized[item.category].push(item);
    }
  }

  // Calculate pillar scores (0-100 each)
  function calcPillar(items) {
    if (!items || items.length === 0) return 85; // neutral baseline
    let score = 100;
    for (const it of items) {
      if (it.status === 'BLOCKER') score -= 35;
      else if (it.status === 'WARNING') score -= 12;
    }
    return Math.max(10, Math.min(100, Math.round(score)));
  }

  // Pillar breakdowns
  const storeItems = [...(categorized.APPLE || []), ...(categorized.GOOGLE || [])];
  const uxItems = (categorized.UX || []).filter(i => !i.id.includes('ACCESSIBILITY') && !i.id.includes('DYNAMIC_TYPE'));
  const a11yItems = (categorized.UX || []).filter(i => i.id.includes('ACCESSIBILITY') || i.id.includes('DYNAMIC_TYPE'));
  const perfItems = categorized.PERFORMANCE || [];

  const complianceScore = calcPillar(storeItems);
  const uxScore = calcPillar(uxItems);
  const accessibilityScore = calcPillar(a11yItems);
  const performanceScore = calcPillar(perfItems);

  // Security and Growth baseline scores based on overall hygiene
  const securityItems = allResults.filter(i => i.id.includes('PRIVACY') || i.id.includes('CRASH') || i.id.includes('DELETION'));
  const securityScore = calcPillar(securityItems);
  const growthScore = calcPillar(allResults.filter(i => i.id.includes('SUBSCRIPTION') || i.id.includes('CLOSED_TESTING')));

  // Weighted overall Launch Readiness Score (0-100)
  const weighted = (
    complianceScore * 0.35 +
    uxScore * 0.20 +
    performanceScore * 0.15 +
    securityScore * 0.15 +
    accessibilityScore * 0.10 +
    growthScore * 0.05
  );

  const finalScore = Math.max(10, Math.min(100, Math.round(weighted)));

  // Launch Survival Verdict
  let verdict = '';
  let verdictColor = '';
  if (finalScore >= 90 && blockers === 0) {
    verdict = '🚀 SURVIVES LAUNCH (Ready for App Store & Google Play)';
    verdictColor = '\x1b[32m'; // green
  } else if (blockers > 2 || finalScore < 60) {
    verdict = '🔴 FATAL REJECTION (Guaranteed Store Rejection)';
    verdictColor = '\x1b[31m'; // red
  } else {
    verdict = `⚠️ AT RISK (${blockers} Store Blocker${blockers === 1 ? '' : 's'} Found)`;
    verdictColor = '\x1b[33m'; // yellow
  }

  return {
    score: finalScore,
    progressBar: generateProgressBar(finalScore, 20),
    verdict,
    verdictColor,
    blockers,
    warnings,
    passed,
    pillars: {
      'Store Compliance': complianceScore,
      'UX & Design': uxScore,
      'Performance': performanceScore,
      'Security': securityScore,
      'Accessibility': accessibilityScore,
      'Growth & Release': growthScore
    },
    categorized,
    totalChecks: allResults.length
  };
}

module.exports = { computeScore, generateProgressBar };

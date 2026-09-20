/**
 * App Launch OS — Deterministic Scoring Engine
 * Computes Launch Readiness Score (0-100) with justified weights per ADR 010.
 * Omits empty pillars (no fake 85 baselines). Partitions MANUAL items from numeric score.
 */

function generateProgressBar(score, totalBlocks = 20) {
  if (score === null || score === undefined) return '';
  const filled = Math.round((score / 100) * totalBlocks);
  const empty = Math.max(0, totalBlocks - filled);
  return '█'.repeat(filled) + '░'.repeat(empty);
}

function computeScore(allResults) {
  let blockers = 0;
  let warnings = 0;
  let passed = 0;
  let manualCount = 0;
  let unknownCount = 0;

  const categorized = {
    APPLE: [],
    GOOGLE: [],
    UX: [],
    PERFORMANCE: [],
    SECURITY: [],
    MANUAL: [],
  };

  const manualItems = [];

  for (const item of allResults) {
    if (item.status === 'MANUAL') {
      manualCount++;
      manualItems.push(item);
      categorized.MANUAL.push(item);
      continue;
    }

    if (item.status === 'UNKNOWN') {
      unknownCount++;
      continue;
    }

    if (item.status === 'BLOCKER') blockers++;
    else if (item.status === 'WARNING') warnings++;
    else if (item.status === 'PASS') passed++;

    if (categorized[item.category]) {
      categorized[item.category].push(item);
    }
  }

  const verifiedCount = passed + warnings + blockers;

  // Calculate pillar score: returns null if no items exist (no fake 85 baseline)
  function calcPillar(items) {
    if (!items || items.length === 0) return null;
    let score = 100;
    for (const it of items) {
      if (it.status === 'BLOCKER') score -= 35;
      else if (it.status === 'WARNING') score -= 15;
    }
    return Math.max(10, Math.min(100, Math.round(score)));
  }

  // Pillar groupings per ADR 010
  const storeItems = [
    ...(categorized.APPLE || []).filter(i => i.status !== 'MANUAL'),
    ...(categorized.GOOGLE || []).filter(i => i.status !== 'MANUAL'),
  ];
  const uxItems = (categorized.UX || []).filter(
    i => !i.id.includes('ACCESSIBILITY') && !i.id.includes('DYNAMIC_TYPE') && i.status !== 'MANUAL'
  );
  const a11yItems = (categorized.UX || []).filter(
    i => (i.id.includes('ACCESSIBILITY') || i.id.includes('DYNAMIC_TYPE')) && i.status !== 'MANUAL'
  );
  const perfItems = (categorized.PERFORMANCE || []).filter(i => i.status !== 'MANUAL');
  const secItems = (categorized.SECURITY || []).filter(i => i.status !== 'MANUAL');

  const complianceScore = calcPillar(storeItems);
  const securityScore = calcPillar(secItems);
  const performanceScore = calcPillar(perfItems);
  const uxScore = calcPillar(uxItems);
  const accessibilityScore = calcPillar(a11yItems);

  // Active pillars dictionary (omits null categories)
  const pillars = {};
  const activePillarWeights = [];

  if (complianceScore !== null) {
    pillars['Store Compliance'] = complianceScore;
    activePillarWeights.push({ score: complianceScore, weight: 0.30 });
  }
  if (securityScore !== null) {
    pillars['Security'] = securityScore;
    activePillarWeights.push({ score: securityScore, weight: 0.25 });
  }
  if (performanceScore !== null) {
    pillars['Performance'] = performanceScore;
    activePillarWeights.push({ score: performanceScore, weight: 0.20 });
  }
  if (uxScore !== null) {
    pillars['UX & Design'] = uxScore;
    activePillarWeights.push({ score: uxScore, weight: 0.15 });
  }
  if (accessibilityScore !== null) {
    pillars['Accessibility'] = accessibilityScore;
    activePillarWeights.push({ score: accessibilityScore, weight: 0.10 });
  }

  let finalScore = null;
  if (activePillarWeights.length > 0) {
    const totalWeight = activePillarWeights.reduce((sum, p) => sum + p.weight, 0);
    const weightedSum = activePillarWeights.reduce((sum, p) => sum + p.score * p.weight, 0);
    finalScore = Math.max(10, Math.min(100, Math.round(weightedSum / totalWeight)));
  }

  // Verdict calculation
  let verdict = '';
  let verdictColor = '';

  if (finalScore === null) {
    verdict = '⚪ NO AUDITABLE CODE DETECTED';
    verdictColor = '\x1b[37m';
  } else if (finalScore >= 90 && blockers === 0) {
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
    manualCount,
    unknownCount,
    verifiedCount,
    pillars,
    categorized,
    manualItems,
  };
}

module.exports = {
  computeScore,
  generateProgressBar,
};

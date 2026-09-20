/**
 * App Launch OS — Scoring Engine
 * Computes Launch Readiness Score (0-100) and aggregates Blockers, Warnings, and Passes.
 */

function computeScore(allResults) {
  let blockers = 0;
  let warnings = 0;
  let passed = 0;

  // Weights by category
  const categoryWeights = {
    APPLE: 35,
    GOOGLE: 25,
    UX: 25,
    PERFORMANCE: 15
  };

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

  // Calculate weighted category score
  let totalScore = 0;

  for (const [cat, items] of Object.entries(categorized)) {
    if (items.length === 0) continue;
    const catWeight = categoryWeights[cat] || 25;
    let catScore = catWeight;

    for (const item of items) {
      if (item.status === 'BLOCKER') {
        catScore -= (catWeight / items.length) * 1.5; // Heavy deduction for blockers
      } else if (item.status === 'WARNING') {
        catScore -= (catWeight / items.length) * 0.4;
      }
    }

    totalScore += Math.max(0, catScore);
  }

  const finalScore = Math.round(Math.min(100, Math.max(0, totalScore)));

  return {
    score: finalScore,
    blockers,
    warnings,
    passed,
    categorized,
    totalChecks: allResults.length
  };
}

module.exports = { computeScore };

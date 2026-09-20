/**
 * App Launch OS — Terminal Reporter
 * Renders the viral ANSI/Unicode dashboard and shareable score.
 */

// Terminal ANSI formatting
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function renderReport({ score, blockers, warnings, passed, categorized, totalChecks }, options = {}) {
  const isDetailed = options.detailed || false;

  const scoreColor = score >= 80 ? c.green : score >= 50 ? c.yellow : c.red;
  const line = '━'.repeat(40);

  console.log('\n' + c.bold + c.cyan + 'APP LAUNCH OS' + c.reset);
  console.log(c.dim + line + c.reset);
  console.log(`\n${c.bold}Launch Readiness: ${scoreColor}${score}/100${c.reset}\n`);

  console.log(`🔴 ${c.bold}${blockers} BLOCKER${blockers === 1 ? '' : 'S'}${c.reset}`);
  console.log(`🟠 ${c.bold}${warnings} WARNING${warnings === 1 ? '' : 'S'}${c.reset}`);
  console.log(`🟢 ${c.bold}${passed} PASSED${c.reset}\n`);

  // Categories
  const categoryTitles = {
    APPLE: 'APPLE',
    GOOGLE: 'GOOGLE',
    UX: 'UX',
    PERFORMANCE: 'PERFORMANCE'
  };

  for (const [cat, title] of Object.entries(categoryTitles)) {
    const items = categorized[cat] || [];
    if (items.length === 0) continue;

    console.log(c.bold + title + c.reset);
    for (const item of items) {
      if (item.status === 'PASS') {
        console.log(`  ${c.green}✓${c.reset} ${item.name}`);
      } else if (item.status === 'BLOCKER') {
        console.log(`  ${c.red}✗${c.reset} ${item.name} ${c.dim}(${item.details})${c.reset}`);
      } else {
        console.log(`  ${c.yellow}✗${c.reset} ${item.name} ${c.dim}(${item.details})${c.reset}`);
      }
    }
    console.log('');
  }

  console.log(c.dim + line + c.reset);

  if (blockers > 0 || warnings > 0) {
    console.log(`\n${c.bold}Run:${c.reset}\n`);
    console.log(`  ${c.cyan}npx app-launch-os fix${c.reset}\n`);
  } else {
    console.log(`\n✨ ${c.bold}${c.green}100% Launch Ready! Ready for App Store & Google Play submission.${c.reset}\n`);
  }

  // Viral share prompt
  console.log(c.dim + 'Share your score on X:' + c.reset);
  const tweetText = encodeURIComponent(
    `My mobile app scored ${score}/100 on the App Launch OS audit (${blockers} blockers, ${warnings} warnings). Check your app: npx app-launch-os audit via @applaunchos`
  );
  console.log(`  ${c.dim}https://twitter.com/intent/tweet?text=${tweetText}${c.reset}\n`);
}

module.exports = { renderReport };

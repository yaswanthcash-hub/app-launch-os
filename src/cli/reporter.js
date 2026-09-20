/**
 * App Launch OS — Terminal Reporter & Social Card Generator
 * Renders the deterministic Launch Readiness Score™, Shareable ASCII Social Card,
 * and the "Roast My App" audit mode.
 */

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

function renderSocialCard({ score, progressBar, pillars, blockers, warnings, passed }) {
  const padScore = String(score).padStart(3, ' ');
  const padBar = progressBar.padEnd(20, ' ');
  const comp = String(pillars['Store Compliance']).padEnd(3, ' ');
  const sec = String(pillars['Security']).padEnd(3, ' ');
  const ux = String(pillars['UX & Design']).padEnd(3, ' ');
  const perf = String(pillars['Performance']).padEnd(3, ' ');

  return `
┌─────────────────────────────────────────────────┐
│                 APP LAUNCH OS                   │
│             LAUNCH READINESS SCORE              │
│                      ${padScore}                        │
│              ${padBar}               │
│                                                 │
│    Store Compliance   ${comp}    Security     ${sec}   │
│    UX & Design        ${ux}    Performance  ${perf}   │
│                                                 │
│    ${blockers} Blockers · ${warnings} Warnings · ${passed} Passed          │
│    Audit your app: npx app-launch-os audit      │
└─────────────────────────────────────────────────┘`;
}

function renderReport(scoreData, options = {}) {
  const { score, progressBar, verdict, verdictColor, blockers, warnings, passed, pillars, categorized } = scoreData;
  const scoreColor = score >= 90 ? c.green : score >= 70 ? c.yellow : c.red;
  const line = '━'.repeat(45);

  console.log('\n' + c.bold + c.cyan + 'APP LAUNCH OS' + c.reset);
  console.log(c.dim + line + c.reset);

  console.log(`\n${c.bold}APP LAUNCH SCORE${c.reset}`);
  console.log(`${c.bold}${scoreColor}${progressBar} ${score}/100${c.reset}\n`);

  // Multi-Pillar Breakdown
  for (const [pillar, pScore] of Object.entries(pillars)) {
    const pColor = pScore >= 90 ? c.green : pScore >= 70 ? c.yellow : c.red;
    const dots = '.'.repeat(Math.max(4, 25 - pillar.length));
    console.log(`  ${c.dim}${pillar}${c.reset} ${c.dim}${dots}${c.reset} ${pColor}${pScore}${c.reset}`);
  }

  console.log(`\n${c.bold}Verdict:${c.reset} ${verdictColor}${c.bold}${verdict}${c.reset}\n`);

  console.log(`🔴 ${c.bold}${blockers} BLOCKER${blockers === 1 ? '' : 'S'}${c.reset}`);
  console.log(`🟠 ${c.bold}${warnings} WARNING${warnings === 1 ? '' : 'S'}${c.reset}`);
  console.log(`🟢 ${c.bold}${passed} PASSED${c.reset}\n`);

  // Categories Detail
  const categoryTitles = {
    APPLE: 'APPLE APP STORE',
    GOOGLE: 'GOOGLE PLAY STORE',
    UX: 'UX & SENSORY',
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

  // Social Card
  console.log(c.bold + '\n📋 Shareable Launch Card:' + c.reset);
  console.log(c.cyan + renderSocialCard(scoreData) + c.reset);

  if (blockers > 0 || warnings > 0) {
    console.log(`\n${c.bold}Fix Remaining Issues:${c.reset}`);
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

function renderRoastReport(scoreData) {
  const { score, progressBar, blockers, warnings, categorized } = scoreData;
  const line = '━'.repeat(45);

  console.log('\n' + c.bold + c.red + '🔥 ROAST MY APP — App Launch OS' + c.reset);
  console.log(c.dim + line + c.reset);
  console.log(`\nYour app scored: ${c.bold}${c.red}${score}/100${c.reset}`);
  console.log(`${c.red}${progressBar}${c.reset}\n`);

  if (blockers === 0 && score >= 90) {
    console.log(c.green + "Wait... we couldn't roast you. Your app actually has all store compliance and UX guards in place. You're in the top 1%!" + c.reset);
    console.log(c.dim + "\nGo ship your app already: npx app-launch-os ship\n" + c.reset);
    return;
  }

  console.log(c.bold + `We found ${blockers} fatal blockers and ${warnings} embarrassing warnings.` + c.reset);
  console.log(c.dim + "Here is why Apple and Google reviewers will laugh at your build:\n" + c.reset);

  const roasts = [];

  // Check specific issues and generate roast lines
  const allItems = [
    ...(categorized.APPLE || []),
    ...(categorized.GOOGLE || []),
    ...(categorized.UX || []),
    ...(categorized.PERFORMANCE || [])
  ];

  for (const item of allItems) {
    if (item.status === 'PASS') continue;

    if (item.id === 'APPLE_DEMO_ACCOUNT') {
      roasts.push({
        type: 'BLOCKER',
        title: 'SMS Auth Trap',
        roast: 'Apple reviewers cannot receive external SMS OTP codes. They will reject your app within 4 minutes flat while drinking their morning espresso.'
      });
    } else if (item.id === 'APPLE_PRIVACY_MANIFEST') {
      roasts.push({
        type: 'BLOCKER',
        title: 'Missing PrivacyInfo.xcprivacy',
        roast: "Apple's automated binary ingestion bot will auto-reject your build before a human reviewer even touches it. It's 2026, declare your required reason APIs."
      });
    } else if (item.id === 'APPLE_ACCOUNT_DELETION') {
      roasts.push({
        type: 'BLOCKER',
        title: 'Account Deletion Missing',
        roast: 'Guideline 5.1.1(v) instant kill. If a user can create an account in your app, they must be able to delete it inside the app without emailing support.'
      });
    } else if (item.id === 'APPLE_SUBSCRIPTION_DISCLOSURE') {
      roasts.push({
        type: 'BLOCKER',
        title: 'Paywall Missing Restore Button',
        roast: 'StoreKit 2 requires a functional "Restore Purchases" trigger. Reviewers click this first thing. When nothing happens: instant rejection.'
      });
    } else if (item.id === 'GOOGLE_TARGET_SDK') {
      roasts.push({
        type: 'BLOCKER',
        title: 'Outdated Android Target SDK',
        roast: "Google Play mandates API level 35 (Android 15). Your build won't even upload to the Play Console closed track."
      });
    } else if (item.id === 'GOOGLE_16KB_PAGE') {
      roasts.push({
        type: 'BLOCKER',
        title: 'Missing 16 KB Page Alignment',
        roast: 'Your native C++ libraries will crash instantly on Pixel 9 and Android 15 devices due to 16 KB ELF page alignment failure.'
      });
    } else if (item.id === 'UX_LOADING_STATES') {
      roasts.push({
        type: 'WARNING',
        title: 'Raw ActivityIndicator Spinners Everywhere',
        roast: 'Blank screens with generic spinning wheels make your app look and feel like a 2017 PhoneGap wrapper. Use Moti shimmer skeletons.'
      });
    } else if (item.id === 'UX_HAPTICS') {
      roasts.push({
        type: 'WARNING',
        title: 'Zero Tactile Haptics',
        roast: 'Tapping buttons in your app feels like poking dead glass. Top 1% apps use physical click detents on tabs, swipes, and switches.'
      });
    } else if (item.id === 'PERF_UI_WORKLETS') {
      roasts.push({
        type: 'WARNING',
        title: 'JS-Thread Animations',
        roast: 'Your animations run on the JS thread. As soon as your app fetches data or scrolls a list, your framerate is going to plunge to 18 FPS.'
      });
    } else if (item.id === 'PERF_CRASH_TELEMETRY') {
      roasts.push({
        type: 'WARNING',
        title: 'No Crash Monitoring (Flying Blind)',
        roast: "You have zero crash reporting installed. When users crash on launch, you won't know until they leave you a 1-star review."
      });
    }
  }

  for (const r of roasts) {
    const icon = r.type === 'BLOCKER' ? '🔴' : '🟠';
    console.log(`${icon} ${c.bold}${r.title}:${c.reset}`);
    console.log(`   ${c.dim}${r.roast}${c.reset}\n`);
  }

  console.log(c.dim + line + c.reset);
  console.log(`\n${c.bold}Don't let Apple or Google embarrass you.${c.reset}`);
  console.log(`Run: ${c.cyan}npx app-launch-os fix${c.reset} to fix these before your reviewers see them.\n`);
}

module.exports = { renderReport, renderSocialCard, renderRoastReport };

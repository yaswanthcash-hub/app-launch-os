/**
 * App Launch OS — Fixer Engine (`app-launch-os fix`)
 * Automatically scaffolds compliant configurations, privacy manifests, and haptic hooks.
 */

const fs = require('fs');
const path = require('path');

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m'
};

function runFixer({ projectDir, pkg, appConfig, files, repoRootDir }) {
  console.log('\n' + c.bold + c.cyan + '🚀 App Launch OS — Auto-Fix Generator' + c.reset);
  console.log(c.dim + 'Applying safe configurations and generating scaffolding...\n' + c.reset);

  const appliedFixes = [];

  // 1. Scaffold PrivacyInfo.xcprivacy if missing
  const hasPrivacy = files.some(f => /PrivacyInfo\.xcprivacy$/i.test(f));
  if (!hasPrivacy) {
    const targetIosDir = path.join(projectDir, 'ios');
    const targetFile = path.join(targetIosDir, 'PrivacyInfo.xcprivacy');
    const templateSource = path.join(repoRootDir, 'starters/expo-ts/ios/PrivacyInfo.xcprivacy');

    if (fs.existsSync(templateSource)) {
      if (!fs.existsSync(targetIosDir)) {
        fs.mkdirSync(targetIosDir, { recursive: true });
      }
      fs.copyFileSync(templateSource, targetFile);
      appliedFixes.push('Scaffolded 2026 Apple Privacy Manifest at ios/PrivacyInfo.xcprivacy');
    }
  }

  // 2. Scaffold useHaptic hook if missing
  const hasHapticHook = files.some(f => /useHaptic\.(ts|tsx|js)$/i.test(f));
  if (!hasHapticHook) {
    const hooksDir = path.join(projectDir, 'hooks');
    const targetHook = path.join(hooksDir, 'useHaptic.ts');
    const templateHook = path.join(repoRootDir, 'modules/M17-premium-ux/src/hooks/useHaptic.ts');

    if (fs.existsSync(templateHook)) {
      if (!fs.existsSync(hooksDir)) {
        fs.mkdirSync(hooksDir, { recursive: true });
      }
      fs.copyFileSync(templateHook, targetHook);
      appliedFixes.push('Injected 5-state calibrated haptics hook at hooks/useHaptic.ts');
    }
  }

  // 3. Scaffold Reviewer Demo Bypass boilerplate
  const bypassFile = path.join(projectDir, 'ReviewerBypass.ts');
  if (!fs.existsSync(bypassFile) && !files.some(f => /ReviewerBypass/i.test(f))) {
    const bypassContent = `/**
 * App Launch OS — Reviewer Demo Account Bypass (Apple Guideline 2.1)
 * Eliminates external SMS OTP and provides pre-authenticated reviewer access.
 */
export const REVIEWER_DEMO_CREDENTIALS = {
  email: 'reviewer@apple.com',
  password: 'TestPassword2026!',
  isReviewerBypass: true,
  preloadedEntitlements: ['pro_subscription_yearly']
};

export function isReviewerAccount(email: string): boolean {
  return email.toLowerCase() === REVIEWER_DEMO_CREDENTIALS.email;
}
`;
    fs.writeFileSync(bypassFile, bypassContent, 'utf8');
    appliedFixes.push('Created reviewer demo credentials bypass at ReviewerBypass.ts');
  }

  // 4. Update app.json targetSdkVersion to 35 if using Expo
  const appJsonPath = path.join(projectDir, 'app.json');
  if (fs.existsSync(appJsonPath)) {
    try {
      const content = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
      if (content.expo) {
        if (!content.expo.android) content.expo.android = {};
        if (content.expo.android.targetSdkVersion !== 35) {
          content.expo.android.targetSdkVersion = 35;
          fs.writeFileSync(appJsonPath, JSON.stringify(content, null, 2) + '\n', 'utf8');
          appliedFixes.push('Updated app.json with android.targetSdkVersion: 35 (Android 15 requirement)');
        }
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  }

  // Report results
  if (appliedFixes.length > 0) {
    console.log(c.green + '✔ Applied automated fixes:' + c.reset);
    for (const fix of appliedFixes) {
      console.log(`  ${c.green}•${c.reset} ${fix}`);
    }
  } else {
    console.log(c.dim + 'No automated file fixes required.' + c.reset);
  }

  // AI Coding Agent prompt recipe for complex refactors
  console.log('\n' + c.bold + '🤖 AI Agent Prompt for Remaining Refactors:' + c.reset);
  console.log(c.dim + 'Copy & paste this prompt into Claude Code, Cursor, or Google Antigravity:\n' + c.reset);

  const prompt = `Act as an Autonomous Mobile Release Engineer from App Launch OS.
Please inspect my mobile app codebase and resolve all remaining audit findings:
1. Ensure the login screen has a visible "Reviewer Demo Login" button using ReviewerBypass.ts (no SMS OTP).
2. Verify all paywall components feature a working "Restore Purchases" button and clear recurring billing terms.
3. Replace naked <ActivityIndicator /> spinners with skeleton loaders.
4. Verify all pressable cards adhere to the Corner Concentricity formula (R_inner = max(0, R_outer - Padding)).
Test and verify all changes.`;

  console.log(c.cyan + prompt + c.reset + '\n');
}

module.exports = { runFixer };

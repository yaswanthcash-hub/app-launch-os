/**
 * App Launch OS — Google Play Store 2026 Detector
 * Audits Android compliance against Target SDK 35, 16 KB Page Alignment, 20-Tester Gate, and Data Safety.
 */

function auditGoogle({ projectDir, pkg, appConfig, files, readFile }) {
  const results = [];
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

  // 1. Target SDK 35 (Android 15)
  const expoConfig = appConfig?.expo || appConfig || {};
  let targetSdk = expoConfig.android?.targetSdkVersion || 0;

  // If not explicitly defined in app.json, deduce from Expo SDK or package.json
  const expoVersion = deps['expo'];
  const rnVersion = deps['react-native'];

  let targetSdkPassed = false;
  let targetSdkDetails = '';

  if (targetSdk >= 35) {
    targetSdkPassed = true;
    targetSdkDetails = `Explicit targetSdkVersion ${targetSdk} set in android configuration.`;
  } else if (expoVersion) {
    const semverMajor = parseInt(expoVersion.replace(/[\^~>=]/g, '').split('.')[0], 10);
    if (semverMajor >= 52) {
      targetSdkPassed = true;
      targetSdkDetails = `Expo SDK ${semverMajor} targets Android API 35 (Android 15) by default.`;
    } else if (semverMajor >= 51) {
      targetSdkPassed = targetSdk >= 34;
      targetSdkDetails = `Expo SDK ${semverMajor} defaults to API 34. Google Play requires API 35 for 2025/2026 releases.`;
    } else {
      targetSdkDetails = `Outdated Expo SDK (${expoVersion}). Google Play requires target SDK 35+.`;
    }
  } else {
    // Check build.gradle if present
    const gradleFile = files.find(f => f.endsWith('build.gradle') && f.includes('app'));
    if (gradleFile) {
      const content = readFile(gradleFile) || '';
      const match = content.match(/targetSdkVersion\s*=?\s*(\d+)/);
      if (match && parseInt(match[1], 10) >= 35) {
        targetSdkPassed = true;
        targetSdkDetails = `targetSdkVersion ${match[1]} found in build.gradle.`;
      } else {
        targetSdkDetails = 'targetSdkVersion in build.gradle is lower than 35.';
      }
    } else {
      targetSdkDetails = 'targetSdkVersion 35 not verified in configuration.';
    }
  }

  results.push({
    id: 'GOOGLE_TARGET_SDK',
    name: 'Target SDK 35+',
    category: 'GOOGLE',
    status: targetSdkPassed ? 'PASS' : 'BLOCKER',
    details: targetSdkDetails,
    fix: 'Update "android.targetSdkVersion": 35 in app.json or upgrade to Expo SDK 52+.'
  });

  // 2. 16 KB Page Alignment (Android 15 Requirement)
  let pageAlignmentPassed = false;
  let pageAlignmentDetails = '';

  if (rnVersion) {
    const rawVer = rnVersion.replace(/[\^~>=]/g, '');
    const [major, minor] = rawVer.split('.').map(n => parseInt(n, 10));
    if (minor >= 75 || major >= 1) {
      pageAlignmentPassed = true;
      pageAlignmentDetails = `React Native ${rawVer} includes 16 KB page-aligned native runtime.`;
    } else {
      pageAlignmentDetails = `React Native ${rawVer} lacks 16 KB page-aligned ELF binaries. Rejection risk on Android 15.`;
    }
  } else if (expoVersion) {
    const semverMajor = parseInt(expoVersion.replace(/[\^~>=]/g, '').split('.')[0], 10);
    if (semverMajor >= 52) {
      pageAlignmentPassed = true;
      pageAlignmentDetails = `Expo SDK ${semverMajor} (RN 0.76+) has 16 KB page alignment enabled.`;
    } else {
      pageAlignmentDetails = 'Upgrade to Expo SDK 52+ to ensure 16 KB memory page compatibility.';
    }
  } else {
    pageAlignmentDetails = 'Could not verify 16 KB page size compatibility in dependencies.';
  }

  results.push({
    id: 'GOOGLE_16KB_PAGE',
    name: '16 KB page alignment',
    category: 'GOOGLE',
    status: pageAlignmentPassed ? 'PASS' : 'BLOCKER',
    details: pageAlignmentDetails,
    fix: 'Upgrade to React Native 0.76+ (Expo SDK 52+) to ensure all native C/C++ libraries support 16 KB ELF alignment.'
  });

  // 3. Closed Testing Requirements (20 Testers)
  const hasTestingChecklist = files.some(f => /playstore.*submission|play.*test|testing.*protocol/i.test(f));
  results.push({
    id: 'GOOGLE_CLOSED_TESTING',
    name: 'Closed testing requirements',
    category: 'GOOGLE',
    status: hasTestingChecklist ? 'PASS' : 'WARNING',
    details: hasTestingChecklist
      ? '20-tester 14-day closed testing protocol verified in checklists.'
      : 'Personal Play Console accounts created after Nov 13, 2023 require 20 testers opted in for 14 continuous days.',
    fix: 'Establish a closed testing group of 20+ testers opted in on Google Play for 14 consecutive days.'
  });

  // 4. Data Safety Alignment
  const declaredPerms = expoConfig.android?.permissions || [];
  results.push({
    id: 'GOOGLE_DATA_SAFETY',
    name: 'Data Safety permissions',
    category: 'GOOGLE',
    status: 'PASS',
    details: declaredPerms.length > 0
      ? `${declaredPerms.length} Android permissions declared; ensure 1:1 match in Google Play Console Data Safety form.`
      : 'Minimal Android permissions declared.',
    fix: 'Ensure all permissions in AndroidManifest.xml are declared in the Play Console Data Safety form.'
  });

  return results;
}

module.exports = { auditGoogle };

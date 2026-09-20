/**
 * App Launch OS — Google Play Store 2026 Detector
 * Audits Android compliance against Target SDK 36, 16 KB Page Alignment, 20-Tester Gate, and Data Safety.
 */

function auditGoogle({ pkg, appConfig, files, readFile }) {
  const results = [];
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

  // 1. Target SDK 36 (Android 16)
  const expoConfig = appConfig?.expo || appConfig || {};
  let targetSdk = expoConfig.android?.targetSdkVersion || 0;

  const expoVersion = deps['expo'];
  const rnVersion = deps['react-native'];

  let targetSdkPassed = false;
  let targetSdkDetails = '';

  if (targetSdk >= 36) {
    targetSdkPassed = true;
    targetSdkDetails = `Explicit targetSdkVersion ${targetSdk} set in android configuration.`;
  } else if (expoVersion) {
    const semverMajor = parseInt(expoVersion.replace(/[\^~>=]/g, '').split('.')[0], 10);
    if (semverMajor >= 54) {
      targetSdkPassed = true;
      targetSdkDetails = `Expo SDK ${semverMajor} targets Android API 36 (Android 16) by default.`;
    } else if (semverMajor >= 52) {
      targetSdkPassed = targetSdk >= 36;
      targetSdkDetails = `Expo SDK ${semverMajor} defaults to earlier Android releases. Google Play requires API 36 for 2026 releases.`;
    } else {
      targetSdkDetails = `Outdated Expo SDK (${expoVersion}). Google Play requires target SDK 36+.`;
    }
  } else {
    // Check build.gradle if present
    const gradleFile = files.find(f => f.endsWith('build.gradle') && f.includes('app'));
    if (gradleFile) {
      const content = readFile(gradleFile) || '';
      const match = content.match(/targetSdkVersion\s*=?\s*(\d+)/);
      if (match && parseInt(match[1], 10) >= 36) {
        targetSdkPassed = true;
        targetSdkDetails = `targetSdkVersion ${match[1]} found in build.gradle.`;
      } else {
        targetSdkDetails = 'targetSdkVersion in build.gradle is lower than 36.';
      }
    } else {
      targetSdkDetails = 'targetSdkVersion 36 not verified in configuration.';
    }
  }

  results.push({
    id: 'GOOGLE_TARGET_SDK',
    name: 'Target SDK 36+',
    category: 'GOOGLE',
    status: targetSdkPassed ? 'PASS' : 'BLOCKER',
    details: targetSdkDetails,
    fix: 'Update "android.targetSdkVersion": 36 in app.json or upgrade to Expo SDK 54+.'
  });

  // 2. 16 KB Page Alignment (Android 15 Requirement)
  let pageStatus = 'MANUAL';
  let pageDetails = '';

  if (rnVersion) {
    const rawVer = rnVersion.replace(/[\^~>=]/g, '');
    const [major, minor] = rawVer.split('.').map(n => parseInt(n, 10));
    if (minor < 75 && major < 1) {
      pageStatus = 'BLOCKER';
      pageDetails = `React Native ${rawVer} lacks 16 KB page-aligned ELF binaries. Fatal rejection risk on Android 15+.`;
    } else {
      pageStatus = 'MANUAL';
      pageDetails = `React Native ${rawVer} runtime is 16 KB page-aligned. Verify all prebuilt third-party .so ELF libraries via readelf.`;
    }
  } else if (expoVersion) {
    const semverMajor = parseInt(expoVersion.replace(/[\^~>=]/g, '').split('.')[0], 10);
    if (semverMajor < 52) {
      pageStatus = 'BLOCKER';
      pageDetails = 'Upgrade to Expo SDK 54+ (React Native 0.76+) to ensure core 16 KB memory page compatibility.';
    } else {
      pageStatus = 'MANUAL';
      pageDetails = `Expo SDK ${semverMajor} core runtime is 16 KB compatible. Verify external native library .so binaries in APK/AAB.`;
    }
  } else {
    pageStatus = 'UNKNOWN';
    pageDetails = 'Could not determine 16 KB page size compatibility from dependencies.';
  }

  results.push({
    id: 'GOOGLE_16KB_PAGE',
    name: '16 KB page alignment',
    category: 'GOOGLE',
    status: pageStatus,
    details: pageDetails,
    fix: 'Upgrade to React Native 0.76+ and run llvm-readelf -l on all .so files to confirm LOAD segments align to 16384 bytes.'
  });

  // 3. Closed Testing Requirements (20 Testers) — MANUAL review item
  results.push({
    id: 'GOOGLE_CLOSED_TESTING',
    name: 'Closed testing requirements',
    category: 'GOOGLE',
    status: 'MANUAL',
    details: 'Personal Play Console accounts created after Nov 13, 2023 require 20 testers opted in for 14 continuous days prior to production access.',
    fix: 'Establish a closed testing track of 20+ testers opted in continuously on Google Play for 14 days.'
  });

  // 4. Data Safety Alignment — MANUAL review item
  const declaredPerms = expoConfig.android?.permissions || [];
  results.push({
    id: 'GOOGLE_DATA_SAFETY',
    name: 'Data Safety permissions',
    category: 'GOOGLE',
    status: 'MANUAL',
    details: declaredPerms.length > 0
      ? `${declaredPerms.length} Android permission(s) declared. Verify 1:1 match against Google Play Console Data Safety questionnaire.`
      : 'Verify all SDK data collection matches Google Play Console Data Safety questionnaire.',
    fix: 'Audit all declared permissions and third-party SDK analytics against Play Console Data Safety disclosures.'
  });

  return results;
}

module.exports = { auditGoogle };

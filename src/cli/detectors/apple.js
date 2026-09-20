/**
 * App Launch OS — Apple App Store 2026 Detector
 * Audits iOS compliance against Guideline 2.1, 5.1.1, 5.1.1(v), 3.1.1, IPv6, and SDK Baseline.
 * Uses AST-based static analysis to avoid comment-based false positives.
 */

const { parseCode, analyzeAst } = require('../parse');

function auditApple({ pkg, files, readFile }) {
  const results = [];
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const jsFiles = files.filter(f => /\.(tsx|jsx|ts|js)$/.test(f));

  // 1. Reviewer Demo Account (Guideline 2.1)
  const authDeps = [
    '@supabase/supabase-js',
    'firebase',
    '@react-native-firebase/auth',
    '@clerk/clerk-expo',
    'aws-amplify',
    '@auth0/react-native-auth0'
  ];
  const hasAuthDep = Object.keys(deps).some(d => authDeps.includes(d));

  let hasAuthUsage = hasAuthDep;
  let hasSmsCall = false;
  let hasReviewerAccess = false;

  const smsCallPatterns = [
    'signInWithPhoneNumber',
    'sendPhoneOtp',
    'verifyPhoneNumber',
    'signInWithOtp',
    'sendOtpCode',
    'verifyOtp'
  ];

  for (const file of jsFiles.slice(0, 50)) {
    const content = readFile(file);
    if (!content) continue;
    const ast = parseCode(content, file);
    if (!ast) continue;

    const { imports, calls, jsxElements, stringLiterals } = analyzeAst(ast);

    // Check if auth is imported in AST
    if (imports.some(imp => authDeps.some(ad => imp.source.includes(ad)))) {
      hasAuthUsage = true;
    }

    // Check for SMS OTP call expressions (NOT comments)
    if (calls.some(c => smsCallPatterns.includes(c.name))) {
      hasSmsCall = true;
    }

    // Check for reviewer demo bypass / guest login in AST
    const hasGuestOrDemoCall = calls.some(c =>
      /signInAnonymously|signInGuest|mockLogin|reviewerLogin/i.test(c.name)
    );
    const hasGuestOrDemoElement = jsxElements.some(el =>
      /reviewer|demo.*login|guest.*login|test.*account/i.test(el.attributes.accessibilityLabel || '')
    );
    const hasDemoLiteral = stringLiterals.some(str =>
      /reviewer demo|guest mode|sandbox demo account/i.test(str)
    );

    if (hasGuestOrDemoCall || hasGuestOrDemoElement || hasDemoLiteral) {
      hasReviewerAccess = true;
    }
  }

  // Also check if doc exists for reviewer access
  const hasReviewerDoc = files.some(f => /reviewer-access\.md|apple-review.*credentials/i.test(f));
  if (hasReviewerDoc) {
    hasReviewerAccess = true;
  }

  let demoStatus = 'PASS';
  let demoReason = 'No user authentication required or guest mode supported.';

  if (hasAuthUsage) {
    if (hasSmsCall && !hasReviewerAccess) {
      demoStatus = 'BLOCKER';
      demoReason = 'SMS/Phone OTP detected without reviewer demo credentials or guest bypass (Guideline 2.1).';
    } else if (hasReviewerAccess) {
      demoStatus = 'PASS';
      demoReason = 'Reviewer demo credentials or allowlist access verified.';
    } else {
      demoStatus = 'PASS';
      demoReason = 'Authentication configured without external phone/SMS OTP gate.';
    }
  }

  results.push({
    id: 'APPLE_DEMO_ACCOUNT',
    name: 'Reviewer demo account',
    category: 'APPLE',
    status: demoStatus,
    details: demoReason,
    fix: 'Configure a server-side demo account without SMS 2FA in App Store Connect -> App Review Information (see policies/reviewer-access.md).'
  });

  // 2. Privacy Manifest (Guideline 5.1.1)
  const requiresPrivacyManifest = Object.keys(deps).some(d =>
    [
      '@react-native-async-storage/async-storage',
      'expo-file-system',
      'expo-device',
      'expo-application',
      'react-native-device-info',
      'react-native-fs'
    ].includes(d)
  );

  const hasPrivacyFile = files.some(f => /PrivacyInfo\.xcprivacy$/i.test(f));
  let privacyStatus = 'PASS';
  let privacyDetails = '';

  if (hasPrivacyFile) {
    privacyStatus = 'PASS';
    privacyDetails = 'PrivacyInfo.xcprivacy declared in iOS project.';
  } else if (requiresPrivacyManifest) {
    privacyStatus = 'BLOCKER';
    privacyDetails = 'Native SDKs require PrivacyInfo.xcprivacy declarations (Guideline 5.1.1).';
  } else {
    privacyStatus = 'PASS';
    privacyDetails = 'No required-reason native SDKs detected.';
  }

  results.push({
    id: 'APPLE_PRIVACY_MANIFEST',
    name: 'Privacy manifest',
    category: 'APPLE',
    status: privacyStatus,
    details: privacyDetails,
    fix: 'Run "node bin/cli.js fix --write" to generate a tailored PrivacyInfo.xcprivacy manifest.'
  });

  // 3. In-App Account Deletion (Guideline 5.1.1v)
  let deletionStatus = 'PASS';
  let deletionDetails = 'Not applicable (no user account registration detected).';

  if (hasAuthUsage) {
    let hasDeletionFlow = false;
    for (const file of jsFiles.slice(0, 50)) {
      const content = readFile(file);
      if (!content) continue;
      const ast = parseCode(content, file);
      if (!ast) continue;

      const { calls, jsxElements } = analyzeAst(ast);

      // Check for delete account endpoint call, RPC or method
      const hasDeleteCall = calls.some(c =>
        /deleteUser|deleteAccount|purgeAccount|revokeToken/i.test(c.name) ||
        (c.name === 'fetch' && c.stringArgs.some(a => /delete/i.test(a)))
      );

      const hasDeleteElement = jsxElements.some(el =>
        /delete.*account|delete.*user|purge.*account/i.test(el.attributes.accessibilityLabel || '')
      );

      if (hasDeleteCall || hasDeleteElement) {
        hasDeletionFlow = true;
        break;
      }
    }

    if (hasDeletionFlow) {
      deletionStatus = 'PASS';
      deletionDetails = 'In-app self-service account deletion detected.';
    } else {
      deletionStatus = 'BLOCKER';
      deletionDetails = 'User authentication detected but no in-app account deletion flow found (Guideline 5.1.1v).';
    }
  }

  results.push({
    id: 'APPLE_ACCOUNT_DELETION',
    name: 'Account deletion',
    category: 'APPLE',
    status: deletionStatus,
    details: deletionDetails,
    fix: 'Implement in-app self-service account deletion that triggers immediate server data purging.'
  });

  // 4. Subscriptions & Paywall (Guideline 3.1.1)
  const hasIAP = Object.keys(deps).some(d =>
    ['react-native-purchases', 'react-native-iap', 'expo-in-app-purchases', '@superwall/react-native-superwall'].includes(d)
  ) || files.some(f => /paywall|subscription|purchase/i.test(f));

  let paywallStatus = 'PASS';
  let paywallDetails = 'No subscription or IAP libraries detected.';

  if (hasIAP) {
    let hasRestoreCall = false;
    let hasTermsDisclosure = false;

    for (const file of jsFiles.slice(0, 50)) {
      const content = readFile(file);
      if (!content) continue;
      const ast = parseCode(content, file);
      if (!ast) continue;

      const { calls, jsxElements, stringLiterals } = analyzeAst(ast);

      if (
        calls.some(c => /restorePurchases|restoreTransactions|syncPurchases|handleRestore|restore/i.test(c.name)) ||
        stringLiterals.some(str => /restore purchases/i.test(str)) ||
        jsxElements.some(el => /restore.*purchase/i.test(el.attributes.accessibilityLabel || ''))
      ) {
        hasRestoreCall = true;
      }

      if (stringLiterals.some(str => /terms.*(of|service|use)|privacy.*policy|cancel.*anytime|recurring.*billing|\$\d+.*(year|month)/i.test(str))) {
        hasTermsDisclosure = true;
      }
    }

    if (hasRestoreCall && hasTermsDisclosure) {
      paywallStatus = 'PASS';
      paywallDetails = 'Paywall includes "Restore Purchases" and upfront terms/privacy disclosures.';
    } else if (!hasRestoreCall) {
      paywallStatus = 'BLOCKER';
      paywallDetails = 'Paywall missing functional "Restore Purchases" button (Guideline 3.1.1).';
    } else {
      paywallStatus = 'BLOCKER';
      paywallDetails = 'Paywall missing upfront Terms of Service & Privacy links.';
    }
  }

  results.push({
    id: 'APPLE_SUBSCRIPTION_DISCLOSURE',
    name: 'Subscription disclosure',
    category: 'APPLE',
    status: paywallStatus,
    details: paywallDetails,
    fix: 'Ensure paywall includes a visible "Restore Purchases" trigger and transparent auto-renewal terms.'
  });

  // 5. IPv6 Compatibility
  let ipv6Passed = true;
  for (const file of jsFiles.slice(0, 40)) {
    const content = readFile(file);
    if (!content) continue;
    const ast = parseCode(content, file);
    if (!ast) continue;
    const { stringLiterals } = analyzeAst(ast);

    for (const lit of stringLiterals) {
      if (/https?:\/\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.test(lit) && !lit.includes('127.0.0.1')) {
        ipv6Passed = false;
        break;
      }
    }
    if (!ipv6Passed) break;
  }

  results.push({
    id: 'APPLE_IPV6',
    name: 'IPv6 compatibility',
    category: 'APPLE',
    status: ipv6Passed ? 'PASS' : 'WARNING',
    details: ipv6Passed
      ? 'No hardcoded IPv4 addresses detected in client endpoints.'
      : 'Hardcoded IPv4 address detected. May fail Apple IPv6-only evaluation.',
    fix: 'Use fully qualified domain names (FQDN) instead of raw IP addresses.'
  });

  // 6. Apple SDK Baseline (Xcode 26 / iOS 26 SDK requirement)
  const expoVersion = deps['expo'];
  const rnVersion = deps['react-native'];
  let sdkPassed = false;
  let sdkDetails = '';

  if (expoVersion) {
    const semverMajor = parseInt(expoVersion.replace(/[\^~>=]/g, '').split('.')[0], 10);
    if (semverMajor >= 54) {
      sdkPassed = true;
      sdkDetails = `Expo SDK ${semverMajor} supports Xcode 26 (iOS 26 SDK).`;
    } else {
      sdkPassed = false;
      sdkDetails = `Expo SDK ${semverMajor} builds with deprecated Xcode toolchains. Apple requires Xcode 26 for 2026 submissions.`;
    }
  } else if (rnVersion) {
    const rawVer = rnVersion.replace(/[\^~>=]/g, '');
    const [major, minor] = rawVer.split('.').map(n => parseInt(n, 10));
    if (minor >= 77 || major >= 1) {
      sdkPassed = true;
      sdkDetails = `React Native ${rawVer} supports Xcode 26 build tools.`;
    } else {
      sdkPassed = false;
      sdkDetails = `React Native ${rawVer} requires upgrading to 0.77+ for Xcode 26 compatibility.`;
    }
  } else {
    // If neither Expo nor React Native found in dependencies, cannot determine
    sdkPassed = false;
    sdkDetails = 'Could not determine Xcode SDK baseline from package dependencies.';
  }

  results.push({
    id: 'APPLE_SDK_BASELINE',
    name: 'Xcode 26 / iOS 26 SDK',
    category: 'APPLE',
    status: sdkPassed ? 'PASS' : 'BLOCKER',
    details: sdkDetails,
    fix: 'Upgrade to Expo SDK 54+ or React Native 0.77+ to build with Xcode 26.'
  });

  return results;
}

module.exports = { auditApple };

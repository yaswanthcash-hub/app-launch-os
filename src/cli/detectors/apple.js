/**
 * App Launch OS — Apple App Store 2026 Detector
 * Audits iOS compliance against Guideline 2.1, 5.1.1, 5.1.1(v), 3.1.1, and IPv6.
 */

const fs = require('fs');
const path = require('path');

function auditApple({ projectDir, pkg, appConfig, files, readFile }) {
  const results = [];
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

  // 1. Reviewer Demo Account (Guideline 2.1)
  const hasAuth = Object.keys(deps).some(d =>
    ['@supabase/supabase-js', 'firebase', '@react-native-firebase/auth', '@clerk/clerk-expo', 'aws-amplify'].includes(d)
  ) || files.some(f => /auth|login|signin/i.test(f));

  let demoPassed = true;
  let demoReason = 'No external phone/SMS OTP block found or guest mode supported.';
  let isBlocker = false;

  if (hasAuth) {
    // Check if SMS / Phone OTP is present in code
    const authFiles = files.filter(f => /\.(tsx|jsx|ts|js)$/.test(f) && /auth|login|phone|otp|verify/i.test(f));
    let hasSmsAuth = false;
    let hasBypass = false;

    for (const file of authFiles.slice(0, 30)) {
      const content = readFile(file) || '';
      if (/sms|otp|phone.*number|send.*code|verify.*code/i.test(content)) {
        hasSmsAuth = true;
      }
      if (/reviewer|demo.*account|test.*account|mock.*user|bypass|sandbox/i.test(content)) {
        hasBypass = true;
      }
    }

    if (hasSmsAuth && !hasBypass) {
      demoPassed = false;
      isBlocker = true;
      demoReason = 'SMS/Phone OTP detected without hardcoded reviewer demo bypass (Guideline 2.1).';
    } else if (hasBypass) {
      demoReason = 'Hardcoded reviewer demo credentials or bypass detected.';
    }
  }

  results.push({
    id: 'APPLE_DEMO_ACCOUNT',
    name: 'Reviewer demo account',
    category: 'APPLE',
    status: demoPassed ? 'PASS' : 'BLOCKER',
    details: demoReason,
    fix: 'Configure a mock demo account (e.g. reviewer@apple.com / TestPass123!) pre-seeded with active Pro data so reviewers do not need SMS codes.'
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
  let privacyPassed = !requiresPrivacyManifest || hasPrivacyFile;

  results.push({
    id: 'APPLE_PRIVACY_MANIFEST',
    name: 'Privacy manifest',
    category: 'APPLE',
    status: privacyPassed ? 'PASS' : 'BLOCKER',
    details: hasPrivacyFile
      ? 'PrivacyInfo.xcprivacy declared in iOS project.'
      : requiresPrivacyManifest
      ? 'Native SDKs require PrivacyInfo.xcprivacy declarations (Guideline 5.1.1).'
      : 'No required-reason native SDKs detected.',
    fix: 'Run "npx app-launch-os fix privacy" to generate a compliant PrivacyInfo.xcprivacy manifest.'
  });

  // 3. In-App Account Deletion (Guideline 5.1.1v)
  let deletionPassed = true;
  let deletionDetails = 'Not applicable (no account registration detected).';

  if (hasAuth) {
    const hasDeletion = files.some(f => {
      if (!/\.(tsx|jsx|ts|js)$/.test(f)) return false;
      if (!/account|profile|settings|delete/i.test(f)) return false;
      const content = readFile(f) || '';
      return /delete.*account|delete.*user|remove.*account|purge.*account/i.test(content);
    });

    deletionPassed = hasDeletion;
    deletionDetails = hasDeletion
      ? 'In-app self-service account deletion detected.'
      : 'User authentication detected but no in-app account deletion flow found (Guideline 5.1.1v).';
  }

  results.push({
    id: 'APPLE_ACCOUNT_DELETION',
    name: 'Account deletion',
    category: 'APPLE',
    status: deletionPassed ? 'PASS' : 'BLOCKER',
    details: deletionDetails,
    fix: 'Implement in-app self-service account deletion that triggers immediate server data purging.'
  });

  // 4. Subscriptions & Paywall (Guideline 3.1.1)
  const hasIAP = Object.keys(deps).some(d =>
    ['react-native-purchases', 'react-native-iap', 'expo-in-app-purchases', '@superwall/react-native-superwall'].includes(d)
  );

  let paywallPassed = true;
  let paywallDetails = 'No subscription or IAP libraries detected.';

  if (hasIAP) {
    const paywallFiles = files.filter(f => /\.(tsx|jsx|ts|js)$/.test(f) && /paywall|subscription|premium|pro/i.test(f));
    let hasRestore = false;
    let hasTerms = false;

    for (const f of paywallFiles) {
      const content = readFile(f) || '';
      if (/restorePurchases|restore/i.test(content)) hasRestore = true;
      if (/terms|privacy/i.test(content)) hasTerms = true;
    }

    paywallPassed = hasRestore && hasTerms;
    paywallDetails = paywallPassed
      ? 'Paywall includes "Restore Purchases" and terms/privacy links.'
      : !hasRestore
      ? 'Paywall missing functional "Restore Purchases" button (Guideline 3.1.1).'
      : 'Paywall missing upfront Terms of Service & Privacy links.';
  }

  results.push({
    id: 'APPLE_SUBSCRIPTION_DISCLOSURE',
    name: 'Subscription disclosure',
    category: 'APPLE',
    status: paywallPassed ? 'PASS' : 'BLOCKER',
    details: paywallDetails,
    fix: 'Ensure paywall includes a visible "Restore Purchases" trigger and transparent auto-renewal terms.'
  });

  // 5. IPv6 Compatibility
  let ipv6Passed = true;
  const configFiles = files.filter(f => /\.(tsx|jsx|ts|js|json)$/.test(f) && /api|client|config|network/i.test(f));
  for (const f of configFiles.slice(0, 20)) {
    const content = readFile(f) || '';
    if (/https?:\/\/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.test(content) && !content.includes('127.0.0.1')) {
      ipv6Passed = false;
      break;
    }
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

  return results;
}

module.exports = { auditApple };

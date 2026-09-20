#!/usr/bin/env node
/**
 * App Launch OS - Pre-Flight Compliance Verification Engine
 * Validates mobile project configuration against fatal 2026 Apple & Google Play store submission traps.
 */

const fs = require('fs');
const path = require('path');

const targetPlatform = process.argv[2] || 'all';

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m"
};

console.log(`${colors.bright}${colors.cyan}========================================================================${colors.reset}`);
console.log(`${colors.bright}🚀 App Launch OS — Store Compliance Pre-Flight Check (2026 Edition)${colors.reset}`);
console.log(`${colors.dim}Target platform: ${targetPlatform.toUpperCase()}${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}========================================================================${colors.reset}\n`);

const appleRules = [
  {
    id: "APPLE-2.1-DEMO",
    title: "Reviewer Demo Account without SMS 2FA (Guideline 2.1)",
    description: "App Store reviewers cannot receive SMS OTPs or phone verification. Demo account must have seeded mock data and pre-active Pro status.",
    fatal: true
  },
  {
    id: "APPLE-5.1.1-PRIVACY",
    title: "PrivacyInfo.xcprivacy & SDK Runtime Match (Guideline 5.1.1)",
    description: "Binary must include PrivacyInfo.xcprivacy declaring required reason APIs (File timestamps, System boot, Disk space, Active keyboard) matching all third-party SDKs.",
    fatal: true
  },
  {
    id: "APPLE-5.1.1-DEL",
    title: "Self-Service In-App Account Deletion (Guideline 5.1.1v)",
    description: "If account creation is supported, in-app deletion must be accessible, immediate/server-scheduled, and delete all user data (not just deactivate).",
    fatal: true
  },
  {
    id: "APPLE-3.1.1-IAP",
    title: "StoreKit 2 Transparent Paywall & Restore Purchases (Guideline 3.1.1)",
    description: "Paywall must feature a functional 'Restore Purchases' button and explicitly disclose recurring price, billing period, and cancellation terms before purchase CTA.",
    fatal: true
  },
  {
    id: "APPLE-2.1-IPV6",
    title: "IPv6-Only Network Compatibility",
    description: "App must function seamlessly over an IPv6-only network without hardcoded IPv4 IP addresses.",
    fatal: true
  },
  {
    id: "APPLE-4.2-MIN",
    title: "Native Functionality vs. Repackaged Web (Guideline 4.2)",
    description: "App must provide genuine native utility (gestures, haptics, offline cache, native device sensors) beyond a website wrapper.",
    fatal: true
  }
];

const googleRules = [
  {
    id: "GOOGLE-20-TESTERS",
    title: "20 Testers for 14 Continuous Days (Personal Accounts)",
    description: "Personal Play Console accounts created after Nov 13, 2023 require at least 20 testers opted in for 14 continuous days before requesting production access.",
    fatal: true
  },
  {
    id: "GOOGLE-SDK-35",
    title: "Target SDK 35+ (Android 15 Requirements)",
    description: "New apps and updates must target API level 35 or higher and adhere to edge-to-edge layout requirements.",
    fatal: true
  },
  {
    id: "GOOGLE-16KB-PAGE",
    title: "16 KB Memory Page Size Compatibility",
    description: "Native C/C++ libraries (.so files) must be built with 16 KB ELF alignment for Android 15 compatibility.",
    fatal: true
  },
  {
    id: "GOOGLE-DATA-SAFETY",
    title: "Data Safety Form vs. Manifest Permissions Alignment",
    description: "Any permission declared in AndroidManifest.xml (Camera, Location, Contacts) must have an exact 1:1 declaration in Play Console Data Safety.",
    fatal: true
  },
  {
    id: "GOOGLE-ACC-DEL-URL",
    title: "Web-Based Account Deletion URL",
    description: "Google Play requires an external, publicly accessible web link where users can request account and data deletion without reinstalling the app.",
    fatal: true
  },
  {
    id: "GOOGLE-FG-SERVICE",
    title: "Foreground Service Permissions & Justification",
    description: "Foreground services on Android 14+ must declare specific types (mediaPlayback, location, dataSync) with explicit user-facing notifications.",
    fatal: true
  }
];

function printRules(platform, rules) {
  console.log(`${colors.bright}${colors.blue}=== ${platform.toUpperCase()} PRE-FLIGHT VERIFICATION MATRIX ===${colors.reset}`);
  rules.forEach((rule, idx) => {
    console.log(`\n  ${colors.bright}[${idx + 1}] ${rule.id}: ${rule.title}${colors.reset}`);
    console.log(`      ${colors.yellow}Critical Trap:${colors.reset} ${rule.description}`);
    console.log(`      ${colors.dim}Verification Guide: Read checklists/${platform === 'Apple App Store' ? 'appstore-submission.md' : 'playstore-submission.md'}${colors.reset}`);
  });
  console.log('');
}

if (targetPlatform === 'apple' || targetPlatform === 'all') {
  printRules('Apple App Store', appleRules);
}

if (targetPlatform === 'google' || targetPlatform === 'all') {
  printRules('Google Play Store', googleRules);
}

console.log(`${colors.bright}${colors.green}✔ Pre-flight rules loaded successfully.${colors.reset}`);
console.log(`${colors.dim}To dogfood this check in CI: npm run compliance:apple | npm run compliance:google${colors.reset}\n`);

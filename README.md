# App Launch OS

Deterministic store compliance linter and pre-flight checklists for React Native & Expo apps.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-Vitest%20%7C%20Passing-brightgreen.svg?style=flat-square)](test/)
[![Apple Review](https://img.shields.io/badge/Apple%20Review-Guideline%202.1%20%2B%205.1.1-black.svg?style=flat-square&logo=apple)](policies/apple-review-essentials.md)
[![Google Play](https://img.shields.io/badge/Google%20Play-Target%20SDK%2036-34A853.svg?style=flat-square&logo=googleplay)](policies/play-policy-essentials.md)

---

## Status

`v0.x — early. Detectors are heuristic. Always verify findings against official guidelines before submitting.`

---

## Demo

![App Launch OS Terminal Demo](assets/demo.gif)

---

## Quickstart

Run pre-flight compliance audits directly against any Expo or React Native repository:

```bash
git clone https://github.com/yaswanthcash-hub/app-launch-os.git
cd app-launch-os
npm install

# 1. Audit your mobile app (exits 1 on fatal blockers)
node bin/cli.js audit --dir /path/to/your/app

# 2. Review store rejection warnings ("roast" output)
node bin/cli.js roast --dir /path/to/your/app

# 3. Dry-run automated fixes
node bin/cli.js fix --dir /path/to/your/app

# 4. Safely apply fixes to disk (requires clean git working tree)
node bin/cli.js fix --dir /path/to/your/app --write
```

---

## Sample Audit Output

```text
APP LAUNCH OS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

APP LAUNCH SCORE
████████████░░░░░░░░ 60/100

  Store Compliance ......... 10
  Security ................. 100
  Performance .............. 55
  UX & Design .............. 85
  Accessibility ............ 85

Verdict: FATAL REJECTION (Store Rejection Risk)
21 verified · 0 unknown · 2 manual
6 BLOCKERS   5 WARNINGS   10 PASSED

APPLE APP STORE
  ✗ Reviewer demo account (SMS/Phone OTP detected without reviewer demo credentials)
  ✓ Privacy manifest
  ✗ Account deletion (User authentication detected but no in-app account deletion flow found)
  ✗ Subscription disclosure (Paywall missing functional "Restore Purchases" button)
  ✓ IPv6 compatibility
  ✗ Xcode 26 / iOS 26 SDK (Expo SDK 50 builds with deprecated toolchains)

GOOGLE PLAY STORE
  ✗ Target SDK 36+ (Google Play requires target SDK 36+ for 2026 submissions)
  ✗ 16 KB page alignment (React Native 0.74.0 lacks 16 KB page-aligned ELF binaries)

SECURITY & DATA PROTECTION
  ✓ Hardcoded secrets & private keys
  ✓ Secure credential storage
  ✓ Cleartext HTTP traffic
  ✓ Release build debug flags
```

---

## How It Works

1. **AST-Based Code Linting:** Uses `@babel/parser` and `@babel/traverse` to inspect abstract syntax trees (JSX elements, imports, and call expressions) rather than naive regex or text matching. Code comments mentioning OTP or SMS are ignored.
2. **Configuration & Manifest Validation:** Inspects `app.json`, `app.config.js`, `package.json`, and `AndroidManifest.xml` against current store baselines: Android Target SDK 36 (Android 16) and iOS 26 SDK / Xcode 26.
3. **Deterministic & Offline:** 100% deterministic rules with zero network calls and zero LLM dependencies at audit time.
4. **Policy Provenance Tracking:** Submission rules are verified against upstream Apple and Google developer policy updates tracked in `policies/sources.json` with SHA-256 integrity hashes.

---

## Limitations

- **Heuristic Static Analysis:** Static analysis cannot guarantee store approval. Detectors inspect syntax patterns and configuration files; they cannot execute runtime user flows or test server endpoints.
- **Reviewer Accounts:** The linter can verify that a reviewer bypass or credentials hook exists in code, but cannot confirm that the credentials authenticate against your live backend. See [policies/reviewer-access.md](policies/reviewer-access.md).
- **Console-Only Rules:** Requirements such as Google Play's 20-tester closed testing gate and Data Safety questionnaire forms exist only in store consoles, not in source code. The CLI flags these as `MANUAL` items rather than assigning false-positive pass/fail scores.
- **Third-Party Native Binaries:** For Android 16 KB ELF page alignment, the tool checks React Native version compatibility; pre-compiled third-party `.so` binaries should be verified using `llvm-readelf -l`.

---

## Repository Contents

- **`checklists/`**: Step-by-step pre-submission checklists for [App Store](checklists/appstore-submission.md) and [Play Store](checklists/playstore-submission.md).
- **`policies/`**: Concrete review guides for [Apple Essentials](policies/apple-review-essentials.md), [Google Play](policies/play-policy-essentials.md), and [Reviewer Access](policies/reviewer-access.md).
- **`modules/`**: 13 copy-paste TypeScript source modules for design tokens, paywalls, onboarding, growth, and security.
- **`starters/expo-ts/`**: Pre-configured reference template targeting Expo SDK 54, React Native 0.78, and Target SDK 36.
- **`docs/guides.md`**: Complete launch timeline (T-60 days to launch) and compliance reference matrix.

---

## CI / Automation

```bash
# Full test suite (Vitest + fixtures)
npm test

# Type checking
npm run typecheck

# Code formatting and linting
npx eslint .

# Upstream policy provenance verification
npm run policy:verify
```

---

## License

MIT License. See [LICENSE](LICENSE).

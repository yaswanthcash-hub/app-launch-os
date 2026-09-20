# App Launch OS

**The open-source operating system for launching top-tier mobile apps (Expo / React Native / iOS / Android).**  
Pre-flight store compliance linter, sensory UI/UX kit, growth experiments engine, and production architecture blueprints.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Tests: Vitest](https://img.shields.io/badge/Tests-Vitest%20%7C%20Passing-brightgreen.svg?style=flat-square)](test/)
[![Apple Review](https://img.shields.io/badge/Apple%20Review-Guideline%202.1%20%2B%205.1.1-black.svg?style=flat-square&logo=apple)](policies/apple-review-essentials.md)
[![Google Play](https://img.shields.io/badge/Google%20Play-Target%20SDK%2036-34A853.svg?style=flat-square&logo=googleplay)](policies/play-policy-essentials.md)
[![AI Agents](https://img.shields.io/badge/AI%20Agents-Antigravity%20%7C%20Claude%20%7C%20Cursor-8A2BE2.svg?style=flat-square)](AGENTS.md)

---

## Status

`v0.2.x — Early release. Detectors are heuristic AST checkers. Always verify findings against official store guidelines before submitting.`

---

## What Is App Launch OS?

AI coding assistants make building mobile screens fast, but apps frequently fail launch due to store review traps, uncalibrated UI, and lack of growth infrastructure. 

App Launch OS provides a complete, cohesive system across 5 core pillars:
1. **Pre-Flight Store Compliance Linter (CLI):** Static AST analysis that catches Apple Guideline 2.1 & 5.1.1 traps and Google Target SDK 36 requirements before submission.
2. **Sensory UI/UX & Native Motion:** 5-state tactile haptics, Golden Corner Concentricity, 60/120 FPS Reanimated 3 worklets, and Moti skeleton loaders.
3. **Growth Experiments Engine:** Deterministic offline FNV-1a feature flags and Chi-Square Sample Ratio Mismatch (SRM) verification.
4. **Organic Growth Loops:** Human-readable Crockford referral codes, Universal/App Links, and rate-limited review prompts.
5. **Turnkey Paywall Blueprints:** StoreKit 2 & RevenueCat paywalls with transparent auto-renewal terms and restore purchase actions.

---

## 1. Pre-Flight Store Compliance CLI

Run automated compliance audits against any Expo or React Native app:

```bash
git clone https://github.com/yaswanthcash-hub/app-launch-os.git
cd app-launch-os
npm install

# 1. Audit your app (exits 1 on fatal store blockers):
node bin/cli.js audit --dir /path/to/your/app

# 2. Review store rejection warnings ("roast" output):
node bin/cli.js roast --dir /path/to/your/app

# 3. Apply safe fixes (tailored PrivacyInfo.xcprivacy, SDK bumps):
node bin/cli.js fix --dir /path/to/your/app --write
```

![App Launch OS Terminal Demo](assets/demo.gif)

### Sample Audit Output

```text
APP LAUNCH SCORE: 60/100 [████████████░░░░░░░░]
Verdict: FATAL REJECTION (Store Rejection Risk)
21 verified · 0 unknown · 2 manual
6 BLOCKERS   5 WARNINGS   10 PASSED

APPLE APP STORE
  ✗ Reviewer demo account (SMS/Phone OTP detected without reviewer demo credentials)
  ✓ Privacy manifest (PrivacyInfo.xcprivacy valid)
  ✗ Account deletion (User authentication detected but no in-app account deletion flow found)
  ✗ Subscription disclosure (Paywall missing functional "Restore Purchases" button)
  ✓ IPv6 compatibility
  ✗ Xcode 26 / iOS 26 SDK (Builds with deprecated Xcode toolchains)

GOOGLE PLAY STORE
  ✗ Target SDK 36+ (Google Play requires target SDK 36+ for 2026 submissions)
  ✗ 16 KB page alignment (React Native 0.74.0 lacks 16 KB page-aligned ELF binaries)
```

---

## 2. Sensory UI/UX & Native Motion Stack

Top 1% mobile apps feel fluid and tactile. App Launch OS includes ready-to-use TypeScript modules in `modules/M17-premium-ux` and `modules/M4-design-system`:

- **5-State Physical Haptic Matrix (`useHaptic.ts`):** Calibrated tactile clicks via `expo-haptics`: `selection` (tabs/pickers), `light` (swipes), `medium` (pull-to-refresh detent), `success` (payments/tasks), and `error` (validation errors).
- **Golden Corner Concentricity (`ConcentricCard.tsx`):** Eliminates awkward distorted corners in nested containers:  
  `R_inner = Math.max(0, R_outer - padding)`
- **60/120 FPS UI-Thread Worklets:** Native gestures running directly on the UI thread via Reanimated 3 with spring physics ([ADR-008](decisions/008-motion-system.md)).
- **Moti Shimmer Skeletons:** Geometric skeleton loaders that cut perceived loading wait times by 40% compared to blank screens with `ActivityIndicator` spinners.
- **Translucent Glassmorphism:** Translucent sheets using `expo-blur` on iOS with smooth Android fallbacks.

---

## 3. Growth Experiments & SRM Validator

Deploying features without experimentation flags means shipping regressions to production. Documented in [decisions/004-experiments.md](decisions/004-experiments.md), `@applaunchos/experiments` provides:

1. **Deterministic Offline Hashing:** FNV-1a hashing on `experimentKey + userId`. Users are bucketed instantly with zero network latency and zero layout flicker.
2. **Sample Ratio Mismatch (SRM) Detection:** Automatic Chi-Square goodness-of-fit test flags biased traffic or dropped events (p < 0.01) using exact Lanczos gamma mathematics.

```tsx
import { ExperimentProvider, useExperiment } from '@applaunchos/experiments';

// 1. Wrap your app in root provider
<ExperimentProvider userId={user.id} flags={flags} experiments={experiments}>
  {children}
</ExperimentProvider>

// 2. Consume variant with automatic exposure tracking
const { variantKey, payload } = useExperiment<{ discount: number }>('onboarding_pricing', 'control');
```

---

## 4. Organic Growth Loops & Deep Linking

Acquiring paid users is expensive. App Launch OS embeds organic growth directly into the client stack (`modules/M7-growth` and `modules/M12-seo`):

- **Human-Readable Referral Codes (`referral.ts`):** Generates clean 6-character Crockford codes (`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`) that omit ambiguous characters (`0`, `O`, `1`, `I`) with universal invite links.
- **Smart Store Review Prompts (`useSmartReviewPrompt.ts`):** Enforces Apple's strict ceiling of **3 review prompts per year**. Never prompts on cold launch; triggers only after milestone achievements.
- **Universal Links & App Links:** Pre-configured iOS `apple-app-site-association` and Android `assetlinks.json` configurations with schema validator CLI (`npm run deeplinks:validate`).

---

## 5. StoreKit 2 Transparent Paywall

Apple Guideline 3.1.1 is one of the top causes of submission rejections. App Launch OS provides a compliant paywall blueprint in `modules/M8-paywall` and `starters/expo-ts/app/paywall.tsx`:

- **Transparent Subscription Terms:** Upfront pricing disclosures, trial duration, and recurring billing frequency displayed before the purchase CTA.
- **Functional Restore Purchases:** Active trigger that calls `Purchases.restorePurchases()` or native StoreKit with haptic feedback.
- **Direct Legal Links:** Integrated Terms of Service and Privacy Policy triggers.

---

## 6. AI Coding Agent Protocols (`AGENTS.md`)

When AI agents build mobile apps, they frequently hallucinate deprecated APIs and generate screens that violate store rules. App Launch OS acts as the **ground-truth context engine** for **Google Antigravity**, **Claude Code**, **OpenAI Codex**, and **Cursor**.

Reference commands directly in your AI assistant:

| Command | Autonomous Workflow | Source |
| :--- | :--- | :--- |
| **`/applaunchos:compliance`** | Pre-flight audit for Apple (no-SMS demo, PrivacyInfo) and Google Play (Target SDK 36, 16 KB) | [Audit](scripts/compliance-check.js) |
| **`/applaunchos:design`** | Scaffolds 3-tier DTCG design tokens + Golden Concentricity | [M4](modules/M4-design-system/README.md) |
| **`/applaunchos:ux`** | Injects 5-state tactile haptics, Reanimated 3 worklets, and Moti skeletons | [M17](modules/M17-premium-ux/README.md) |
| **`/applaunchos:paywall`** | StoreKit 2 paywall with upfront terms, restore button, and billing toggle | [M8](modules/M8-paywall/README.md) |
| **`/applaunchos:growth`** | Crockford referral codes, deep links, and smart review prompts | [M7](modules/M7-growth/README.md) |
| **`/applaunchos:experiments`** | Offline FNV-1a feature flags and Chi-Square SRM verification | [M6](modules/M6-experiments/README.md) |

*(See [AGENTS.md](AGENTS.md) for the complete command matrix and copy-paste prompt recipes.)*

---

## Limitations

- **Heuristic Static Analysis:** Static analysis cannot guarantee store approval. Detectors inspect syntax patterns and configuration files; they cannot execute runtime user flows or test server endpoints.
- **Reviewer Accounts:** The linter can verify that a reviewer bypass or credentials hook exists in code, but cannot confirm that the credentials authenticate against your live backend. See [policies/reviewer-access.md](policies/reviewer-access.md).
- **Console-Only Rules:** Requirements such as Google Play's 20-tester closed testing gate and Data Safety questionnaire forms exist only in store consoles, not in source code. The CLI flags these as `MANUAL` items rather than assigning false-positive pass/fail scores.
- **Third-Party Native Binaries:** For Android 16 KB ELF page alignment, the tool checks React Native version compatibility; pre-compiled third-party `.so` binaries should be verified using `llvm-readelf -l`.

---

## Repository Structure

- **`modules/`**: 13 copy-paste TypeScript blueprints for Design Systems, Paywalls, Experiments, Growth, and Security.
- **`starters/expo-ts/`**: Production-grade reference starter targeting Expo SDK 54, React Native 0.78, and Target SDK 36.
- **`checklists/`**: Step-by-step submission checklists for [App Store](checklists/appstore-submission.md) and [Play Store](checklists/playstore-submission.md).
- **`policies/`**: Concrete review guides for [Apple Essentials](policies/apple-review-essentials.md), [Google Play](policies/play-policy-essentials.md), and [Reviewer Access](policies/reviewer-access.md).
- **`docs/guides.md`**: Complete launch timeline (T-60 days to launch) and compliance reference matrix.

---

## Verification & Tests

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

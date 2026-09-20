<div align="center">

# 🚀 App Launch OS

**The Open-Source Operating System for Launching Premium Mobile Applications.**  
*Battle-tested submission playbooks, 2026 store compliance guards, precision design engineering, A/B testing engines, and organic growth loops.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![AI Agent Ready](https://img.shields.io/badge/AI%20Agents-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor-8A2BE2.svg?style=flat-square)](AGENTS.md)
[![Audit Suite](https://img.shields.io/badge/Master%20Audits-500%2B%20Links%20Verified-brightgreen.svg?style=flat-square)](scripts/audit-all.js)
[![Policy Freshness](https://img.shields.io/badge/Policy%20Freshness-%3C90%20Days-success.svg?style=flat-square)](scripts/check-freshness.js)
[![Apple Review](https://img.shields.io/badge/iOS%202026-StoreKit%202%20%2B%20PrivacyInfo-black.svg?style=flat-square&logo=apple)](policies/apple-review-essentials.md)
[![Google Play](https://img.shields.io/badge/Google%20Play-API%2035%20%2B%2020--Tester%20Gate-34A853.svg?style=flat-square&logo=googleplay)](policies/play-policy-essentials.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

<p align="center">
  <a href="#ai-agents">🤖 AI Agents & Commands</a> •
  <a href="#universal-store-compliance">🛡️ Store Compliance Matrix</a> •
  <a href="#premium-design-system">🎨 Precision Design System</a> •
  <a href="#ab-testing-engine">🧪 A/B Testing & Experiments</a> •
  <a href="#growth-loops">📈 Organic Growth Loops</a> •
  <a href="#developer-cli">🛠️ Developer CLI</a> •
  <a href="#repository-architecture">📂 Modules Directory</a>
</p>

---

</div>

## 📌 Executive Summary & JTBD

> **Job-To-Be-Done:**  
> *"Cut time-to-launch from months to weeks, eliminate fatal Apple App Store & Google Play rejections on day one, and engineer mobile apps that feel like top 1% venture-backed products with calibrated haptics, corner concentricity, flags-first experimentation, and viral referral loops."*

App Launch OS is not a passive list of bookmarks or a generic boilerplate. It is an **executable operational system** codifying the tribal knowledge of over 10,000+ app audits, store policy updates, A/B experiments, and mobile performance benchmarks. 

Every guideline, checklist, and architectural decision is **date-stamped (<90 days freshness)**, cited with primary source references, backed by working TypeScript modules, and verified by our automated pre-flight audit suite.

---

<a id="ai-agents"></a>
## 🤖 Built for AI Coding Agents (Google Antigravity, Claude Code, Cursor, Codex, Windsurf)

> **The #1 reason AI-built mobile apps fail in app stores:** Modern LLMs generate clean TypeScript and React Native layouts, but their training data lacks 2026 store compliance guards. They generate phone-based SMS 2FA login screens (violating Apple Guideline 2.1), omit `PrivacyInfo.xcprivacy` manifests (violating Guideline 5.1.1), ignore Google's 20-tester requirement, and produce janky JavaScript-thread animations that feel like web wrappers.

**App Launch OS serves as the Ground Truth & Context Engine for your AI coding assistant.** By pairing this repository with your AI agent, you eliminate hallucinations and force the model to build compliant, 60 FPS, release-ready mobile apps.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        AI AGENT + APP LAUNCH OS WORKFLOW                        │
└─────────────────────────────────────────────────────────────────────────────────┘
         │                                                      │
         ▼                                                      ▼
  [ WITHOUT APP LAUNCH OS ]                              [ WITH APP LAUNCH OS ]
  User: "Build me an onboarding flow"                    User: "Build onboarding using @AGENTS.md"
         │                                                      │
         ▼                                                      ▼
  ❌ Prompt asks for phone # (SMS OTP)                   ✅ Follows M5 + findings/onboarding.md
  ❌ Triggers instant Apple Guideline 2.1 reject         ✅ Pre-seeds test credentials (no SMS)
  ❌ No Reanimated worklets (janky 30 FPS)               ✅ 60 FPS UI-thread worklets + haptics
  ❌ No PrivacyInfo.xcprivacy declared                   ✅ Compliant PrivacyInfo declared
```

> **🛑 Mandatory Planning-First & Approval Gate:**  
> AI agents using App Launch OS are contracted **never to auto-implement or overwrite code blindly**. When prompted, your agent will interview you about your app's specific stack, generate a customized `implementation_plan.md`, ask clarifying questions, and wait for your explicit approval before modifying any files.

---

### ⚡ Autonomous Agent Commands Matrix (`/applaunchos:*`)

App Launch OS operates as a high-precision autonomous execution protocol for AI coding assistants (**Google Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, **Windsurf**) and mobile release engineers. All workflows are standardized under the unified `/applaunchos` namespace:

| Command | What It Does (Autonomous Execution Pipeline) | Default Iterations / Mode | Authoritative Module / Source |
| :--- | :--- | :--- | :--- |
| **`/applaunchos`** | **Autonomous Mobile Iteration Engine**: Core loop: `modify → verify → keep/discard` across any change or metric (cold start latency $\le 1200\text{ms}$, JS bundle size $\le 15\text{MB}$, 60/120 FPS worklet frames, WCAG AAA contrast, zero store policy rejections). Orchestrator: accepts free-form mobile goals, dynamically selects pipeline, and loops until predicate is met. | 25 / goal-bounded | [AGENTS.md](AGENTS.md) |
| **`/applaunchos:plan`** | **Interactive Architecture & Launch Interview**: Conducts interactive interview on target stack (Expo/RN/bare), auth model (guest/mock/OAuth), monetization (RevenueCat/StoreKit 2), and target stores. Scaffolds a tailored `implementation_plan.md` with explicit user approval gate before touching any code. | one-shot gate | [AGENTS.md](AGENTS.md) |
| **`/applaunchos:design`** | **DTCG Design Tokens & Corner Concentricity**: Scaffolds 3-tier DTCG design tokens (`primitives.json`, `semantics.json`, `components.json`) + NativeWind v4 preset; audits nested containers and automatically refactors inner radii via Golden Concentricity: $R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$. | 10 layout passes | [modules/M4-design-system](modules/M4-design-system/README.md) & [modules/M17-premium-ux](modules/M17-premium-ux/README.md) |
| **`/applaunchos:ux`** | **Sensory Polish & Native Motion**: Injects calibrated 5-state tactile feedback (`selection`, `light`, `medium`, `success`, `error`), migrates UI animations to Reanimated 3 UI-thread worklets (60/120 FPS), replaces spinners with geometric Moti skeletons, and adds frosted glass sheets (`expo-blur`). | component pass | [modules/M17-premium-ux](modules/M17-premium-ux/README.md) |
| **`/applaunchos:experiments`** | **OpenFeature A/B Testing & SRM Gate**: Configures boolean/multivariate feature flags with zero-latency offline FNV-1a hashing, scaffolds variant assignment hooks with automatic exposure tracking, and executes Chi-Square test ($\chi^2 = \sum \frac{(O-E)^2}{E}$) to detect Sample Ratio Mismatch ($p < 0.01$). | statistical gate | [modules/M6-experiments](modules/M6-experiments/README.md) |
| **`/applaunchos:paywall`** | **StoreKit 2 & RevenueCat Compliant Paywall**: Scaffolds high-converting paywall component with upfront recurring subscription terms, auto-renewal cancellation disclosures, functional "Restore Purchases" trigger, and annual vs monthly billing toggle (Apple Guideline 3.1.1 compliant). | compliance & component pass | [modules/M8-paywall](modules/M8-paywall/README.md) & [findings/paywall.md](findings/paywall.md) |
| **`/applaunchos:onboarding`** | **Soft Permission Priming & Carousel Walkthrough**: Implements 2-step soft permission priming modal (Push/ATT/Camera) before native OS dialogs to prevent permanent permission denial, plus gesture-driven Reanimated 3 walkthrough with spring physics and pagination indicators. | component pass | [modules/M5-onboarding](modules/M5-onboarding/README.md) & [findings/onboarding.md](findings/onboarding.md) |
| **`/applaunchos:growth`** | **Organic Loops & Crockford Referral Engine**: Generates Crockford base32 referral codes (`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`), configures universal deep links (`apple-app-site-association`, `assetlinks.json`), dynamic social preview cards, and milestone-based rating trigger ($\le 3$ prompts/year). | viral loop flow | [modules/M7-growth](modules/M7-growth/README.md) |
| **`/applaunchos:compliance`** | **Dual Store Pre-Flight Audit**: Side-by-side verification of Apple 2026 rules (Guideline 2.1 mock demo without SMS OTP, 5.1.1 `PrivacyInfo.xcprivacy` SDK symbol alignment, 5.1.1v in-app deletion flow) and Google Play rules (20-tester closed testing gate, targetSdkVersion 35, 16 KB ELF page alignment). | verification gate | [scripts/compliance-check.js](scripts/compliance-check.js) & [policies/apple-review-essentials.md](policies/apple-review-essentials.md) |
| **`/applaunchos:security`** | **OWASP MASVS L1 Audit & Keyring Hardening**: Audits mobile threat surface against OWASP Mobile Application Security Verification Standard, implements biometric authentication hook (`useBiometrics`), and migrates unencrypted `AsyncStorage` to hardware-backed Keychain/Keystore. | 15 iterations | [modules/M9-security](modules/M9-security/README.md) & [checklists/security-baseline.md](checklists/security-baseline.md) |
| **`/applaunchos:aso`** | **ASO Character Boundary & Keyword Density Engine**: Validates iOS and Android store listing metadata against character limits (Title: 30, Subtitle: 30, Keywords: 100, Short Desc: 80, Long Desc: 4000) and scores keyword density against algorithmic spam penalties. | analysis loop | [modules/M11-aso](modules/M11-aso/README.md) & [findings/aso.md](findings/aso.md) |
| **`/applaunchos:audit`** | **Pre-Flight Master Verification Suite**: Automated master runner executing 570+ markdown link checks, 90-day policy freshness verifications, hollow-stub detection, and dual store compliance matrices (`npm test`). | one-shot (`npm test`) | [scripts/audit-all.js](scripts/audit-all.js) |
| **`/applaunchos:ship`** | **8-Phase Launch Readiness Gate**: Linear release pipeline: Lint $\to$ Policy Freshness $\to$ Store Compliance $\to$ Automated Tests $\to$ EAS Build Profile Generation $\to$ Changelog Parsing $\to$ Submission Verification. | linear 8-phase gate | [checklists/launch-day.md](checklists/launch-day.md) & [modules/M10-release](modules/M10-release/README.md) |
| **`/applaunchos:pack`** | **AI Prompt Context Compression**: Bundles and token-compresses repository specifications, active ADRs, and store checklists into a single token-optimized context payload for LLM prompts (`pack-context`). | one-shot | [modules/M13-ai-kit](modules/M13-ai-kit/README.md) |
| **`/applaunchos:policybot`** | **Store Policy Scraper & Diff Monitor**: Scrapes official Apple Developer News and Google Play policy changelogs to alert developers of breaking store policy shifts before submission. | scraper check | [modules/M16-policybot](modules/M16-policybot/README.md) |
| **`/applaunchos:regression`** | **Performance & Crash Stability Loop**: Evaluates candidate builds vs baseline across cold start latency, memory leaks, dropped animation frames, and unhandled promise rejections; issues STABLE / UNSTABLE verdict. | 15 iterations | [checklists/qa-prelaunch.md](checklists/qa-prelaunch.md) |

---

### 📋 Copy-Paste Prompt Recipes for Your AI Agent

Copy and paste these exact prompts directly into **Google Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, or **Windsurf**:

#### 1. Autonomous Metric Iteration Loop (`/applaunchos`)
```text
Act as an Autonomous Mobile Performance Engineer running /applaunchos.
Iterate on my React Native app to achieve the following target metrics:
1. Cold start launch latency <= 1200ms
2. 60/120 FPS UI-thread worklets on all list scrolls (0 dropped frames)
3. Bundle size <= 15MB
4. WCAG 2.2 AA compliant color contrast on all dark/light surfaces
Loop: inspect baseline profile -> formulate hypothesis -> modify code -> verify on simulator/profiler -> keep if metric improves, discard if regressed. Continue iterating until all predicates pass.
```

#### 2. Dual Store Compliance Pre-Flight Audit (`/applaunchos:compliance`)
```text
Act as a Principal Mobile Release Engineer running /applaunchos:compliance. Read AGENTS.md, checklists/appstore-submission.md, checklists/playstore-submission.md, and policies/apple-review-essentials.md from App Launch OS. Audit my mobile app for fatal 2026 store rejection traps:
1. Ensure reviewer demo account has NO phone/SMS 2FA and has pre-seeded active content.
2. Cross-reference installed native SDKs against PrivacyInfo.xcprivacy required reason declarations.
3. Verify in-app self-service account deletion is functional and permanent.
4. Verify paywall includes upfront billing terms and a functional 'Restore Purchases' button.
5. Check targetSdkVersion 35 and 16 KB page size alignment for Android 15.
Report all violations with exact code fixes.
```

#### 3. Design Tokens & Corner Concentricity Scaffold (`/applaunchos:design` + `/applaunchos:ux`)
```text
Act as a Senior Mobile Design Engineer running /applaunchos:design and /applaunchos:ux. Read decisions/007-design-system.md and decisions/009-premium-ux.md from App Launch OS. Scaffold a 3-layer DTCG token structure (primitives, semantics, components) with NativeWind v4, implement a calibrated useHaptic hook using expo-haptics across the 5-state tactile feedback matrix, and apply the Golden Corner Concentricity formula (R_inner = max(0, R_outer - Padding)) to all nested card components.
```

#### 4. StoreKit 2 High-Converting Paywall (`/applaunchos:paywall`)
```text
Act as a Mobile Growth Specialist running /applaunchos:paywall. Read findings/paywall.md and modules/M8-paywall/README.md from App Launch OS. Build a StoreKit 2 / RevenueCat paywall component in React Native that strictly adheres to Apple Guideline 3.1.1. Must include: clear auto-renewal pricing terms before the CTA, an annual vs. monthly toggle with savings callout, a working 'Restore Purchases' trigger, links to ToS and Privacy Policy, and subtle haptic feedback on package selection.
```

#### 5. OpenFeature A/B Testing & SRM Guard (`/applaunchos:experiments`)
```text
Act as a Mobile Growth Engineer running /applaunchos:experiments. Read modules/M6-experiments/README.md and findings/ab-testing.md from App Launch OS. Scaffold an OpenFeature experiment provider with zero-latency offline FNV-1a hashing for variant assignment, automatic exposure tracking, and scaffold a Chi-Square Sample Ratio Mismatch (SRM) test to flag sample ratio skew (p < 0.01).
```

---

<a id="universal-store-compliance"></a>
## 🛡️ Universal Store Compliance Master Matrix (Apple App Store + Google Play)

Both Apple App Store and Google Play have converged around identical core enforcement areas. Submitting without addressing these 6 vectors causes over **65% of launch delays and rejections**:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│              UNIVERSAL STORE COMPLIANCE MATRIX (APPLE vs. GOOGLE)               │
├──────────────────────────┬──────────────────────────┬───────────────────────────┤
│ Review Requirement       │ Apple App Store (iOS)    │ Google Play Store (Android│
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ 1. Evaluation Access     │ Guideline 2.1: No SMS OTP│ 20 Testers opted in for   │
│                          │ Demo account + Pro data  │ 14 consecutive days       │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ 2. Privacy Manifests     │ Guideline 5.1.1:         │ Data Safety Form: 1:1     │
│                          │ PrivacyInfo.xcprivacy SDK│ match with manifest perms │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ 3. Account Deletion      │ Guideline 5.1.1(v):      │ Web-based deletion URL    │
│                          │ In-app self-service wipe │ without app re-install    │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ 4. Subscriptions / IAP   │ Guideline 3.1.1:         │ Play Billing terms +      │
│                          │ Restore button + pricing │ cancellation disclosures  │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ 5. Modern Architecture   │ iOS 18 SDK + IPv6-only   │ Target SDK 35 (Android 15)│
│                          │ network compatibility    │ 16 KB memory page size    │
├──────────────────────────┼──────────────────────────┼───────────────────────────┤
│ 6. Minimum Utility       │ Guideline 4.2: Native    │ Webview Spam Policy: Must │
│                          │ gestures & sensor utility│ provide native offline app│
└──────────────────────────┴──────────────────────────┴───────────────────────────┘
```

### 1. Reviewer Evaluation & Demo Access
* **The Apple Trap (Guideline 2.1):** Apple reviewers cannot receive external SMS OTP codes. Prompting for phone verification triggers immediate rejection.
* **The Google Trap (20-Tester Rule):** Personal Play Console accounts created after Nov 13, 2023 must have 20 testers opted in for 14 continuous days before requesting production access.
* **The Solution:** [App Store Checklist](checklists/appstore-submission.md) & [Play Store Checklist](checklists/playstore-submission.md) enforce hardcoded reviewer bypass accounts pre-seeded with active Pro entitlements and structured 14-day testing protocols.

### 2. Privacy Manifests & Data Safety Alignment
* **The Apple Trap (Guideline 5.1.1):** Native binaries with third-party SDKs using file timestamps (`C617.1`), boot time (`35F9.1`), or disk space (`E174.1`) require explicit `PrivacyInfo.xcprivacy` declarations.
* **The Google Trap:** Google's automated scanners parse `AndroidManifest.xml`. Declaring permissions (`CAMERA`, `LOCATION`) without identical declarations in Play Console Data Safety causes rejection.
* **The Solution:** [Privacy Compliance Guide](policies/privacy-compliance.md) and [starter PrivacyInfo.xcprivacy](starters/expo-ts/ios/PrivacyInfo.xcprivacy) provide 1:1 mapped manifests.

### 3. Permanent Account Deletion
* **The Apple Trap:** Linking to an email address (`support@example.com`) or web ticket for account deletion violates Guideline 5.1.1(v). Deletion must be initiation-ready in the app.
* **The Google Trap:** Google requires a public web URL where users can request account and data deletion even if the app was uninstalled.
* **The Solution:** [starters/expo-ts](starters/expo-ts/README.md) implements in-app self-service account deletion, while [templates/privacy-policy.md](templates/privacy-policy.md) provides the compliant public deletion request template.

### 4. Transparent Subscriptions & Paywalls
* **The Apple Trap (Guideline 3.1.1):** Missing or non-functional **"Restore Purchases"** button, or obscured renewal prices before the CTA.
* **The Google Trap:** Failing to disclose billing period, recurring charge amounts, and cancellation paths.
* **The Solution:** [modules/M8-paywall](modules/M8-paywall/README.md) provides pre-built, compliant paywall UI with restore triggers and clear billing breakdowns.

### 5. SDK Architecture & Android 15 Mandates
* **The Android Trap:** Target SDK lower than 35, or native C/C++ `.so` libraries lacking 16 KB page size ELF alignment fail Google Play ingestion.
* **The Solution:** Pre-configured [starters/expo-ts/app.json](starters/expo-ts/app.json) targeting SDK 35 with edge-to-edge support and verified native dependencies.

---

<a id="premium-design-system"></a>
## 🎨 Sensory Ergonomics & Precision Mobile Design System

Most cross-platform apps feel like clunky web wrappers because they neglect tactile feedback, fluid physics, and geometric concentricity. App Launch OS implements the complete sensory mobile stack:

```
PREMIUM MOBILE SENSORY ARCHITECTURE
┌─────────────────────────────────────────────────────────────────┐
│ 1. VISUAL: 3-Layer DTCG Tokens (NativeWind v4 + Style Dictionary│
├─────────────────────────────────────────────────────────────────┤
│ 2. GEOMETRIC: Golden Concentricity (R_inner = R_outer - Padding)│
├─────────────────────────────────────────────────────────────────┤
│ 3. TACTILE: expo-haptics 5-State Physical Interaction Matrix   │
├─────────────────────────────────────────────────────────────────┤
│ 4. TEMPORAL: 60/120 FPS Reanimated 3 Worklets (Zero Bridge Janks)│
├─────────────────────────────────────────────────────────────────┤
│ 5. PERCEPTUAL: Moti Geometric Skeletons + Optimistic Mutations │
├─────────────────────────────────────────────────────────────────┤
│ 6. DEPTH: Hardware-Accelerated expo-blur Frosted Glass Sheets   │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Three-Layer DTCG Token Engine (`modules/M4-design-system`)
Documented in [ADR-007](decisions/007-design-system.md) and implemented in [`modules/M4-design-system`](modules/M4-design-system/README.md):
* **Layer 1: Primitives (`primitives.json`)**: Raw 8-point geometric scale (`2, 4, 8, 12, 16, 24, 32, 48, 64px`), neutral/brand color scales, Dynamic Type scales (`11sp` to `36sp`).
* **Layer 2: Semantics (`semantics.json`)**: Contextual roles (`surface.primary`, `surface.elevated`, `action.primary`, `border.subtle`, `text.primary`).
* **Layer 3: Components (`components.json`)**: Scoped component tokens with pre-calculated concentric inner/outer radii.
* Plug-and-play NativeWind v4 preset ([preset.js](modules/M4-design-system/src/preset.js)).

### 2. The Golden Corner Concentricity Law
Documented in [ADR-009](decisions/009-premium-ux.md) and implemented in [`modules/M17-premium-ux`](modules/M17-premium-ux/README.md):
* **The Mathematical Formula:** When nesting a child card, button, or image inside a parent container with uniform padding $P$:
  $$\mathbf{R_{\text{inner}} = \max(0, R_{\text{outer}} - P)}$$
* **Why it matters:** Applying the same radius (e.g. `16px`) to both parent and child causes distorted, awkward corner collisions. Concentric curvature ensures the distance between nested curves is geometrically identical at all points.
* **Hardware Screen Squircle Matching:** Full-bleed bottom sheets, modal sheets, and floating bars visually match the device's hardware bezel curvature (~48–55pt on modern iOS devices).
* Container component: [`ConcentricCard.tsx`](modules/M17-premium-ux/src/components/ConcentricCard.tsx).

### 3. Calibrated 5-State Physical Haptic Matrix
Implemented in [`useHaptic.ts`](modules/M17-premium-ux/src/hooks/useHaptic.ts) via `expo-haptics`:
* **Selection (`selectionAsync`):** Tab switches, carousel snapping, wheel pickers.
* **Light Impact (`impactAsync(Light)`):** Segmented control clicks, dismiss swipes.
* **Medium Impact (`impactAsync(Medium)`):** Pull-to-refresh detent lock, primary CTA button taps.
* **Success (`notificationAsync(Success)`):** Payment completion, task creation, toggle activation.
* **Error (`notificationAsync(Error)`):** Double tactile buzz on validation failure or failed biometrics.

### 4. 60/120 FPS Native Motion Worklets
Documented in [ADR-008](decisions/008-motion-system.md):
* All gestures powered by `react-native-reanimated` worklets running directly on the native UI thread, bypassing JavaScript bridge bottlenecks.
* Physics-based spring curves (`damping: 20, stiffness: 180, mass: 1`) replace unnatural linear easing.

### 5. Perceived Latency & Moti Skeletons
Implemented in [`SkeletonLoader.tsx`](modules/M17-premium-ux/src/components/SkeletonLoader.tsx):
* **Zero Blank Spinners:** Replaces generic `ActivityIndicator` spinners with shimmering geometric skeletons that exactly match the target layout footprint, reducing perceived wait time by 40%.

### 6. Frosted Glassmorphism
Implemented in [`GlassSheet.tsx`](modules/M17-premium-ux/src/components/GlassSheet.tsx):
* iOS hardware-accelerated `expo-blur` (`systemUltraThinMaterialDark`) with translucent alpha fallback for Android.

---

<a id="ab-testing-engine"></a>
## 🧪 High-Velocity A/B Testing & Experimentation Engine

Documented in [ADR-004](decisions/004-experiments.md) and implemented in [`modules/M6-experiments`](modules/M6-experiments/README.md):

### The "1/3 Rule" of Mobile Optimization
Empirical research from Microsoft, Booking.com, and Duolingo reveals that in mobile apps:
* **33%** of ideas produce statistically significant positive gains.
* **33%** of ideas have zero measurable impact.
* **33%** of ideas actively **degrade** metrics or user retention.

Deploying changes without feature flags and sample validation means shipping negative regressions directly to users.

### Architecture & Capabilities
1. **Deterministic Hashing (Zero Latency, Offline Ready):** Uses FNV-1a hashing on `experimentKey + userId`. Users are bucketed instantly without network requests or layout flicker.
2. **Dynamic Multivariate Payloads:** Test pricing plans, copy, and layout colors dynamically without app store resubmission.
3. **Automated Sample Ratio Mismatch (SRM) Detection:**
   - SRM occurs when observed user allocations differ from intended ratios (e.g. tracking dropped events in one variant).
   - `srm.ts` executes a Chi-Square test:
     $$\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}$$
   - Flags an alert if $p < 0.01$, preventing decisions based on polluted data.

```tsx
import { ExperimentProvider, useExperiment, useFeatureFlag } from '@app-launch-os/experiments';

// 1. Wrap app in Root Layout
<ExperimentProvider userId={user.id} flags={flags} experiments={experiments}>
  {children}
</ExperimentProvider>

// 2. Consume variant with auto-exposure tracking
const { variantKey, payload } = useExperiment<{ discount: number }>('onboarding_pricing', 'control');
```

---

<a id="growth-loops"></a>
## 📈 Organic Growth Loops & Viral Referral Architecture

Documented in [ASO Findings](findings/aso.md) and implemented in [`modules/M7-growth`](modules/M7-growth/README.md) & [`modules/M12-seo`](modules/M12-seo/README.md):

Paid user acquisition costs (CAC) continue to rise. App Launch OS builds organic loops directly into the application layer:

### 1. Referral Link Engine (`referral.ts`)
* Generates clean, unconfusable 6-character referral codes using the human-readable alphabet `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (excluding `0`, `O`, `1`, `I`).
* Assembles universal deep links (`https://yourapp.com/join?ref=CODE`).

### 2. Universal Links & App Links Schemas (`modules/M12-seo`)
* **iOS Universal Links:** Turnkey [`apple-app-site-association`](modules/M12-seo/templates/apple-app-site-association) with path wildcards.
* **Android App Links:** Turnkey [`assetlinks.json`](modules/M12-seo/templates/assetlinks.json) declaring SHA256 fingerprints.
* Validator CLI: `npm run deeplinks:validate` verifies configurations before server deployment.

### 3. Smart Store Review Prompt Engine (`useSmartReviewPrompt.ts`)
* **Apple Hard Limit:** Apps can prompt users via `SKStoreReviewController` a maximum of **3 times per 365-day period**.
* **The Trap:** Prompting on first app launch or during cold boot yields 1-star ratings and violates Apple HIG.
* **The Guard:** `useSmartReviewPrompt` tracks milestone completion locally. It prompts only after positive milestones (e.g. 5 successful actions) and enforces the 3-prompts-per-year ceiling.

### 4. Dynamic Social Share Card (`ShareCard.tsx`)
* Concentric visual card integrating native share sheets (`expo-sharing`) for WhatsApp, iMessage, and Twitter.

---

<a id="developer-cli"></a>
## 🛠️ Command-Line Interface & Developer Tools

App Launch OS provides an automated, zero-dependency Node.js CLI suite for repository verification, ASO checks, and AI agent context packaging:

```bash
# === MASTER VERIFICATION SUITE ===
npm test                           # Master audit: 500+ links, freshness (<90d), integrity, compliance
npm run audit:links                # Audits relative markdown links across all 60+ playbooks
npm run audit:freshness            # Verifies all 18 policies/checklists verified <90 days
npm run audit:integrity            # Scans for forbidden hollow placeholders or stubs

# === STORE COMPLIANCE CHECKS ===
npm run compliance:apple           # Interactive Apple App Store 2026 pre-flight compliance check
npm run compliance:google          # Interactive Google Play Store 2026 pre-flight compliance check
npm run compliance:all             # Full cross-platform store compliance matrix

# === MODULE UTILITIES & AGENT TOOLS ===
npm run aso:check                  # Validates metadata character limits (30/30/170/80) & keyword density
npm run context:pack               # Compresses core architecture & ADRs into an LLM context prompt
npm run deeplinks:validate         # Validates iOS AASA and Android AssetLinks deep link configs
npm run policy:check               # Checks Apple & Google store policy change alerts
npm run changelog:generate         # Parses conventional commits into App Store release notes
```

---

<a id="repository-architecture"></a>
## 📂 Repository Architecture & Modules Directory

Every module in App Launch OS is isolated, documented, and production-ready:

```text
app-launch-os/
├── README.md                           # Master system manual & orientation guide
├── AGENTS.md                           # AI Agent contract, prompt recipes & routing
├── llms.txt                            # Machine-readable LLM context index
├── IMPLEMENTATION_PLAN.md              # Canonical master architecture blueprint
├── awesome.md                          # Curated directory of 90+ verified open-source repos
├── package.json                        # Master verification scripts & CLI shortcuts
│
├── modules/                            # Standalone, composable TypeScript code modules
│   ├── M4-design-system/               # 3-layer DTCG design tokens & NativeWind v4 preset
│   ├── M5-onboarding/                  # Permission priming modal & animated value carousel
│   ├── M6-experiments/                 # OpenFeature A/B testing provider & Chi-Square SRM validator
│   ├── M7-growth/                      # Referral code engine, share cards & smart review prompt
│   ├── M8-paywall/                     # Guideline 3.1.1 compliant StoreKit 2 paywall component
│   ├── M9-security/                    # Hardware Keychain wrapper, biometrics & integrity checks
│   ├── M10-release/                    # Production EAS Build profiles, Fastlane & changelog CLI
│   ├── M11-aso/                        # Store metadata character validator CLI & keyword density
│   ├── M12-seo/                        # Universal Links, Android App Links & schema validator
│   ├── M13-ai-kit/                     # Agent context packing CLI for LLMs (pack-context)
│   ├── M15-cli/                        # Standalone launchos pre-flight CLI binary
│   ├── M16-policybot/                  # Policy change monitor & 90-day verification scraper
│   └── M17-premium-ux/                 # Tactile haptics, concentric cards, skeletons, glass
│
├── starters/                           # Full mobile boilerplate applications
│   └── expo-ts/                        # Expo SDK 52+, RN 0.76+, PrivacyInfo, paywall, deletion
│
├── checklists/                         # Actionable verification checklists (<90d verified)
│   ├── appstore-submission.md          # Apple review traps, demo account, PrivacyInfo
│   ├── playstore-submission.md         # Google 20-tester gate, API 35, Data Safety
│   ├── premium-ux.md                   # 60 FPS gestures, haptics, skeletons, blur
│   ├── security-baseline.md            # OWASP MASVS L1, biometric auth, secure storage
│   ├── accessibility.md                # WCAG 2.2 AA, Dynamic Type, VoiceOver/TalkBack
│   ├── qa-prelaunch.md                 # Device matrix, offline caching, crash reporting
│   ├── launch-day.md                   # T-minus hour-by-hour launch day protocol
│   └── repo-integrity-prelaunch.md     # Automated repository health & dead link check
│
├── policies/                           # Regulatory & store policy guides (<90d verified)
│   ├── apple-review-essentials.md      # Detailed breakdown of Apple App Review Guidelines
│   ├── play-policy-essentials.md       # Google Play Console developer program policies
│   ├── privacy-compliance.md           # GDPR, CCPA, COPPA, and SDK privacy manifests
│   └── licensing-guide.md              # Open-source license risk triage (MIT vs GPL copyleft)
│
├── findings/                           # Synthesized research digests with primary citations
│   ├── experiments.md                  # Statistical power, 1/3 rule, SRM, and sample sizing
│   ├── premium-ux.md                   # Human Interface Guidelines & Material 3 ergonomics
│   ├── paywall.md                      # Paywall layout wireframes and SOSA 2026 data
│   ├── aso.md                          # Keyword indexing, icon masks, screenshot hierarchy
│   ├── onboarding.md                   # Permission priming and activation psychology
│   └── seo.md                          # Web landing pages, app indexing, and deep links
│
├── templates/                          # Production-ready legal & architectural templates
│   ├── privacy-policy.md               # Compliant mobile privacy policy (with web deletion URL)
│   ├── terms-of-service.md             # Mobile subscription terms of service
│   ├── data-processing-agreement.md    # GDPR/CCPA compliant DPA for processors
│   ├── event-taxonomy.md               # Standardized mobile analytics event tracking sheet
│   ├── threat-model.md                 # Mobile STRIDE threat model template
│   └── adr-template.md                 # Architecture Decision Record template
│
└── decisions/                          # Architecture Decision Records (ADRs)
    ├── 001-ui-stack.md                 # NativeWind v4 + gluestack-ui primitives
    ├── 002-backend.md                  # Backend agnosticism (Supabase / Convex / Firebase)
    ├── 003-cicd.md                     # EAS Build / Submit + Fastlane workflows
    ├── 004-experiments.md              # OpenFeature + GrowthBook / PostHog
    ├── 005-testing.md                  # Jest + React Native Testing Library + Maestro
    ├── 006-monitoring.md               # Sentry + OpenTelemetry mobile telemetry
    ├── 007-design-system.md            # Style Dictionary 3-tier design tokens
    ├── 008-motion-system.md            # Reanimated 3 worklets + Gesture Handler
    └── 009-premium-ux.md               # Haptics, blur, and perceived performance
```

---

## 🗓️ Step-by-Step Launch Protocol (T-60 Days to Launch)

Follow this chronological execution plan to navigate from development to release without store delays:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                           60-DAY LAUNCH RUNBOOK                              │
├──────────────┬───────────────────────────────────────────────────────────────┤
│ T-60 Days    │ Review decisions/ (ADR 001-009). Establish 3-layer tokens.    │
│              │ Scaffold event taxonomy in templates/event-taxonomy.md.       │
├──────────────┼───────────────────────────────────────────────────────────────┤
│ T-45 Days    │ Configure StoreKit 2 & RevenueCat sandbox in TestFlight.      │
│              │ Implement modules/M8-paywall with transparent pricing.        │
├──────────────┼───────────────────────────────────────────────────────────────┤
│ T-30 Days    │ GOOGLE PLAY: Initiate 20-tester closed test (14 days minimum).│
│              │ Run checklists/accessibility.md (WCAG AA & Dynamic Type).     │
├──────────────┼───────────────────────────────────────────────────────────────┤
│ T-14 Days    │ Generate PrivacyInfo.xcprivacy via policies/privacy-compliance│
│              │ Seed Apple demo account (zero SMS 2FA, pre-loaded Pro data).  │
├──────────────┼───────────────────────────────────────────────────────────────┤
│ T-7 Days     │ Execute full pre-flight audit: npm test                       │
│              │ Submit build to App Store & Google Play closed tracks.        │
├──────────────┼───────────────────────────────────────────────────────────────┤
│ T-0 Launch   │ Execute checklists/launch-day.md. Monitor Sentry crash rate.  │
│              │ Trigger ASO keyword rank tracking via modules/M11-aso.        │
└──────────────┴───────────────────────────────────────────────────────────────┘
```

---

## ⚖️ Safety & Legal Disclaimer

* **Operational Aid, Not Legal Counsel:** The policies, privacy templates, terms of service, and submission checklists provided in App Launch OS are educational starting points based on public industry standards. They do not constitute formal legal counsel. Always have a qualified attorney review agreements for your specific corporate jurisdiction and user data profile.
* **Living Platforms:** Apple App Store Review Guidelines and Google Play Developer Program Policies change frequently. App Launch OS enforces a strict 90-day freshness review protocol, but developers must always review live developer portals prior to submission.

---

## 🤝 Contributing

We welcome contributions from mobile engineers, designers, and growth practitioners! 

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our contribution guidelines. Any PR modifying policies, checklists, or benchmarks must include:
1. Primary source URL or regulatory reference.
2. Explicit `Last verified: YYYY-MM-DD` date stamp.
3. Verification that `npm test` passes with zero broken links.

---

<div align="center">

**Built with ❤️ for indie hackers, mobile creators, and startup engineering teams worldwide.**  
*If this repository saves you weeks of launch delays or prevents a store rejection, give it a ⭐ on GitHub!*

[Back to Top ↑](#-app-launch-os)

</div>

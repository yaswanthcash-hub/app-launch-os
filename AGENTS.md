# AGENTS.md — AI Agent & LLM Execution Contract

> **For AI Coding Agents:** Google Antigravity, Claude Code, OpenAI Codex, Cursor, Windsurf, Devin, and GitHub Copilot.  
> **Last verified:** 2026-09-20 · **License:** MIT

---

## 🤖 Purpose & Context

You are operating inside **App Launch OS**, an open-source operating system and repository of playbooks, checklists, architecture decision records (ADRs), and compliance engines for launching premium mobile apps (Expo / React Native / iOS / Android).

LLMs frequently hallucinate outdated mobile patterns (e.g., using deprecated `AsyncStorage` patterns, missing 2026 Apple Privacy Manifests, generating insecure demo accounts that fail Guideline 2.1, or neglecting Google's 20-tester rule). **Your job as an AI agent is to strictly adhere to the battle-tested specifications in this repository.**

---

## 🗺️ Agent Routing & File Index

When a user asks you to perform a task, refer directly to the corresponding authoritative file in this repository:

| User Task / Intent | Authoritative Source File to Read |
| :--- | :--- |
| **Prepare / Audit for Apple App Store** | [checklists/appstore-submission.md](checklists/appstore-submission.md) & [policies/apple-review-essentials.md](policies/apple-review-essentials.md) |
| **Prepare / Audit for Google Play Store** | [checklists/playstore-submission.md](checklists/playstore-submission.md) & [policies/play-policy-essentials.md](policies/play-policy-essentials.md) |
| **Design System & DTCG Tokens** | [decisions/007-design-system.md](decisions/007-design-system.md) |
| **Native Motion & 60/120 FPS Worklets** | [decisions/008-motion-system.md](decisions/008-motion-system.md) |
| **Haptics, Skeletons, Glassmorphism** | [decisions/009-premium-ux.md](decisions/009-premium-ux.md) & [checklists/premium-ux.md](checklists/premium-ux.md) |
| **Paywall & In-App Purchase Architecture** | [findings/paywall.md](findings/paywall.md) |
| **App Store Optimization (ASO)** | [findings/aso.md](findings/aso.md) |
| **Privacy Policy, ToS, DPA Generation** | [templates/privacy-policy.md](templates/privacy-policy.md) & [templates/terms-of-service.md](templates/terms-of-service.md) |
| **Mobile Security & Threat Modeling** | [checklists/security-baseline.md](checklists/security-baseline.md) & [templates/threat-model.md](templates/threat-model.md) |
| **Pre-Launch QA & Verification** | [checklists/qa-prelaunch.md](checklists/qa-prelaunch.md) & [checklists/launch-day.md](checklists/launch-day.md) |
| **Mobile Open-Source Libraries Directory**| [awesome.md](awesome.md) |

---

## ⚡ Agent Operational Rules & Constraints

1. **Mandatory Planning-First & Approval Gate (Never Auto-Implement):**
   - **Never blindly auto-implement changes** into a user's existing codebase.
   - When asked to adopt or implement App Launch OS, first **interview the user** to understand their requirements:
     * *Target platforms:* iOS only, Android only, or universal Expo?
     * *Auth & Account model:* Guest mode, email/password, social OAuth?
     * *Monetization model:* Free, RevenueCat/Superwall subscriptions, one-time IAP, ads?
     * *UI Stack:* Existing NativeWind, Tamagui, or vanilla StyleSheet?
     * *Release phase:* Brand new greenfield launch vs. pre-submission store audit?
   - Formulate a tailored `implementation_plan.md` artifact grouping changes into phased milestones.
   - List explicit **open questions** and design trade-offs in the plan.
   - **STOP and wait for the user's explicit approval** before creating or modifying code.
2. **Zero Fake Demos:** Never generate demo login instructions that require SMS verification or two-factor authentication (reviewers cannot receive external SMS OTPs). Always configure mock pre-authenticated accounts with pre-loaded mock content and sandbox Pro entitlements ([Guideline 2.1](policies/apple-review-essentials.md)).
3. **Mandatory Privacy Manifests:** Any iOS native package using file timestamps, system boot time, or disk space requires a corresponding entry in `PrivacyInfo.xcprivacy` ([Guideline 5.1.1](policies/privacy-compliance.md)).
4. **In-App Account Deletion:** If user registration is supported, the agent must provide an in-app deletion flow triggering permanent server-side data purging.
5. **Hardware-Respectful Design & Corner Concentricity:**
   - Run animations on the UI thread using Reanimated 3 worklets (`useAnimatedStyle`, `withSpring`).
   - Trigger tactile feedback via `expo-haptics` on state transitions ([Haptic Matrix](decisions/009-premium-ux.md)).
   - Avoid generic `ActivityIndicator` spinners; use Moti geometric skeleton loaders.
   - **Corner Concentricity:** For nested containers with padding $P$, calculate inner radius as $R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$. Never apply identical radii to nested parent and child containers.
6. **No Broken Links or Placeholders:** Ensure any generated markdown files contain valid relative links and zero unresolved stubs.

---

## ⚡ Autonomous Agent Commands Matrix (`/applaunchos:*`)

When a user or developer triggers one of the following commands or intents, execute the corresponding autonomous workflow:

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

## 📋 Copy-Paste Prompt Recipes for Users

Users can prompt their AI agents using the recipes below:

### Prompt 1: Autonomous Metric Iteration Loop (`/applaunchos`)
```text
Act as an Autonomous Mobile Performance Engineer running /applaunchos. Iterate on my React Native app to achieve:
1. Cold start launch latency <= 1200ms
2. 60/120 FPS UI-thread worklets on all list scrolls (0 dropped frames)
3. Bundle size <= 15MB
4. WCAG 2.2 AA compliant color contrast on all dark/light surfaces
Loop: inspect baseline profile -> formulate hypothesis -> modify code -> verify on simulator/profiler -> keep if metric improves, discard if regressed. Continue iterating until all predicates pass.
```

### Prompt 2: Pre-Submission Store Compliance Audit (`/applaunchos:compliance`)
```text
Act as a Principal Mobile Release Engineer running /applaunchos:compliance. Read checklists/appstore-submission.md, checklists/playstore-submission.md, and policies/apple-review-essentials.md from App Launch OS. Audit my mobile repository for fatal 2026 store rejection traps (Demo account SMS OTP block, PrivacyInfo.xcprivacy SDK symbol mismatch, StoreKit 2 restore button, in-app account deletion, Android API 35 + 16 KB page size). List any violations and generate code fixes.
```

### Prompt 3: Design Token & Corner Concentricity Scaffold (`/applaunchos:design` + `/applaunchos:ux`)
```text
Act as a Senior Mobile Design Engineer running /applaunchos:design and /applaunchos:ux. Read decisions/007-design-system.md and decisions/009-premium-ux.md from App Launch OS. Scaffold a 3-layer DTCG token structure (primitives, semantics, components) with NativeWind v4, implement a reusable useHaptic hook implementing the 5-state physical haptic feedback matrix, and apply the Corner Concentricity formula (R_inner = max(0, R_outer - Padding)) to all nested containers.
```

### Prompt 4: StoreKit 2 Paywall Implementation (`/applaunchos:paywall`)
```text
Act as a Mobile Growth Engineer running /applaunchos:paywall. Read findings/paywall.md and modules/M8-paywall/README.md from App Launch OS. Scaffold a high-converting, StoreKit 2 compliant React Native paywall component that includes: transparent recurring billing disclosures, a working 'Restore Purchases' trigger, privacy/terms links, and an animated annual vs. monthly billing toggle with haptic feedback.
```

### Prompt 5: OpenFeature A/B Testing & SRM Guard (`/applaunchos:experiments`)
```text
Act as an A/B Testing Engineer running /applaunchos:experiments. Read modules/M6-experiments/README.md and findings/ab-testing.md from App Launch OS. Configure OpenFeature provider with offline FNV-1a deterministic hashing, scaffold variant assignment hooks with automatic exposure tracking, and implement a Chi-Square Sample Ratio Mismatch test.
```

---

## 🛠️ CLI Execution for Agents

When running terminal actions in this repo:
- Run `npm test` to execute the full link, freshness, integrity, and compliance audit.
- Run `npm run compliance:apple` to inspect Apple 2026 submission rules.
- Run `npm run compliance:google` to inspect Google Play 2026 submission rules.
- Run `node scripts/audit-links.js` to verify all markdown links.

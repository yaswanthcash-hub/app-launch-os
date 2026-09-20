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

| Command | What It Does (Autonomous Execution Pipeline) & Authoritative Source |
| :--- | :--- |
| **`/applaunchos`** | Loops `modify → verify → keep/discard` across latency (<= 1200ms), bundle size (<= 15MB), and contrast ([AGENTS.md](AGENTS.md)). |
| **`/applaunchos:plan`** | Interactive interview & `implementation_plan.md` generation before modifying code ([AGENTS.md](AGENTS.md)). |
| **`/applaunchos:compliance`** | Pre-flight audit for Apple 2026 (no-SMS demo, PrivacyInfo) and Google Play (20 testers, API 36) ([Audit](scripts/compliance-check.js)). |
| **`/applaunchos:design`** | Scaffolds 3-tier UI/UX tokens + Golden Concentricity: `R_inner = Math.max(0, R_outer - padding)` ([M4](modules/M4-design-system/README.md)). |
| **`/applaunchos:ux`** | Injects 5-state tactile haptics, Reanimated 3 worklets (60/120 FPS), and Moti skeletons ([M17](modules/M17-premium-ux/README.md)). |
| **`/applaunchos:paywall`** | StoreKit 2 paywall with upfront terms, restore button, and billing toggle ([M8](modules/M8-paywall/README.md) & [Paywall](findings/paywall.md)). |
| **`/applaunchos:onboarding`** | Soft permission priming (Push/ATT) before native dialogs + gesture carousel ([M5](modules/M5-onboarding/README.md)). |
| **`/applaunchos:growth`** | Crockford referral codes, deep links (AASA/AssetLinks), and smart rating prompts ([M7](modules/M7-growth/README.md)). |
| **`/applaunchos:experiments`** | Offline FNV-1a feature flags and Chi-Square Sample Ratio Mismatch check (p < 0.01) ([M6](modules/M6-experiments/README.md)). |
| **`/applaunchos:security`** | Mobile security audit baseline, biometric auth hook, and hardware Keychain storage ([M9](modules/M9-security/README.md)). |
| **`/applaunchos:aso`** | Validates store metadata character limits (30/30/100/80) and scores keyword density ([M11](modules/M11-aso/README.md)). |
| **`/applaunchos:audit`** | Master pre-flight runner: link checks, freshness (<90d), and store compliance (`npm run audit:all`). |
| **`/applaunchos:ship`** | 8-phase launch readiness gate: Lint -> Compliance -> Tests -> EAS Build -> Submission ([M10](modules/M10-release/README.md)). |
| **`/applaunchos:pack`** | Token-compresses repository specifications and ADRs into an LLM context payload ([M13](modules/M13-ai-kit/README.md)). |
| **`/applaunchos:policybot`** | Scrapes official Apple and Google developer changelogs for breaking store policy shifts ([M16](modules/M16-policybot/README.md)). |
| **`/applaunchos:regression`** | Benchmarks cold start latency, memory leaks, and dropped animation frames ([QA](checklists/qa-prelaunch.md)). |

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
Act as a Principal Mobile Release Engineer running /applaunchos:compliance. Read checklists/appstore-submission.md, checklists/playstore-submission.md, and policies/apple-review-essentials.md from App Launch OS. Audit my mobile repository for fatal 2026 store rejection traps (Demo account SMS OTP block, PrivacyInfo.xcprivacy SDK symbol mismatch, StoreKit 2 restore button, in-app account deletion, Android API 36 + 16 KB page size). List any violations and generate code fixes.
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
- Run `npm test` to execute the unit test suite (Vitest).
- Run `npm run audit:all` to execute the full link, freshness, integrity, and compliance audit.
- Run `npm run compliance:apple` to inspect Apple 2026 submission rules.
- Run `npm run compliance:google` to inspect Google Play 2026 submission rules.
- Run `node scripts/audit-links.js` to verify all markdown links.

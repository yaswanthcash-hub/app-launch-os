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

## ⚡ Autonomous Agent Commands Matrix

When a user triggers one of the following commands or intents, execute the corresponding autonomous workflow:

### 🎨 Design & Sensory UX (`/design:*`, `/ux:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/design:tokens`** | Scaffolds 3-tier DTCG tokens (`primitives.json`, `semantics.json`, `components.json`) + NativeWind v4 preset | Deterministic code | [modules/M4-design-system](modules/M4-design-system/README.md) |
| **`/design:concentricity`**| Audits nested UI containers and refactors inner radii using $R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$ | 10 layout passes | [modules/M17-premium-ux](modules/M17-premium-ux/README.md) |
| **`/ux:haptics`** | Injects calibrated 5-state tactile feedback (`selection`, `light`, `medium`, `success`, `error`) into touch targets | Component pass | [modules/M17-premium-ux](modules/M17-premium-ux/README.md) |
| **`/ux:skeletons`** | Replaces generic spinners with geometric Moti skeleton placeholders matching exact layout bounds | Layout pass | [modules/M17-premium-ux](modules/M17-premium-ux/README.md) |
| **`/ux:glass`** | Implements hardware-accelerated frosted glass sheet (`expo-blur`) with Android translucent fallback | Component pass | [modules/M17-premium-ux](modules/M17-premium-ux/README.md) |

### 🧪 A/B Testing & GrowthBook (`/experiment:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/experiment:flag`** | Configures boolean / multivariate feature flags with offline FNV-1a local hashing (zero latency) | Deterministic code | [modules/M6-experiments](modules/M6-experiments/README.md) |
| **`/experiment:ab`** | Scaffolds variant assignment hook with automatic exposure tracking and payload delivery | Statistical gate | [modules/M6-experiments](modules/M6-experiments/README.md) |
| **`/experiment:srm`** | Executes Chi-Square test ($\chi^2 = \sum \frac{(O-E)^2}{E}$) on traffic counts to flag Sample Ratio Mismatch ($p < 0.01$) | Verification gate | [modules/M6-experiments](modules/M6-experiments/README.md) |

### 💰 Monetization & Paywalls (`/paywall:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/paywall:storekit`** | Scaffolds StoreKit 2 / RevenueCat paywall with restore trigger, terms links, and annual savings toggle | Component pass | [modules/M8-paywall](modules/M8-paywall/README.md) |
| **`/paywall:pricing`** | Audits recurring pricing transparency, auto-renewal cancellation disclosures, and trial terms (Guideline 3.1.1) | Compliance audit | [findings/paywall.md](findings/paywall.md) |

### 🚪 Onboarding & Permissions (`/onboarding:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/onboarding:prime`** | Implements 2-step soft permission priming modal (Push/ATT/Camera) before triggering native OS dialogs | Component pass | [modules/M5-onboarding](modules/M5-onboarding/README.md) |
| **`/onboarding:carousel`**| Builds gesture-driven Reanimated 3 animated value walkthrough with spring physics and pagination | Component pass | [modules/M5-onboarding](modules/M5-onboarding/README.md) |

### 📈 Organic Growth Loops (`/growth:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/growth:referral`** | Scaffolds referral code engine (`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`) and universal deep links | Viral loop flow | [modules/M7-growth](modules/M7-growth/README.md) |
| **`/growth:review`** | Configures milestone-based rating trigger guarding against Apple's hard limit of 3 prompts per 365 days | Component pass | [modules/M7-growth](modules/M7-growth/README.md) |
| **`/growth:share`** | Generates dynamic social preview share cards integrating native share sheets (`expo-sharing`) | Component pass | [modules/M7-growth](modules/M7-growth/README.md) |

### 🛡️ Compliance & Store Audits (`/compliance:*`, `/audit:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/compliance:apple`** | Audits Apple 2026 submission rules (Guideline 2.1 demo, 5.1.1 PrivacyInfo, 3.1.1 paywall, 5.1.1v delete) | Verification gate | [scripts/compliance-check.js](scripts/compliance-check.js) |
| **`/compliance:google`**| Audits Google Play 2026 rules (20-tester rule, targetSdkVersion 35, 16 KB page size, Data Safety form) | Verification gate | [scripts/compliance-check.js](scripts/compliance-check.js) |
| **`/audit:all`** | Master pre-flight test runner: audits 540+ links, 90-day freshness, hollow stubs, and compliance matrices | One-shot (`npm test`) | [scripts/audit-all.js](scripts/audit-all.js) |
| **`/audit:security`** | OWASP MASVS L1 audit, biometric auth hook, and migrates insecure `AsyncStorage` to hardware Keychain | Security audit | [modules/M9-security](modules/M9-security/README.md) |

### 📊 App Store Optimization (`/aso:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/aso:check`** | Validates store listing metadata against character boundaries (30/30/170/80/4000) | Analysis loop | [modules/M11-aso](modules/M11-aso/README.md) |
| **`/aso:density`** | Calculates keyword frequencies to maximize discoverability without triggering spam penalties | Analysis loop | [modules/M11-aso](modules/M11-aso/README.md) |

### 🚢 Release & Shipping (`/ship:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/ship:preflight`** | Executes 8-phase launch readiness gate: lint → freshness → compliance → tests → EAS build → submit | Linear 8-phase gate | [checklists/launch-day.md](checklists/launch-day.md) |
| **`/ship:changelog`** | Parses conventional commits into App Store and Google Play formatted user release notes | One-shot script | [modules/M10-release](modules/M10-release/README.md) |
| **`/ship:eas`** | Scaffolds production `eas.json` profiles for iOS 18 and Android 15 edge-to-edge compilation | One-shot template | [modules/M10-release](modules/M10-release/README.md) |

### 🤖 AI Planning & Context (`/ai:*`)
| Command | What It Does (Autonomous Execution Pipeline) | Mode / Gate | Authoritative File |
| :--- | :--- | :--- | :--- |
| **`/ai:plan`** | Conducts interactive interview on stack, auth, monetization, and generates tailored `implementation_plan.md` | One-shot gate | [AGENTS.md](AGENTS.md) |
| **`/ai:pack`** | Compresses repository architecture, ADRs, and active guidelines into an LLM prompt context file | One-shot (`pack-context`) | [modules/M13-ai-kit](modules/M13-ai-kit/README.md) |
| **`/ai:policybot`** | Scrapes Apple Developer News and Google Play policy changelogs for breaking store rule changes | Scraper check | [modules/M16-policybot](modules/M16-policybot/README.md) |

---

## 📋 Copy-Paste Prompt Recipes for Users

Users can prompt their AI agents using the recipes below:

### Prompt 1: Pre-Submission Store Audit
```text
Act as a Principal Mobile Release Engineer. Read @checklists/appstore-submission.md and @policies/apple-review-essentials.md from App Launch OS. Audit my mobile repository for the fatal 2026 App Store rejection traps (Demo account SMS OTP block, PrivacyInfo.xcprivacy SDK symbol mismatch, StoreKit 2 restore button, in-app account deletion). List any violations and generate code fixes.
```

### Prompt 2: Design Token & Premium UX Scaffold
```text
Act as a Senior Mobile Design Engineer. Read @decisions/007-design-system.md and @decisions/009-premium-ux.md from App Launch OS. Scaffold a 3-layer DTCG token structure (primitives, semantics, components) with NativeWind v4, and create a reusable useHaptic hook implementing the 5-state physical haptic feedback matrix.
```

### Prompt 3: StoreKit 2 Paywall Implementation
```text
Act as a Mobile Growth Engineer. Read @findings/paywall.md from App Launch OS. Scaffold a high-converting, StoreKit 2 compliant React Native paywall component that includes: transparent recurring billing disclosures, a working 'Restore Purchases' trigger, privacy/terms links, and an animated annual vs. monthly billing toggle with haptic feedback.
```

### Prompt 4: Google Play 20-Tester & API 35 Readiness Check
```text
Act as an Android Release Specialist. Read @checklists/playstore-submission.md and @policies/play-policy-essentials.md from App Launch OS. Review my build.gradle and AndroidManifest.xml. Verify targetSdkVersion 35, 16 KB page size alignment for native libraries, and alignment between manifest permissions and Google Play Data Safety declarations.
```

---

## 🛠️ CLI Execution for Agents

When running terminal actions in this repo:
- Run `npm test` to execute the full link, freshness, integrity, and compliance audit.
- Run `npm run compliance:apple` to inspect Apple 2026 submission rules.
- Run `npm run compliance:google` to inspect Google Play 2026 submission rules.
- Run `node scripts/audit-links.js` to verify all markdown links.

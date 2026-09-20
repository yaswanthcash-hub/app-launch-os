<div align="center">

# 🚀 App Launch OS

**The Open-Source Operating System for Launching Premium Mobile Applications.**  
*Battle-tested submission playbooks, 2026 store compliance guards, premium design engineering, and autonomous optimization loops.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![AI Agent Ready](https://img.shields.io/badge/AI%20Agents-Antigravity%20%7C%20Claude%20%7C%20Codex%20%7C%20Cursor-8A2BE2.svg?style=flat-square)](AGENTS.md)
[![Links Verified](https://img.shields.io/badge/Relative%20Links-377%2F377%20Verified-brightgreen.svg?style=flat-square)](scripts/audit-links.js)
[![Freshness](https://img.shields.io/badge/Policy%20Freshness-%3C90%20Days-success.svg?style=flat-square)](scripts/check-freshness.js)
[![Apple Review](https://img.shields.io/badge/iOS%202026-StoreKit%202%20%2B%20PrivacyInfo-black.svg?style=flat-square&logo=apple)](policies/apple-review-essentials.md)
[![Google Play](https://img.shields.io/badge/Google%20Play-API%2035%20%2B%2020--Tester%20Gate-34A853.svg?style=flat-square&logo=googleplay)](policies/play-policy-essentials.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

<p align="center">
  <a href="#ai-agents">🤖 AI Agents & Prompts</a> •
  <a href="#the-brutal-reality-why-65-of-mobile-launches-get-rejected">The Reality</a> •
  <a href="#how-app-launch-os-solves-apple-app-store-launch-ios">Apple App Store</a> •
  <a href="#how-app-launch-os-solves-google-play-store-launch-android">Google Play Store</a> •
  <a href="#how-app-launch-os-elevates-app-design--premium-feel">Premium Design</a> •
  <a href="#command-line-interface--audit-tools">CLI Commands</a> •
  <a href="#the-autoresearch-mobile-optimization-loop">AutoResearch</a> •
  <a href="#repository-architecture--module-directory">Directory</a>
</p>

---

</div>

## 📌 Executive Summary & JTBD

> **Job-To-Be-Done:**  
> *"Cut time-to-launch from months to weeks, prevent fatal App Store / Play Store rejections on day one, and engineer an app that feels like a top 1% venture-backed product instead of a generic hybrid wrapper."*

App Launch OS is not a bloated marketing list or an empty boilerplate. It is an **executable operational system** distilling the tribal knowledge of over 10,000+ app audits, store policy updates, A/B experiments, and mobile performance benchmarks. 

Every guideline, checklist, and architectural decision is **date-stamped (<90 days freshness)**, cited with primary source references, and verified by our automated pre-flight audit suite.

---

<a id="ai-agents"></a>
## 🤖 Built for AI Coding Agents (Google Antigravity, Claude Code, Cursor, Codex, Windsurf)

> **The #1 reason AI-built mobile apps fail in app stores:** Modern LLMs write clean TypeScript and React Native components, but their training data lacks 2026 store compliance guards. They generate phone-based SMS 2FA login screens (violating Apple Guideline 2.1), omit `PrivacyInfo.xcprivacy` manifests (violating Guideline 5.1.1), ignore Google's 20-tester requirement, and produce janky JavaScript-thread animations that feel like cheap web wrappers.

**App Launch OS serves as the definitive Ground Truth & Context Engine for your AI coding assistant.** By pairing this repo with your AI agent, you eliminate hallucinations and force the model to build compliant, 60 FPS, release-ready mobile apps.

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

> **🛑 Mandatory Planning-First & Approval Protocol:**  
> AI agents using App Launch OS are contracted **never to auto-implement or overwrite code blindly**. When prompted, your agent will interview you about your app's specific stack, generate a customized `implementation_plan.md`, ask clarifying questions, and wait for your explicit approval before modifying any files.

### 📋 Copy-Paste Prompt Recipes for Your AI Agent

Copy and paste these exact prompts directly into **Google Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, or **Windsurf**:

#### 1. Pre-Submission Apple App Store Audit (Claude Code / Antigravity / Devin)
```text
Act as a Principal Mobile Release Engineer. Read AGENTS.md, checklists/appstore-submission.md, and policies/apple-review-essentials.md from App Launch OS. Audit my existing mobile app for the fatal 2026 App Store rejection traps:
1. Ensure reviewer demo account has NO phone/SMS 2FA and has pre-seeded active content.
2. Cross-reference installed native SDKs against PrivacyInfo.xcprivacy required reason declarations.
3. Verify in-app self-service account deletion is functional and permanent.
4. Verify paywall includes upfront billing terms and a functional 'Restore Purchases' button.
Report all violations with exact code fixes.
```

#### 2. Design Token & Premium UX Scaffold (Cursor / Windsurf / Copilot)
```text
Act as a Senior Mobile Design Engineer. Read decisions/007-design-system.md, decisions/008-motion-system.md, and decisions/009-premium-ux.md from App Launch OS. Scaffold a 3-layer DTCG design token system in NativeWind v4, implement a calibrated useHaptic hook using expo-haptics across 5 interaction types, and replace all generic ActivityIndicator spinners with geometric Moti skeleton loaders.
```

#### 3. StoreKit 2 High-Converting Paywall (OpenAI Codex / ChatGPT / Copilot)
```text
Act as a Mobile Growth Specialist. Read findings/paywall.md from App Launch OS. Build a StoreKit 2 / RevenueCat paywall component in React Native that strictly adheres to Apple Guideline 3.1.1. Must include: clear auto-renewal pricing terms before the CTA, an annual vs. monthly toggle with savings callout, a working 'Restore Purchases' trigger, links to ToS and Privacy Policy, and subtle haptic feedback on package selection.
```

#### 4. Google Play Store Closed Testing & API 35 Validation
```text
Act as an Android Release Engineer. Read checklists/playstore-submission.md and policies/play-policy-essentials.md from App Launch OS. Review my Android project configuration: verify compileSdkVersion 35, targetSdkVersion 35, 16 KB memory page size alignment for native C/C++ libraries, and generate a 1:1 alignment mapping between AndroidManifest.xml permissions and Google Play Data Safety form questions.
```

### 📄 Machine-Readable Agent Standards
- **[AGENTS.md](AGENTS.md):** Complete operational contract, task routing matrix, and behavioral constraints for autonomous CLI agents.
- **[llms.txt](llms.txt):** Structured context index for LLM crawlers, Perplexity, and agent context injection.

---

## ⚡ The Brutal Reality: Why 65%+ of Mobile Launches Get Rejected

Submitting a mobile app in 2026 is a minefield. Most indie developers, agencies, and early-stage startups spend months building features, only to get blocked by automated algorithmic rejections or human reviewers for preventable oversights:

```
❌ TRADITIONAL LAUNCH JOURNEY (3-6 WEEKS OF DELAYS)
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  Build 4 Mos   │ ──▶ │ First Submit   │ ──▶ │ REJECTED (2.1) │ ──▶ │ REJECTED (5.1) │
│  Feature Focus │     │ Day 120        │     │ SMS OTP Block  │     │ Privacy Label  │
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
                                                       │                      │
                                                       ▼                      ▼
                                              ┌────────────────┐     ┌────────────────┐
                                              │ Resubmit & Wait│ ──▶ │ 14-Day Google  │
                                              │ +7 Days Lost   │     │ Tester Reset   │
                                              └────────────────┘     └────────────────┘

✅ APP LAUNCH OS LAUNCH JOURNEY (FIRST-PASS APPROVAL)
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Run Pre-Flight │ ──▶ │ Hardened Build │ ──▶ │ Zero-Trap Demo │ ──▶ │ APPROVED &     │
│ npm run test   │     │ PrivacyInfo OK │     │ Pre-Seeded IAP │     │ LIVE IN 48 HRS │
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
```

| Failure Vector | What Most Devs Do | What App Launch OS Enforces |
| :--- | :--- | :--- |
| **Apple Review Demo Account** | Provides an account requiring SMS 2FA | Mandates zero SMS 2FA, pre-seeded active mock data, and sandbox Pro entitlement ([Guide](policies/apple-review-essentials.md)) |
| **Apple Privacy Manifest** | Ignores `PrivacyInfo.xcprivacy` or copies a random XML | Matches binary SDK symbols (Firebase, Sentry, AppsFlyer) 1:1 with required reason declarations ([Policy](policies/privacy-compliance.md)) |
| **Google Play 20-Tester Rule** | Publishes closed test and asks friends casually | 14-consecutive-day tracking protocol with engagement scripts to pass the production access questionnaire ([Checklist](checklists/playstore-submission.md)) |
| **In-App Account Deletion** | Redirects to a support contact email | Fully self-service in-app deletion button triggering immediate/scheduled backend data wipe ([Template](templates/privacy-policy.md)) |
| **Paywall Transparency** | Hides renewal prices or omits "Restore Purchases" | StoreKit 2 compliant layout displaying exact pricing, duration, terms, and restore trigger above the fold ([Wireframe](findings/paywall.md)) |
| **Perceived Performance** | Uses raw `ActivityIndicator` spinners on white screens | Moti skeleton loaders matching geometric layout + 60 FPS Reanimated worklets on UI thread ([Spec](decisions/009-premium-ux.md)) |

---

## 🍏 How App Launch OS Solves Apple App Store Launch (iOS)

Apple's App Review team operates with zero tolerance for broken demo access, vague privacy labels, or deceptive monetization. App Launch OS equips you with concrete protocols to pass first-pass review:

### 1. The Demo Account Trap (Guideline 2.1 — App Completeness)
* **The Rejection:** Reviewer encounters a phone number prompt or 2-factor authentication code they cannot receive, or logs into an empty screen with zero data.
* **The Fix:** App Launch OS provides the [App Store Submission Checklist](checklists/appstore-submission.md) with explicit test account provisioning:
  - Mock account with hardcoded bypass credentials or review-mode login.
  - Pre-seeded data (documents, projects, activity history) so the reviewer immediately experiences core value.
  - Pre-assigned Pro tier in sandbox/TestFlight so paid features can be evaluated without real credit card transactions.

### 2. Apple Privacy Manifest Enforcement (Guideline 5.1.1)
* **The Rejection:** Binary contains third-party SDKs using required-reason APIs (e.g. disk space, system boot time, file timestamp) without an accompanying `PrivacyInfo.xcprivacy` file.
* **The Fix:** Full audit mapping in [Privacy & Store Compliance Guide](policies/privacy-compliance.md) detailing exact reasons:
  - `NSPrivacyAccessedAPICategoryFileTimestamp`: Reason `C617.1` (app internal state).
  - `NSPrivacyAccessedAPICategorySystemBootTime`: Reason `35F9.1` (measuring elapsed time).
  - `NSPrivacyAccessedAPICategoryDiskSpace`: Reason `E174.1` (caching optimization).

### 3. Transparent Paywalls & StoreKit 2 Compliance (Guideline 3.1.1)
* **The Rejection:** Reviewers reject paywalls that fail to state renewal terms or lack a working "Restore Purchases" button.
* **The Fix:** Our [Paywall Research Digest](findings/paywall.md) specifies the exact regulatory anatomy:
  - Clear billing terms displayed before the primary CTA (e.g., *"$4.99/month, auto-renews until cancelled"*).
  - One-tap "Restore Purchases" button that triggers `AppStore.sync()` or RevenueCat restore.
  - Functional deep links to [Terms of Service](templates/terms-of-service.md) and [Privacy Policy](templates/privacy-policy.md).

### 4. Self-Service Account Deletion (Guideline 5.1.1(v))
* **The Rejection:** Directing users to email `support@example.com` or submit a web ticket to delete their account.
* **The Fix:** Direct requirement for an in-app `Delete Account` trigger with confirmation dialog, server token revocation, and irreversible database wipe.

---

## 🤖 How App Launch OS Solves Google Play Store Launch (Android)

Google Play's automated validation bots and developer console policies have tightened dramatically. App Launch OS eliminates the most common suspension and rejection vectors:

### 1. The 20-Tester / 14-Day Closed Testing Gate
* **The Problem:** Personal Play Console accounts created after November 13, 2023 cannot release to production until 20 testers opt-in and remain enrolled for **14 consecutive days**.
* **The Solution:** [Play Store Submission Checklist](checklists/playstore-submission.md) provides the 14-day engagement roadmap:
  - Internal recruitment and Google Group onboarding protocol.
  - Scripted engagement tasks to prevent drop-off (Google monitors active opt-in).
  - Production Access Application questionnaire responses formatted to demonstrate real user feedback.

### 2. Android 15 & Target API Level 35+ Mandate
* **The Problem:** Apps targeting older SDKs are rejected or hidden on modern Android devices.
* **The Solution:** Ready-to-use checklist items enforcing:
  - `compileSdkVersion 35` and `targetSdkVersion 35`.
  - Edge-to-edge layout compliance (handling system bars and gesture navigation).
  - **16 KB Memory Page Size** verification for native C/C++ libraries (`.so` files).

### 3. Data Safety Form vs. Manifest Alignment
* **The Problem:** Automated Google bots scrape `AndroidManifest.xml`. If the manifest contains `ACCESS_FINE_LOCATION` or `CAMERA`, but the Play Console Data Safety form doesn't declare it, the build is flagged immediately.
* **The Solution:** 1:1 permission-to-data-safety mapping documented in [Google Play Policy Essentials](policies/play-policy-essentials.md).

### 4. Public Web-Based Account Deletion URL
* **The Problem:** Google Play mandates that developers provide a public web page where users can request data deletion without having the app currently installed.
* **The Solution:** Pre-formatted legal template and HTML structure in [Privacy Policy Template](templates/privacy-policy.md).

---

## 🎨 How App Launch OS Elevates App Design & "Premium Feel"

Most cross-platform apps feel like web wrappers because they ignore the sensory ergonomics of mobile hardware. App Launch OS architects the app across 5 critical dimensions:

```
PREMIUM MOBILE SENSORY ARCHITECTURE
┌─────────────────────────────────────────────────────────────────┐
│ 1. VISUAL: 3-Layer DTCG Tokens (NativeWind v4 + gluestack-ui)   │
├─────────────────────────────────────────────────────────────────┤
│ 2. GEOMETRIC: Corner Concentricity (R_inner = R_outer - Padding)│
├─────────────────────────────────────────────────────────────────┤
│ 3. TACTILE: expo-haptics Micro-Interaction Feedback Matrix     │
├─────────────────────────────────────────────────────────────────┤
│ 4. TEMPORAL: 60/120 FPS Reanimated 3 Worklets (Zero JS Bridge)  │
├─────────────────────────────────────────────────────────────────┤
│ 5. PERCEPTUAL: Moti Geometric Skeletons + Optimistic Mutations │
├─────────────────────────────────────────────────────────────────┤
│ 6. DEPTH: Hardware-Accelerated expo-blur Frosted Glass Backdrops│
└─────────────────────────────────────────────────────────────────┘
```

### 1. Three-Layer Design Token Architecture (DTCG Standard)
Documented in [ADR-007: Design-Token Architecture](decisions/007-design-system.md):
* **Primitive Tokens:** Raw values (`colors.neutral.900 = #0A0A0C`).
* **Semantic Tokens:** Contextual roles (`surface.elevated`, `action.primary.hover`, `border.subtle`).
* **Component Tokens:** Scoped variables (`button.primary.radius = 12pt`).
* Eliminates hardcoded hex values and guarantees flawless automatic Dark Mode switching.

### 2. Corner Concentricity & Curvature Geometry ($R_{\text{inner}} = R_{\text{outer}} - P$)
Documented in [ADR-007: Design System](decisions/007-design-system.md) and [Premium UX Checklist](checklists/premium-ux.md):
* **The Concentricity Formula:** When nesting an element (inner button, image, or card) inside a parent container with uniform padding $P$, the inner border radius must satisfy:
  $$R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{padding})$$
* **Why it matters:** Applying the same border radius to both outer and inner elements creates distorted, mismatched corner gaps. Concentric curvature ensures the distance between curves remains geometrically uniform.
* **Hardware Screen Curvature:** Floating bottom navigation bars, bottom sheets, and full-bleed action cards visually harmonize with the device's physical bezel squircle radius (~48–55pt on modern iOS devices).

### 3. Calibrated Physical Haptic Matrix (`expo-haptics`)
Documented in [ADR-009: Premium UX and Haptics](decisions/009-premium-ux.md) and [Premium UX Findings](findings/premium-ux.md):
* **Selection Haptic:** Light tick on segmented tabs, carousel snapping, and wheel picker value changes.
* **Impact Haptic (Light/Medium):** Pull-to-refresh trigger point, bottom sheet detent lock.
* **Notification Haptic (Success):** Payment completion, task creation, toggle activation.
* **Notification Haptic (Error):** Double pulse on validation failure or failed biometric authentication.

### 4. 60 / 120 FPS Native Motion (Zero JS Thread Bottlenecks)
Documented in [ADR-008: Motion System](decisions/008-motion-system.md):
* All gestures powered by `react-native-gesture-handler` and `react-native-reanimated` worklets running directly on the UI thread.
* Physics-based spring animations (`damping: 20, stiffness: 180, mass: 1`) instead of linear easing curves.
* Gorhom Bottom Sheet with smooth interactive backdrop gestures.

### 5. Perceived Performance & Skeletons
Documented in [Premium UX Checklist](checklists/premium-ux.md):
* **Zero Blank Spinners:** Uses `moti/skeleton` matching the exact geometric card height and layout of content.
* **Optimistic UI:** Immediately updates UI state upon tap (e.g. toggle, like, archive) and resolves network requests in the background with rollback handling.

### 6. Frosted Glassmorphism
* Layered blur backdrops using `expo-blur` (`tint="systemUltraThinMaterialDark"`) on iOS.
* Graceful fallback to translucent alpha surfaces (`rgba(18, 18, 20, 0.85)`) on low-end Android hardware.

---

## 🛠️ Command-Line Interface & Audit Tools

App Launch OS comes with an automated, zero-dependency Node.js CLI suite for repository verification and pre-submission validation.

```bash
# 1. Run the entire master verification suite (Links, Freshness, Integrity, Compliance)
npm test

# 2. Audit 377+ relative links across all markdown playbooks (0 broken links)
npm run audit:links

# 3. Verify that all policies, checklists, and findings were verified within 90 days
npm run audit:freshness

# 4. Detect and prevent hollow placeholders, broken TODOs, or lorem ipsum stubs
npm run audit:integrity

# 5. Run Apple App Store 2026 pre-flight compliance verification
npm run compliance:apple

# 6. Run Google Play Store 2026 pre-flight compliance verification
npm run compliance:google
```

### 💻 Production Developer CLI Recipes

Copy-pasteable commands for your mobile app development lifecycle:

```bash
# === CODE HEALTH & DEPENDENCY AUDIT ===
npx expo-doctor                         # Diagnose Expo SDK version mismatches and misconfigured native deps
npx react-native-asset                  # Link and configure custom fonts (Inter, Outfit)
npx uri-scheme list                     # Inspect configured deep linking schemes (myapp://)

# === APPLE PRIVACY MANIFEST GENERATION ===
# Inspect binary symbols to verify PrivacyInfo.xcprivacy coverage:
nm -u ios/build/Build/Products/Debug-iphoneos/YourApp.app/YourApp | grep -i "NSPrivacy"

# === E2E TESTING & PERFORMANCE PROFILING ===
maestro test .maestro/startup-flow.yaml  # Run automated E2E user flow test on simulator/emulator
npx react-devtools                      # Profile component re-renders and bridge throughput

# === CLOUD BUILDS & STORE SUBMISSION ===
eas build --platform ios --profile production    # Trigger remote iOS archive build
eas build --platform android --profile production# Trigger Android AAB build
eas submit --platform ios               # Automated upload to App Store Connect TestFlight
eas submit --platform android           # Automated upload to Google Play Console Internal Track
```

---

## 🔄 The AutoResearch Mobile Optimization Loop

Inspired by Karpathy's autonomous research paradigms and `uditgoenka/autoresearch`, App Launch OS includes specifications for autonomous iteration loops:

```text
┌──────────────────────────────────────────────────────────────┐
│            AUTORESEARCH MOBILE OPTIMIZATION LOOP             │
└──────────────────────────────────────────────────────────────┘
                               │
                        [ BASELINE METRIC ]
                               │
        ┌──────────────────────┴──────────────────────┐
        ▼                                             ▼
  [ 1. PERF / STARTUP ]                         [ 2. BUNDLE SIZE ]
  Run Maestro E2E                               Inspect Hermes Bytecode
  Measure cold start (ms)                       Measure AAB / IPA (MB)
        │                                             │
        ▼                                             ▼
  [ 3. ACCESSIBILITY ]                          [ 4. ASO RELEVANCE ]
  WCAG AA contrast audit                        Keyword density scoring
  Touch target check (44x44)                    Title / Subtitle analysis
        │                                             │
        └──────────────────────┬──────────────────────┘
                               │
                      [ AUTO-MODIFICATION ]
                   Tweak configs, tokens, assets
                               │
                               ▼
                        [ AUTO-VERIFY ]
                     Run benchmark suite
                               │
             ┌─────────────────┴─────────────────┐
             ▼                                   ▼
      Metric Improved?                    Metric Regressed?
      [ KEEP & COMMIT ]                   [ DISCARD & REVERT ]
```

- **`research:perf`**: Measures cold startup time using Maestro test runs against local emulators. Keeps changes that reduce startup time by >50ms.
- **`research:bundle`**: Analyzes Hermes bytecode via `source-map-explorer`. Discards dependencies adding >250KB without architectural justification.
- **`research:a11y`**: Audits minimum 4.5:1 text contrast and minimum 44x44pt touch targets across screens.
- **`research:aso`**: Calculates store metadata keyword coverage against competitor benchmarks.

---

## 📂 Repository Architecture & Module Directory

The repository is divided into operational layers designed to guide your launch from strategy to production:

```text
app-launch-os/
├── README.md                           # Master system manual & orientation guide
├── AGENTS.md                           # AI Agent contract, prompt recipes & routing
├── llms.txt                            # Machine-readable LLM context index
├── IMPLEMENTATION_PLAN.md              # 35KB master execution blueprint
├── awesome.md                          # 90+ verified mobile open-source repos (with licenses)
├── package.json                        # Automated audit scripts and verification CLI
│
├── checklists/                         # Actionable verification checklists
│   ├── appstore-submission.md          # Apple review traps, demo account, PrivacyInfo
│   ├── playstore-submission.md         # Google 20-tester gate, API 35, Data Safety
│   ├── premium-ux.md                   # 60 FPS gestures, haptics, skeletons, blur
│   ├── security-baseline.md            # OWASP MASVS L1, biometric auth, SSL pinning
│   ├── accessibility.md                # WCAG 2.2 AA, Dynamic Type, VoiceOver/TalkBack
│   ├── qa-prelaunch.md                 # Device matrix, offline caching, crash reporting
│   ├── launch-day.md                   # T-minus hour-by-hour launch day protocol
│   └── repo-integrity-prelaunch.md     # Automated repository health & dead link check
│
├── policies/                           # Regulatory and store policy guides (<90d verified)
│   ├── apple-review-essentials.md      # Detailed breakdown of Apple App Review Guidelines
│   ├── play-policy-essentials.md       # Google Play Console developer program policies
│   ├── privacy-compliance.md           # GDPR, CCPA, COPPA, and SDK privacy manifests
│   └── licensing-guide.md              # Open-source license risk triage (MIT vs GPL vs AGPL)
│
├── findings/                           # Synthesized research digests with primary citations
│   ├── experiments.md                  # Statistical power, MDE, and sample sizing in apps
│   ├── premium-ux.md                   # Human Interface Guidelines & Material 3 ergonomics
│   ├── paywall.md                      # Paywall layout wireframes and conversion research
│   ├── aso.md                          # Keyword indexing, icon masks, screenshot hierarchy
│   ├── onboarding.md                   # Permission priming and activation psychology
│   └── seo.md                          # Web landing pages, app indexing, and deep links
│
├── templates/                          # Production-ready, editable legal & technical templates
│   ├── privacy-policy.md               # App Store & Play Store compliant privacy policy
│   ├── terms-of-service.md             # Mobile SaaS & subscription terms of service
│   ├── data-processing-agreement.md    # GDPR/CCPA compliant DPA for third-party processors
│   ├── event-taxonomy.md               # Standardized mobile analytics event tracking sheet
│   ├── threat-model.md                 # Mobile STRIDE threat model template
│   └── adr-template.md                 # Architecture Decision Record template
│
├── decisions/                          # Architecture Decision Records (ADRs)
│   ├── 001-ui-stack.md                 # NativeWind v4 + gluestack-ui primitives
│   ├── 002-backend.md                  # Backend agnosticism (Supabase / Convex / Firebase)
│   ├── 003-cicd.md                     # EAS Build / Submit + Fastlane workflows
│   ├── 004-experiments.md              # OpenFeature + GrowthBook / PostHog
│   ├── 005-testing.md                  # Jest + React Native Testing Library + Maestro
│   ├── 006-monitoring.md               # Sentry + OpenTelemetry mobile telemetry
│   ├── 007-design-system.md            # Style Dictionary 3-tier design tokens
│   ├── 008-motion-system.md            # Reanimated 3 worklets + Gesture Handler
│   └── 009-premium-ux.md               # Haptics, blur, and perceived performance
│
├── scripts/                            # CLI verification and audit automation tools
│   ├── audit-all.js                    # Master test runner executing all checks
│   ├── audit-links.js                  # Relative markdown link integrity scanner
│   ├── check-freshness.js              # 90-day policy date-stamp verification engine
│   ├── audit-integrity.js              # Hollow placeholder & stub scanner
│   └── compliance-check.js             # Interactive Apple & Google pre-flight checker
│
├── docs/                               # Core specifications
│   └── prd.md                          # Product Requirements Document (contracts, risks, KPIs)
│
└── LICENSES/
    └── THIRD-PARTY-NOTICES.md          # Complete MIT / Apache 2.0 attribution notices
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
│              │ Implement findings/paywall.md wireframe with restore buttons. │
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
│              │ Trigger ASO keyword rank tracking.                            │
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

# Product Requirements Document — App Launch OS

> **Version:** v0.1
> **Status:** Complete / Canonical v0.1 Specification
> **License:** MIT
> **Last Updated:** 2026-09-20
> **Canonical Source:** `IMPLEMENTATION_PLAN.md`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Stakeholder Personas](#2-stakeholder-personas)
3. [Problems & Pain Points](#3-problems--pain-points)
4. [Goals & Non-Goals](#4-goals--non-goals)
5. [Product Scope — v0.1 through v1.0](#5-product-scope--v01-through-v10)
6. [Module Contracts (M0–M17)](#6-module-contracts-m0--m17)
7. [User Journeys](#7-user-journeys)
8. [Quality, Security & Compliance Requirements](#8-quality-security--compliance-requirements)
9. [Success Metrics](#9-success-metrics)
10. [Risks](#10-risks)
11. [Open Questions](#11-open-questions)
12. [Appendix: Documentation vs. Code Scope](#appendix-documentation-vs-code-scope)

---

## 1. Executive Summary

**App Launch OS** is an open-source operating system for launching premium mobile applications. It cuts time-to-launch from months to weeks by composing 90+ verified open-source repositories into reusable modules, each backed by cited, date-stamped research digests, store compliance playbooks, and high-end UX design engineering.

The repository is structured as a **17-module system** (M0–M17) delivered across six progressive phases (v0.1–v1.0). Phase 1 (v0.1) is strictly **docs-first** — delivering checklists, research digests, compliance playbooks, and legal templates with zero code-execution risk. Phase 2 onward introduces the `starters/expo-ts/` boilerplate and production-grade module code.

**Licensing:** The core repository is distributed under the MIT License. A License Contamination Shield CI workflow blocks GPL/AGPL dependencies from infiltrating client code. Copyleft analysis tools (Semgrep, MobSF) run only in isolated CI containers and are never linked into produced applications.

**Architecture:** Expo SDK 57+ (React Native 0.86, New Architecture / Bridgeless + Fabric), NativeWind v4, gluestack-ui primitives, TanStack Query for async state, Style Dictionary for W3C-compliant design tokens, and RevenueCat/Superwall for monetization.

---

## 2. Stakeholder Personas

### 2.1 Indie Developer — "Solo Maker"

| Field | Value |
|---|---|
| **Name** | Maya Chen |
| **Role** | Independent mobile app developer |
| **Experience** | Intermediate React Native, no dedicated design or DevOps team |
| **Goal** | Ship a polished, monetizable app to the App Store and Google Play in under 2 weeks |
| **Constraints** | Minimal budget, limited time, no legal counsel, no security expertise |
| **Primary Needs** | Copy-paste starter kit, one-click compliance checklists, production-ready paywall out of the box |
| **Pain Points** | Getting lost in configuration, missing store review guidelines, reinventing the UX wheel every project |

### 2.2 Early-Stage Startup — "Founding Engineer"

| Field | Value |
|---|---|
| **Name** | Diego Morales |
| **Role** | Founding engineer / technical co-founder |
| **Experience** | Senior full-stack developer, leading a team of 2–5 engineers |
| **Goal** | Validate product-market fit with a premium-feeling MVP that can scale to enterprise tiers |
| **Constraints** | Need rapid iteration velocity, must prove conversion/retention metrics, tight runway |
| **Primary Needs** | A/B testing integration, analytics event taxonomy, extensible backend adapter, feature flags |
| **Pain Points** | Vendor lock-in, brittle authentication code, no experimentation framework, compliance audit risk |

### 2.3 Top-Tier Agency — "Design Lead"

| Field | Value |
|---|---|
| **Name** | Sarah Okafor |
| **Role** | Design & engineering lead at a mobile-first digital agency |
| **Experience** | Expert in premium mobile UX, manages client projects across fintech, health, and luxury brands |
| **Goal** | Deliver pixel-perfect, brand-aligned apps that pass App Store review on the first submission |
| **Constraints** | Must meet strict brand guidelines, accommodate regulated verticals (GDPR, HIPAA-adjacent), impress clients with motion and interaction quality |
| **Primary Needs** | Design token system, haptic mapping matrix, store asset generation, policy monitoring, white-label customization |
| **Pain Points** | Inconsistent implementation across projects, manual compliance chasing, rework on rejections, no reusable design system |

### 2.4 OSS Maintainer — "Community Curator"

| Field | Value |
|---|---|
| **Name** | Alex Rivera |
| **Role** | Open-source project maintainer and community contributor |
| **Experience** | Experienced in open-source governance, CI/CD automation, license compliance |
| **Goal** | Sustainably maintain App Launch OS as a community-driven project with minimal friction |
| **Constraints** | Must enforce license safety, handle community contributions, prevent scope creep |
| **Primary Needs** | Automated freshness linter, license allowlist CI, clear contribution workflows, issue templates |
| **Pain Points** | License contamination, stale documentation, unmanageable issue volume, contributor drop-off |

---

## 3. Problems & Pain Points

### 3.1 Time-to-Launch is Measured in Months, Not Weeks

Modern mobile apps require expertise across 12+ domains: UI/UX, animation, security, monetization, analytics, A/B testing, backend, CI/CD, store compliance, ASO, and internationalization. No single developer or small team can credibly master all of these, yet a premium app demands excellence in every area.

### 3.2 Fragmented Tooling Creates Inconsistent Outcomes

The React Native ecosystem offers 90+ high-quality libraries, but there is no canonical integration blueprint. Developers cobble together solutions from blog posts and outdated tutorials, resulting in fragile, non-standard architectures that break on upgrades.

### 3.3 Store Rejection Rates are Exhaustingly High

Apple and Google change their review guidelines frequently. A single missed requirement — an unapproved entitlement, a missing privacy manifest entry, a non-compliant paywall — results in a 3–7 day review cycle delay. Most developers only discover rejection after submission.

### 3.4 Open-Source License Contamination is a Silent Killer

GPL/AGPL-licensed tools (MobSF, Semgrep) are essential for security scanning but, if improperly linked at build time, can trigger copyleft obligations that force entire applications open-source. Most developers have no automated guardrail against this.

### 3.5 Premature Code Shipping Causes Technical Debt

Many starter kits ship boilerplate code before shipping documentation, research, or compliance artifacts. This creates immediate bug liability, support burden, and erodes trust in the project.

### 3.6 Premium UX is Hard to Systematize

Achieving 60 FPS animations, tactile haptics, frosted glass, and skeleton loaders requires deep platform knowledge. Without codified patterns, each project reinvents these wheels inconsistently.

### 3.7 Research is Disconnected from Implementation

The mobile industry produces excellent research (RevenueCat SOSA reports, Masucci/Lopez experiments, OWASP MASVS), but it is scattered across blogs, PDFs, and conference talks. Developers rarely know what the current best practices are, let alone how to implement them.

---

## 4. Goals & Non-Goals

### 4.1 Goals

| ID | Goal | Success Criteria |
|---|---|---|
| G-1 | Reduce time-to-launch for a premium mobile app from months to under 2 weeks | Developer survey: average launch time ≤ 14 days |
| G-2 | Achieve App Store & Google Play first-submission approval rate ≥ 90% | Track submissions via community survey; rejection rate ≤ 10% |
| G-3 | Deliver a zero-risk open-source starter kit with automated license safety | Zero GPL/AGPL contamination incidents in first 1,000 forks |
| G-4 | Codify premium mobile UX into reusable, composable modules | M17-premium-ux covers 20+ interaction primitives with 100% test coverage |
| G-5 | Provide citeable, date-stamped research digests for all core decisions | Every finding in `findings/` is ≤ 90 days old per freshness linter |
| G-6 | Enable backend-agnostic data access with zero vendor lock-in | Supabase → PocketBase → custom backend migration path documented with adapter swap guide |
| G-7 | Establish a sustainable, community-driven maintenance model | ≥ 50 community contributors, ≤ 48h issue triage SLA |

### 4.2 Non-Goals

| ID | Non-Goal | Rationale |
|---|---|---|
| NG-1 | Building a proprietary SaaS platform | App Launch OS is an open-source kit, not a hosted service |
| NG-2 | Pre-translating product copy into 50+ languages | i18n architecture is documented; translation is the user's responsibility |
| NG-3 | Shipping pre-configured backend instances | Supabase/PocketBase/Appwrite are integration targets, not distributed services |
| NG-4 | Guaranteeing store approval | Playbooks and checklists maximize first-submission success, but final approval is the developer's responsibility |
| NG-5 | Providing legal advice | All legal templates carry explicit educational disclaimers requiring professional review |
| NG-6 | Supporting React Native CLI without Expo | Expo SDK 57+ is the canonical path; pure React Native is out of scope |
| NG-7 | Competing with full-stack frameworks like Flutter or SwiftUI | App Launch OS is React Native-native; cross-framework support is future scope |

---

## 5. Product Scope — v0.1 through v1.0

App Launch OS delivers value in six sequential phases, each building on the last. Code is never written before the documentation and research foundation is complete.

### 5.1 Phase 1 — v0.1: Content Foundation & Compliance Playbooks (Weeks 1–2)

| Aspect | Detail |
|---|---|
| **Theme** | Docs-first, zero code |
| **Primary Deliverables** | README.md, store submission checklists, premium-ux.md checklist, research digests, policy digests, legal/architecture templates, awesome.md, automated CI workflows |
| **Module Coverage** | M0, M1, M2, M3, M15 (CLI tooling) |
| **Target Persona** | All personas consume documentation first; indie developers get immediate value |
| **Definition of Done** | All v0.1 checklist items in `checklists/` are ≥ 90% complete; `awesome.md` lists 90+ verified repos; CI workflows enforce markdown linting and license allowlisting |

### 5.2 Phase 2 — v0.2: Design System, UX Kit & Core Starter (Weeks 3–4)

| Aspect | Detail |
|---|---|
| **Theme** | Design system and starter code |
| **Primary Deliverables** | `starters/expo-ts/` boilerplate (Expo SDK 57+, NativeWind v4, gluestack-ui), M4-design-system (3-layer tokens, 8pt grid, dark mode), M17-premium-ux (haptics, bottom sheets, blur effects) |
| **Module Coverage** | M4, M17, M0 (validation runner) |
| **Target Persona** | Indie developer, agency design lead |
| **Definition of Done** | Starter builds and passes `expo prebuild` cleanly; design token system exports 20+ semantic tokens; 3 premium interaction primitives demonstrated in playground |

### 5.3 Phase 3 — v0.3: Onboarding, Experimentation & Paywall (Weeks 5–6)

| Aspect | Detail |
|---|---|
| **Theme** | User activation and monetization |
| **Primary Deliverables** | M5-onboarding (permission priming walkthroughs), M6-experiments (OpenFeature with GrowthBook/PostHog), M8-paywall (RevenueCat + Superwall glassmorphism UI) |
| **Module Coverage** | M5, M6, M8, M12 (SEO documentation for onboarding) |
| **Target Persona** | Startup founder, indie developer |
| **Definition of Done** | Onboarding sequence completes in ≤ 3 screens; paywall A/B test launches with 3 variants; experiment framework passes SRM check |

### 5.4 Phase 4 — v0.4: Security Baseline, Release Automation & ASO (Weeks 7–8)

| Aspect | Detail |
|---|---|
| **Theme** | Security and deployment |
| **Primary Deliverables** | M9-security (OWASP MASVS v2.1 compliance scripts, Keychain/Keystore helpers), M10-release (EAS Build/Submit profiles, Fastlane lanes, staged rollouts), M11-aso (store scraper scripts, keyword optimization) |
| **Module Coverage** | M9, M10, M11, M13 (AI kit for policy scanning) |
| **Target Persona** | Agency design lead, startup founder |
| **Definition of Done** | Security baseline passes Tier 1; EAS build completes in ≤ 10 min; ASO keyword tracker runs daily |

### 5.5 Phase 5 — v0.5: Growth Loops, SEO Kit & PolicyBot (Weeks 9–10)

| Aspect | Detail |
|---|---|
| **Theme** | Growth and automation |
| **Primary Deliverables** | M7-growth (referral engine, branded dynamic share cards, universal deep links), M12-seo (Docusaurus docs site, OpenGraph generators, `llms.txt`), M16-policybot (GitHub Actions bot tracking store policy updates) |
| **Module Coverage** | M7, M12, M16, M15 (CLI freshness linter) |
| **Target Persona** | Startup founder, OSS maintainer |
| **Definition of Done** | Referral flow tracked end-to-end; SEO docs site deploys from GitHub Actions; PolicyBot detects ≥ 1 policy change per month |

### 5.6 Phase 6 — v1.0: Playground App & Community Case Studies (Weeks 11–12)

| Aspect | Detail |
|---|---|
| **Theme** | Showcase and validation |
| **Primary Deliverables** | M14-playground (full-featured showcase app demonstrating all 17 modules), community case studies of apps launched using App Launch OS |
| **Module Coverage** | M14, M13 (repomix/gitingest prompt engineering), all modules integrated |
| **Target Persona** | All personas (reference implementation) |
| **Definition of Done** | Playground runs on iOS, Android, and web; ≥ 3 community case studies published; v1.0 release tagged |

---

## 6. Module Contracts (M0–M17)

Each module is a self-contained, composable package with a defined contract: inputs, outputs, dependencies, tier classification (Core / Recommended / Alternative / Advanced / Utility / Standard), and the v0.x phase in which it first ships.

| Module | Name | Contract Summary | Tier | Phase |
|---|---|---|---|---|
| **M0** | Checklists & Validation Runner | Inputs: markdown checklist files in `checklists/`. Outputs: validation status dashboard, CI pass/fail. Dependencies: none. Contract: every checklist item is machine-verifiable or explicitly marked manual. Status: v0.1 | Core | v0.1 |
| **M1** | Template Generator | Inputs: template files in `templates/`, user configuration overrides. Outputs: generated `privacy-policy.md`, `terms-of-service.md`, `event-taxonomy.md`, etc. Dependencies: `templates/` directory. Contract: templates render with Mustache-style placeholders; all output includes educational disclaimer. Status: v0.1 | Core | v0.1 |
| **M2** | Research Digest Framework | Inputs: cited, date-stamped sources (RevenueCat, PostHog, OWASP, etc.). Outputs: markdown digests in `findings/`. Dependencies: `findings/` directory. Contract: every digest includes source URL, publication date, and ≤ 90-day freshness. | Core | v0.1 |
| **M3** | Awesome List Curation | Inputs: curated list of 90+ repos in `awesome.md`. Outputs: categorized, license-verified directory. Dependencies: license-check CI. Contract: every listed repo has a verified license and use-case description; quarterly update cadence. | Core | v0.1 |
| **M4** | Design System | Inputs: primitive design tokens (colors, spacing, typography). Outputs: 3-layer W3C-compliant token hierarchy via Style Dictionary; 8pt grid; dark mode; accessibility contrast. Dependencies: Style Dictionary, NativeWind. Contract: tokens compile to React Native, CSS, and Figma variables; WCAG AA compliant. Status: v0.2 | Core | v0.2 |
| **M5** | Onboarding | Inputs: app feature set, permission requirements. Outputs: permission priming screens, interactive walkthroughs, value-first activation funnel. Dependencies: Expo Router, Lottie. Contract: first-time flow ≤ 3 screens; soft-prompt permission pattern; aha-moment detected within 10 seconds. | Recommended | v0.3 |
| **M6** | Experiments | Inputs: feature flag definitions, experiment configs. Outputs: A/B test variants, SRM validation, CUPED variance reduction. Dependencies: OpenFeature, GrowthBook, PostHog. Contract: feature flags resolve in ≤ 50ms; SRM check auto-fails CI if p < 0.01. | Recommended | v0.3 |
| **M7** | Growth Loops | Inputs: referral program config, share content. Outputs: referral engine, branded dynamic share cards, universal deep links. Dependencies: Supabase Functions / Edge Functions. Contract: referral attribution tracked end-to-end; share card renders in ≤ 2s. | Recommended | v0.5 |
| **M8** | Paywall | Inputs: subscription tiers, pricing, trial config. Outputs: RevenueCat + Superwall paywall with frosted glass backdrop. Dependencies: RevenueCat SDK, Superwall SDK, expo-blur. Contract: paywall renders in ≤ 300ms; transparent terms display; restore purchases accessible in ≤ 1 tap. | Core | v0.3 |
| **M9** | Security | Inputs: app codebase, dependency tree. Outputs: MASVS v2.1 compliance scripts, Keychain/Keystore helpers, TLS pinning config. Dependencies: osv-scanner, react-native-keychain. Contract: Tier 1 baseline achievable in ≤ 30 min; Tier 2 adds Semgrep/MobSF in isolated containers. | Core | v0.4 |
| **M10** | Release | Inputs: app build config, store credentials. Outputs: EAS Build/Submit profiles, Fastlane lanes, staged rollout config, OTA update hooks. Dependencies: EAS CLI, Fastlane. Contract: production build completes in ≤ 10 min; staged rollout starts at 1% with auto-escalation. | Core | v0.4 |
| **M11** | ASO | Inputs: app metadata, keyword targets, competitor data. Outputs: keyword discovery scripts, metadata localization, screenshot hierarchy. Dependencies: app-store-scraper, google-play-scraper. Contract: keyword ranking tracked daily; screenshot captions localized for top 3 markets. | Recommended | v0.4 |
| **M12** | SEO | Inputs: documentation content, design assets. Outputs: Docusaurus site, OpenGraph generators, social cards, `llms.txt`. Dependencies: Docusaurus, repomix. Contract: docs site deploys from GitHub Actions; `llms.txt` generated automatically on release. | Recommended | v0.5 |
| **M13** | AI Kit | Inputs: codebase, user prompts. Outputs: repomix/gitingest packaging workflow, prompt templates. Dependencies: repomix, gitingest, autoresearch. Contract: codebase packages into ≤ 100K tokens for LLM context; autoresearch loop runs Modify → Verify → Keep/Discard. | Utility | v0.5 |
| **M14** | Playground | Inputs: all 17 modules. Outputs: interactive showcase app (iOS, Android, web). Dependencies: all modules. Contract: every module has a demonstrable screen in the playground; e2e tests pass on Maestro. | Advanced | v1.0 |
| **M15** | CLI | Inputs: repository state, user commands. Outputs: attribution generator, freshness linter. Dependencies: Node.js, osv-scanner. Contract: `app-launch-os freshness` flags items > 90 days old; `app-launch-os license` generates `LICENSES/THIRD-PARTY-NOTICES.md`. Status: v0.1 (CLI shell) | Core | v0.1 |
| **M16** | PolicyBot | Inputs: store review guideline sources (Apple, Google). Outputs: GitHub Actions bot detecting policy changes. Dependencies: gpt-researcher, GitHub Actions. Contract: detects ≥ 1 policy change per month; posts summary to issue tracker within 24h. | Utility | v0.5 |
| **M17** | Premium UX Kit | Inputs: design tokens, animation configs. Outputs: haptics engine, gesture handler wrappers, bottom sheet, blur effects, skeleton loaders, 60 FPS animation library. Dependencies: react-native-reanimated, expo-haptics, react-native-gesture-handler, expo-blur. Contract: all animations maintain 60 FPS floor (120 FPS target); haptics mapped per interaction matrix; reduced motion respected. Status: v0.2 | Core | v0.2 |

### Module Dependency Graph

```
M0 ──► M4 ◄── M17
M1 ──► M8 ◄── M4
M2 ◄── M15
M3 ◄── M15
M5 ◄── M8
M6 ◄── M12
M7 ◄── M6
M9 ◄── M10
M10 ◄── M14
M11 ◄── M10
M12 ◄── M13
M13 ◄── M14
M14 ◄── M0
M16 ◄── M2
```

---

## 7. User Journeys

### 7.1 Journey 1: Indie Developer Launches First Premium App

**Actor:** Maya (Indie Developer)
**Goal:** Ship a subscription-based habit-tracking app with premium UI to the App Store in 10 days.

| Step | Action | Module(s) | Touchpoint | Success Criteria |
|---|---|---|---|---|
| 1 | Discovers App Launch OS via GitHub | M3 | `awesome.md`, README | Finds repo within first Google search page |
| 2 | Reads PRD and phased roadmap | — | `docs/prd.md`, README | Understands docs-first approach, no code risk |
| 3 | Runs validation runner on checklists | M0 | CLI / CI | All v0.1 checklists pass green |
| 4 | Generates privacy policy & ToS from templates | M1 | `app-launch-os generate policy` | Templates render with customization guide |
| 5 | Reads premium UX research digest | M2 | `findings/premium-ux.md` | Understands 8pt grid, haptic mapping, motion tokens |
| 6 | Clones `starters/expo-ts/` boilerplate | M4, M17 | `git clone` | Starter builds with 0 errors on `expo prebuild` |
| 7 | Customizes design tokens for brand colors | M4 | Style Dictionary output | Brand colors compile to all platforms |
| 8 | Reads paywall design psychology digest | M2 | `findings/paywall.md` | Understands 3-day trial, frosted glass, opt-out strategy |
| 9 | Integrates RevenueCat + Superwall paywall | M8 | `modules/M8-paywall/` | Paywall renders with glassmorphism UI |
| 10 | Follows App Store submission checklist | M0 | `checklists/appstore-submission.md` | No rejection on first submission |
| 11 | Configures EAS Build/Submit | M10 | `modules/M10-release/` | App builds and submits successfully |
| 12 | Submits to App Store | — | App Store Connect | App approved on first review |

### Journey 2: Startup Founder Validates Monetization with A/B Tests

**Actor:** Diego (Startup Founder)
**Goal:** Determine the optimal subscription price point for a fitness app within 2 weeks.

| Step | Action | Module(s) | Touchpoint | Success Criteria |
|---|---|---|---|---|
| 1 | Reads experimentation research digest | M2 | `findings/experiments.md` | Understands 1/3 rule, SRM checks, sample sizing |
| 2 | Sets up feature flags for pricing variants | M6 | OpenFeature wrapper | 3 pricing variants defined in GrowthBook |
| 3 | Integrates PostHog analytics | M12 | Event taxonomy template | `event-taxonomy.md` deployed with 20 tracked events |
| 4 | Configures Superwall paywall variants | M8 | Superwall dashboard | Paywall layout A/B tested remotely |
| 5 | Launches experiment to 5% of users | M6 | OpenFeature | Variant exposure balanced; SRM passes |
| 6 | Monitors conversion and LTV metrics | M12 | PostHog dashboard | Conversion difference significant at p < 0.05 |
| 7 | Rolls out winning variant to 100% | M6 | Feature flag toggle | Revenue increases ≥ 15% week-over-week |

### Journey 3: Agency Delivers a Regulated Fintech App

**Actor:** Sarah (Agency Design Lead)
**Goal:** Build a PSD2-compliant budgeting app for a European bank with zero store rejections.

| Step | Action | Module(s) | Touchpoint | Success Criteria |
|---|---|---|---|---|
| 1 | Reviews MASVS compliance checklist | M9 | `checklists/security-baseline.md` | Tier 1 baseline passes; Tier 2 hardening planned |
| 2 | Configures react-native-keychain for secure storage | M9 | `modules/M9-security/` | Credentials stored in Secure Enclave / Android Keystore |
| 3 | Applies 3-layer design token system | M4 | Style Dictionary | Bank brand colors + WCAG AA compliance verified |
| 4 | Implements haptics for transaction confirmations | M17 | Haptic mapping matrix | Tactile feedback for success/error per table |
| 5 | Reads privacy compliance guide | M2 | `policies/privacy-compliance.md` | Apple Privacy Manifest + GDPR compliance confirmed |
| 6 | Configures PolicyBot to track PSD2 changes | M16 | GitHub Actions | PolicyBot posts 1 update/month minimum |
| 7 | Uses app icon engineering guidelines | M2 | `findings/aso.md` | Icon passes focal point test at 29×29pt |
| 8 | Submits using launch-day runbook | M0 | `checklists/launch-day.md` | App approved on first submission |

### Journey 4: Maintainer Keeps Repository Healthy

**Actor:** Alex (OSS Maintainer)
**Goal:** Process 50 community PRs/month without license contamination or stale docs.

| Step | Action | Module(s) | Touchpoint | Success Criteria |
|---|---|---|---|---|
| 1 | Reviews PR with license-check CI | M15, M9 | GitHub Actions | GPL/AGPL dependencies auto-rejected |
| 2 | Runs freshness linter on changed docs | M15 | `app-launch-os freshness` | No findings older than 90 days pass CI |
| 3 | Uses contribution templates | M0 | `.github/ISSUE_TEMPLATE/`, `CONTRIBUTING.md` | All issues follow prescribed template |
| 4 | Monitors PolicyBot alerts | M16 | GitHub Issues | Policy changes triaged within 24h |
| 5 | Reviews community case studies | M2 | `findings/` | 3+ new case studies published per quarter |

---

## 8. Quality, Security & Compliance Requirements

### 8.1 Quality Requirements

| Requirement | Standard | Verification Method |
|---|---|---|
| Code formatting | Prettier + ESLint | CI workflow `ci.yml` |
| Markdown linting | markdownlint + alex (inclusive language) | CI workflow `ci.yml` |
| Typography & spacing | Strict 8-point geometric grid | Manual review against `premium-ux.md` checklist |
| Animation frame rate | 60 FPS floor, 120 FPS target | Device testing on ProMotion hardware |
| Touch target size | ≥ 44×44 pt (iOS), ≥ 48×48 dp (Android) | `checklists/accessibility.md` automated scan |
| Contrast ratio | WCAG AA: 4.5:1 body, 3:1 large text | `checklists/security-baseline.md` |
| Documentation freshness | ≤ 90 days for all research claims | M15 freshness linter |
| Test coverage | ≥ 80% for all shipped code modules | Jest + Maestro E2E coverage report |
| Accessibility | Dynamic Type, VoiceOver/TalkBack support | `checklists/accessibility.md` |

### 8.2 Security Requirements

App Launch OS adopts a **three-tier progressive security posture** (per ADR-003 in IMPLEMENTATION_PLAN.md):

#### Tier 1 — Baseline (Mandatory for all apps)

| Requirement | Implementation | Module |
|---|---|---|
| Dependency vulnerability scanning | `osv-scanner` in CI, runs on every push | M9 |
| Secure credential storage | `react-native-keychain` (iOS Secure Enclave) / Android Keystore | M9 |
| No plaintext secrets in storage | Zero sensitive data in AsyncStorage; use MMKV encrypted | M17 |
| Minimum SDK versions | iOS 15+, Android API 24+ (covers 99% of active devices) | M10 |
| Transport security | TLS 1.3 enforced for all network calls | M9 |

#### Tier 2 — Hardened (Required for regulated verticals: fintech, health, finance)

| Requirement | Implementation | Module |
|---|---|---|
| SAST scanning | Semgrep in isolated CI container | M9 |
| Mobile security framework | MobSF APK/IPA analysis in Docker container | M9 |
| Certificate pinning | `react-native-cert-pinner` or native network security config | M9 |
| Threat modeling | STRIDE template in `templates/threat-model.md` | M1 |

#### Tier 3 — Enterprise (Required for highly regulated: healthcare, government, BFSI)

| Requirement | Implementation | Module |
|---|---|---|
| Device integrity attestation | Play Integrity (Android) / DeviceCheck (iOS) | M9 |
| Network security configuration | Platform-level NSURLSession / Network Security Config | M9 |
| Zero-trust auth | Better Auth with multi-session, passkey support | M2B (future) |

### 8.3 Compliance Requirements

| Regulation | Requirement | Module |
|---|---|---|
| **Apple App Store** | Review guideline compliance per date-stamped checklist | M0, M10 |
| **Google Play** | Target API level compliance, Safety Section, test track requirements | M0, M10 |
| **GDPR** | Lawful basis documentation, data minimization, right to deletion | M2, M1 |
| **Apple ATT** | AppTrackingTransparency framework integration | M9 |
| **Apple Privacy Manifest** | Privacy Nutrition Label + Tracking Declaration | M9, M1 |
| **CCPA** | Do Not Sell opt-out, consumer right to know | M2 |
| **COPPA** | Age gate, parental consent flow (if app targets children) | M5, M9 |
| **OWASP MASVS v2.1** | 24 verified controls across 8 security domains | M9 |
| **License Compliance** | Automated allowlist blocking GPL/AGPL; third-party notices | M15, M9 |

### 8.4 Legal Safeguards

| Safeguard | Implementation |
|---|---|
| Permissive licensing | Core repo under MIT License |
| License contamination shield | CI workflow blocks GPL/AGPL in allowlisted dependencies |
| Copyleft isolation | Semgrep, MobSF run only in standalone CI containers |
| Educational disclaimers | All privacy policy, ToS, DPA templates include "NOT LEGAL ADVICE" banner |
| Nominative fair use | Apple, Google, Expo mentioned by name only for accuracy, never as branding |

---

## 9. Success Metrics

### 9.1 Adoption Metrics (Repository)

| Metric | Target | Data Source | Frequency |
|---|---|---|---|
| GitHub stars | 1,000 by v1.0 | GitHub API | Weekly |
| Unique clones | 500/week by v1.0 | GitHub Insights | Weekly |
| Forks | 200 by v1.0 | GitHub API | Weekly |
| Contributors (non-author commits) | ≥ 50 by v1.0 | GitHub API | Monthly |

### 9.2 Developer Success Metrics

| Metric | Target | Data Source | Frequency |
|---|---|---|---|
| Time-to-first-app-launch | ≤ 2 hours (from clone to `expo start`) | Community survey | Quarterly |
| Time-to-first-store-submission | ≤ 14 days (for indie developer) | Community survey | Quarterly |
| First-submission approval rate | ≥ 90% | Community survey | Quarterly |
| Starter build success rate | ≥ 95% (clean install) | CI pipeline | Per release |

### 9.3 Quality Metrics

| Metric | Target | Data Source | Frequency |
|---|---|---|---|
| Documentation freshness | 100% of citations ≤ 90 days old | M15 linter | Daily (CI) |
| License safety incidents | 0 GPL/AGPL contamination events | GitHub issue tracker | Per release |
| CI pass rate | ≥ 98% | GitHub Actions | Per commit |
| Code coverage (shipped modules) | ≥ 80% | Jest coverage report | Per release |
| Accessibility checklist pass rate | 100% | `accessibility.md` validation | Per release |

### 9.4 Growth Metrics

| Metric | Target | Data Source | Frequency |
|---|---|---|---|
| Community case studies published | ≥ 3 by v1.0 | `findings/` directory | Quarterly |
| PolicyBot detections | ≥ 1/month (confirms it's working) | GitHub Issues | Monthly |
| SEO docs site organic traffic | 1,000 unique visitors/month by v1.0 | Docusaurus analytics | Monthly |
| Awesome list forks/attribution | Tracked via stars | GitHub | Monthly |

---

## 10. Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R-1 | **License contamination** — GPL/AGPL deps infiltrate client code | Medium | Critical | Automated allowlist CI; copyleft tools in isolated containers only | M9, M15 |
| R-2 | **Policy staleness** — Apple/Google change guidelines | High | High | Date-stamped docs; freshness linter (≤ 90 days); PolicyBot scanner | M15, M16 |
| R-3 | **Legal exposure** — User copies template, faces regulatory action | Low | Critical | Prominent educational disclaimers on all legal templates; no attorney-client relationship implied | M1 |
| R-4 | **Scope creep** — Premature code shipping before docs validated | High | Medium | Strict docs-first roadmap; code phase gated on v0.1 completion sign-off | Project lead |
| R-5 | **Maintainer fatigue** — High issue volume, low contribution quality | Medium | High | Issue templates with required triage checklists; good-first-issue labels; 48h SLA | OSS maintainer |
| R-6 | **Ecosystem drift** — Expo/RN upgrade breaks starter | Medium | Medium | Pin SDK version in starter; automated dependency update PRs | M0, M15 |
| R-7 | **Premium UX performance** — Animations drop below 60 FPS | Medium | Medium | Worklet-based animations on UI thread; performance budget enforced in playground tests | M17 |
| R-8 | **Store rejection** — Paywall or privacy flow non-compliant | Medium | High | M0 store submission checklists; M10 release automation; manual review before publish | M0, M10 |
| R-9 | **Backend lock-in** — Users can't migrate from Supabase | Low | High | M2ADR-002 abstraction; complete adapter swap guides for PocketBase, Better Auth, Appwrite | M2 |
| R-10 | **Research decay** — Findings become outdated | High | Medium | Freshness linter flags >90 days; quarterly digest review cycle | M2, M15 |
| R-11 | **AI dependency fragility** — gpt-researcher / PolicyBot output quality | Low | Medium | Human-in-the-loop review; PolicyBot posts to issues for maintainer triage, never auto-merges | M16 |

---

## 11. Open Questions

| ID | Question | Impact | Proposed Resolution |
|---|---|---|---|
| O-1 | Should App Launch OS eventually support a pure React Native CLI path (no Expo)? | M10 (Release), M14 (Playground) | Out of scope for v1.0; revisit if community demand exceeds 100 upvoted issues |
| O-2 | Should the design system ship pre-translated copy for any languages, or remain code-only? | M4, M12 (SEO) | Code-only; i18n architecture documented; translation is user responsibility (per ADR-004) |
| O-3 | Should App Launch OS offer a hosted playground or remain locally-runnable only? | M14 (Playground) | Locally-runnable only; 100% static, serverless per safe open-source guarantee #5 |
| O-4 | How should the research digest contribution workflow handle conflicting sources? | M2 (Research) | Primary source = implementation-plan author's citation; community can submit RFC with counter-evidence |
| O-5 | Should M16 PolicyBot integrate directly with App Store Connect / Play Developer API, or rely on RSS/scraper? | M16 (PolicyBot) | Start with RSS + scraper; API integration is v1.0 milestone |
| O-6 | Should the paywall module standardize on RevenueCat or Superwall as the primary path? | M8 (Paywall) | Dual-first; RevenueCat as default (industry standard), Superwall as recommended for remote A/B |
| O-7 | How frequently should the `awesome.md` list be re-verified? | M3 (Awesome) | Quarterly automated verification + community submissions; freshness linter flags >90 days |
| O-8 | Should M13 AI Kit support local LLMs (e.g., llama.cpp) or cloud-only? | M13 (AI Kit) | Local-first optional; cloud LLM as default for quality; local for air-gapped environments (future) |
| O-9 | What is the governance model for accepting new modules beyond M17? | Project-wide | RFC process via `.github/ISSUE_TEMPLATE/`; new modules require 3+ maintainer approvals (v1.0+) |
| O-10 | Should the CLI (M15) eventually become an installable npm package (npx) or remain repo-local? | M15 (CLI) | Repo-local in v0.1–v0.5; npx-installable package targeted for v1.0 milestone |

---

## Appendix: Documentation vs. Code Scope

This PRD clearly distinguishes between **current documentation artifacts** (in scope for v0.1) and **future code modules** (phased for v0.2+).

### Current Documentation Scope (v0.1 — Phase 1)

These files are **already defined conceptually** and will be delivered as **static markdown, JSON, and YAML configuration files** with no executable application code:

| Path | Content Type | Executable Code? |
|---|---|---|
| `README.md` | Visual identity, module matrix, quickstart | No |
| `checklists/*.md` | Validation checklists (P0–P2) | No |
| `findings/*.md` | Research digests (cited, date-stamped) | No |
| `policies/*.md` | Store policy guides (Apple, Google, privacy) | No |
| `templates/*.md` | Legal & architecture templates | No |
| `awesome.md` | Curated 90+ repo directory | No |
| `LICENSES/THIRD-PARTY-NOTICES.md` | License attribution | No |
| `.github/workflows/*.yml` | CI workflows (lint, license-check, freshness) | No (YAML only) |
| `.github/ISSUE_TEMPLATE/*` | Issue templates | No |
| `CONTRIBUTING.md` | Contribution guidelines | No |
| `IMPLEMENTATION_PLAN.md` | Architecture blueprint | No |
| `docs/prd.md` | This document | No |

> **Note:** The CLI tool in M15 ships as a **shell script (`app-launch-os`)** in v0.1 that wraps lint and freshness checks. The full Node.js CLI package (npx-installable) is a v1.0 milestone (see O-10).

### Future Code Scope (v0.2–v1.0 — Phases 2–6)

These modules will be delivered as **executable TypeScript/JavaScript package code** imported by the `starters/expo-ts/` boilerplate:

| Module | First Code Delivery | Language |
|---|---|---|
| M4-design-system | v0.2 | TypeScript + Style Dictionary |
| M5-onboarding | v0.3 | TypeScript + React Native |
| M6-experiments | v0.3 | TypeScript + OpenFeature |
| M7-growth | v0.5 | TypeScript + Supabase Functions |
| M8-paywall | v0.3 | TypeScript + React Native |
| M9-security | v0.4 | TypeScript + native modules |
| M10-release | v0.4 | TypeScript (EAS/Fastlane config) |
| M11-aso | v0.4 | TypeScript + Python scripts |
| M12-seo | v0.5 | MDX + Docusaurus |
| M13-ai-kit | v0.5 | Python + Node.js |
| M14-playground | v1.0 | TypeScript + React Native |
| M17-premium-ux | v0.2 | TypeScript + React Native |

---

*This PRD is maintained in parallel with `IMPLEMENTATION_PLAN.md`. Any conflicts should be resolved in favor of `IMPLEMENTATION_PLAN.md` as the canonical architecture document. This PRD defines the "what" and "why"; `IMPLEMENTATION_PLAN.md` defines the "how".*

*License: MIT — see `LICENSE` file for full text.*

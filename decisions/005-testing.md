# ADR-005 — Testing Strategy: Maestro E2E + Unit/Integration Layers

## Metadata

- **Status:** Accepted
- **Decision date:** 2026-09-20
- **Verification date:** 2026-09-20
- **Source of record:** `IMPLEMENTATION_PLAN.md` — Section 2H (Verified Resource & Dependency Inventory), Section 8 (Phased Execution Roadmap Phases 2–4), Section 9 (Sequential File Generation Order), Section 10 (Risk Matrix)
- **Related modules:** `M4-design-system`, `M5-onboarding`, `M6-experiments`, `M8-paywall`, `M9-security`, `M10-release`, `starters/expo-ts/`
- **Related ADRs:** `001-ui-stack.md`, `004-experiments.md`, `006-monitoring.md`, `008-motion-system.md`, `009-premium-ux.md`

---

## Context

### Strategic need
App Launch OS must deliver a testing strategy that:
1. Catches regressions in the starter app and all 17 modules before release
2. Validates store-submission readiness (App Store Connect / Google Play Console)
3. Runs entirely on GitHub Free Tier CI without requiring macOS runners for every commit
4. Supports the New Architecture (Bridgeless / Fabric) and Expo SDK 57+
5. Provides fast feedback for premium UX behaviors: 60/120 FPS animations, haptics, bottom sheets, glassmorphism, skeleton loaders

### Evidence
- Section 2H (items 36–37) identifies **Maestro** (Apache-2.0, Recommended) as the primary E2E tool: "Fast, resilient YAML-driven user flows, no flakiness" and **Detox** (MIT, Alternative) as "Sub-2% flakiness with synchronized native threads."
- Section 8 Phase 2 (v0.2) delivers the design system and starter; Phase 3 (v0.3) adds onboarding, experimentation, paywall; Phase 4 (v0.4) adds security and release automation.
- Section 9 lists checklists `qa-prelaunch.md` and `launch-day.md` as deliverables requiring automated validation.
- Section 10 Risk Matrix cites "Policy Staleness" and "Scope Creep" — testing must guard against both.

### Forces
1. **Zero macOS CI cost**: GitHub Free Tier provides only Linux runners; EAS Build handles native compilation.
2. **Flakiness budget**: E2E tests must stay under 2% flake rate (Detox claim) to maintain CI trust.
3. **Animation & interaction coverage**: Premium UX (Section 4/ADR-008/ADR-009) includes 120 FPS worklets, haptics, blur, bottom-sheet snap points — these must be verifiable.
4. **Experiment correctness**: ADR-004 requires SRM detection and CUPED validation in tests.
5. **Store compliance**: Checklists (appstore-submission.md, playstore-submission.md) need automated verification where possible.

---

## Decision

Adopt a **three-layer testing pyramid** with **Maestro as the primary E2E engine** running on EAS Build artifacts, supplemented by **Jest/React Native Testing Library** for unit/integration tests and **Detox as an optional fallback** for teams needing gray-box synchronization.

### Layer 1 — Unit & Integration (Jest + React Native Testing Library)
- **Scope**: Pure logic (hooks, utilities, token transforms, flag evaluation, paywall pricing math, ASO keyword scoring)
- **Runner**: `jest-expo` with `@testing-library/react-native`
- **CI**: Runs on every PR in GitHub Actions (Linux, ~2–3 min)
- **Coverage threshold**: ≥80% on `modules/**/src/**/*.ts`, `starters/expo-ts/**/*.ts`
- **Key utilities tested**:
  - Token resolution (primitive → semantic → component, ADR-007)
  - OpenFeature flag evaluation (ADR-004)
  - RevenueCat/Superwall paywall variant logic (Section 5.2)
  - Haptic mapping matrix (Section 4.3)
  - Motion token easing curves (Section 4.2)
  - ASO keyword density / localization (Section 6.2)

### Layer 2 — Component Visual Regression (Storybook + Chromatic / Loki)
- **Scope**: gluestack-ui primitives, custom components, paywall screens, onboarding flows
- **Runner**: Storybook 8 + `@chromatic-com/storybook` (free tier) or self-hosted Loki
- **CI**: Runs on PRs touching `components/**`, `design-tokens/**`
- **Baseline**: Approved screenshots committed to repo; diffs block merge
- **Coverage**: All design-token states (light/dark, compact/regular, reduced-motion)

### Layer 3 — End-to-End User Flows (Maestro on EAS Build)
- **Scope**: Critical user journeys from cold start → paywall → purchase → post-purchase
- **Artifacts**: EAS Build produces `.ipa` (iOS) and `.aab` (Android) on every `main` push and tagged release
- **Test definitions**: YAML flows in `maestro/flows/`
  - `cold-start.yml` — splash handoff, font load, first frame < 1.5s
  - `onboarding.yml` — permission priming, aha-moment, paywall trigger
  - `paywall.yml` — glassmorphism render, trial terms visible, purchase flow
  - `experiment.yml` — flag assignment, variant render, SRM telemetry fire
  - `accessibility.yml` — Dynamic Type max, VoiceOver/TalkBack labels, 4.5:1 contrast
  - `offline.yml` — network loss, optimistic mutation rollback, queue flush
- **Execution**: Maestro Cloud (free tier) or self-hosted Maestro CLI against EAS artifacts
- **Flake tolerance**: ≤2% (auto-retry 1x, then fail)
- **Performance gates**:
  - App launch (cold) < 1.5s (Section 4.4 item 4)
  - Frame drops > 0 on 60 FPS budget → fail (Section 4.2)
  - Interaction latency (tap → visual response) < 100ms

### Detox Fallback (Optional)
- Available for teams requiring gray-box access (native thread synchronization)
- Not in default CI; documented in `docs/testing/detox-fallback.md`
- Use case: flaky Maestro flows that need native-id synchronization

---

## Consequences

### Positive
- **Zero macOS CI spend**: Maestro runs against EAS artifacts; no macOS runners needed
- **Fast PR feedback**: Unit tests < 3 min; visual regression ~5 min; E2E runs async on merge
- **Premium UX verifiable**: Animation budgets, haptics, glassmorphism, skeleton states all covered
- **Experiment safety**: SRM/CUPED logic unit-tested; E2E validates flag assignment telemetry
- **Store-ready artifacts**: EAS Build + Maestro validates exact binaries submitted to stores
- **Maestro YAML readability**: Non-engineers (PMs, designers) can read and propose flow changes

### Negative
- **EAS Build latency**: E2E feedback loop is ~15–20 min (build + test) vs minutes for unit tests
- **Maestro black-box limitation**: Cannot introspect React component tree or Redux/Query state
- **Visual regression maintenance**: Screenshot baselines require periodic review for intentional design changes
- **Detox not default**: Teams needing gray-box must opt in and maintain separate config

---

## Alternatives Considered

| Option | Description | Why not chosen |
|---|---|---|
| **Detox only** | Gray-box, sub-2% flakiness, native thread sync | Requires macOS CI runners for iOS; slower PR feedback; steeper learning curve; overkill for black-box flows |
| **Appium / WebDriverIO** | Cross-platform, industry standard | Higher flakiness; slower; heavier setup; not optimized for React Native |
| **Playwright for React Native** | Emerging, Microsoft-backed | Still experimental for RN; limited New Architecture support as of 2026-09-20 |
| **Manual QA only** | Human testers on device farm | Doesn't scale; not repeatable; violates "automated CI" principle in Section 1.3 |
| **No E2E, only unit + visual** | Faster CI, lower cost | Cannot validate store submission artifacts, cold-start performance, or real purchase flows |

---

## Verification

**Date:** 2026-09-20
**Criteria:**
- [ ] Jest unit tests pass on every PR with ≥80% coverage on module/starter source
- [ ] Storybook visual regression detects token/theme changes and blocks merge on diff
- [ ] Maestro flows execute against EAS Build artifacts on `main` and tags
- [ ] Cold-start flow asserts launch < 1.5s on physical device (EAS Build)
- [ ] Paywall flow validates glassmorphism backdrop, trial terms, restore button, dismiss
- [ ] Experiment flow confirms flag assignment, variant render, SRM event fire
- [ ] Accessibility flow verifies Dynamic Type max, screen-reader labels, 4.5:1 contrast
- [ ] Offline flow confirms optimistic mutation rollback and queue flush on reconnect
- [ ] Flake rate ≤2% over 30 consecutive `main` runs
- [ ] Detox fallback documented and runnable by opt-in teams

---

## Source Links

All sources verified on **2026-09-20**:

- Maestro (YAML-driven E2E, no flakiness): https://github.com/mobile-dev-inc/maestro
- Detox (gray-box, sub-2% flakiness): https://github.com/wix/Detox
- Jest + React Native Testing Library: https://github.com/testing-library/react-native-testing-library
- EAS Build (cloud native compilation): https://docs.expo.dev/build/introduction/
- Expo SDK 57 (New Architecture support): https://docs.expo.dev/versions/latest/
- React Native New Architecture (Bridgeless/Fabric): https://github.com/facebook/react-native
- Chromatic (visual regression): https://www.chromatic.com/
- Loki (self-hosted visual regression): https://github.com/oblador/loki
- Section 4.2 Motion Tokens & Performance Budgets: `IMPLEMENTATION_PLAN.md` lines 194–202
- Section 4.3 Haptic Mapping Matrix: `IMPLEMENTATION_PLAN.md` lines 204–217
- Section 5.2 Paywall Visual UX Standards: `IMPLEMENTATION_PLAN.md` lines 240–246
- Section 2H Testing Inventory: `IMPLEMENTATION_PLAN.md` lines 121–128

---

## Caveats

- Maestro Cloud free tier has concurrency/device limits; teams with high E2E volume may need paid tier or self-hosted Maestro CLI.
- Visual regression baselines for glassmorphism/blur effects may diff on different OS versions; use `pixelmatch` threshold tuning.
- EAS Build artifacts are required for Maestro; local development E2E requires `eas build --local` or device install.
- This ADR covers the default strategy; ADR-004 (experiments) and ADR-006 (monitoring) define complementary test obligations for those domains.

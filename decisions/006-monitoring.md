# ADR-006 — Monitoring & Observability: Sentry + OpenTelemetry Foundation

## Metadata

- **Status:** Accepted
- **Decision date:** 2026-09-20
- **Verification date:** 2026-09-20
- **Source of record:** `IMPLEMENTATION_PLAN.md` — Section 2H (Verified Resource & Dependency Inventory), Section 8 (Phased Execution Roadmap Phase 4), Section 10 (Risk Matrix)
- **Related modules:** `M9-security`, `M10-release`, `M6-experiments`, `M8-paywall`, `starters/expo-ts/`
- **Related ADRs:** `003-cicd.md`, `004-experiments.md`, `005-testing.md`, `009-premium-ux.md`

---

## Context

### Strategic need
App Launch OS must provide production-grade observability that:
1. Captures **native + JS crashes** with symbolicated stack traces (iOS .dSYM, Android ProGuard/R8 mappings)
2. Emits **performance traces** for cold start, screen loads, paywall render, purchase latency
3. Tracks **experiment exposure & outcomes** (ADR-004 SRM, CUPED, variant assignment)
4. Monitors **premium UX health**: frame drops, haptic failures, animation jank, skeleton→content swaps
5. Runs on **GitHub Free Tier** with zero infrastructure cost for the default path
6. Supports **self-hosted alternative** for teams with data residency requirements

### Evidence
- Section 2H (items 38–39) identifies **Sentry RN SDK** (MIT, Recommended) for "Real-time native + JS stack traces, session telemetry" and **GlitchTip** (MIT, Alternative) as "Sentry-compatible API with 100% open-source backend."
- Section 8 Phase 4 (v0.4) delivers `modules/M9-security/` with automated MASVS compliance and `modules/M10-release/` with EAS Build/Submit profiles — monitoring must integrate with both.
- Section 10 Risk Matrix cites "Policy Staleness" — monitoring must detect store policy violations (crash rate spikes, ANR rates) that trigger review rejections.

### Forces
1. **Zero hosting cost default**: Sentry Free Tier (5k errors/mo, 10M transactions/mo) covers indie/early-stage; GlitchTip for self-hosted.
2. **Native crash fidelity**: React Native New Architecture (Bridgeless) requires proper native symbol upload (dSYM, mapping.txt).
3. **OpenTelemetry alignment**: Vendor-neutral instrumentation future-proofs against Sentry/GlitchTip lock-in.
4. **Premium UX metrics**: Section 4.2 defines 60/120 FPS budgets; Section 4.3 defines haptic mappings — these need custom metrics.
5. **Experiment telemetry**: ADR-004 requires SRM events, CUPED adjustments, flag exposure logs.
6. **Paywall funnel**: Section 5.1/5.2 require trial start, purchase, renewal, cancellation tracking.

---

## Decision

Standardize on **Sentry React Native SDK** as the default observability backend, instrumented via **OpenTelemetry (OTel) semantic conventions** for vendor neutrality, with **GlitchTip documented as the drop-in self-hosted alternative**.

### Default Stack (Zero-Cost Path)
1. **Sentry React Native SDK** (`@sentry/react-native`)
   - Native crash capture (iOS via Sentry iOS SDK, Android via Sentry Android SDK)
   - JS error boundary integration
   - Automatic performance tracing (app start, route changes, HTTP spans)
   - Session replay (opt-in, privacy-masked)
   - Release health tracking (crash-free sessions, adoption)
2. **OpenTelemetry JS SDK** (`@opentelemetry/sdk-trace-web`, `@opentelemetry/exporter-zipkin` or Sentry OTel exporter)
   - Custom spans for: paywall render, purchase flow, experiment assignment, haptic trigger, animation frame
   - Semantic attributes per OTel Mobile / React Native conventions
3. **EAS Build Integration**
   - `sentry-expo` plugin uploads dSYM (iOS) and mapping.txt (Android) automatically
   - Release creation via `sentry-cli` in EAS Submit hook

### Self-Hosted Alternative (GlitchTip)
- Drop-in replacement: change DSN to GlitchTip endpoint
- 100% Sentry API compatible (ingest, symbol upload, release health)
- Deploy via Docker Compose on any VM (Fly.io, Railway, Hetzner, self-hosted)
- Documented in `docs/monitoring/glitchtip-setup.md`

### Instrumentation Surface

| Domain | Instrumentation | OTel Span / Sentry Event | Key Attributes |
|---|---|---|---|
| **App Lifecycle** | Auto (Sentry) | `app.start.cold` / `app.start.warm` | `app.version`, `os.version`, `device.model`, `expo.sdkVersion` |
| **Navigation** | Auto (Sentry + Expo Router) | `navigation.transition` | `from`, `to`, `duration.ms`, `isInitial` |
| **Paywall** | Manual (M8-paywall) | `paywall.render`, `paywall.purchase` | `variant`, `trialDays`, `price`, `currency`, `outcome` |
| **Experiment** | Manual (M6-experiments) | `experiment.exposure`, `experiment.assignment` | `flagKey`, `variant`, `srmCheck`, `cupedAdjusted` |
| **Premium UX** | Manual (M17-premium-ux) | `ux.frameDrop`, `ux.hapticError`, `ux.animationJank` | `screen`, `expectedFps`, `actualFps`, `hapticType` |
| **Network** | Auto (Sentry + TanStack Query) | `http.client` | `method`, `url`, `statusCode`, `duration.ms`, `cached` |
| **Security** | Manual (M9-security) | `security.masvsCheck`, `security.keychainError` | `controlId`, `result` |

### Alerting Rules (Sentry Free Tier)
- **Crash-free sessions** < 99.5% over 24h → PagerDuty / Slack / Email
- **ANR rate** (Android) > 0.47% (Play Store bad behavior threshold) → alert
- **Paywall error rate** > 2% → alert (revenue impact)
- **SRM detection** fired → alert (experiment validity)
- **Frame drop rate** > 1% of sessions → alert (premium UX regression)

---

## Consequences

### Positive
- **Zero infra cost default**: Sentry Free Tier covers launch-scale apps; upgrade path clear
- **Native crash fidelity**: dSYM/mapping upload via EAS Build → symbolicated stacks in minutes
- **Vendor neutrality**: OTel instrumentation means switching to GlitchTip/Datadog/New Relic = config change only
- **Premium UX observable**: Custom spans for frame drops, haptics, animation jank directly map to Section 4 budgets
- **Experiment integrity**: SRM/CUPED telemetry enables real-time experiment health monitoring
- **Store compliance**: Crash-free session and ANR alerts map directly to App Store/Play Store health metrics

### Negative
- **Sentry Free Tier limits**: 5k errors/mo, 10M transactions/mo — high-volume apps need paid plan or GlitchTip
- **OTel learning curve**: Team must adopt semantic conventions; not "just Sentry API"
- **Session replay privacy**: Must mask PII (payment fields, auth tokens) — adds config burden
- **GlitchTip operational burden**: Self-hosted = team manages uptime, backups, upgrades

---

## Alternatives Considered

| Option | Description | Why not chosen |
|---|---|---|
| **Sentry only (no OTel)** | Direct Sentry API calls | Lock-in; migration to self-hosted/other vendor requires code changes |
| **Datadog / New Relic / Grafana Cloud** | Full-stack APM | Cost-prohibitive for indie/early-stage; no free tier matching Sentry's generosity |
| **Firebase Crashlytics** | Google-native, free | No JS stack traces in New Architecture; no OTel; no session replay; vendor lock-in |
| **Custom logging + ELK** | Full control | High maintenance; violates "compose verified repos" principle; no free tier |
| **No monitoring (logs only)** | Console.log / device logs | Unacceptable for production; cannot meet store health metrics or experiment validity |

---

## Verification

**Date:** 2026-09-20  
**Criteria:**
- [ ] Sentry SDK initializes in starter app with DSN from `EXPO_PUBLIC_SENTRY_DSN`
- [ ] EAS Build uploads dSYM (iOS) and mapping.txt (Android) automatically on build
- [ ] Release created in Sentry via `sentry-cli` in EAS Submit post-build hook
- [ ] Native crash (e.g., `throw Error("native crash")` in native module) appears symbolicated in Sentry
- [ ] JS error boundary captures render errors and reports to Sentry with component stack
- [ ] Custom OTel spans emitted for: paywall render, purchase, experiment exposure, frame drop, haptic error
- [ ] OTel spans appear in Sentry with correct semantic attributes (see Instrumentation Surface table)
- [ ] Alert rules fire in Sentry for: crash-free < 99.5%, ANR > 0.47%, paywall error > 2%, SRM event, frame drop > 1%
- [ ] GlitchTip alternative documented and tested with DSN swap (no code changes)
- [ ] Session replay captures paywall flow with PII masked (card, email fields)
- [ ] Performance dashboard shows p50/p95/p99 for: cold start, paywall render, purchase latency

---

## Source Links

All sources verified on **2026-09-20**:

- Sentry React Native SDK: https://github.com/getsentry/sentry-react-native
- Sentry Expo Plugin (dSYM/mapping upload): https://github.com/getsentry/sentry-expo
- GlitchTip (self-hosted Sentry-compatible): https://github.com/glitchtip/glitchtip
- OpenTelemetry JS SDK: https://github.com/open-telemetry/opentelemetry-js
- OpenTelemetry Semantic Conventions (Mobile): https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions/mobile
- EAS Build (artifact upload hooks): https://docs.expo.dev/build/reference/hooks/
- Section 2H Monitoring Inventory: `IMPLEMENTATION_PLAN.md` lines 121–128
- Section 4.2 Motion Tokens & Performance Budgets: `IMPLEMENTATION_PLAN.md` lines 194–202
- Section 4.3 Haptic Mapping Matrix: `IMPLEMENTATION_PLAN.md` lines 204–217
- Section 5.1 Trial & Subscription Architecture: `IMPLEMENTATION_PLAN.md` lines 231–238
- Section 10 Risk Matrix: `IMPLEMENTATION_PLAN.md` lines 441–449
- Google Play Bad Behavior Thresholds (ANR 0.47%): https://developer.android.com/topic/performance/vitals/bad-behavior

---

## Caveats

- Sentry Free Tier limits may be exceeded by successful apps; migration to GlitchTip or paid Sentry is a documented operational decision (separate ADR if needed).
- OTel React Native instrumentation is still maturing; some mobile-specific semantic conventions are in draft.
- Session replay on React Native New Architecture requires Sentry SDK ≥ 5.0; verify version compatibility at adoption time.
- This ADR defines the *default* observability stack; teams with existing Datadog/New Relic contracts should instrument via OTel and export to their existing backend.
- Security monitoring (MASVS checks, keychain errors) is defined here but implemented in `modules/M9-security/` — this ADR only specifies the telemetry surface.
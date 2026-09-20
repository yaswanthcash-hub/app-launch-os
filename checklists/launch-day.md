<!-- Verification date: 2026-09-20 -->
<!-- License: MIT -->

# Launch-Day & Staged-Rollout Runbook

> Checklist-based day-of-launch and progressive rollout runbook aligned with the App Launch OS Master Implementation Plan (v0.1 docs-first phase). Covers pre-launch gates, release sequencing, monitoring, rollback, and communications. Verified against practices current on **2026-09-20**.

| Field | Value |
|---|---|
| **Verification date** | 2026-09-20 |
| **Scope** | iOS (App Store Connect) and Android (Google Play Console) launch + staged rollout |
| **Primary owner** | Release Engineer / Product Lead (per phase below) |
| **Evidence** | Pre-launch report, EAS Build/Submit logs, Play Console rollout dashboard, Sentry/GlitchTip dashboard, GrowthBook SRM report |
| **Gate** | [ ] Draft &nbsp;/&nbsp; [ ] In Review &nbsp;/&nbsp; [x] Verified |

> **Educational note:** This runbook provides structured launch-day practices; it does not guarantee app store approval, zero downtime, or any specific outcome. Store policies, platform tooling, and infrastructure behavior change continuously. Verify every item against current platform documentation immediately before execution. No statement here constitutes legal, financial, or operational assurance.

## Sources
- App Store Review Guidelines — https://developer.apple.com/app-store/review/guidelines/
- App Store Connect Help — https://help.apple.com/app-store-connect/
- Google Play Developer Policy Center — https://play.google.com/about/developer-content-policy/
- EAS Build/Submit Docs — https://docs.expo.dev/eas-update/
- Fastlane Documentation — https://docs.fastlane.tools/
- Sentry — https://docs.sentry.io/
- GrowthBook Docs — https://docs.growthbook.io/
- PostHog Docs — https://posthog.com/docs

---

## 1. Pre-Launch Gates (complete before any submission)

> These gates must be green before proceeding to release sequencing. Each gate has an owner and required evidence artifact.

### 1.1 Code & Build Readiness

- [ ] All feature branches merged to main; main CI pipeline passes (lint, license check, freshness lint). — Owner: Eng Lead · Evidence: GitHub Actions run log
- [ ] Release build archived/built via EAS Build (iOS) and Gradle (Android) with release config; zero compiler warnings. — Owner: Release Eng · Evidence: EAS build URL / Gradle build scan
- [ ] `CFBundleShortVersionString` (iOS) and `versionName` + `versionCode` (Android) incremented from previous approved release. — Owner: Release Eng · Evidence: `Info.plist`, `build.gradle` diff
- [ ] Binary passes Organizer validation (iOS) / bundletool validation (Android AAB). — Owner: Release Eng · Evidence: Validation output
- [ ] No GPL/AGPL dependencies in app bundle; license allowlist CI check passed. — Owner: Release Eng · Evidence: `license-check.yml` pass log
- [ ] Sensitive credentials confirmed absent from repository; `react-native-keychain` / Expo SecureStore in use for secrets. — Owner: Security Lead · Evidence: `osv-scanner` run, repo search
- [ ] No sensitive data stored in `AsyncStorage`; MMKV encrypted if used. — Owner: Eng Lead · Evidence: Code audit checklist

### 1.2 Security Baseline (Tier 1 per IMPLEMENTATION_PLAN.md §1.3)

- [ ] `osv-scanner` run in CI on all dependencies; no critical/high vulnerabilities unpatched. — Owner: Security Lead · Evidence: Scan report
- [ ] SAST scan (Semgrep, Tier 2) run; no critical findings unresolved. — Owner: Security Lead · Evidence: Semgrep report
- [ ] Network security config declared (Android); App Transport Security not fully disabled (iOS). — Owner: Android Eng · Evidence: `network_security_config.xml`, `Info.plist` ATS declaration
- [ ] TLS certificate pinning configured for all backend endpoints (Tier 2, documented). — Owner: Eng Lead · Evidence: Network config diff
- [ ] ATT prompt wired correctly; IDFA not read before user authorization. — Owner: iOS Eng · Evidence: Code review, device test

### 1.3 Store Submission Readiness

- [ ] App Store submission checklist (`checklists/appstore-submission.md`) fully verified. — Owner: iOS Eng · Evidence: Completed checklist
- [ ] Google Play submission checklist (`checklists/playstore-submission.md`) fully verified. — Owner: Android Eng · Evidence: Completed checklist
- [ ] Privacy Policy URL live, HTTPS, and accurate. — Owner: PM · Evidence: Browser check
- [ ] Target API level ≥ 36 confirmed for Android (required as of August 31, 2026). — Owner: Android Eng · Evidence: `build.gradle`
- [ ] Data safety section (Android) and App Privacy labels (iOS) completed and truthful. — Owner: PM · Evidence: Console screenshots
- [ ] Demo account credentials ready for review (if auth required); noted in review notes. — Owner: PM · Evidence: App Store Connect Notes field

### 1.4 Monitoring & Observability Go-To-Go

- [ ] Sentry RN SDK (or GlitchTip) configured; test crash event sent and visible on dashboard. — Owner: Eng Lead · Evidence: Sentry dashboard screenshot
- [ ] Analytics events (per `templates/event-taxonomy.md`) firing correctly in test environment. — Owner: Data Lead · Evidence: Analytics debug view
- [ ] GrowthBook (or PostHog) feature flag dashboard accessible; default flags set to control. — Owner: Experiments Lead · Evidence: Dashboard screenshot
- [ ] Alerts configured for: crash rate spike, ANR rate spike, error rate spike, API latency threshold. — Owner: SRE / Eng Lead · Evidence: Alert config screenshot
- [ ] Log aggregation pipeline (if any) confirmed receiving from build artifacts. — Owner: SRE · Evidence: Log dashboard

### 1.5 Rollback & Communication Readiness

- [ ] Rollback procedure documented and tested (revert to previous binary version via EAS Submit / Play Console). — Owner: Release Eng · Evidence: Rollback runbook, test log
- [ ] Previous version still available on store (not removed) as rollback target. — Owner: Release Eng · Evidence: Store listing check
- [ ] Communications draft ready: launch announcement, incident response template, user-facing status page (if applicable). — Owner: PM / Comms · Evidence: Draft documents
- [ ] On-call rotation confirmed for launch day and +48 hours. — Owner: Eng Lead · Evidence: Schedule document
- [ ] Stakeholder notification list confirmed (executives, support, marketing, legal). — Owner: PM · Evidence: Distribution list

---

## 2. Release Sequencing

> Staged rollout sequence. Each step requires the preceding step to be stable per the halt criteria. Adjust percentages and timing based on your traffic profile; the percentages below are starting recommendations, not guarantees.

### 2.1 Phase A — Internal Testing (T-2 days before launch)

- [ ] Build uploaded to internal test track (iOS: TestFlight internal; Android: internal test track). — Owner: Release Eng · Evidence: TestFlight / Play Console internal track
- [ ] Core team (≥5) installs and uses app for ≥24 hours; no P0/P1 issues. — Owner: Product Lead · Evidence: Test feedback log
- [ ] EAS Submit / Fastlane lane tested end-to-end in staging. — Owner: Release Eng · Evidence: Command output log

### 2.2 Phase B — Closed External Testing (T-1 day before launch)

- [ ] Closed test track created (≥100 testers recommended for Android; ≥10 for iOS external testing). — Owner: Release Eng · Evidence: Console tester list
- [ ] Pre-launch report (Android Firebase Test Lab) run; zero red crash issues. — Owner: Android Eng · Evidence: Pre-launch report
- [ ] iOS TestFlight external testing enabled; build processing and available. — Owner: iOS Eng · Evidence: TestFlight status
- [ ] Feedback collection mechanism active (in-app feedback, email, or issue tracker). — Owner: PM · Evidence: Feedback channel URL

### 2.3 Phase C — Production Staged Rollout (Launch Day)

| Step | Platform | Percentage | Minimum Duration | Halt Criteria | Owner | Evidence |
|---|---|---|---|---|---|---|
| C1 | Android | 1% | 1 hour | Crash rate > baseline + 50%; ANR > 1% | Release Eng | Play Console rollout dashboard |
| C2 | Android | 5% | 2 hours | Same as C1; support ticket spike | Release Eng | Play Console dashboard + support logs |
| C3 | Android | 25% | 4 hours | Same as C1; crash rate > baseline + 25% | Release Eng | Play Console dashboard |
| C4 | Android | 100% | — | No halt criteria triggered for 4+ hours | Release Eng | Play Console 100% confirmation |
| C5 | iOS | 1% (Phased Release) | 2 hours | Crash rate > baseline + 50%; MetricKit OOM spike | Release Eng | App Store Connect metrics |
| C6 | iOS | 50% (expand) | 4 hours | Same as C5; customer support spike | Release Eng | App Store Connect metrics |
| C7 | iOS | 100% ( Phased Release complete) | — | No halt criteria triggered for 4+ hours | Release Eng | App Store Connect 100% confirmation |

> Note: iOS Phased Release is Apple-managed (gradual over ~7 days). You can accelerate per App Store Connect, but cannot exceed Apple's daily rate limits. These percentages are starting points; your actual rollout profile depends on user base size and risk tolerance. No timeline is guaranteed.

### 2.4 Phase D — Full Production (Post-Stability)

- [ ] Both platforms at 100% rollout confirmed stable for ≥24 hours. — Owner: Release Eng · Evidence: Platform dashboards
- [ ] GrowthBook SRM (Sample Ratio Mismatch) check passed for any launch-day experiments. — Owner: Experiments Lead · Evidence: GrowthBook SRM report
- [ ] All monitored metrics at or below baseline for 24 hours. — Owner: Eng Lead · Evidence: Monitoring dashboard exports
- [ ] Post-launch retrospective scheduled. — Owner: PM · Evidence: Calendar invite

---

## 3. Monitoring (Launch Day +48 Hours)

### 3.1 Real-Time Dashboards (first 24 hours, highest priority)

- [ ] **Crash rate** monitored at ≤5-minute cadence; baseline established from pre-launch internal test data. — Owner: Eng Lead · Evidence: Sentry dashboard
- [ ] **ANR rate** (Android) monitored; threshold < 1% of sessions. — Owner: Android Eng · Evidence: Play Console ANR dashboard
- [ ] **App hang / OOM** (iOS) monitored via MetricKit or Sentry. — Owner: iOS Eng · Evidence: MetricKit / Sentry dashboard
- [ ] **API error rate** monitored; threshold < 1% of requests. — Owner: Backend Lead · Evidence: API monitoring dashboard
- [ ] **API p95/p99 latency** monitored against baseline; threshold < 2× baseline. — Owner: Backend Lead · Evidence: APM dashboard
- [ ] **Checkout / subscription flow** completion rate monitored in real time. — Owner: PM · Evidence: Analytics dashboard
- [ ] **Feature flag exposure** (GrowthBook / PostHog) — confirm expected % of users in each variant. — Owner: Experiments Lead · Evidence: Feature flag dashboard
- [ ] **Store ratings** monitored; new negative reviews triaged within 2 hours during business hours. — Owner: PM · Evidence: Store console + review log

### 3.2 Periodic Checks (hours 24–48)

- [ ] Crash rate re-baselined; compare to pre-launch 24-hour window. — Owner: Eng Lead · Evidence: Comparison report
- [ ] Support ticket volume and category distribution reviewed. — Owner: Support Lead · Evidence: Support dashboard
- [ ] Battery drain / performance regressions checked (Android: Battery Historian; iOS: Instruments). — Owner: Eng Lead · Evidence: Performance report
- [ ] Data safety / privacy compliance spot-check: confirm no unexpected data transmission observed. — Owner: Security Lead · Evidence: Network traffic sample log

---

## 4. Rollback Procedures

> Rollback must be executable within 30 minutes of a confirmed P0 issue. Test this procedure before launch day.

### 4.1 Trigger Conditions (any one triggers rollback review)

- [ ] Crash rate exceeds 5% of sessions (or 2× baseline, whichever is lower). — Owner: On-call Eng · Evidence: Sentry alert
- [ ] ANR rate exceeds 2% of sessions (Android). — Owner: On-call Eng · Evidence: Play Console alert
- [ ] Data loss or corruption confirmed. — Owner: Backend Lead · Evidence: Database / log confirmation
- [ ] Security incident confirmed (data exfiltration, credential leak). — Owner: Security Lead · Evidence: Incident log
- [ ] Store rating drops below 2.5 stars within first 6 hours with pattern of crash complaints. — Owner: PM · Evidence: Store review analysis

### 4.2 Rollout Steps

- [ ] **Step 1**: Halt staged rollout in Play Console (pause or revert to internal track). — Owner: Release Eng · Evidence: Console screenshot
- [ ] **Step 2**: Halt Phased Release in App Store Connect (or reject binary if still in review). — Owner: Release Eng · Evidence: Console screenshot
- [ ] **Step 3**: Roll back to previous binary version:
  - iOS: Re-submit previous approved build via EAS Submit or Application Loader. — Owner: iOS Eng · Evidence: Submission confirmation
  - Android: Promote previous artifact from internal/test track to production; or upload previous AAB. — Owner: Android Eng · Evidence: Play Console rollout confirmation
- [ ] **Step 4**: Confirm previous version is live on both platforms (check console status). — Owner: Release Eng · Evidence: Console status check
- [ ] **Step 5**: Notify stakeholders per communication template (incident notification). — Owner: PM · Evidence: Sent messages log
- [ ] **Step 6**: Root cause analysis initiated; RCA document drafted within 24 hours. — Owner: Eng Lead · Evidence: Draft RCA document

### 4.3 No-Rollback Scenarios (documented)

- [ ] **Metadata-only changes** (description, screenshots, privacy policy text) cannot be rolled back instantly; edit and resubmit if needed. — Owner: PM · Evidence: N/A (documented)
- [ ] **Data migration already executed** on user devices may not be reversible; data preservation plan must exist before launch. — Owner: Backend Lead · Evidence: Data preservation plan

---

## 5. Communications

### 5.1 Pre-Launch (T-7 days)

- [ ] Internal announcement to all stakeholders with launch date, scope, and rollback plan summary. — Owner: PM · Evidence: Email / Slack message
- [ ] Support team briefed on new features, known limitations, and FAQ. — Owner: PM · Evidence: Support briefing notes
- [ ] Marketing team confirmed launch-day social media / blog post schedule. — Owner: Marketing · Evidence: Content calendar
- [ ] Executive notification sent with go/no-go criteria summary. — Owner: PM · Evidence: Notification sent

### 5.2 Launch Day

- [ ] Launch announcement sent (social media, blog, community channels) after 1% rollout confirmed stable (≥15 minutes post-release). — Owner: Marketing / PM · Evidence: Published posts
- [ ] App Store / Google Play listing updated with launch assets (if new app). — Owner: PM · Evidence: Store listing check
- [ ] On-call status posted to team channel with escalation contacts. — Owner: Eng Lead · Evidence: Channel post
- [ ] Community / support channel monitored for immediate user issues. — Owner: PM · Evidence: Channel monitoring log

### 5.3 Post-Launch (T+1 day, T+7 days)

- [ ] Day-1 summary sent to stakeholders: metrics snapshot, issue count, rollback status. — Owner: PM · Evidence: Day-1 summary document
- [ ] User communication if rollback was triggered (transparent, factual, no blame). — Owner: PM / Comms · Evidence: User-facing post or email
- [ ] Week-1 retrospective scheduled for T+5 to T+7 days. — Owner: PM · Evidence: Calendar invite

### 5.4 Incident Communications (if applicable)

- [ ] Incident severity assigned (P0–P3) per internal severity matrix. — Owner: Eng Lead · Evidence: Severity assignment log
- [ ] User-facing status page updated (if applicable) within 30 minutes of P0 confirmation. — Owner: PM / Comms · Evidence: Status page screenshot
- [ ] Regulatory / legal team notified within 1 hour for any data-related incident. — Owner: Security Lead · Evidence: Notification log

---

## 6. Owners & Evidence Matrix

| Role | Responsibilities | Key Evidence Artifacts |
|---|---|---|
| **Release Engineer** | Build submission, rollout management, rollback execution, EAS/Fastlane pipelines | Build logs, console screenshots, submission confirmations |
| **Product Lead / PM** | Gate sign-off, stakeholder comms, support triage, store metadata | Approval checklists, comms drafts, Day-1 summary |
| **Eng Lead (iOS)** | iOS build quality, crash/ANR monitoring, phased release management | Sentry/MetricKit dashboards, App Store Connect metrics |
| **Eng Lead (Android)** | Android build quality, ANR monitoring, staged rollout management | Play Console dashboards, Pre-launch reports |
| **Backend Lead** | API health, database integrity, data preservation plan | APM dashboards, RCA documents |
| **Security Lead** | Security scans, privacy compliance, incident response | Scan reports, incident logs |
| **Experiments Lead** | Feature flag sanity, SRM checks, A/B experiment monitoring | GrowthBook/PostHog dashboards, SRM report |
| **Support Lead** | Support ticket monitoring, triage, escalation | Support dashboard, ticket logs |
| **Marketing / Comms** | Launch announcement, social media, incident comms | Published posts, status page screenshots |
| **SRE / On-call** | Alert monitoring, escalation, rollback execution | Alert logs, escalation records |

---

## 7. Verification Log

| Item | Verified | Date | Verifier | Notes |
|---|---|---|---|---|
| All pre-launch gates (§1) | [ ] | | | |
| All release sequencing steps (§2) | [ ] | | | |
| All monitoring setup (§3) | [ ] | | | |
| All rollback procedures (§4) | [ ] | | | |
| All communications (§5) | [ ] | | | |
| Verification date | | 2026-09-20 | | |

---

## Caveats

- This runbook is a structured set of practices; it does not guarantee app store approval, zero incidents, or any specific business outcome. Platform policies and tooling change frequently—verify against current documentation before execution.
- Rollback timing estimates (e.g., "within 30 minutes") are targets based on best practices, not guarantees. Actual recovery time depends on infrastructure complexity and incident severity.
- Rollout percentages and durations in §2.3 are starting recommendations. Your specific traffic profile, user base size, and risk tolerance should determine actual values.
- All monitoring thresholds (crash rate, ANR rate, latency) require baseline calibration against your own historical data. The values stated here are common starting points, not universal guarantees.
- Security tier compliance (Tier 1–3 per IMPLEMENTATION_PLAN.md §1.3) is progressive. Tier 1 is expected at launch; Tier 2/3 may follow post-launch.
- Every checklist item must be verified against current platform documentation at time of execution, not solely against this document.

---

*Last verified: 2026-09-20 · Aligned with IMPLEMENTATION_PLAN.md (App Launch OS, v0.1) · License: MIT*

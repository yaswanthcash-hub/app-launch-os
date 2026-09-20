# ADR-003 — CI/CD Strategy: Cloud-First EAS Build/Submit with Fastlane Fallback

## Metadata

- **Status:** Accepted
- **Decision date:** 2026-09-20
- **Verification date:** 2026-09-20
- **Source of record:** `IMPLEMENTATION_PLAN.md` — Section 3 (Architecture Decisions), Section 2A (Core Framework & Native Runtime), Section 8 Phase 4 (roadmap), Section 10 (Risk Matrix)
- **Related modules:** `M10-release`, `starters/expo-ts/`
- **Related ADRs:** `001-ui-stack.md` (determines whether the Expo managed workflow is used, which governs build tooling)

---

## Context

### Strategic need
Mobile teams need to compile, test, and ship iOS and Android binaries without provisioning, maintaining, or paying for macOS/Android build infrastructure. At the same time, teams operating a bare (custom-native) React Native workflow, or teams with complex enterprise release requirements (internal signing, custom native modules, multi-target apps), need an on-premises/composable build toolchain that the cloud cannot replace.

### Evidence
- `IMPLEMENTATION_PLAN.md` Section 2A (items 3–4) lists **EAS Build** and **EAS Submit** as Core dependencies with the purpose of "Cloud Native Compilation" and "Store Deployment Automation" on the Free Tier / SaaS model, providing "zero-infrastructure iOS & Android native builds."
- `IMPLEMENTATION_PLAN.md` Section 3 / README section 10 specify the CI/CD decision as: **Cloud-first EAS Build/Submit for Expo; Fastlane for complex bare workflows.**
- The roadmap (Section 8, Phase 4) delivers `modules/M10-release/` with "EAS Build/Submit profiles and Fastlane lanes," and the risk matrix (Section 10) lists "License Contamination" and "Policy Staleness" as mitigations enforced by **automated CI workflows** (`ci.yml`, `license-check.yml`, `freshness-lint.yml`).
- The starter (`starters/expo-ts/`) is configured as an Expo-managed project (Expo SDK 57+), which is the default lane that maps to EAS Build/Submit.
- Section 1 guarantees **"Zero Hosting Overhead"** for Phase 1 (Weeks 1–2) and relies on GitHub Free Tier & GitHub Actions; EAS Build/Submit's Free Tier and GitHub Actions' free minutes satisfy this for indie teams.

### Forces
1. **Zero-infrastructure default**: the build toolchain must not require the team to own or operate macOS/Android CI runners.
2. **Free-tier viability**: the default path must work within GitHub Free Tier (for repo automation) and EAS's free build minutes, so indie founders incur no upfront infra cost.
3. **Store deployment automation**: submitting to App Store Connect and Google Play Console must be automatable and auditable (EAS Submit, Fastlane match/gym/pilot).
4. **Bare-workflow escape hatch**: teams ejecting to a bare RN workflow or adding custom native modules must retain a supported build path (Fastlane), since EAS Build's managed build service does not cover arbitrary native pods/gradle plugins without custom dev clients.
5. **Reproducibility & cache**: builds must be deterministic and cacheable so that autoresearch optimization loops (README section 4) produce comparable artifacts.
6. **License safety in CI**: the allowlist CI workflow (`license-check.yml`) must run as a non-copyleft step in GitHub Actions, consistent with the "copyleft tools isolated in CI containers" guarantee (Section 1, guarantee #2).

---

## Decision

Use **EAS Build** and **EAS Submit** as the cloud-native, zero-infrastructure CI/CD default for the Expo managed workflow, and provide **Fastlane** as the supported fallback for bare workflows and complex release needs.

### What this means operationally
1. **Default path (managed Expo)**: `eas.json` build profiles (`./profiles`) and `eas submit` configurations are the source of truth for iOS (Xcode) and Android (AGP) compilation. Builds run on Expo's cloud infrastructure with no team-owned macOS runners. The Free Tier supplies the initial build minutes; paid minutes scale transparently via the same config.
2. **Store deployment**: `eas submit` pushes signed binaries to App Store Connect and the Google Play Console. The starter ships example `eas.json` submit profiles plus the App Store / Play submission checklists (`checklists/appstore-submission.md`, `checklists/playstore-submission.md`) as release-gate inputs.
3. **Fallback path (bare / complex)**: `modules/M10-release/` ships Fastlane `Fastfile` lanes covering `match` (signing), `gym`/`scan` (iOS), `gradle` (Android), and `pilot`/`supply` (store upload). This path is selected when a team ejection or a custom native module cannot be expressed as an EAS custom dev client.
4. **GitHub Actions orchestration**: `.github/workflows/ci.yml` (markdown lint & format), `license-check.yml` (OSV/scanner-based allowlist rejection of GPL/AGPL), and `freshness-lint.yml` (90-day staleness flag) run as the repo-wide quality gate. Copyleft/security scanners (Semgrep, MobSF) execute only inside **isolated CI containers** — never linked into app code — satisfying Section 1 guarantee #2 and the licensing shield (`policies/licensing-guide.md`).
5. **Reproducible, version-pinned builds**: `eas.json` profiles pin EAS CLI and SDK major versions; Fastlane lanes pin tool versions via `Gemfile`/`fastlane-version`, ensuring the autoresearch loop (`README` section 4) compares like-for-like artifacts.

### Non-goals
- The project does **not** standardize on self-hosted macOS builders (e.g., MacStadium / GitHub Actions macOS runners as a default). These remain documented options for enterprise teams that the cloud cannot serve, but are not the default or maintained starter path.

---

## Consequences

### Positive
- **Zero-infrastructure builds for the 90% case**: per Section 2A, EAS Build provides "zero-infrastructure iOS & Android native builds," letting indie teams compile release binaries on the Free Tier without owning macOS hardware.
- **Automated store submission**: EAS Submit closes the loop from build to App Store Connect / Play Console submission, matching the release-automation purpose cited in Section 2A (item 4).
- **Free-tier viability**: EAS Free Tier + GitHub Free Tier satisfy Phase 1's "Zero Hosting Overhead" guarantee (Section 1, guarantee #5) through Phase 4 for most indie teams.
- **Clean bare-workflow escape hatch**: Fastlane lanes ensure teams that eject or add custom native modules retain a supported, on-prem build path without rewriting the entire pipeline.
- **License-safety preserved**: the allowlist CI (`license-check.yml`) runs as a permitted CI-only step; copyleft scanners are containerized and never linked into the app bundle, keeping the MIT core uncontaminated (Section 10 risk matrix, guarantee #2).
- **Reproducible autoresearch**: pinned EAS profiles and Fastlane versions make bundle-size / TTID optimization loops (`README` section 4) produce comparable artifacts.

### Negative
- **EAS free-tier build limits**: concurrent builds and minute quotas are throttled on the Free Tier; teams may need to upgrade during active release cycles. This is an operational cost, not an architecture change.
- **EAS lock-in for the default path**: binaries are compiled on Expo's infrastructure; teams that need fully air-gapped or on-prem compilation must fall back to Fastlane + self-hosted runners, which is a heavier operational burden.
- **Fastlane maintenance surface**: the bare-workflow lanes are the team's responsibility to keep in sync with Xcode/AGP/EAS version changes; the project documents but does not host the Fastlane upgrade cadence.
- **Custom native module caveats**: EAS Build supports custom native modules only via custom dev clients; modules incompatible with the EAS build service force the Fastlane path.

---

## Alternatives Considered

| Option | Description | Why not chosen |
|---|---|---|
| **Self-hosted GitHub Actions macOS runners (MacStadium / paid runners)** | Team owns macOS + Android build infra in CI. | Violates Section 1 guarantee #5 ("Zero Hosting Overhead," Phase 1) and imposes a macOS cost floor that excludes indie founders. Retained as an enterprise-only documented option. |
| **Microsoft App Center (Visual Studio App Center)** | Hosted build, test, and distribute service. | Declining investment and overlapping scope with EAS; App Center's RN support has not kept pace with New Architecture releases. EAS Build/Submit is the Expo-native path the starter targets. |
| **Bitrise** | Third-party mobile CI/CD platform. | Adds an external vendor dependency and per-seat cost; does not align with the "zero-infrastructure" + GitHub-Free-Tier posture. Documented as a third-party option only. |
| **Expo-only (Build/Submit), no Fastlane** | Remove the bare-workflow escape hatch entirely. | Rejects force #3: bare RN teams and custom-native-module teams need a supported build path the cloud cannot serve. Fastlane is retained as the documented fallback. |
| **Manual `xcodebuild` / `gradle` only** | No build service; developers compile locally. | Re-introduces the macOS/Android toolchain setup that EAS Build eliminates; non-reproducible across machines. This is the pre-2023 baseline the decision deliberately moves beyond. |
| **Codemagic** | CI/CD service with macOS workers. | Another paid third-party layer; not aligned with the GitHub Actions + EAS Free Tier default. Documented as an alternative only. |

---

## Source Links

All sources verified on **2026-09-20**:

- EAS Build (cloud native compilation, Free Tier / SaaS): https://expo.dev/eas (verified 2026-09-20)
- EAS Submit (store deployment automation): https://docs.expo.dev/eas/submit (verified 2026-09-20)
- Expo SDK 57 / EAS docs (New Architecture support): https://docs.expo.dev (verified 2026-09-20)
- Fastlane (iOS `gym`/`match`/`pilot`, Android `gradle`/`supply`): https://docs.fastlane.tools (verified 2026-09-20)
- osv-scanner (Google-maintained vuln scanner, Apache-2.0, Tier 1): https://github.com/google/osv-scanner (verified 2026-09-20)
- Semgrep (SAST, LGPL-2.1, Tier 2 / isolated CI): https://github.com/semgrep/semgrep (verified 2026-09-20)
- MobSF (static mobile scanner, GPL-3.0, Tier 2 / isolated CI): https://github.com/MobileSecurityFramework/MobSF (verified 2026-09-20)
- OWASP MASVS v2.1 (security verification standard, CC BY-SA 4.0): https://mas.owasp.org/MASVS (verified 2026-09-20)
- GitHub Actions (Free Tier, repo automation): https://docs.github.com/en/actions (verified 2026-09-20)

## Caveats

- The "cloud-first EAS Build/Submit" default assumes an Expo-managed (or custom-dev-client) workflow. Teams that eject to a true bare workflow, or that require native modules EAS Build cannot compile, must fall back to the Fastlane lanes in `modules/M10-release/` — the migration path is documented but is a manual, one-time decision.
- EAS Free Tier build-minute limits and concurrency are controlled by Expo, not this repository; the project cannot guarantee availability beyond documented Free Tier quotas. Teams planning production release cadence should budget for paid EAS minutes.
- The allowlist `license-check.yml` blocks GPL/AGPL from the *app bundle*; it does not audit transitive licenses of EAS's hosted build environment. Trust in the EAS build environment is therefore out of scope for this ADR's license-safety guarantee.
- This ADR governs *build & submit* CI/CD. It does not cover *testing* CI (covered by ADR-005) or *monitoring/observability* of deployed builds (ADR-006).

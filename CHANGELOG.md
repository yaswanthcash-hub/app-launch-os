# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-09-20

### Added
- **AST-Based Code Analysis**: Replaced naive substring / regex matching with `@babel/parser` and `@babel/traverse` (`src/cli/parse.js`) for deterministic token and AST inspection.
- **Granular Result Model**: Added `MANUAL` and `UNKNOWN` statuses (`GOOGLE_CLOSED_TESTING`, `GOOGLE_16KB_PAGE`, `GOOGLE_DATA_SAFETY`) separating automated code audits from external Play Console / App Store Connect state.
- **Policy Provenance Registry**: Added `policies/sources.json` and `scripts/policy-verify.js` with SHA-256 content hashes to detect upstream policy drift from official Apple and Google guidelines.
- **Project-Type Guard**: Auditor validates targets for Expo/React Native dependency or native iOS/Android manifests before evaluating rules.
- **Statistical SRM Engine**: Implemented Lanczos `logGamma` and incomplete gamma series calculation in `@applaunchos/experiments` for Sample Ratio Mismatch validation ($p < 0.01$).
- **Deterministic Test Suites & Fixtures**: Added Vitest test suites with 5 test fixtures (`clean-expo-app`, `broken-expo-app`, `comment-only-app`, `not-a-mobile-app`, `empty`) and documented expectations.
- **Toolchain Modernization**: Added root `tsconfig.json` with strict type checking and ESLint configuration.
- **Deterministic Security Detectors**: Added detectors for hardcoded API keys, unencrypted auth tokens in `AsyncStorage`, and cleartext HTTP traffic.

### Changed
- **Store Policy Baseline**: Upgraded target requirements to Android API 36 (Android 16, effective Aug 2026) and iOS 26 SDK / Xcode 26 (effective April 2026).
- **Safe Auto-Fix Pipeline**: `fix` is now strictly dry-run by default; requires `--write` and a clean git working directory.
- **Tailored Privacy Manifests**: `fix` generates project-specific `PrivacyInfo.xcprivacy` based on detected native dependencies with approved Apple reason codes.
- **Standardized Module Naming**: Unified all 13 modules under `@applaunchos/*` npm scope.
- **Scoring System**: Formulated formal ADR (`decisions/010-scoring.md`) removing arbitrary base scores.

### Removed
- **Reviewer Bypass Generator**: Deleted client-side backdoor generator (`ReviewerBypass.ts`) in favor of official server-side reviewer accounts documented in `policies/reviewer-access.md`.
- **Misleading Claims**: Removed unverified badge metrics, trademarks, and unsubstantiated performance claims.

### Fixed
- Fixed false-positive detector triggers on code comments in authentication files.
- Fixed dead `fs`/`path` imports in detector files.

---

## [0.1.0] - 2026-09-20

### Added
- Initial release of App Launch OS playbooks, submission checklists, policy digests, and ADRs.
- Reference Expo starter (`starters/expo-ts`).
- 13 foundational modules covering design systems, paywalls, analytics, experiments, and growth loops.

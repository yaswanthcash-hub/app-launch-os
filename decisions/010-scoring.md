# ADR 010: Launch Readiness Scoring Model & Weight Justification

## Status
Accepted (2026-09-20)

## Context
Previous iterations of the App Launch OS CLI used an arbitrary scoring baseline (`return 85` for empty categories) and unverified pillar breakdowns. This produced misleading scores—for instance, an empty directory or non-mobile repository could achieve an 85% readiness score despite containing zero functional code.

Furthermore, manual inspection tasks (such as Google Play's 20-tester closed testing gate, 16 KB ELF binary verification across third-party C/C++ libraries, and Play Console Data Safety questionnaire declarations) were conflated with deterministic code-level tests, skewing numerical outputs.

## Decision

### 1. Status Enum & Manual Partitioning
Every detector returns one of four statuses:
- `PASS`: Deterministically verified via AST or configuration inspection.
- `WARNING`: Sub-optimal pattern that risks degraded user experience, frame drops, or store review delays.
- `BLOCKER`: Violation of strict Apple App Store Review Guidelines or Google Play Policies that triggers guaranteed build or review rejection.
- `MANUAL`: External state requiring human or console verification (e.g. 20-tester gate, Play Console Data Safety form, compiled ELF binary alignment). **MANUAL items are strictly excluded from the numeric 0–100 score** and rendered in a dedicated audit section.
- `UNKNOWN`: Insufficient metadata or unparseable state. Never defaulted to `PASS`.

### 2. Elimination of Fake Neutral Baselines
Categories with zero evaluated items return `null` and are **omitted from the active pillar list**. No category receives an unearned `85` baseline score. If no relevant detectors execute, the score is undefined.

### 3. Active Pillar Weights & Penalties
Each active pillar begins at `100` points. Penalties are assessed deterministically:
- Each `BLOCKER` in a pillar deducts **35 points**.
- Each `WARNING` in a pillar deducts **15 points**.
- Pillar score floor is `10` and ceiling is `100`.

The overall Launch Readiness Score dynamically normalizes across active pillars using empirical release risk weighting:

| Pillar | Weight | Rationale |
| :--- | :--- | :--- |
| **Store Compliance** | 30% | Violations of App Store Guidelines (2.1, 5.1.1, 3.1.1) or Play SDK 36 baseline result in instant rejection during review. |
| **Security** | 25% | Hardcoded API keys, unencrypted auth tokens in `AsyncStorage`, or cleartext HTTP traffic expose users and risk immediate store takedown. |
| **Performance** | 20% | Missing Hermes, New Architecture disabled, or JS-thread animation loops degrade cold start and cause frame drops. |
| **UX & Design** | 15% | Missing haptic detents, raw spinners, or lack of corner concentricity create amateur app feel. |
| **Accessibility** | 10% | Missing `accessibilityLabel` props and disabled font scaling lock out assistive tech users and fail WCAG 2.2 / Apple HIG standards. |

### 4. Verdict Thresholds
- **🚀 SURVIVES LAUNCH (Ready for Submission)**: Score $\ge 90$ AND $0$ blockers.
- **🔴 FATAL REJECTION (Guaranteed Store Rejection)**: Blockers $> 2$ OR Score $< 60$.
- **⚠️ AT RISK**: Any blockers $> 0$ or Score $< 90$.

## Consequences
- No empty project or non-mobile codebase can receive a passing or positive score.
- Scores reflect genuine, verifiable codebase properties.
- Manual compliance duties are surfaced prominently without polluting deterministic metrics.

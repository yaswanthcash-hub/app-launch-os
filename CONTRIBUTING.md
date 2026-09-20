# Contributing to App Launch OS

Thank you for your interest in contributing! This document outlines the contribution workflow, review standards, and community expectations for **App Launch OS**.

> App Launch OS follows a **docs-first** philosophy: high-value documentation, research digests, compliance playbooks, and architectural decisions ship *before* boilerplate code. This keeps Phase 1 (v0.1) 100% static, serverless, and zero-bug-risk, per the [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md#12-docs-first-execution-v01).

---

## Table of Contents

1. [Contribution Principles](#contribution-principles)
2. [Docs-First Workflow](#docs-first-workflow)
3. [Ways to Contribute](#ways-to-contribute)
4. [Issue Expectations](#issue-expectations)
5. [PR Expectations](#pr-expectations)
6. [Review SLAs & Standards](#review-slas--standards)
7. [RFC / ADR Process](#rfc--adr-process)
8. [Licensing](#licensing)
9. [Security Reporting](#security-reporting)
10. [Freshness & Date-Stamp Rules](#freshness--date-stamp-rules)
11. [Validating Markdown](#validating-markdown)
12. [Code of Conduct](#code-of-conduct)
13. [Good First Issues](#good-first-issues)
14. [Recognition](#recognition)
15. [Questions?](#questions)

---

## Contribution Principles

Every contribution should reinforce these five guarantees from the [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md):

| Principle | What It Means |
|-----------|---------------|
| **Permissive by Default** | Core repo stays **MIT**. Only MIT/Apache-2.0/BSD/ISC dependencies are allowed in client code and boilerplates. |
| **License Contamination Shield** | No GPL/AGPL libraries may enter the dependency tree of app boilerplates or modules. Copyleft analysis tools run only in isolated CI containers. |
| **Legal Safety First** | All privacy-policy, Terms-of-Service, and DPA templates carry explicit non-attorney educational disclaimers. |
| **Nominative Fair Use** | Mentions of Apple, Google, and third-party tools use trademarked names only for identification, never as app branding. |
| **Docs Before Code** | Research digests, checklists, and compliance playbooks land before feature code, eliminating early software bug liability. |

These are enforced automatically by CI (see [Validating Markdown](#validating-markdown) and [Licensing](#licensing)).

---

## Docs-First Workflow

App Launch OS is built **documentation-first**. This is not optional—it is baked into the phased execution roadmap (see [IMPLEMENTATION_PLAN.md §1.2](./IMPLEMENTATION_PLAN.md)).

**The workflow:**

1. **Propose** — Open a Feature Request issue or RFC (see [RFC / ADR Process](#rfc--adr-process)).
2. **Document** — Author the markdown content in the correct directory:
   - `checklists/` — compliance and polish checklists
   - `findings/` — research digests with dated citations
   - `policies/` — store-policy and compliance digests
   - `templates/` — legal, architectural, and schema templates
   - `decisions/` — Architecture Decision Records (ADRs)
3. **Verify** — Date-stamp all claims, cite official sources, and pass CI.
4. **Iterate** — Code modules (`modules/`) are scaffolded only *after* their supporting docs are merged.

> **Scope-Creep Guard**: Per the [Risk Matrix](./IMPLEMENTATION_PLAN.md#10-risk-matrix--quality-verification), code features must not ship before their validating documentation exists. If a PR adds code without corresponding docs, it may be deferred.

---

## Ways to Contribute

| Contribution Type | Description | Where to Start |
|-------------------|-------------|----------------|
| **Policy Researcher** | Track breaking Apple/Google/Expo store changes (No code required!) | `.github/ISSUE_TEMPLATE/policy-change.md`, `RADAR.md` |
| **Documentation** | Fix typos, clarify checklists, add research citations | `findings/`, `checklists/`, `policies/`, `docs/prd.md` |
| **Research Digests** | Add new studies, update verification dates | `findings/*.md` |
| **Policy Updates** | Track Apple/Google policy changes with dated sources | `policies/*.md` |
| **Architecture Decisions** | Propose new ADRs or amend existing ones | `decisions/` + [RFC Process](#rfc--adr-process) |
| **Tooling** | CI workflows, freshness linters, attribution CLI | `.github/workflows/`, `modules/M15-cli/`, `src/cli/` |
| **Templates** | Improve legal templates (with disclaimers) | `templates/*.md` |
| **Starter Kits** | Extend `starters/expo-ts/` boilerplate | `starters/expo-ts/` |

### 📡 The Policy Researcher Role (No Code Required)

You do **not** need to write TypeScript or configure native toolchains to make high-impact contributions to App Launch OS.

Mobile platform guidelines (Apple App Store Review Guidelines, Google Play Developer Program Policies, and Expo SDK requirements) shift constantly. If you are a QA tester, product manager, founder, or engineer who spots a store policy update or encounters a new review rejection reason:
1. Open a **Store Policy Change Report** via our [Policy Report Issue Template](.github/ISSUE_TEMPLATE/policy-change.md).
2. Document the official URL, effective date, who is affected, and your recommended workaround.
3. Your submission directly updates the weekly [RADAR.md](RADAR.md) and alerts thousands of mobile builders.

---

## Issue Expectations

Use GitHub issues to report problems, propose features, or flag policy updates. Always check existing issues first.

### Issue Templates

| Template | Use For | Required Information |
|----------|---------|----------------------|
| **Bug Report** | Factual errors, broken links, stale dates | Affected file, expected vs. actual, reproduction steps |
| **Feature Request** | New modules, checklist items, research topics | Problem statement, proposed solution, alternatives |
| **Policy Update** | Store guideline changes | Official source URL, affected policy, verification date |

### Filling an Issue

- **Be specific**: Name the exact file or section (`findings/paywall.md §5.1`).
- **Cite sources**: Link to official documentation, research papers, or store guidelines.
- **Tag appropriately**: Use labels like `docs`, `research`, `policy`, `good first issue`.
- **Date claims**: If proposing new data, include the research/verification date.

---

## PR Expectations

All pull requests must follow this checklist before requesting review.

### PR Workflow

```bash
git clone https://github.com/<your-username>/app-launch-os.git
cd app-launch-os
git checkout -b docs/your-descriptive-name
# or: feat/ | fix/ | chore/ | research/
```

### PR Requirements

1. **Title & Description**
   - Use a clear, conventional title: `docs: update paywall trial statistics` or `feature: add Glassmorphism checklist`.
   - Fill out the [PR template](.github/PULL_REQUEST_TEMPLATE.md).
   - Explain the *why*, not just the *what*.
   - Link the related issue: `Fixes #123` or `Relates to #123`.

2. **Content Standards**
   - Follow existing markdown style (headings, tables, checklists, source links).
   - Distinguish **verified facts** (with official source URLs) from **recommendations** (clearly labeled).
   - Include legal disclaimers on any policy/legal content.
   - Date-stamp all research/policy claims (see [Freshness Rules](#freshness--date-stamp-rules)).

3. **CI Checks**
   - All checks must pass before merge (see [Validating Markdown](#validating-markdown)).
   - If a check fails, fix and push a new commit—do not force-push after review begins.

4. **Review**
   - Request review from the appropriate module maintainer.
   - Address feedback promptly; maintainers may squash-merge.

---

## Review SLAs & Standards

| Review Aspect | SLA | Standard |
|---------------|-----|----------|
| **Initial Triage** | ≤ 24 hours | Label, assign, or close with reason |
| **First Review** | ≤ 3 business days | Accuracy, legal safety, license compliance, freshness, consistency, completeness |
| **Follow-up Reviews** | ≤ 2 business days | Iteration on feedback |
| **Merge Decision** | ≤ 1 business day after approval | All checks passing, no unresolved threads |

> Reviews operate on a **best-effort, volunteer** basis. If a review exceeds the SLA, feel free to ping reviewers in a comment (once).

### Maintainer Review Checklist

Before approving, maintainers verify:

- [ ] **Accuracy**: Claims have dated source links; facts vs. recommendations are distinguished.
- [ ] **Legal Safety**: Templates include disclaimers; no unauthorized legal advice is provided.
- [ ] **License Compliance**: New dependencies are MIT/Apache-2.0/BSD/ISC; GPL/AGPL is blocked by CI (`.github/workflows/license-check.yml`).
- [ ] **Freshness**: Dates are current; no stale claims older than 90 days (see [Freshness Rules](#freshness--date-stamp-rules)).
- [ ] **Consistency**: Terminology, formatting, and cross-references match repo conventions.
- [ ] **Completeness**: PR description explains *why*; related issues are linked.

---

## RFC / ADR Process

For architectural changes—new ADRs, module specs, major policy shifts, or new dependency additions—follow the RFC process. This aligns with the four established ADRs in [IMPLEMENTATION_PLAN.md §3](./IMPLEMENTATION_PLAN.md#3-architecture-decisions-adrs) (ADR-001 through ADR-004).

### Steps

1. **Open an RFC Issue** using the "Feature Request" template with an `[RFC]` prefix. Use the [RFC template](#rfc-template) below.
2. **Discussion Period**: Minimum **7 calendar days** for community feedback.
3. **Decision**: Maintainers post a decision: **Accept**, **Accept with Modifications**, **Defer**, or **Reject**.
4. **Implementation**: If accepted, the author (or an assignee) implements the change via the standard [PR workflow](#pr-expectations).

> For smaller ADR documentation updates that reference an *existing* ADR, a Feature Request issue may suffice. Use an RFC when the change is substantial, breaking, or adds new scope.

### RFC Template

```markdown
## RFC: [Short Title]

**Status**: Draft / Accepted / Rejected / Deferred
**Author(s)**: @username
**Related Issues**: #123
**Target Module(s)**: M4-design-system, decisions/007-design-system.md

### Summary
One-paragraph description of the proposed change.

### Motivation
Why is this needed? What problem does it solve?

### Proposed Solution
Detailed design with:
- API/interface changes
- Migration path (if breaking)
- Verification plan

### Alternatives Considered
Brief comparison with rejected approaches.

### Licensing Impact
- New dependencies and their licenses.
- Confirm no GPL/AGPL will enter the dependency tree.

### Freshness & Date-Stamp
All factual claims must include a verification date (current date or within 90 days).

### Sources
- [Official Source 1](https://example.com)
- [Official Source 2](https://example.com)
```

---

## Licensing

App Launch OS is distributed under the **MIT License** (see [LICENSE](./LICENSE)). This choice is deliberate and documented in [IMPLEMENTATION_PLAN.md §1.1](./IMPLEMENTATION_PLAN.md):

> *The MIT License is the uncontested #1 open-source license on GitHub (used by React, React Native, Expo, Next.js, and Tailwind). It provides zero commercial friction, maximum community trust, and viral repo adoption.*

### License Contamination Shield

To protect the repo and its users from copyleft contamination:

- **Allowlist CI** (`.github/workflows/license-check.yml`) automatically rejects GPL/AGPL dependencies in app boilerplates and modules.
- **Allowed licenses**: MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC.
- **Copyleft tools** (e.g., MobSF, Semgrep) run **only** inside standalone CI runner containers and are never linked into distributable code (see [IMPLEMENTATION_PLAN.md §13](./IMPLEMENTATION_PLAN.md)).

### Contributing Code

- By contributing, you agree to license your contributions under the MIT License.
- Include a brief license header or attribution for any third-party code you add.
- See [`LICENSES/THIRD-PARTY-NOTICES.md`](./LICENSES/THIRD-PARTY-NOTICES.md) for the canonical attribution file.
- For questions about a specific dependency, open an RFC issue first.

---

## Security Reporting

App Launch OS takes security seriously. This project implements a **progressive security posture** (see [IMPLEMENTATION_PLAN.md §1.3](./IMPLEMENTATION_PLAN.md)):

- **Tier 1 (Baseline)**: Automated `osv-scanner` in GitHub Actions; secure credential storage via `react-native-keychain` / Expo SecureStore; zero sensitive data in `AsyncStorage`.
- **Tier 2 (Hardened)**: Semgrep SAST scanning; MobSF automated static checks; platform-level TLS certificate pinning.
- **Tier 3 (Enterprise)**: Device integrity attestation (Play Integrity / DeviceCheck) and network security configurations.

### Reporting a Vulnerability

- **Do NOT open a public issue** for security vulnerabilities.
- Read our [Security Policy](.github/SECURITY.md) for the coordinated disclosure process.
- Email the maintainers at `security@app-launch-os.org` with:
  - A description of the issue.
  - Steps to reproduce.
  - Potential impact.
  - Your contact information.

We will acknowledge your report within **48 hours** and work with you to resolve it. Please give us a reasonable timeframe before any public disclosure.

---

## Freshness & Date-Stamp Rules

Store policies and mobile ecosystems change rapidly. All claims must carry verifiable, current dates.

### The 90-Day Rule

- **All factual claims** (research statistics, store policy references, SDK versions, license statuses) must be date-stamped.
- **Dates must be < 90 days old** at submission. Stale claims are flagged by `.github/workflows/freshness-lint.yml`.
- Update dates when you verify a claim is still accurate. If you cannot re-verify, flag the claim for review.

### Date-Stamp Format

```markdown
*Verified: 2026-09-20*
*Source: [Official Name](https://example.com)*
```

For research digests, use the format from the [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md):

> *All repositories and tools verified as of **2026-09-20**.*

### What to Date-Stamp

| Content Type | What to Stamp | Example |
|--------------|---------------|---------|
| Research stats | Source + verification date | "55% of revenue — Verified: 2026-09-20, Source: SOSA 2026" |
| Store policies | Policy version/date + source | "App Store Review Guideline 3.1.2 — Verified: 2026-09-20" |
| Tool versions | Version + release date | "Expo SDK 57 — Released: 2026-08-15" |
| ADRs | Decision date | "Decided: 2026-09-20" |

### Freshness Linting

The `freshness-lint.yml` workflow checks:

1. Markdown files for date-stamp patterns (`YYYY-MM-DD`).
2. Dates within 90 days of the CI run date.
3. Links to official sources are reachable.

If a file fails the freshness check, add or refresh its date-stamp and re-run CI locally (see [Validating Markdown](#validating-markdown)).

---

## Validating Markdown

CI enforces markdown quality via `.github/workflows/ci.yml`. You can (and should) run the same checks locally before opening a PR.

### 1. Install Dependencies

```bash
# Clone the repo and install tools (Node 20+ recommended)
pnpm install
```

### 2. Run the Linters

```bash
pnpm lint          # Runs markdownlint + Prettier formatting checks
pnpm lint:fix      # Auto-fixes formatting issues
pnpm check:freshness  # Verifies date-stamps are within 90 days
pnpm check:links    # Verifies all source URLs resolve (CI only; may be slow)
```

> If `pnpm` is unavailable, use `npm` or `yarn`. The underlying tools are:
> - **Prettier** — formatting and consistency.
> - **markdownlint-cli** (rules aligned with repo config).
> - **Custom freshness linter** in `modules/M15-cli/` — checks date-stamp age.

### 3. What CI Checks

| Workflow | File | Checks |
|----------|------|--------|
| `ci.yml` | `.github/workflows/ci.yml` | Markdown lint + formatting |
| `license-check.yml` | `.github/workflows/license-check.yml` | Dependency license allowlist (blocks GPL/AGPL) |
| `freshness-lint.yml` | `.github/workflows/freshness-lint.yml` | Date-stamp age (< 90 days) |

### 4. Local Verification Tips

- Run `pnpm lint:fix` to auto-format your markdown before committing.
- Verify links manually or with a link-checker before relying on CI.
- Keep date-stamps current—update them when you touch a file.

---

## Code of Conduct

This project follows the **[Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**. By participating, you agree to uphold this code.

### Our Standards

- **Be respectful** — Welcome diverse perspectives; no harassment or discrimination.
- **Be constructive** — Critique ideas, not people; assume good intent.
- **Be collaborative** — Share knowledge; help others succeed.
- **Be responsible** — Own your contributions; fix mistakes promptly.

### Unacceptable Behavior

- Harassment, hate speech, or exclusionary language.
- Personal attacks, trolling, or insulting comments.
- Public or private harassment.
- Publishing others' private information without consent.

### Enforcement

Violations may result in a warning, temporary ban, or permanent removal at maintainer discretion. To report a concern, email **conduct@app-launch-os.org**.

The Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org) by [Coraline Ada Ehmke](https://coralineada.com).

---

## Good First Issues

New contributors should start with well-scoped, mentor-friendly tasks. Look for these labels on issues:

| Label | Description | Typical Effort |
|-------|-------------|----------------|
| `good first issue` | Well-scoped, mentor-friendly tasks | 2–8 hours |
| `docs` | Documentation improvements | 1–4 hours |
| `research` | Add/update citations, verify claims | 2–6 hours |
| `checklist` | Add missing checklist items | 1–3 hours |
| `i18n` | Accessibility or localization fixes | 1–4 hours |

**Examples**:

- Add missing WCAG contrast ratios to `checklists/accessibility.md`.
- Verify and update the Expo SDK version in `findings/experiments.md`.
- Add a source link for a paywall conversion statistic in `findings/paywall.md`.
- Fix a broken link in `policies/apple-review-essentials.md`.
- Update a stale date-stamp flagged by `freshness-lint.yml`.

---

## Recognition

Contributors are recognized in:

- **Release Notes** — Every release credits contributors by GitHub handle.
- **README.md** — Top contributors are listed in an Acknowledgments section (post-v0.1).
- **CONTRIBUTORS.md** — Auto-generated from git history (added in Phase 2).

We also highlight outstanding contributions on social channels and in community spotlights.

---

## Questions?

| Need | How |
|------|-----|
| **General** | Open a [Discussion](https://github.com/app-launch-os/app-launch-os/discussions) |
| **Bug report** | Use the **Bug Report** issue template |
| **Feature request** | Use the **Feature Request** issue template |
| **Policy update** | Use the **Policy Update** issue template |
| **Security** | See [SECURITY.md](.github/SECURITY.md) or email `security@app-launch-os.org` |
| **Legal/Policy** | Email `legal@app-launch-os.org` (non-attorney review only) |
| **Code of Conduct** | Email `conduct@app-launch-os.org` |

---

## Contributors

Thank you to everyone who has contributed to App Launch OS! A full list is maintained in `CONTRIBUTORS.md` (auto-generated from git history starting in Phase 2).

---

*Last Updated: 2026-09-20*
*Version: 0.1.0*
*License: MIT*

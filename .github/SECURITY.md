# Security Policy

## Reporting a vulnerability

App Launch OS follows the principle of **coordinated vulnerability disclosure**. If
you believe you have found a security issue, **do not open a public GitHub issue**.
Report it privately so we can resolve it before it is disclosed.

### How to report

- **Email**: `security@applaunchos.dev` (use a PGP-encrypted message if available;
  the key fingerprint is published on the repository profile when rotation is not pending).
- **GitHub**: Open a **private** security advisory on this repository using the
  "Report a vulnerability" button. This routes the report to the maintainer team.

Please include:

1. A description of the vulnerability and the potential impact.
2. Steps to reproduce or a proof-of-concept (screenshots/PoC are helpful).
3. The version/tag/commit you tested against.
4. Your name/handle and how you would like to be credited (or request anonymity).

### What to send and what NOT to send

- **Send**: the vulnerability details and your contact information.
- **Do NOT send**: full exploit code that is weaponized, private keys, or production
  credentials. A minimal reproduction is sufficient.

### Scope

This repository is **documentation-first (Phase 1)** and ships no compiled
binaries or hosted runtime service in this phase. The security scope is limited to:

- The markdown content and templates in this repository.
- The GitHub Actions workflows under `.github/`.
- Tooling recommendations that link to third-party projects (we disclose their
  licenses and isolation requirements in `LICENSES/THIRD-PARTY-NOTICES.md`).

Out of scope: vulnerabilities in projects referenced only by link, unless they are
bundled into an App Launch OS artifact (this occurs only with explicit approval
and is documented as an isolated tool).

## Response timeline

| Step | Target |
| --- | --- |
| Acknowledge report | 48 hours (business days) |
| Triage / initial assessment | 5 business days |
| Patch / mitigation prepared | 21 days (or documented remediation path) |
| Public disclosure | Coordinated, after a fix is available |

We will keep you informed of progress. If the 21-day window is not achievable, we
will publish a temporary mitigation and negotiate a disclosure date.

## Known limitations

- Phase 1 does **not** host user data, authentication, or server-side endpoints.
  There is no account surface to breach.
- Secrets referenced in this repository (API keys, store credentials) **must** be
  stored in GitHub Encrypted Secrets, never in source. The license-check and
  freshness-lint workflows verify that no secrets or GPL/AGPL client dependencies
  are introduced.
- If the report concerns a referenced third-party project, we will update the
  documentation and the `awesome.md` / `THIRD-PARTY-NOTICES.md` entries and notify
  consumers to upgrade.

## Attribution

We will credit reporters in the release notes / changelog unless anonymity is
requested. Please let us know at report time if you want to be credited, and under
which name.

---

*This is a starting disclosure policy; it may be updated via pull request and is
subject to the 90-day freshness check in `.github/workflows/freshness-lint.yml`.
Last updated: 2026-09-20.*

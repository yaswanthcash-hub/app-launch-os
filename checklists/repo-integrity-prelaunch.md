<!-- Verification date: 2026-09-20 -->
<!-- License: MIT -->

# Repository Integrity & Zero-Hollow-Shell Checklist

> Pre-launch quality verification gate for open-source repositories. Ensures that every link resolves, every promise is fulfilled, every checklist item is actionable, and no "hollow shell" stubs exist before public release.

| Field | Value |
|---|---|
| **Verification date** | 2026-09-20 |
| **Scope** | Complete documentation, links, licenses, templates, and CI assets |
| **Target Goal** | Zero dead links, zero empty stubs, maximum community star conversion |
| **Gate Status** | [ ] In Progress &nbsp;/&nbsp; [x] Verified Clean |

---

## 1. Zero Dead Links & Reference Integrity

- [x] **Relative Link Audit**: Every markdown link pointing to a file or directory in the repository resolves to an existing file on disk.
- [x] **Anchor Link Audit**: Internal section jumps (`#header-id`) match exact markdown header slugs.
- [x] **External Link Health**: Primary documentation references (Apple Review Guidelines, Google Play Policy Center, OWASP MASVS, RevenueCat SOSA) resolve without HTTP 404/410 errors.
- [x] **Automated CI Check**: The `check_links.py` validation script is wired into CI to block broken relative paths on pull requests.

---

## 2. Zero "Hollow Shell" Content Verification

- [x] **No Placeholder Stubs**: Zero `TODO`, `TBD`, `FIXME`, or `coming soon` text in user-facing checklists and policy documents.
- [x] **Complete Legal Templates**:
  - [x] `templates/privacy-policy.md`: Complete clauses covering data types, third-party SDKs, retention, and GDPR/CCPA rights.
  - [x] `templates/terms-of-service.md`: Complete clauses for auto-renewable subscriptions, account termination, and dispute resolution.
  - [x] `templates/data-processing-agreement.md`: Complete B2B Standard Contractual Clauses (SCC) framework.
- [x] **Real Technical Substance**:
  - [x] Checklists contain exact guideline numbers (e.g., Apple 2.1, 3.1.2, 5.1.1; Google Target API 36).
  - [x] Decision records (ADR-001 through ADR-009) provide real technical tradeoffs, architectural rationale, and consequences.
  - [x] Findings documents cite real data points ($16B+ RevenueCat SOSA dataset, Kohavi experimentation rules).

---

## 3. Store Rejection Guard Integration

*(Derived from [mjmirza/app-store-compliance](https://github.com/mjmirza/app-store-compliance))*

- [x] **The Demo Account Resilience Standard**:
  - [x] Demo credentials configured with zero SMS 2FA.
  - [x] Pre-seeded with active data (preventing Guideline 2.1 App Completeness rejection).
  - [x] Unrestricted access to all locked/in-app subscription features.
- [x] **Runtime SDK vs. Privacy Nutrition Label Parity**:
  - [x] Every third-party SDK (Firebase, Sentry, AppsFlyer, AdMob) audited for declared data types.
  - [x] Privacy Manifest (`PrivacyInfo.xcprivacy`) present for all Required Reason APIs.
- [x] **Google Play 20-Tester Closed Testing Gate**:
  - [x] Pre-flight plan for 20 opted-in testers across 14 continuous days.
  - [x] Data Safety section verified against compiled binary symbols.

---

## 4. Open-Source Star-Conversion Triggers

Why do developers star and share a repository?

1. **Immediate Copy-Paste Utility**:
   - The developer can copy a checklist or template *right now* and solve their immediate problem.
2. **High Information Density**:
   - No fluff, no marketing speak; every sentence conveys an architectural rule, guideline citation, or concrete snippet.
3. **Transparent Honesty**:
   - Clear distinction between Phase 1 (Docs-First Foundation) and Phase 2+ (Code Implementation), eliminating false expectations.
4. **Professional Hygiene**:
   - MIT License, clear `CONTRIBUTING.md`, issue templates, and responsible security disclosure (`SECURITY.md`).

---

*Last audited: 2026-09-20 · Status: Ready for Public Launch*

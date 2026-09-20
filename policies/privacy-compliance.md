# Privacy Compliance Essentials

> **Educational guide, not legal advice.** This document summarizes common
> privacy and mobile-data practices for planning and review. It does not
> determine which laws apply, establish a lawful basis, or claim that an app is
> compliant. Obtain qualified legal and security review for the jurisdictions,
> audiences, data types, and business model involved.

- **Owner:** `[TEAM / OWNER]`
- **App or service:** `[APP / SERVICE NAME]`
- **Controller or responsible entity:** `[ENTITY NAME]`
- **Last verified:** 2026-09-20
- **Next review:** `[DATE OR TRIGGER]`

## Purpose

Use this guide to build a privacy review process around the actual data
lifecycle of a mobile app. Treat privacy as a product and engineering control,
not as a document-only exercise. A privacy policy, store disclosure, consent
prompt, or security tool does not by itself establish lawful or policy-compliant
processing.

## Source links

All sources below were checked on **2026-09-20**:

- [EU General Data Protection Regulation (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [European Commission: GDPR principles](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr_en)
- [European Commission: GDPR obligations](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/obligations_en)
- [ICO: Create your own privacy notice](https://ico.org.uk/create-your-own-privacy-notice)
- [Apple Privacy Manifest Files](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files)
- [Apple App Tracking Transparency](https://developer.apple.com/documentation/apptrackingtransparency)
- [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)
- [Google Play Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en)
- [OWASP MASVS Privacy](https://mas.owasp.org/MASVS/12-MASVS-PRIVACY/)

## Core principles

### 1. Map the data before choosing controls

Create a data inventory that covers:

- data entered by the user;
- data observed or inferred by the app;
- device, network, diagnostic, and usage data;
- data collected by third-party SDKs, WebView content, ad networks, analytics,
  authentication, payment, crash, and AI services;
- data transmitted off-device, stored locally, placed in backups, written to
  logs, or sent to another app;
- data retained after account closure, uninstall, trial expiration, or service
  termination.

Record the source, purpose, recipient, storage location, retention period,
deletion method, and owner for each item. Do not label data as anonymous merely
because a direct name or email address is absent; assess whether it can
reasonably be linked back to a person.

### 2. Limit collection and reuse

Collect only data needed for a documented function. Separate optional features
from core functionality so users can decline optional collection without losing
unrelated features. Avoid collecting sensitive data by default. Reuse or
repurpose data only after reviewing the original disclosure, user expectations,
applicable requirements, and technical controls.

### 3. Make disclosures understandable and accurate

A privacy notice should explain, in plain language:

- who is responsible for processing;
- what data is accessed, collected, used, inferred, stored, and shared;
- why each category is processed and the applicable legal basis where relevant;
- whether provision is required or optional and the consequence of declining;
- recipients, service providers, and relevant international transfers;
- retention periods or decision criteria;
- security measures at a meaningful level of detail;
- user choices, rights, contact routes, and complaint routes where applicable;
- automated decision-making or profiling, if any.

Keep the notice synchronized with the app, SDKs, store disclosures, consent
screens, contracts, and actual network behavior.

### 4. Separate notice, choice, and permission

A privacy policy is not a substitute for a just-in-time disclosure or a platform
permission prompt. Present a clear explanation before collecting data that a
reasonable user may not expect, especially background location, contacts,
camera, microphone, health, precise location, screen recording, or cross-app
tracking. Obtain affirmative action where consent is required and do not treat
silence, inactivity, Back, or tapping outside a dialog as consent.

### 5. Secure the full lifecycle

Apply least privilege, encryption in transit, appropriate encryption at rest,
secure key storage, access controls, logging restrictions, backup controls,
patching, dependency review, and tested deletion. Protect development, staging,
support, analytics, and backup environments as well as production. Do not place
secrets, authentication tokens, raw sensitive data, or unredacted support
transcripts in client logs.

### 6. Plan retention and deletion

Define retention by data category and purpose, not by a single blanket period.
Document legal, security, fraud-prevention, backup, and dispute-hold exceptions
without using them as a reason to retain everything indefinitely. Test deletion
across application databases, object storage, search indexes, caches, logs,
analytics, data warehouses, service providers, and backups where technically
possible. Explain any delayed or partial deletion accurately.

### 7. Treat processors and SDKs as part of the system

Before integration, review each vendor's data categories, purposes, retention,
subprocessors, security documentation, deletion support, transfer mechanisms,
and policy status. Configure SDKs to the minimum necessary behavior. Re-test
after every SDK upgrade because defaults and network behavior can change.

## Mobile platform controls

### Apple ecosystem

- [ ] Review the App Privacy Details against runtime behavior and the privacy
      policy.
- [ ] Review Privacy Manifest requirements for the app and included third-party
      SDKs.
- [ ] Determine whether App Tracking Transparency applies to the actual tracking
      behavior.
- [ ] Verify permission purpose strings are specific and shown close to the
      relevant feature.
- [ ] Confirm account deletion and data handling are accurately described where
      accounts are supported.
- [ ] Review Kids Category restrictions and any special limits on third-party
      analytics or advertising.

### Google Play ecosystem

- [ ] Complete the Data safety form from the application and SDK data inventory.
- [ ] Keep the Data safety form consistent with the privacy policy and actual
      behavior.
- [ ] Provide a valid privacy policy in Play Console and inside the app.
- [ ] Use prominent in-app disclosure and affirmative consent where the User
      Data policy requires it.
- [ ] Provide discoverable in-app and external account-deletion routes when
      account creation is offered.
- [ ] Review persistent identifier restrictions, sensitive permissions, Families
      requirements, and SDK Index guidance.

## Privacy review checklist

### Discovery

- [ ] Product scope, target audiences, territories, platforms, and business
      model are documented.
- [ ] Data owners and decision-makers are named.
- [ ] A data-flow diagram covers device, app, API, vendors, backups, and support
      tools.
- [ ] Sensitive, children's, health, financial, biometric, precise-location, and
      user-generated data are identified.
- [ ] Data received from another source is identified and its origin is
      documented.

### Design

- [ ] Each data element has a documented purpose and necessity decision.
- [ ] Optional data collection can be declined without unrelated feature loss
      where feasible.
- [ ] Privacy defaults minimize collection, sharing, visibility, and retention.
- [ ] Consent and permission flows are separate, specific, accessible, and
      auditable.
- [ ] Data minimization, pseudonymization, aggregation, or on-device processing
      was considered.
- [ ] Children and vulnerable-user scenarios have been reviewed by an
      appropriate specialist.

### Implementation

- [ ] Sensitive data is excluded from logs, crash reports, analytics payloads,
      notifications, clipboard, and screenshots where practical.
- [ ] Local storage uses the platform's appropriate protected storage and is
      excluded from backups when required.
- [ ] TLS and certificate validation are configured correctly; cleartext traffic
      is disabled unless explicitly justified.
- [ ] Secrets and tokens are not embedded in the app or client configuration.
- [ ] Access to production data is role-based, logged, reviewed, and
      time-limited.
- [ ] Vendor SDKs are pinned, reviewed, and configured consistently with
      disclosures.

### Operations

- [ ] Privacy requests have an intake, identity-check, routing, response, and
      escalation process.
- [ ] Deletion, correction, export, restriction, objection, and
      consent-withdrawal workflows are tested where applicable.
- [ ] Incident response includes privacy impact assessment, evidence
      preservation, notification decisions, and vendor coordination.
- [ ] Retention jobs and deletion jobs are monitored and failure-handled.
- [ ] Subprocessor and vendor changes trigger a privacy review.
- [ ] Policy, notice, store disclosure, consent copy, and data map version
      changes are recorded.

## Evidence register

| Control or claim             | Evidence       | Owner     | Last tested | Next review |
| ---------------------------- | -------------- | --------- | ----------- | ----------- |
| Data inventory               | `[LINK]`       | `[OWNER]` | `[DATE]`    | `[DATE]`    |
| Data-flow diagram            | `[LINK]`       | `[OWNER]` | `[DATE]`    | `[DATE]`    |
| Privacy notice               | `[URL / LINK]` | `[OWNER]` | `[DATE]`    | `[DATE]`    |
| Consent and permission flows | `[LINK]`       | `[OWNER]` | `[DATE]`    | `[DATE]`    |
| SDK/vendor review            | `[LINK]`       | `[OWNER]` | `[DATE]`    | `[DATE]`    |
| Retention and deletion test  | `[LINK]`       | `[OWNER]` | `[DATE]`    | `[DATE]`    |
| Access-control review        | `[LINK]`       | `[OWNER]` | `[DATE]`    | `[DATE]`    |
| Incident response exercise   | `[LINK]`       | `[OWNER]` | `[DATE]`    | `[DATE]`    |

## Release gate

Do not describe the app as compliant or launch a material data practice until
the responsible owners have reviewed the inventory, disclosures, user controls,
vendor behavior, security controls, retention, deletion, and applicable store
requirements. Record unresolved questions and the person authorized to accept
the residual risk.

## Maintenance

Review this guide at least every 90 days and whenever the app adds a data
category, SDK, audience, territory, AI feature, advertising practice, account
function, retention rule, or material vendor change.

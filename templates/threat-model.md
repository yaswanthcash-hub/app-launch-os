# Mobile Threat Model Template

> **Educational template, not legal advice.** This document is a structured
> security-planning aid. It does not certify security, establish compliance, or
> replace testing, code review, threat intelligence, incident response, or
> qualified legal/security review. Validate every assumption and control against
> the actual architecture and current threat landscape.

- **Owner:** `[TEAM / OWNER]`
- **Product:** `[APP OR SERVICE NAME]`
- **Model version:** `[VERSION]`
- **Status:** `[DRAFT / PROPOSED / ACCEPTED / SUPERSEDED]`
- **Scope:** `[APP VERSION / PLATFORMS / RELEASE]`
- **Last verified:** 2026-09-20
- **Next review:** `[DATE OR TRIGGER]`

## Purpose

Use this template to identify valuable assets, trust boundaries, attackers,
attack surfaces, threats, controls, and residual risk before and during
mobile-app development. A threat model is a living design artifact: update it
when architecture, data, SDKs, platform APIs, threat intelligence, or business
use changes.

## Source links

All sources below were checked on **2026-09-20**:

- [OWASP Mobile Application Security Verification Standard (MASVS)](https://mas.owasp.org/MASVS/)
- [OWASP Mobile Application Security Testing Guide (MASTG)](https://mas.owasp.org/MASTG/)
- [OWASP MASVS Privacy](https://mas.owasp.org/MASVS/12-MASVS-PRIVACY/)
- [OWASP Threat Modeling Project](https://owasp.org/www-project-threat-modeling/)
- [Apple App Review Guidelines — Data Security](https://developer.apple.com/app-store/review/guidelines/#data-security)
- [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)

## Scope and assumptions

### In scope

- `[MOBILE APP VERSIONS / PLATFORMS]`
- `[API SERVERS / GATEWAYS / ADMIN PORTALS]`
- `[AUTHENTICATION / PAYMENT / ANALYTICS / AI / NOTIFICATION PROVIDERS]`
- `[DATA STORES / BACKUPS / LOGS / FEATURE FLAGS]`
- `[BUILD, SIGNING, CI/CD, DISTRIBUTION, AND RELEASE SYSTEMS]`
- `[USER GROUPS / TENANTS / ADMINISTRATORS / SUPPORT STAFF]`

### Out of scope

- `[SYSTEMS OR USE CASES NOT ASSESSED]`
- `[THIRD-PARTY SERVICES REVIEWED ONLY AT INTERFACE LEVEL]`
- `[PHYSICAL FACILITIES / NON-SOFTWARE PROCESSES]`

### Assumptions

1. `[ASSUMPTION ABOUT TRUSTED NETWORKS, PLATFORM SECURITY, OR USER BEHAVIOR]`
2. `[ASSUMPTION ABOUT BACKEND AUTHENTICATION OR RATE LIMITS]`
3. `[ASSUMPTION ABOUT SDK CONFIGURATION OR DATA FLOW]`
4. `[ASSUMPTION ABOUT SUPPORT, ADMIN, OR INCIDENT-RESPONSE CAPABILITY]`

List assumptions explicitly so reviewers can challenge them. An incorrect
assumption is a threat-model finding.

## Assets and security objectives

| Asset                             | Owner     | Data classification         | Security objectives                        | Location / flow |
| --------------------------------- | --------- | --------------------------- | ------------------------------------------ | --------------- |
| `[USER CREDENTIALS / TOKENS]`     | `[OWNER]` | `[CONFIDENTIAL/RESTRICTED]` | Confidentiality, integrity, availability   | `[LOCATION]`    |
| `[PERSONAL OR SENSITIVE DATA]`    | `[OWNER]` | `[CLASS]`                   | Confidentiality, minimization, deletion    | `[LOCATION]`    |
| `[PAYMENT / SUBSCRIPTION DATA]`   | `[OWNER]` | `[CLASS]`                   | Integrity, non-repudiation, availability   | `[LOCATION]`    |
| `[CONTENT / USER-GENERATED DATA]` | `[OWNER]` | `[CLASS]`                   | Integrity, availability, moderation        | `[LOCATION]`    |
| `[API KEYS / SECRETS]`            | `[OWNER]` | `[RESTRICTED]`              | Confidentiality, rotation, least privilege | `[LOCATION]`    |
| `[BUILD AND SIGNING ARTIFACTS]`   | `[OWNER]` | `[RESTRICTED]`              | Integrity, authenticity, traceability      | `[LOCATION]`    |
| `[ANALYTICS / LOG DATA]`          | `[OWNER]` | `[CLASS]`                   | Minimization, access control, retention    | `[LOCATION]`    |

## Actors and trust levels

| Actor                    | Trust level | Capabilities                                  | Goals / motivations                                | Controls                                        |
| ------------------------ | ----------- | --------------------------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| Anonymous visitor        | Low         | Install, launch, use public features          | Explore or abuse service                           | Rate limits, validation, safe defaults          |
| Authenticated user       | Medium      | Access own account and data                   | Use product; possibly exceed authorization         | Authorization, session controls, auditing       |
| Privileged user / admin  | High        | Manage accounts, content, configuration       | Operate service; possible insider misuse           | MFA, least privilege, approval, audit           |
| Support agent            | Medium-high | View limited account data                     | Resolve requests                                   | Role separation, masking, logging               |
| External API client      | Medium      | Call approved APIs                            | Integrate or automate                              | API keys, scopes, throttling                    |
| Malicious user           | Untrusted   | Manipulate input, device, network, or account | Theft, fraud, disruption, privacy invasion         | Validation, abuse detection, hardening          |
| Compromised device       | Untrusted   | Run modified app or inspect local state       | Extract data, bypass controls                      | Secure storage, attestation where justified     |
| Third-party SDK/provider | Variable    | Execute code or receive data                  | Provide service; possible misuse or breach         | Vendor review, sandboxing, data minimization    |
| Infrastructure operator  | High        | Operate cloud, CI/CD, signing, backups        | Maintain service; possible error or insider action | Separation of duties, monitoring, access review |

## Trust boundaries and data flows

Draw or attach a diagram showing:

- mobile app and OS sandbox;
- local storage, keychain/keystore, clipboard, backups, logs, notifications, and
  screenshots;
- TLS connections to APIs, CDN, WebSocket, push, payment, analytics, and AI
  services;
- authentication and authorization boundaries;
- admin and support portals;
- CI/CD, artifact registry, signing, and distribution;
- third-party SDKs and cross-app intents/URLs;
- backups, data warehouse, observability, and deletion pipelines.

| Flow ID  | Source  | Destination       | Data     | Protocol / authentication | Trust boundary crossed | Owner     |
| -------- | ------- | ----------------- | -------- | ------------------------- | ---------------------- | --------- |
| `DF-001` | `[APP]` | `[API]`           | `[DATA]` | `[TLS / AUTH]`            | `[YES/NO]`             | `[OWNER]` |
| `DF-002` | `[SDK]` | `[VENDOR]`        | `[DATA]` | `[PROTOCOL]`              | `[YES/NO]`             | `[OWNER]` |
| `DF-003` | `[APP]` | `[LOCAL STORAGE]` | `[DATA]` | `[API]`                   | `[YES/NO]`             | `[OWNER]` |

## STRIDE threat worksheet

Use one row per concrete threat. Do not write “all STRIDE threats apply”;
identify the mechanism, impact, evidence, and control.

| ID      | Asset / flow | Threat     | STRIDE category | Attack scenario | Impact           | Likelihood       | Existing controls | Evidence / test | Gap / action | Owner     | Due      | Status                      | Residual risk    |
| ------- | ------------ | ---------- | --------------- | --------------- | ---------------- | ---------------- | ----------------- | --------------- | ------------ | --------- | -------- | --------------------------- | ---------------- |
| `T-001` | `[ASSET]`    | `[THREAT]` | `[S/T/R/I/D/E]` | `[SCENARIO]`    | `[LOW/MED/HIGH]` | `[LOW/MED/HIGH]` | `[CONTROL]`       | `[LINK]`        | `[ACTION]`   | `[OWNER]` | `[DATE]` | `[OPEN/MITIGATED/ACCEPTED]` | `[LOW/MED/HIGH]` |

### STRIDE prompts

| Category               | Questions                                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spoofing               | Can an attacker impersonate a user, device, server, SDK, admin, or service? Are credentials, tokens, certificates, deep links, intents, and recovery flows protected? |
| Tampering              | Can data, code, configuration, logs, requests, responses, or updates be modified in transit, at rest, in memory, or during build and release?                         |
| Repudiation            | Can a user, administrator, service, or system deny an action? Are audit events complete, time-synchronized, access-controlled, and retained?                          |
| Information disclosure | Can personal, sensitive, proprietary, or operational data leak through storage, logs, notifications, screenshots, backups, errors, SDKs, analytics, or side channels? |
| Denial of service      | Can an attacker exhaust battery, storage, network, API quota, compute, payment, moderation, or support capacity? Are rate limits and recovery tested?                 |
| Elevation of privilege | Can a user, process, SDK, or compromised component cross an authorization, sandbox, role, tenant, platform, or trust boundary?                                        |

## Risk method

Use a simple, documented method and apply it consistently:

- **Impact:** Low = limited inconvenience; Medium = material user, operational,
  financial, or privacy harm; High = severe, widespread, regulated, safety, or
  business-critical harm.
- **Likelihood:** Low = difficult or unlikely; Medium = plausible with moderate
  capability or exposure; High = readily exploitable or actively observed.
- **Initial risk:** Combine impact and likelihood before controls.
- **Residual risk:** Reassess after controls and testing.
- **Acceptance:** High residual risk requires named approval, an expiration
  date, and a mitigation plan. A template cannot approve risk on its own.

| Impact \ Likelihood | Low    | Medium | High   |
| ------------------- | ------ | ------ | ------ |
| Low                 | Low    | Low    | Medium |
| Medium              | Low    | Medium | High   |
| High                | Medium | High   | High   |

## Control checklist

### Mobile storage and data handling

- [ ] Sensitive data is not stored in plaintext in preferences, databases,
      files, logs, clipboard, notifications, screenshots, or backups.
- [ ] Appropriate platform secure storage is used for tokens, keys, and other
      secrets.
- [ ] Local data is minimized, encrypted where appropriate, and excluded from
      backups when required.
- [ ] Keyboard caching, pasteboard behavior, screen visibility, and recent-app
      snapshots are reviewed.
- [ ] Data deletion covers local stores, server records, indexes, caches, logs,
      analytics, and backups where applicable.

### Authentication and authorization

- [ ] Authentication state, session expiry, refresh-token storage, logout, and
      account switching are tested.
- [ ] Authorization is enforced on the server for every object and action;
      client-side checks are not the only control.
- [ ] Privileged and support actions use least privilege, MFA where appropriate,
      approval, and audit logging.
- [ ] Password reset, email change, device enrollment, and recovery flows resist
      enumeration and takeover.
- [ ] Deep links, universal links, app links, intents, and custom schemes
      validate origin, state, and authorization.

### Network and communication

- [ ] TLS is enforced with correct hostname and certificate validation;
      cleartext traffic is disabled unless explicitly justified.
- [ ] Tokens are sent only to intended origins and are not placed in URLs, logs,
      analytics, or referrers.
- [ ] API responses use appropriate validation, authorization, rate limits,
      pagination, and error handling.
- [ ] Certificate pinning, if used, has a tested rotation and rollback plan.
- [ ] Push, WebSocket, file transfer, and webhook authenticity and replay
      protections are reviewed.

### Code, SDKs, and supply chain

- [ ] Release builds disable debug flags, verbose logging, test endpoints, and
      insecure fallback behavior.
- [ ] Dependencies, native libraries, SDKs, and containers are inventoried and
      scanned.
- [ ] SDK network behavior and data collection are tested after every upgrade.
- [ ] Dynamic code loading, unsafe deserialization, WebView bridges, exported
      components, and IPC surfaces are reviewed.
- [ ] Signing keys, CI/CD credentials, build artifacts, and release approvals
      use least privilege and separation of duties.

### Resilience and abuse

- [ ] Rate limits, quotas, retry limits, backoff, circuit breakers, and abuse
      detection protect critical flows.
- [ ] Offline, interrupted, duplicate, replayed, and out-of-order requests
      behave safely.
- [ ] Moderation, reporting, blocking, and incident escalation are available for
      user-generated content.
- [ ] Root/jailbreak, emulator, integrity, or attestation signals are used
      proportionately and do not create unsafe exclusions.
- [ ] Recovery, backup, rollback, and disaster-recovery procedures are tested.

### Privacy and platform behavior

- [ ] Permissions are requested close to the feature and paired with a clear
      explanation where needed.
- [ ] Unexpected or sensitive collection has an appropriate disclosure and
      affirmative choice where required.
- [ ] Tracking, advertising, analytics, and SDK data flows match the privacy
      notice and store disclosures.
- [ ] Children, health, financial, location, contact, camera, microphone, and
      other sensitive scenarios receive specialist review.
- [ ] User deletion, export, correction, and consent-withdrawal workflows are
      tested end to end.

## Verification plan

| Control / threat | Verification method                                | Environment | Owner     | Evidence | Date     | Result             |
| ---------------- | -------------------------------------------------- | ----------- | --------- | -------- | -------- | ------------------ |
| `[CONTROL]`      | `[STATIC / DYNAMIC / PENETRATION / TEST / REVIEW]` | `[ENV]`     | `[OWNER]` | `[LINK]` | `[DATE]` | `[PASS/FAIL/OPEN]` |

## Findings and risk acceptance

| Finding     | Severity                     | Threat IDs | Remediation | Owner     | Due date | Acceptance authority | Expiration |
| ----------- | ---------------------------- | ---------- | ----------- | --------- | -------- | -------------------- | ---------- |
| `[FINDING]` | `[LOW/MEDIUM/HIGH/CRITICAL]` | `[IDS]`    | `[ACTION]`  | `[OWNER]` | `[DATE]` | `[NAME / ROLE]`      | `[DATE]`   |

## Review checklist

- [ ] Scope, assumptions, assets, actors, boundaries, and data flows are
      complete.
- [ ] Every high-value asset and trust-boundary crossing has at least one threat
      analysis.
- [ ] STRIDE rows describe concrete scenarios rather than generic risks.
- [ ] Existing controls have evidence and a verification method.
- [ ] Open high-risk findings have owners, due dates, and approved treatment.
- [ ] Privacy, SDK, platform, supply-chain, and release-system surfaces are
      included.
- [ ] Deletion, incident response, abuse, and recovery paths are modeled.
- [ ] The model is updated after architecture, data, SDK, API, or threat
      changes.
- [ ] The final residual risk was reviewed by the appropriate product, security,
      and business owners.

## Reference links

Reference links were checked on **2026-09-20** and are starting points, not a
substitute for current security testing or legal review:

- [OWASP MASVS](https://mas.owasp.org/MASVS/)
- [OWASP MASTG](https://mas.owasp.org/MASTG/)
- [OWASP Threat Modeling Project](https://owasp.org/www-project-threat-modeling/)
- [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en)

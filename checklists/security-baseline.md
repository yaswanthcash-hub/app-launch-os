# App Launch OS — OWASP MASVS v2.1 Security Baseline Checklist

> **Verification Date**: 2026-09-20
> **Standard**: OWASP Mobile Application Security Verification Standard (MASVS) v2.1.0
> **Source**: [OWASP MASVS GitHub](https://github.com/OWASP/owasp-masvs) | [MASTG](https://github.com/OWASP/owasp-mastg)
> **License**: CC BY-SA 4.0 (MASVS/MASTG content)

---

## Tier Definitions (per IMPLEMENTATION_PLAN.md §1.3)

| Tier | Scope | Target Audience | Implementation Effort |
|------|-------|-----------------|----------------------|
| **Tier 1 (Baseline)** | Automated dependency scanning, secure credential storage, no sensitive data in AsyncStorage | All apps (indie, startup, agency) | <30 min setup |
| **Tier 2 (Hardened)** | SAST scanning, automated mobile static analysis, TLS certificate pinning | Regulated apps, apps handling PII/payments | 2–4 hours |
| **Tier 3 (Enterprise)** | Device integrity attestation (Play Integrity / DeviceCheck), network security config | Fintech, Health, Gov, high-value targets | 4–8 hours + backend |

> **No Guarantees**: This checklist provides verification steps aligned with MASVS controls. It does not guarantee compliance, certification, or immunity from vulnerabilities. Independent penetration testing and professional security review are recommended for production applications.

---

## Domain 1: Architecture, Design & Threat Modeling (MASVS-ARCH)

### MASVS-ARCH-1: Threat Model Exists
- [ ] **T1** Threat model document created using STRIDE template (`templates/threat-model.md`)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Threat model reviewed and updated per release cycle
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Threat model includes device integrity & supply-chain risks
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-ARCH-2: Security Requirements Documented
- [ ] **T1** Security requirements captured in ADR (ADR-003) and this checklist
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Security requirements traced to MASVS controls with verification methods
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Security requirements validated by external review
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-ARCH-3: Secure Architecture Patterns
- [ ] **T1** No hardcoded secrets in source; all secrets via env/Secret Manager
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Network security config (Android) / ATS (iOS) enforces TLS 1.2+
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Certificate pinning implemented for all API endpoints
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Network security config enforces pinning + backup pins; attestation-backed trust
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-ARCH-4: Platform Security Features Used
- [ ] **T1** Keychain (iOS) / Keystore (Android) used for all credentials (`react-native-keychain`)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Biometric authentication gated behind Keychain/Keystore (not local-only)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Hardware-backed keystore verified (StrongBox / Secure Enclave)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Device integrity attestation integrated (Play Integrity API / DeviceCheck)
  - Owner: ___________  Evidence: ___________  Date: ___________

---

## Domain 2: Data Storage & Privacy (MASVS-STORAGE)

### MASVS-STORAGE-1: No Sensitive Data in Insecure Storage
- [ ] **T1** Zero sensitive data in `AsyncStorage` / `localStorage` / `SharedPreferences`
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** All tokens, keys, PII stored in `react-native-keychain` / Expo SecureStore
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** `react-native-mmkv` used with encryption enabled for structured data
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Encryption keys derived from hardware-backed keystore (not derived from PIN only)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Encrypted database (SQLCipher / Realm encryption) for bulk sensitive data
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-STORAGE-2: Secure Key Management
- [ ] **T1** No symmetric keys stored in plaintext; all keys in Keychain/Keystore
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Key rotation policy documented and automated (90-day max for session keys)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** HSM / Cloud KMS integration for server-side key wrapping
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-STORAGE-3: Data Minimization & Retention
- [ ] **T1** Data retention policy defined; auto-purge for cached PII after 30 days
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Secure deletion (overwrite) for local sensitive files on logout/account deletion
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Cryptographic erasure (key destruction) for cloud-synced data
  - Owner: ___________  Evidence: ___________  Date: ___________

---

## Domain 3: Cryptography (MASVS-CRYPTO)

### MASVS-CRYPTO-1: Standard Algorithms & Protocols
- [ ] **T1** TLS 1.2+ enforced for all network connections (ATS / Network Security Config)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** No custom crypto; only platform-provided or audited libraries (WebCrypto, libsodium)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** AES-GCM / ChaCha20-Poly1305 for symmetric encryption; RSA-OAEP / ECDH for asymmetric
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Post-quantum hybrid KEM (e.g., ML-KEM + ECDH) evaluated for long-lived secrets
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-CRYPTO-2: Proper Key Usage
- [ ] **T1** Unique IV/nonce per encryption operation (never reused)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Keys never logged, printed, or exposed in crash reports
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Key separation: distinct keys for encryption, authentication, key wrapping
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-CRYPTO-3: Random Number Generation
- [ ] **T1** `crypto.getRandomValues()` / `SecureRandom` used for all cryptographic randomness
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Entropy source verified on first launch (health check)
  - Owner: ___________  Evidence: ___________  Date: ___________

---

## Domain 4: Authentication & Session Management (MASVS-AUTH)

### MASVS-AUTH-1: Strong Authentication
- [ ] **T1** MFA supported (TOTP, passkeys/WebAuthn, push approval)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Biometric prompt uses system APIs (`LocalAuthentication` / `BiometricPrompt`)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** FIDO2 / Passkey support implemented (Better Auth / native WebAuthn)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Risk-based authentication (device trust, geo-velocity, behavioral)
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-AUTH-2: Session Management
- [ ] **T1** Short-lived access tokens (≤15 min); refresh tokens rotation + reuse detection
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Session invalidated on logout, password change, security events
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Concurrent session limits; device management UI for users
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Continuous authentication / step-up auth for high-risk actions
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-AUTH-3: Account Recovery
- [ ] **T1** Secure account recovery (no SMS-only; email + backup codes + passkeys)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Recovery flow rate-limited and monitored for abuse
  - Owner: ___________  Evidence: ___________  Date: ___________

---

## Domain 5: Network Communication (MASVS-NETWORK)

### MASVS-NETWORK-1: Transport Security
- [ ] **T1** All connections use TLS 1.2+; cleartext traffic blocked (ATS / `networkSecurityConfig.xml`)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Certificate validation enforced; no custom trust managers accepting all certs
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Certificate pinning with backup pins for all API hosts
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Pinning enforced via native module (not JS-only); attestation-backed trust anchors
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-NETWORK-2: Secure Communication Patterns
- [ ] **T1** No sensitive data in URLs, headers logged, or query parameters
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** API requests use POST bodies for secrets; `Authorization: Bearer` headers only
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Request/response integrity via signed payloads (JWS / PASETO) or mTLS
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Network traffic analysis / anomaly detection on backend
  - Owner: ___________  Evidence: ___________  Date: ___________

---

## Domain 6: Platform Interaction (MASVS-PLATFORM)

### MASVS-PLATFORM-1: Intent / URL Scheme Security
- [ ] **T1** Deep links / universal links validated; no open redirects
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Exported activities / intent filters minimized; `android:exported="false"` by default
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Intent data validated and sanitized before use
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** App Links / Associated Domains verified with Digital Asset Links / apple-app-site-association
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-PLATFORM-2: IPC & Component Security
- [ ] **T1** No sensitive data passed via `Intent` extras / `Notification` payloads
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Content providers either not exported or require signature-level permission
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** PendingIntents use `FLAG_IMMUTABLE` / `FLAG_MUTABLE` correctly (Android 12+)
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-PLATFORM-3: Permissions & Privacy
- [ ] **T1** Minimum permissions requested; runtime permission rationale shown
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Privacy Manifest (`PrivacyInfo.xcprivacy`) / Data Safety Section accurate
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Permission usage audited quarterly; unused permissions removed
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Zero-knowledge architecture for sensitive permissions (e.g., on-device ML)
  - Owner: ___________  Evidence: ___________  Date: ___________

---

## Domain 7: Code Quality & Build Settings (MASVS-CODE)

### MASVS-CODE-1: Secure Build Configuration
- [ ] **T1** Debug builds disabled for production (`debuggable: false` / `isDebug: false`)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Code obfuscation / minification enabled (Hermes bytecode / ProGuard / R8)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Source maps not uploaded to public CDN; stored in secure artifact storage
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** `osv-scanner` runs in CI on every PR (GitHub Actions workflow)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Semgrep SAST runs in CI (containerized, LGPL isolation per IMPLEMENTATION_PLAN.md §2I)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** MobSF static analysis runs on release builds (standalone Docker, GPL isolated)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Reproducible builds verified; SBOM generated (SPDX / CycloneDX)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Binary hardening verified (PIE, RELRO, stack canaries, FORTIFY_SOURCE)
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-CODE-2: Dependency Management
- [ ] **T1** `package-lock.json` / `yarn.lock` committed; `npm audit` / `yarn audit` in CI
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** No GPL/AGPL dependencies in app bundle (license-check.yml CI gate)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Dependencies pinned to exact versions; `dependabot` / `renovate` for updates
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Supply-chain integrity: `sigstore` / `npm attestations` verified for critical deps
  - Owner: ___________  Evidence: ___________  Date: ___________

---

## Domain 8: Resilience & Anti-Tampering (MASVS-RESILIENCE)

### MASVS-RESILIENCE-1: Anti-Tampering
- [ ] **T1** Root/jailbreak detection (basic) — warns user, logs event
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Integrity verification: checksum of critical assets / bundle at runtime
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Hardware-backed attestation (Play Integrity / DeviceCheck) gates API access
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** Runtime application self-protection (RASP) for critical flows
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-RESILIENCE-2: Anti-Reversing
- [ ] **T1** Symbol stripping; no debug symbols in release builds
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Control-flow obfuscation / string encryption for sensitive logic
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T3** White-box cryptography for client-side key operations
  - Owner: ___________  Evidence: ___________  Date: ___________

### MASVS-RESILIENCE-3: Secure Logging & Error Handling
- [ ] **T1** No PII, tokens, or secrets in logs (Sentry `beforeSend` scrubber configured)
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T1** Generic error messages to users; detailed errors only in secure telemetry
  - Owner: ___________  Evidence: ___________  Date: ___________
- [ ] **T2** Security events (auth failures, tamper detection) sent to SIEM / alerting
  - Owner: ___________  Evidence: ___________  Date: ___________

---

## CI/CD Integration (IMPLEMENTATION_PLAN.md §1.3, §2I, §9)

| Check | Tier | Command / Workflow | Frequency |
|-------|------|-------------------|-----------|
| `osv-scanner` scan | T1 | `.github/workflows/ci.yml` | Every PR |
| `npm audit` / `yarn audit` | T1 | `.github/workflows/ci.yml` | Every PR |
| License check (GPL/AGPL block) | T1 | `.github/workflows/license-check.yml` | Every PR |
| Semgrep SAST | T2 | `.github/workflows/semgrep.yml` (containerized) | Every PR / nightly |
| MobSF static scan | T2 | `.github/workflows/mobsf.yml` (Docker) | Release candidate |
| Certificate pinning test | T2 | Custom script + device farm | Pre-release |
| Device integrity attestation | T3 | Play Integrity / DeviceCheck API | Runtime (enforced) |
| SBOM generation | T3 | `cyclonedx-bom` / `syft` | Release build |
| Binary hardening check | T3 | `hardening-check` / `checksec` | Release build |

---

## Evidence & Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Security Owner | ___________ | ___________ | ___________ |
| Lead Engineer | ___________ | ___________ | ___________ |
| Product Owner | ___________ | ___________ | ___________ |

---

## References & Official Sources (Verified 2026-09-20)

| ID | Reference | URL |
|----|-----------|-----|
| MASVS | OWASP MASVS v2.1.0 | https://github.com/OWASP/owasp-masvs/releases/tag/v2.1.0 |
| MASTG | OWASP MASTG v1.6.0 | https://github.com/OWASP/owasp-mastg |
| MSTG | Mobile Security Testing Guide | https://mas.owasp.org/MASTG/ |
| MASVS-CONTROLS | MASVS Verified Controls (24) | https://mas.owasp.org/MASVS/ |
| OSV | Open Source Vulnerabilities | https://osv.dev/ |
| SEMGREP | Semgrep Rules (Mobile) | https://semgrep.dev/explore |
| MOBSF | Mobile Security Framework | https://github.com/MobSF/Mobile-Security-Framework-MobSF |
| PLAY-INTEGRITY | Play Integrity API | https://developer.android.com/google/play/integrity |
| DEVICECHECK | Apple DeviceCheck | https://developer.apple.com/documentation/devicecheck |
| NETWORK-SEC | Android Network Security Config | https://developer.android.com/training/articles/security-config |
| ATS | Apple App Transport Security | https://developer.apple.com/documentation/bundleresources/information_property_list/nsapptransportsecurity |
| KEYCHAIN | react-native-keychain | https://github.com/oblador/react-native-keychain |
| SECURESTORE | Expo SecureStore | https://docs.expo.dev/versions/latest/sdk/securestore/ |

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2026-09-20 | 1.0.0 | Initial release aligned with IMPLEMENTATION_PLAN.md §1.3 & §4, MASVS v2.1.0 |

---

*This checklist is part of App Launch OS. Licensed under MIT. MASVS/MASTG content used under CC BY-SA 4.0.*

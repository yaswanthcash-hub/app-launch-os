# App Store Reviewer Access Policy & Setup Guide

> **Operational guide for App Store review compliance.** This document outlines the required procedure for providing Apple and Google reviewers access to authenticated app functionality without violating security policies or Guideline 2.1.
>
> **Last verified:** 2026-09-20 · **Authoritative source:** [Apple App Review Guideline 2.1](https://developer.apple.com/app-store/review/guidelines/#information-needed)

---

## 1. The Reviewer Sandbox Constraint (Guideline 2.1)

Under **Apple App Review Guideline 2.1 (Information Needed)**:
> *"If parts of your app are not accessible without sign-in, provide an active demo account and login information, plus any other hardware or resources that might be needed to review the app."*

### Why SMS / Phone OTP Fails Every Time
App Store review personnel test apps in automated and remote sandbox environments across global regions. Reviewers:
- **Cannot receive SMS text messages or cellular phone calls.**
- **Do not have physical SIM cards assigned to testing devices.**
- **Will immediately reject apps** if the demo login flow requires an external SMS OTP code.

---

## 2. Recommended Architecture: Server-Side Allowlist

Never hardcode client-side bypasses (e.g., hidden buttons or client-side condition checks that skip auth). Instead, implement a **server-side reviewer allowlist** in your authentication backend.

### Implementation Pattern

1. **Dedicated Test Identity in Auth Provider:**
   Create a dedicated user account in your identity provider (Supabase, Firebase, Clerk, Cognito, or custom backend):
   - **Username / Email:** `appstore-review@yourdomain.com` (or similar dedicated handle)
   - **Password:** A strong, dedicated test password

2. **Server-Side OTP Bypass:**
   If your app uses phone numbers or email OTP:
   - Configure your auth server to treat a designated test phone number or test email as a test identity.
   - Configure a fixed, static verification code (e.g., `123456`) strictly on the server for that designated test identifier.
   - **Never allow fixed OTP codes for non-allowlisted accounts in production.**

3. **Pre-Seeded Mock State:**
   Reviewers evaluate full feature functionality within minutes. Ensure the reviewer test account is pre-populated with:
   - Profile data and onboarding completion state.
   - Sample user content (e.g., mock projects, transactions, items).
   - Active Pro / subscription entitlements (in StoreKit sandbox mode) so paywall flows can be inspected without being blocked.

---

## 3. App Store Connect Configuration

When submitting your binary for review:

1. Navigate to **App Store Connect** → **My Apps** → **[Your App]** → **App Review Information**.
2. Check the **Sign-In Required** checkbox.
3. Enter:
   - **User Name**: The dedicated reviewer account identifier (e.g., `appstore-review@yourdomain.com`).
   - **Password**: The dedicated reviewer password.
4. In the **Notes** box, provide clear, concise instructions:
   ```text
   Reviewer Demo Credentials:
   - Account: appstore-review@yourdomain.com
   - Password: [SECURE_TEST_PASSWORD]
   - Pre-loaded State: This account is pre-configured with sample content and active sandbox Pro entitlements.
   - No SMS verification is required.
   ```
5. If your app requires external hardware or specific network conditions, attach a demo walkthrough video in the **Attachment** section.

---

## 4. Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Safe Alternative |
| :--- | :--- | :--- |
| **Client-side backdoor (`ReviewerBypass.ts`)** | Exposes insecure bypass credentials in client bundle. Risk of reverse engineering. | Server-side test credentials and allowlist. |
| **"Reviewer Login" button on live UI** | Confuses real users and creates an unintended access vector. | Reviewer enters credentials into standard login inputs. |
| **SMS OTP prompt on reviewer account** | Reviewer cannot receive SMS; triggers instant Guideline 2.1 rejection. | Static verification code configured on backend for reviewer handle only. |
| **Empty, unseeded reviewer account** | Reviewer encounters empty state or broken UI and rejects under Guideline 2.1. | Pre-seed account with mock activity and sandbox subscription. |

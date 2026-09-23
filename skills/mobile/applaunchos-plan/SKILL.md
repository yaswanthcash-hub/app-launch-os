---
name: applaunchos-plan
description: Interactive mobile app launch interview & phased implementation planner. Use when starting a new mobile feature, refactor, or app launch.
---

Perform an interactive planning interview before modifying or generating code for a mobile app (Expo, React Native, iOS, Android).

## Workflow

1. **Conduct the Discovery Interview:**
   Ask the user to clarify the core architectural foundations across the decision frontier:
   - **Target Platforms:** iOS only, Android only, or Universal Expo?
   - **Authentication Model:** Guest mode, email/password, Apple/Google OAuth? (Enforce zero-SMS demo accounts for App Store review).
   - **Monetization Model:** Free, RevenueCat/Superwall subscriptions, one-time IAP, ads?
   - **UI & Styling Stack:** NativeWind v4, Tamagui, or vanilla StyleSheet?
   - **Release Phase:** Greenfield development vs. pre-submission store audit?

2. **Generate `implementation_plan.md`:**
   Structure the plan into discrete milestones:
   - **Phase 1: Foundation & Design Tokens** (DTCG tokens, concentric radii).
   - **Phase 2: Core Components & Worklets** (60/120 FPS animations, haptics).
   - **Phase 3: Integration & State** (Offline resilience, secure storage).
   - **Phase 4: Store Compliance Pre-Flight** (Privacy manifests, account deletion).

3. **Approval Gate:**
   Explicitly stop and request user approval before creating or modifying code files.

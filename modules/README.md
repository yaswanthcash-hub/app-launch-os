# App Launch OS — Executable Modules

Welcome to the `modules/` directory.

## What is this folder for?

App Launch OS is being built in phases:

1. **Phase 1 (v0.1 — Current Release):** Docs-first foundation. All 8 checklists, 6 research digests, 4 policy guides, 6 legal templates, and 9 Architecture Decision Records (ADRs) are complete and live.
2. **Phase 2+ (Upcoming v0.2–v1.0 Releases):** Standalone, composable code packages that you can install into your React Native or Expo app.

## Modules Status

| Module | Status | Purpose | Implementation Link | Specification Link |
| :--- | :--- | :--- | :--- | :--- |
| **M4: Design System** | **Available ✅** | 3-tier DTCG design tokens & NativeWind v4 preset | [M4-design-system](M4-design-system/README.md) | [ADR-007](../decisions/007-design-system.md) |
| **M5: Onboarding** | **Available ✅** | Permission priming modal & animated walkthrough | [M5-onboarding](M5-onboarding/README.md) | [Findings](../findings/onboarding.md) |
| **M6: Experiments** | **Available ✅** | OpenFeature flags, A/B testing & SRM validator | [M6-experiments](M6-experiments/README.md) | [ADR-004](../decisions/004-experiments.md) |
| **M7: Growth Loops** | **Available ✅** | Referral code engine, share cards & review prompt | [M7-growth](M7-growth/README.md) | [PRD](../docs/prd.md) |
| **M8: Subscriptions** | **Available ✅** | StoreKit 2 & RevenueCat paywall component | [M8-paywall](M8-paywall/README.md) | [Findings](../findings/paywall.md) |
| **M9: Security Baseline** | **Available ✅** | Hardware Keychain, biometrics & integrity checks | [M9-security](M9-security/README.md) | [Checklist](../checklists/security-baseline.md) |
| **M10: Cloud Builds** | **Available ✅** | Production EAS Build profiles & Fastlane lanes | [M10-release](M10-release/README.md) | [ADR-003](../decisions/003-cicd.md) |
| **M11: ASO Workflows** | **Available ✅** | Metadata limits validator CLI & keyword density | [M11-aso](M11-aso/README.md) | [Findings](../findings/aso.md) |
| **M12: Deep Linking & SEO** | **Available ✅** | Universal Links, App Links & schema validator | [M12-seo](M12-seo/README.md) | [Findings](../findings/seo.md) |
| **M13: AI Tooling** | **Available ✅** | Agent context packing CLI for LLMs | [M13-ai-kit](M13-ai-kit/README.md) | [AGENTS.md](../AGENTS.md) |
| **M14: Reference Starter** | **Available ✅** | Full Expo SDK 52+ / RN 0.76+ boilerplate app | [starters/expo-ts](../starters/expo-ts/README.md) | [PRD](../docs/prd.md) |
| **M15: CLI** | **Available ✅** | Pre-flight store compliance & audit CLI | [M15-cli](M15-cli/README.md) | [Checklist](../checklists/repo-integrity-prelaunch.md) |
| **M16: Policy Watcher** | **Available ✅** | Automated store policy change detector | [M16-policybot](M16-policybot/README.md) | [PRD](../docs/prd.md) |
| **M17: Premium UX** | **Available ✅** | Haptics hook, concentric cards, skeletons, glass | [M17-premium-ux](M17-premium-ux/README.md) | [ADR-009](../decisions/009-premium-ux.md) |

For complete architecture contracts, see [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md) and [docs/prd.md](../docs/prd.md).

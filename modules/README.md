# App Launch OS — Executable Modules

Welcome to the `modules/` directory.

App Launch OS modules are **copy-paste source components and architecture blueprints** (similar to shadcn/ui in the web ecosystem). 

## Why Copy-Paste Source Instead of Heavy npm Dependencies?
- **Zero Dependency Lock-in:** Mobile apps often suffer from peer dependency conflicts across Expo SDK versions and React Native releases. Copy-paste modules give you full control over your code.
- **NativeWind & Theming Customization:** You can style paywalls, onboarding screens, and cards directly using your app's own design tokens and CSS/Tailwind classes.
- **Direct Logic Tailoring:** Integrate directly with your specific auth system, analytics provider, or API endpoints without restrictive abstraction wrappers.

Each module includes full TypeScript types, unit tests, and reference implementations. You can either copy the source code directly into your app's `src/` directory or reference them as monorepo packages.

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
| **M14: Reference Starter** | **Available ✅** | Full Expo SDK 54+ / RN 0.78+ boilerplate app | [starters/expo-ts](../starters/expo-ts/README.md) | [PRD](../docs/prd.md) |
| **M15: CLI** | **Available ✅** | Pre-flight store compliance & audit CLI | [M15-cli](M15-cli/README.md) | [Checklist](../checklists/repo-integrity-prelaunch.md) |
| **M16: Policy Watcher** | **Available ✅** | Automated store policy change detector | [M16-policybot](M16-policybot/README.md) | [PRD](../docs/prd.md) |
| **M17: Premium UX** | **Available ✅** | Haptics hook, concentric cards, skeletons, glass | [M17-premium-ux](M17-premium-ux/README.md) | [ADR-009](../decisions/009-premium-ux.md) |

For complete architecture contracts, see [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md) and [docs/prd.md](../docs/prd.md).

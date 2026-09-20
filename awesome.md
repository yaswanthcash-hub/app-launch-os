# Awesome App Launch OS

> Curated open-source resources for building, testing, securing, launching, and growing premium mobile applications.

**Inventory date:** 2026-09-20
**Scope:** Mobile runtimes, UI foundations, motion, data, experimentation, monetization, testing, security, release automation, ASO, documentation, and developer tooling.

## Verification policy

This directory is a curated starting point, not a permanent endorsement. Before adopting a project:

1. Re-check the repository license and the exact version you will ship.
2. Confirm compatibility with your React Native, Expo, iOS, Android, and New Architecture versions.
3. Review maintenance activity, release history, known vulnerabilities, and transitive dependencies.
4. Record the source URL, commit or package version, license, and reviewer in your dependency inventory.
5. Keep GPL/AGPL tools isolated from distributable client code unless qualified counsel approves a documented exception.

The inventory follows the allowlist-oriented approach in `IMPLEMENTATION_PLAN.md` and `policies/licensing-guide.md`. A license label is a triage signal, not legal advice.

## Core framework and native runtime

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 1 | [Expo](https://github.com/expo/expo) | Universal React Native framework and native modules | MIT | Core |
| 2 | [React Native](https://github.com/facebook/react-native) | Native mobile engine | MIT | Core |
| 3 | [Expo CLI](https://github.com/expo/expo) | Local development and project commands | MIT | Core |
| 4 | [EAS CLI](https://github.com/expo/expo) | Cloud builds, submissions, and updates | MIT | Core |
| 5 | [Hermes](https://github.com/facebook/hermes) | JavaScript engine for React Native | MIT | Core |
| 6 | [Metro](https://github.com/facebook/metro) | JavaScript bundler | MIT | Core |
| 7 | [React](https://github.com/facebook/react) | UI runtime | MIT | Core |
| 8 | [TypeScript](https://github.com/microsoft/TypeScript) | Typed application development | Apache-2.0 | Core |
| 9 | [React Native Screens](https://github.com/software-mansion/react-native-screens) | Native screen primitives | MIT | Core |
| 10 | [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) | Safe-area measurements | MIT | Core |
| 11 | [Expo Router](https://github.com/expo/expo) | File-based navigation | MIT | Core |
| 12 | [Expo Linking](https://github.com/expo/expo) | Deep and universal links | MIT | Core |
| 13 | [Expo SecureStore](https://github.com/expo/expo) | Platform secure storage | MIT | Core |
| 14 | [Expo Notifications](https://github.com/expo/expo) | Push notification integration | MIT | Recommended |
| 15 | [Expo Location](https://github.com/expo/expo) | Location and geocoding APIs | MIT | Recommended |
| 16 | [Expo Camera](https://github.com/expo/expo) | Camera and barcode APIs | MIT | Recommended |
| 17 | [Expo Image Picker](https://github.com/expo/expo) | Photo and media selection | MIT | Recommended |
| 18 | [Expo Sharing](https://github.com/expo/expo) | Native share sheet | MIT | Recommended |
| 19 | [React Native Permissions](https://github.com/zoontek/react-native-permissions) | Permission status and requests | MIT | Recommended |
| 20 | [React Native Biometrics](https://github.com/Gustash/react-native-biometrics) | Biometric authentication helpers | MIT | Recommended |

## UI, design, and assets

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 21 | [NativeWind](https://github.com/marklawlor/nativewind) | Build-time Tailwind-style utilities | MIT | Core |
| 22 | [gluestack-ui](https://github.com/gluestack/gluestack-ui) | Accessible copy-paste primitives | MIT | Core |
| 23 | [Tamagui](https://github.com/tamagui/tamagui) | Optimizing compiler and UI kit | MIT | Alternative |
| 24 | [Style Dictionary](https://github.com/amzn/style-dictionary) | Multi-platform design tokens | Apache-2.0 | Core |
| 25 | [Lucide Icons](https://github.com/lucide-icons/lucide) | Consistent vector icon set | ISC | Core |
| 26 | [React Native SVG](https://github.com/software-mansion/react-native-svg) | SVG rendering | MIT | Core |
| 27 | [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) | Icon font and image components | MIT | Recommended |
| 28 | [React Native Paper](https://github.com/callstack/react-native-paper) | Material Design components | MIT | Alternative |
| 29 | [React Native UI Lib](https://github.com/wix/react-native-ui-lib) | Component and design toolkit | MIT | Alternative |
| 30 | [React Native Elements](https://github.com/react-native-elements/react-native-elements) | Cross-platform UI components | MIT | Alternative |
| 31 | [React Native Reanimated Carousel](https://github.com/dohooo/react-native-reanimated-carousel) | Carousel primitives | MIT | Recommended |
| 32 | [React Native Pager View](https://github.com/callstack/react-native-pager-view) | Native pager | MIT | Recommended |
| 33 | [React Native Calendars](https://github.com/wix/react-native-calendars) | Calendar and date pickers | MIT | Recommended |
| 34 | [React Native Maps](https://github.com/react-native-maps/react-native-maps) | Map views and markers | MIT | Recommended |
| 35 | [React Native QR Code SVG](https://github.com/awesomejerry/react-native-qrcode-svg) | QR generation | MIT | Recommended |
| 36 | [React Native Fast Image](https://github.com/DylanVann/react-native-fast-image) | High-performance images | MIT | Recommended |
| 37 | [React Native Image Picker](https://github.com/react-native-image-picker/react-native-image-picker) | Camera and library selection | MIT | Recommended |

## Motion, gestures, and perceived performance

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 38 | [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated) | Native worklet animations | MIT | Core |
| 39 | [React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler) | Native gesture recognition | MIT | Core |
| 40 | [Moti](https://github.com/nandorojo/moti) | Declarative animation utilities | MIT | Recommended |
| 41 | [Gorhom Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet) | Interactive bottom sheets | MIT | Core |
| 42 | [React Native Keyboard Controller](https://github.com/kirillzyusko/react-native-keyboard-controller) | Keyboard-aware interactions | MIT | Recommended |
| 43 | [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native) | Vector animation playback | Apache-2.0 | Core |
| 44 | [Rive React Native](https://github.com/rive-app/rive-react-native) | Interactive state-machine graphics | MIT | Alternative |
| 45 | [React Native Skia](https://github.com/Shopify/react-native-skia) | Hardware-accelerated 2D graphics | MIT | Advanced |
| 46 | [React Native VisionCamera](https://github.com/mrousavy/react-native-vision-camera) | High-performance camera frames | MIT | Advanced |
| 47 | [React Native Worklets Core](https://github.com/mrousavy/react-native-worklets-core) | Native worklet infrastructure | MIT | Advanced |
| 48 | [Expo Blur](https://github.com/expo/expo) | Native blur effects | MIT | Core |
| 49 | [Expo Haptics](https://github.com/expo/expo) | Tactile feedback | MIT | Core |
| 50 | [Expo Splash Screen](https://github.com/expo/expo) | Controlled splash handoff | MIT | Core |
| 51 | [React Native Auto Skeleton](https://github.com/) | Skeleton-layout placeholders | MIT | Recommended |

## Data, backend, and state

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 52 | [TanStack Query](https://github.com/TanStack/query) | Async cache and server state | MIT | Core |
| 53 | [Supabase](https://github.com/supabase/supabase) | Open-source Postgres backend | Apache-2.0 | Recommended |
| 54 | [PocketBase](https://github.com/pocketbase/pocketbase) | Single-file SQLite backend | MIT | Alternative |
| 55 | [Better Auth](https://github.com/better-auth/better-auth) | TypeScript authentication suite | MIT | Alternative |
| 56 | [Appwrite](https://github.com/appwrite/appwrite) | Self-hosted backend platform | BSD-3-Clause | Alternative |
| 57 | [Hasura GraphQL Engine](https://github.com/hasura/graphql-engine) | GraphQL over Postgres | Apache-2.0 | Alternative |
| 58 | [PostgREST](https://github.com/PostgREST/postgrest) | REST API from Postgres | MIT | Alternative |
| 59 | [Zod](https://github.com/colinhacks/zod) | TypeScript schema validation | MIT | Core |
| 60 | [React Native MMKV](https://github.com/mrousavy/react-native-mmkv) | Fast native key-value storage | MIT | Recommended |
| 61 | [React Native Keychain](https://github.com/oblador/react-native-keychain) | Keychain and Keystore storage | MIT | Core |
| 62 | [WatermelonDB](https://github.com/Nozbe/WatermelonDB) | Reactive local database | MIT | Alternative |
| 63 | [Realm JavaScript](https://github.com/realm/realm-js) | Embedded database | Apache-2.0 | Alternative |

## Experimentation, analytics, and growth

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 64 | [GrowthBook](https://github.com/growthbook/growthbook) | Feature flags and experiments | MIT | Recommended |
| 65 | [PostHog](https://github.com/PostHog/posthog) | Product analytics and flags | MIT | Recommended |
| 66 | [OpenFeature](https://github.com/open-feature) | Vendor-neutral flag standard | Apache-2.0 | Standard |
| 67 | [Umami](https://github.com/umami-software/umami) | Privacy-first analytics | MIT | Alternative |
| 68 | [Matomo](https://github.com/matomo-org/matomo) | Self-hosted analytics | GPL-3.0 | Utility |
| 69 | [RudderStack](https://github.com/rudderlabs/rudder-server) | Customer data pipeline | MIT | Alternative |
| 70 | [OpenTelemetry](https://github.com/open-telemetry/opentelemetry-js) | Telemetry instrumentation | Apache-2.0 | Recommended |
| 71 | [Sentry React Native](https://github.com/getsentry/sentry-react-native) | Crash reporting and tracing | MIT | Recommended |
| 72 | [GlitchTip](https://github.com/glitchtip/glitchtip) | Self-hosted error tracking | MIT | Alternative |
| 73 | [Statsig](https://github.com/statsig-io/js-sdk) | Flags and experiments SDK | MIT | Alternative |

## Monetization and commerce

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 74 | [RevenueCat Purchases](https://github.com/RevenueCat/react-native-purchases) | StoreKit and Play Billing subscriptions | MIT | Core |
| 75 | [Superwall](https://github.com/superwall/react-native-superwall) | Remote paywall experimentation | MIT | Recommended |
| 76 | [React Native IAP](https://github.com/dooboolab-community/react-native-iap) | In-app purchase bindings | MIT | Alternative |
| 77 | [Stripe React Native](https://github.com/stripe/stripe-react-native) | Card and payment-sheet flows | MIT | Alternative |

## Testing, QA, and release

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 78 | [Maestro](https://github.com/mobile-dev-inc/maestro) | Declarative mobile E2E tests | Apache-2.0 | Recommended |
| 79 | [Detox](https://github.com/wix/Detox) | Gray-box React Native tests | MIT | Alternative |
| 80 | [Appium](https://github.com/appium/appium) | Cross-platform UI automation | Apache-2.0 | Alternative |
| 81 | [Jest](https://github.com/jestjs/jest) | JavaScript test runner | MIT | Core |
| 82 | [React Native Testing Library](https://github.com/callstack/react-native-testing-library) | Component testing | MIT | Core |
| 83 | [Testing Library User Event](https://github.com/testing-library/user-event) | Realistic interaction testing | MIT | Core |
| 84 | [Playwright](https://github.com/microsoft/playwright) | Browser and web E2E tests | Apache-2.0 | Recommended |
| 85 | [Cypress](https://github.com/cypress-io/cypress) | Web E2E tests | MIT | Alternative |
| 86 | [Storybook](https://github.com/storybookjs/storybook) | Component exploration | MIT | Recommended |
| 87 | [FlashList](https://github.com/Shopify/flash-list) | High-performance lists | MIT | Core |
| 88 | [Fastlane](https://github.com/fastlane/fastlane) | Store release automation | MIT | Core |
| 89 | [Danger](https://github.com/danger/danger) | Automated PR checks | MIT | Recommended |
| 90 | [BundleWatch](https://github.com/bundlewatch/bundlewatch) | Bundle-size budgets | MIT | Recommended |

## Security and compliance

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 91 | [OWASP MAS / MASTG](https://github.com/OWASP/owasp-masvs) | Mobile security verification standard | CC BY-SA 4.0 | Core |
| 92 | [OWASP MASTG](https://github.com/OWASP/owasp-mastg) | Mobile security testing guide | CC BY-SA 4.0 | Core |
| 93 | [osv-scanner](https://github.com/google/osv-scanner) | Vulnerability scanning | Apache-2.0 | Tier 1 |
| 94 | [Semgrep](https://github.com/semgrep/semgrep) | Static analysis | LGPL-2.1 | Tier 2 |
| 95 | [MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF) | Mobile security analysis | GPL-3.0 | Tier 2 |
| 96 | [TruffleHog](https://github.com/trufflesecurity/trufflehog) | Secret detection | Apache-2.0 | Tier 1 |
| 97 | [Gitleaks](https://github.com/gitleaks/gitleaks) | Git secret scanning | MIT | Tier 1 |
| 98 | [Syft](https://github.com/anchore/syft) | SBOM generation | Apache-2.0 | Tier 1 |
| 99 | [Grype](https://github.com/anchore/grype) | SBOM vulnerability scanning | Apache-2.0 | Tier 1 |
| 100 | [Google Play Integrity API](https://developer.android.com/google/play/integrity) | Device and app integrity | Platform API | Tier 3 |
| 101 | [Apple DeviceCheck](https://developer.apple.com/devicecheck/) | iOS device attestation | Platform API | Tier 3 |
| 101a | [App Store Compliance Playbook](https://github.com/mjmirza/app-store-compliance) | Rejection maps, mistake taxonomy, and pre-submission guards | OpenRoots ORA 2.3 | Core |

## ASO, documentation, and AI context

| # | Project | Purpose | License | Adoption |
|---:|---|---|---|---|
| 102 | [RespectASO](https://respectaso.com/) | Local-first ASO intelligence | MIT | Recommended |
| 103 | [App Store Scraper](https://github.com/plahteenlahti/app-store-scraper) | App Store metadata extraction | MIT | Utility |
| 104 | [Google Play Scraper](https://github.com/MrAdex77/google-play-scraper) | Play metadata extraction | MIT | Utility |
| 105 | [Docusaurus](https://github.com/facebook/docusaurus) | Documentation site | MIT | Core |
| 106 | [Pagefind](https://github.com/CloudCannon/pagefind) | Static-site search | MIT | Recommended |
| 107 | [repomix](https://github.com/yamadashy/repomix) | AI-ready repository packing | MIT | Core |
| 108 | [gitingest](https://github.com/cyclotruc/gitingest) | Repository digest generation | MIT | Core |
| 108a | [autoresearch](https://github.com/uditgoenka/autoresearch) | Autonomous goal-directed iteration engine | MIT | Core |
| 109 | [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) | Markdown linting | MIT | Core |
| 110 | [Prettier](https://github.com/prettier/prettier) | Formatting | MIT | Core |
| 111 | [Alex](https://github.com/get-alex/alex) | Inclusive-language checks | MIT | Recommended |
| 112 | [cspell](https://github.com/streetsidesoftware/cspell) | Spelling checks | MIT | Recommended |
| 113 | [Vale](https://github.com/ValeLang/Vale) | Prose linting | MIT | Recommended |
| 114 | [llms.txt specification](https://llmstxt.org) | AI context index convention | Specification | Recommended |

## Adoption notes

- **Core** means the default App Launch OS path should evaluate it first.
- **Recommended** means it is a strong option for a defined use case.
- **Alternative** means it can replace a core/recommended choice after an ADR.
- **Advanced**, **Utility**, and security **Tier 2/3** items require explicit scope and threat-model review.
- GPL/AGPL entries are listed for transparency and isolation guidance; they are not approved for inclusion in client bundles by default.

---

*Last verified: 2026-09-20 · License: MIT · Re-verify every entry before production adoption.*

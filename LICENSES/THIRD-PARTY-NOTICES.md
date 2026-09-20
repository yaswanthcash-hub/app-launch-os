# Third-Party License Notices

> This notice is a starting inventory for App Launch OS documentation and planned integrations. It is not a substitute for reviewing the exact license text, package version, transitive dependencies, or distribution obligations.

**Last verified:** 2026-09-20
**Repository license:** MIT
**Owner:** App Launch OS maintainers

## Notice policy

For every shipped release, record:

- package or repository name;
- exact version, commit, container digest, or downloaded artifact;
- SPDX license identifier and license text location;
- source URL and checksum when applicable;
- whether the item is runtime, build-time, test-only, documentation-only, or isolated tooling;
- required copyright, attribution, source-offer, modification, patent, or trademark notices.

The core repository is intended to remain MIT. The default client allowlist includes permissive SPDX licenses: MIT, Apache-2.0, ISC, BSD-2-Clause, BSD-3-Clause, 0BSD, MIT-0, Unlicense, CC0-1.0, Python-2.0, OFL-1.1, and WTFPL. GPL, AGPL, LGPL, MPL, EPL, SSPL, BSL, and custom licenses require review; copyleft scanners (such as Semgrep, MobSF, Matomo) may run only as isolated tools when their licenses and architecture permit it.

## Core and recommended dependencies

| Project | License | Notice / obligation |
|---|---|---|
| [Expo](https://github.com/expo/expo) | MIT | Preserve copyright and permission notice for included source. |
| [React Native](https://github.com/facebook/react-native) | MIT | Preserve copyright and permission notice. |
| [React](https://github.com/facebook/react) | MIT | Preserve copyright and permission notice. |
| [TypeScript](https://github.com/microsoft/TypeScript) | Apache-2.0 | Preserve NOTICE and license text where applicable; review patent terms. |
| [NativeWind](https://github.com/marklawlor/nativewind) | MIT | Preserve copyright and permission notice. |
| [gluestack-ui](https://github.com/gluestack/gluestack-ui) | MIT | Preserve copyright and permission notice for copied primitives. |
| [Style Dictionary](https://github.com/amzn/style-dictionary) | Apache-2.0 | Preserve NOTICE and license text where applicable. |
| [Lucide Icons](https://github.com/lucide-icons/lucide) | ISC | Preserve copyright and permission notice; verify icon-specific terms. |
| [React Native SVG](https://github.com/software-mansion/react-native-svg) | MIT | Preserve copyright and permission notice. |
| [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated) | MIT | Preserve copyright and permission notice. |
| [React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler) | MIT | Preserve copyright and permission notice. |
| [Moti](https://github.com/nandorojo/moti) | MIT | Preserve copyright and permission notice. |
| [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native) | Apache-2.0 | Preserve NOTICE and license text where applicable. |
| [Rive React Native](https://github.com/rive-app/rive-react-native) | MIT | Preserve copyright and permission notice; review SDK terms. |
| [React Native Skia](https://github.com/Shopify/react-native-skia) | MIT | Preserve copyright and permission notice. |
| [Expo Blur / Haptics / Image / Splash Screen](https://github.com/expo/expo) | MIT | Preserve copyright and permission notice. |
| [TanStack Query](https://github.com/TanStack/query) | MIT | Preserve copyright and permission notice. |
| [Supabase](https://github.com/supabase/supabase) | Apache-2.0 | Preserve NOTICE and license text where applicable. |
| [PocketBase](https://github.com/pocketbase/pocketbase) | MIT | Preserve copyright and permission notice. |
| [Better Auth](https://github.com/better-auth/better-auth) | MIT | Preserve copyright and permission notice. |
| [Appwrite](https://github.com/appwrite/appwrite) | BSD-3-Clause | Preserve copyright and disclaimer. |
| [GrowthBook](https://github.com/growthbook/growthbook) | MIT | Preserve copyright and permission notice. |
| [PostHog](https://github.com/PostHog/posthog) | MIT | Preserve copyright and permission notice; review service terms. |
| [OpenFeature](https://github.com/open-feature/core) | Apache-2.0 | Preserve NOTICE and license text where applicable. |
| [RevenueCat Purchases](https://github.com/RevenueCat/purchases-ios) | MIT | Preserve copyright and permission notice; review SDK terms. |
| [Superwall](https://github.com/superwall/Superwall-iOS) | MIT | Preserve copyright and permission notice; review SDK terms. |
| [Maestro](https://github.com/mobile-dev-inc/maestro) | Apache-2.0 | Preserve NOTICE and license text where applicable. |
| [Detox](https://github.com/wix/Detox) | MIT | Preserve copyright and permission notice. |
| [Sentry React Native](https://github.com/getsentry/sentry-react-native) | MIT | Preserve copyright and permission notice; review service terms. |
| [Fastlane](https://github.com/fastlane/fastlane) | MIT | Preserve copyright and permission notice. |
| [OWASP MASVS / MASTG](https://github.com/OWASP/owasp-masvs) | CC BY-SA 4.0 | Preserve attribution and share-alike notice for redistributed content. |
| [App Store Compliance Playbook](https://github.com/mjmirza/app-store-compliance) | OpenRoots ORA 2.3 | Preserve attribution and source links for compliance taxonomies and guard patterns. |
| [Autoresearch](https://github.com/uditgoenka/autoresearch) | MIT | Preserve copyright and permission notice for autonomous loop framework. |

## Isolated security tooling

These tools are documented for standalone CI or review use. Do not link them into distributable client code without a license and architecture review.

| Tool | License | Isolation requirement |
|---|---|---|
| [Semgrep](https://github.com/semgrep/semgrep) | LGPL-2.1 | Run as a standalone CI process/container; do not bundle into client artifacts. |
| [MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF) | GPL-3.0 | Run as a standalone Docker service; do not distribute with client code. |
| [Matomo](https://github.com/matomo-org/matomo) | GPL-3.0 | Self-host separately; review plugin and data-processing obligations. |

## Attribution template

```text
This product includes software developed by [PROJECT] ([SOURCE URL]).
Copyright (c) [YEAR] [COPYRIGHT HOLDER].
Licensed under [SPDX LICENSE] ([LICENSE URL]).
```

Use the exact notice required by the applicable license. Do not replace required copyright or license text with this shorthand.

## Release checklist

- [ ] Generate a machine-readable dependency inventory from the release lockfiles.
- [ ] Resolve every SPDX identifier to the exact license text.
- [ ] Review transitive native, container, build, test, model, dataset, font, and asset dependencies.
- [ ] Include required notices in source and binary distributions.
- [ ] Record exceptions, substitutions, and approvers.
- [ ] Re-run the review after dependency, vendor, or distribution-channel changes.

---

*Last verified: 2026-09-20 · Educational license inventory, not legal advice.*

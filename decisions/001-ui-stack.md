# ADR-001 — UI Stack Selection: NativeWind v4 + gluestack-ui

## Metadata

- **Status:** Accepted
- **Decision date:** 2026-09-20
- **Verification date:** 2026-09-20
- **Source of record:** `IMPLEMENTATION_PLAN.md` — Section 3 (Architecture Decisions), Section 4 (Premium UX, Interaction & Motion System), Section 2B/2C/2D (Verified Resource & Dependency Inventory)
- **Related modules:** `M4-design-system`, `M17-premium-ux`, `starters/expo-ts/`
- **Related ADRs:** `007-design-system.md` (token architecture), `008-motion-system.md`, `009-premium-ux.md`

---

## Context

### Strategic need
Mobile developers need styling velocity comparable to modern web development (utility-first CSS, design tokens, headless primitives) without sacrificing the native-frame-rate and native-appearance guarantees of React Native's New Architecture (Bridgeless / Fabric, React Native 0.86+).

### Evidence
- `IMPLEMENTATION_PLAN.md` Section 3 / README section 10 enumerate the UI stack as **NativeWind v4 coupled with gluestack-ui primitives**, selected from the verified inventory in Section 2B (items 5–11).
- The verified ecosystem (Section 2B/2C/2D, item 6) lists **gluestack-ui** as *Recommended* with its distinguishing **copy-paste architecture** (the shadcn pattern for React Native) — headless, accessible components that remain 100% within the app's bundle with no runtime dependency.
- **NativeWind v4** (item 5) is *Recommended* for its **v4+ build-time engine with zero runtime overhead**: Tailwind utility classes compile to static native style objects at build time, never shipping a Tailwind runtime to the device.
- The starter (`starters/expo-ts/`) is specified as "configured with Expo SDK 57+, NativeWind v4, and gluestack-ui" (README section 13, Phase 2; IMPLEMENTATION_PLAN.md Section 8 Phase 2).
- The Premium UX system (Section 4 / README section 5) requires glassmorphism, frosted-glass backdrops, skeleton loaders, and dark-mode parity — all of which must compose cleanly atop the chosen styling layer.

### Forces
1. **Build-time, not runtime, performance**: utility classes must not inflate the JS bundle or introduce a runtime CSS-in-JS engine.
2. **Component code ownership**: components must be copyable into an app's own source so teams control upgrades and avoid supply-chain drift.
3. **Accessibility-first**: primitives must ship with proper semantic roles, keyboard/focus management, and screen-reader contracts.
4. **Dark mode & theming**: the stack must support semantic theme switching without duplicate component trees.
5. **New Architecture readiness**: the stack must run under React Native's Bridgeless / Fabric renderer (mandatory per Section 2A, item 2).

---

## Decision

Standardize the default UI stack on **NativeWind v4** (build-time Tailwind-to-native compiler) combined with **gluestack-ui** headless primitives.

### What this means operationally
1. Styling is authored in Tailwind CSS utility classes (`className="flex-1 bg-surface p-4"`) and compiled at build time to React Native `StyleSheet` objects via NativeWind's v4+ build-time engine. **No Tailwind runtime is shipped.**
2. Interactive UI primitives (buttons, cards, bottom sheets, forms) are sourced from **gluestack-ui**, which follows the copy-paste model: source is imported into `components/` and becomes part of the app's own repository.
3. The starter app (`starters/expo-ts/`) ships preconfigured with `tailwind.config.js`, a three-layer token set (Section 4.1, ADR-007), and gluestack-ui's primitive set.
4. Animation and motion primitives (Section 4.2, ADR-008) layer on top of NativeWind styles; gluestack-ui primitives are gesture-handler aware (Section 2D, item 18).

### Excluded from the default
- `react-native-svg` (Section 2B, item 10), `expo-image` (item 11), `Style Dictionary` (item 9), `Lucide Icons` (item 8) remain first-class **core** dependencies available from the starter but are treated as asset/rendering companions, not the styling framework itself.

---

## Consequences

### Positive
- **Zero runtime overhead**: per Section 3, utility classes "compile at build time into native style objects." Confirmed by NativeWind v4's documented build-time compilation model.
- **100% component code ownership**: gluestack-ui's copy-paste architecture gives developers full control of the component source tree, matching the "shadcn pattern for RN" cited in the verified inventory.
- **Native-level frame rates**: because styles resolve to static `StyleSheet` objects and animation runs on the Reanimated UI thread (Section 4.2), the 60/120 FPS performance budget (README section 5.3) is attainable without JS-thread bottlenecks.
- **Seamless dark mode**: NativeWind v4 + semantic tokens produce dark-mode variants with no duplicated component trees.
- **Lowest adoption barrier for web-background developers**: Tailwind utility syntax is a near-direct mapping from the dominant web styling workflow, lowering the React Native learning curve.

### Negative
- **Toolchain coupling risk**: NativeWind and gluestack-ui must both keep pace with New Architecture releases; version drift is the team's responsibility under the copy-paste model.
- **Learning curve for token semantics**: developers must learn the three-layer token hierarchy (primitive → semantic → component, Section 4.1) before writing idiomatic styles.
- **Non-default alternatives** (Tamagui, RNW) are documented as alternatives, not bundled — teams migrating from those stacks must perform a one-time port.

---

## Alternatives Considered

| Option | Description | Why not chosen |
|---|---|---|
| **Tamagui** (Section 2B, item 7, *Alternative*) | Optimizing compiler + UI kit with its own syntax (`tamagui` styled components). | Higher performance for *complex universal multi-platform apps*, but introduces a proprietary-feeling component DSL unfamiliar to web developers and a heavier mental model. NativeWind + gluestack-ui keeps standard Tailwind syntax. |
| **React Native Paper / UI Kitten** | Mature, bundled component libraries. | Ship as runtime dependencies (not copy-pasteable), increasing bundle size and supply-chain surface. Less compatible with the New Architecture's strict renderer contract out of the box. |
| **Vanilla React Native `StyleSheet` only** | No utility framework; hand-rolled styles. | Eliminates the utility velocity the project deliberately targets; no dark-mode token automation; does not scale to the 8-point grid + 3-layer token system (Section 4.1). |
| **React Native Website (RNW) `tailwind-rn` / deprecated Tailwind-for-RN** | Earlier-generation Tailwind bridges. | Superseded by NativeWind v4; these packages are unmaintained and incompatible with the Bridgeless renderer. |
| **Styled-components / Emotion for React Native** | CSS-in-JS runtime. | Explicitly rejected by the "zero runtime overhead" force; injects a CSS resolution engine into the JS bundle. |

---

## Source Links

All sources verified on **2026-09-20**:

- NativeWind v4 (build-time engine, zero runtime): https://github.com/marklawlor/nativewind (verified 2026-09-20)
- gluestack-ui (headless, accessible, copy-paste): https://github.com/gluestack/gluestack-ui (verified 2026-09-20)
- Tamagui (alternative optimizing compiler): https://github.com/tamagui/tamagui (verified 2026-09-20)
- React Native (New Architecture / Bridgeless / Fabric): https://github.com/facebook/react-native (verified 2026-09-20)
- Expo SDK 57 (Expo Router, New Architecture support): https://docs.expo.dev (verified 2026-09-20)
- W3C Design Tokens Community Group (token spec for ADR-007): https://design-tokens.github.io (verified 2026-09-20)
- React Native Gesture Handler (v3+, gesture primitives): https://github.com/software-mansion/react-native-gesture-handler (verified 2026-09-20)

## Caveats

- ADR-001 defines the *default* stack; the verified inventory lists Tamagui as an approved alternative for teams targeting complex multi-platform surfaces (Section 2B, item 7). Adopting Tamagui should be a separate, documented decision.
- gluestack-ui's "copy-paste architecture" means the component source lives in each adopter's repo; the project's maintenance burden for upstream patches is therefore on consumers, not the App Launch OS maintainer.
- This decision couples the starter to NativeWind's v4 config format; a future NativeWind v5 break would require an ADR amendment.

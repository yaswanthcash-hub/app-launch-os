# ADR-007: Three-Layer Design System

- **Status:** Accepted
- **Date:** 2026-09-20
- **Verification date:** 2026-09-20
- **Decision owners:** App Launch OS maintainers

## Context

App Launch OS must provide a premium, consistent interface across the Expo starter, design-system module, UX kit, paywall module, and playground application. The implementation plan standardizes NativeWind v4 with gluestack-ui primitives and requires a W3C Design Tokens Community Group (DTCG)-aligned token hierarchy.

Without a shared token contract, modules can drift in color, spacing, typography, elevation, dark-mode behavior, and accessibility. Directly scattering primitive values in components would also make rebranding, theme changes, and cross-platform consistency expensive.

This ADR implements the design-system direction in [IMPLEMENTATION_PLAN.md §3](../IMPLEMENTATION_PLAN.md#3-architecture-decisions-adrs) and the token requirements in [IMPLEMENTATION_PLAN.md §4.1](../IMPLEMENTATION_PLAN.md#41-three-layer-design-token-hierarchy).

## Decision

Adopt a three-layer, token-driven design system:

1. **Primitive tokens** define raw values such as color, space, radius, typography, duration, and elevation.
2. **Semantic tokens** name product intent, such as `color.surface.primary`, `color.text.muted`, and `space.screen.padding`.
3. **Component tokens** bind components to semantic values, such as `button.primary.background` and `card.elevation`.

Use **Style Dictionary** as the token transformation and distribution source of truth, with DTCG-compatible token names and formats. Generate platform-ready outputs for the Expo TypeScript starter and document the generated artifacts so they are reproducible.

Use **NativeWind v4** for build-time utility styling and **gluestack-ui** for accessible, copy-pasteable component foundations. Components must consume semantic or component tokens through the approved styling path; feature code must not introduce unapproved primitive values.

Apply these shared constraints:

- Use the 8-point geometric spatial rhythm: `2px`, `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, and `64px`.
- Use the Dynamic Type-compatible scale: `xs: 11sp`, `sm: 13sp`, `base: 16sp`, `lg: 18sp`, `xl: 20sp`, `2xl: 24sp`, `3xl: 30sp`, and `4xl: 36sp`.
- Meet WCAG AA contrast: at least `4.5:1` for body copy and `3:1` for large text and interactive icons.
- Define light and dark semantic aliases for every user-facing color and verify both themes.
- Keep component tokens stable enough for application code while allowing visual variants to be changed without editing business logic.
- Validate token syntax, generated output, theme coverage, and contrast as part of repository quality checks.
- **Corner Concentricity Guidelines:** Enforce geometric concentricity on all nested surfaces with uniform padding $P$:
  $$R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$$
  Never use identical border radii on both outer card and inner child elements (e.g. image, input, button) unless padding is zero. For floating bottom sheets, modal cards, and floating navbars, harmonize the outer radius with the physical device hardware bezel squircle radius (~48–55pt on modern iOS devices).

## Consequences

### Positive

- One token source can drive the starter, modules, documentation examples, and playground.
- Build-time NativeWind styling avoids a styling runtime and preserves native performance.
- gluestack-ui provides accessible primitives while retaining component-code ownership through its copy-paste architecture.
- Semantic and component layers make dark mode, rebranding, and product-level visual changes localized.
- Explicit spacing, typography, and contrast constraints improve visual rhythm and accessibility.
- Generated token outputs are reviewable and reproducible across platforms.

### Negative

- Teams must learn the token naming and generation workflow before adding new UI.
- Style Dictionary configuration and generated artifacts add repository complexity.
- NativeWind and gluestack-ui must be upgraded together when their token or component contracts change.
- Strict token boundaries can require an initial migration of ad hoc styles.

## Alternatives

### Tamagui as the primary UI system

Tamagui offers an optimizing compiler and UI kit and remains an approved alternative for complex universal applications. It was not selected as the default because the implementation plan prioritizes NativeWind styling velocity and gluestack-ui's copy-pasteable accessible primitives for the starter.

### Raw React Native styles everywhere

Raw styles minimize initial setup but duplicate values, weaken theme guarantees, and make accessibility and dark-mode verification harder. They are permitted only inside the token and component foundations.

### Runtime CSS-in-JS

A runtime styling layer can be flexible, but it adds execution and dependency overhead to mobile rendering. NativeWind v4's build-time transformation better matches the performance and zero-runtime-overhead goals.

### Semantic tokens without component tokens

A two-layer system is simpler, but it leaves each component to reinterpret semantic intent. Component tokens provide an explicit contract for variants, elevation, density, and interaction states.

## Verification

The decision was verified against the canonical implementation plan on **2026-09-20**. A conforming implementation must show generated primitive, semantic, and component token outputs; demonstrate light and dark themes; enforce the stated spacing and typography scales; and pass the defined contrast checks.

## Sources

- [App Launch OS implementation plan — Architecture Decisions](../IMPLEMENTATION_PLAN.md#3-architecture-decisions-adrs)
- [App Launch OS implementation plan — Three-Layer Design Token Hierarchy](../IMPLEMENTATION_PLAN.md#41-three-layer-design-token-hierarchy)
- [Style Dictionary](https://github.com/amzn/style-dictionary)
- [Design Tokens Community Group](https://www.designtokens.org/)
- [NativeWind](https://github.com/marklawlor/nativewind)
- [gluestack-ui](https://github.com/gluestack/gluestack-ui)
- [Web Content Accessibility Guidelines (WCAG) 2.x](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Lucide Icons](https://github.com/lucide-icons/lucide)

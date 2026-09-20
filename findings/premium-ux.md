# Premium UX Research Digest

**Verification date:** 2026-09-20
**Status:** Verified against primary sources; recommendations labeled below.

## Overview

This digest covers premium mobile UX patterns: haptic psychology, 60/120 FPS motion budgets, glassmorphism, perceived performance, and the design token hierarchy described in IMPLEMENTATION_PLAN.md section 4.

## Methodology

Sources were checked on 2026-09-20 against official documentation (Apple Human Interface Guidelines, Google Material Design, W3C Design Tokens Community Group) and published UX research. Claims tied to a specific platform's published guidance are labeled **[Platform Verified]**. General design best practices are labeled **[Verified]**. Actionable guidance is labeled **[Recommendation]**.

## 1. Haptic Psychology

- **[Platform Verified]** Apple's Human Interface Guidelines recommend using haptics to reinforce confirmed state transitions, not for generic scrolling or incidental touches.
- **[Verified]** Research on haptic feedback shows that subtle, context-appropriate haptics increase perceived quality and confirm action outcomes.
- **[Recommendation]** Map haptics to state transitions only (selection, impact, notification), following the Haptic Mapping Matrix in IMPLEMENTATION_PLAN.md section 4.3.

## 2. Motion Budgets

- **[Platform Verified]** Apple and Google both target 60 FPS as the baseline smooth frame rate; 120 FPS is available on ProMotion / 120Hz displays.
- **[Recommendation]** Keep frame budget at 16.6ms per frame (60 FPS). Run all gesture and coordinate shifts on the native UI thread via react-native-reanimated worklets.

## 3. Easing Curves

- **[Verified]** The cubic-bezier curves listed in IMPLEMENTATION_PLAN.md section 4.2 (standard 250ms, entrance 200ms, exit 150ms, physical spring damping 15 / stiffness 150 / mass 1) are consistent with common design-system motion specifications.
- **[Recommendation]** Use these curves for all transitions. Wrap motion in `useReducedMotion()` and swap to crossfades when reduced motion is active.

## 4. Glassmorphism

- **[Platform Verified]** Apple's UIVisualEffectView provides native frosted-glass blur. expo-blur exposes this on both iOS and Android.
- **[Recommendation]** Use frosted-glass backdrops for paywall overlays and modal sheets to create depth without heavy visual noise.

## 5. Perceived Performance

- **[Verified]** Shimmer skeleton placeholders, Blurhash thumbnails, optimistic mutations, and native splash handoffs are established patterns for reducing perceived load time.
- **[Recommendation]** Implement all four patterns. They produce measurable gains in perceived responsiveness even when actual load time is unchanged.

## 6. Design Token Hierarchy

- **[Verified]** The W3C Design Tokens Community Group specification supports the three-layer hierarchy (primitive, semantic, component) used in IMPLEMENTATION_PLAN.md section 4.1.
- **[Recommendation]** Generate tokens with Style Dictionary to maintain the 8-point geometric grid and dynamic-type-compatible typography scale.

## 7. Corner Concentricity & Curvature Geometry

- **[Verified]** Corner concentricity dictates that for nested containers with padding $P$, the inner radius must satisfy $R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$. If identical radii are used on both outer and inner elements, the gap in the corners appears uneven and distorted, breaking the visual illusion of a single physical object.
- **[Platform Verified]** Modern iOS hardware features continuous curvature (squircles / superellipses) with screen bezel radii of 48–55pt. Edge-anchored sheets, bottom navigation islands, and full-bleed action sheets appear cohesive when their outer radii harmonize with the hardware bezel curvature.
- **[Recommendation]** Compute component-level nested radii mathematically in token helpers: `innerRadius = Math.max(0, outerRadius - padding)`.

## Pitfalls

- Overusing haptics, which causes fatigue.
- Running heavy animations on the JS thread, causing frame drops.
- Skipping reduced-motion accommodations.

## Source Links

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines (verified 2026-09-20)
- Google Material Design Motion: https://m3.material.io/styles/motion/overview (verified 2026-09-20)
- W3C Design Tokens Community Group: https://design-tokens.github.io (verified 2026-09-20)
- expo-blur: https://docs.expo.dev/versions/latest/sdk/blur (verified 2026-09-20)

## Caveats

Haptic and motion guidance is platform-specific; test on physical devices before shipping.

# ADR-008: Native Motion, Haptics, and Reduced-Motion System

- **Status:** Accepted
- **Date:** 2026-09-20
- **Verification date:** 2026-09-20
- **Decision owners:** App Launch OS maintainers

## Context

Premium mobile applications feel responsive, weighted, and alive, but animation can also cause dropped frames, motion sickness, or inaccessible experiences. The implementation plan requires a 60 FPS floor, a 120 FPS target on high-refresh displays, native UI-thread worklets, reduced-motion support, and a restrained haptic mapping.

The system must cover gestures, sheets, transitions, loading states, image loading, optimistic mutations, and splash handoff without making every module choose its own animation library or timing values.

This ADR implements [IMPLEMENTATION_PLAN.md §4.2](../IMPLEMENTATION_PLAN.md#42-motion-tokens--performance-budgets), [§4.3](../IMPLEMENTATION_PLAN.md#43-tactile-haptic-mapping-matrix), and [§4.4](../IMPLEMENTATION_PLAN.md#44-perceived-performance-patterns).

## Decision

Use a layered motion system with **react-native-reanimated** as the native animation and gesture engine. Run gestures and coordinate shifts in UI-thread worklets so animation does not depend on JavaScript frame delivery. Use **Moti** for concise declarative transitions where it reduces boilerplate, and use **Lottie React Native** for authored vector sequences such as celebrations, splash sequences, and micro-animations. Rive or Skia may be used only when an interactive state machine or custom hardware-accelerated 2D effect is required.

Define reusable motion tokens for duration, easing, and springs:

| Purpose | Token |
|---|---|
| Standard transition | `cubic-bezier(0.2, 0, 0, 1)`, `250ms` |
| Entrance or pop | `cubic-bezier(0, 0, 0, 1)`, `200ms` |
| Exit or dismiss | `cubic-bezier(0.2, 0, 1, 1)`, `150ms` |
| Physical spring | `damping: 15`, `stiffness: 150`, `mass: 1` |

Enforce a **60 FPS strict floor** (`16.6ms` frame time) and a **120 FPS target** on ProMotion and other 120 Hz displays. Profile representative flows on low-end and high-refresh devices; animation must not hide blocking work or cause layout thrashing.

Wrap motion with `useReducedMotion()`. When reduced motion is active, replace physical transforms, springs, parallax, and nonessential movement with clean crossfades or immediate state changes. Preserve meaning, focus, and completion feedback without requiring motion.

Use haptics only to reinforce confirmed state transitions, never generic touches or ordinary scrolling:

| User interaction | Haptic type | API |
|---|---|---|
| Primary button press or selection | Subtle selection click | `Haptics.selectionAsync()` |
| Toggle switch or radio activation | Light impact | `Haptics.impactAsync(Light)` |
| Slider step snap or picker wheel | Ultra-light impact | `Haptics.impactAsync(Light)` |
| Bottom-sheet snap point reached | Medium impact | `Haptics.impactAsync(Medium)` |
| Pull-to-refresh trigger reached | Medium impact | `Haptics.impactAsync(Medium)` |
| Successful mutation | Success notification | `Haptics.notificationAsync(Success)` |
| Form validation failure | Error notification | `Haptics.notificationAsync(Error)` |
| Destructive action confirmation | Warning notification | `Haptics.notificationAsync(Warning)` |
| Context-menu long press | Heavy impact | `Haptics.impactAsync(Heavy)` |

Treat haptics as an enhancement: detect platform capability, avoid repeated feedback, and never make completion depend on tactile output.

Use the following perceived-performance patterns:

1. Match skeleton placeholders to the real content layout and use a restrained shimmer.
2. Load Blurhash thumbnails through `expo-image`, then crossfade to the full asset.
3. Apply optimistic mutations through TanStack Query and roll back with a clear alert on failure.
4. Hold the native splash with `expo-splash-screen` until fonts and initial state are ready, then reveal the app without a white flash.

## Consequences

### Positive

- Native worklets protect gesture and animation responsiveness from JavaScript stalls.
- Shared motion tokens create consistent timing across modules and platforms.
- Reduced-motion handling makes premium interactions available to users who disable animation.
- The haptic matrix prevents tactile noise and reserves feedback for meaningful transitions.
- Skeletons, Blurhashes, optimistic updates, and controlled splash handoff improve perceived speed without misrepresenting completion.
- Moti and Lottie provide focused abstractions without replacing the native engine.

### Negative

- Reanimated worklets impose serialization and API constraints that developers must understand.
- Profiling across device classes adds QA effort.
- Lottie, Rive, and Skia assets can increase bundle size if used indiscriminately.
- Optimistic mutations require explicit rollback and conflict handling.
- Haptic behavior differs by platform and user accessibility settings.

## Alternatives

### JavaScript `Animated` or layout-effect animation

The standard JavaScript animation path is simpler for small examples but is more vulnerable to frame drops and is unsuitable as the default for gestures and continuous coordinate shifts.

### Moti as the sole animation layer

Moti improves declarative ergonomics but does not eliminate the need for native worklets, reduced-motion policy, profiling, or authored sequence playback. It is a convenience layer, not the system foundation.

### Lottie, Rive, or Skia for all motion

A single visual engine can produce rich effects, but it is unnecessarily heavy for ordinary transitions and does not provide the complete gesture, haptic, and reduced-motion contract.

### No haptics

Removing haptics avoids platform variance but forfeits a useful confirmation channel. The selected matrix limits feedback to state changes and makes it optional.

## Verification

The decision was verified against the canonical implementation plan on **2026-09-20**. A conforming implementation must demonstrate native-thread gestures, tokenized durations and springs, a 60 FPS floor, reduced-motion fallbacks, capability-aware haptics, and the four perceived-performance patterns on representative iOS and Android flows.

## Sources

- [App Launch OS implementation plan — Motion Tokens and Performance Budgets](../IMPLEMENTATION_PLAN.md#42-motion-tokens--performance-budgets)
- [App Launch OS implementation plan — Tactile Haptic Mapping Matrix](../IMPLEMENTATION_PLAN.md#43-tactile-haptic-mapping-matrix)
- [App Launch OS implementation plan — Perceived Performance Patterns](../IMPLEMENTATION_PLAN.md#44-perceived-performance-patterns)
- [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated)
- [Moti](https://github.com/nandorojo/moti)
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)
- [Rive React Native](https://github.com/rive-app/rive-react-native)
- [React Native Skia](https://github.com/Shopify/react-native-skia)
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
- [React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler)
- [Expo Image](https://github.com/expo/expo/tree/main/packages/expo-image)
- [TanStack Query](https://github.com/TanStack/query)
- [Expo Splash Screen](https://github.com/expo/expo/tree/main/packages/expo-splash-screen)

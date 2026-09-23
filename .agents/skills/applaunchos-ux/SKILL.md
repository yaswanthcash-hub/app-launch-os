---
name: applaunchos-ux
description: Implement 5-state tactile haptics, Reanimated 3 UI-thread worklets (60/120 FPS), and 12 HCI cognitive ergonomic laws.
---

Elevate mobile user interfaces with native micro-interactions, hardware haptics, and cognitive ergonomics.

## 5-State Tactile Haptic Matrix

Use `expo-haptics` with predictable feedback mapped to user intent:
1. **Light Impact:** Selection changes, segmented controls, tab switches.
2. **Medium Impact:** Button taps, card expansions, sheet dismissals.
3. **Heavy Impact:** Primary confirmations, swipe-to-action completions.
4. **Success Notification:** Payment success, form submission completed.
5. **Error Notification:** Validation failure, authentication error.

## 60/120 FPS Worklet Rules

- Animations must execute on the UI thread using Reanimated 3 worklets (`useAnimatedStyle`, `withSpring`).
- Never animate layout properties (`width`, `height`, `margin`) directly when `transform: [{ scale }]` or `opacity` can be used.
- Avoid generic `ActivityIndicator` spinners; use Moti geometric shimmer skeleton loaders.

## 12 HCI Cognitive Laws

Apply Fitts's Law (bottom-weighted action zones), Hick's Law (simplified paywall options), Doherty Threshold (<400ms visual response), and Miller's Law (chunked onboarding steps).

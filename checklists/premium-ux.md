<!-- Verification date: 2026-09-20 -->
<!-- License: MIT -->

# Premium UX Submission Checklist

> Polished, checkbox-based checklist aligned with **IMPLEMENTATION_PLAN.md** §4 (Premium UX, Interaction & Motion System) and §5 (Monetization, Trial Models & High-Converting Paywalls). Verified against iOS HIG, WCAG 2.2, Material Design 3, and the App Launch OS design-token spec current on **2026-09-20**.

| Field | Value |
|---|---|
| **Verification date** | 2026-09-20 |
| **Target platforms** | iOS, iPadOS, Android (phone & tablet) |
| **Primary owner** | Design Engineering / UX Lead |
| **Evidence** | Token source audit, frame profiler trace, accessibility inspector, paywall A/B report |
| **Gate** | [ ] Draft &nbsp;/&nbsp; [ ] In Review &nbsp;/&nbsp; [x] Verified |

> **Educational note:** UX quality is subjective and device-dependent. Completing this checklist improves consistency and perceived performance but does not guarantee App Store / Play Store approval or user satisfaction. Re-validate against the latest platform HIG before release.

## Sources

- iOS Human Interface Guidelines — https://developer.apple.com/design/human-interface-guidelines/ios
- iOS Accessibility — https://developer.apple.com/design/human-interface-guidelines/accessibility
- Material Design 3 (Android) — https://m3.material.io/
- Android Accessibility — https://developer.android.com/guide/topics/ui/accessibility
- WCAG 2.2 — https://www.w3.org/TR/WCAG22/
- WCAG 1.4.3 Contrast (Minimum) — https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- WCAG 1.4.11 Non-text Contrast — https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- W3C Design Tokens Community Group — https://designtokens.org/
- expo-haptics — https://docs.expo.dev/versions/latest/sdk/haptics/
- React Native Reanimated — https://docs.swmansion.com/react-native-reanimated/
- Apple Review Guideline 3.1.2 — https://developer.apple.com/app-store/review/guidelines/#in-app-purchase
- RevenueCat State of Subscription Apps (2026) — https://www.revenuecat.com/state-of-subscription-apps

---

## §4 Premium UX, Interaction & Motion System

*Mapped from IMPLEMENTATION_PLAN.md §4 — design tokens, motion budgets, haptics, and perceived performance.*

### §4.1 Three-Layer Design Token Foundation

- [ ] Tokens organized into Primitive → Semantic → Component layers per W3C DTCG spec; no raw hex values in component code. — Owner: Design Systems · Evidence: token source audit
- [ ] Color palette exposes semantic roles (surface, on-surface, primary, etc.) with light + dark variants; no hard-coded RGB in UI components.
- [ ] Spacing uses the strict 8-point grid (`2, 4, 8, 12, 16, 24, 32, 48, 64`); custom spacing rounded to the nearest grid step (max 1 off). — Owner: Design · Evidence: Style Dictionary audit
- [ ] Typography scale fixed to `xs 11sp, sm 13sp, base 16sp, lg 18sp, xl 20sp, 2xl 24sp, 3xl 30sp, 4xl 36sp`; no intermediate sizes; compatible with Dynamic Type (iOS) / Custom Font Scaling (Android).
- [ ] Elevation uses a discrete shadow/level system (0–4) with consistent light-source direction per platform (iOS shadows vs. Android elevation dp).
- [ ] Border-radius tokenized separately (sm/md/lg/full) and applied via token, not magic numbers.
- [ ] **Corner Concentricity Guidelines:** Nested containers (e.g. card padding with inner button, image, or avatar) follow the concentricity formula $R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{padding})$. No nested elements share identical border radii unless padding is zero.
- [ ] **Hardware Bezel Curvature:** Floating bottom sheets, modal cards, and floating action bars visually harmonize with the device's hardware squircle corner radius (~48–55pt on iPhone 15/16 Pro).

#### §4.1.1 Color & Contrast (WCAG 2.2 AA)

- [ ] Body text and images of text ≥ **4.5:1** contrast against background (WCAG 1.4.3). — Owner: Design · Evidence: contrast analyzer report (e.g. Stark, A11y Sliders)
- [ ] Large text (≥18pt / ≥14pt bold) ≥ **3:1** contrast (WCAG 1.4.3).
- [ ] Interactive components, icons, focus rings, and state indicators ≥ **3:1** non-text contrast (WCAG 1.4.11).
- [ ] Focus indicator visible on all keyboard/navigation focus with ≥3:1 contrast against adjacent colors (WCAG 2.4.7).
- [ ] Color is not the sole means of conveying information; shape, icon, or text also used (WCAG 1.4.1).
- [ ] Dark mode validated on both system and in-app theme switches; no inverted-contrast failures in dark theme (Apple HIG dark mode / Material Design 3 dark).

### §4.2 Motion Tokens & Performance Budgets

#### §4.2.1 Frame Budget & Threading

- [ ] All gestures and coordinate transforms run on the **native UI thread** (Reanimated worklets); no JS-thread frame drops. — Owner: Eng Lead · Evidence: frame profiler trace (Flipper / Xcode Instruments)
- [ ] 60 FPS strict floor (≤16.6 ms/frame); 120 FPS target on ProMotion / 120 Hz displays.
- [ ] No layout thrash / re-measure loops during animations (no JS-driven layout in animation frames).
- [ ] List scrolling maintains 60 FPS (FlashList / RecyclerList); no jank on content-heavy screens.

#### §4.2.2 Easing & Duration Tokens

- [ ] Standard transition uses `cubic-bezier(0.2, 0, 0, 1)` at 250 ms.
- [ ] Entrance / pop uses `cubic-bezier(0, 0, 0, 1)` at 200 ms.
- [ ] Exit / dismiss uses `cubic-bezier(0.2, 0, 1, 1)` at 150 ms.
- [ ] Physical spring uses `damping 15, stiffness 150, mass 1`.
- [ ] All motion tokens centralized in token spec; no ad-hoc durations scattered in code.

#### §4.2.3 Reduced Motion Accessibility

- [ ] Every motion is wrapped with `useReducedMotion()`; when active, transforms swap cleanly to **crossfades**. — Owner: UX Eng · Evidence: motion + reduced-motion matrix
- [ ] System `prefers-reduced-motion` honored at the OS level (iOS Accessibility Settings / Android Remove animations).
- [ ] Duration overrides respect the system-reduced timescale (animations shortened, not disabled unless requested).
- [ ] No auto-playing motion ≥5 s that cannot be paused / stopped / hidden (WCAG 2.2.2).

### §4.3 Tactile Haptic Mapping

Haptics reinforce **confirmed state transitions**, never basic scrolling or generic touches (per IMPLEMENTATION_PLAN.md §4.3):

- [ ] Primary touch targets ≥ **44×44 pt** effective hit area (≈8.82 mm) per iOS HIG; Android minimum 48×48 dp per Material Design 3. — Owner: UX Eng · Evidence: inspector hit-area audit
- [ ] Edge-to-edge controls maintain ≥8 pt clear space; no accidental adjacent activation.
- [ ] Scrollable / expandable areas have ≥44×44 hit targets and a visible affordance.
- [ ] Small interactive icons (e.g., close) receive an expanded invisible hit area to ≥44×44.
- [ ] Pan / pinch / swipe gestures use the native Gesture Handler; no JS-interpreted gesture logic. — Owner: Eng · Evidence: gesture log
- [ ] Gestures are discoverable; long-press or contextual cues indicate available actions.
- [ ] Gestures do not block system edge gestures (swipe-from-edge back, Control Center) on their primary axis.
- [ ] Bottom Sheet and modal drag handles snap with physics (Reanimated); overscroll damped.

#### §4.3.1 Haptic Mapping Matrix

| User Interaction | Haptic Type | Implementation API | Verified |
|---|---|---|---|
| Primary Button Press / Selection | Subtle Selection Click | `Haptics.selectionAsync()` | [ ] |
| Toggle Switch / Radio Active | Light Impact | `Haptics.impactAsync(Light)` | [ ] |
| Slider Step Snap / Picker Wheel | Ultra-Light Impact | `Haptics.impactAsync(Light)` | [ ] |
| Bottom Sheet Snap Point Reached | Medium Impact | `Haptics.impactAsync(Medium)` | [ ] |
| Pull-to-Refresh Trigger Reached | Medium Impact | `Haptics.impactAsync(Medium)` | [ ] |
| Successful Mutation (Payment, Save) | Success Notification | `Haptics.notificationAsync(Success)` | [ ] |
| Form Input Error / Validation Failure | Error Notification | `Haptics.notificationAsync(Error)` | [ ] |
| Destructive Action (Delete Confirmation) | Warning Notification | `Haptics.notificationAsync(Warning)` | [ ] |
| Context Menu Long-Press Trigger | Heavy Impact | `Haptics.impactAsync(Heavy)` | [ ] |

- [ ] **Confirmed state transitions** produce haptics; scrolling and generic touches do **not**. — Owner: UX Eng · Evidence: haptic audit log

### §4.4 Perceived Performance & Content States

#### §4.4.1 Launch & First Frame

- [ ] Native splash held until fonts + initial state are loaded; no blank white flash (splash handoff via `expo-splash-screen`). — Owner: Release Eng · Evidence: cold-start trace
- [ ] Cold-start time ≤ 2.5 s to first meaningful frame on a mid-tier target device.
- [ ] First paint renders branded content (logo / app name) even under slow backends.
- [ ] No white / blank screens during navigation transitions (shared-element or crossfade fallback).

#### §4.4.2 Data States

- [ ] Loading states show **skeleton placeholders** matching card layout (shimmer) before content. — Owner: FE Eng · Evidence: state screenshots
- [ ] Images load via **Blurhash / thumbnail** cross-fade into full-res (`expo-image`); no layout shift.
- [ ] Empty states are on-brand, actionable, and communicate next steps (not only "no data").
- [ ] Error states explain the problem and offer a clear retry / recovery path; no toast-only failures.

#### §4.4.3 Async & Caching

- [ ] Mutations are **optimistic**; UI reflects the change immediately and rolls back on failure with visible feedback (TanStack Query). — Owner: FE Eng · Evidence: network mock trace
- [ ] Cache-first + stale-while-revalidate for read-heavy screens; offline reads work.
- [ ] Pull-to-refresh and infinite scroll have distinct loading indicators; no duplicate / blank items.
- [ ] Pagination preserves scroll position on back navigation (reverse + tab restoration).

---

## §5 Monetization, Trial Models & High-Converting Paywalls

*Mapped from IMPLEMENTATION_PLAN.md §5 — trial architecture, paywall visual standards, and subscription UX.*

### §5.1 Trial & Subscription Architecture

- [ ] Subscription and trial choices are treated as hypotheses to validate locally; do not present vendor-reported conversion ranges or Day-0 placement multipliers as universal guarantees. — Owner: Product / Growth · Evidence: experiment plan and local results
- [ ] Trial duration is matched to time-to-value and validated by cohort data; the 3/7/14-day examples are starting hypotheses, not defaults. — Owner: Product / Growth · Evidence: cohort analysis
- [ ] Billing strategy is tested against local conversion, refund, cancellation, and complaint data; opt-out/card-upfront trials are not assumed to be universally optimal or permitted in every context. — Owner: Product / Legal · Evidence: billing experiment and policy review
- [ ] Paywall placement is tested at the user's moment of intent; Day-0 placement is a research hypothesis, not a universal conversion rule. — Owner: UX / Product · Evidence: experiment results
- [ ] Trial renewal cost, end date, and "cancel anytime in Settings" copy are displayed transparently before purchase confirmation (Apple Review Guideline 3.1.2). — Owner: Copy / Legal · Evidence: paywall copy review
- [ ] "Restore Purchases" button is prominently displayed and functional across all platforms. — Owner: FE Eng · Evidence: restore flow test
- [ ] "Terms & Privacy" links are accessible from the paywall screen. — Owner: Legal · Evidence: link audit

### §5.2 Premium Paywall Visual UX Standards

- [ ] Paywall uses a high-depth **Frosted Glass Backdrop** (`BlurView` / `expo-blur`) anchored over the active app screen to create immediate perception of value. — Owner: Design Eng · Evidence: visual comparison screenshot
- [ ] Visual hierarchy leads with a punchy **benefit headline** (e.g., "Unlock Unlimited Potential"), not a feature list. — Owner: Copy / Design · Evidence: 5-second test result
- [ ] One prominent primary CTA (e.g., "Start Free Trial") with no competing visual anchors on the paywall screen.
- [ ] A clear close / dismiss action is available where appropriate for the platform and flow; verify the current store guidance rather than treating one universal placement as a compliance rule. — Owner: UX Eng · Evidence: platform review
- [ ] Paywall layouts managed via **remote experimentation** (Superwall or RevenueCat Paywalls) enabling A/B testing of pricing, copy, and layouts without app-store updates. — Owner: Growth Eng · Evidence: experiment config screenshot
- [ ] Paywall renders correctly in both light and dark modes with maintained contrast ratios (WCAG 1.4.3 / 1.4.11). — Owner: Design · Evidence: dark-mode paywall matrix
- [ ] Paywall is not shown to users who have already purchased, active subscriptions, or eligible trial users (deduplication logic verified). — Owner: FE Eng · Evidence: paywall suppression test
- [ ] Paywall respects `useReducedMotion()` — no entrance animations when reduced motion is active (WCAG 2.3.3). — Owner: UX Eng · Evidence: reduced-motion paywall test

---

## §4.x Cross-Cutting UX Polish (Supporting Both Sections)

### Keyboard & Input

- [ ] Forms remain navigable with the software keyboard; primary action labeled (e.g., "Next" / "Go" / "Done"). — Owner: FE Eng · Evidence: keyboard flow test
- [ ] Text inputs are not obscured by the keyboard; auto-scroll / resize on focus.
- [ ] Sensitive input masked correctly; no shoulder-surfing exposure.
- [ ] Auto-fill / credential-manager prompts respected (password managers, AutoFill, etc.).

### Dark Mode & Theming

- [ ] Full color inversion in dark mode produces no illegible or inverted-contrast text. — Owner: Design · Evidence: dark-mode matrix
- [ ] System wallpapers (Android) / system colors (iOS) propagate without breaking contrast.
- [ ] Motion layers adapt to theme tint; no hard-coded white / black assets in animations.

### Scroll & Layout Stability

- [ ] No layout shift from async image / font loading (dimensions reserved via aspect ratio).
- [ ] Overscroll / rubber-band behavior damped and consistent (no double-scroll).
- [ ] Tab content heights equalized to prevent vertical jump between tabs.

### Global Polish

- [ ] No placeholder / "lorem ipsum" copy in any production screen (including paywall). — Owner: Copy / Design · Evidence: text audit
- [ ] All static strings externalized for i18n; RTL mirrors layout cleanly (icon direction, alignment).
- [ ] No dropped frames on the 3 most common navigation flows (profiled on target devices).
- [ ] Consistent iconography and corner-radius across screens; no one-off styles.
- [ ] App icon and all promotional assets validated at 29×29 pt (Settings) and 1024×1024 (Store). — Owner: Design · Evidence: asset audit

---

*Last verified: 2026-09-20 · License: MIT · Sources linked above as canonical at time of verification.*

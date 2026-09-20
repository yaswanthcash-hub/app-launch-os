# Mobile Accessibility Checklist

**Verification date:** 2026-09-20
**Owner:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_
**Last reviewed by:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_

> This checklist provides verification steps and references. It contains no guarantees of compliance; final determination is the responsibility of the accountable owner.

---

## 1. Dynamic Type

- [ ] App respects system font-size settings across all screens (iOS: Settings > Accessibility > Display & Text Size; Android: Settings > Accessibility > Font Size) — Apple HIG: Text Size; Google Material: Font scaling
- [ ] Layout does not truncate or overlap at maximum Dynamic Type sizes (iOS WCAG 1.4.4 Resize Text — Level AA)
- [ ] Custom text elements use Dynamic Type styles rather than fixed-font APIs — Apple UIFontMetrics / Android sp units
- [ ] Scrolling or content clipping is not introduced when text scales beyond default sizes — WCAG 1.4.12 Text Spacing (Level AA)
- [ ] Screenshot/evidence captured at Smallest, Default, and Largest text sizes: \_evidence\_link\_

**Owner:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 2. VoiceOver / TalkBack

- [ ] All interactive elements have meaningful accessibility labels (iOS: Accessibility Label; Android: contentDescription) — WCAG 2.4.4 Link Purpose (Level A)
- [ ] Visual order matches logical reading order for screen readers — WCAG 1.3.2 Meaningful Sequence (Level A)
- [ ] Non-text content (icons, images) has descriptive labels or is marked decorative — WCAG 1.1.1 Non-text Content (Level A)
- [ ] Grouped elements (e.g., radio buttons) use appropriate accessibility containers (iOS: accessibilityElements; Android: ViewGroup accessibility) — WCAG 1.3.1 Info and Relationships (Level A)
- [ ] Page/screen announcements occur on navigation (title + role) — Apple UIAccessibilityScreenChangedNotification; Android AccessibilityNodeInfo
- [ ] Custom controls announce state changes (selected, error, loading) — WCAG 4.1.3 Status Messages (Level AA)
- [ ] VoiceOver/TalkBack focus does not land on non-interactive or hidden elements — WCAG 2.4.3 Focus Order (Level A)
- [ ] Test pass verified on-device with VoiceOver (iOS) and TalkBack (Android): \_evidence\_link\_

**Owner:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 3. Touch Targets

- [ ] All interactive elements meet minimum 44 × 44 pt (iOS HIG) and 48 × 48 dp (Android Material Design) touch target size
- [ ] Spacing between adjacent interactive elements is at least 8 pt (iOS) / 8 dp (Android) — WCAG 2.5.5 Target Size (Level AAA); minimum AA guidance per WCAG 2.5.8 (Level AA, pending)
- [ ] Touch targets are not truncated by parent clipping or overflow containers
- [ ] Controls near screen edges remain tappable within safe area insets — Apple Human Interface Guidelines: Safe Areas; Android: System Bar
- [ ] Inline/tight UI (tables, lists) uses hit-test expansion or padding to meet minimums — WCAG 2.5.8 Target Size (Level AA)
- [ ] Evidence (video/screenshot of target measurement): \_evidence\_link\_

**Owner:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 4. Contrast

- [ ] Normal text (≥18pt or ≥14pt bold) has contrast ratio ≥ 4.5:1 against background — WCAG 1.4.3 Contrast (Minimum) (Level AA)
- [ ] Large text (≥24pt or ≥19pt bold) has contrast ratio ≥ 3:1 — WCAG 1.4.3 Contrast (Minimum) (Level AA)
- [ ] UI components (icons, borders, focus indicators) have contrast ratio ≥ 3:1 — WCAG 1.4.11 Non-text Contrast (Level AA)
- [ ] Disabled or placeholder text meets minimum contrast or is not presented as requiring reading — WCAG 1.4.3
- [ ] Contrast is maintained in both light and dark mode — WCAG 1.4.1 Use of Color (Level A)
- [ ] Color is not the sole means of conveying information (error states, required fields) — WCAG 1.4.1 Use of Color (Level A)
- [ ] Measured contrast values (tool + result): \_evidence\_link\_

**Owner:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 5. Reduced Motion

- [ ] App respects system-level reduce-motion setting (iOS: Reduce Motion; Android: Remove animations) — WCAG 2.3.3 Animation from Interactions (Level AAA); Apple HIG; Android Accessibility
- [ ] All auto-playing animations can be paused, stopped, or hidden within 5 seconds — WCAG 2.2.2 Pause, Stop, Hide (Level A)
- [ ] Parallax, bounce, and spring animations are disabled or replaced with opacity/fade when reduce-motion is active
- [ ] Screen transitions are instant or fade-based when reduce-motion is on — WCAG 2.3.3
- [ ] Critical functionality remains usable without motion-based animations
- [ ] Evidence (comparison screenshots with motion on/off): \_evidence\_link\_

**Owner:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 6. Focus Management

- [ ] All interactive elements are programmatically focusable by assistive technology — WCAG 2.1.1 Keyboard (Level A) / equivalent touch-explore parity
- [ ] Visible focus indicator is present on all focusable elements with ≥ 3:1 contrast — WCAG 2.4.7 Focus Visible (Level AA); WCAG 2.4.11 Focus Not Obscured (Level AA)
- [ ] Focus order follows visual and logical reading order — WCAG 2.4.3 Focus Order (Level A)
- [ ] Focus does not escape to unexpected areas on action completion (e.g., after closing a modal) — WCAG 2.4.3
- [ ] Modal dialogs trap focus within the dialog until dismissed — WCAG 2.4.3 / WAI-ARIA Authoring Practices: Dialog
- [ ] First focus on screen load is directed to the primary content area — WCAG 2.4.1 Bypass Blocks (Level A)
- [ ] Focus state is distinguishable from active/hover/pressed states — WCAG 1.4.11 Non-text Contrast (Level AA)
- [ ] Evidence (screen recording of focus traversal): \_evidence\_link\_

**Owner:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 7. Testing

- [ ] Automated accessibility scan run (Xcode Accessibility Inspector / Android Accessibility Scanner / axe) and issues triaged — Apple Xcode HIG; Google Accessibility Scanner
- [ ] Manual VoiceOver test completed on iOS device (not simulator) covering all user flows
- [ ] Manual TalkBack test completed on Android device (not emulator) covering all user flows
- [ ] Contrast ratios verified with tool (e.g., Colour Contrast Analyser, Contrast) on live app screens
- [ ] Dynamic Type tested at all system font sizes on both platforms
- [ ] Reduced motion setting tested on both platforms
- [ ] Touch target sizes verified on physical device (not preview canvas)
- [ ] Third-party or user-testing session with at least one assistive-technology user conducted: \_evidence\_link\_
- [ ] Known issues documented with severity and remediation plan: \_issue\_tracker\_link\_
- [ ] Sign-off: \_\_\_\_\_\_\_\_\_\_\_\_\_\_ (Date: 2026-09-20)

---

## Source References

| Standard | Reference |
|---|---|
| WCAG 2.1 / 2.2 | W3C Web Content Accessibility Guidelines — [https://www.w3.org/TR/WCAG/](https://www.w3.org/TR/WCAG/) |
| WCAG 2.4.6, 2.4.7 | W3C — Focus Visible, Headings and Labels |
| WCAG 2.5.8 | W3C — Target Size (Level AA) |
| Apple HIG | Apple Human Interface Guidelines — Accessibility: [https://developer.apple.com/design/human-interface-guidelines/accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) |
| Apple UIAccessibility | Apple Developer Documentation: [https://developer.apple.com/documentation/uikit/uiaccessibility](https://developer.apple.com/documentation/uikit/uiaccessibility) |
| Google Material Design | Material Design Accessibility Guidelines: [https://m2.material.io/design/accessibility](https://m2.material.io/design/accessibility) |
| Google Accessibility Scanner | Google Play: [https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor) |

---

> **Caveat:** This checklist is a verification aid, not a certification. Passing all items does not guarantee WCAG conformance or absence of usability barriers. Each owner must independently validate and document evidence. Requirements cited as "pending" or "Level AAA" are aspirational unless adopted by the relevant authority.

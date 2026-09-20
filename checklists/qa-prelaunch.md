# Pre-Launch QA Checklist & Device Testing Matrix

> **Last Verified**: 2026-09-20
> **Testing Scope**: Hardware fragmentation, network stress testing, and OS lifecycle edge cases.
> **Target Quality Gate**: Zero fatal crashes across all primary tier-1 test devices.

---

## 1. Physical Device Testing Matrix

Never launch based solely on simulator or emulator tests. Simulators mask frame drops, thermal throttling, real camera quirks, and haptic latency.

| Tier | Device Type | Model / Specs | Key Validation Check |
|---|---|---|---|
| **Tier 1** | Compact iPhone | iPhone SE (3rd Gen) / Mini | Small screen layout (4.7"), no Dynamic Island |
| **Tier 1** | Flagship iPhone | iPhone 16 Pro Max / 15 Pro | Dynamic Island insets, ProMotion 120Hz |
| **Tier 1** | Flagship Android | Samsung Galaxy S24 / Pixel 8 | Android 15, OneUI / Pixel edge-to-edge |
| **Tier 2** | Budget Android | Xiaomi Redmi / Moto G (3GB/4GB RAM) | Low RAM, aggressive background kill, GPU blur |
| **Tier 2** | Tablet | iPad 11" / Galaxy Tab | 2x scaling or multi-column responsive grid |

---

## 2. Network Stress & Edge Case Scenarios

- [ ] **2.1 Airplane Mode & Complete Disconnect**
  - [ ] App displays a clear, elegant offline banner rather than an unhandled red error screen.
  - [ ] Cached items remain readable and browsable offline.

- [ ] **2.2 High Latency & Slow 3G Emulation**
  - [ ] Test using Network Link Conditioner (3G / 1000ms latency / 10% packet loss).
  - [ ] Skeleton shimmer animations keep the user informed during slow fetches without freezing the UI.
  - [ ] Timeouts cleanly abort after 15 seconds with a user-friendly retry prompt.

- [ ] **2.3 Network Transition Mid-Request**
  - [ ] User starts an upload or purchase and switches from Wi-Fi to Cellular (or enters an elevator).
  - [ ] Mutations do not corrupt local data or submit duplicate transactions.

---

## 3. OS Lifecycle & Memory Edge Cases

- [ ] **3.1 Background State Restoration**
  - [ ] Background app, open 5 heavy games to trigger OS memory pressure, and return to app.
  - [ ] App recovers cleanly without crashing; restores navigation state or returns safely to root.

- [ ] **3.2 Permission Revocation While Backgrounded**
  - [ ] Grant notification/camera permission, background the app, revoke the permission in OS Settings, and return.
  - [ ] App handles revoked state gracefully without crashing.

- [ ] **3.3 Interruption Handling**
  - [ ] Receive an incoming phone call or OS alarm during active use, paywall interaction, or media playback.
  - [ ] App pauses state cleanly and resumes audio/video playback appropriately upon call termination.

---

## 4. In-App Purchase Sandbox Validation

- [ ] **4.1 Sandbox Purchase Scenarios**
  - [ ] New subscription purchase completes cleanly on Apple Sandbox & Google Play License Testing.
  - [ ] Card failure / simulated billing issue displays an informative error (never infinite loading).
  - [ ] "Restore Purchases" executed on a fresh test device successfully unlocks entitlement.
  - [ ] Cancel subscription in sandbox settings: Entitlement revokes upon period expiration.

---

*Verified against production mobile QA standards.*

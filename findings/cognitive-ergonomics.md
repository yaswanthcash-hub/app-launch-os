# Cognitive Ergonomics & HCI Laws Research Digest

**Verification date:** 2026-09-20  
**License:** MIT  
**Status:** Verified against primary cognitive science literature, Apple HIG, Google Material Design 3, and Nielsen Norman Group research.

---

## 🧭 Executive Summary

Mobile user interfaces are not merely graphic arrangements; they are **cognitive extensions of human perception and motor control**. When an app feels "clunky", "jarring", or "confusing", it is almost never because the aesthetic color palette is flawed—it is because the interface violates the biological, neurological, and perceptual limits of the human brain.

This digest establishes the empirical Human-Computer Interaction (HCI) foundations for **App Launch OS**. It codifies 12 foundational laws of UX, their mathematical formulations, their neurological mechanisms, their concrete mobile implementation patterns in React Native / Expo, and the catastrophic store-review and retention anti-patterns that occur when they are ignored.

---

## 🗺️ The 12 Foundational HCI & Cognitive Laws

| Law / Principle | Cognitive Origin | Mathematical / Empirical Model | Mobile Implementation Anchor |
| :--- | :--- | :--- | :--- |
| **1. Jakob's Law** | Jakob Nielsen (2000) | $S_{\text{mental}} \propto \text{Convention}_{\text{external}}$ | Native tab bars, system back gestures, modal sheets |
| **2. Fitts's Law** | Paul Fitts (1954) | $T = a + b \log_2\left(1 + \frac{D}{W}\right)$ | Natural thumb zone, sticky bottom CTAs, $\ge 44\times 44\text{pt}$ hitboxes |
| **3. Hick-Hyman Law** | W. Hick & R. Hyman (1952) | $T = b \log_2(n + 1)$ | Single-task onboarding screens, $\le 3$ paywall tiers |
| **4. Miller's Law** | George A. Miller (1956) | $C_{\text{working memory}} = 7 \pm 2 \text{ (or } 4 \pm 1\text{)}$ | Phone/card number chunking, segmented setting lists |
| **5. Doherty Threshold** | W. Doherty & A. Thadani (1982) | $T_{\text{response}} < 400\text{ms}$ | $\le 100\text{ms}$ haptic/scale feedback, Moti skeletons |
| **6. Zeigarnik Effect** | Bluma Zeigarnik (1927) | Intrusive memory of interrupted tasks | Stepped onboarding progress bars, setup checklist meters |
| **7. Peak-End Rule** | D. Kahneman & A. Tversky (1993) | $E_{\text{remembered}} = f(\text{Peak}, \text{End})$ | Milestone celebration haptics, frictionless offboarding |
| **8. Von Restorff Effect** | Hedwig von Restorff (1933) | Isolation $\to$ differential salience | Pre-selected "Best Value" paywall card, primary CTA accent |
| **9. Tesler's Law** | Larry Tesler (1984) | $C_{\text{system}} + C_{\text{user}} = \text{Constant}$ | Automatic corner concentricity, background receipt validation |
| **10. Aesthetic-Usability Effect** | M. Kurosu & K. Kashimura (1995) | Perceived usability $\propto$ visual harmony | Continuous squircles, frosted glassmorphism, 120 FPS spring physics |
| **11. Goal-Gradient Effect** | Clark L. Hull (1932) | Velocity $\propto \frac{1}{\text{Distance to Goal}}$ | Artificial progression in onboarding (start at Step 1 of 4) |
| **12. Gestalt Laws** | M. Wertheimer & K. Koffka (1923) | Proximity, Similarity, Common Region | 8-point spatial token rhythm, inset card containers |

---

## 🔬 In-Depth Analysis & Implementation Specifications

### 1. Jakob’s Law (Platform Familiarity & Mental Models)

> *"Users spend most of their time on other sites and apps. This means that users prefer your site or app to work the same way as all the other apps they already know."* — Jakob Nielsen (Nielsen Norman Group, 2000)

#### Neurological & Cognitive Basis
Human working memory is severely bandwidth-constrained. When entering an unfamiliar digital environment, users rely on **pre-existing cognitive schema** (mental models) built up over thousands of hours using the operating system (iOS or Android) and dominant ecosystem apps (Instagram, Apple Music, WhatsApp). Forcing users to learn an idiosyncratic navigation paradigm induces extraneous cognitive load, causing hesitation, disorientation, and early churn.

#### Mathematical / Conceptual Model
$$\Delta \text{Cognitive Friction} = \left\| \mathbf{M}_{\text{App}} - \mathbf{M}_{\text{Platform}} \right\|$$
Minimizing the distance between the app's mental model ($\mathbf{M}_{\text{App}}$) and the platform's standard conventions ($\mathbf{M}_{\text{Platform}}$) drives friction toward zero.

#### Mobile Implementation in App Launch OS
1. **Platform-Native Navigation:** Use standard bottom navigation tabs on iOS (`5` maximum items) and Android system navigation bars.
2. **Standard Gestures:**
   - On iOS: Preserve the interactive edge-swipe back navigation gesture across all stack screens (`react-native-screens`).
   - On Android: Respect the physical/system predictive back gesture (`BackHandler`).
3. **Modal Semantics:** Present auxiliary workflows as interactive bottom sheets with clear drag indicators and downward drag-to-dismiss behavior.
4. **Search Behavior:** Place search bars pinned at the top or collapsibly integrated into navigation headers rather than non-standard floating widgets.

#### Anti-Patterns
- ❌ Inventing circular/radial floating action menus that replace standard tab bars.
- ❌ Overriding or disabling the platform-native edge-swipe back gesture.
- ❌ Using custom non-standard close buttons placed in bottom corners instead of standard top-left/top-right modal dismissals.

---

### 2. Fitts’s Law (Touch Target Ergonomics & The Thumb Zone)

> *"The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target."* — Paul M. Fitts (1954)

#### Mathematical Formulation
$$T = a + b \log_2\left(1 + \frac{D}{W}\right) = a + b \cdot \text{ID}$$
Where:
- $T$: Average time to acquire and actuate the target.
- $a, b$: Empirical regression constants of the human neuromuscular system.
- $D$: Distance from the starting hand position to the target center.
- $W$: Effective width (or hit target diameter) along the axis of motion.
- $\text{ID} = \log_2(1 + D/W)$: The **Index of Difficulty** in bits.

#### Mobile Ergonomics: The Natural Thumb Zone
In handheld mobile use, $D$ is dictated by biomechanics:
- **One-handed thumb zone:** The bottom 30% of the display represents the minimal distance $D \to 0$.
- **Hard-to-reach zone:** The top corners represent maximum distance $D_{\max}$, requiring uncomfortable grip adjustments or two-handed operation.
- **Infinite Virtual Target Width ($W \to \infty$):** Screen edges and corners act as physical stops where the user cannot overshoot the target. Edge-pinned gestures and bottom-docked bars have an effective $\text{ID} \to 0$.

#### Mobile Implementation in App Launch OS
1. **Sticky Primary CTAs:** Anchor primary conversion actions (e.g. "Continue", "Subscribe Now", "Checkout") in a sticky bottom bar docked immediately above the safe area inset.
2. **Strict Minimum Touch Targets:**
   - iOS: Minimum **$44 \times 44\text{ pt}$** effective hit area ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines)).
   - Android: Minimum **$48 \times 48\text{ dp}$** effective hit area ([Material Design 3](https://m3.material.io/)).
3. **HitSlop Expansion:** For visually compact icons ($20\text{pt}$ glyphs), apply `hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}` to ensure the interactive hitbox satisfies Fitts's target width $W \ge 44\text{pt}$.
4. **Edge Spacing:** Maintain $\ge 8\text{pt}$ separation between adjacent touch targets to eliminate accidental adjacent actuation.

---

### 3. The Hick-Hyman Law (Choice Architecture & Decision Latency)

> *"The time it takes to make a decision increases logarithmically as the number of alternatives increases."* — William Edmund Hick (1952) & Ray Hyman (1953)

#### Mathematical Formulation
$$T = b \cdot \log_2(n + 1)$$
Where:
- $T$: Mean reaction / choice decision time.
- $n$: Number of equiprobable options presented simultaneously.
- $b$: Cognitive processing constant (~$150\text{ms}$ per bit of information for human choice).

When options have unequal probabilities $p_i$, the generalized information-entropy formula applies:
$$T = b \cdot H = b \sum_{i=1}^{n} p_i \log_2\left(\frac{1}{p_i} + 1\right)$$

#### Mobile Implementation in App Launch OS
1. **Paywall Choice Architecture:**
   - Limit paywall options to **at most 2–3 options** (typically *Annual* vs. *Monthly*).
   - Skew probabilities $p_i$ by designating a pre-selected default tier ("Annual - Save 50%"). This collapses the user's decision from a multi-option comparison ($n=3$) into a simple binary confirmation ($n=1$), drastically reducing reaction time $T$.
2. **Stepped Progressive Disclosure in Onboarding:**
   - Rather than presenting a single form with 10 questions ($n=10$), decompose onboarding into sequential 1-question cards ($n=1$).
   - Progressive disclosure maintains low cognitive resistance at each step, yielding higher end-to-end completion rates.
3. **Bottom Navigation Density:** Limit primary navigation tabs to $\le 5$ destinations (ideally 3 or 4).

---

### 4. Miller’s Law & Cognitive Chunking

> *"The span of immediate memory and the span of absolute judgment imposes an upper limit on human capacity to process information: approximately seven plus or minus two items."* — George A. Miller (1956)

#### Contemporary Refinement (Cowan's Model)
While Miller observed $7 \pm 2$ chunks for simple unidimensional stimuli, Nelson Cowan (2001) established that for complex, working-memory-intensive tasks, the true active capacity is **$4 \pm 1$ chunks**.

#### Mobile Implementation in App Launch OS
1. **Input Masking & Auto-Chunking:**
   - Never present raw unformatted text fields for structured data.
   - Credit card inputs: Group automatically into `4-4-4-4` digit chunks.
   - Phone numbers: Chunk into `(XXX) XXX-XXXX`.
   - Two-factor OTP codes: Present as discrete individual single-digit cells (e.g., 6 distinct boxes) rather than a single uninterrupted input string.
2. **Grouped Settings & Navigation:**
   - Group configuration rows into inset cards containing no more than **3 to 5 items** per section, separated by semantic headers.
3. **Value Proposition Bullets:**
   - On paywalls and landing slides, limit feature benefit bullets to **3 or 4 high-impact outcomes**. Exceeding 5 bullets triggers working memory saturation and causes users to skim without comprehension.

---

### 5. The Doherty Threshold (System Latency & Conversational Flow)

> *"Productivity increases in direct proportion to the reduction in response time. When a computer and its users interact at a pace that ensures neither has to wait on the other, productivity soars, with response times dropping below 400 milliseconds."* — Walter J. Doherty & Aravind J. Thadani (IBM Research, 1982)

#### Cognitive Mechanics
When human perception detects feedback within $<400\text{ms}$ (the human perception threshold for conversational synchrony), the brain maintains uninterrupted focus. When latency exceeds $400\text{ms}$, the mental buffer decays, attention disengages, and task-switching impulses trigger.

#### The 3 Latency Thresholds in Mobile UX
- **$\le 100\text{ms}$ (Immediate Perceptual Feedback):** Visual press state (`scale: 0.97`) and tactile haptic response must fire within 100ms on the native UI thread.
- **$\le 400\text{ms}$ (Doherty Conversational Flow):** The system must present the transition, layout skeleton, or optimistic state.
- **$> 1000\text{ms}$ (Context Loss Horizon):** Requires an animated progress bar or determinate indicator to prevent the user from concluding the app is frozen.

#### Mobile Implementation in App Launch OS
1. **Native UI-Thread Spring Reactions:** Button tap animations and gesture transitions execute via Reanimated 3 worklets running on the UI thread at 60/120 FPS ($16.6\text{ms} / 8.3\text{ms}$ frame budget).
2. **Instant Tactile Actuation:** Trigger `expo-haptics` (`Haptics.selectionAsync()`) on `onPressIn` rather than delayed `onPressOut`.
3. **Moti Geometric Shimmer Skeletons:** Never show a blank screen or a centered spinning spinner. Replace unloaded content immediately with geometric pulse skeletons matching the exact layout of the incoming data cards.
4. **Optimistic UI Mutations:** Immediately render like/bookmark/toggle state updates locally before awaiting backend network confirmation, with automatic rollback upon API failure.

---

### 6. The Zeigarnik & Ovsiankina Effects (Task Incompletion Drive)

> *"Uncompleted tasks create cognitive tension that keeps them active in memory until resolved."* — Bluma Zeigarnik (1927) & Maria Ovsiankina (1928)

#### Psychological Mechanism
The human brain possesses an intrinsic drive toward cognitive closure. An open task produces intrusive cognitive recall (the Zeigarnik Effect). If an uncompleted action is interrupted, an individual experiences a psychological impulse to resume and complete it as soon as friction is removed (the Ovsiankina Effect).

#### Mobile Implementation in App Launch OS
1. **Segmented Onboarding Progress Indicators:** Display a distinct segmented progress bar (e.g., `Card 2 of 4`) across the top of the onboarding sequence. Seeing the partially filled bar activates the need for task closure.
2. **Setup Checklist Meters:** For apps requiring post-install setup (e.g. enabling notifications, selecting preferences), render an incomplete setup checklist badge (e.g., "Account Setup: 75% — 1 step remaining").
3. **Paywall Abandonment Reminders:** When users exit a paywall without purchasing, store local engagement timestamps to contextualize a gentle follow-up notification or discount offer when intent resumes.

---

### 7. The Peak-End Rule (Sensory Memory & Emotional Anchoring)

> *"People judge an experience largely based on how they felt at its peak (the most intense point) and at its end, rather than the total sum or average of every moment."* — Daniel Kahneman & Amos Tversky (1993)

#### Psychological Mechanism
The human memory does not integrate emotional experiences through mathematical area-under-the-curve averaging. Instead, retrospective evaluation is dominated by two snapshot heuristics:
1. **The Peak:** The highest emotional valence moment (positive or negative).
2. **The End:** The terminal sensation experienced at the conclusion of the workflow.

#### Mobile Implementation in App Launch OS
1. **The Peak Delight Moment:**
   - When a user successfully achieves a major milestone (completing onboarding, finishing their first workout, completing a purchase), orchestrate a **multi-sensory peak celebration**:
     - Physical: Heavy success haptic notification (`Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)`).
     - Visual: 60 FPS confetti spring worklet or particle burst.
     - Auditory: Subtle native system confirmation sound.
2. **The End: Offboarding with Dignity:**
   - Cancellation and account deletion flows must be clean, respectful, and frictionless (compliant with Apple Review Guideline 5.1.1(v)).
   - Avoiding hostile dark patterns (e.g., forced phone calls, hidden cancel buttons) ensures that even departing users remember the product with respect, leaving App Store reviews intact and preserving future reactivation paths.

---

### 8. The Von Restorff Effect (Isolation & Visual Salience)

> *"When multiple homogeneous stimuli are presented, the stimulus that differs from the rest is most likely to be remembered and selected."* — Hedwig von Restorff (1933)

#### Visual Attention Mechanics
The human visual cortex continuously executes pre-attentive processing, scanning the visual field for anomalies in color, scale, contrast, and motion before conscious cognitive attention engages. An element exhibiting high visual contrast relative to its surrounding peer cluster captures involuntary ocular fixation.

#### Mobile Implementation in App Launch OS
1. **Paywall Plan Highlighting:**
   - In a multi-tier paywall (e.g., Monthly vs. Annual vs. Lifetime), the **Annual** tier is isolated via:
     - Prominent contrasting border (`border-2 border-primary-500`).
     - Distinct badge pill ("MOST POPULAR" or "SAVE 50%").
     - Elevated shadow / subtle background tint.
2. **Primary vs. Secondary Action Hierarchy:**
   - Primary action (e.g., "Start Free Trial"): Full-width solid fill, high-contrast typography, elevated surface.
   - Secondary action (e.g., "Restore Purchases", "Terms of Service"): Subtle text button or ghost border with lower visual weight.

---

### 9. Tesler’s Law (The Law of Conservation of Complexity)

> *"Every application has an inherent amount of complexity that cannot be removed or hidden. The only question is who must deal with it: the software engineer or the user."* — Larry Tesler (Xerox PARC & Apple, 1984)

#### Engineering Philosophy in App Launch OS
When engineers take shortcuts to make their own implementation simple, they inadvertently export that complexity to the end-user in the form of confusing dialogs, awkward layout gaps, and ambiguous error states. **App Launch OS mandates that engineering absorbs the complexity so the user experiences pure clarity.**

#### Concrete Manifestations in App Launch OS
1. **The Corner Concentricity Formula:**
   Instead of forcing designers and developers to manually guess border radii or letting nested containers look misaligned, App Launch OS codifies geometric concentricity directly into `ConcentricCard`:
   $$R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$$
   The math is fully absorbed by the component, guaranteeing flawless optical concentricity without developer effort.
2. **Automated Receipt Validation & Entitlement Reconciliation:**
   RevenueCat integration abstracts away Apple StoreKit 2 and Google Play Billing v7 edge cases (grace periods, billing retries, sandbox receipt refreshes) so the user experiences instant entitlement unlock without manual "Restore" troubleshooting.
3. **Automated Submission Compliance Audits:**
   The `npm run audit:all` script automatically verifies Apple 2026 Privacy Manifest declarations (`PrivacyInfo.xcprivacy`) and Google Play 16 KB page-size compatibility so store rejection risk is eliminated at build time.

---

### 10. The Aesthetic-Usability Effect

> *"Users strongly perceive aesthetically pleasing design as design that is more usable, intuitive, and tolerant of minor defects."* — Masaaki Kurosu & Kaori Kashimura (Hitachi Design Center, 1995); Donald Norman (2004)

#### Psychological Mechanism
Aesthetic attractiveness triggers positive affect and mild dopamine release, which relaxes the cognitive system and increases mental flexibility. Users facing an aesthetically polished app exhibit greater tolerance for minor operational delays and are substantially more likely to perceive the underlying architecture as trustworthy and secure.

#### Mobile Implementation in App Launch OS
1. **Curvature Continuity (Squircles / Superellipses):**
   - Modern mobile flagships feature continuous curvature bezels ($n \approx 4$ superellipses) with corner radii of $48\text{--}55\text{pt}$.
   - App Launch OS aligns modal sheets and navigation islands to harmonize with this continuous hardware curvature.
2. **Optical Frosted-Glass Depth (Glassmorphism):**
   - Backdrop blurs utilizing `expo-blur` with calibrated opacity fallbacks provide true physical layering, allowing users to maintain orientation over the active screen while inspecting modal paywalls.
3. **Physical Spring Kinetics:**
   - Replacing linear transitions with natural harmonic oscillation (`damping: 15, stiffness: 150, mass: 1`) imparts a tactile sense of mass, resistance, and physical reality to UI elements.

---

### 11. The Goal-Gradient Effect (Proximity to Completion)

> *"The tendency to approach a goal increases with proximity to the goal."* — Clark L. Hull (1932); Joseph Nunes & Xavier Drèze (Endowed Progress Effect, 2006)

#### Experimental Validation
In the classic Nunes & Drèze car-wash study, two groups received loyalty punch cards:
- **Group A:** 8 blank punches required to earn a free wash ($0/8 = 0\%$ start).
- **Group B:** 10 total punch slots, but with 2 pre-stamped punches already filled ($2/10 = 20\%$ start).
Both groups required exactly 8 additional purchases. Yet **Group B completed the card at a 54% higher conversion rate and in 20% less time** simply because they perceived themselves as having already made progress.

#### Mobile Implementation in App Launch OS
1. **Endowed Progress in Onboarding:**
   - Launch onboarding with the progress indicator already positioned at **25%** (e.g. "Step 1: Welcome & Account Initialized — Completed!").
   - Users who perceive the process as underway are significantly less likely to abandon than those facing a $0\%$ progress meter.
2. **Streak & Habit Acceleration:**
   - When initializing habit or fitness trackers, grant the user their Day 1 streak immediately upon setup completion.

---

### 12. Gestalt Principles (Proximity, Similarity & Common Region)

> *"The whole is other than the sum of its parts."* — Max Wertheimer, Kurt Koffka & Wolfgang Köhler (1923)

#### Core Principles for Mobile Architecture
1. **Law of Proximity:** Objects positioned close to one another are perceived as semantically related.
   - *Token Rule:* The distance between a form label and its input field ($4\text{pt}$ or $8\text{pt}$) must always be smaller than the distance to the next distinct form group ($24\text{pt}$).
2. **Law of Common Region:** Elements enclosed within a shared visual boundary are perceived as belonging to a unified group.
   - *Token Rule:* Inset card containers with subtle borders and surface elevation establish immediate cognitive boundaries for list items and setting sections.
3. **Law of Similarity:** Elements that share visual characteristics (color, shape, typography) are perceived as performing similar functions.
   - *Token Rule:* All destructive actions share `color.semantic.danger`; all primary forward actions share the unified primary brand token.

---

## 🚫 Comprehensive Cognitive Anti-Patterns Checklist

| Law Violated | Anti-Pattern Observed in Faulty Mobile Apps | Consequence | Store Review / Metric Impact |
| :--- | :--- | :--- | :--- |
| **Jakob's Law** | Custom circular floating menu replacing native bottom tabs | High cognitive friction; disoriented users | 1-star reviews; immediate D1 churn |
| **Fitts's Law** | Primary CTA placed in top-left corner; small $24\times 24\text{pt}$ hitboxes | High error rate; thumb fatigue; missed taps | High drop-off on conversion screens |
| **Hick's Law** | Paywall presenting 5 pricing tiers without recommended highlight | Decision paralysis; choice overload | Severe paywall bounce rate ($\ge 70\%$) |
| **Miller's Law** | Unchunked 16-digit credit card or 10-digit phone field | Visual fatigue; transcription typos | Failed payment checkout submissions |
| **Doherty Threshold** | Blank white screen during data fetch; no tap feedback | App perceived as unresponsive or crashed | Guideline 2.1 Rejection ("App unresponsive") |
| **Peak-End Rule** | Hostile multi-step cancellation flow hiding the delete button | Resentment; punitive user reviews | Guideline 5.1.1(v) Rejection (Account Deletion) |
| **Tesler's Law** | Misaligned concentric corners on nested cards | Visual cheapness; amateur brand perception | Poor user conversion and retention |

---

## 📚 Academic & Platform Citations

1. **Fitts, P. M. (1954).** *The information capacity of the human motor system in controlling the amplitude of movement.* Journal of Experimental Psychology, 47(6), 381–391.
2. **Hick, W. E. (1952).** *On the rate of gain of information.* Quarterly Journal of Experimental Psychology, 4(1), 11–26.
3. **Miller, G. A. (1956).** *The magical number seven, plus or minus two: Some limits on our capacity for processing information.* Psychological Review, 63(2), 81–97.
4. **Doherty, W. J., & Thadani, A. J. (1982).** *The economic value of rapid response time.* IBM Systems Journal, 21(3), 384–411.
5. **Kahneman, D., Fredrickson, B. L., Schreiber, C. A., & Redelmeier, D. A. (1993).** *When More Pain is Preferred to Less: Adding a Better End.* Psychological Science, 4(6), 401–405.
6. **Kurosu, M., & Kashimura, K. (1995).** *Apparent usability vs. inherent usability.* CHI '95 Conference Companion, 292–293.
7. **Nunes, J. C., & Drèze, X. (2006).** *The Endowed Progress Effect: How Artificial Advancement Increases Effort.* Journal of Consumer Research, 32(4), 504–512.
8. **Nielsen, J. (2000).** *Designing Web Usability: The Practice of Simplicity.* New Riders Publishing / Nielsen Norman Group.
9. **Apple Inc. (2026).** *Human Interface Guidelines: Ergonomics, Touch Targets, and Navigation.* [developer.apple.com](https://developer.apple.com/design/human-interface-guidelines).
10. **Google LLC (2026).** *Material Design 3: Ergonomics and Motion.* [m3.material.io](https://m3.material.io/).

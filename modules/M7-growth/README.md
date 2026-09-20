# M7: Growth Loops & Viral Referrals Kit

> **Organic growth loops, referral link generators, share cards, and smart in-app review prompts.**
> Part of [App Launch OS](../../README.md).

---

## 🎯 Organic Distribution Engine

Acquiring mobile users via paid ads is expensive. Organic loops (referrals, deep-link share cards, and well-timed store reviews) provide sustainable compound growth.

`@app-launch-os/growth` provides:
1. **Referral Link Engine**: Generates unique alphanumeric codes and builds universal deep links (`https://yourapp.com/join?ref=CODE`).
2. **Native Share Card (`ShareCard`)**: Visual component with native sharing integration via `expo-sharing`.
3. **Smart Review Prompt (`useSmartReviewPrompt`)**: Triggers `StoreReview.requestReview()` strictly after positive milestones, completely avoiding cold-boot prompts that violate Apple HIG and attract 1-star ratings.

---

## 📦 Installation

```bash
npm install @app-launch-os/growth
npx expo install expo-sharing expo-store-review
```

---

## 🚀 Quickstart

### 1. In-App Rating Prompt Trigger

```tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSmartReviewPrompt } from '@applaunchos/growth';

export function CompleteTaskButton() {
  const { registerPositiveAction } = useSmartReviewPrompt({
    minActionsRequired: 5, // Triggers prompt after 5 completed tasks
    maxPromptsPerYear: 3,  // Apple hard limit
  });

  const handleCompleteTask = async () => {
    // 1. Perform business logic
    console.log('Task finished!');

    // 2. Safely increment positive counter (prompts only when conditions are met)
    await registerPositiveAction();
  };

  return (
    <TouchableOpacity onPress={handleCompleteTask}>
      <Text>Mark Task as Done</Text>
    </TouchableOpacity>
  );
}
```

### 2. Viral Referral Share Card

```tsx
import React from 'react';
import { ShareCard, buildReferralUrl } from '@applaunchos/growth';

export function InviteFriendsScreen() {
  const { shareUrl } = buildReferralUrl('https://myapp.com', 'ALEX99', 'invite_screen');

  return (
    <ShareCard
      title="Give 1 Month Free, Get 1 Month Free"
      description="Share your personal invite link with teammates or friends."
      referralCode="ALEX99"
      shareUrl={shareUrl}
      buttonText="Share Invite Link"
      onShareComplete={() => console.log('User shared referral link')}
    />
  );
}
```

---

## 🔗 Related Resources

- [App Store Optimization Research Digest](../../findings/aso.md)
- [Event Taxonomy Template](../../templates/event-taxonomy.md)

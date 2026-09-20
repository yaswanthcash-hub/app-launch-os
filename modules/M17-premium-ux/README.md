# @applaunchos/premium-ux

**Sensory Ergonomics & Premium Mobile Interaction Kit for React Native / Expo.**

## What's Included
1. **`useHaptic` Hook:** Calibrated 5-tier tactile feedback (`selection`, `lightImpact`, `mediumImpact`, `successNotification`, `errorNotification`).
2. **`ConcentricCard`:** Container component enforcing the concentricity formula:
   $$R_{\text{inner}} = \max(0, R_{\text{outer}} - P)$$
3. **`SkeletonLoader`:** Reanimated 3 UI-thread geometric placeholder eliminating blank loading screens.
4. **`GlassSheet`:** Frosted glass bottom sheet utilizing `expo-blur` with Android fallback.

## Quick Example

```tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ConcentricCard, useHaptic } from '@applaunchos/premium-ux';

export function ExampleCard() {
  const { selection } = useHaptic();

  return (
    <ConcentricCard outerRadius={24} padding={16}>
      {(innerRadius) => (
        <View style={{ borderRadius: innerRadius, backgroundColor: '#334155', padding: 12 }}>
          <Text style={{ color: '#fff' }}>Concentric nested container</Text>
          <Pressable onPress={selection}>
            <Text style={{ color: '#818CF8' }}>Tap with haptic</Text>
          </Pressable>
        </View>
      )}
    </ConcentricCard>
  );
}
```

*License: MIT · App Launch OS*

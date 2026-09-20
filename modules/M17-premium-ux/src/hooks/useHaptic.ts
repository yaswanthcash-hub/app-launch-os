import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export type HapticType = 'selection' | 'light' | 'medium' | 'success' | 'warning' | 'error';

/**
 * Reusable physical tactile feedback hook calibrated across 5 interaction tiers.
 * Safely executes on native devices and gracefully degrades on web/unsupported platforms.
 */
export function useHaptic() {
  const trigger = useCallback(async (type: HapticType = 'selection') => {
    if (Platform.OS === 'web') return;

    try {
      switch (type) {
        case 'selection':
          await Haptics.selectionAsync();
          break;
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
      }
    } catch {
      // Haptics not supported on device; fail silently
    }
  }, []);

  return {
    trigger,
    selection: () => trigger('selection'),
    lightImpact: () => trigger('light'),
    mediumImpact: () => trigger('medium'),
    successNotification: () => trigger('success'),
    errorNotification: () => trigger('error'),
  };
}

import * as Haptics from 'expo-haptics';

export function useHaptic() {
  return {
    selection: () => Haptics.selectionAsync(),
    lightImpact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    successNotification: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  };
}

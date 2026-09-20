import * as Haptics from 'expo-haptics';

export function useHaptic() {
  return {
    lightImpact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    selection: () => Haptics.selectionAsync()
  };
}

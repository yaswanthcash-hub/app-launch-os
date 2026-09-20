import { useExperimentContext } from '../context/ExperimentProvider';
import { FlagValue } from '../types';

/**
 * Hook for consuming feature flags.
 *
 * @example
 * const isNewCheckoutEnabled = useFeatureFlag('new_checkout_flow', false);
 */
export function useFeatureFlag<T extends FlagValue = boolean>(
  flagKey: string,
  defaultValue: T
): T {
  const { getFeatureFlag } = useExperimentContext();
  return getFeatureFlag(flagKey, defaultValue);
}

import { useEffect } from 'react';
import { useExperimentContext } from '../context/ExperimentProvider';

interface UseExperimentResult<T> {
  variantKey: string;
  payload?: T;
  isControl: boolean;
}

/**
 * Hook for consuming A/B test experiments and automatically firing exposure events.
 *
 * @example
 * const { variantKey, isControl, payload } = useExperiment('paywall_v2_headline', 'control');
 */
export function useExperiment<T = unknown>(
  experimentKey: string,
  fallbackVariantKey: string = 'control'
): UseExperimentResult<T> {
  const { getExperimentVariant, trackExposure } = useExperimentContext();

  const { variantKey, payload } = getExperimentVariant<T>(
    experimentKey,
    fallbackVariantKey
  );

  useEffect(() => {
    trackExposure(experimentKey, variantKey);
  }, [experimentKey, variantKey, trackExposure]);

  return {
    variantKey,
    payload,
    isControl: variantKey === fallbackVariantKey,
  };
}

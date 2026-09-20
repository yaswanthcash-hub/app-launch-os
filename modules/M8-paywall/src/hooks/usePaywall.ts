import { useState, useCallback } from 'react';
import { PaywallPlan } from '../types';

export interface UsePaywallOptions {
  plans: PaywallPlan[];
  defaultPlanId?: string;
  onPurchaseComplete?: (plan: PaywallPlan) => void;
  onRestoreComplete?: () => void;
}

export function usePaywall({
  plans,
  defaultPlanId,
  onPurchaseComplete,
  onRestoreComplete,
}: UsePaywallOptions) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    defaultPlanId || plans[0]?.id || ''
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);

  const subscribe = useCallback(
    async (plan: PaywallPlan) => {
      setLoading(true);
      setError(null);
      try {
        // Plug in RevenueCat / Superwall / StoreKit 2 native call here
        // Example: await Purchases.purchasePackage(pkg);
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated transaction
        onPurchaseComplete?.(plan);
      } catch (err: any) {
        setError(err.message || 'Purchase failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [onPurchaseComplete]
  );

  const restorePurchases = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      // Plug in RevenueCat / StoreKit 2 restore call here
      // Example: const customerInfo = await Purchases.restorePurchases();
      await new Promise((resolve) => setTimeout(resolve, 800));
      onRestoreComplete?.();
      return true;
    } catch (err: any) {
      setError(err.message || 'Restore failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, [onRestoreComplete]);

  return {
    selectedPlanId,
    setSelectedPlanId,
    selectedPlan,
    subscribe,
    restorePurchases,
    loading,
    error,
  };
}

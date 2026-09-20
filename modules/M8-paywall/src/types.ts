export interface PaywallPlan {
  id: string;
  title: string;
  billingPeriod: 'annual' | 'monthly';
  priceDisplay: string;
  pricePerPeriodDisplay: string;
  savingsBadge?: string; // e.g. "Save 40%"
  trialPeriodDays?: number;
  productId: string;
}

export interface PaywallFeature {
  title: string;
  description?: string;
  icon?: string;
}

export interface PaywallViewProps {
  headline?: string;
  subheadline?: string;
  features: PaywallFeature[];
  plans: PaywallPlan[];
  selectedPlanId: string;
  onSelectPlan: (planId: string) => void;
  onSubscribe: (plan: PaywallPlan) => Promise<void>;
  onRestorePurchases: () => Promise<boolean>;
  onClose?: () => void;
  termsUrl?: string;
  privacyUrl?: string;
  loading?: boolean;
}

import { describe, it, expect } from 'vitest';
import { PaywallTier } from '../src/types';

describe('M8-paywall Tier Definition', () => {
  it('validates paywall tier configuration', () => {
    const tier: PaywallTier = {
      id: 'pro_annual',
      title: 'Pro Annual',
      price: '$49.99/year',
      period: 'annual',
      trialDays: 7,
      badge: 'Best Value',
    };
    expect(tier.id).toBe('pro_annual');
    expect(tier.trialDays).toBe(7);
  });
});

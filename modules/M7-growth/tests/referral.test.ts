import { describe, it, expect } from 'vitest';
import { generateReferralCode, buildReferralUrl, extractReferralCode } from '../src/services/referral';

describe('M7-growth Referral Service', () => {
  it('generates a non-empty referral code avoiding ambiguous chars', () => {
    const code = generateReferralCode('user-123');
    expect(code).toBeDefined();
    expect(code.length).toBe(6);
    expect(code).not.toMatch(/[01IO]/);
  });

  it('builds referral URL with query params', () => {
    const info = buildReferralUrl('https://example.com', 'PROMO1', 'summer');
    expect(info.shareUrl).toBe('https://example.com/join?ref=PROMO1&utm_campaign=summer');
    expect(info.code).toBe('PROMO1');
  });

  it('extracts referral code from deep link URL', () => {
    const code = extractReferralCode('https://example.com/join?ref=APP99&other=1');
    expect(code).toBe('APP99');
  });
});

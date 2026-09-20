import { ReferralCodeInfo } from '../types';

/**
 * Generates an uppercase 6-8 character referral code from a user ID or random seed.
 */
export function generateReferralCode(seed: string = ''): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid confusing 0/O, 1/I
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);

  let code = '';
  for (let i = 0; i < 6; i++) {
    const idx = (hash + i * 13 + Math.floor(Math.random() * 10)) % chars.length;
    code += chars[idx];
  }
  return code;
}

/**
 * Builds a universal deep link with campaign and referral tracking.
 */
export function buildReferralUrl(
  baseUrl: string,
  referralCode: string,
  campaign: string = 'app_invite'
): ReferralCodeInfo {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const shareUrl = `${cleanBase}/join?ref=${encodeURIComponent(referralCode)}&utm_campaign=${encodeURIComponent(campaign)}`;

  return {
    code: referralCode,
    shareUrl,
    campaign,
  };
}

/**
 * Extracts referral code from an incoming deep link URL.
 */
export function extractReferralCode(url: string): string | null {
  try {
    const queryIdx = url.indexOf('?');
    if (queryIdx === -1) return null;
    const queryString = url.slice(queryIdx + 1);
    const params = new URLSearchParams(queryString);
    return params.get('ref') || params.get('referral') || null;
  } catch {
    return null;
  }
}

import { describe, it, expect, vi } from 'vitest';

vi.mock('react-native', () => ({
  Platform: { OS: 'web' },
}));

import { checkDeviceIntegrity } from '../src/checks/deviceIntegrity';

describe('M9-security Device Integrity Check', () => {
  it('returns clean device integrity on web platform', () => {
    const result = checkDeviceIntegrity();
    expect(result).toHaveProperty('isCompromised');
    expect(result).toHaveProperty('reasons');
    expect(result.isCompromised).toBe(false);
  });
});

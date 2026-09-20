import { describe, it, expect } from 'vitest';
import { chiSquarePValue, checkSampleRatioMismatch } from '../src/utils/srm';

describe('M6-experiments SRM Unit Tests', () => {
  it('calculates Chi-Square p-value accurately', () => {
    expect(chiSquarePValue(3.841, 1)).toBeCloseTo(0.050, 2);
    expect(chiSquarePValue(10.828, 1)).toBeCloseTo(0.001, 3);
    expect(chiSquarePValue(25, 5)).toBeCloseTo(0.00014, 4);
  });

  it('detects balanced sample ratios', () => {
    const res = checkSampleRatioMismatch([1000, 1000], [0.5, 0.5]);
    expect(res.hasMismatch).toBe(false);
    expect(res.chiSquare).toBe(0);
  });

  it('flags imbalanced sample ratio mismatch', () => {
    const res = checkSampleRatioMismatch([1200, 800], [0.5, 0.5]);
    expect(res.hasMismatch).toBe(true);
    expect(res.pValue).toBeLessThan(0.01);
  });
});

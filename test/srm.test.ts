import { describe, it, expect } from 'vitest';
import { chiSquarePValue, checkSampleRatioMismatch } from '../modules/M6-experiments/src/utils/srm';

describe('Sample Ratio Mismatch (SRM) & Chi-Square Math', () => {
  it('computes exact p-value for df=1 critical points', () => {
    // chi2 = 3.841, df = 1 -> p ≈ 0.050 (standard 95% critical value)
    const p05 = chiSquarePValue(3.841, 1);
    expect(p05).toBeCloseTo(0.050, 2);

    // chi2 = 10.828, df = 1 -> p ≈ 0.001 (standard 99.9% critical value)
    const p001 = chiSquarePValue(10.828, 1);
    expect(p001).toBeCloseTo(0.001, 3);
  });

  it('computes exact p-value for higher degrees of freedom (df=5)', () => {
    // chi2 = 25, df = 5 -> p ≈ 0.00014
    const pHighDf = chiSquarePValue(25, 5);
    expect(pHighDf).toBeCloseTo(0.00014, 4);
  });

  it('correctly identifies no mismatch in balanced A/B experiment', () => {
    // 5,000 vs 5,020 with 50/50 split
    const result = checkSampleRatioMismatch([5000, 5020], [0.5, 0.5]);
    expect(result.hasMismatch).toBe(false);
    expect(result.pValue).toBeGreaterThan(0.5);
  });

  it('detects severe sample ratio mismatch when ratio is skewed', () => {
    // Expected 50/50, but observed 6,000 vs 4,000 (huge SRM)
    const result = checkSampleRatioMismatch([6000, 4000], [0.5, 0.5]);
    expect(result.hasMismatch).toBe(true);
    expect(result.pValue).toBeLessThan(0.001);
  });
});

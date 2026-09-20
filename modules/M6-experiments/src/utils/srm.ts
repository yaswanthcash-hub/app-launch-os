import { SRMCheckResult } from '../types';

/**
 * Calculates Chi-Square test for Sample Ratio Mismatch (SRM).
 * If p-value < 0.001, there is an extreme likelihood of an SRM issue (e.g. bucketing bias or tracking failure).
 *
 * @param observed Array of observed sample counts [controlCount, variantCount, ...]
 * @param expectedWeights Array of expected weights [0.5, 0.5, ...]
 */
export function checkSampleRatioMismatch(
  observed: number[],
  expectedWeights: number[]
): SRMCheckResult {
  const totalObserved = observed.reduce((sum, val) => sum + val, 0);

  if (totalObserved === 0 || observed.length !== expectedWeights.length) {
    return {
      hasMismatch: false,
      chiSquare: 0,
      pValue: 1.0,
      expected: [],
      observed,
    };
  }

  const weightSum = expectedWeights.reduce((sum, val) => sum + val, 0);
  const normalizedWeights = expectedWeights.map((w) => w / weightSum);
  const expected = normalizedWeights.map((w) => w * totalObserved);

  let chiSquare = 0;
  for (let i = 0; i < observed.length; i++) {
    const obs = observed[i];
    const exp = expected[i];
    if (exp > 0) {
      chiSquare += Math.pow(obs - exp, 2) / exp;
    }
  }

  // Degrees of freedom = k - 1
  const df = observed.length - 1;

  // Approximate p-value using standard 1-df or 2-df thresholds
  // For df = 1: critical chi-square at p=0.001 is 10.828, p=0.01 is 6.635, p=0.05 is 3.841
  let pValue = 1.0;
  if (df === 1) {
    if (chiSquare > 10.828) pValue = 0.0009;
    else if (chiSquare > 6.635) pValue = 0.009;
    else if (chiSquare > 3.841) pValue = 0.049;
    else pValue = 0.5;
  } else {
    // General conservative check: chiSquare / df > 5 indicates severe anomaly
    pValue = chiSquare / df > 5 ? 0.0005 : 0.2;
  }

  const hasMismatch = pValue < 0.01;

  return {
    hasMismatch,
    chiSquare: Number(chiSquare.toFixed(4)),
    pValue,
    expected: expected.map((e) => Math.round(e)),
    observed,
  };
}

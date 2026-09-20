import { SRMCheckResult } from '../types';

/**
 * Lanczos approximation for ln(gamma(x)) (g=7, n=9)
 */
export function logGamma(x: number): number {
  const p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  const g = 7;
  if (x < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  x -= 1;
  let a = p[0];
  const t = x + g + 0.5;
  for (let i = 1; i < p.length; i++) {
    a += p[i] / (x + i);
  }
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

/**
 * Regularized lower incomplete gamma: P(a, x) = gamma(a, x) / Gamma(a)
 */
export function regularizedLowerIncompleteGamma(a: number, x: number): number {
  if (x <= 0) return 0;
  let sum = 1 / a;
  let term = 1 / a;
  for (let n = 1; n < 300; n++) {
    term *= x / (a + n);
    sum += term;
    if (Math.abs(term) < Math.abs(sum) * 1e-15) break;
  }
  return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
}

/**
 * Regularized upper incomplete gamma continued fraction: Q(a, x) = Gamma(a, x) / Gamma(a)
 */
export function regularizedUpperIncompleteGamma(a: number, x: number): number {
  if (x <= 0) return 1.0;
  const TINY = 1e-30;
  let b = x + 1 - a;
  let c = 1 / TINY;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i <= 300; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < TINY) d = TINY;
    c = b + an / c;
    if (Math.abs(c) < TINY) c = TINY;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-15) break;
  }
  return h * Math.exp(-x + a * Math.log(x) - logGamma(a));
}

/**
 * Exact Chi-Square survival function p-value for given chi2 statistic and degrees of freedom.
 * Computes P(X >= chi2) for X ~ ChiSquare(df).
 */
export function chiSquarePValue(chi2: number, df: number): number {
  if (chi2 <= 0 || df <= 0) return 1.0;
  const a = df / 2;
  const x = chi2 / 2;
  if (x < a + 1) {
    return Math.max(0, Math.min(1, 1 - regularizedLowerIncompleteGamma(a, x)));
  }
  return Math.max(0, Math.min(1, regularizedUpperIncompleteGamma(a, x)));
}

/**
 * Calculates Chi-Square test for Sample Ratio Mismatch (SRM).
 * If p-value < 0.01, there is a statistically significant likelihood of an SRM issue
 * (e.g. bucketing bias or tracking failure).
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
  const pValue = chiSquarePValue(chiSquare, df);
  const hasMismatch = pValue < 0.01;

  return {
    hasMismatch,
    chiSquare: Number(chiSquare.toFixed(4)),
    pValue: Number(pValue.toFixed(6)),
    expected: expected.map((e) => Math.round(e)),
    observed,
  };
}


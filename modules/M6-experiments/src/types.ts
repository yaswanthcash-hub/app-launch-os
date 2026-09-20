export type FlagValue = boolean | string | number | Record<string, unknown>;

export interface ExperimentVariant<T = unknown> {
  key: string;
  weight: number; // e.g. 0.5 for 50/50
  payload?: T;
}

export interface ExperimentConfig<T = unknown> {
  key: string;
  variants: ExperimentVariant<T>[];
  targetAudience?: Record<string, unknown>;
}

export interface ExperimentContextType {
  getFeatureFlag: <T extends FlagValue = boolean>(key: string, defaultValue: T) => T;
  getExperimentVariant: <T = unknown>(experimentKey: string, fallbackVariantKey: string) => {
    variantKey: string;
    payload?: T;
  };
  trackExposure: (experimentKey: string, variantKey: string) => void;
  userId: string | null;
  attributes: Record<string, unknown>;
}

export interface SRMCheckResult {
  hasMismatch: boolean;
  chiSquare: number;
  pValue: number;
  expected: number[];
  observed: number[];
}

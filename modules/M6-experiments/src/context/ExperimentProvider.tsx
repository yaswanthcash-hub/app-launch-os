import React, { createContext, useContext, useMemo } from 'react';
import {
  ExperimentContextType,
  FlagValue,
  ExperimentConfig,
} from '../types';

const ExperimentContext = createContext<ExperimentContextType | null>(null);

/**
 * Simple 32-bit FNV-1a hash for deterministic local bucket hashing.
 */
function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967296; // Normalized [0, 1)
}

interface ExperimentProviderProps {
  children: React.ReactNode;
  userId?: string;
  attributes?: Record<string, unknown>;
  flags?: Record<string, FlagValue>;
  experiments?: Record<string, ExperimentConfig<any>>;
  onExposure?: (experimentKey: string, variantKey: string) => void;
}

export const ExperimentProvider: React.FC<ExperimentProviderProps> = ({
  children,
  userId = 'anonymous_user',
  attributes = {},
  flags = {},
  experiments = {},
  onExposure,
}) => {
  const contextValue = useMemo<ExperimentContextType>(() => {
    return {
      userId,
      attributes,
      getFeatureFlag: <T extends FlagValue = boolean>(
        key: string,
        defaultValue: T
      ): T => {
        if (key in flags) {
          return flags[key] as T;
        }
        return defaultValue;
      },

      getExperimentVariant: <T = unknown>(
        experimentKey: string,
        fallbackVariantKey: string
      ): { variantKey: string; payload?: T } => {
        const config = experiments[experimentKey];
        if (!config || !config.variants || config.variants.length === 0) {
          return { variantKey: fallbackVariantKey };
        }

        // Deterministic hashing based on experimentKey + userId
        const hash = hashString(`${experimentKey}:${userId}`);
        let cumulative = 0;

        for (const variant of config.variants) {
          cumulative += variant.weight;
          if (hash < cumulative) {
            return {
              variantKey: variant.key,
              payload: variant.payload as T,
            };
          }
        }

        return {
          variantKey: config.variants[0].key,
          payload: config.variants[0].payload as T,
        };
      },

      trackExposure: (experimentKey: string, variantKey: string) => {
        onExposure?.(experimentKey, variantKey);
      },
    };
  }, [userId, attributes, flags, experiments, onExposure]);

  return (
    <ExperimentContext.Provider value={contextValue}>
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperimentContext = (): ExperimentContextType => {
  const ctx = useContext(ExperimentContext);
  if (!ctx) {
    throw new Error(
      'useExperimentContext must be used within an <ExperimentProvider>'
    );
  }
  return ctx;
};

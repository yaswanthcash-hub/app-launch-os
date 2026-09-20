import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import * as StoreReview from 'expo-store-review';
import { SmartReviewConfig } from '../types';

export function useSmartReviewPrompt(config: SmartReviewConfig = {}) {
  const {
    minActionsRequired = 5,
    maxPromptsPerYear = 3,
  } = config;

  const [actionCount, setActionCount] = useState(0);
  const [promptCount, setPromptCount] = useState(0);

  const registerPositiveAction = useCallback(async () => {
    const nextCount = actionCount + 1;
    setActionCount(nextCount);

    if (nextCount >= minActionsRequired && promptCount < maxPromptsPerYear) {
      if (Platform.OS !== 'web') {
        const isAvailable = await StoreReview.isAvailableAsync();
        if (isAvailable) {
          await StoreReview.requestReview();
          setPromptCount((prev) => prev + 1);
          setActionCount(0); // Reset action counter after requesting
        }
      }
    }
  }, [actionCount, minActionsRequired, promptCount, maxPromptsPerYear]);

  return {
    actionCount,
    promptCount,
    registerPositiveAction,
  };
}

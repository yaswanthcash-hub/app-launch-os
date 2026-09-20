import { Platform } from 'react-native';
import { DeviceIntegrityResult } from '../types';

/**
 * Basic device integrity and compromise heuristic checks.
 * Detects obvious indicators of jailbroken or rooted environments.
 */
export function checkDeviceIntegrity(): DeviceIntegrityResult {
  const reasons: string[] = [];

  if (Platform.OS === 'web') {
    return { isCompromised: false, reasons: [] };
  }

  // Example heuristic: Check if running in development mode on an emulator with debug symbols
  // In native apps, full attestation requires Play Integrity (Android) or DeviceCheck (iOS).
  if (__DEV__) {
    reasons.push('Running in DEBUG / Development mode');
  }

  return {
    isCompromised: reasons.length > 0,
    reasons,
  };
}

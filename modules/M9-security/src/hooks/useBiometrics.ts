import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { BiometricAuthResult, BiometricStatus } from '../types';

export function useBiometrics() {
  const [status, setStatus] = useState<BiometricStatus>({
    isHardwareAvailable: false,
    isEnrolled: false,
    supportedTypes: [],
  });
  const [loading, setLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    if (Platform.OS === 'web') {
      setStatus({
        isHardwareAvailable: false,
        isEnrolled: false,
        supportedTypes: [],
      });
      setLoading(false);
      return;
    }

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

      const supportedTypes = types.map((type) => {
        if (type === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) {
          return 'FaceID';
        }
        if (type === LocalAuthentication.AuthenticationType.FINGERPRINT) {
          return 'Fingerprint';
        }
        if (type === LocalAuthentication.AuthenticationType.IRIS) {
          return 'Iris';
        }
        return 'Biometrics';
      });

      setStatus({
        isHardwareAvailable: hasHardware,
        isEnrolled,
        supportedTypes,
      });
    } catch {
      setStatus({
        isHardwareAvailable: false,
        isEnrolled: false,
        supportedTypes: [],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const authenticate = async (
    promptMessage: string = 'Authenticate to continue',
    fallbackLabel: string = 'Use Passcode'
  ): Promise<BiometricAuthResult> => {
    if (Platform.OS === 'web') {
      return { success: true };
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel,
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      if (result.success) {
        return { success: true };
      }

      return {
        success: false,
        error: result.error || 'Authentication canceled or failed',
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Biometric authentication threw an error',
      };
    }
  };

  return {
    ...status,
    loading,
    checkStatus,
    authenticate,
  };
}

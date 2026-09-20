export interface BiometricAuthResult {
  success: boolean;
  error?: string;
  warning?: string;
}

export interface BiometricStatus {
  isHardwareAvailable: boolean;
  isEnrolled: boolean;
  supportedTypes: string[];
}

export interface DeviceIntegrityResult {
  isCompromised: boolean;
  reasons: string[];
}

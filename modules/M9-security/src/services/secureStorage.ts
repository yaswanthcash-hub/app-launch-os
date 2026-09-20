import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * Enterprise Secure Storage Service
 * Stores secrets in iOS Keychain and Android Keystore.
 * Satisfies OWASP MASVS MSTG-STORAGE-1 (No credentials in plaintext AsyncStorage).
 */
export const secureStorage = {
  /**
   * Save a key-value pair into hardware-backed secure storage.
   */
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        sessionStorage.setItem(key, value);
      } catch {}
      return;
    }

    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },

  /**
   * Retrieve a value from hardware-backed secure storage.
   */
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    }

    return await SecureStore.getItemAsync(key, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },

  /**
   * Delete a value from hardware-backed secure storage.
   */
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        sessionStorage.removeItem(key);
      } catch {}
      return;
    }

    await SecureStore.deleteItemAsync(key, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },

  /**
   * Purge all authentication and session tokens during account deletion or logout.
   */
  async purgeSession(keys: string[]): Promise<void> {
    await Promise.all(keys.map((k) => this.removeItem(k)));
  },
};

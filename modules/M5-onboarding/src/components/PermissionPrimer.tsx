import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { PermissionPrimerProps } from '../types';

export const PermissionPrimer: React.FC<PermissionPrimerProps> = ({
  type,
  title,
  description,
  benefitBullets,
  ctaText = 'Continue',
  skipText = 'Maybe Later',
  onRequestNativePermission,
  onDismiss,
  onSuccess,
  visible,
}) => {
  const [requesting, setRequesting] = useState(false);

  if (!visible) return null;

  const handleTriggerNative = async () => {
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      setRequesting(true);
      const granted = await onRequestNativePermission();
      setRequesting(false);

      if (granted) {
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        onSuccess?.();
      } else {
        onDismiss();
      }
    } catch {
      setRequesting(false);
      onDismiss();
    }
  };

  const handleSkip = () => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    onDismiss();
  };

  // Outer radius: 24, padding: 20 => Inner radius = max(0, 24 - 20) = 4
  const outerRadius = 24;
  const padding = 20;
  const innerRadius = Math.max(0, outerRadius - padding);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={handleSkip}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            { borderRadius: outerRadius, padding },
          ]}
        >
          {/* Header Icon / Badge */}
          <View style={[styles.badge, { borderRadius: 12 }]}>
            <Text style={styles.badgeText}>
              {type === 'notifications'
                ? '🔔'
                : type === 'tracking'
                ? '🔒'
                : type === 'camera'
                ? '📷'
                : '📍'}
            </Text>
          </View>

          {/* Value Title & Pitch */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          {/* Benefit Bullets */}
          <View style={[styles.bulletsList, { borderRadius: innerRadius }]}>
            {benefitBullets.map((bullet, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bulletCheck}>✓</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleTriggerNative}
            disabled={requesting}
            style={[styles.primaryButton, { borderRadius: 12 }]}
          >
            {requesting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>{ctaText}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleSkip}
            disabled={requesting}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>{skipText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  badge: {
    width: 52,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    color: '#A1A1AA',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  bulletsList: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 16,
    marginBottom: 24,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletCheck: {
    color: '#34D399',
    fontWeight: '700',
    fontSize: 14,
    marginRight: 10,
  },
  bulletText: {
    color: '#E4E4E7',
    fontSize: 13,
    flex: 1,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#71717A',
    fontSize: 13,
    fontWeight: '500',
  },
});

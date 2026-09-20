import React from 'react';
import { View, StyleSheet, Platform, Modal, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { HARDWARE_BEZEL_RADII } from '../utils/concentricity';

export interface GlassSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Premium modal bottom sheet with native iOS frosted glass blur
 * and hardware-accelerated translucent fallback for Android.
 */
export function GlassSheet({ visible, onClose, children }: GlassSheetProps) {
  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              {Platform.OS === 'ios' ? (
                <BlurView intensity={80} tint="systemUltraThinMaterialDark" style={styles.blurContainer}>
                  <View style={styles.content}>{children}</View>
                </BlurView>
              ) : (
                <View style={styles.androidContainer}>
                  <View style={styles.content}>{children}</View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    borderTopLeftRadius: HARDWARE_BEZEL_RADII.iPhonePro,
    borderTopRightRadius: HARDWARE_BEZEL_RADII.iPhonePro,
    overflow: 'hidden',
  },
  blurContainer: {
    padding: 24,
  },
  androidContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    padding: 24,
  },
  content: {
    paddingBottom: 24,
  },
});

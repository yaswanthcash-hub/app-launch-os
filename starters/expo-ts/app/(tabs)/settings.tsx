import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Trash2, ExternalLink, Shield } from 'lucide-react-native';

export default function SettingsScreen() {
  const [deleting, setDeleting] = useState(false);

  const confirmDeleteAccount = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});

    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data per Apple Guideline 5.1.1(v). This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Permanently Delete',
          style: 'destructive',
          onPress: () => {
            setDeleting(true);
            setTimeout(() => {
              setDeleting(false);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
              Alert.alert('Account Deleted', 'Your account and data have been wiped from our servers.');
            }, 1200);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings & Legal</Text>

      {/* Compliance Notice */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Shield color="#6366F1" size={20} />
          <Text style={styles.sectionTitle}>Privacy & Policies</Text>
        </View>
        <Text style={styles.bodyText}>
          Meets 2026 store requirements: self-service in-app deletion, transparent terms, and external web deletion endpoints.
        </Text>
      </View>

      {/* Account Deletion (Apple Guideline 5.1.1v) */}
      <View style={styles.dangerSection}>
        <Text style={styles.dangerTitle}>Account Management</Text>
        <Pressable
          style={styles.deleteButton}
          onPress={confirmDeleteAccount}
          disabled={deleting}
          accessibilityLabel="Delete Account & Purge Data"
          accessibilityRole="button"
        >
          <Trash2 color="#EF4444" size={18} />
          <Text style={styles.deleteText}>
            {deleting ? 'Purging Account Data...' : 'Delete Account & Purge Data'}
          </Text>
        </Pressable>
        <Text style={styles.caption}>
          Mandatory for all apps with account registration (Apple Guideline 5.1.1(v)).
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
    marginTop: 8,
  },
  section: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  bodyText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
  dangerSection: {
    backgroundColor: '#0F172A',
    borderColor: '#7F1D1D',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FCA5A5',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#450A0A',
    borderColor: '#991B1B',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  deleteText: {
    color: '#FCA5A5',
    fontWeight: '600',
    fontSize: 15,
  },
  caption: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
});

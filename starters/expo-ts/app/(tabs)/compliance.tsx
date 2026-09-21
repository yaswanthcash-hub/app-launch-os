import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CheckCircle2, AlertCircle } from 'lucide-react-native';

const preflightRules = [
  {
    id: 'APPLE-2.1',
    title: 'Reviewer Demo Account (Zero SMS 2FA)',
    desc: 'Reviewers cannot receive SMS OTPs. Configure server-side test account in App Store Connect.',
  },
  {
    id: 'APPLE-5.1.1',
    title: 'PrivacyInfo.xcprivacy Manifest',
    desc: 'Mandatory file timestamp, system boot, and disk space declarations.',
  },
  {
    id: 'APPLE-3.1.1',
    title: 'Transparent Paywall & Restore Purchases',
    desc: 'Clear recurring pricing with working Restore Purchases trigger.',
  },
  {
    id: 'GOOGLE-20T',
    title: 'Google Play 20-Tester 14-Day Gate',
    desc: '20 testers enrolled for 14 continuous days on closed track.',
  },
  {
    id: 'GOOGLE-API36',
    title: 'Target SDK 36 (Android 16)',
    desc: 'Edge-to-edge layout & 16 KB native library memory alignment.',
  },
];

export default function ComplianceScreen() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pre-Flight Store Compliance</Text>
      <Text style={styles.subtitle}>
        2026 App Store & Google Play rejection guards built into your boilerplate.
      </Text>

      <View style={styles.list}>
        {preflightRules.map(rule => {
          const isDone = !!checkedItems[rule.id];
          return (
            <Pressable
              key={rule.id}
              style={[styles.item, isDone && styles.itemDone]}
              onPress={() => toggleCheck(rule.id)}
              accessibilityLabel={`${rule.title}, ${isDone ? 'checked' : 'not checked'}`}
              accessibilityRole="checkbox"
            >
              <View style={styles.iconCol}>
                {isDone ? (
                  <CheckCircle2 color="#10B981" size={22} />
                ) : (
                  <AlertCircle color="#F59E0B" size={22} />
                )}
              </View>
              <View style={styles.textCol}>
                <Text style={[styles.itemTitle, isDone && styles.itemTitleDone]}>
                  {rule.title}
                </Text>
                <Text style={styles.itemDesc}>{rule.desc}</Text>
              </View>
            </Pressable>
          );
        })}
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
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    lineHeight: 22,
  },
  list: {
    gap: 12,
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  itemDone: {
    borderColor: '#065F46',
    backgroundColor: '#064E3B20',
  },
  iconCol: {
    paddingTop: 2,
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  itemTitleDone: {
    color: '#A7F3D0',
  },
  itemDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
});

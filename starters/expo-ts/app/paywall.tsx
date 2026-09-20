import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Check, X, Shield, RefreshCw } from 'lucide-react-native';

export default function PaywallScreen() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'annual' | 'monthly'>('annual');
  const [restoring, setRestoring] = useState(false);

  const selectPeriod = (period: 'annual' | 'monthly') => {
    Haptics.selectionAsync().catch(() => {});
    setBillingPeriod(period);
  };

  const handleRestore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Alert.alert('Purchases Restored', 'No active subscription was found for this Apple ID sandbox account.');
    }, 1500);
  };

  const handleSubscribe = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    Alert.alert('Sandbox Purchase', `Initiating StoreKit 2 test transaction for ${billingPeriod} tier.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Close button */}
      <Pressable style={styles.closeBtn} onPress={() => router.back()}>
        <X color="#94A3B8" size={24} />
      </Pressable>

      <Text style={styles.heroTitle}>Unlock App Launch OS Pro</Text>
      <Text style={styles.heroSubtitle}>
        Ship top 1% mobile apps with zero store rejection friction.
      </Text>

      {/* Feature Value Props */}
      <View style={styles.featureList}>
        {[
          'Automated Apple & Google Play rejection guards',
          '3-layer DTCG tokens & corner concentricity kit',
          'Full StoreKit 2 & RevenueCat paywall templates',
          'Autonomous AutoResearch optimization loop',
        ].map((feat, idx) => (
          <View key={idx} style={styles.featureRow}>
            <View style={styles.checkBadge}>
              <Check color="#10B981" size={16} />
            </View>
            <Text style={styles.featureText}>{feat}</Text>
          </View>
        ))}
      </View>

      {/* Pricing Cards */}
      <View style={styles.plansContainer}>
        {/* Annual Plan */}
        <Pressable
          style={[
            styles.planCard,
            billingPeriod === 'annual' && styles.planCardActive,
          ]}
          onPress={() => selectPeriod('annual')}
        >
          <View style={styles.saveBadge}>
            <Text style={styles.saveBadgeText}>SAVE 50%</Text>
          </View>
          <Text style={styles.planName}>Annual Pro</Text>
          <Text style={styles.planPrice}>$49.99 / year</Text>
          <Text style={styles.planSub}>($4.16 / month, billed annually)</Text>
        </Pressable>

        {/* Monthly Plan */}
        <Pressable
          style={[
            styles.planCard,
            billingPeriod === 'monthly' && styles.planCardActive,
          ]}
          onPress={() => selectPeriod('monthly')}
        >
          <Text style={styles.planName}>Monthly Pro</Text>
          <Text style={styles.planPrice}>$9.99 / month</Text>
          <Text style={styles.planSub}>Billed monthly, cancel anytime</Text>
        </Pressable>
      </View>

      {/* Primary CTA */}
      <Pressable style={styles.subscribeBtn} onPress={handleSubscribe}>
        <Text style={styles.subscribeText}>
          Start 7-Day Free Trial
        </Text>
      </Pressable>

      {/* Mandated Disclosures per Apple Guideline 3.1.1 */}
      <Text style={styles.disclosure}>
        Recurring billing. Cancel anytime in Settings &gt; Apple ID &gt; Subscriptions at least 24 hours before trial ends.
      </Text>

      {/* Restore Purchases Action */}
      <Pressable
        style={styles.restoreBtn}
        onPress={handleRestore}
        disabled={restoring}
        accessibilityLabel="Restore Purchases"
      >
        <RefreshCw color="#818CF8" size={16} />
        <Text style={styles.restoreText}>
          {restoring ? 'Contacting App Store...' : 'Restore Purchases'}
        </Text>
      </Pressable>

      {/* Upfront Legal Links per Guideline 3.1.1 */}
      <View style={styles.footerRow}>
        <Text style={styles.footerLink}>Terms of Service</Text>
        <Text style={styles.footerDot}>•</Text>
        <Text style={styles.footerLink}>Privacy Policy</Text>
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
    padding: 24,
    gap: 16,
    paddingTop: 16,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
  },
  featureList: {
    gap: 12,
    marginVertical: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkBadge: {
    backgroundColor: '#064E3B',
    borderRadius: 999,
    padding: 4,
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 15,
  },
  plansContainer: {
    gap: 12,
    marginVertical: 8,
  },
  planCard: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  planCardActive: {
    borderColor: '#6366F1',
    backgroundColor: '#1E1B4B30',
  },
  saveBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  saveBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  planSub: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  subscribeBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  disclosure: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  restoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  restoreText: {
    color: '#818CF8',
    fontSize: 14,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    paddingBottom: 24,
  },
  footerLink: {
    color: '#94A3B8',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  footerDot: {
    color: '#64748B',
    fontSize: 12,
  },
});

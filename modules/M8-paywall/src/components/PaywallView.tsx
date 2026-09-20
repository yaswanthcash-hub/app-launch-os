import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { PaywallViewProps, PaywallPlan } from '../types';

export const PaywallView: React.FC<PaywallViewProps> = ({
  headline = 'Unlock Unlimited Access',
  subheadline = 'Get the complete system with lifetime updates, zero limits, and priority support.',
  features,
  plans,
  selectedPlanId,
  onSelectPlan,
  onSubscribe,
  onRestorePurchases,
  onClose,
  termsUrl = 'https://example.com/terms',
  privacyUrl = 'https://example.com/privacy',
  loading = false,
}) => {
  const [restoring, setRestoring] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const handleSelectPlan = (planId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    onSelectPlan(planId);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan || purchasing) return;
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      setPurchasing(true);
      await onSubscribe(selectedPlan);
      setPurchasing(false);
    } catch {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    if (restoring) return;
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setRestoring(true);
      const success = await onRestorePurchases();
      setRestoring(false);
      if (Platform.OS !== 'web') {
        if (success) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
      }
    } catch {
      setRestoring(false);
    }
  };

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  // Concentric Card Radii
  const containerOuterRadius = 24;
  const containerPadding = 20;
  const innerPlanRadius = 14;

  return (
    <View style={styles.container}>
      {/* Header Close button */}
      {onClose && (
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Value Pitch */}
        <View style={styles.headlineWrapper}>
          <View style={styles.proPill}>
            <Text style={styles.proPillText}>PRO MEMBERSHIP</Text>
          </View>
          <Text style={styles.headline}>{headline}</Text>
          <Text style={styles.subheadline}>{subheadline}</Text>
        </View>

        {/* Feature List */}
        <View
          style={[
            styles.featuresCard,
            { borderRadius: containerOuterRadius, padding: containerPadding },
          ]}
        >
          {features.map((feature, idx) => (
            <View key={idx} style={styles.featureRow}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkText}>✓</Text>
              </View>
              <View style={styles.featureTextWrapper}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                {feature.description && (
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Plan Selectors */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <TouchableOpacity
                key={plan.id}
                activeOpacity={0.8}
                onPress={() => handleSelectPlan(plan.id)}
                style={[
                  styles.planCard,
                  { borderRadius: innerPlanRadius },
                  isSelected ? styles.planCardSelected : styles.planCardUnselected,
                ]}
              >
                {plan.savingsBadge && (
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsBadgeText}>
                      {plan.savingsBadge}
                    </Text>
                  </View>
                )}

                <View style={styles.planHeader}>
                  <View style={styles.radioCircle}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                </View>

                <View style={styles.priceWrapper}>
                  <Text style={styles.planPrice}>{plan.priceDisplay}</Text>
                  <Text style={styles.planPricePerPeriod}>
                    {plan.pricePerPeriodDisplay}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Apple 3.1.1 Transparent Billing Disclosure */}
        <Text style={styles.disclosureText}>
          {selectedPlan?.trialPeriodDays
            ? `Includes a ${selectedPlan.trialPeriodDays}-day free trial. You will be billed ${selectedPlan.priceDisplay} thereafter. Cancel anytime in App Store settings.`
            : `Subscription automatically renews at ${selectedPlan?.priceDisplay} unless auto-renew is disabled at least 24 hours before the end of the current billing cycle.`}
        </Text>

        {/* Primary CTA Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubscribe}
          disabled={purchasing || loading}
          style={[styles.ctaButton, { borderRadius: 14 }]}
        >
          {purchasing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.ctaButtonText}>
              {selectedPlan?.trialPeriodDays
                ? `Start ${selectedPlan.trialPeriodDays}-Day Free Trial`
                : 'Subscribe Now'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Mandatory Restore Purchases (Apple Guideline 3.1.1) */}
        <TouchableOpacity
          onPress={handleRestore}
          disabled={restoring}
          style={styles.restoreButton}
        >
          {restoring ? (
            <ActivityIndicator size="small" color="#71717A" />
          ) : (
            <Text style={styles.restoreButtonText}>Restore Purchases</Text>
          )}
        </TouchableOpacity>

        {/* Legal Links */}
        <View style={styles.legalLinksRow}>
          <TouchableOpacity onPress={() => openUrl(termsUrl)}>
            <Text style={styles.legalLink}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.legalDivider}>•</Text>
          <TouchableOpacity onPress={() => openUrl(privacyUrl)}>
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 48,
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  headlineWrapper: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  proPill: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  proPillText: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subheadline: {
    fontSize: 14,
    color: '#A1A1AA',
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresCard: {
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkText: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '700',
  },
  featureTextWrapper: {
    flex: 1,
  },
  featureTitle: {
    color: '#F4F4F5',
    fontSize: 14,
    fontWeight: '600',
  },
  featureDescription: {
    color: '#71717A',
    fontSize: 12,
    marginTop: 2,
  },
  plansContainer: {
    marginBottom: 16,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 2,
    marginBottom: 12,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  planCardUnselected: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#18181B',
  },
  savingsBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  savingsBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
  planTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  priceWrapper: {
    alignItems: 'flex-end',
  },
  planPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  planPricePerPeriod: {
    color: '#71717A',
    fontSize: 11,
  },
  disclosureText: {
    fontSize: 11,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  restoreButtonText: {
    color: '#A1A1AA',
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  legalLinksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalLink: {
    color: '#71717A',
    fontSize: 11,
  },
  legalDivider: {
    color: '#52525B',
    marginHorizontal: 8,
    fontSize: 11,
  },
});

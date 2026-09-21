import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Sparkles, ArrowRight } from 'lucide-react-native';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const triggerImpact = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  // Concentric radii calculation:
  // Outer card radius: 24px, Padding: 16px -> Inner radius: 24 - 16 = 8px
  const outerRadius = 24;
  const padding = 16;
  const innerRadius = Math.max(0, outerRadius - padding);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Welcome to App Launch OS</Text>
      <Text style={styles.subtitle}>
        Expo SDK 54+ starter with 60 FPS Reanimated motion, tactile haptics, and corner concentricity.
      </Text>

      {/* Concentric Card Showcase */}
      <View style={[styles.card, { borderRadius: outerRadius, padding }]}>
        <View style={[styles.cardInner, { borderRadius: innerRadius }]}>
          <View style={styles.cardHeader}>
            <Sparkles color="#6366F1" size={20} />
            <Text style={styles.cardBadge}>Concentric Geometry</Text>
          </View>
          <Text style={styles.cardHeading}>Concentric Corner Radii</Text>
          <Text style={styles.cardBody}>
            Outer radius: {outerRadius}pt · Padding: {padding}pt · Computed inner radius: {innerRadius}pt.
            Uniform curved margins without visual corner distortion.
          </Text>
        </View>
      </View>

      {/* Paywall Modal Trigger */}
      <Link href="/paywall" asChild>
        <Pressable
          style={styles.ctaButton}
          onPress={triggerImpact}
          accessibilityLabel="View StoreKit 2 Paywall"
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>View StoreKit 2 Paywall</Text>
          <ArrowRight color="#FFFFFF" size={18} />
        </Pressable>
      </Link>
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
    fontSize: 26,
    fontWeight: '700',
    color: '#F8FAFC',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    marginTop: 12,
  },
  cardInner: {
    backgroundColor: '#1E293B',
    padding: 16,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#818CF8',
    textTransform: 'uppercase',
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  cardBody: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

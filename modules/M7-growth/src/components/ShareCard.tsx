import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';
import { ShareCardProps } from '../types';

export const ShareCard: React.FC<ShareCardProps> = ({
  title,
  description,
  referralCode,
  shareUrl,
  buttonText = 'Share with Friends',
  onShareComplete,
}) => {
  const handleShare = async () => {
    try {
      const message = referralCode
        ? `${title}\n\nUse my code ${referralCode} to get started:\n${shareUrl}`
        : `${title}\n\n${shareUrl}`;

      const result = await Share.share({
        message,
        url: Platform.OS === 'ios' ? shareUrl : undefined,
        title,
      });

      if (result.action === Share.sharedAction) {
        onShareComplete?.();
      }
    } catch {}
  };

  const outerRadius = 20;
  const padding = 20;
  const innerRadius = Math.max(0, outerRadius - padding);

  return (
    <View style={[styles.card, { borderRadius: outerRadius, padding }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {referralCode && (
        <View
          style={[
            styles.codeBox,
            { borderRadius: innerRadius > 0 ? innerRadius : 10 },
          ]}
        >
          <Text style={styles.codeLabel}>YOUR INVITE CODE</Text>
          <Text style={styles.codeText}>{referralCode}</Text>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleShare}
        style={[styles.shareButton, { borderRadius: 12 }]}
      >
        <Text style={styles.shareButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#A1A1AA',
    lineHeight: 20,
    marginBottom: 16,
  },
  codeBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  codeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#71717A',
    letterSpacing: 1,
    marginBottom: 4,
  },
  codeText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 2,
  },
  shareButton: {
    backgroundColor: '#0284C7',
    paddingVertical: 14,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

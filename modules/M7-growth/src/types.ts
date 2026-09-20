export interface ReferralCodeInfo {
  code: string;
  shareUrl: string;
  campaign?: string;
}

export interface ShareCardProps {
  title: string;
  description: string;
  referralCode?: string;
  shareUrl: string;
  buttonText?: string;
  onShareComplete?: () => void;
}

export interface SmartReviewConfig {
  minActionsRequired?: number; // default: 5
  daysBetweenPrompts?: number; // default: 60
  maxPromptsPerYear?: number;  // Apple hard limit: 3
}

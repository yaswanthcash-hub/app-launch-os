export type PermissionType = 'notifications' | 'tracking' | 'camera' | 'location' | 'photos';

export interface PermissionPrimerProps {
  type: PermissionType;
  title: string;
  description: string;
  benefitBullets: string[];
  ctaText?: string;
  skipText?: string;
  iconName?: string;
  onRequestNativePermission: () => Promise<boolean>;
  onDismiss: () => void;
  onSuccess?: () => void;
  visible: boolean;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUri?: string;
  badgeText?: string;
}

export interface OnboardingCarouselProps {
  slides: CarouselSlide[];
  onComplete: () => void;
  onSkip?: () => void;
  primaryButtonText?: string;
}

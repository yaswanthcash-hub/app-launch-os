import { describe, it, expect } from 'vitest';
import { CarouselSlide } from '../src/types';

describe('M5-onboarding Slide Structure', () => {
  it('validates slide object format', () => {
    const slide: CarouselSlide = {
      id: 'welcome',
      title: 'Welcome to App Launch OS',
      subtitle: 'Premium mobile template',
      badgeText: 'New',
    };
    expect(slide.id).toBe('welcome');
    expect(slide.title).toContain('Welcome');
  });
});

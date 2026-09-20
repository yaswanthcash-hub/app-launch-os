import { describe, it, expect } from 'vitest';
import path from 'path';
import { runAudit } from '../src/cli/auditor';

const fixturesDir = path.resolve(__dirname, 'fixtures');

describe('App Launch OS Detector Suite', () => {
  it('clean-expo-app passes all automated rules with 0 blockers', () => {
    const projectDir = path.join(fixturesDir, 'clean-expo-app');
    const { scoreData } = runAudit(projectDir, { silent: true });

    expect(scoreData.blockers).toBe(0);
    expect(scoreData.score).toBeGreaterThanOrEqual(90);

    // Verify key Apple rules
    const appleItems: any[] = scoreData.categorized.APPLE;
    expect(appleItems.find((i: any) => i.id === 'APPLE_DEMO_ACCOUNT')?.status).toBe('PASS');
    expect(appleItems.find((i: any) => i.id === 'APPLE_PRIVACY_MANIFEST')?.status).toBe('PASS');
    expect(appleItems.find((i: any) => i.id === 'APPLE_ACCOUNT_DELETION')?.status).toBe('PASS');
    expect(appleItems.find((i: any) => i.id === 'APPLE_SUBSCRIPTION_DISCLOSURE')?.status).toBe('PASS');
    expect(appleItems.find((i: any) => i.id === 'APPLE_SDK_BASELINE')?.status).toBe('PASS');

    // Verify Google rule
    const googleItems: any[] = scoreData.categorized.GOOGLE;
    expect(googleItems.find((i: any) => i.id === 'GOOGLE_TARGET_SDK')?.status).toBe('PASS');

    // Verify UX rules
    const uxItems: any[] = scoreData.categorized.UX;
    expect(uxItems.find((i: any) => i.id === 'UX_HAPTICS')?.status).toBe('PASS');
    expect(uxItems.find((i: any) => i.id === 'UX_ACCESSIBILITY_LABELS')?.status).toBe('PASS');

    // Verify Security rules
    const secItems: any[] = scoreData.categorized.SECURITY;
    expect(secItems.find((i: any) => i.id === 'SECURITY_HARDCODED_SECRETS')?.status).toBe('PASS');
    expect(secItems.find((i: any) => i.id === 'SECURITY_SECURE_STORAGE')?.status).toBe('PASS');
  });

  it('comment-only-app produces 0 false blockers despite comments mentioning SMS OTP', () => {
    const projectDir = path.join(fixturesDir, 'comment-only-app');
    const { scoreData } = runAudit(projectDir, { silent: true });

    // AST inspection must ignore comments and produce 0 blockers
    expect(scoreData.blockers).toBe(0);
    const demoRule = (scoreData.categorized.APPLE as any[]).find((i: any) => i.id === 'APPLE_DEMO_ACCOUNT');
    expect(demoRule?.status).toBe('PASS');
  });

  it('broken-expo-app catches fatal store blockers and outdated rules', () => {
    const projectDir = path.join(fixturesDir, 'broken-expo-app');
    const { scoreData } = runAudit(projectDir, { silent: true });

    expect(scoreData.blockers).toBeGreaterThanOrEqual(4);

    const apple: any[] = scoreData.categorized.APPLE;
    const google: any[] = scoreData.categorized.GOOGLE;
    const ux: any[] = scoreData.categorized.UX;

    expect(apple.find((i: any) => i.id === 'APPLE_DEMO_ACCOUNT')?.status).toBe('BLOCKER');
    expect(apple.find((i: any) => i.id === 'APPLE_SUBSCRIPTION_DISCLOSURE')?.status).toBe('BLOCKER');
    expect(google.find((i: any) => i.id === 'GOOGLE_TARGET_SDK')?.status).toBe('BLOCKER');
    expect(google.find((i: any) => i.id === 'GOOGLE_16KB_PAGE')?.status).toBe('BLOCKER');
    expect(ux.find((i: any) => i.id === 'UX_HAPTICS')?.status).toBe('WARNING');
  });

  it('official expo starter scores 0 blockers against audit suite', () => {
    const starterDir = path.resolve(__dirname, '../starters/expo-ts');
    const { scoreData } = runAudit(starterDir, { silent: true });

    expect(scoreData.blockers).toBe(0);
    expect(scoreData.score).toBeGreaterThanOrEqual(85);
  });

  it('refuses to audit non-mobile project and names --dir flag', () => {
    const projectDir = path.join(fixturesDir, 'not-a-mobile-app');
    expect(() => runAudit(projectDir, { silent: true })).toThrow(/--dir/);
  });

  it('refuses to audit empty directory and names --dir flag', () => {
    const projectDir = path.join(fixturesDir, 'empty');
    expect(() => runAudit(projectDir, { silent: true })).toThrow(/--dir/);
  });
});

import { describe, it, expect } from 'vitest';
import path from 'path';
import { runAudit } from '../src/cli/auditor';
import { computeScore } from '../src/cli/scorer';

const fixturesDir = path.resolve(__dirname, 'fixtures');

describe('App Launch OS Scorer Suite', () => {
  it('omits empty pillars and returns null when no categories exist', () => {
    const emptyScore = computeScore([]);
    expect(emptyScore.score).toBeNull();
    expect(Object.keys(emptyScore.pillars)).toHaveLength(0);
  });

  it('excludes MANUAL items from numeric score calculation', () => {
    const results = [
      { id: 'TEST_MANUAL', name: 'Manual Item', category: 'GOOGLE', status: 'MANUAL', details: 'Manual check' },
      { id: 'TEST_PASS', name: 'Pass Item', category: 'GOOGLE', status: 'PASS', details: 'Automated check' },
    ];
    const scoreData = computeScore(results);
    expect(scoreData.manualCount).toBe(1);
    expect(scoreData.score).toBe(100);
    expect(scoreData.pillars['Store Compliance']).toBe(100);
  });

  it('snapshots score object structure for clean-expo-app', () => {
    const projectDir = path.join(fixturesDir, 'clean-expo-app');
    const { scoreData } = runAudit(projectDir, { silent: true });

    expect(scoreData).toHaveProperty('score');
    expect(scoreData).toHaveProperty('progressBar');
    expect(scoreData).toHaveProperty('verdict');
    expect(scoreData).toHaveProperty('blockers', 0);
    expect(scoreData).toHaveProperty('manualItems');
    expect(scoreData.pillars).toHaveProperty('Store Compliance');
    expect(scoreData.pillars).toHaveProperty('Security');
    expect(scoreData.pillars).toHaveProperty('Performance');
    expect(scoreData.pillars).toHaveProperty('UX & Design');
  });

  it('snapshots score object structure for broken-expo-app', () => {
    const projectDir = path.join(fixturesDir, 'broken-expo-app');
    const { scoreData } = runAudit(projectDir, { silent: true });

    expect(scoreData.blockers).toBeGreaterThanOrEqual(4);
    expect(scoreData.verdict).toContain('FATAL REJECTION');
    expect(scoreData.score).toBeLessThanOrEqual(65);
  });
});

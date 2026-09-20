#!/usr/bin/env node
/**
 * App Launch OS — Policy Freshness Checker
 * Reads policies/sources.json and ensures all official policy sources have been
 * verified within the last 90 days.
 */

const fs = require('fs');
const path = require('path');

const MAX_DAYS = 90;
const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const sourcesPath = path.resolve(__dirname, '../policies/sources.json');

if (!fs.existsSync(sourcesPath)) {
  console.error(`❌ Error: ${sourcesPath} does not exist.`);
  process.exit(1);
}

const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
const staleRules = [];
const missingDates = [];

console.log(`⏱️ Auditing policy freshness from policies/sources.json (threshold: ${MAX_DAYS} days)...\n`);

for (const entry of sources) {
  if (!entry.verified) {
    missingDates.push(entry.id);
    continue;
  }

  const parsedDate = new Date(entry.verified);
  if (isNaN(parsedDate.getTime())) {
    missingDates.push(`${entry.id} (Invalid date: ${entry.verified})`);
    continue;
  }

  const diffDays = Math.floor((today - parsedDate) / (1000 * 60 * 60 * 24));
  if (diffDays > MAX_DAYS) {
    staleRules.push({
      id: entry.id,
      rule: entry.rule,
      verified: entry.verified,
      diffDays,
    });
  } else {
    console.log(`  ✓ [${entry.id}] verified ${diffDays} day(s) ago (${entry.verified})`);
  }
}

console.log(`\n📊 Results:`);
console.log(`   Audited policy rules: ${sources.length}`);
console.log(`   Stale rules (> ${MAX_DAYS} days): ${staleRules.length}`);
console.log(`   Missing/invalid dates: ${missingDates.length}`);

if (staleRules.length > 0 || missingDates.length > 0) {
  if (staleRules.length > 0) {
    console.error(`\n❌ Stale Policy Sources Detected:`);
    for (const r of staleRules) {
      console.error(`   - ${r.id}: ${r.rule} was last verified on ${r.verified} (${r.diffDays} days ago)`);
    }
  }
  if (missingDates.length > 0) {
    console.error(`\n❌ Missing or Invalid Verification Dates:`);
    for (const m of missingDates) {
      console.error(`   - ${m}`);
    }
  }
  console.error(`\nRun "node scripts/policy-verify.js" to re-verify policy hashes and update timestamps.\n`);
  process.exit(1);
}

console.log(`\n✔ All policy sources verified fresh (< ${MAX_DAYS} days).\n`);

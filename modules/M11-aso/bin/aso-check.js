#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { analyzeKeywordDensity } = require('../src/keywordDensity');

const LIMITS = {
  apple: {
    title: 30,
    subtitle: 30,
    promotionalText: 170,
    keywords: 100,
    description: 4000,
  },
  google: {
    title: 30,
    shortDescription: 80,
    fullDescription: 4000,
  },
};

function runASOCheck() {
  console.log('📊 App Launch OS — ASO Metadata Validator');
  console.log('============================================');

  const args = process.argv.slice(2);
  let metadataPath = path.join(process.cwd(), 'metadata.json');

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: aso-check [options]

Options:
  --file <path>   Path to metadata JSON file (default: ./metadata.json)
  --help, -h      Show help information

Expected JSON format:
{
  "apple": {
    "title": "AppName - Fast Planner",
    "subtitle": "Track Tasks & Focus",
    "promotionalText": "Limited time launch special...",
    "keywords": "task,planner,focus,habit,todo",
    "description": "Full marketing copy..."
  },
  "google": {
    "title": "AppName - Fast Planner",
    "shortDescription": "Track tasks, build habits, and focus daily.",
    "fullDescription": "Full marketing copy..."
  }
}
`);
    process.exit(0);
  }

  const fileIdx = args.indexOf('--file');
  if (fileIdx !== -1 && args[fileIdx + 1]) {
    metadataPath = path.resolve(process.cwd(), args[fileIdx + 1]);
  }

  let metadata = null;
  if (fs.existsSync(metadataPath)) {
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } catch (e) {
      console.error(`❌ Error parsing ${metadataPath}: ${e.message}`);
      process.exit(1);
    }
  } else {
    // Default demo payload to test
    metadata = {
      apple: {
        title: 'App Launch OS',
        subtitle: 'Mobile Release & Design System',
        promotionalText: 'Launch premium mobile apps in weeks with verified compliance and 60 FPS UX.',
        keywords: 'mobile,expo,react-native,appstore,playstore,launch,haptics,tokens',
        description: 'App Launch OS is the open-source operating system for launching premium mobile apps. Cut your time to launch from months to weeks with store compliance engines, DTCG design tokens, calibrated haptics, and rejection prevention.',
      },
      google: {
        title: 'App Launch OS',
        shortDescription: 'Open-source system for mobile apps with store compliance and 60 FPS UX.',
        fullDescription: 'App Launch OS is the open-source operating system for launching premium mobile apps on Google Play and Apple App Store. Features store compliance checks, DTCG tokens, and high-converting paywalls.',
      },
    };
    console.log('ℹ️  No local metadata.json found. Analyzing sample metadata...');
  }

  let hasErrors = false;

  // Validate Apple metadata
  if (metadata.apple) {
    console.log('\n🍏 Checking Apple App Store Constraints:');
    const { title, subtitle, promotionalText, keywords, description } = metadata.apple;

    if (title) {
      const len = title.length;
      const ok = len <= LIMITS.apple.title;
      console.log(`  Title: ${len}/${LIMITS.apple.title} chars ${ok ? '✅' : '❌ (EXCEEDED)'}`);
      if (!ok) hasErrors = true;
    }

    if (subtitle) {
      const len = subtitle.length;
      const ok = len <= LIMITS.apple.subtitle;
      console.log(`  Subtitle: ${len}/${LIMITS.apple.subtitle} chars ${ok ? '✅' : '❌ (EXCEEDED)'}`);
      if (!ok) hasErrors = true;
    }

    if (promotionalText) {
      const len = promotionalText.length;
      const ok = len <= LIMITS.apple.promotionalText;
      console.log(`  Promo Text: ${len}/${LIMITS.apple.promotionalText} chars ${ok ? '✅' : '❌ (EXCEEDED)'}`);
      if (!ok) hasErrors = true;
    }

    if (keywords) {
      const len = keywords.length;
      const ok = len <= LIMITS.apple.keywords;
      console.log(`  Keywords: ${len}/${LIMITS.apple.keywords} chars ${ok ? '✅' : '❌ (EXCEEDED)'}`);
      if (!ok) hasErrors = true;
    }
  }

  // Validate Google Play metadata
  if (metadata.google) {
    console.log('\n🤖 Checking Google Play Store Constraints:');
    const { title, shortDescription, fullDescription } = metadata.google;

    if (title) {
      const len = title.length;
      const ok = len <= LIMITS.google.title;
      console.log(`  Title: ${len}/${LIMITS.google.title} chars ${ok ? '✅' : '❌ (EXCEEDED)'}`);
      if (!ok) hasErrors = true;
    }

    if (shortDescription) {
      const len = shortDescription.length;
      const ok = len <= LIMITS.google.shortDescription;
      console.log(`  Short Description: ${len}/${LIMITS.google.shortDescription} chars ${ok ? '✅' : '❌ (EXCEEDED)'}`);
      if (!ok) hasErrors = true;
    }

    if (fullDescription) {
      const len = fullDescription.length;
      const ok = len <= LIMITS.google.fullDescription;
      console.log(`  Full Description: ${len}/${LIMITS.google.fullDescription} chars ${ok ? '✅' : '❌ (EXCEEDED)'}`);
      if (!ok) hasErrors = true;

      // Analyze keyword density
      console.log('\n  📈 Top Keyword Densities in Description:');
      const densities = analyzeKeywordDensity(fullDescription).slice(0, 5);
      densities.forEach((d) => {
        console.log(`    • "${d.word}": ${d.count}x (${d.density})`);
      });
    }
  }

  console.log('\n============================================');
  if (hasErrors) {
    console.error('❌ ASO Check FAILED: Metadata violates character boundaries.');
    process.exit(1);
  } else {
    console.log('✅ ASO Check PASSED: All metadata conforms to store character limits.');
    process.exit(0);
  }
}

if (require.main === module) {
  runASOCheck();
}

module.exports = { runASOCheck };

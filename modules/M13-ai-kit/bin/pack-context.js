#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function packContext() {
  console.log('🤖 App Launch OS — AI Context Packer');
  console.log('====================================');

  const rootDir = path.resolve(__dirname, '../../../');
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: pack-context [options]

Options:
  --output <file>    Output destination file (default: stdout)
  --include-tokens   Include design system token JSON files
  --help, -h         Show help information
`);
    process.exit(0);
  }

  const filesToPack = [
    'AGENTS.md',
    'llms.txt',
    'decisions/007-design-system.md',
    'decisions/009-premium-ux.md',
    'policies/apple-review-essentials.md',
    'policies/play-policy-essentials.md',
  ];

  const outputParts = [
    '# App Launch OS — Consolidated AI Agent Context',
    `Generated at: ${new Date().toISOString()}`,
    '',
  ];

  for (const relPath of filesToPack) {
    const fullPath = path.join(rootDir, relPath);
    if (fs.existsSync(fullPath)) {
      console.log(`  ✓ Packing: ${relPath}`);
      const content = fs.readFileSync(fullPath, 'utf8');
      outputParts.push(`\n## FILE: ${relPath}\n`);
      outputParts.push('```markdown');
      outputParts.push(content);
      outputParts.push('```\n');
    }
  }

  const packedOutput = outputParts.join('\n');

  const outIdx = args.indexOf('--output');
  if (outIdx !== -1 && args[outIdx + 1]) {
    const targetPath = path.resolve(process.cwd(), args[outIdx + 1]);
    fs.writeFileSync(targetPath, packedOutput, 'utf8');
    console.log(`\n✨ Packed context written to: ${targetPath}`);
  } else {
    console.log(`\n✨ Successfully packed ${filesToPack.length} core architecture files.`);
    console.log('💡 Tip: Use `node bin/pack-context.js --output context.md` to export to a file.');
  }

  process.exit(0);
}

if (require.main === module) {
  packContext();
}

module.exports = { packContext };

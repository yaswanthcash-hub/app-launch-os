const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
let totalFiles = 0;
let totalLinks = 0;
const brokenLinks = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        scanDir(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      totalFiles++;
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const rawTarget = match[2].trim();
    totalLinks++;

    // Skip external URLs, purely in-page anchors, and mailto
    if (
      rawTarget.startsWith('http://') ||
      rawTarget.startsWith('https://') ||
      rawTarget.startsWith('#') ||
      rawTarget.startsWith('mailto:')
    ) {
      continue;
    }

    // Strip in-file anchor if present (e.g., path/to/file.md#section)
    const targetFilePart = rawTarget.split('#')[0];
    if (!targetFilePart) {
      continue;
    }

    const resolvedPath = path.resolve(path.dirname(filePath), targetFilePart);
    if (!fs.existsSync(resolvedPath)) {
      const relSrc = path.relative(baseDir, filePath);
      brokenLinks.push({
        source: relSrc,
        target: rawTarget,
        resolved: path.relative(baseDir, resolvedPath)
      });
    }
  }
}

console.log('🔍 Auditing relative links across Markdown files...');
scanDir(baseDir);

console.log(`\n📊 Results:`);
console.log(`   Scanned files: ${totalFiles}`);
console.log(`   Total links analyzed: ${totalLinks}`);
console.log(`   Broken relative links: ${brokenLinks.length}`);

if (brokenLinks.length > 0) {
  console.error('\n❌ Found broken relative links:');
  brokenLinks.forEach((item) => {
    console.error(`   - In [${item.source}]: target "${item.target}" (resolved to "${item.resolved}") not found`);
  });
  process.exit(1);
} else {
  console.log('\n✅ Link audit PASSED: 0 broken relative links found across all files.');
  process.exit(0);
}

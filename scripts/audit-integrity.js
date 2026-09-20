const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const forbiddenPatterns = [
  { name: 'TODO stub', regex: /\bTODO\b/ },
  { name: 'TBD placeholder', regex: /\bTBD\b/ },
  { name: 'FIXME notice', regex: /\bFIXME\b/ },
  { name: 'Lorem Ipsum text', regex: /(?:dolor sit amet|consectetur adipiscing|lorem ipsum dolor)/i },
  { name: 'Coming Soon stub', regex: /\bcoming soon\b/i }
];

// Files permitted to discuss placeholders or TODOs as concept/template examples
const allowedFiles = [
  'CONTRIBUTING.md',
  'IMPLEMENTATION_PLAN.md',
  'AGENTS.md',
  path.join('checklists', 'appstore-submission.md'),
  path.join('checklists', 'playstore-submission.md'),
  path.join('checklists', 'premium-ux.md'),
  path.join('checklists', 'repo-integrity-prelaunch.md'),
  path.join('templates', 'privacy-policy.md'),
  path.join('templates', 'terms-of-service.md'),
  path.join('templates', 'data-processing-agreement.md'),
  path.join('templates', 'adr-template.md'),
  path.join('templates', 'threat-model.md'),
  path.join('templates', 'event-taxonomy.md')
];

let checkedFiles = 0;
const violations = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        scanDir(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const relPath = path.relative(baseDir, filePath);
  // Normalize Windows separators for matching
  const normalizedRel = relPath.split(path.sep).join('/');
  const isAllowed = allowedFiles.some(af => normalizedRel === af.split(path.sep).join('/'));
  
  if (isAllowed) return;

  checkedFiles++;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    forbiddenPatterns.forEach(pat => {
      if (pat.regex.test(line)) {
        violations.push({
          file: relPath,
          line: index + 1,
          type: pat.name,
          preview: line.trim().substring(0, 80)
        });
      }
    });
  });
}

console.log('🛡️ Auditing repository integrity for hollow placeholders & stubs...');
scanDir(baseDir);

console.log(`\n📊 Results:`);
console.log(`   Audited non-template files: ${checkedFiles}`);
console.log(`   Integrity violations: ${violations.length}`);

if (violations.length > 0) {
  console.error('\n❌ Unresolved placeholders detected:');
  violations.forEach(v => {
    console.error(`   - ${v.file}:${v.line} [${v.type}] -> "${v.preview}"`);
  });
  process.exit(1);
} else {
  console.log('\n✅ Integrity audit PASSED: No forbidden hollow placeholders detected in active playbooks.');
  process.exit(0);
}

const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const MAX_DAYS = 90;
const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const targetDirs = ['policies', 'checklists', 'findings'];
const staleFiles = [];
const missingDates = [];
let auditedFiles = 0;

function checkDir(dirName) {
  const dirPath = path.join(baseDir, dirName);
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue;
    auditedFiles++;
    const fullPath = path.join(dirPath, entry);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Matches:
    // - **Last verified:** 2026-09-20
    // **Verification date:** 2026-09-20
    // Last verified: 2026-09-20
    // *Last updated: 2026-09-20*
    const dateMatch = content.match(/(?:Last\s+verified|Last\s+updated|Last\s+reviewed|Verification\s+date)[\s\S]{0,20}?(\d{4}-\d{2}-\d{2})/i);
    const relPath = path.join(dirName, entry);

    if (!dateMatch) {
      missingDates.push(relPath);
    } else {
      const parsedDate = new Date(dateMatch[1]);
      if (isNaN(parsedDate.getTime())) {
        missingDates.push(`${relPath} (Invalid date: ${dateMatch[1]})`);
      } else {
        const diffDays = Math.floor((today - parsedDate) / (1000 * 60 * 60 * 24));
        if (diffDays > MAX_DAYS) {
          staleFiles.push({ file: relPath, date: dateMatch[1], diffDays });
        }
      }
    }
  }
}

console.log(`⏱️ Auditing policy and checklist freshness (threshold: ${MAX_DAYS} days)...`);
targetDirs.forEach(checkDir);

console.log(`\n📊 Results:`);
console.log(`   Audited files: ${auditedFiles}`);
console.log(`   Stale files (> ${MAX_DAYS} days): ${staleFiles.length}`);
console.log(`   Missing/invalid date stamp: ${missingDates.length}`);

let failed = false;

if (staleFiles.length > 0) {
  failed = true;
  console.error('\n⚠️ Stale files requiring review:');
  staleFiles.forEach(f => console.error(`   - ${f.file}: Last verified on ${f.date} (${f.diffDays} days ago)`));
}

if (missingDates.length > 0) {
  failed = true;
  console.error('\n❌ Files missing explicit "Last verified: YYYY-MM-DD" stamp:');
  missingDates.forEach(f => console.error(`   - ${f}`));
}

if (!failed) {
  console.log(`\n✅ Freshness audit PASSED: All ${auditedFiles} files verified within the last ${MAX_DAYS} days.`);
  process.exit(0);
} else {
  process.exit(1);
}

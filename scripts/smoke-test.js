#!/usr/bin/env node
/**
 * Smoke test â€” run before publish: node scripts/smoke-test.js [baseUrl]
 * Default: https://ruipereira1.github.io/stackbit1248/
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const baseUrl = (process.argv[2] || 'https://ruipereira1.github.io/stackbit1248/').replace(/\/?$/, '/');

const files = [
  'index.html',
  'base-path.js',
  'styles.css',
  'bip39-words.js',
  'i18n.js',
  'security.js',
  'app.js',
  'structured-data.json'
];

function sha384(buf) {
  return 'sha384-' + crypto.createHash('sha384').update(buf).digest('base64');
}

function extractIntegrity(html, file) {
  const re = new RegExp(file.replace('.', '\\.') + '[^>]*integrity="(sha384-[^"]+)"');
  const m = html.match(re);
  return m ? m[1] : null;
}

async function fetchBuf(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error('HTTP ' + res.status + ' for ' + url);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  let failed = 0;
  console.log('Smoke test â€” base URL: ' + baseUrl + '\n');

  const indexBuf = await fetchBuf(baseUrl);
  const indexHtml = indexBuf.toString('utf8');

  console.log('1) SRI integrity (live vs content)');
  for (const file of files) {
    if (file === 'index.html') continue;
    const expected = extractIntegrity(indexHtml, file);
    if (!expected) {
      console.log('  FAIL ' + file + ' â€” no integrity in index.html');
      failed += 1;
      continue;
    }
    try {
      const liveBuf = await fetchBuf(baseUrl + file);
      const actual = sha384(liveBuf);
      if (actual !== expected) {
        console.log('  FAIL ' + file);
        console.log('       index:   ' + expected);
        console.log('       content: ' + actual);
        failed += 1;
      } else {
        console.log('  OK   ' + file);
      }
    } catch (e) {
      console.log('  FAIL ' + file + ' â€” ' + e.message);
      failed += 1;
    }
  }

  console.log('\n2) Local index.html vs local files');
  const localIndex = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  ['base-path.js', 'bip39-words.js', 'i18n.js', 'security.js', 'app.js', 'styles.css', 'structured-data.json'].forEach(function (file) {
    const expected = extractIntegrity(localIndex, file);
    const actual = sha384(fs.readFileSync(path.join(root, file)));
    if (expected !== actual) {
      console.log('  FAIL ' + file + ' (run node scripts/generate-sri.js)');
      failed += 1;
    } else {
      console.log('  OK   ' + file);
    }
  });

  console.log('\n3) Service Worker hash in security.js');
  const swBuf = await fetchBuf(baseUrl + 'service-worker.js');
  const swHash = sha384(swBuf);
  const secBuf = await fetchBuf(baseUrl + 'security.js');
  const secText = secBuf.toString('utf8');
  const m = secText.match(/EXPECTED_SW_SHA384 = '(sha384-[^']+)'/);
  if (!m) {
    console.log('  FAIL â€” EXPECTED_SW_SHA384 not found');
    failed += 1;
  } else if (m[1] !== swHash) {
    console.log('  FAIL SW hash mismatch');
    console.log('       security.js: ' + m[1]);
    console.log('       service-worker.js: ' + swHash);
    failed += 1;
  } else {
    console.log('  OK   ' + swHash);
  }

  console.log('\n4) Static checks');
  if (!indexHtml.includes('nav class="tabs"') && !indexHtml.includes('nav.tabs')) {
    console.log('  FAIL â€” tabs nav missing');
    failed += 1;
  } else {
    console.log('  OK   tabs nav present');
  }
  if (!indexHtml.includes('base-path.js')) {
    console.log('  FAIL â€” base-path.js missing from index');
    failed += 1;
  } else {
    console.log('  OK   base-path.js referenced');
  }
  if (secText.indexOf('initTabNavigation') === -1) {
    console.log('  FAIL â€” tab navigation not in security.js');
    failed += 1;
  } else {
    console.log('  OK   tab navigation in security.js');
  }

  console.log('\n' + (failed === 0 ? 'ALL CHECKS PASSED' : failed + ' CHECK(S) FAILED'));
  process.exit(failed === 0 ? 0 : 1);
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});

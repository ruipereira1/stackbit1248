#!/usr/bin/env node
/**
 * Generate SRI (sha384) hashes and auto-update index.html and security.js.
 * Run after changing any file listed below.
 *
 * Usage: node scripts/generate-sri.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const securityPath = path.join(root, 'security.js');

/** Scripts with SRI in index.html */
const indexScripts = ['bip39-words.js', 'i18n.js', 'security.js', 'app.js'];

/** Loaded in head without integrity (must run before other assets) */
const headBootstrapScript = 'base-path.js';

/** External JSON-LD (CSP without inline) */
const jsonLdScript = 'structured-data.json';

/** Stylesheet with SRI */
const stylesheet = 'styles.css';

/** SW hash stored in security.js (registered via JS, no native SRI) */
const serviceWorkerFile = 'service-worker.js';

function hashFile(file) {
  const buf = fs.readFileSync(path.join(root, file));
  return 'sha384-' + crypto.createHash('sha384').update(buf).digest('base64');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function scriptIntegrityPattern(file) {
  return new RegExp(
    '(<script\\s+src="' +
      escapeRegex(file) +
      '"\\s+integrity=")sha384-[^"]+("\\s+crossorigin="anonymous"\\s*></script>)',
    'i'
  );
}

function jsonLdIntegrityPattern(file) {
  return new RegExp(
    '(<script\\s+type="application/ld\\+json"\\s+src="' +
      escapeRegex(file) +
      '"\\s+integrity=")sha384-[^"]+("\\s+crossorigin="anonymous"\\s*></script>)',
    'i'
  );
}

function stylesheetIntegrityPattern(file) {
  return new RegExp(
    '(<link\\s+rel="stylesheet"\\s+href="' +
      escapeRegex(file) +
      '"\\s+integrity=")sha384-[^"]+("\\s+crossorigin="anonymous"\\s*/?>)',
    'i'
  );
}

function bootstrapScriptPattern(file) {
  return new RegExp(
    '(<script\\s+src="' + escapeRegex(file) + '")(></script>)',
    'i'
  );
}

function replaceIntegrity(html, pattern, file, hash, label) {
  if (!pattern.test(html)) {
    console.warn('WARNING: ' + file + ' tag (' + label + ') not found in index.html');
    return { html: html, changed: 0 };
  }
  const next = html.replace(pattern, function (_match, prefix, suffix) {
    return prefix + hash + suffix;
  });
  return { html: next, changed: next !== html ? 1 : 0 };
}

function updateBootstrapScript(html, file, hash) {
  const barePattern = bootstrapScriptPattern(file);
  if (barePattern.test(html)) {
    const next = html.replace(barePattern, function (_match, prefix, suffix) {
      return prefix + ' integrity="' + hash + '" crossorigin="anonymous"' + suffix;
    });
    return { html: next, changed: next !== html ? 1 : 0 };
  }
  const sriPattern = scriptIntegrityPattern(file);
  return replaceIntegrity(html, sriPattern, file, hash, 'bootstrap');
}

function updateIndexHtml(hashes) {
  let html = fs.readFileSync(indexPath, 'utf8');
  let changed = 0;

  const bootstrapResult = updateBootstrapScript(html, headBootstrapScript, hashes[headBootstrapScript]);
  html = bootstrapResult.html;
  changed += bootstrapResult.changed;

  indexScripts.forEach(function (file) {
    const result = replaceIntegrity(html, scriptIntegrityPattern(file), file, hashes[file], 'script');
    html = result.html;
    changed += result.changed;
  });

  const jsonResult = replaceIntegrity(
    html,
    jsonLdIntegrityPattern(jsonLdScript),
    jsonLdScript,
    hashes[jsonLdScript],
    'json-ld'
  );
  html = jsonResult.html;
  changed += jsonResult.changed;

  const cssResult = replaceIntegrity(
    html,
    stylesheetIntegrityPattern(stylesheet),
    stylesheet,
    hashes[stylesheet],
    'stylesheet'
  );
  html = cssResult.html;
  changed += cssResult.changed;

  if (changed > 0) {
    fs.writeFileSync(indexPath, html, 'utf8');
  }
  return changed;
}

function updateSecurityJsSwHash(hash) {
  let src = fs.readFileSync(securityPath, 'utf8');
  const pattern = /(const EXPECTED_SW_SHA384 = ')(sha384-[^']+)(';)/;
  if (!pattern.test(src)) {
    console.warn('WARNING: EXPECTED_SW_SHA384 not found in security.js');
    return 0;
  }
  const next = src.replace(pattern, function (_match, prefix, _old, suffix) {
    return prefix + hash + suffix;
  });
  if (next === src) {
    return 0;
  }
  fs.writeFileSync(securityPath, next, 'utf8');
  return 1;
}

const allFiles = [
  headBootstrapScript,
  ...indexScripts,
  jsonLdScript,
  stylesheet,
  serviceWorkerFile
];
const hashes = {};

console.log('SRI hashes (sha384):\n');
allFiles.forEach(function (file) {
  hashes[file] = hashFile(file);
  console.log('  ' + file);
  console.log('    ' + hashes[file] + '\n');
});

const indexUpdated = updateIndexHtml(hashes);
const securityUpdated = updateSecurityJsSwHash(hashes[serviceWorkerFile]);

if (indexUpdated > 0) {
  console.log('index.html updated (' + indexUpdated + ' resource(s)).');
} else {
  console.log('index.html already in sync.');
}

if (securityUpdated > 0) {
  console.log('security.js updated (Service Worker hash).');
} else {
  console.log('security.js already in sync (Service Worker).');
}

if (indexUpdated > 0 || securityUpdated > 0) {
  console.log('\nRe-run this script if you changed security.js (its SRI hash will change).');
}

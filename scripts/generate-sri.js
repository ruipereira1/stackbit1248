#!/usr/bin/env node
/**
 * Gera hashes SRI (sha384) e atualiza index.html e security.js automaticamente.
 * Executar após alterar ficheiros listados abaixo.
 *
 * Uso: node scripts/generate-sri.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const securityPath = path.join(root, 'security.js');

/** Scripts com SRI em index.html */
const indexScripts = ['bip39-words.js', 'i18n.js', 'security.js', 'app.js'];

/** JSON-LD externo (CSP sem inline) */
const jsonLdScript = 'structured-data.json';

/** Stylesheet com SRI */
const stylesheet = 'styles.css';

/** SW: hash em security.js (registo via JS, sem SRI nativo) */
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
      '"\\s+integrity=")sha384-[^"]+("\\s+crossorigin="anonymous"\\s*/>)',
    'i'
  );
}

function replaceIntegrity(html, pattern, file, hash, label) {
  if (!pattern.test(html)) {
    console.warn('AVISO: tag de ' + file + ' (' + label + ') não encontrada em index.html');
    return { html: html, changed: 0 };
  }
  const next = html.replace(pattern, function (_match, prefix, suffix) {
    return prefix + hash + suffix;
  });
  return { html: next, changed: next !== html ? 1 : 0 };
}

function updateIndexHtml(hashes) {
  let html = fs.readFileSync(indexPath, 'utf8');
  let changed = 0;

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
    console.warn('AVISO: EXPECTED_SW_SHA384 não encontrado em security.js');
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
  ...indexScripts,
  jsonLdScript,
  stylesheet,
  serviceWorkerFile
];
const hashes = {};

console.log('Hashes SRI (sha384):\n');
allFiles.forEach(function (file) {
  hashes[file] = hashFile(file);
  console.log('  ' + file);
  console.log('    ' + hashes[file] + '\n');
});

const indexUpdated = updateIndexHtml(hashes);
const securityUpdated = updateSecurityJsSwHash(hashes[serviceWorkerFile]);

if (indexUpdated > 0) {
  console.log('index.html atualizado (' + indexUpdated + ' recurso(s)).');
} else {
  console.log('index.html já estava sincronizado.');
}

if (securityUpdated > 0) {
  console.log('security.js atualizado (hash do Service Worker).');
} else {
  console.log('security.js já estava sincronizado (Service Worker).');
}

if (indexUpdated > 0 || securityUpdated > 0) {
  console.log('\nRe-executar este script se alterou security.js (SRI de security.js muda).');
}

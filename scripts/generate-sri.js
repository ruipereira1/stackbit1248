#!/usr/bin/env node
/**
 * Gera hashes SRI (sha384) e atualiza index.html automaticamente.
 * Executar após alterar qualquer .js listado abaixo.
 *
 * Uso: node scripts/generate-sri.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');

/** Scripts com SRI em index.html */
const indexScripts = ['bip39-words.js', 'i18n.js', 'security.js', 'app.js'];

/** Outros JS do projeto (referência / verificação) */
const otherScripts = ['service-worker.js'];

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

function updateIndexHtml(hashes) {
  let html = fs.readFileSync(indexPath, 'utf8');
  let changed = 0;

  indexScripts.forEach((file) => {
    const hash = hashes[file];
    const pattern = scriptIntegrityPattern(file);
    if (!pattern.test(html)) {
      console.warn('AVISO: tag <script> de ' + file + ' não encontrada em index.html');
      return;
    }
    const next = html.replace(pattern, function (_match, prefix, suffix) {
      return prefix + hash + suffix;
    });
    if (next !== html) {
      changed += 1;
      html = next;
    }
  });

  if (changed > 0) {
    fs.writeFileSync(indexPath, html, 'utf8');
  }
  return changed;
}

const allScripts = [...indexScripts, ...otherScripts];
const hashes = {};

console.log('Hashes SRI (sha384):\n');
allScripts.forEach((file) => {
  hashes[file] = hashFile(file);
  console.log(`  ${file}`);
  console.log(`    ${hashes[file]}\n`);
});

const updated = updateIndexHtml(hashes);

if (updated > 0) {
  console.log(`index.html atualizado (${updated} script(s)).`);
} else {
  console.log('index.html já estava sincronizado.');
}

console.log('\nNota: service-worker.js não usa SRI em index.html (registo via JS).');

#!/usr/bin/env node
/**
 * Gera hashes SRI (sha384) para os scripts referenciados em index.html.
 * Executar após alterar qualquer .js listado abaixo.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const files = ['bip39-words.js', 'i18n.js', 'security.js', 'app.js', 'service-worker.js'];

console.log('# Cole estes valores em index.html (atributo integrity)\n');
files.forEach((file) => {
  const buf = fs.readFileSync(path.join(root, file));
  const hash = crypto.createHash('sha384').update(buf).digest('base64');
  console.log(`${file}`);
  console.log(`  integrity="sha384-${hash}"\n`);
});

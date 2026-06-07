# Segurança — Stackbit 1248

Documentação **alinhada com o código atual** (Junho 2026). Descreve o que está realmente implementado e os limites da ferramenta.

## Modelo de ameaça

Esta é uma aplicação **100% client-side** para converter palavras BIP39 ↔ códigos Stackbit 1248. Não gera seeds, não assina transações e **não envia dados a servidores** em runtime.

**Use offline** num dispositivo de confiança ao trabalhar com informação sensível. Extensões de browser, malware e gravação de ecrã estão **fora do alcance** desta app.

---

## Proteções implementadas

### 1. XSS (Cross-Site Scripting)

- Entrada Encode: apenas letras `[a-z]`
- Entrada Decode: dígitos validados por posição
- DOM atualizado com `textContent` / `createElement` — **sem `innerHTML` com dados do utilizador**
- Sugestões e quadros 1248 criados de forma segura (`clearElement()`)

### 2. Content Security Policy (CSP)

Meta tag em `index.html`:

```
default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self';
img-src 'self'; object-src 'none'; connect-src 'none'; base-uri 'self'; form-action 'none';
```

- Sem `unsafe-inline` nem `unsafe-eval`
- Sem ligações de rede da app (`connect-src 'none'`)
- Sem plugins/embeds (`object-src 'none'`)

**Nota:** `frame-ancestors` só funciona em headers HTTP (GitHub Pages), não em meta tags.

### 3. Subresource Integrity (SRI)

Scripts externos ao inline têm hash `sha384` em `index.html`:

- `bip39-words.js`
- `i18n.js`
- `security.js`
- `app.js`

Se um ficheiro for alterado no servidor sem atualizar o hash, o browser **recusa carregar** o script.

Regenerar hashes após alterar JS:

```bash
node scripts/generate-sri.js
```

### 4. DOM Clobbering (parcial)

`security.js` valida IDs em `document.getElementById` — apenas `[a-zA-Z0-9_-]`, máx. 100 caracteres.

### 5. Dicionário BIP39

- `Object.freeze(bip39Words)` após carregamento (proteção superficial contra reassignment)
- Validação de integridade: array com **exactamente 2048** entradas
- Amostragem de palavras no arranque

**Não implementado** (removido por quebrar a app): freeze de protótipos nativos, Proxy no array.

### 6. Logging

- `secureConsole` sanitiza logs (`sanitizeForLog`)
- Sem stack traces expostos ao utilizador

### 7. Headers / meta de segurança

| Meta | Função |
|------|--------|
| `X-Content-Type-Options: nosniff` | Anti MIME-sniffing |
| `Referrer-Policy: no-referrer` | Não envia referrer |
| `Permissions-Policy` | Desativa câmara, microfone, geolocalização, etc. |
| `robots: noindex, nofollow` | Discourage indexação (ferramenta de backup) |

### 8. Inputs

| Campo | Proteção |
|-------|----------|
| Encode | `autocomplete="off"`, `spellcheck="false"`, regex `[a-z]` |
| Decode | `autocomplete="off"`, `inputmode="numeric"`, `spellcheck="false"` |

### 9. Armazenamento

- **Não** persiste palavras BIP39, códigos nem seeds
- `localStorage` apenas para idioma (`pt-BR` ou `en`) — whitelist estrita

### 10. Service Worker (PWA)

- Cache versionado (`stackbit-1248-v3`)
- Apenas ficheiros same-origin
- Atualização automática de caches antigos no `activate`

### 11. Ligações externas

Links no tutorial/recovery usam `rel="noopener noreferrer"`. Só abrem se o utilizador clicar.

---

## Limitações conhecidas

| Risco | Mitigação recomendada |
|-------|------------------------|
| Dispositivo comprometido | Usar offline, air-gapped se possível |
| Extensões maliciosas | Browser limpo, sem extensões |
| Supply chain (GitHub) | SRI + rever commits; clonar e usar localmente |
| Shoulder surfing / screen capture | Ambiente privado |
| Cache SW na 1.ª visita online | Instalar PWA offline; verificar origem GitHub |
| `Object.freeze` superficial | Não substitui ambiente de execução confiável |

---

## Checklist

- [x] CSP restritiva
- [x] SRI nos scripts
- [x] Anti-XSS nos inputs e DOM
- [x] Sem `connect-src` (zero rede em runtime)
- [x] Sem persistência de seed
- [x] Autocomplete desativado
- [x] `noindex` para motores de busca
- [x] Documentação alinhada com o código

---

## Testes manuais sugeridos

1. Input Encode: `<script>alert(1)</script>` → rejeitado / sanitizado
2. DevTools → alterar `bip39-words.js` no servidor → SRI bloqueia carregamento
3. Offline: desligar rede → app continua após cache PWA
4. Colar `1059` no Decode → preenche 4 campos sem erro

---

**Última atualização:** Junho 2026

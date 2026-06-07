# Security — Stackbit 1248

Documentation **aligned with the current codebase** (June 2026). Describes what is actually implemented and the limits of this tool.

## Threat model

This is a **100% client-side** app for converting BIP39 words ↔ Stackbit 1248 codes. It does not generate seeds, sign transactions, or **send data to servers** at runtime.

**Use offline** on a trusted device when handling sensitive information. Browser extensions, malware, and screen recording are **out of scope** for this app.

---

## Implemented protections

### 1. XSS (Cross-Site Scripting)

- Encode input: letters only `[a-z]`
- Decode input: digits validated per position
- DOM updated with `textContent` / `createElement` — **no `innerHTML` with user data**
- Suggestions and 1248 frames built safely (`clearElement()`)

### 2. Content Security Policy (CSP)

Meta tag in `index.html`:

```
default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self';
img-src 'self'; object-src 'none'; connect-src 'self'; worker-src 'self';
manifest-src 'self'; frame-src 'none'; media-src 'none'; base-uri 'self'; form-action 'none';
```

- No `unsafe-inline` or `unsafe-eval`
- `connect-src 'self'` — same-origin requests only (Service Worker verification); **no** external domains
- No plugins/embeds (`object-src 'none'`)
- No iframes (`frame-src 'none'`)
- Service Workers restricted to `'self'` (`worker-src 'self'`)

**Note:** `frame-ancestors` only works in HTTP headers (GitHub Pages), not in meta tags.

### 3. Subresource Integrity (SRI)

Resources with `sha384` hashes in `index.html`:

- `styles.css`
- `structured-data.json` (external JSON-LD — CSP without inline)
- `bip39-words.js`
- `i18n.js`
- `security.js`
- `app.js`

If a file is changed on the server without updating the hash, the browser **refuses to load** it.

Regenerate and **auto-update index.html + security.js** after changing JS/CSS/JSON:

```bash
node scripts/generate-sri.js
```

(If `security.js` changes, run the script **twice** — the 2nd run fixes the SRI hash for `security.js`.)

### 4. Service Worker — integrity verification

Before registering the Service Worker, `security.js`:

1. `fetch`es `service-worker.js` with `cache: 'no-store'`
2. Computes SHA-384 and compares with `EXPECTED_SW_SHA384` (from `generate-sri.js`)
3. **Cancels registration** if the hash does not match

Also purges legacy PWA caches (e.g. `stackbit-1248-v3`) and calls `registration.update()`.

### 5. DOM Clobbering (partial)

`security.js` validates IDs in `document.getElementById` — `[a-zA-Z0-9_-]` only, max 100 characters.

### 6. BIP39 dictionary

- `Object.freeze(bip39Words)` after load (shallow protection against reassignment)
- Integrity check: array with **exactly 2048** entries
- Word sampling on startup

**Not implemented** (removed because it broke the app): native prototype freeze, Proxy on the array.

### 7. Logging

- `secureConsole` sanitizes logs (`sanitizeForLog`)
- No stack traces exposed to the user

### 8. Security headers / meta

| Meta | Purpose |
|------|---------|
| `X-Content-Type-Options: nosniff` | Anti MIME-sniffing |
| `Referrer-Policy: no-referrer` | No referrer sent |
| `Permissions-Policy` | Disables camera, microphone, geolocation, etc. |
| `robots: noindex, nofollow` | Discourage indexing (backup tool) |

### 9. Inputs

| Field | Protection |
|-------|------------|
| Encode | `autocomplete="off"`, `maxlength="8"`, `spellcheck="false"`, regex `[a-z]` |
| Decode | `autocomplete="off"`, `inputmode="numeric"`, `spellcheck="false"` |

### 10. Sensitive data cleanup

- Leaving **Encode/Decode** tabs clears inputs and results
- When the page is **hidden** (switch app/tab), Encode and Decode are cleared

### 11. Storage

- Does **not** persist BIP39 words, codes, or seeds
- `localStorage` only for language (`pt-BR` or `en`) — strict whitelist

### 12. Service Worker (PWA)

- Versioned cache (`stackbit-1248-v4`)
- Same-origin files only
- Old caches removed on `activate`

### 13. External links

Tutorial/recovery links use `rel="noopener noreferrer"`. They only open when the user clicks.

---

## Known limitations

| Risk | Recommended mitigation |
|------|------------------------|
| Compromised device | Use offline; air-gapped if possible |
| Malicious extensions | Clean browser, no extensions |
| Supply chain (GitHub) | SRI + review commits; clone and use locally |
| Shoulder surfing / screen capture | Private environment |
| SW cache on first online visit | Install PWA offline; verify GitHub origin |
| Shallow `Object.freeze` | Does not replace a trusted execution environment |

---

## Checklist

- [x] Strict CSP (incl. `worker-src`, `frame-src 'none'`)
- [x] SRI on scripts, CSS, and JSON-LD
- [x] Service Worker integrity verification
- [x] Anti-XSS on inputs and DOM
- [x] `connect-src 'self'` (no external domains)
- [x] Auto-clear sensitive inputs
- [x] No seed persistence
- [x] Autocomplete disabled
- [x] `noindex` for search engines
- [x] Documentation aligned with code

---

## Suggested manual tests

1. Encode input: `<script>alert(1)</script>` → rejected / sanitized
2. DevTools → tamper with `bip39-words.js` on server → SRI blocks load
3. Offline: disable network → app works after PWA cache
4. Paste `1059` in Decode → fills 4 fields without error

---

**Last updated:** June 2026

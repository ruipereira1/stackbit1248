# Stackbit 1248 - BIP39 Tool

Open-source web app for encoding and decoding BIP39 words using the Stackbit 1248 system.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-green.svg)](https://opensource.org/)

**Live demo:** [ruipereira1.github.io/stackbit1248](https://ruipereira1.github.io/stackbit1248/)

## Quick start

1. Open `index.html` in your browser
2. Works 100% offline
3. Can be installed as a PWA

## Files

- `index.html` — Main page
- `app.js` — Application logic
- `styles.css` — Styles
- `bip39-words.js` — BIP39 dictionary (2048 words)
- `manifest.json` — PWA manifest
- `service-worker.js` — Offline service worker
- `scripts/generate-sri.js` — Regenerate SRI hashes after JS/CSS changes

## Deploy

**Quick options:**

- **GitHub Pages** (free) — Enable in Settings → Pages
- **Netlify** (free) — Connect the GitHub repo
- **Vercel** (free) — Import the GitHub repo

## Security

Implemented measures (details in [SECURITY.md](SECURITY.md)):

- ✅ Strict CSP (no inline scripts, `frame-src 'none'`, `worker-src 'self'`)
- ✅ SRI on scripts, CSS, and JSON-LD
- ✅ SHA-384 Service Worker verification before registration
- ✅ XSS protection — input validation and safe DOM updates
- ✅ Auto-clear on tab switch or when the page is hidden
- ✅ No seed storage (language preference only)
- ✅ 100% offline after PWA cache
- ✅ `autocomplete="off"` and `maxlength="8"` on Encode

### Verify before using with real data

1. Clone the repo: `git clone https://github.com/ruipereira1/stackbit1248.git`
2. Compare commits with GitHub (or use a trusted release/tag)
3. Open `index.html` **offline** or install the PWA **without network** after a verified first visit
4. After editing `.js`/`.css` files, run `node scripts/generate-sri.js` (twice if you changed `security.js`)

## Important notice

- **Use offline** on a trusted device
- **Never share** your seed phrase
- **Avoid entering a full seed (12/24 words) online** — use 1248 codes or single words for verification only
- Browser extensions and malware can read the screen — this risk cannot be eliminated by web code alone

## License

This project is licensed under the [MIT License](LICENSE).

The BIP39 word list used is public domain and not subject to copyright.

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before opening pull requests.

## Documentation

- [Credits & Acknowledgments](CREDITS.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Security](SECURITY.md)

## Credits & inspiration

This app was **inspired by the Stackbit 1248 system** developed by [Stackbit Metalwallet](https://stackbit.me/).

- **Original site:** [https://stackbit.me/](https://stackbit.me/)
- **1248 system:** All information about the 1248 encoding system is based on content available on the Stackbit website
- **Thanks:** Special thanks to the Stackbit Metalwallet team for creating and documenting the Stackbit 1248 system

This project is an open-source web implementation of Stackbit 1248 for BIP39 encode/decode.

See [CREDITS.md](CREDITS.md) for more details.

## Resources

- [Stackbit Metalwallet](https://stackbit.me/) — Original site and inspiration
- [BIP39 Specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [Bitcoin BIPs Repository](https://github.com/bitcoin/bips)

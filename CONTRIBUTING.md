# Contributing Guide

Thank you for considering a contribution to Stackbit 1248! This document provides guidelines for contributing to the project.

## How to contribute

### 1. Report bugs

If you find a bug:

1. Check whether it was already reported in [Issues](https://github.com/ruipereira1/stackbit1248/issues)
2. Open a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser and version

### 2. Suggest improvements

Suggestions are welcome:

1. Check whether the suggestion already exists in [Issues](https://github.com/ruipereira1/stackbit1248/issues)
2. Open an issue with:
   - Clear description of the feature
   - Motivation / rationale
   - Usage examples (if applicable)

### 3. Contribute code

#### Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/ruipereira1/stackbit1248.git
   cd stackbit1248
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments when needed
   - Test your changes

4. **Commit**
   ```bash
   git add .
   git commit -m "Clear description of what changed"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Describe what you changed
   - Reference related issues (if any)
   - Wait for review

## Code standards

### JavaScript

- Use `'use strict';`
- Use `const` and `let`; avoid `var`
- Use descriptive names for variables and functions
- Comment complex logic
- Keep functions small and focused

### HTML / CSS

- Use consistent indentation (2 or 4 spaces)
- Use semantic class names
- Keep HTML accessible

### Security

- **Never** compromise security
- Validate all inputs
- Prefer `textContent` over `innerHTML`
- Follow existing security practices
- After changing `.js` / `.css` files, run `node scripts/generate-sri.js` (twice if you changed `security.js`)

## PR checklist

- [ ] Code works as intended
- [ ] No new security vulnerabilities
- [ ] Matches project code style
- [ ] Comments added where needed
- [ ] README updated (if needed)
- [ ] SRI hashes updated via `generate-sri.js` (if JS/CSS changed)
- [ ] Tested in multiple browsers (if applicable)

## Please do not

- ❌ Add external dependencies without prior discussion
- ❌ Modify the BIP39 dictionary (must stay 100% aligned with the official standard)
- ❌ Remove security features
- ❌ Add tracking or analytics
- ❌ Add code that requires a server (must work 100% offline)

## Resources

- [BIP39 Specification](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [MDN Web Docs](https://developer.mozilla.org/)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

## Questions?

Open an issue or contact the maintainers.

---

**Thank you for contributing!**

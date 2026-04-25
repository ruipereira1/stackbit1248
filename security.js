/**
 * Stackbit 1248 — Proteções de segurança e inicialização
 * Separado do HTML para permitir CSP sem 'unsafe-inline'
 */

(function () {
    'use strict';

    // ── 1. DOM Clobbering protection ────────────────────────────────────────
    // Sobrescrever getElementById para rejeitar IDs com caracteres perigosos
    const _getElementById = document.getElementById.bind(document);
    document.getElementById = function (id) {
        if (typeof id !== 'string' || id.length === 0 || id.length > 100) return null;
        if (!/^[a-zA-Z0-9_-]+$/.test(id)) return null;
        return _getElementById(id);
    };

    // ── 2. Congelar bip39Words após carregamento ─────────────────────────────
    // O array já está carregado (bip39-words.js vem antes deste script)
    if (typeof bip39Words !== 'undefined' && Array.isArray(bip39Words)) {
        try { Object.freeze(bip39Words); } catch (e) { /* freeze não suportado */ }
    }

    // ── 3. Carregar manifest apenas em HTTPS/localhost (não em file://) ──────
    if (location.protocol !== 'file:') {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = 'manifest.json';
        document.head.appendChild(link);
    }

    // ── 4. Inicializar seletor de idioma ─────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        const langButtons = document.querySelectorAll('.lang-btn');
        const currentLang = getCurrentLanguage();

        langButtons.forEach(function (btn) {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', function () {
                const lang = btn.getAttribute('data-lang');
                setLanguage(lang);
                langButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
            });
        });
    });

})();

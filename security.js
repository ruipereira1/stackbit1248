/**
 * Stackbit 1248 — Proteções de segurança e inicialização
 * Separado do HTML para permitir CSP sem 'unsafe-inline'
 */

(function () {
    'use strict';

    // Hash esperado de service-worker.js (gerado por scripts/generate-sri.js)
    const EXPECTED_SW_SHA384 = 'sha384-IK/r97BJdlh/Ux9tln38HZTbYtA2/GcY5wfguxNJLNbO3pVkpegLfANhEy2+2ryc';

    // ── 1. DOM Clobbering protection ────────────────────────────────────────
    const _getElementById = document.getElementById.bind(document);
    document.getElementById = function (id) {
        if (typeof id !== 'string' || id.length === 0 || id.length > 100) return null;
        if (!/^[a-zA-Z0-9_-]+$/.test(id)) return null;
        return _getElementById(id);
    };

    // ── 2. Congelar bip39Words após carregamento ─────────────────────────────
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

    // ── 4. Verificar integridade do Service Worker antes de registar ─────────
    function bufferToSha384Base64(buffer) {
        return crypto.subtle.digest('SHA-384', buffer).then(function (hashBuffer) {
            const bytes = new Uint8Array(hashBuffer);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return 'sha384-' + btoa(binary);
        });
    }

    function verifyServiceWorkerScript() {
        if (!window.crypto || !window.crypto.subtle) {
            return Promise.resolve(false);
        }
        return fetch('./service-worker.js', { cache: 'no-store', credentials: 'same-origin' })
            .then(function (res) {
                if (!res.ok) return null;
                return res.arrayBuffer();
            })
            .then(function (buf) {
                if (!buf) return false;
                return bufferToSha384Base64(buf).then(function (hash) {
                    return hash === EXPECTED_SW_SHA384;
                });
            })
            .catch(function () { return false; });
    }

    function registerServiceWorkerIfValid() {
        if (!('serviceWorker' in navigator)) return;
        if (location.protocol !== 'https:' &&
            location.hostname !== 'localhost' &&
            location.hostname !== '127.0.0.1') {
            return;
        }

        purgeLegacyCaches();

        window.addEventListener('load', function () {
            verifyServiceWorkerScript().then(function (valid) {
                if (!valid) {
                    if (typeof console !== 'undefined' && console.error) {
                        console.error('Service Worker: integridade não verificada — registo cancelado');
                    }
                    return;
                }
                navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
                    if (registration && typeof registration.update === 'function') {
                        registration.update();
                    }
                }).catch(function () {
                    /* normal em alguns ambientes restritos */
                });
            });
        });
    }

    function purgeLegacyCaches() {
        if (!('caches' in window)) return;
        caches.keys().then(function (names) {
            names.forEach(function (name) {
                if (name.indexOf('stackbit-1248-') === 0 && name !== 'stackbit-1248-v6') {
                    caches.delete(name);
                }
            });
        }).catch(function () { /* ignorar */ });
    }

    registerServiceWorkerIfValid();

    // ── 5. Navegação por separadores (independente de app.js) ───────────────
    var VALID_TABS = ['encode', 'decode', 'recovery', 'tutorial', 'about'];

    function switchTab(targetId, previousId) {
        if (VALID_TABS.indexOf(targetId) === -1) {
            return false;
        }

        document.querySelectorAll('.tab').forEach(function (tab) {
            tab.classList.toggle('active', tab.getAttribute('data-tab') === targetId);
        });

        document.querySelectorAll('.section').forEach(function (section) {
            if (!section || !section.id) {
                return;
            }
            section.classList.toggle('active', section.id === targetId);
        });

        document.dispatchEvent(new CustomEvent('stackbit:tabchange', {
            detail: { previousId: previousId || null, targetId: targetId }
        }));

        return true;
    }

    function initTabNavigation() {
        var nav = document.querySelector('nav.tabs');
        if (!nav) {
            return;
        }

        nav.addEventListener('click', function (event) {
            var tab = event.target.closest('.tab');
            if (!tab || !nav.contains(tab)) {
                return;
            }

            var targetId = tab.getAttribute('data-tab');
            var previousTab = document.querySelector('.tab.active');
            var previousId = previousTab ? previousTab.getAttribute('data-tab') : null;

            if (targetId === previousId) {
                return;
            }

            switchTab(targetId, previousId);
        });
    }

    // ── 6. Inicializar seletor de idioma ─────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        initTabNavigation();

        const langButtons = document.querySelectorAll('.lang-btn');
        const currentLang = getCurrentLanguage();

        langButtons.forEach(function (btn) {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', function () {
                const lang = btn.getAttribute('data-lang');
                if (typeof setLanguage === 'function') {
                    setLanguage(lang);
                }
                langButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
            });
        });
    });

})();

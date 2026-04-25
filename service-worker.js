/**
 * Service Worker para Stackbit 1248
 * Permite funcionamento offline completo (PWA)
 */

const CACHE_NAME = 'stackbit-1248-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './i18n.js',
  './security.js',
  './styles.css',
  './bip39-words.js',
  './manifest.json',
  './SEED-RECOVERY.pdf'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE).catch((err) => {
        // Log seguro - não expor detalhes do erro
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('Alguns arquivos não foram cacheados');
        }
      });
    })
  );
  self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  // Apenas requisições GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retornar do cache se disponível
      if (response) {
        return response;
      }

      // Buscar da rede
      return fetch(event.request).then((response) => {
        // Não cachear recursos externos (Google Fonts, etc)
        const url = new URL(event.request.url);
        if (url.origin !== location.origin) {
          return response;
        }

        // Não cachear se não for sucesso
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clonar resposta para cache
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Se falhar, retornar página offline se for navegação
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        // Para outros recursos, retornar null (não quebrar o site)
        return null;
      });
    })
  );
});

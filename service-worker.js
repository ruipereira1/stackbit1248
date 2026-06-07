/**
 * Service Worker para Stackbit 1248
 * Permite funcionamento offline completo (PWA)
 */

const CACHE_NAME = 'stackbit-1248-v2';
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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE).catch(() => {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('Alguns arquivos não foram cacheados');
        }
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return undefined;
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((networkResponse) => {
        const url = new URL(event.request.url);
        if (url.origin !== self.location.origin) {
          return networkResponse;
        }

        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return Response.error();
      });
    })
  );
});

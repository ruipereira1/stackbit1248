/**
 * Service Worker para Stackbit 1248
 * Permite funcionamento offline completo (PWA)
 */

const CACHE_NAME = 'stackbit-1248-v6';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './base-path.js',
  './app.js',
  './i18n.js',
  './security.js',
  './styles.css',
  './bip39-words.js',
  './structured-data.json',
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

function isCriticalRequest(request) {
  if (request.mode === 'navigate') {
    return true;
  }
  const path = new URL(request.url).pathname;
  return /\.(js|html|json)$/i.test(path);
}

function cacheNetworkResponse(request, networkResponse) {
  if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
    return;
  }
  const responseToCache = networkResponse.clone();
  caches.open(CACHE_NAME).then((cache) => {
    cache.put(request, responseToCache);
  });
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (isCriticalRequest(event.request)) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        cacheNetworkResponse(event.request, networkResponse);
        return networkResponse;
      }).catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) {
            return cached;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return Response.error();
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((networkResponse) => {
        cacheNetworkResponse(event.request, networkResponse);
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

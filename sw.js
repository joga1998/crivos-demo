/* ==========================================================================
   CRIVOS // SERVICE WORKER (AUTO-EXPURGO E INVALIDAÇÃO DE CACHE)
   ========================================================================== */

self.addEventListener('install', event => {
  // Pula a fila e assume o controle imediatamente
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Limpa todos os caches antigos do navegador imediatamente
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

// Always bypass cache and fetch fresh from network
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});

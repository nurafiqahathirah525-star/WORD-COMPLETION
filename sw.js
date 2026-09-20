const CACHE_NAME = 'english-champion-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Sila tambah fail CSS, JS, audio, atau ikon luaran anda di bawah jika ada:
  // './css/styles.css',
  // './js/app.js',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// Fasa Pemasangan (Install) - Simpan semua aset ke dalam cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Fasa Pengaktifan (Activate) - Padam cache lama jika ada kemas kini
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fasa Ambilan (Fetch) - Gunakan cache jika tiada internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Pilihan: Boleh letak halaman offline fallback di sini jika perlu
      });
    })
  );
});

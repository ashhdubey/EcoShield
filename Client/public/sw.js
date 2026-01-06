// A basic service worker for PWA functionality

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  self.skipWaiting(); // Force the waiting service worker to become the active service worker.
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('fetch', (event) => {
  // For now, we will just fetch from the network.
  // In a more advanced setup, you would handle offline caching here.
  event.respondWith(fetch(event.request));
});


// --- THIS IS THE FIX ---
// Listen for push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'EcoShield', body: 'You have a new notification.' };
  
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/icon-192x192.svg'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
// --- END OF FIX ---
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open('mfiscal-v1')
    await cache.addAll(['/','/offline'])
  })())
})
self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      return await fetch(event.request)
    } catch (e) {
      const cache = await caches.open('mfiscal-v1')
      const cached = await cache.match(new URL(event.request.url).pathname)
      return cached || new Response('Offline', { status: 200, headers: {'Content-Type':'text/plain'} })
    }
  })())
})

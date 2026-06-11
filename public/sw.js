/* IOM Calculators — wiki-icon cache worker.
   Scope: ONLY caches shminer.miraheze.org Special:Redirect/file/* image
   requests (cache-first). App shell is intentionally NOT cached so Pages
   deploys are never stale. Bump CACHE name to invalidate icons. */
const CACHE = 'iom-wiki-icons-v1'
const WIKI_PREFIX = 'https://shminer.miraheze.org/wiki/Special:Redirect/file/'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  if (!e.request.url.startsWith(WIKI_PREFIX)) return
  e.respondWith((async () => {
    const cache = await caches.open(CACHE)
    const hit = await cache.match(e.request)
    if (hit) return hit
    const res = await fetch(e.request)
    // img tags fetch cross-origin no-cors → opaque responses are cacheable
    if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone())
    return res
  })())
})

/* Offline support. HTML/JS/CSS: network first (always fresh when online, cached copy when offline).
   Images are content-hashed, so they are cached forever once seen. Bump VERSION to force-clear old caches. */
const VERSION = "cce-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin || /cce-data\.json|\/save|\/load/.test(u.pathname)) return;
  const isImg = /\/assets\/img\//.test(u.pathname);
  if (isImg) {
    e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(VERSION).then(ch => ch.put(r, c)); } return res; })));
    return;
  }
  e.respondWith(fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(VERSION).then(ch => ch.put(r, c)); } return res; })
    .catch(() => caches.match(r).then(hit => hit || caches.match("index.html"))));
});

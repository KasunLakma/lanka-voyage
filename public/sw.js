// Lanka Voyage service worker.
// It only keeps the offline page, icons and built static files.
// Pages, login data, Supabase, maps and videos are NEVER cached here.
const VERSION = "lv-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE = [OFFLINE_URL, "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(PRECACHE)));
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))),
            )
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (event) => {
    const req = event.request;
    if (req.method !== "GET") return;

    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return; // leave other websites alone

    // Opening a page: use the network; if there is no internet show the offline page
    if (req.mode === "navigate") {
        event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
        return;
    }

    // Icons and built static files (they never change once published)
    if (
        url.pathname.startsWith("/icons/") ||
        url.pathname.startsWith("/_next/static/")
    ) {
        event.respondWith(
            caches.open(VERSION).then(async (cache) => {
                const hit = await cache.match(req);
                if (hit) return hit;
                const res = await fetch(req);
                if (res.ok) cache.put(req, res.clone());
                return res;
            }),
        );
    }
});
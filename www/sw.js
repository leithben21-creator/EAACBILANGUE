const CACHE='eaac-v4';
const CORE=['/','/index.html','/manifest.webmanifest','/lib/leaflet.js','/lib/geotiff.js','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Réseau d'abord (mises à jour immédiates), cache en secours hors ligne
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();if(r.ok)caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(h=>h||caches.match('/index.html'))))});

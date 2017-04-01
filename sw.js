importScripts('resources/cache-polyfill/cache-polyfill.js');
self.addEventListener('install', function (e) {
    e.waitUntil(caches.open('iplocator').then(function (cache) {
        return cache.addAll([
            '/ip-locator/', 
            '/ip-locator/index.html', 
            '/ip-locator/resources/css/style.css', 
            '/ip-locator/resources/images/icon.svg', 
            '/ip-locator/resources/jquery/jquery.min.js', 
            '/ip-locator/resources/dialog-polyfill/dialog-polyfill.css', 
            '/ip-locator/resources/dialog-polyfill/dialog-polyfill.js', 
            '/ip-locator/resources/js/app.js', 
            '/ip-locator/resources/mdl/material.deep_orange-orange.min.css', 
            '/ip-locator/resources/mdl/material.min.js'
        ]);
    }));
});
self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
    }));
});

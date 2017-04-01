importScripts('resources/cache-polyfill/cache-polyfill.js');
self.addEventListener('install', function (e) {
    e.waitUntil(caches.open('iplocator').then(function (cache) {
        return cache.addAll([
            '/', 
            '/index.html', 
            '/resources/css/style.css', 
            '/resources/images/icon.svg', 
            '/resources/jquery/jquery.min.js', 
            '/resources/dialog-polyfill/dialog-polyfill.css', 
            '/resources/dialog-polyfill/dialog-polyfill.js', 
            '/resources/jquery/jquery.min.js', 
            '/resources/js/app.js', 
            '/resources/mdl/material.deep_orange-orange.min.css', 
            '/resources/mdl/material.min.js'
        ]);
    }));
});
self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
    }));
});

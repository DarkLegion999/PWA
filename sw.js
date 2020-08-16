const staticCache = 'cache-v2';
const dynamicCache = 'dinamic_cache-v2';

const assets = [
    '/',
    '/index.html',
    '/assets/css/font-awesome.min.css',
    '/assets/css/main.css',
    '/assets/fonts/FontAwesome.otf',
    '/assets/fonts/fontawesome-webfont.eot',
    '/assets/fonts/fontawesome-webfont.svg',
    '/assets/fonts/fontawesome-webfont.ttf',
    '/assets/fonts/fontawesome-webfont.woff',
    '/assets/fonts/fontawesome-webfont.woff2',
    '/assets/js/breakpoints.min.js',
    '/assets/js/browser.min.js',
    '/assets/js/jquery.min.js',
    '/assets/js/main.js',
    '/assets/js/util.js',
    '/assets/js/app.js',
    '/images/banner.jpg',
    '/images/banner.mp4',
    '/images/bg.jpg',
    '/images/cta01.jpg',
    '/images/icons/pic-72x72.png',
    '/images/icons/pic-96x96.png',
    '/images/icons/pic-128x128.png',
    '/images/icons/pic-144x144.png',
    '/images/icons/pic-152x152.png',
    '/images/icons/pic-192x192.png',
    '/images/icons/pic-384x384.png',
    '/images/icons/pic-512x512.png',
];

//install service worker
self.addEventListener('install', evt => {
    console.log('service worker je instaliran');
    evt.waitUntil(
        caches.open(staticCache).then(cache => {
            console.log('kesiranje');
            cache.addAll(assets);
        })
        .catch( console.log('greska', evt))
    );

});

//activate service worker
self.addEventListener('active', evt => {
    console.log('service worker je aktivan');

    evt.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys
                .filter(key => key !== staticCache && key !== dynamicCache)
                .map(key => caches.delete(key))
            )

        })
    );

});

//fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request)
        .then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache)
                .then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })

            }   
            );
        })
    )
});





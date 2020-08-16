if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('service worker je registrovan', reg))
    .catch((err) => console.log('service worker mije registrovan', err));

}


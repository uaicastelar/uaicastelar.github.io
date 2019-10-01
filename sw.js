
const cacheActual = 'UAIMobileCastelar-v1';

const recursosEstaticos = [
  'css/materialize.min.css',  
  'js/materialize.min.js' , 
  'icons/512.png',
  'icons/192.png'
];

self.addEventListener('install', function(event) 
{
  event.waitUntil
  (
    caches.open(cacheActual).then(function(cache) 
       {
        return cache.addAll(recursosEstaticos);
       })
  );
});	 
	  

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(e) {    
    e.waitUntil(
        caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if (key !== cacheActual) {              
              return caches.delete(key);
            }
          }));
        })
    );
    return self.clients.claim();
});




 cacheName = 'cache-v1';

 //Files to save in cache
 let files = [
     './',
     './index.html', //SW treats query string as new request
     'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800',
     'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
     './assets/css/bootstrap.min.css',
     './assets/css/styles.css',
     './assets/images/devc.png',
     './assets/images/favicon.png',
     './assets/images/vendy-img.png',
     './assets/images/google-award.jpg',
     './assets/images/leader-google-indonesia.jpg',
     './assets/images/the-best-gdk-2018.jpg',
     './assets/images/sc-cv.png',
     './assets/images/sc-calculator.png',
     './assets/images/sc-table-swapi.png',
     './assets/images/sc-final-project.png',
     './assets/images/hamburger-icon.svg',
     './assets/images/map.png',
     './assets/images/map.svg',
     './assets/images/figure-1.png',
     './assets/images/figure-2.png',
     './assets/images/figure-3.png',
     './assets/js/jquery-3.3.1.min.js',
     './assets/js/bootstrap.min.js',
     './assets/js/jquery.scrollTo.min.js',
     './assets/js/scroll.js',
     './assets/js/modal.js'
 ];

 //Adding `install` event listener
 self.addEventListener('install', event => {
     console.info('Event: Install');
     event.waitUntil(
         caches.open(cacheName)
         .then(cache => cache.addAll(files))
         .catch(error => console.log(error))
     );
 });

 /*
   FETCH EVENT: triggered for every request made by index page, after install.
 */
 self.addEventListener('fetch', event => {
     console.info('Event: Fetch');

     let request = event.request;

     event.respondWith(
         caches.match(request).then((response) => {
             if (response) {
                 return response;
             }

             if (navigator.onLine) {
                 return fetch(request).then((response) => {
                     let responseToCache = response.clone();
                     caches.open(cacheName).then((cache) => {
                         console.log(request, responseToCache);
                         if (!caches.has(request)) {
                             cache.add(request, responseToCache)
                         } else {
                             cache.put(request, responseToCache)
                         }
                     });
                     return response;
                 });
             }
         })
     );
 });

 // /*
 //   ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
 // */

 // //Adding `activate` event listener
 // self.addEventListener('activate', (event) => {
 //     console.info('Event: Activate');

 //     //Navigation preload is help us make parallel request while service worker is booting up.
 //     //Enable - chrome://flags/#enable-service-worker-navigation-preload
 //     //Support - Chrome 57 beta (behing the flag)
 //     //More info - https://developers.google.com/web/updates/2017/02/navigation-preload#the-problem

 //     // Check if navigationPreload is supported or not
 //     // if (self.registration.navigationPreload) { 
 //     //   self.registration.navigationPreload.enable();
 //     // }
 //     // else if (!self.registration.navigationPreload) { 
 //     //   console.info('Your browser does not support navigation preload.');
 //     // }

 //     //Remove old and unwanted caches
 //     event.waitUntil(
 //         caches.keys().then((cacheNames) => {
 //             return Promise.all(
 //                 cacheNames.map((cache) => {
 //                     if (cache !== cacheName) {
 //                         return caches.delete(cache); //Deleting the old cache (cache v1)
 //                     }
 //                 })
 //             );
 //         })
 //         .then(function () {
 //             console.info("Old caches are cleared!");
 //             // To tell the service worker to activate current one 
 //             // instead of waiting for the old one to finish.
 //             return self.clients.claim();
 //         })
 //     );
 // });

 // /*
 //   PUSH EVENT: triggered everytime, when a push notification is received.
 // */

 // //Adding `push` event listener
 // self.addEventListener('push', (event) => {
 //     console.info('Event: Push');

 //     var title = 'Push notification demo';
 //     var body = {
 //         'body': 'click to return to application',
 //         'tag': 'demo',
 //         'icon': './images/icons/apple-touch-icon.png',
 //         'badge': './images/icons/apple-touch-icon.png',
 //         //Custom actions buttons
 //         'actions': [{
 //                 'action': 'yes',
 //                 'title': 'I ♥ this app!'
 //             },
 //             {
 //                 'action': 'no',
 //                 'title': 'I don\'t like this app'
 //             }
 //         ]
 //     };

 //     event.waitUntil(self.registration.showNotification(title, body));
 // });

 // /*
 //   BACKGROUND SYNC EVENT: triggers after `bg sync` registration and page has network connection.
 //   It will try and fetch github username, if its fulfills then sync is complete. If it fails,
 //   another sync is scheduled to retry (will will also waits for network connection)
 // */

 // self.addEventListener('sync', (event) => {
 //     console.info('Event: Sync');

 //     //Check registered sync name or emulated sync from devTools
 //     if (event.tag === 'github' || event.tag === 'test-tag-from-devtools') {
 //         event.waitUntil(
 //             //To check all opened tabs and send postMessage to those tabs
 //             self.clients.matchAll().then((all) => {
 //                 return all.map((client) => {
 //                     return client.postMessage('online'); //To make fetch request, check app.js - line no: 122
 //                 })
 //             })
 //             .catch((error) => {
 //                 console.error(error);
 //             })
 //         );
 //     }
 // });

 // /*
 //   NOTIFICATION EVENT: triggered when user click the notification.
 // */

 // //Adding `notification` click event listener
 // self.addEventListener('notificationclick', (event) => {
 //     var url = 'https://demopwa.in/';

 //     //Listen to custom action buttons in push notification
 //     if (event.action === 'yes') {
 //         console.log('I ♥ this app!');
 //     } else if (event.action === 'no') {
 //         console.warn('I don\'t like this app');
 //     }

 //     event.notification.close(); //Close the notification

 //     //To open the app after clicking notification
 //     event.waitUntil(
 //         clients.matchAll({
 //             type: 'window'
 //         })
 //         .then((clients) => {
 //             for (var i = 0; i < clients.length; i++) {
 //                 var client = clients[i];
 //                 //If site is opened, focus to the site
 //                 if (client.url === url && 'focus' in client) {
 //                     return client.focus();
 //                 }
 //             }

 //             //If site is cannot be opened, open in new window
 //             if (clients.openWindow) {
 //                 return clients.openWindow('/');
 //             }
 //         })
 //         .catch((error) => {
 //             console.error(error);
 //         })
 //     );
 // });
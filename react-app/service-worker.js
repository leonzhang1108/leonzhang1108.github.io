"use strict";var precacheConfig=[["./index.html","c8a005fbc6818228de6fc90cc95ca2d0"],["./static/css/main.e0965a06.css","80125f955342f985dc2dded20b02bdab"],["./static/js/0.39e8c76d.chunk.js","473e7714d9842d7887961b90ebaf1f9a"],["./static/js/1.4a33aecd.chunk.js","ef75a005018b90724956e1d2feb99b22"],["./static/js/10.7bb2b7eb.chunk.js","544c6bff645be5ccb29ee7651d6e056a"],["./static/js/11.a20cef56.chunk.js","41467d35263009f234ecb76e8b41fe32"],["./static/js/12.06919473.chunk.js","31fd1c9b890d361448b93a1bfddba5db"],["./static/js/2.8e7722ac.chunk.js","8ada0912d6ed0154fd2830708310e746"],["./static/js/3.53e8f94e.chunk.js","15ba1c44b3c825b3e4b230d3d9d9954b"],["./static/js/4.8b559758.chunk.js","67aabdf7009c3c011eec0ff4ea67f9b6"],["./static/js/5.e4762812.chunk.js","385c03a021ef47c34e2fe72604af7c41"],["./static/js/6.f1c5a05d.chunk.js","ef246e0fcadb673058924f116a5123e4"],["./static/js/7.21a63aaf.chunk.js","56fa976a29c828810c245789bcbf8221"],["./static/js/8.34ef20c5.chunk.js","4cd832ea287b0b99c101e854f9e892f3"],["./static/js/9.dce3a202.chunk.js","51523b1a12a78d52a5a2c7c1d42a08e0"],["./static/js/main.8a8a0919.js","5260af25663b2bbcd753f619e0fe90f2"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="./index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});
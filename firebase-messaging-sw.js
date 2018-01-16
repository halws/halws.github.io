// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/4.8.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.2/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '928454489570'
});

const messaging = firebase.messaging();
// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/4.8.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.2/firebase-messaging.js');
var config = {
  apiKey: "AIzaSyAQ-BgQUaVXPXsTqEVXAHYSkghXrxrIVvA",
  authDomain: "push-test-9eec2.firebaseapp.com",
  databaseURL: "https://push-test-9eec2.firebaseio.com",
  projectId: "push-test-9eec2",
  storageBucket: "push-test-9eec2.appspot.com",
  messagingSenderId: "374430497683"
};
firebase.initializeApp(config);

firebase.messaging();

self.addEventListener('notificationclick', function(event) {
  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow(target);
  }));
});
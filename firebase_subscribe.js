$(function() {
  Push.config({
    serviceWorker: './firebase-messaging-sw.js',
    // requireInteraction: true,
    timeout: 2000,
    fallback: function(payload) {
      alert(paload);
      // Code that executes on browsers with no notification support
      // "payload" is an object containing the
      // title, body, tag, and icon of the notification
    }
  });
  var config = {
    apiKey: "AIzaSyAQ-BgQUaVXPXsTqEVXAHYSkghXrxrIVvA",
    authDomain: "push-test-9eec2.firebaseapp.com",
    databaseURL: "https://push-test-9eec2.firebaseio.com",
    projectId: "push-test-9eec2",
    storageBucket: "push-test-9eec2.appspot.com",
    messagingSenderId: "374430497683"
  };
  firebase.initializeApp(config);

  // браузер поддерживает уведомления
  // вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
  if ('Notification' in window) {
    var messaging = firebase.messaging();
    messaging.onMessage(function(payload) {
      /**
       * PUSH CONFIG
       */

      console.log('Message received. ', payload);
      // new Notification(payload.notification.title, payload.notification);
      Push.create(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,

        onClick: function() {
          location.replace(payload.notification.click_action);
          window.focus();
          this.close();
        }
      });
    });

    // пользователь уже разрешил получение уведомлений
    // подписываем на уведомления если ещё не подписали
    if (Notification.permission === 'granted') {
      subscribe();
    }

    // по клику, запрашиваем у пользователя разрешение на уведомления
    // и подписываем его
    $('#subscribe').on('click', function() {
      subscribe();
    });
  }

  function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
      .then(function() {
        // получаем ID устройства
        messaging.getToken()
          .then(function(currentToken) {
            console.log(currentToken);

            if (currentToken) {
              sendTokenToServer(currentToken);
            } else {
              console.warn('Не удалось получить токен.');
              setTokenSentToServer(false);
            }
          })
          .catch(function(err) {
            console.warn('При получении токена произошла ошибка.', err);
            setTokenSentToServer(false);
          });
      })
      .catch(function(err) {
        console.warn('Не удалось получить разрешение на показ уведомлений.', err);
      });
  }

  // отправка ID на сервер
  function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
      console.log('Отправка токена на сервер...');

      var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
      $.post(url, {
        token: currentToken
      });

      setTokenSentToServer(currentToken);
    } else {
      console.log('Токен уже отправлен на сервер.');
    }
  }

  // используем localStorage для отметки того,
  // что пользователь уже подписался на уведомления
  function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
  }

  function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
      'sentFirebaseMessagingToken',
      currentToken ? currentToken : ''
    );
  }
})
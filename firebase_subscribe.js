$(function() {

  var config = {
    messagingSenderId: '928454489570'
  };

  Push.config({
    FCM: config
  });

  Push.FCM().then(function(FCM) {
    FCM.getToken().then(function(token) {
      console.log("Initialized with token " + token);
    }).catch(function(tokenError) {
      throw tokenError;
    });
  }).catch(function(initError) {
    throw initError;
  });
})
// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging.js");

// Initialize Firebase App in the Service Worker
firebase.initializeApp({
  apiKey: "AIzaSyAEauaPenluoLvdpDIqD5BHUEmfUqgwGR0",
  authDomain: "pushnotification-timeupadte.firebaseapp.com",
  projectId: "pushnotification-timeupadte",
  storageBucket: "pushnotification-timeupadte.appspot.com",
  messagingSenderId: "36336504906",
  appId: "1:36336504906:web:e811f858df96a0689e56b3",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

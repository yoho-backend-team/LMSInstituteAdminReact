// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyB8hykobMJbIs_UAbK6HvYsCF6MWLQYGVY",
  authDomain: "yoho--lms.firebaseapp.com",
  projectId: "yoho--lms",
  storageBucket: "yoho--lms.appspot.com",
  messagingSenderId: "733706159488",
  appId: "1:733706159488:web:3c02d4bce5f9904eb0ed65",
  measurementId: "G-WL2PEHES6E"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console.
const firebaseConfig = {
  apiKey: 'AIzaSyB8hykobMJbIs_UAbK6HvYsCF6MWLQYGVY',
  authDomain: 'yoho--lms.firebaseapp.com',
  projectId: 'yoho--lms',
  storageBucket: 'yoho--lms.appspot.com',
  messagingSenderId: '733706159488',
  appId: '1:733706159488:web:3c02d4bce5f9904eb0ed65',
  measurementId: 'G-WL2PEHES6E'
};

initializeApp(firebaseConfig);

//...

export const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BHeYavKgkyJ0aUZ2WNaiVDuffpWiqB5Ul-T_OhVqMMbL0fywSmJYcQLf2xlQbbQb-3gwzJWW4pv6YR274t_46ek' })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
    });
  });

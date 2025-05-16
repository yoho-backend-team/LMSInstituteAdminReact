import { useEffect, useState } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const usePushSubscription = (role,userId,user,institute,branch) => {

  let subscription;
  const LastRunDate = new Date().toISOString()
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then(async (registration) => {
          const sub = await registration.pushManager.getSubscription();
            if (sub) {
                subscription = sub;
            } else {
              // console.log(process.env.REACT_APP_WEBPUSH_PUBLIC_KEY,"process.env.REACT_WEBPUSH_PUBLIC_KEY")
                return await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_WEBPUSH_PUBLIC_KEY) // VAPID public key
                });
            }
            localStorage.setItem('LastRunDate',LastRunDate)
        })
        .then((sub) => {
           const subs = sub || subscription
          const endPoint = `${process.env.REACT_APP_PUBLIC_API_URL}/api/notification/institute/subscribe`
          axios.post(endPoint,{subscription:subs,role,userId,user,institute,branch})
        })
        .catch((error) => console.error('Error subscribing to push notifications', error));
    }


  return subscription;
};

// Convert VAPID public key to Uint8Array
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String?.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

export default usePushSubscription;

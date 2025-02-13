import { useEffect, useState } from 'react';
import axios from 'axios';

const usePushSubscription = (role,userId,user,institute,branch) => {

  let subscription;
  
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then(async (registration) => {
          const sub = await registration.pushManager.getSubscription();
            if (sub) {
                subscription = sub;
            } else {
              console.log(process.env.REACT_APP_WEBPUSH_PUBLIC_KEY,"process.env.REACT_WEBPUSH_PUBLIC_KEY")
                return await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_WEBPUSH_PUBLIC_KEY) // VAPID public key
                });
            }
        })
        .then((sub) => {
          //  subscription = sub;
          //  console.log(subscription,"subcrip")
    
          // fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/api/notification/institute/subscribe`, {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ subscription: subscription })
          // });

    const endPoint = `${process.env.REACT_APP_PUBLIC_API_URL}/api/notification/institute/subscribe`
    // console.log(endPoint,process.env.REACT_APP_PUBLIC_API_URL)
    axios.post(endPoint,{subscription,role,userId,user,institute,branch})
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

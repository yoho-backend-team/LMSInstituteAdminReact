// public/service-worker.js

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title || 'Default Title';
  const options = {
    body: data.body || 'Default body',
    icon: '/icon.png',
    badge: '/badge.png',
    data:{
      url: "/#/community-management/community"
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const url = event.notification.data?.url ||  "/";
  event.waitUntil(
    clients.openWindow(url)
  );
   event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url ||  "/#/community-management/community");
      }
    })
  );
});
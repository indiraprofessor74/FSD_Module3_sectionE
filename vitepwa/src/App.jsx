import React, { useEffect, useState } from 'react';

function App() {
  const [permission, setPermission] = useState(Notification.permission);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if ('Notification' in window && permission !== 'granted') {
      Notification.requestPermission().then(result => {
        setPermission(result);
        console.log('Notification permission:', result);
      });
    }

    async function subscribeUser() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: '<YOUR_PUBLIC_VAPID_KEY_BASE64>',
          });
          console.log('Push subscription:', sub);
          setSubscription(sub);

          await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(sub),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Subscription error:', error);
        }
      }
    }

    subscribeUser();
  }, [permission]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React + Vite PWA</h1>
      <p>Notification Permission: {permission}</p>
      {subscription && <pre>{JSON.stringify(subscription, null, 2)}</pre>}
    </div>
  );
}

export default App;

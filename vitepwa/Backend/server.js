//import webpush from 'web-push';
//const vapidKeys = webpush.generateVAPIDKeys();
//console.log(vapidKeys);
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import webpush from 'web-push';
dotenv.config();
const app = express();
app.use(bodyParser.json());

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

let subscriptions = [];

app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscribed successfully' });
});

app.post('/api/notify', (req, res) => {
  const payload = JSON.stringify({
    title: 'New Update!',
    body: 'Check out the latest features.',
  });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(error => {
      console.error('Push error:', error);
    });
  });

  res.status(200).json({ message: 'Notifications sent' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

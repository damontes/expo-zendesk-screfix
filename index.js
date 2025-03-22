// import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  if (remoteMessage.from !== '/topics/ZENDESK_SCREWFIX') {
    const data = JSON.parse(remoteMessage.data.message);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Support from ${data.name}`,
        body: data.text,
      },
      trigger: null,
    });
  }
});

import 'expo-router/entry';

import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const TOPIC = 'ZENDESK_SCREWFIX';

export const useNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const isInBackgroundRef = useRef(false);

  const setInitialSettings = async () => {
    await requestPermissions();
    const token = await getFCMToken();
    setToken(token);
  };

  const getPayloadZendeskNotification = (payload: any) => {
    const data = JSON.parse(payload.data.message);
    return {
      content: {
        title: `Support from ${data.name}`,
        body: data.text,
      },
      trigger: null,
    };
  };

  const getPaylodCustomNotification = (payload: any) => {
    const { notification } = payload;
    const { title, body } = notification;

    return {
      content: {
        title,
        body,
      },
      trigger: null,
    };
  };

  useEffect(() => {
    if (!token) return;

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground Notification:', remoteMessage);

      let payload: any = null;
      if (remoteMessage.from !== '/topics/ZENDESK_SCREWFIX' && !isInBackgroundRef.current) {
        payload = getPayloadZendeskNotification(remoteMessage);
      } else {
        payload = getPaylodCustomNotification(remoteMessage);
      }

      if (payload) await Notifications.scheduleNotificationAsync(payload);
    });

    return unsubscribe;
  }, [token]);

  useEffect(() => {
    setInitialSettings();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      isInBackgroundRef.current = nextAppState === 'background';
    });

    // Clean up
    return () => subscription.remove();
  }, []);

  return token;
};

async function requestPermissions() {
  const settings = await Notifications.requestPermissionsAsync();
  if (settings.granted) {
    try {
      await subscribeToTopic();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}

async function subscribeToTopic() {
  await messaging().subscribeToTopic(TOPIC);
}

async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.log('Error getting FCM token', error);
    return null;
  }
}

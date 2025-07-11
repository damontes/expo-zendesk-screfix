import Zendesk from 'expo-zendesk-library';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const IOS_CHANNEL_KEY = process.env.EXPO_PUBLIC_ZENDESK_IOS_CHANNEL_KEY ?? '';
const ANDROID_CHANNEL_KEY = process.env.EXPO_PUBLIC_ZENDESK_ANDROID_CHANNEL_KEY ?? '';

export const useZendesk = ({ token }: { token: string | null }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeZendesk = async () => {
    try {
      await Zendesk.initialize(Platform.OS === 'ios' ? IOS_CHANNEL_KEY : ANDROID_CHANNEL_KEY);
      setIsInitialized(true);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handleOpenChat = () => {
    Zendesk.showConversation();
  };

  useEffect(() => {
    initializeZendesk();
  }, []);

  useEffect(() => {
    if (!token) return;
    Zendesk.setPushNotificaitonToken(token);
  }, [token]);

  return { handleOpenChat, isInitialized };
};

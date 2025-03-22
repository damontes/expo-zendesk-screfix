import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ZendeskWidget from './components/ZendeskWidget';
import { useZendesk } from './hooks/useZendesk';
import { StatusBar } from 'expo-status-bar';
import { useNotifications } from './hooks/useNotifications';
import messaging from '@react-native-firebase/messaging';

export default function RootLayout() {
  const token = useNotifications();
  const { handleOpenChat } = useZendesk({ token });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#1c4991" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <ZendeskWidget icon="chatbox" onPress={handleOpenChat} style={styles.chatButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 64,
    right: 12,
  },
});

import { Stack, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import ZendeskWidget from '../components/ZendeskWidget';
import { useZendesk } from '../hooks/useZendesk';
import { StatusBar } from 'expo-status-bar';
import { useNotifications } from '../hooks/useNotifications';
import AuthenticationProvider from '@/contexts/Authentication';

export default function RootLayout() {
  const token = useNotifications();
  const pathname = usePathname();
  const { handleOpenChat, isInitialized } = useZendesk({ token });

  return (
    <AuthenticationProvider isInitialized={isInitialized}>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="#222222" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="login"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              headerShown: true,
              title: 'Login',
              headerStyle: {
                backgroundColor: '#222222',
              },
              headerTintColor: 'white',
            }}
          />
        </Stack>
        {pathname !== '/login' && (
          <ZendeskWidget icon="chatbox" onPress={handleOpenChat} style={styles.chatButton} />
        )}
      </View>
    </AuthenticationProvider>
  );
}

const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 80,
    right: 12,
  },
});

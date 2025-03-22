import { HapticTab } from '@/app/components/HapticTab';
import { Tabs } from 'expo-router';
import { Image, Platform } from 'react-native';
import TabBarBackground from '@/app/components/ui/TabBarBackground';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0a7ea4',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              style={[{ height: 40, width: 40 }, focused ? {} : { tintColor: 'gray' }]}
              source={require('@/assets/images/logo.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="search-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'My orders',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="book-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: 'My orders',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="cart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'My orders',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="ellipsis-vertical" color={color} />,
        }}
      />
    </Tabs>
  );
}

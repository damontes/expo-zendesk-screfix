import { HapticTab } from '@/components/HapticTab';
import { Tabs } from 'expo-router';
import TabBarBackground from '@/components/ui/TabBarBackground';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f05423',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#222222',
          height: 70,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          marginTop: 10,
          fontFamily: 'Madera',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcon size={30} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Recipients',
          tabBarIcon: ({ color }) => <MaterialIcon size={30} name="people-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Send',
          tabBarIcon: ({ color }) => <MaterialIcon size={30} name="rocket-launch" color={color} />,
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <MaterialIcon size={30} name="receipt-long" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <MaterialIcon size={30} name="apps" color={color} />,
        }}
      />
    </Tabs>
  );
}

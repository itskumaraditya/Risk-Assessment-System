import { Tabs } from 'expo-router';
import { Shield, Activity, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#1a1b1e',
          borderTopColor: '#2c2d31',
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#71717a',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Risk Assessment',
          tabBarIcon: ({ size, color }) => <Shield size={size} color={color} />,
          headerStyle: { backgroundColor: '#1a1b1e' },
          headerTitleStyle: { color: '#fff' },
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ size, color }) => <Activity size={size} color={color} />,
          headerStyle: { backgroundColor: '#1a1b1e' },
          headerTitleStyle: { color: '#fff' },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => <Settings size={size} color={color} />,
          headerStyle: { backgroundColor: '#1a1b1e' },
          headerTitleStyle: { color: '#fff' },
        }}
      />
    </Tabs>
  );
}
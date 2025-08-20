import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from "tailwindcss/colors"
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const iconColor = useThemeColor({}, 'text')

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.purple[300], // ad hoc: coming from DarkTheme component.
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.zinc[900],
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 0,
          borderRadius: 24,
          marginBottom: 60,
          marginHorizontal: 15,
          elevation: 10, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: { width: 3, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          height: 70
        },
        sceneStyle: { backgroundColor: 'transparent' }
      }}>

      <Tabs.Screen
        name="reel"
        options={{
          title: 'Selaa',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="magnify" size={20} color={iconColor} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Omat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="script-text" size={20} color={iconColor} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Luo',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-circle" size={20} color={iconColor} />,
        }}
      />
      <Tabs.Screen
        name="bots"
        options={{
          title: 'Botit',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="robot" size={20} color={iconColor} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Buche',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" size={20} color={iconColor} />,
        }}
      />
    </Tabs>
  );
}

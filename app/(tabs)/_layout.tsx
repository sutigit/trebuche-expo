import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from "tailwindcss/colors"

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.indigo[300], // ad hoc: coming from DarkTheme component.
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.zinc[800],
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
        name="ideas"
        options={{
          title: 'Ideat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="lightbulb-on" size={20} color={"rgb(229, 229, 231)"} />,
        }}
      />
      <Tabs.Screen
        name="bots"
        options={{
          title: 'Botit',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="robot-excited" size={20} color={"rgb(229, 229, 231)"} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Buche',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" size={20} color={"rgb(229, 229, 231)"} />,
        }}
      />
    </Tabs>
  );
}

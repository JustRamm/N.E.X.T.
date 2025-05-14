import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Calendar, MessageSquare, Rocket } from 'lucide-react-native';
import colors from '@/constants/colors';

// Define startup color
const startupColor = "#E97451"; // Terracotta/coral color for startup theme

export default function StartupTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: startupColor,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Talent',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Startup',
          tabBarIcon: ({ color }) => <Rocket size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, // 🏠 Home icon
        }}
      />
      <Tabs.Screen
        name="authentication"
        options={{
          title: 'authentication',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="lock.fill" color={color} />, // 🔒 Lock for authentication
        }}
      />
      <Tabs.Screen
        name="awards"
        options={{
          title: 'awards',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="trophy.fill" color={color} />, // 🏆 Trophy for achievements
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />, // 👤 User profile icon
        }}
      />
      <Tabs.Screen
        name="searchResults"
        options={{
          title: 'searchResults',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />, // 🔍 Search icon
        }}
      />
    </Tabs>
  );
}

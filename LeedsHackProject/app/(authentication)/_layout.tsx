import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/ui/IconSymbol';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { Colors } from '../../constants/Colors';


export default function AuthenticationLayout() {
    return (
      <Tabs
        screenOptions={{
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
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, // 🏠 Home icon
          }}
        />
       
        <Tabs.Screen
          name="register"
          options={{
            title: 'register',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="lock.fill" color={color} />, // 🔒 Lock for authentication
          }}
        />
      </Tabs>
    );
  }
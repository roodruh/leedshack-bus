import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { useUserAuth } from '../hooks/useAuth';

import { useColorScheme } from '../hooks/useColorScheme';
import React from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const {user} = useUserAuth();
  const [appReady, setAppReady] = useState(false); // New state for app readiness


  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  console.log(user);
  // return (
  //   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //       <Stack>
  //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //         <Stack.Screen name="+not-found" />
  //       </Stack>
  //       <StatusBar style="auto"/>
  //   </ThemeProvider>
  // )
  if (user) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto"/>
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(authentication)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto"/>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',  
    backgroundColor: '#F5F5F5',
  },
  stackWrapper: {
    flex: 1,
    zIndex: 1,  
    position: 'relative',  
  },
});

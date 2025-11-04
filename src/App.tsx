import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from './store/useAuthStore';
import { AuthStack } from './navigation/AuthStack';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  const user = useAuthStore((s) => s.user);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}



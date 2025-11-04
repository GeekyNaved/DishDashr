import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';

export const ProfileScreen: React.FC = () => {
  const reset = useAuthStore((s) => s.reset);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Staff Profile</Text>
      <Button title="Logout" onPress={reset} />
    </View>
  );
};



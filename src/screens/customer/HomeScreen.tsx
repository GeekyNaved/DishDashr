import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};



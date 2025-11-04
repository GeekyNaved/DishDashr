import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/customer/HomeScreen';
import { OrdersScreen as CustomerOrdersScreen } from '../screens/customer/OrdersScreen';
import { ProfileScreen as CustomerProfileScreen } from '../screens/customer/ProfileScreen';
import { CartScreen } from '../screens/customer/CartScreen';
import { HomeIcon, ClipboardIcon, UserIcon } from 'react-native-heroicons/outline';

export type CustomerTabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type CustomerStackParamList = {
  Tabs: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<CustomerTabParamList>();
const Stack = createNativeStackNavigator<CustomerStackParamList>();

const Tabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      tabBarIcon: ({ color, size, focused }) => {
        switch (route.name) {
          case 'Home':
            return <HomeIcon color={color} size={size} />;
          case 'Orders':
            return <ClipboardIcon color={color} size={size} />;
          case 'Profile':
            return <UserIcon color={color} size={size} />;
          default:
            return null;
        }
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Orders" component={CustomerOrdersScreen} />
    <Tab.Screen name="Profile" component={CustomerProfileScreen} />
  </Tab.Navigator>
);

export const CustomerFlowNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

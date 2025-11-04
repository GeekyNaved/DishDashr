import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, ClipboardDocumentListIcon, Bars3BottomLeftIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { DashboardScreen } from '../screens/staff/DashboardScreen';
import { OrdersScreen as StaffOrdersScreen } from '../screens/staff/OrdersScreen';
import { MenuScreen } from '../screens/staff/MenuScreen';
import { ProfileScreen as StaffProfileScreen } from '../screens/staff/ProfileScreen';

export type StaffTabParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Menu: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<StaffTabParamList>();

export const StaffFlowNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      tabBarIcon: ({ color, size }) => {
        const iconProps = { color, size: size - 2 }; // adjust icon size a bit smaller
        switch (route.name) {
          case 'Dashboard':
            return <HomeIcon {...iconProps} />;
          case 'Orders':
            return <ClipboardDocumentListIcon {...iconProps} />;
          case 'Menu':
            return <Bars3BottomLeftIcon {...iconProps} />;
          case 'Profile':
            return <UserCircleIcon {...iconProps} />;
          default:
            return null;
        }
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Orders" component={StaffOrdersScreen} />
    <Tab.Screen name="Menu" component={MenuScreen} />
    <Tab.Screen name="Profile" component={StaffProfileScreen} />
  </Tab.Navigator>
);

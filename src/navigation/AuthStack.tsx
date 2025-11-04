import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { EnterOTPScreen } from '../screens/auth/EnterOTPScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  EnterOTP: { phone?: string } | undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTitle: 'Register' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerTitle: 'Forgot Password' }} />
      <Stack.Screen name="EnterOTP" component={EnterOTPScreen} options={{ headerTitle: 'Enter OTP' }} />
    </Stack.Navigator>
  );
};



import React, { useMemo, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [identifier, setIdentifier] = useState('');

  const isValid = useMemo(() => identifier.trim().length > 0, [identifier]);

  const onSubmit = () => {
    if (!isValid) return;
    navigation.navigate('EnterOTP');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <CustomInput
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={identifier}
          onChangeText={setIdentifier}
        />
        <CustomButton title="Send OTP" onPress={onSubmit} disabled={!isValid} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    color: '#6B7280',
  },
});



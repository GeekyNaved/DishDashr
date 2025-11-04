import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { RoleToggle } from '../../components/RoleToggle';
import { useAuthStore, UserRole } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { ms, s, vs } from '../../theme/sizing';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const setUserRole = useAuthStore((s) => s.setUserRole);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const currentRole = useAuthStore((s) => s.userRole) ?? 'customer';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>(currentRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const isValid = useMemo(() => {
    if (role === 'customer') {
      const phone = identifier.replace(/\D/g, '');
      return phone.length === 10; // basic 10-digit validation
    }
    return identifier.trim().length > 0 && password.trim().length > 0;
  }, [identifier, password, role]);

  const onLogin = async () => {
    setError(undefined);
    if (!isValid) {
      setError(role === 'customer' ? 'Enter a valid 10-digit phone number.' : 'Please enter both fields.');
      return;
    }
    if (role === 'customer') {
      navigation.navigate('EnterOTP', { phone: `+91 ${identifier}` });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setUserRole('staff');
      setAuthenticated(true);
      setLoading(false);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>
        <RoleToggle value={role} onChange={setRole} />
        {role === 'customer' ? (
          <CustomInput
            label="Phone Number"
            placeholder="+91 9876543210"
            keyboardType="phone-pad"
            value={identifier}
            onChangeText={setIdentifier}
            errorText={error}
          />
        ) : (
          <>
            <CustomInput
              label="Email"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={identifier}
              onChangeText={setIdentifier}
            />
            <View>
              <CustomInput
                label="Password"
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.eye} onPress={() => setShowPassword((s) => !s)}>
                {showPassword ? (
                  <EyeSlashIcon color={colors.mutedText} size={s(20)} />
                ) : (
                  <EyeIcon color={colors.mutedText} size={s(20)} />
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
        <CustomButton title={role === 'customer' ? 'Send OTP' : 'Login'} onPress={onLogin} loading={loading} disabled={!isValid} />

        <View style={styles.rowSpaceBetween}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
    justifyContent: 'center',
    gap: ms(16),
  },
  title: {
    fontSize: ms(24),
    fontWeight: '700',
    color: colors.text,
    marginBottom: ms(8),
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(8),
  },
  link: {
    color: colors.primary,
    fontWeight: '500',
  },
  eye: {
    position: 'absolute',
    right: ms(12),
    bottom: vs(8),
  },
});



import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ms, vs } from '../../theme/sizing';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import { colors } from '../../theme/colors';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const isValid = useMemo(() => {
    return (
      name.trim().length > 0 &&
      identifier.trim().length > 0 &&
      password.trim().length >= 6 &&
      confirmPassword.trim().length >= 6 &&
      password === confirmPassword
    );
  }, [name, identifier, password, confirmPassword]);

  const onRegister = () => {
    setError(undefined);
    if (!isValid) {
      setError('Please fill fields correctly. Passwords must match.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('EnterOTP');
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create account</Text>
        <CustomInput label="Name" placeholder="Your name" value={name} onChangeText={setName} />
        <CustomInput
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={identifier}
          onChangeText={setIdentifier}
        />

        {/* Password Field */}
      <View style={styles.inputWrapper}>
        <CustomInput
          label="Password"
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setShowPassword((s) => !s)}>
          {showPassword ? (
            <EyeSlashIcon color={colors.mutedText} size={ms(20)} />
          ) : (
            <EyeIcon color={colors.mutedText} size={ms(20)} />
          )}
        </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputWrapper}>
        <CustomInput
          label="Confirm Password"
          placeholder="••••••••"
          secureTextEntry={!showConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          errorText={error}
        />
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setShowConfirm((s) => !s)}>
          {showConfirm ? (
            <EyeSlashIcon color={colors.mutedText} size={ms(20)} />
          ) : (
            <EyeIcon color={colors.mutedText} size={ms(20)} />
          )}
        </TouchableOpacity>
      </View>
        {/* <CustomInput
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomInput
          label="Confirm Password"
          placeholder="••••••••"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          errorText={error}
        /> */}
        <CustomButton title="Register" onPress={onRegister} loading={loading} disabled={!isValid} />
        <View style={styles.center}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Already have an account? Login</Text>
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
    paddingHorizontal: 20,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  center: {
    alignItems: 'center',
    marginTop: 8,
  },
  link: {
    color: '#2563EB',
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: ms(16),
  },
  eye: {
    position: 'absolute',
    right: ms(12),
    bottom: vs(8),
  },
});



import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useAuthStore, UserRole } from '../../store/useAuthStore';
import { OTPInput } from '../../components/OTPInput';
import { colors } from '../../theme/colors';
import { ms } from '../../theme/sizing';
import { AuthStackParamList } from '../../navigation/AuthStack';

export const EnterOTPScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<AuthStackParamList, 'EnterOTP'>>();
  const phone = route.params?.phone ?? '';
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setUserRole = useAuthStore((s) => s.setUserRole);
  const [code, setCode] = useState<string>('');
  const [secondsLeft, setSecondsLeft] = useState<number>(30);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const isComplete = code.length === 4 || code.length === 6;

  const onVerify = () => {
    setUserRole((prev => (prev as UserRole) || 'customer') as UserRole);
    setAuthenticated(true);
  };

  const onResend = () => {
    if (secondsLeft > 0) return;
    setCode('');
    setSecondsLeft(30);
  };

  const masked = phone
    ? `${phone.replace(/\D/g, '').slice(0, 4)} XXXXXX`
    : 'your number';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to {masked}</Text>

      <View style={styles.otpContainer}>
        <OTPInput length={4} onChange={setCode} />
      </View>

      <View style={styles.resendContainer}>
        {secondsLeft > 0 ? (
          <Text style={styles.timerText}>
            Resend in 00:{String(secondsLeft).padStart(2, '0')}
          </Text>
        ) : (
          <TouchableOpacity onPress={onResend}>
            <Text style={styles.link}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.verifyButton, !isComplete && styles.verifyButtonDisabled]}
        disabled={!isComplete}
        onPress={onVerify}
      >
        <Text style={styles.verifyText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backText}>← Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: ms(26),
    fontWeight: '700',
    color: colors.text,
    marginBottom: ms(8),
    textAlign: 'center',
  },
  subtitle: {
    color: colors.mutedText,
    textAlign: 'center',
    fontSize: ms(14),
    marginBottom: ms(28),
    lineHeight: ms(20),
  },
  otpContainer: {
    marginBottom: ms(24),
    width: '100%',
    alignItems: 'center',
  },
  resendContainer: {
    marginBottom: ms(30),
  },
  timerText: {
    color: colors.mutedText,
    textAlign: 'center',
  },
  link: {
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'center',
  },
  verifyButton: {
    width: '100%',
    borderRadius: ms(14),
    paddingVertical: ms(14),
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginBottom: ms(16),
  },
  verifyButtonDisabled: {
    backgroundColor: colors.primaryLight,
  },
  verifyText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: ms(16),
  },
  backText: {
    color: colors.mutedText,
    textAlign: 'center',
    fontSize: ms(14),
  },
});


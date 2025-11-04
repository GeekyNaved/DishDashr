import React, { useCallback } from 'react';
import OtpInputs from 'react-native-otp-inputs';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { ms } from '../theme/sizing';

type Props = {
  length?: 4 | 6;
  onChange: (code: string) => void;
};

export const OTPInput: React.FC<Props> = ({ length = 4, onChange }) => {
  const handleOTPChange = useCallback((code: string) => {
    // delay setState to next frame to avoid React render conflict
    setTimeout(() => {
      onChange(code);
    }, 0);
  }, [onChange]);

  return (
    <View style={styles.container}>
      <OtpInputs
        autofillFromClipboard
        numberOfInputs={length}
        handleChange={handleOTPChange}
        inputContainerStyles={styles.inputContainer}
        inputStyles={styles.input}
        keyboardType="number-pad"
        selectTextOnFocus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: ms(48),
    height: ms(48),
    borderRadius: ms(10),
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: ms(4),
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: ms(18),
    textAlign: 'center',
    color: colors.text,
    width: '100%',
  },
});

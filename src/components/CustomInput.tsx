import React from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { ms } from '../theme/sizing';

type Props = TextInputProps & {
  label?: string;
  errorText?: string;
  containerStyle?: ViewStyle;
};

export const CustomInput: React.FC<Props> = ({
  label,
  errorText,
  containerStyle,
  style,
  ...rest
}) => {
  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.mutedText}
        style={[styles.input, style]}
        {...rest}
      />
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: ms(4),
    color: colors.text,
  },
  input: {
    width: '100%',
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: ms(12),
    paddingHorizontal: ms(16),
    backgroundColor: colors.background,
  },
  errorText: {
    marginTop: ms(4),
    fontSize: ms(12),
    color: colors.danger,
  },
});



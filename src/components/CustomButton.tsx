import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { ms } from '../theme/sizing';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle; // text style not used; kept for compatibility
};

export const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  loading,
  disabled,
  containerStyle,
  style,
}) => {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        isDisabled ? styles.buttonDisabled : null,
        containerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: ms(14),
    backgroundColor: colors.primary,
    paddingVertical: ms(12),
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  title: {
    color: colors.background,
    fontSize: ms(16),
    fontWeight: '600',
  },
});



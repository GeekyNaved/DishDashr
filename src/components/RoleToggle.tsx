import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { ms } from '../theme/sizing';
import { UserRole } from '../store/useAuthStore';

type Props = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

export const RoleToggle: React.FC<Props> = ({ value, onChange }) => {
  const isCustomer = value === 'customer';
  const isStaff = value === 'staff';
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, isCustomer ? styles.segmentActive : styles.segmentInactive]}
        onPress={() => onChange('customer')}
      >
        <Text style={[styles.segmentText, isCustomer ? styles.segmentTextActive : styles.segmentTextInactive]}>Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.segment, isStaff ? styles.segmentActive : styles.segmentInactive]}
        onPress={() => onChange('staff')}
      >
        <Text style={[styles.segmentText, isStaff ? styles.segmentTextActive : styles.segmentTextInactive]}>Staff</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: ms(12),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: ms(10),
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentInactive: {
    backgroundColor: colors.background,
  },
  segmentText: {
    fontWeight: '600',
  },
  segmentTextActive: {
    color: colors.background,
  },
  segmentTextInactive: {
    color: colors.text,
  },
});



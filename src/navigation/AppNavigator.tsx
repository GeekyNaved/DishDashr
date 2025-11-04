import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { CustomerFlowNavigator } from './CustomerTabs';
import { StaffFlowNavigator } from './StaffTabs';

export const AppNavigator: React.FC = () => {
  const role = useAuthStore((s) => s.userRole);

  if (role === 'staff') {
    return <StaffFlowNavigator />;
  }

  // default to customer when logged in and role not set
  return <CustomerFlowNavigator />;
};



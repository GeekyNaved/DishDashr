import { create } from 'zustand';

export type UserRole = 'customer' | 'staff';

type AuthState = {
  userRole: UserRole | null;
  isAuthenticated: boolean;
  setUserRole: (role: UserRole | null) => void;
  setAuthenticated: (value: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  userRole: null,
  isAuthenticated: false,
  setUserRole: (role) => set({ userRole: role }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  reset: () => set({ userRole: null, isAuthenticated: false }),
}));



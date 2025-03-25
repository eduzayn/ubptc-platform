import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem('adminToken'),
  token: localStorage.getItem('adminToken'),
  login: (token) => {
    localStorage.setItem('adminToken', token);
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    set({ isAuthenticated: false, token: null });
  },
}));

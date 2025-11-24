import { create } from 'zustand';
import type UserInterface from '@/types/UserInterface';

interface AuthState {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    set({ user: null });
    // Удаляем токен из cookies
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Перенаправляем на страницу входа
    window.location.href = '/login';
  },
}));


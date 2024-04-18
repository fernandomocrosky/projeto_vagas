import { create } from 'zustand';

export const useUser = create((set) => ({
  user: {
    auth: false,
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  setAuth: (auth) => set((state) => ({ user: { ...state.user, auth } })),
}));

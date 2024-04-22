import { create } from 'zustand';

export const useUser = create((set) => ({
  user: {},
  setUser: (user) => set((state) => ({ ...state.user, user })),
}));

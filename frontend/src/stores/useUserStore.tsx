import { create } from 'zustand';
import { getCookie } from 'typescript-cookie';

interface UserState {
  auth: boolean;
  id: string;
  email: string;
  name: string;
  role: string;
  descricao?: string;
  ramo?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  descricao?: string;
  ramo?: string;
}

interface UserStore {
  user: UserState;
  setAuth: (auth: boolean) => void;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {
    auth: getCookie('token') ? true : false,
    email: '',
    name: '',
    role: '',
    id: '',
  },

  setAuth(auth: boolean) {
    set((state) => {
      return {
        user: {
          ...state.user,
          auth,
        },
      };
    });
  },

  setUser(newUser: User) {
    set((state) => ({
      user: {
        ...state.user,
        ...newUser,
      },
    }));
  },
}));

export default useUserStore;

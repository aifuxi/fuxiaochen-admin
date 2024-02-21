import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/user';

type State = {
  user?: User;
  token?: string;
};

type Action = {
  setCurrentUser: (user?: User, accessToken?: string) => void;
  clearCurrentUser: () => void;
};

export const useCurrentUserStore = create<State & Action>()(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,
      setCurrentUser: (user?: User, token?: string) => set(() => ({ user, token })),
      clearCurrentUser: () => set(() => ({ user: undefined, token: undefined })),
    }),
    { name: 'current_user' },
  ),
);

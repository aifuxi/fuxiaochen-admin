import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Post } from '@/features/post';

type State = {
  draftPost?: Partial<Post>;
};

type Action = {
  setDraftPost: (post?: Partial<Post>) => void;
  clearDraftPost: () => void;
};

export const useDraftPostStore = create<State & Action>()(
  persist(
    (set) => ({
      draftPost: undefined,
      setDraftPost: (post?: Partial<Post>) => set(() => ({ draftPost: post })),
      clearDraftPost: () => set(() => ({ draftPost: undefined })),
    }),
    { name: 'draft-post' },
  ),
);

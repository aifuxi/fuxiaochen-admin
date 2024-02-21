import { Model } from '@/types/common';

export type User = Model & {
  name: string;
  isAdmin: boolean;
};

export type CreateUserParams = {
  name: string;
  isAdmin: boolean;
};

export type UpdateUserParams = Partial<CreateUserParams>;

import { Model, PaginationParams } from '@/types';

export type User = Model & {
  name: string;
  isAdmin: boolean;
};

export type CreateUserParams = {
  name: string;
  isAdmin: boolean;
};

export type UpdateUserParams = Partial<CreateUserParams>;

export type GetUsersParams = PaginationParams;

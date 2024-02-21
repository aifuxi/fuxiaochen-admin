import { User } from '@/types/user.ts';

export type LoginParams = {
  name: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

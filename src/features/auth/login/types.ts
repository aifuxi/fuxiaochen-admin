import { User } from '@/features/user';

export type LoginParams = {
  name: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

import { x } from '@/utils/request.ts';

import { ResponseStruct, ResponseTotalStruct } from '@/types/common';
import { CreateUserParams, UpdateUserParams, User } from '@/types/user';

export const getUsers = (): Promise<ResponseTotalStruct<User[]>> => {
  return x.get('/users');
};

export const getUser = (id: string): Promise<ResponseStruct<User>> => {
  return x.get(`/users/${id}`);
};

export const createUser = (params: CreateUserParams): Promise<ResponseStruct<User>> => {
  return x.post('/users', params);
};

export const updateUser = (id: string, params: UpdateUserParams): Promise<ResponseStruct<User>> => {
  return x.patch(`/users/${id}`, params);
};

export const deleteUser = (id: string): Promise<ResponseStruct<User>> => {
  return x.delete(`/users/${id}`);
};

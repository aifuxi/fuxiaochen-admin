import { stringifyParams } from '@/utils/helper.ts';
import { x } from '@/utils/request.ts';

import { ResponseStruct, ResponseTotalStruct } from '@/types/common';

import { CreateUserParams, GetUsersParams, UpdateUserParams, User } from './types';

export const getUsers = (params: GetUsersParams): Promise<ResponseTotalStruct<User[]>> => {
  return x.get(`/users?${stringifyParams(params)}`);
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

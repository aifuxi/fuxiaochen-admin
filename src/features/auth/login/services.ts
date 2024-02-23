import { x } from '@/utils/request.ts';

import { ResponseStruct } from '@/types/common.ts';

import { LoginParams, LoginResponse } from './types.ts';

export const login = (params: LoginParams): Promise<ResponseStruct<LoginResponse>> => {
  return x.post('/auth/login', params);
};

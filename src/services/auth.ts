import { x } from '@/utils/request';

import { LoginParams, LoginResponse } from '@/types/auth';
import { ResponseStruct } from '@/types/common';

export const login = (params: LoginParams): Promise<ResponseStruct<LoginResponse>> => {
  return x.post('/auth/login', params);
};

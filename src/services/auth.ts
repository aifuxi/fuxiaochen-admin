import { x } from '@/utils/request.ts';

import { LoginParams, LoginResponse } from '@/types/auth.ts';
import { ResponseStruct } from '@/types/common.ts';

export const login = (params: LoginParams): Promise<ResponseStruct<LoginResponse>> => {
  return x.post('/auth/login', params);
};

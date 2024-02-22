import { Toast } from '@douyinfe/semi-ui';
import axios from 'axios';

import { getBearerToken, stringifyParams } from '@/utils/helper.ts';

import { CODE } from '@/constants/code';
import { PATH } from '@/constants/path';
import { NO_AUTH_PATH, REDIRECT } from '@/constants/unknown.ts';

import { useCurrentUserStore } from '@/stores/current-user.ts';

export const x = axios.create({
  baseURL: PATH.API_BASE_URL,
});

const noAuthPathList: string[] = [NO_AUTH_PATH.AUTH_LOGIN];

// 请求拦截器
x.interceptors.request.use(
  function (config) {
    const token = useCurrentUserStore.getState().token;
    // 需要验证登录的接口 + token存在，挂到请求头上
    if (!noAuthPathList.includes(config.url ?? '') && token) {
      config.headers.Authorization = getBearerToken(token);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const noAuthCodeList = [CODE.INCORRECT_TOKEN, CODE.INCORRECT_TOKEN_FORMAT, CODE.TOKEN_NOT_FOUND];

// 响应拦截器
x.interceptors.response.use(
  function (response) {
    // 由于 api 的 HTTP 请求总是返回 200 状态码，处理错误需要根据返回数据的 code 字段判断
    // code=0 成功
    // code!=0 失败，当做请求失败，抛出错误信息
    if (response.data.code === CODE.SUCCESS) {
      return response.data;
    } else if (noAuthCodeList.includes(response.data.code)) {
      Toast.error({ theme: 'light', content: response.data.msg });
      // 登录校验不通过，带着当前路由重定向到登录页
      window.setTimeout(() => {
        const redirectPath = location.pathname.replace(PATH.BASENAME, '');
        const query = stringifyParams({ [REDIRECT]: redirectPath });
        location.href = `${PATH.BASENAME}${PATH.LOGIN}?${query}`;
      }, 1000);
      return;
    } else {
      Toast.error({ theme: 'light', content: response.data.msg });
      throw new Error(response.data.msg);
    }
  },
  function (error) {
    // api 的 http 请求不为 2xx 时
    return Promise.reject(error);
  },
);

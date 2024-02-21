import { Toast } from '@douyinfe/semi-ui';
import axios from 'axios';

import { CODE } from '@/constants/code';
import { PATH } from '@/constants/path';

export const x = axios.create({
  baseURL: PATH.API_BASE_URL,
});

// 请求拦截器
x.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 响应拦截器
x.interceptors.response.use(
  function (response) {
    // 由于 api 的 HTTP 请求总是返回 200 状态码，处理错误需要根据返回数据的 code 字段判断
    // code=0 成功
    // code!=0 失败，当做请求失败，抛出错误信息
    if (response.data.code === CODE.SUCCESS) {
      return response.data;
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

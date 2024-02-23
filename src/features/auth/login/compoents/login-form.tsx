import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Form, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useMutation } from '@tanstack/react-query';
import { isUndefined } from 'lodash-es';

import { PATH } from '@/constants/path.ts';
import { QUERY } from '@/constants/query.ts';
import { REDIRECT } from '@/constants/unknown.ts';

import { LoginParams, login } from '@/features/auth';
import { useCurrentUserStore } from '@/stores/current-user.ts';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const formApiRef = React.useRef<FormApi<LoginParams>>();

  const redirectPath = searchParams.get(REDIRECT);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: [QUERY.LOGIN],
    mutationFn: login,
    onSuccess(resp) {
      // 保存用户信息和 token
      setCurrentUser(resp.data.user, resp.data.token);

      Toast.success({ theme: 'light', content: '登录成功，欢迎回来~' });

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        // 跳转到首页
        navigate(PATH.HOME);
      }
    },
  });

  return (
    <Form
      autoComplete="off"
      getFormApi={(formApi) => (formApiRef.current = formApi)}
      initValues={
        {
          name: 'admin',
          password: '123456',
        } as LoginParams
      }
    >
      <Form.Input
        field="name"
        label="用户名"
        placeholder="请输入用户名"
        rules={[{ required: true, message: '用户名必填' }]}
        showClear
      />
      <Form.Input
        field="password"
        label="密码"
        mode="password"
        placeholder="请输入密码"
        rules={[{ required: true, message: '密码必填' }]}
        showClear
      />

      <Form.Slot noLabel>
        <div className="grid gap-y-3">
          <Button theme="solid" block onClick={handleLogin} loading={isPending}>
            登录
          </Button>
          <Button block onClick={handleReset}>
            重置
          </Button>
        </div>
      </Form.Slot>
    </Form>
  );

  async function handleLogin() {
    await formApiRef.current?.validate();

    const values = formApiRef.current?.getValues();
    if (isUndefined(values)) {
      return;
    }

    await mutateAsync(values);
  }

  function handleReset() {
    formApiRef.current?.reset();
  }
};

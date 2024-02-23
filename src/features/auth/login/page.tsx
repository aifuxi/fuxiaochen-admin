import { Typography } from '@douyinfe/semi-ui';

import { LoginForm } from './compoents';

export const LoginPage = () => {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="w-[320px] rounded-2xl border shadow-2xl p-8">
        <Typography.Title heading={2}>欢迎回来</Typography.Title>
        <Typography.Paragraph type="tertiary">请输入用户名和密码进行登录</Typography.Paragraph>

        <LoginForm />
      </div>
    </div>
  );
};

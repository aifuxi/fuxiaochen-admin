import { Button, Form, Typography } from '@douyinfe/semi-ui';

export const LoginPage = () => {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="w-[320px] rounded-2xl border shadow-2xl p-8">
        <Typography.Title heading={2}>欢迎回来</Typography.Title>
        <Typography.Paragraph type="tertiary">请输入用户名和密码进行登录</Typography.Paragraph>

        <Form autoComplete="off">
          <Form.Input field="name" label="用户名" placeholder="请输入用户名" showClear />
          <Form.Input field="password" label="密码" mode="password" placeholder="请输入密码" showClear />

          <Form.Slot noLabel>
            <div className="grid gap-y-3">
              <Button theme="solid" block>
                登录
              </Button>
              <Button block>重置</Button>
            </div>
          </Form.Slot>
        </Form>
      </div>
    </div>
  );
};

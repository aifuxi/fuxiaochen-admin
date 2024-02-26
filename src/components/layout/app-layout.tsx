import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { IconSemiLogo } from '@douyinfe/semi-icons';
import { IconForm, IconIntro, IconSteps, IconTag } from '@douyinfe/semi-icons-lab';
import { Avatar, Nav } from '@douyinfe/semi-ui';
import { NavProps } from '@douyinfe/semi-ui/lib/es/navigation';
import { NavItemProps } from '@douyinfe/semi-ui/lib/es/navigation/Item';

import { PATH } from '@/constants/path';

import { useMount } from '@/hooks';

const navbarNavItems: NavItemProps[] = [
  { itemKey: 'Home', text: 'Home' },
  { itemKey: 'Dashboard', text: 'Dashboard' },
  { itemKey: 'Project', text: 'Project' },
  { itemKey: 'Tasks', text: 'Tasks' },
];

const sidebarNavItems: NavItemProps[] = [
  { itemKey: PATH.HOME, text: '首页', icon: <IconIntro /> },
  { itemKey: PATH.POST, text: '文章列表', icon: <IconForm /> },
  { itemKey: PATH.CATEGORY, text: '文章分类', icon: <IconSteps /> },
  { itemKey: PATH.TAG, text: '文章标签', icon: <IconTag /> },
];

export const AppLayout = () => {
  const navigate = useNavigate();
  const initPath = location.pathname.replace(PATH.BASENAME, '') || PATH.HOME;
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const handleSelect: NavProps['onSelect'] = (data) => {
    const itemKey = data.itemKey as string;

    setSelectedKeys([itemKey]);
    navigate(itemKey);
  };

  useMount(() => {
    setSelectedKeys([initPath]);
  });

  return (
    <div className="flex flex-col h-screen w-screen">
      <Nav
        mode="horizontal"
        header={{
          logo: (
            <div>
              <IconSemiLogo />
            </div>
          ),
          text: '付小晨管理后台',
        }}
        footer={
          <div className="h-full flex items-center">
            <Avatar
              size="small"
              src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
              color="blue"
            >
              示例
            </Avatar>
          </div>
        }
      >
        {navbarNavItems.map((el) => (
          <Nav.Item key={el.itemKey} {...el} />
        ))}
      </Nav>
      <div className="flex h-[calc(100vh-60px)]">
        <Nav mode="vertical" footer={{ collapseButton: true }} selectedKeys={selectedKeys} onSelect={handleSelect}>
          {sidebarNavItems.map((el) => (
            <Nav.Item key={el.itemKey} {...el} />
          ))}
        </Nav>
        <Outlet />
      </div>
    </div>
  );
};

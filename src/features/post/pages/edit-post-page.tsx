import { Breadcrumb, Typography } from '@douyinfe/semi-ui';

import { PATH } from '@/constants/path.ts';

import { PageLayout } from '@/components/layout';

export const EditPostPage = () => {
  return (
    <PageLayout
      title={
        <Breadcrumb>
          <Breadcrumb.Item href={PATH.POST} noLink>
            <Typography.Title heading={4}>文章列表</Typography.Title>
          </Breadcrumb.Item>
          <Breadcrumb.Item noLink>
            <Typography.Title heading={4}>编辑文章</Typography.Title>
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      EditPostPage
    </PageLayout>
  );
};

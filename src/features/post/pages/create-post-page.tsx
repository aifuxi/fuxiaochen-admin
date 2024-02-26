import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useMutation } from '@tanstack/react-query';
import { isUndefined } from 'lodash-es';

import { PATH } from '@/constants/path.ts';
import { QUERY } from '@/constants/query.ts';

import { PageLayout } from '@/components/layout';
import { PostForm } from '@/features/post/components/post-form.tsx';

import { createPost } from '../services.ts';
import { CreatePostParams } from '../types.ts';

export const CreatePostPage = () => {
  const navigate = useNavigate();

  const formApiRef = React.useRef<FormApi<CreatePostParams>>();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: [QUERY.POST],
    mutationFn: createPost,
    onSuccess() {
      Toast.success({ theme: 'light', content: '创建成功' });
      navigate(PATH.POST);
    },
  });

  return (
    <PageLayout title="创建文章">
      <PostForm formApiRef={formApiRef} />
      <div className="fixed bottom-4 inset-x-1/3">
        <Button block theme="solid" loading={isPending} onClick={handleCreatePost}>
          创建
        </Button>
      </div>
    </PageLayout>
  );

  async function handleCreatePost() {
    await formApiRef.current?.validate();
    const values = formApiRef.current?.getValues();

    if (isUndefined(values)) {
      return;
    }

    await mutateAsync(values);
  }
};

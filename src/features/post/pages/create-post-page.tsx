import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { IconDelete, IconPlusCircle, IconSave, IconSync } from '@douyinfe/semi-icons';
import { Button, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useMutation } from '@tanstack/react-query';
import { isUndefined } from 'lodash-es';

import { PATH } from '@/constants/path.ts';
import { QUERY } from '@/constants/query.ts';

import { PageLayout } from '@/components/layout';
import { PostForm } from '@/features/post/components/post-form.tsx';
import { useDraftPostStore } from '@/stores/draft-post.ts';

import { createPost } from '../services.ts';
import { CreatePostParams } from '../types.ts';

export const CreatePostPage = () => {
  const navigate = useNavigate();

  const formApiRef = React.useRef<FormApi<CreatePostParams>>();
  const clearDraftPost = useDraftPostStore((state) => state.clearDraftPost);
  const setDraftPost = useDraftPostStore((state) => state.setDraftPost);
  const draftPost = useDraftPostStore((state) => state.draftPost);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: [QUERY.POST],
    mutationFn: createPost,
    onSuccess() {
      clearDraftPost();
      Toast.success({ theme: 'light', content: '创建成功' });
      navigate(PATH.POST);
    },
  });

  return (
    <PageLayout title="创建文章">
      <PostForm formApiRef={formApiRef} />
      <div className="fixed bottom-4 right-16 flex space-x-4">
        <Button
          className="w-[220px]"
          theme="solid"
          icon={<IconPlusCircle />}
          loading={isPending}
          onClick={handleCreatePost}
        >
          创建
        </Button>
        <Button theme="solid" icon={<IconSync />} onClick={handleReadFromDraft} className="w-[220px]">
          读取草稿
        </Button>
        <Button theme="solid" icon={<IconSave />} onClick={handleSaveToDraft} className="w-[220px]">
          存入草稿
        </Button>
        <Button theme="solid" type="danger" icon={<IconDelete />} onClick={handleClearDraft} className="w-[220px]">
          清除草稿
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

  function handleReadFromDraft() {
    if (!isUndefined(draftPost)) {
      formApiRef.current?.setValues(draftPost);
    }
  }

  function handleSaveToDraft() {
    setDraftPost(formApiRef.current?.getValues());
  }

  function handleClearDraft() {
    clearDraftPost();
  }
};

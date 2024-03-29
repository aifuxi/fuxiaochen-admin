import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IconDelete, IconEdit, IconSave, IconSync } from '@douyinfe/semi-icons';
import { Breadcrumb, Button, Toast, Typography } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { useMutation } from '@tanstack/react-query';
import { isUndefined } from 'lodash-es';

import { CODE } from '@/constants/code.ts';
import { PATH } from '@/constants/path.ts';
import { QUERY } from '@/constants/query.ts';

import { PageLayout } from '@/components/layout';
import { UpdatePostParams, useGetPost } from '@/features/post';
import { PostForm } from '@/features/post/components/post-form.tsx';
import { updatePost } from '@/features/post/services.ts';
import { useDraftPostStore } from '@/stores/draft-post';

export const EditPostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const formApiRef = React.useRef<FormApi<UpdatePostParams>>();
  const clearDraftPost = useDraftPostStore((state) => state.clearDraftPost);
  const setDraftPost = useDraftPostStore((state) => state.setDraftPost);
  const draftPost = useDraftPostStore((state) => state.draftPost);

  const { data } = useGetPost(id || '');

  const { isPending, mutateAsync } = useMutation({
    mutationKey: [QUERY.POST, id],
    mutationFn: (params: UpdatePostParams) => updatePost(id || '', params),
    onSuccess() {
      clearDraftPost();
      Toast.success({ theme: 'light', content: '更新成功' });
      navigate(PATH.POST);
    },
  });

  React.useEffect(() => {
    if (data?.code === CODE.SUCCESS) {
      const post = data.data;
      formApiRef.current?.setValues({
        title: post.title,
        body: post.body,
        desc: post.desc,
        author: post.author,
        type: post.type,
        status: post.status,
        slug: post.slug,
        cover: post.cover,
        secret: post.secret,
        tagIDs: post.tags?.map((el) => el.id),
        categoryID: post.categoryID,
      });
    }
  }, [data]);

  return (
    <PageLayout
      title={
        <Breadcrumb>
          <Breadcrumb.Item noLink>
            <Typography.Title className="!cursor-pointer" onClick={handleGoToPostList} heading={4}>
              文章列表
            </Typography.Title>
          </Breadcrumb.Item>
          <Breadcrumb.Item noLink>
            <Typography.Title heading={4}>编辑文章</Typography.Title>
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <PostForm formApiRef={formApiRef} />
      <div className="fixed bottom-4 right-16 flex space-x-4">
        <Button className="w-[220px]" theme="solid" icon={<IconEdit />} loading={isPending} onClick={handleUpdatePost}>
          更新
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

  function handleGoToPostList() {
    navigate(PATH.POST);
  }

  async function handleUpdatePost() {
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

import * as React from 'react';

import { Button, Form, Modal, Skeleton, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';
import { formatSlug } from '@/utils/slugify.ts';

import { QUERY } from '@/constants/query.ts';
import { REGEX } from '@/constants/regex.ts';

import { useGetCategory } from '@/features/category/hooks.ts';

import { placeholder } from './skeleton.tsx';

import { updateCategory } from '../services';
import { UpdateCategoryParams } from '../types';

type Props = {
  categoryID: string;
};

export const UpdateCategoryModal = NiceModal.create(({ categoryID }: Props) => {
  const modal = useModal();
  const formApiRef = React.useRef<FormApi<UpdateCategoryParams>>();

  const { data, isLoading, invalidateQueries } = useGetCategory(categoryID);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.CATEGORY, categoryID],
    mutationFn: (req: UpdateCategoryParams) => updateCategory(categoryID, req),
    async onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
      await invalidateQueries();
    },
  });

  return (
    <Modal title="编辑文章分类" {...semiModal(modal)} okButtonProps={{ loading: isPending }} onOk={handleOk}>
      <Skeleton placeholder={placeholder} loading={isLoading}>
        <Form
          autoComplete="off"
          getFormApi={(formApi) => (formApiRef.current = formApi)}
          initValues={
            {
              name: data?.data.name,
              slug: data?.data.slug,
            } as UpdateCategoryParams
          }
        >
          <Form.Input
            field="name"
            label="分类名称"
            placeholder="请输入分类名称"
            rules={[{ required: true, message: '分类名称必填' }]}
            showClear
          />
          <Form.Input
            field="slug"
            label="slug"
            placeholder="请输入slug"
            rules={[
              { pattern: REGEX.SLUG, message: '只允许输入数字、小写字母、”-“和“.”，并且不能以”-“或“.”开头和结尾' },
            ]}
            showClear
            suffix={
              <Button onClick={handleSlugify} theme="solid">
                格式化
              </Button>
            }
          />
        </Form>
      </Skeleton>
    </Modal>
  );

  async function handleOk() {
    await formApiRef.current?.validate();
    const values = formApiRef.current?.getValues() as UpdateCategoryParams;
    await mutateAsync(values);
    modal.resolve();
    await modal.hide();
  }

  function handleSlugify() {
    let slug = formApiRef.current?.getValue('slug');
    slug = formatSlug(slug);

    formApiRef.current?.setValue('slug', slug);
  }
});

import * as React from 'react';

import { Form, Modal, Skeleton, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';

import { QUERY } from '@/constants/query.ts';

import { placeholder } from './skeleton.tsx';

import { getCategory, updateCategory } from '../services';
import { UpdateCategoryParams } from '../types';

type Props = {
  categoryID: string;
};

export const UpdateCategoryModal = NiceModal.create(({ categoryID }: Props) => {
  const modal = useModal();
  const formApiRef = React.useRef<FormApi<UpdateCategoryParams>>();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY.CATEGORY, categoryID],
    queryFn: () => getCategory(categoryID),
    staleTime: 0,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.CATEGORY, categoryID],
    mutationFn: (req: UpdateCategoryParams) => updateCategory(categoryID, req),
    onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
    },
  });

  const handleOk = async () => {
    await formApiRef.current?.validate();
    const values = formApiRef.current?.getValues() as UpdateCategoryParams;
    await mutateAsync(values);
    modal.resolve();
    await modal.hide();
  };

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
            rules={[{ required: true, message: 'slug必填' }]}
            showClear
          />
        </Form>
      </Skeleton>
    </Modal>
  );
});

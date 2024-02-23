import * as React from 'react';

import { Form, Modal, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';

import { QUERY } from '@/constants/query.ts';

import { createCategory } from '../services';
import { CreateCategoryParams, UpdateCategoryParams } from '../types';

export const CreateCategoryModal = NiceModal.create(() => {
  const modal = useModal();
  const formApiRef = React.useRef<FormApi<UpdateCategoryParams>>();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.CATEGORY],
    mutationFn: (params: CreateCategoryParams) => createCategory(params),
    onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
    },
  });

  const handleOk = async () => {
    await formApiRef.current?.validate();
    const values = formApiRef.current?.getValues() as CreateCategoryParams;
    await mutateAsync(values);
    modal.resolve();
    await modal.hide();
  };

  return (
    <Modal title="新建文章分类" {...semiModal(modal)} okButtonProps={{ loading: isPending }} onOk={handleOk}>
      <Form autoComplete="off" getFormApi={(formApi) => (formApiRef.current = formApi)}>
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
    </Modal>
  );
});

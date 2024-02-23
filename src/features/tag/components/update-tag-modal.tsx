import * as React from 'react';

import { Form, Modal, Skeleton, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';

import { QUERY } from '@/constants/query.ts';

import { placeholder } from './skeleton.tsx';

import { getTag, updateTag } from '../services';
import { UpdateTagParams } from '../types';

type Props = {
  tagID: string;
};

const UpdateTagModal = NiceModal.create(({ tagID }: Props) => {
  const modal = useModal();
  const formApiRef = React.useRef<FormApi<UpdateTagParams>>();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY.TAG, tagID],
    queryFn: () => getTag(tagID),
    staleTime: 0,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.TAG, tagID],
    mutationFn: (req: UpdateTagParams) => updateTag(tagID, req),
    onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
    },
  });

  const handleOk = async () => {
    await formApiRef.current?.validate();
    const values = formApiRef.current?.getValues() as UpdateTagParams;
    await mutateAsync(values);
    modal.resolve();
    await modal.hide();
  };

  return (
    <Modal title="编辑文章标签" {...semiModal(modal)} okButtonProps={{ loading: isPending }} onOk={handleOk}>
      <Skeleton placeholder={placeholder} loading={isLoading}>
        <Form
          autoComplete="off"
          getFormApi={(formApi) => (formApiRef.current = formApi)}
          initValues={
            {
              name: data?.data.name,
              slug: data?.data.slug,
              icon: data?.data.icon,
            } as UpdateTagParams
          }
        >
          <Form.Input
            field="name"
            label="标签名称"
            placeholder="请输入标签名称"
            rules={[{ required: true, message: '标签名称必填' }]}
            showClear
          />
          <Form.Input
            field="slug"
            label="slug"
            placeholder="请输入slug"
            rules={[{ required: true, message: 'slug必填' }]}
            showClear
          />
          <Form.TextArea
            field="icon"
            label="icon"
            placeholder="请输入icon"
            autosize={{ minRows: 4, maxRows: 10 }}
            showClear
          />
        </Form>
      </Skeleton>
    </Modal>
  );
});

export default UpdateTagModal;

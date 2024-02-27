import * as React from 'react';

import { Button, Form, Modal, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';
import { formatSlug } from '@/utils/slugify.ts';

import { QUERY } from '@/constants/query.ts';
import { REGEX } from '@/constants/regex.ts';

import { createTag } from '../services';
import { CreateTagParams, UpdateTagParams } from '../types';

export const CreateTagModal = NiceModal.create(() => {
  const modal = useModal();
  const formApiRef = React.useRef<FormApi<UpdateTagParams>>();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.TAG],
    mutationFn: (params: CreateTagParams) => createTag(params),
    onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
    },
  });

  return (
    <Modal title="新建文章标签" {...semiModal(modal)} okButtonProps={{ loading: isPending }} onOk={handleOk}>
      <Form autoComplete="off" getFormApi={(formApi) => (formApiRef.current = formApi)}>
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
          rules={[
            { required: true, message: 'slug必填' },
            { pattern: REGEX.SLUG, message: '只允许输入数字、小写字母、”-“和“.”，并且不能以”-“或“.”开头和结尾' },
          ]}
          showClear
          suffix={
            <Button onClick={handleSlugify} theme="solid">
              格式化
            </Button>
          }
        />
        <Form.TextArea
          field="icon"
          label="icon"
          placeholder="请输入icon"
          autosize={{ minRows: 4, maxRows: 10 }}
          showClear
        />
      </Form>
    </Modal>
  );

  async function handleOk() {
    await formApiRef.current?.validate();
    const values = formApiRef.current?.getValues() as CreateTagParams;
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

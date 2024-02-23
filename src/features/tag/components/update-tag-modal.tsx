import * as React from 'react';

import { Button, Form, Modal, Skeleton, Toast } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';
import { formatSlug } from '@/utils/slugify.ts';

import { QUERY } from '@/constants/query.ts';
import { REGEX } from '@/constants/regex.ts';

import { useGetTag } from '@/features/tag/hooks.ts';

import { placeholder } from './skeleton.tsx';

import { updateTag } from '../services';
import { UpdateTagParams } from '../types';

type Props = {
  tagID: string;
};

export const UpdateTagModal = NiceModal.create(({ tagID }: Props) => {
  const modal = useModal();
  const formApiRef = React.useRef<FormApi<UpdateTagParams>>();

  const { data, isLoading, invalidateQueries } = useGetTag(tagID);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.TAG, tagID],
    mutationFn: (req: UpdateTagParams) => updateTag(tagID, req),
    async onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
      await invalidateQueries();
    },
  });

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
            rules={[{ pattern: REGEX.SLUG, message: '只允许输入数字、小写字母和-，并且不能以-开头和结尾' }]}
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
      </Skeleton>
    </Modal>
  );

  async function handleOk() {
    await formApiRef.current?.validate();
    const values = formApiRef.current?.getValues() as UpdateTagParams;
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

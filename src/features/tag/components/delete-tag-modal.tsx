import { Modal, Toast, Typography } from '@douyinfe/semi-ui';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';

import { QUERY } from '@/constants/query.ts';

import { deleteTag } from '../services';
import { Tag } from '../types';

type Props = {
  tag: Tag;
};

export const DeleteTagModal = NiceModal.create(({ tag }: Props) => {
  const modal = useModal();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.TAG, tag.id],
    mutationFn: () => deleteTag(tag.id),
    onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
    },
  });

  const handleOk = async () => {
    await mutateAsync();
    modal.resolve();
    await modal.hide();
  };

  return (
    <Modal title="删除文章标签" {...semiModal(modal)} okButtonProps={{ loading: isPending }} onOk={handleOk}>
      <Typography.Paragraph>
        确定要删除文章标签【<Typography.Text strong>{tag.name}</Typography.Text>】吗？
      </Typography.Paragraph>
    </Modal>
  );
});

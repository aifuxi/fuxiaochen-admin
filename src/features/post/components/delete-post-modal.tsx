import { Modal, Toast, Typography } from '@douyinfe/semi-ui';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';

import { QUERY } from '@/constants/query.ts';

import { deletePost } from '../services';
import { Post } from '../types';

type Props = {
  post: Post;
};

export const DeletePostModal = NiceModal.create(({ post }: Props) => {
  const modal = useModal();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.POST, post.id],
    mutationFn: () => deletePost(post.id),
    onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
    },
  });

  return (
    <Modal title="删除文章" {...semiModal(modal)} okButtonProps={{ loading: isPending }} onOk={handleOk}>
      <Typography.Paragraph>
        确定要删除文章【<Typography.Text strong>{post.title}</Typography.Text>】吗？
      </Typography.Paragraph>
    </Modal>
  );

  async function handleOk() {
    await mutateAsync();
    modal.resolve();
    await modal.hide();
  }
});

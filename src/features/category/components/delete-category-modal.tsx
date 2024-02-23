import { Modal, Toast, Typography } from '@douyinfe/semi-ui';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from '@tanstack/react-query';

import { semiModal } from '@/utils/helper.ts';

import { QUERY } from '@/constants/query.ts';

import { deleteCategory } from '../services';
import { Category } from '../types';

type Props = {
  category: Category;
};

export const DeleteCategoryModal = NiceModal.create(({ category }: Props) => {
  const modal = useModal();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY.CATEGORY, category.id],
    mutationFn: () => deleteCategory(category.id),
    onSuccess() {
      Toast.success({ theme: 'light', content: '操作成功' });
    },
  });

  return (
    <Modal title="删除文章标签" {...semiModal(modal)} okButtonProps={{ loading: isPending }} onOk={handleOk}>
      <Typography.Paragraph>
        确定要删除文章标签【<Typography.Text strong>{category.name}</Typography.Text>】吗？
      </Typography.Paragraph>
    </Modal>
  );

  async function handleOk() {
    await mutateAsync();
    modal.resolve();
    await modal.hide();
  }
});

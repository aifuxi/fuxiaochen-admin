import * as React from 'react';

import { Button, ButtonGroup, Table, Typography } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import NiceModal from '@ebay/nice-modal-react';
import { Updater } from 'use-immer';

import { DateText } from '@/components/text';

import { DeleteCategoryModal } from './delete-category-modal.tsx';
import { UpdateCategoryModal } from './update-category-modal.tsx';

import { Category, GetCategoriesParams } from '../types.ts';

type Props = {
  isLoading: boolean;
  invalidateQueries: () => Promise<void>;
  params: GetCategoriesParams;
  updateParams: Updater<GetCategoriesParams>;
  total: number;
  data: Category[];
};

export const SearchTable = ({ invalidateQueries, isLoading, total, data, params, updateParams }: Props) => {
  const scroll = React.useMemo(() => ({ y: 'calc(100vh - 320px)', x: '100%' }), []);

  const columns: ColumnProps<Category>[] = [
    {
      title: '分类名称',
      render: (_, record) => <Typography.Text>{record.name}</Typography.Text>,
    },
    {
      title: 'slug',
      render: (_, record) => <Typography.Text>{record.slug}</Typography.Text>,
    },
    {
      title: '创建时间',
      render: (_, record) => <DateText date={record.createdAt} />,
    },
    {
      title: '更新时间',
      render: (_, record) => <DateText date={record.updatedAt} />,
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <ButtonGroup theme="borderless">
            <Button onClick={() => handleEditCategory(record)}>编辑</Button>
            <Button type="danger" onClick={() => handleDeleteCategory(record)}>
              删除
            </Button>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      loading={isLoading}
      scroll={scroll}
      dataSource={data}
      pagination={{
        currentPage: params.page,
        pageSize: params.limit,
        showSizeChanger: true,
        total: total,
        onChange: (page, limit) => {
          updateParams((draft) => {
            draft.page = page;
            draft.limit = limit;
          });
        },
      }}
    />
  );

  async function handleEditCategory(record: Category) {
    await NiceModal.show(UpdateCategoryModal, { categoryID: record.id });
    await invalidateQueries();
  }

  async function handleDeleteCategory(record: Category) {
    await NiceModal.show(DeleteCategoryModal, { category: record });
    await invalidateQueries();
  }
};

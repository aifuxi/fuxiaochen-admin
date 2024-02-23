import * as React from 'react';

import { Button, ButtonGroup, Table, Typography } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import NiceModal from '@ebay/nice-modal-react';
import { Updater } from 'use-immer';

import '@/components/text';
import { DateText, HyphenText } from '@/components/text';

import { DeleteTagModal } from './delete-tag-modal.tsx';
import { UpdateTagModal } from './update-tag-modal.tsx';

import { GetTagsParams, Tag } from '../types.ts';

type Props = {
  isLoading: boolean;
  invalidateQueries: () => Promise<void>;
  params: GetTagsParams;
  updateParams: Updater<GetTagsParams>;
  total: number;
  data: Tag[];
};

export const SearchTable = ({ invalidateQueries, isLoading, total, data, params, updateParams }: Props) => {
  const scroll = React.useMemo(() => ({ y: 'calc(100vh - 320px)', x: '100%' }), []);

  const columns: ColumnProps<Tag>[] = [
    {
      title: '标签名称',
      render: (_, record) => <Typography.Text>{record.name}</Typography.Text>,
    },
    {
      title: '图标',
      render: (_, record) => {
        if (record.icon) {
          return <img src={record.icon} className="w-6 h-6" alt={record.name} />;
        } else {
          return <HyphenText />;
        }
      },
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
            <Button onClick={() => handleEditTag(record)}>编辑</Button>
            <Button type="danger" onClick={() => handleDeleteTag(record)}>
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

  async function handleEditTag(record: Tag) {
    await NiceModal.show(UpdateTagModal, { tagID: record.id });
    await invalidateQueries();
  }

  async function handleDeleteTag(record: Tag) {
    await NiceModal.show(DeleteTagModal, { tag: record });
    await invalidateQueries();
  }
};

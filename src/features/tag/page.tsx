import * as React from 'react';

import { IconPlus } from '@douyinfe/semi-icons';
import { Button, ButtonGroup, Table, Typography } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import NiceModal from '@ebay/nice-modal-react';

import { formatDate } from '@/utils/time.ts';

import { queryClient } from '@/constants/query.ts';
import { DEFAULT_PAGINATION_PARAMS } from '@/constants/unknown.ts';

import PageLayout from '@/components/layout/page-layout';
import CreateTagModal from '@/features/tag/components/create-tag-modal.tsx';
import DeleteTagModal from '@/features/tag/components/delete-tag-modal.tsx';
import UpdateTagModal from '@/features/tag/components/update-tag-modal.tsx';

import { useGetTags } from './hooks';
import { GetTagsParams, Tag } from './types';

const TagListPage = () => {
  const [params, setParams] = React.useState<GetTagsParams>({ ...DEFAULT_PAGINATION_PARAMS });

  const { data, isLoading, queryKey } = useGetTags(params);

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };

  const handleCreateTag = async () => {
    await NiceModal.show(CreateTagModal);
    await invalidateQueries();
  };

  const handleEditTag = async (record: Tag) => {
    await NiceModal.show(UpdateTagModal, { tagID: record.id });
    await invalidateQueries();
  };

  const handleDeleteTag = async (record: Tag) => {
    await NiceModal.show(DeleteTagModal, { tag: record });
    await invalidateQueries();
  };

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
          return <Typography.Text>-</Typography.Text>;
        }
      },
    },
    {
      title: 'slug',
      render: (_, record) => <Typography.Text>{record.slug}</Typography.Text>,
    },
    {
      title: '创建时间',
      render: (_, record) => <Typography.Text>{formatDate(record.createdAt)}</Typography.Text>,
    },
    {
      title: '更新时间',
      render: (_, record) => <Typography.Text>{formatDate(record.updatedAt)}</Typography.Text>,
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
    <PageLayout title="文章标签">
      <div className="grid grid-cols-1 gap-y-3">
        <div className="flex justify-end">
          <Button theme="solid" icon={<IconPlus />} onClick={handleCreateTag}>
            新建文章标签
          </Button>
        </div>
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={data?.data}
          pagination={{
            currentPage: params.page,
            pageSize: params.limit,
            showSizeChanger: true,
            total: data?.total,
            onChange: (page, limit) => {
              setParams({
                page,
                limit,
              });
            },
          }}
        />
      </div>
    </PageLayout>
  );
};

export default TagListPage;

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { generatePath } from 'react-router-dom';

import { Button, ButtonGroup, Tag as SemiTag, Table, Typography } from '@douyinfe/semi-ui';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import NiceModal from '@ebay/nice-modal-react';
import { Updater } from 'use-immer';

import { PATH } from '@/constants/path.ts';

import { DateText, HyphenText } from '@/components/text';
import { postStatusMap, postTypeMap } from '@/features/post/config.tsx';

import { DeletePostModal } from './delete-post-modal.tsx';

import { GetPostsParams, Post } from '../types.ts';

type Props = {
  isLoading: boolean;
  invalidateQueries: () => Promise<void>;
  params: GetPostsParams;
  updateParams: Updater<GetPostsParams>;
  total: number;
  data: Post[];
};

export const SearchTable = ({ invalidateQueries, isLoading, total, data, params, updateParams }: Props) => {
  const navigate = useNavigate();
  const scroll = React.useMemo(() => ({ y: 'calc(100vh - 320px)', x: '100%' }), []);

  const columns: ColumnProps<Post>[] = [
    {
      title: '标题',
      width: 180,
      render: (_, record) => <Typography.Text ellipsis={{ showTooltip: true }}>{record.title}</Typography.Text>,
    },
    {
      title: '封面',
      width: 180,
      render: (_, record) => {
        if (!record.cover) {
          return <HyphenText />;
        }

        return <img src={record.cover} alt={record.title} className="w-[120px] h-auto" />;
      },
    },
    {
      title: '描述',
      width: 180,
      render: (_, record) => <Typography.Text ellipsis={{ showTooltip: true }}>{record.desc}</Typography.Text>,
    },
    {
      title: '作者',
      width: 120,
      render: (_, record) => <Typography.Text>{record.author}</Typography.Text>,
    },
    {
      title: 'slug',
      width: 180,
      render: (_, record) => <Typography.Text ellipsis={{ showTooltip: true }}>{record.slug}</Typography.Text>,
    },
    {
      title: '类型',
      width: 120,
      render: (_, record) => {
        return postTypeMap[record.type] ?? <HyphenText />;
      },
    },
    {
      title: '状态',
      width: 120,
      render: (_, record) => {
        return postStatusMap[record.status] ?? <HyphenText />;
      },
    },
    {
      title: '文章标签',
      width: 200,
      render: (_, record) => {
        if (!record?.tags?.length) {
          return <HyphenText />;
        }
        return (
          <div className="flex gap-x-1">
            {record?.tags?.map((el) => (
              <SemiTag key={el.id}>
                {el.icon && <img className="!w-3.5 !h-3.5 text-sm mr-0.5" src={el.icon} alt={el.name} />}
                {el.name}
              </SemiTag>
            ))}
          </div>
        );
      },
    },
    {
      title: '创建时间',
      width: 180,
      render: (_, record) => <DateText date={record.createdAt} />,
    },
    {
      title: '更新时间',
      width: 180,
      render: (_, record) => <DateText date={record.updatedAt} />,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 180,
      render: (_, record) => {
        return (
          <ButtonGroup theme="borderless">
            <Button onClick={() => handleEditPost(record)}>编辑</Button>
            <Button type="danger" onClick={() => handleDeletePost(record)}>
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
      rowKey={(record) => record?.id ?? ''}
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

  function handleEditPost(record: Post) {
    navigate(generatePath(`${PATH.POST_EDIT}/:id`, { id: record.id }));
  }

  async function handleDeletePost(record: Post) {
    await NiceModal.show(DeletePostModal, { post: record });
    await invalidateQueries();
  }
};

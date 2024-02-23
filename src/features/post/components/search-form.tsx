import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { IconPlus } from '@douyinfe/semi-icons';
import { Button, Form } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import { Updater } from 'use-immer';

import { PATH } from '@/constants/path.ts';

import { defaultParams } from '../config';
import { GetPostsParams } from '../types.ts';

type Props = {
  updateParams: Updater<GetPostsParams>;
};

export const SearchForm = ({ updateParams }: Props) => {
  const navigate = useNavigate();
  const formApiRef = React.useRef<FormApi<GetPostsParams>>();

  return (
    <Form
      autoComplete="off"
      labelPosition="inset"
      getFormApi={(formApi) => (formApiRef.current = formApi)}
      className="flex gap-x-3"
    >
      <Form.Input field="name" label="文章标题" placeholder="请输入" showClear onEnterPress={handleSearch} />
      <Form.Input field="author" label="文章作者" placeholder="请输入" showClear onEnterPress={handleSearch} />

      <Form.Slot noLabel className="flex-1">
        <div className="flex gap-x-3">
          <Button theme="solid" onClick={handleSearch}>
            搜索
          </Button>
          <Button onClick={handleReset}>重置</Button>
          <div className="flex-1 flex justify-end">
            <Button theme="solid" icon={<IconPlus />} onClick={handleCreatePost}>
              新建文章
            </Button>
          </div>
        </div>
      </Form.Slot>
    </Form>
  );

  async function handleSearch() {
    const values = formApiRef.current?.getValues();
    updateParams((draft) => {
      draft.title = values?.title;
    });
  }

  async function handleReset() {
    formApiRef.current?.reset();
    updateParams(defaultParams);
  }

  function handleCreatePost() {
    navigate(PATH.POST_CREATE);
  }
};

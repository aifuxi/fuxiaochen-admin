import * as React from 'react';

import { IconPlus } from '@douyinfe/semi-icons';
import { Button, Form } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal from '@ebay/nice-modal-react';
import { Updater } from 'use-immer';

import { CreateTagModal } from './create-tag-modal.tsx';

import { defaultParams } from '../config.ts';
import { GetTagsParams } from '../types.ts';

type Props = {
  invalidateQueries: () => Promise<void>;
  updateParams: Updater<GetTagsParams>;
};

export const SearchForm = ({ invalidateQueries, updateParams }: Props) => {
  const formApiRef = React.useRef<FormApi<GetTagsParams>>();

  return (
    <Form
      autoComplete="off"
      labelPosition="inset"
      getFormApi={(formApi) => (formApiRef.current = formApi)}
      className="flex gap-x-3"
    >
      <Form.Input field="name" label="标签名称" placeholder="请输入" showClear onEnterPress={handleSearch} />

      <Form.Slot noLabel className="flex-1">
        <div className="flex gap-x-3">
          <Button theme="solid" onClick={handleSearch}>
            搜索
          </Button>
          <Button onClick={handleReset}>重置</Button>
          <div className="flex-1 flex justify-end">
            <Button theme="solid" icon={<IconPlus />} onClick={handleCreateTag}>
              新建文章标签
            </Button>
          </div>
        </div>
      </Form.Slot>
    </Form>
  );

  async function handleCreateTag() {
    await NiceModal.show(CreateTagModal);
    await invalidateQueries();
  }

  async function handleSearch() {
    const values = formApiRef.current?.getValues();
    updateParams((draft) => {
      draft.name = values?.name;
    });
  }

  async function handleReset() {
    formApiRef.current?.reset();
    updateParams(defaultParams);
  }
};

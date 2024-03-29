import * as React from 'react';

import { Button, Form } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal from '@ebay/nice-modal-react';

import { formatSlug } from '@/utils/slugify.ts';

import { REGEX } from '@/constants/regex.ts';

import { UploadField } from '@/components/form';
import { BytemdField } from '@/components/form/bytemd-field.tsx';
import { CreateCategoryModal, useGetCategories } from '@/features/category';
import { CreateTagModal, useGetTags } from '@/features/tag';

import { POST_STATUS_ENUM, POST_TYPE_ENUM, postStatusOptions, postTypeOptions } from '../config.tsx';
import { CreatePostParams } from '../types.ts';

type Props = {
  formApiRef: React.MutableRefObject<FormApi | undefined>;
};

export const PostForm = ({ formApiRef }: Props) => {
  const { data: getTagsData, invalidateQueries: invalidateGetTagsQueries } = useGetTags({ page: 1, limit: 100 });
  const { data: getCategoriesData, invalidateQueries: invalidateGetCategoriesQueries } = useGetCategories({
    page: 1,
    limit: 100,
  });

  return (
    <Form
      autoComplete="off"
      getFormApi={(formApi) => (formApiRef.current = formApi)}
      initValues={
        { author: '付小晨', type: POST_TYPE_ENUM.ORIGINAL, status: POST_STATUS_ENUM.PUBLISHED } as CreatePostParams
      }
    >
      {({ formState }) => (
        <React.Fragment>
          <Form.Input
            field="title"
            label="文章标题"
            placeholder="请输入文章标题"
            rules={[{ required: true, message: '文章标题必填' }]}
            showClear
          />
          <Form.Input
            field="slug"
            label="slug"
            placeholder="请输入slug"
            rules={[
              { required: true, message: 'slug必填' },
              { pattern: REGEX.SLUG, message: '只允许输入数字、小写字母、”-“和“.”，并且不能以”-“或“.”开头和结尾' },
            ]}
            showClear
            suffix={
              <Button onClick={handleSlugify} theme="solid">
                格式化
              </Button>
            }
          />
          <UploadField field="cover" label="文章封面" />
          <Form.TextArea
            field="desc"
            label="文章描述"
            placeholder="请输入文章描述"
            rules={[{ required: true, message: '文章描述必填' }]}
            autosize={{ minRows: 4, maxRows: 10 }}
            showClear
          />
          <Form.Input
            field="author"
            label="文章作者"
            placeholder="请输入文章作者"
            rules={[{ required: true, message: '文章作者必填' }]}
            showClear
          />
          <Form.Select
            field="type"
            className="w-full"
            label="文章类型"
            placeholder="请选择文章类型"
            rules={[{ required: true, message: '文章类型必填' }]}
            showClear
          >
            {postTypeOptions.map((el) => (
              <Form.Select.Option key={el.value} label={el.label} value={el.value}></Form.Select.Option>
            ))}
          </Form.Select>
          <Form.Select
            field="status"
            className="w-full"
            label="文章状态"
            placeholder="请选择文章状态"
            rules={[{ required: true, message: '文章状态必填' }]}
            showClear
          >
            {postStatusOptions.map((el) => (
              <Form.Select.Option key={el.value} label={el.label} value={el.value}></Form.Select.Option>
            ))}
          </Form.Select>
          {formState.values?.status === POST_STATUS_ENUM.SECRET && (
            <Form.Input
              field="secret"
              label="文章密码"
              placeholder="请输入文章密码"
              rules={[{ required: true, message: '文章加密状态密码必填' }]}
              showClear
            />
          )}
          <Form.Select
            field="categoryID"
            className="w-full"
            label="文章分类"
            placeholder="请选择文章分类"
            rules={[{ required: true, message: '文章分类必填' }]}
            suffix={
              <Button theme="borderless" onClick={handleCreateCategory}>
                没有找到合适的分类？新建一个
              </Button>
            }
            showClear
          >
            {getCategoriesData?.data?.map((el) => (
              <Form.Select.Option key={el.id} label={el.name} value={el.id}></Form.Select.Option>
            ))}
          </Form.Select>
          <Form.Select
            field="tagIDs"
            className="w-full"
            label="文章标签"
            placeholder="请选择文章标签"
            rules={[{ required: true, message: '文章标签必填' }]}
            multiple
            suffix={
              <Button theme="borderless" onClick={handleCreateTag}>
                没有找到合适的标签？新建一个
              </Button>
            }
            showClear
          >
            {getTagsData?.data?.map((el) => (
              <Form.Select.Option
                key={el.id}
                label={
                  <>
                    {el.icon && <img className="!w-4 !h-4 text-sm mr-2" src={el.icon} alt={el.name} />}
                    {el.name}
                  </>
                }
                value={el.id}
              ></Form.Select.Option>
            ))}
          </Form.Select>

          <BytemdField field="body" label="文章内容" rules={[{ required: true, message: '文章内容必填' }]} />
        </React.Fragment>
      )}
    </Form>
  );

  function handleSlugify() {
    let slug = formApiRef.current?.getValue('slug');
    slug = formatSlug(slug);

    formApiRef.current?.setValue('slug', slug);
  }

  async function handleCreateCategory(e: React.MouseEvent<HTMLButtonElement>) {
    // 阻止冒泡，防止点击的时候展开选择框
    e.stopPropagation();

    await NiceModal.show(CreateCategoryModal);
    await invalidateGetCategoriesQueries();
  }

  async function handleCreateTag(e: React.MouseEvent<HTMLButtonElement>) {
    // 阻止冒泡，防止点击的时候展开选择框
    e.stopPropagation();

    await NiceModal.show(CreateTagModal);
    await invalidateGetTagsQueries();
  }
};

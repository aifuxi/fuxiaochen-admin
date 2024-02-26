import * as React from 'react';

import { IconPlus } from '@douyinfe/semi-icons';
import { Button, Form, Upload } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import NiceModal from '@ebay/nice-modal-react';

import { formatSlug } from '@/utils/slugify.ts';

import { REGEX } from '@/constants/regex.ts';

import { PageLayout } from '@/components/layout';
import { CreateCategoryModal } from '@/features/category/components';
import { useGetCategories } from '@/features/category/hooks.ts';
import { POST_STATUS_ENUM, postStatusOptions, postTypeOptions } from '@/features/post/config.tsx';
import { CreateTagModal } from '@/features/tag/components';
import { useGetTags } from '@/features/tag/hooks.ts';

import { CreatePostParams } from '../types.ts';

export const CreatePostPage = () => {
  const formApiRef = React.useRef<FormApi<CreatePostParams>>();
  const { data: getTagsData, invalidateQueries: invalidateGetTagsQueries } = useGetTags({ page: 1, limit: 100 });
  const { data: getCategoriesData, invalidateQueries: invalidateGetCategoriesQueries } = useGetCategories({
    page: 1,
    limit: 100,
  });

  return (
    <PageLayout title="创建文章">
      <Upload
        action={'/admin-api/v1/upload'}
        listType="picture"
        accept="image/*"
        limit={1}
        defaultFileList={[]}
        picHeight={110}
        picWidth={200}
      >
        <IconPlus size="extra-large" style={{ margin: 4 }} />
        点击添加图片
      </Upload>

      <Form autoComplete="off" getFormApi={(formApi) => (formApiRef.current = formApi)}>
        {({ formState }) => (
          <React.Fragment>
            <Form.Input
              field="name"
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
                { pattern: REGEX.SLUG, message: '只允许输入数字、小写字母和-，并且不能以-开头和结尾' },
              ]}
              showClear
              suffix={
                <Button onClick={handleSlugify} theme="solid">
                  格式化
                </Button>
              }
            />
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
          </React.Fragment>
        )}
      </Form>
    </PageLayout>
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

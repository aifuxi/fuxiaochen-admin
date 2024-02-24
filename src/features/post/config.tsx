import * as React from 'react';

import { Tag as SemiTag } from '@douyinfe/semi-ui';
import type { OptionProps } from '@douyinfe/semi-ui/lib/es/select';

import { DEFAULT_PAGINATION_PARAMS } from '@/constants/unknown.ts';

import { GetPostsParams } from './types.ts';

export const defaultParams: GetPostsParams = {
  ...DEFAULT_PAGINATION_PARAMS,
};

export enum POST_TYPE_ENUM {
  // 原创
  ORIGINAL = 1,
  // 转载
  REPRINT = 2,
  // 翻译
  TRANSLATE = 3,
}

export enum POST_STATUS_ENUM {
  // 已发布
  PUBLISHED = 1,
  // 草稿
  DRAFT = 2,
  // 加密
  SECRET = 3,
}

export const postTypeMap: Record<number, React.ReactNode> = {
  [POST_TYPE_ENUM.ORIGINAL]: <SemiTag color="teal">原创</SemiTag>,
  [POST_TYPE_ENUM.REPRINT]: <SemiTag color="indigo">转载</SemiTag>,
  [POST_TYPE_ENUM.TRANSLATE]: <SemiTag color="orange">翻译</SemiTag>,
};

export const postStatusMap: Record<number, React.ReactNode> = {
  [POST_STATUS_ENUM.PUBLISHED]: <SemiTag color="teal">已发布</SemiTag>,
  [POST_STATUS_ENUM.DRAFT]: <SemiTag color="grey">草稿</SemiTag>,
  [POST_STATUS_ENUM.SECRET]: <SemiTag color="orange">加密</SemiTag>,
};

export const postTypeOptions: OptionProps[] = [
  {
    label: postTypeMap[POST_TYPE_ENUM.ORIGINAL],
    value: POST_TYPE_ENUM.ORIGINAL,
  },
  {
    label: postTypeMap[POST_TYPE_ENUM.REPRINT],
    value: POST_TYPE_ENUM.REPRINT,
  },
  {
    label: postTypeMap[POST_TYPE_ENUM.TRANSLATE],
    value: POST_TYPE_ENUM.TRANSLATE,
  },
];

export const postStatusOptions: OptionProps[] = [
  {
    label: postStatusMap[POST_STATUS_ENUM.PUBLISHED],
    value: POST_STATUS_ENUM.PUBLISHED,
  },
  {
    label: postStatusMap[POST_STATUS_ENUM.DRAFT],
    value: POST_STATUS_ENUM.DRAFT,
  },
  {
    label: postStatusMap[POST_STATUS_ENUM.SECRET],
    value: POST_STATUS_ENUM.SECRET,
  },
];

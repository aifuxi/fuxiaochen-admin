import { stringifyParams } from '@/utils/helper.ts';
import { x } from '@/utils/request.ts';

import { ResponseStruct, ResponseTotalStruct } from '@/types/common';
import { CreateTagParams, GetTagsParams, Tag, UpdateTagParams } from '@/types/tag';

export const getTags = (params: GetTagsParams): Promise<ResponseTotalStruct<Tag[]>> => {
  return x.get(`/tags?${stringifyParams(params)}`);
};

export const getTag = (id: string): Promise<ResponseStruct<Tag>> => {
  return x.get(`/tags/${id}`);
};

export const createTag = (params: CreateTagParams): Promise<ResponseStruct<Tag>> => {
  return x.post('/tags', params);
};

export const updateTag = (id: string, params: UpdateTagParams): Promise<ResponseStruct<Tag>> => {
  return x.patch(`/tags/${id}`, params);
};

export const deleteTag = (id: string): Promise<ResponseStruct<Tag>> => {
  return x.delete(`/tags/${id}`);
};

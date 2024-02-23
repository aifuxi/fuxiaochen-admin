import { stringifyParams } from '@/utils/helper';
import { x } from '@/utils/request';

import { ResponseStruct, ResponseTotalStruct } from '@/types/common';

import { Category, CreateCategoryParams, GetCategoriesParams, UpdateCategoryParams } from './types';

export const getCategories = (params: GetCategoriesParams): Promise<ResponseTotalStruct<Category[]>> => {
  return x.get(`/categories?${stringifyParams(params)}`);
};

export const getCategory = (id: string): Promise<ResponseStruct<Category>> => {
  return x.get(`/categories/${id}`);
};

export const createCategory = (params: CreateCategoryParams): Promise<ResponseStruct<Category>> => {
  return x.post('/categories', params);
};

export const updateCategory = (id: string, params: UpdateCategoryParams): Promise<ResponseStruct<Category>> => {
  return x.patch(`/categories/${id}`, params);
};

export const deleteCategory = (id: string): Promise<ResponseStruct<Category>> => {
  return x.delete(`/categories/${id}`);
};

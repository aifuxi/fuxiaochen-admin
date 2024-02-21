import { x } from '@/utils/request.ts';

import { Category, CreateCategoryParams, UpdateCategoryParams } from '@/types/category';
import { ResponseStruct, ResponseTotalStruct } from '@/types/common';

export const getCategories = (): Promise<ResponseTotalStruct<Category[]>> => {
  return x.get('/categories');
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

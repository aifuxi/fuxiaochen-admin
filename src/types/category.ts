import { Model, PaginationParams } from '@/types/common';

export type Category = Model & {
  name: string;
  slug: boolean;
};

export type CreateCategoryParams = {
  name: string;
  slug: string;
};

export type UpdateCategoryParams = Partial<CreateCategoryParams>;
export type GetCategoriesParams = PaginationParams;
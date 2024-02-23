import { Category } from '@/features/category';
import { Tag } from '@/features/tag';
import { Model, PaginationParams } from '@/types';

export type Post = Model & {
  title: string;
  body: string;
  desc: string;
  author: string;
  type: number;
  status: number;
  slug: string;
  cover?: string;
  secret?: string;
  tags?: Tag[];
  category?: Category;
};

export type CreatePostParams = {
  title: string;
  body: string;
  desc: string;
  author: string;
  type: number;
  status: number;
  slug: string;
  cover?: string;
  secret?: string;
  tagIDs?: string[];
  categoryID?: string;
};

export type UpdatePostParams = Partial<CreatePostParams>;

export type GetPostsParams = PaginationParams;

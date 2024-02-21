import { Category } from '@/types/category';
import { Model } from '@/types/common';
import { Tag } from '@/types/tag';

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

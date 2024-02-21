import { Model } from '@/types/common';

export type Tag = Model & {
  name: string;
  slug: boolean;
  icon?: string;
};

export type CreateTagParams = {
  name: string;
  slug: string;
  icon?: string;
};

export type UpdateTagParams = Partial<CreateTagParams>;

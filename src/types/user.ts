import { Model } from '@/types/common';

export interface User extends Model {
  name: string;
  isAdmin: boolean;
}

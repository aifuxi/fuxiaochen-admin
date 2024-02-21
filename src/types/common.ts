export interface ResponseStruct<T> {
  code: number;
  msg: string;
  data: T;
}

export interface ResponseTotalStruct<K> extends ResponseStruct<K> {
  total: number;
}

export type Model = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

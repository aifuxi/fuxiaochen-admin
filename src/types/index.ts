export type ResponseStruct<T> = {
  code: number;
  msg: string;
  data: T;
};

export type ResponseTotalStruct<K> = ResponseStruct<K> & {
  total: number;
};

export type Model = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

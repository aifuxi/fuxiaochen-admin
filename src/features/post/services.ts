import { stringifyParams } from '@/utils/helper.ts';
import { x } from '@/utils/request.ts';

import { ResponseStruct, ResponseTotalStruct } from '@/types';

import { CreatePostParams, GetPostsParams, Post, UpdatePostParams } from './types';

export const getPosts = (params: GetPostsParams): Promise<ResponseTotalStruct<Post[]>> => {
  return x.get(`/posts?${stringifyParams(params)}`);
};

export const getPost = (id: string): Promise<ResponseStruct<Post>> => {
  return x.get(`/posts/${id}`);
};

export const createPost = (params: CreatePostParams): Promise<ResponseStruct<Post>> => {
  return x.post('/posts', params);
};

export const updatePost = (id: string, params: UpdatePostParams): Promise<ResponseStruct<Post>> => {
  return x.patch(`/posts/${id}`, params);
};

export const deletePost = (id: string): Promise<ResponseStruct<Post>> => {
  return x.delete(`/posts/${id}`);
};

export const PATH = {
  // basename
  BASENAME: '/admin',

  // api 前缀
  API_BASE_URL: '/admin-api/v1',

  // 登录
  LOGIN: '/login',

  // 首页
  HOME: '/',

  // 测试页
  TEST: '/test',

  // 文章标签页
  TAG: '/tags',

  // 文章分类页
  CATEGORY: '/categories',

  // 文章页
  POST: '/posts',
  // 创建文章页
  POST_CREATE: '/posts/create',
  // 编辑文章页
  POST_EDIT: '/posts/edit',
} as const;

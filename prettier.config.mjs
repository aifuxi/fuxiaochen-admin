/** @type {import('prettier').Config & import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  printWidth: 120,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^react',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '@components/(.*)',
    '@/typings/(.*)',
    '@/libs/(.*)',
    '@/utils/(.*)',
    '@/constants/(.*)',
    '@/.*',
    '^./(.*)',
    '^../(.*)',
    /** 样式文件单独分组，放最下面 */
    '.(css|less|scss|sass|stylus)$',
  ],
};

export default config;

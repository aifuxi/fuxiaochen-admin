import * as React from 'react';

import { Typography } from '@douyinfe/semi-ui';

type Props = {
  children: React.ReactNode;
  title?: React.ReactNode;
};

export const PageLayout = ({ children, title }: Props) => {
  return (
    <div className="p-10 flex-1 flex flex-col overflow-y-auto">
      {title && <Typography.Title heading={4}>{title}</Typography.Title>}
      {children}
    </div>
  );
};

import * as React from 'react';

import { Typography } from '@douyinfe/semi-ui';

type Props = {
  children: React.ReactNode;
  title?: string;
};

const PageLayout = ({ children, title }: Props) => {
  return (
    <div className="p-10 flex-1 flex flex-col">
      {title && <Typography.Title heading={4}>{title}</Typography.Title>}
      {children}
    </div>
  );
};

export default PageLayout;

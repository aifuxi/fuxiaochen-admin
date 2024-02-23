import { Typography } from '@douyinfe/semi-ui';
import { isNil } from 'lodash-es';

import { formatDate } from '@/utils/time.ts';

type Props = {
  date?: Date;
};

export const DateText = ({ date }: Props) => {
  return isNil(date) ? <Typography.Text>-</Typography.Text> : <Typography.Text>{formatDate(date)}</Typography.Text>;
};

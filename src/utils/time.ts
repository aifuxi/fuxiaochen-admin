import { format } from 'date-fns';

export const formatDate = (d: Date) => {
  return format(d, 'yyyy/MM/dd HH:mm:ss');
};

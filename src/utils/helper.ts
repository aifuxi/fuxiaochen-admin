import clsx, { ClassValue } from 'clsx';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const stringifyParams = (params: Record<string, never>): string => {
  return qs.stringify(params);
};

import { NiceModalHandler } from '@ebay/nice-modal-react/src';
import clsx, { ClassValue } from 'clsx';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const stringifyParams = (params: unknown): string => {
  return qs.stringify(params);
};

export const getBearerToken = (token: string) => {
  return `Bearer ${token}`;
};

export const semiModal = (
  modal: NiceModalHandler,
): {
  visible: boolean;
  centered: boolean;
  maskClosable: boolean;
  onCancel: () => void;
  onOk: () => void;
  afterClose: () => void;
} => {
  return {
    visible: modal.visible,
    onOk: () => modal.hide(),
    onCancel: () => modal.hide(),
    centered: true,
    maskClosable: false,
    afterClose: () => {
      // Need to resolve before remove
      modal.resolveHide();
      if (!modal.keepMounted) modal.remove();
    },
  };
};

export const semiSideSheet = (
  modal: NiceModalHandler,
): { visible: boolean; onClose: () => void; afterVisibleChange: (visible: boolean) => void } => {
  return {
    visible: modal.visible,
    onClose: () => modal.hide(),
    afterVisibleChange: (v: boolean) => {
      if (!v) {
        modal.resolveHide();
      }
      !v && !modal.keepMounted && modal.remove();
    },
  };
};

export const formatFileSize = (size: number) => {
  if (size < 1024) {
    return size + ' B';
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
};

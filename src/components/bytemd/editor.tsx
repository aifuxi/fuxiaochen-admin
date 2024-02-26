import { Editor, type EditorProps } from '@bytemd/react';
import { Toast } from '@douyinfe/semi-ui';
import zh_Hans from 'bytemd/locales/zh_Hans.json';

import { x } from '@/utils/request.ts';

import { CODE } from '@/constants/code.ts';

import { ResponseStruct } from '@/types';

import { plugins, sanitize } from './config';

type Props = {
  value?: string;
  onChange?: (v: string) => void;
  editorProps?: Partial<EditorProps>;
};

export const BytemdEditor = ({ value, onChange, editorProps }: Props) => {
  const handleUploadImages: EditorProps['uploadImages'] = async (files) => {
    const file = files[0];
    if (file) {
      const fd = new FormData();
      fd.append('file', file);
      const resp: ResponseStruct<{ url: string }> = await x.post('/upload', fd);
      if (resp.code === CODE.SUCCESS) {
        Toast.success({ theme: 'light', content: '上传成功' });
        return [
          {
            url: resp.data.url,
          },
        ];
      } else {
        Toast.error({ theme: 'light', content: `上传失败，${resp.msg}` });
        return [];
      }
    } else {
      return [];
    }
  };

  return (
    <Editor
      value={value ?? ''}
      plugins={plugins}
      placeholder="请输入内容..."
      sanitize={sanitize}
      onChange={(v) => onChange?.(v)}
      uploadImages={handleUploadImages}
      locale={zh_Hans}
      editorConfig={{
        ...editorProps,
      }}
    />
  );
};

import * as React from 'react';

import { IconPlus } from '@douyinfe/semi-icons';
import { Input, Typography, Upload, withField } from '@douyinfe/semi-ui';
import { FileItem, UploadProps } from '@douyinfe/semi-ui/lib/es/upload';

import { getBearerToken } from '@/utils/helper.ts';

import { CODE } from '@/constants/code.ts';

import { useMount } from '@/hooks';
import { useCurrentUserStore } from '@/stores/current-user.ts';
import { ResponseStruct } from '@/types';

type WithFieldProps = {
  onChange?: (v: string) => void;
  value?: string;
};

const CustomerUpload = ({ onChange, value }: WithFieldProps) => {
  const [fileList, setFileList] = React.useState<FileItem[]>([]);
  const token = useCurrentUserStore((state) => state.token);

  useMount(() => {
    if (!value) {
      setFileList([]);
    } else {
      setFileList([
        {
          url: value,
          uid: `${Date.now()}`,
          name: value,
          status: 'success',
          size: 'unknown',
          preview: true,
        },
      ]);
    }
  });

  const handleChange: UploadProps['onChange'] = ({ currentFile, fileList }) => {
    if (!fileList.length) {
      setFileList([]);
      onChange?.('');
      return;
    }

    if (currentFile.status === 'success') {
      const resp = currentFile.response as ResponseStruct<{ url: string }>;

      if (resp.code === CODE.SUCCESS) {
        setFileList([{ ...currentFile, type: currentFile?.fileInstance?.type, url: resp.data.url }]);
        onChange?.(resp.data.url);
      } else {
        setFileList([]);
        onChange?.('');
      }
    } else {
      const newFileList = [...fileList];
      setFileList(newFileList);
    }
  };

  const handleAfterUpload: UploadProps['afterUpload'] = ({ response }) => {
    const resp = response as ResponseStruct<{ url: string }>;

    if (resp.code !== CODE.SUCCESS) {
      return {
        status: 'uploadFail',
        validateMessage: resp.msg,
      };
    }

    return {
      status: 'success',
    };
  };

  return (
    <div className="grid gap-y-2">
      <Input value={value} placeholder="手动输入文章封面URL地址" showClear onChange={handleInputChange} />
      <Typography.Paragraph>或</Typography.Paragraph>
      <Upload
        action={'/admin-api/v1/upload'}
        listType="picture"
        accept="image/*"
        limit={1}
        fileName="file"
        fileList={fileList}
        picHeight={110}
        picWidth={200}
        headers={{
          Authorization: getBearerToken(token ?? ''),
        }}
        onChange={handleChange}
        afterUpload={handleAfterUpload}
      >
        <IconPlus size="extra-large" />
        点击上传图片
      </Upload>
    </div>
  );

  function handleInputChange(v: string) {
    onChange?.(v);
    if (!value) {
      setFileList([]);
    } else {
      setFileList([
        {
          url: value,
          uid: `${Date.now()}`,
          name: value,
          status: 'success',
          size: 'unknown',
          preview: true,
        },
      ]);
    }
  }
};

export const UploadField = withField(CustomerUpload);

import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import React from 'react';
import { useAuth } from '../../providers/auth';
import { HomeContent } from '../common';

export const UploadFile: React.FC = () => {
  const { organisationId } = useAuth();

  const draggerProps: UploadProps = {
    name: 'file',
    multiple: true,
    accept: 'csv',
    data: file => {
      return {
        ...file,
        file_name: organisationId
      };
    },
    action:
      'https://a7c6nds77sgkzgs22ldndv2jxm0wzbeh.lambda-url.us-east-1.on.aws/',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    }
  };

  return (
    <HomeContent title="Upload File">
      <div className="flex justify-center bg-white rounded-lg p-10">
        <div className="w-auto md:w-2/3">
          <Upload.Dragger height={280} {...draggerProps}>
            <p className="text-custom-blue-light">
              <InboxOutlined className="text-3xl" />
            </p>
            <p className="lg:text-lg font-medium">
              Click or drag file to this area to upload
            </p>
            <p className="lg:text-sm text-xs text-gray-400">
              Supported formats: csv
            </p>
          </Upload.Dragger>
        </div>
      </div>
    </HomeContent>
  );
};

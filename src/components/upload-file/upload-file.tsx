import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import React from 'react';
import { HomeContent } from '../common';

const draggerProps: UploadProps = {
  name: 'file',
  multiple: true,
  accept: 'csv',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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

export const UploadFile: React.FC = () => {
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

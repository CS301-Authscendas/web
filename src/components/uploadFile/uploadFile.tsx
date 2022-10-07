import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import React from 'react';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
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
    <>
      <div className="text-2xl font-medium">Upload File </div>
      <div className="flex justify-center bg-white rounded-lg mt-8 p-10">
        <div className="w-1/2">
          <p className="text-xl text-center font-bold">Upload Users.csv here</p>
          <Dragger height={280} style={{ background: '#F8FAFF' }} {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text font-medium">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Supported formats: csv</p>
          </Dragger>
        </div>
      </div>
    </>
  );
};

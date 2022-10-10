import { NotificationOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

// TODO: Deprecate this component
export const Header = () => {
  return (
    <Layout.Header
      style={{
        background: '#F0F2F5'
      }}
    >
      <div className="flex flex-col justify-center w-full h-full">
        <NotificationOutlined className="self-end text-xl" />
      </div>
    </Layout.Header>
  );
};

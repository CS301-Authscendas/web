import type { NextPage } from 'next';

import {
  CloudUploadOutlined,
  SafetyOutlined,
  GiftOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { AccessControlManagement } from '../components/accessControlManagement';
import { UploadFile } from '../components/uploadFile';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

enum Labels {
  ACCESS_CONTROL = 'ACCESS_CONTROL',
  UPLOAD_FILE = 'UPLOAD_FILE',
  REWARDS = 'REWARDS'
}

const items: MenuProps['items'] = [
  getItem('Access control', Labels.ACCESS_CONTROL, <SafetyOutlined />),
  getItem('Upload-file', Labels.UPLOAD_FILE, <CloudUploadOutlined />),
  getItem('Rewards', Labels.REWARDS, <GiftOutlined />)
];

const Home: NextPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState<Labels>(Labels.ACCESS_CONTROL);

  const onClick: MenuProps['onClick'] = e => {
    const key = Labels[e.key as keyof typeof Labels];
    console.log(key);
    setTab(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          onClick={onClick}
          theme="dark"
          defaultSelectedKeys={[Labels.ACCESS_CONTROL]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, background: 'white' }}
        />
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {tab === Labels.ACCESS_CONTROL && <AccessControlManagement />}
            {tab === Labels.UPLOAD_FILE && <UploadFile />}
            {tab === Labels.REWARDS && (
              <div className="text-2xl font-medium">Rewards</div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;

import type { NextPage } from 'next';

import {
  CloudUploadOutlined,
  SafetyOutlined,
  GiftOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
  'ACCESS_CONTROL' = 'ACCESS_CONTROL',
  'UPLOAD_FILE' = 'UPLOAD_FILE',
  'REWARDS' = 'REWARDS'
}

const items: MenuProps['items'] = [
  getItem('Access control', Labels.ACCESS_CONTROL, <SafetyOutlined />),
  getItem('Upload-file', Labels.UPLOAD_FILE, <CloudUploadOutlined />),
  getItem('Rewards', Labels.REWARDS, <GiftOutlined />)
];

// for table
interface DataType {
  key: string;
  userId: string;
  name: string;
  email: string;
  lastUpdated: string;
  roles: string[];
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
    render: text => <a>{text}</a>
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Last Updated',
    dataIndex: 'lastUpdated',
    key: 'lastUpdated'
  },
  {
    title: 'Roles',
    key: 'roles',
    dataIndex: 'roles',
    render: (_, { roles }) => (
      <>
        {roles.map(role => {
          let color = role.length > 5 ? 'geekblue' : 'green';
          if (role === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={role}>
              {role.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <Tag color={'volcano'} key={status}>
        {status}
      </Tag>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined style={{ color: '#5C73DB' }} />
        <DeleteOutlined style={{ color: '#DC2626' }} />
      </Space>
    )
  }
];

const data: DataType[] = [
  {
    key: '1',
    userId: 'aT3te0gmr3im9',
    name: 'John Brown',
    email: 'john.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: ['Non-admin', 'Owner'],
    status: 'Pending'
  },
  {
    key: '2',
    userId: 'aT3te0gmr3im9',
    name: 'John Brown',
    email: 'john.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: ['Non-admin', 'Owner'],
    status: 'Pending'
  },
  {
    key: '3',
    userId: 'aT3te0gmr3im9',
    name: 'John Brown',
    email: 'john.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: ['Non-admin', 'Owner'],
    status: 'Pending'
  }
];

const AccessControlManagement: NextPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState<Labels>(Labels.ACCESS_CONTROL);
  const [search, setSearch] = useState('');

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
            {tab === Labels.ACCESS_CONTROL && (
              <>
                <div className="text-2xl font-medium">
                  Access Control Management{' '}
                </div>
                <input
                  className="rounded-md border p-3 focus:border-custom-blue-light border-custom-blue-default mt-3 mb-10 w-full"
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Table columns={columns} dataSource={data} />
              </>
            )}
            {tab === Labels.UPLOAD_FILE && (
              <div className="text-2xl font-medium">Upload File </div>
            )}
            {tab === Labels.REWARDS && (
              <div className="text-2xl font-medium">Rewards</div>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccessControlManagement;

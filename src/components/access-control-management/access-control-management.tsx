import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { data } from './data';
import { ERoles, ERolesColor, EStatus, EStatusColor, IDataType } from './types';

const columns: ColumnsType<IDataType> = [
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId',
    render: text => <a>{text}</a>,
    sorter: (a, b) => (a.userId > b.userId ? 1 : -1)
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => (a.name > b.name ? 1 : -1)
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => (a.email > b.email ? 1 : -1)
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
          let color = '';
          switch (role) {
            case ERoles.ADMIN:
              color = ERolesColor.ADMIN;
              break;
            case ERoles.NON_ADMIN:
              color = ERolesColor.NON_ADMIN;
              break;
            case ERoles.OWNER:
              color = ERolesColor.OWNER;
              break;
          }

          return (
            <Tag color={color} key={role}>
              {role.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
    filters: [
      {
        text: ERoles.ADMIN,
        value: ERoles.ADMIN
      },
      {
        text: ERoles.NON_ADMIN,
        value: ERoles.NON_ADMIN
      },
      {
        text: ERoles.OWNER,
        value: ERoles.OWNER
      }
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => {
      let found = false;
      record.roles.map(role => {
        if (role == value) {
          found = true;
        }
      });
      return found;
    }
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      let color = '';
      switch (status) {
        case EStatus.ACTIVE:
          color = EStatusColor.ACTIVE;
          break;
        case EStatus.INACTIVE:
          color = EStatusColor.INACTIVE;
          break;
        case EStatus.PENDING:
          color = EStatusColor.PENDING;
          break;
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
    filters: [
      {
        text: EStatus.ACTIVE,
        value: EStatus.ACTIVE
      },
      {
        text: EStatus.INACTIVE,
        value: EStatus.INACTIVE
      },
      {
        text: EStatus.PENDING,
        value: EStatus.PENDING
      }
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.status === value
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

export const AccessControlManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className="text-2xl font-medium">Access Control Management</div>
      <input
        className="rounded-md border p-3 focus:border-custom-blue-light border-custom-blue-default mt-3 mb-10 w-full"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

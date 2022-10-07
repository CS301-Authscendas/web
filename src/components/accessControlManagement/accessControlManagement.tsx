import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  userId: string;
  name: string;
  email: string;
  lastUpdated: string;
  roles: Roles[];
  status: Status;
}

enum RolesColor {
  ADMIN = 'geekblue',
  NON_ADMIN = 'green',
  OWNER = 'volcano'
}

enum Roles {
  ADMIN = 'admin',
  NON_ADMIN = 'non-admin',
  OWNER = 'owner'
}

enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

enum StatusColor {
  ACTIVE = 'green',
  INACTIVE = 'red',
  PENDING = 'volcano'
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
          let color = '';
          switch (role) {
            case Roles.ADMIN:
              color = RolesColor.ADMIN;
              break;
            case Roles.NON_ADMIN:
              color = RolesColor.NON_ADMIN;
              break;
            case Roles.OWNER:
              color = RolesColor.OWNER;
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
        text: Roles.ADMIN,
        value: Roles.ADMIN
      },
      {
        text: Roles.NON_ADMIN,
        value: Roles.NON_ADMIN
      },
      {
        text: Roles.OWNER,
        value: Roles.OWNER
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
        case Status.ACTIVE:
          color = StatusColor.ACTIVE;
          break;
        case Status.INACTIVE:
          color = StatusColor.INACTIVE;
          break;
        case Status.PENDING:
          color = StatusColor.PENDING;
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
        text: Status.ACTIVE,
        value: 'active'
      },
      {
        text: 'inactive',
        value: 'inactive'
      },
      {
        text: 'pending',
        value: 'pending'
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

const data: DataType[] = [
  {
    key: '1',
    userId: 'aT3te0gmr3im9',
    name: 'John Brown',
    email: 'john.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: [Roles.ADMIN, Roles.NON_ADMIN],
    status: Status.INACTIVE
  },
  {
    key: '2',
    userId: 'aT3te0gmr3im9',
    name: 'John Brown',
    email: 'john.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: [Roles.OWNER],
    status: Status.ACTIVE
  },
  {
    key: '3',
    userId: 'aT3te0gmr3im9',
    name: 'John Brown',
    email: 'john.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: [Roles.ADMIN, Roles.OWNER],
    status: Status.PENDING
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

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ENDPOINTS, USER_ENDPOINTS } from '../../consts';
import { useAuth, useModal } from '../../providers';
import { openNotification } from '../../utils/utils';
import { HomeContent } from '../common';
import { DeleteUser } from './delete-user';
import { EditDetails } from './edit-details';
import {
  IDataType,
  Role,
  RoleColor,
  RoleObj,
  Status,
  StatusColor
} from './types';

var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export const AccessControlManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<IDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setModal, setIsOpen } = useModal();
  const [form] = useForm();
  const { jwtToken } = useAuth();

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.FETCH_USERS_LIST}/MyBank`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'organization-id': 'MyBank',
            'login-method': 'HOSTED'
          }
        }
      );
      setData(res.data);
    } catch (e) {
      openNotification('top', 'User list retrieval unsuccessful');
    }
    setLoading(false);
  };

  const deleteUser = async (email: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}${USER_ENDPOINTS.GET_USER}/${email}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'organization-id': 'MyBank',
            'login-method': 'HOSTED'
          }
        }
      );
      openNotification('top', 'Successful deletion');
      await fetchUserList();
    } catch (e) {
      openNotification('top', 'Delete user unsuccessful');
    }
  };

  useEffect(() => {
    if (!jwtToken) {
      return;
    }
    fetchUserList();
  }, [jwtToken]);

  const columns: ColumnsType<IDataType> = [
    {
      title: 'User ID',
      dataIndex: 'id',
      width: 250,
      sorter: (a, b) => (a.id > b.id ? 1 : -1)
    },
    {
      title: 'Name',
      width: 180,
      render: ({ firstName, lastName }) => (
        <>
          {firstName} {lastName}
        </>
      ),
      sorter: (a, b) =>
        `${a.firstName} ${a.lastName}` > `${b.firstName} ${b.lastName}` ? 1 : -1
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 240,
      sorter: (a, b) => (a.email > b.email ? 1 : -1)
    },
    {
      title: 'Updated At',
      width: 220,
      render: (_, { updatedAt }) =>
        // @ts-ignore
        dayjs.utc(updatedAt * 1000).format('DD MMM YYYY HH:mm:ss')
    },
    {
      title: 'Roles',
      width: 150,
      render: (_, { roles }) => (
        <>
          {roles
            .filter((role: RoleObj) => role.organizationId === 'MyBank')
            .map((role: RoleObj) => {
              let color = '';
              switch (role.permission) {
                case Role.USER:
                  color = RoleColor.USER;
                  break;
                case Role.ADMIN_READ:
                  color = RoleColor['ADMIN-READ'];
                  break;
                case Role.ADMIN_WRITE:
                  color = RoleColor['ADMIN-WRITE'];
                  break;
                case Role.ADMIN_DELETE:
                  color = RoleColor['ADMIN-DELETE'];
                  break;
              }
              return (
                <Tag color={color} key={role.organizationId}>
                  {role.permission}
                </Tag>
              );
            })}
        </>
      ),
      filters: [
        {
          text: Role.USER,
          value: Role.USER
        },
        {
          text: Role.ADMIN_READ,
          value: Role.ADMIN_READ
        },
        {
          text: Role.ADMIN_WRITE,
          value: Role.ADMIN_WRITE
        },
        {
          text: Role.ADMIN_DELETE,
          value: Role.ADMIN_DELETE
        }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        return record.roles.some(
          role => role.permission === value && role.organizationId === 'MyBank'
        );
      }
    },
    {
      title: 'Status',
      width: 150,
      render: (_, { status }) => {
        let color = '';
        switch (status) {
          case Status.APPROVED:
            color = StatusColor.APPROVED;
            break;
          case Status.PENDING:
            color = StatusColor.PENDING;
            break;
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
      filters: [
        {
          text: Status.APPROVED,
          value: Status.APPROVED
        },
        {
          text: Status.PENDING,
          value: Status.PENDING
        }
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Actions',
      fixed: 'right',
      width: 90,
      render: (_, record) => (
        <div className="space-x-5">
          <EditOutlined
            onClick={() => handleOnEdit(record)}
            style={{ color: '#5C73DB' }}
          />
          <DeleteOutlined
            onClick={() => handleOnDelete(record)}
            style={{ color: '#DC2626' }}
          />
        </div>
      )
    }
  ];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnEdit = (record: IDataType) => {
    form.resetFields();
    setModal({
      title: `Edit details for ${record.firstName} ${record.lastName}`,
      body: <EditDetails {...record} form={form} />,
      callback: () => async () => {
        // TODO: Send to backend
        console.log('Updating user account', form.getFieldsValue());
      }
    });
    setIsOpen(true);
  };

  const handleOnDelete = (record: IDataType) => {
    setModal({
      title: 'Delete user account',
      body: <DeleteUser record={record} />,
      callback: () => async () => deleteUser(record.email)
    });
    setIsOpen(true);
  };

  return (
    <HomeContent title="Access Control Management">
      <input
        className="rounded-md border p-3 focus:border-custom-blue-light border-custom-blue-default mb-10 w-full"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleOnChange}
      />
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 1200 }}
      />
    </HomeContent>
  );
};

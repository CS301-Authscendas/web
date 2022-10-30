import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useAuth, useModal } from '../../providers';
import { HomeContent } from '../common';
import { data } from './data';
import { DeleteUser } from './delete-user';
import { EditDetails } from './edit-details';
import { ERoles, ERolesColor, EStatus, EStatusColor, IDataType } from './types';
import { USER_ENDPOINTS } from '../../consts/consts';
import { openNotification } from '../../utils/utils';

export const AccessControlManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  // const [formData, setFormData] = useState<IDataType>();
  const { setModal, setIsOpen } = useModal();
  const [form] = useForm();
  const { jwtToken } = useAuth();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}${USER_ENDPOINTS.FETCH_USERS_LIST}/MyBank`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        openNotification('top', 'User list retrieval unsuccessful');
      });
  }, []);

  const columns: ColumnsType<IDataType> = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      responsive: ['lg'],
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
      responsive: ['lg'],
      sorter: (a, b) => (a.email > b.email ? 1 : -1)
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      responsive: ['lg']
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      responsive: ['md'],
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
        return record.roles.some(role => role === value);
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
        <div className="space-x-3">
          <EditOutlined
            onClick={() => handleOnEdit(record)}
            style={{ color: '#5C73DB' }}
          />
          <DeleteOutlined
            onClick={() => handleOnDelete(record.name)}
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
      title: `Edit details for ${name}`,
      body: <EditDetails {...record} form={form} />,
      callback: () => async () => {
        // TODO: Send to backend
        console.log('Updating user account', form.getFieldsValue());
      }
    });
    setIsOpen(true);
  };

  const handleOnDelete = (username: string) => {
    setModal({
      title: `Delete an user account`,
      body: <DeleteUser username={username} />,
      callback: () => async () => {
        // TODO: Send to backend
        console.log('Deleting user account', username);
      }
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
      <Table columns={columns} dataSource={data} />
    </HomeContent>
  );
};

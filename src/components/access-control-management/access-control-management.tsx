import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { message, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ENDPOINTS, USER_ENDPOINTS } from '../../consts';
import { useAuth, useModal } from '../../providers';
import { HomeContent } from '../common';
import { DeleteUser } from './delete-user';
import { EditDetails } from './edit-details';
import {
  IDataType,
  IEditUserForm,
  Role,
  RoleColor,
  RoleObj,
  Status,
  StatusColor
} from './types';

export const AccessControlManagement: React.FC = () => {
  const { jwtToken, loginMethod, organisationId, userDetails } = useAuth();
  const [search, setSearch] = useState('');
  const [data, setData] = useState<IDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setModal, setIsOpen } = useModal();
  const [form] = useForm<IEditUserForm>();
  const [permissions, setPermissions] = useState<Role[]>();
  const [userId, setUserId] = useState<string>('');

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.FETCH_USERS_LIST}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'login-method': loginMethod,
            'organization-id': organisationId
          }
        }
      );
      setData(res.data);
    } catch (e) {
      message.error('Error occurred retrieving user list');
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (values: IEditUserForm) => {
    try {
      await axios.put(
        `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.EDIT_USER_DETAILS}`,
        {
          ...values,
          roles: [{ organizationId: organisationId, permission: values.roles }]
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'login-method': loginMethod,
            'organization-id': organisationId
          }
        }
      );
      message.success('Successful update');
      await fetchUserList();
    } catch (e) {
      message.error('Update user unsuccessful');
    }
  };

  const deleteUser = async (email: string) => {
    try {
      await axios.delete(
        `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.GET_USER}/${email}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'login-method': loginMethod,
            'organization-id': organisationId
          }
        }
      );
      message.success('Successful deletion');
      await fetchUserList();
    } catch (e) {
      message.error('Delete user unsuccessful');
    }
  };

  useEffect(() => {
    if (!jwtToken || !loginMethod || !organisationId) {
      return;
    }
    fetchUserList();
  }, [jwtToken, loginMethod, organisationId]);

  useEffect(() => {
    if (!userDetails) {
      return;
    }
    const roles = userDetails.roles.find(
      (role: RoleObj) => role.organizationId === organisationId
    );
    roles && setPermissions(roles.permission);
    setUserId(userDetails.id);
  }, [userDetails]);

  const columns: ColumnsType<IDataType> = [
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
      title: 'Roles',
      width: 150,
      render: (_, { roles }) => (
        <>
          {roles[0].permission.map((role: Role) => {
            let color = '';
            switch (role) {
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
              <Tag color={color} key={role}>
                {role}
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
        return record.roles[0].permission.includes(value as Role);
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
    // {
    //   title: 'Birth Date',
    //   dataIndex: 'birthDate',
    //   width: 150,
    //   sorter: (a, b) => (a.email > b.email ? 1 : -1)
    // },
    {
      title: 'Phone',
      render: ({ phoneNumber }) => phoneNumber || '-',
      width: 180,
      sorter: (a, b) => (a.email > b.email ? 1 : -1)
    },
    {
      title: 'Updated At',
      width: 220,
      render: (_, { updatedAt }) =>
        moment.utc(updatedAt * 1000).format('DD MMM YYYY HH:mm:ss')
    },
    {
      title: 'Actions',
      fixed: 'right',
      width: 90,
      render: (_, record) => (
        <div className="space-x-5">
          {permissions?.includes(Role.ADMIN_WRITE) ? (
            <EditOutlined
              onClick={() => handleOnEdit(record)}
              style={{ color: '#5C73DB' }}
            />
          ) : (
            <Tooltip title="Edit not allowed">
              <EditOutlined
                className="cursor-not-allowed"
                style={{ color: '#BBBBBB' }}
              />
            </Tooltip>
          )}
          {record.id !== userId && permissions?.includes(Role.ADMIN_DELETE) ? (
            <DeleteOutlined
              onClick={() => handleOnDelete(record)}
              style={{ color: '#DC2626' }}
            />
          ) : (
            <Tooltip title="Delete not allowed">
              <DeleteOutlined
                className="cursor-not-allowed"
                style={{ color: '#BBBBBB' }}
              />
            </Tooltip>
          )}
        </div>
      )
    }
  ];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleOnEdit = (record: IDataType) => {
    setModal({
      title: `Edit details for ${record.firstName} ${record.lastName}`,
      body: <EditDetails {...record} form={form} />,
      callback: () => async () => editUser(form.getFieldsValue())
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
        className="h-10 rounded-md border p-3 focus:border-custom-blue-light border-custom-blue-default mb-2 w-full"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleOnChange}
      />
      <Table
        loading={loading}
        columns={columns}
        pagination={{ position: ['topRight', 'bottomRight'] }}
        dataSource={data.filter((record: IDataType) =>
          JSON.stringify(record).toLowerCase().includes(search.toLowerCase())
        )}
        rowKey="id"
        scroll={{ x: 1200 }}
      />
    </HomeContent>
  );
};

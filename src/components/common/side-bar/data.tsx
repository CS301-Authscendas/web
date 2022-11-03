import {
  CloudUploadOutlined,
  GiftOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Role } from '../../access-control-management/types';
import { ELabels, TMenuItem } from './types';

const renderComponent = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: TMenuItem[]
): TMenuItem => {
  return {
    key,
    icon,
    children,
    label
  } as TMenuItem;
};

export const getItems = (roles: Role[]) => {
  const items: MenuProps['items'] = [];

  if (
    roles.includes(Role.ADMIN_READ) ||
    roles.includes(Role.ADMIN_WRITE) ||
    roles.includes(Role.ADMIN_DELETE)
  ) {
    items.push(
      renderComponent(
        'Access Control',
        ELabels.ACCESS_CONTROL,
        <SafetyOutlined />
      )
    );
    items.push(
      renderComponent(
        'Upload File',
        ELabels.UPLOAD_FILE,
        <CloudUploadOutlined />
      )
    );
  }
  if (roles.includes(Role.USER)) {
    items.push(renderComponent('Rewards', ELabels.REWARDS, <GiftOutlined />));
  }

  return items;
};

import {
  CloudUploadOutlined,
  GiftOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { MenuProps } from 'antd';
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

export const items: MenuProps['items'] = [
  renderComponent('Access Control', ELabels.ACCESS_CONTROL, <SafetyOutlined />),
  renderComponent('Upload File', ELabels.UPLOAD_FILE, <CloudUploadOutlined />),
  renderComponent('Rewards', ELabels.REWARDS, <GiftOutlined />)
];

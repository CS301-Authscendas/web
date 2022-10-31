import { MenuProps } from 'antd/lib/menu';

export enum ELabels {
  ACCESS_CONTROL = 'ACCESS_CONTROL',
  UPLOAD_FILE = 'UPLOAD_FILE',
  REWARDS = 'REWARDS'
}

export enum LabelUrls {
  ACCESS_CONTROL = '/access-management-control',
  UPLOAD_FILE = '/upload-file',
  REWARDS = '/rewards'
}

export type TMenuItem = Required<MenuProps>['items'][number];
export type TMenuHandleOnClick = MenuProps['onClick'];

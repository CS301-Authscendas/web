export interface IDataType {
  key: string;
  userId: string;
  name: string;
  email: string;
  lastUpdated: string;
  roles: ERoles[];
  status: EStatus;
}

export enum ERolesColor {
  ADMIN = 'geekblue',
  NON_ADMIN = 'green',
  OWNER = 'volcano'
}

export enum ERoles {
  ADMIN = 'admin',
  NON_ADMIN = 'non-admin',
  OWNER = 'owner'
}

export enum EStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

export enum EStatusColor {
  ACTIVE = 'green',
  INACTIVE = 'red',
  PENDING = 'volcano'
}

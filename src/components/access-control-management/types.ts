export interface IEditUserForm {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  phoneNumber: string | undefined;
  roles: Role[];
  status: Status;
}

export interface IDataType extends Omit<IEditUserForm, 'roles'> {
  id: string;
  roles: RoleObj[];
  updatedAt: number;
}

export interface RoleObj {
  organizationId: string;
  permission: Role[];
}

export enum RoleColor {
  'USER' = 'green',
  'ADMIN-READ' = 'geekblue',
  'ADMIN-WRITE' = 'volcano',
  'ADMIN-DELETE' = 'red'
}

export enum Role {
  USER = 'user',
  ADMIN_READ = 'admin-read',
  ADMIN_WRITE = 'admin-write',
  ADMIN_DELETE = 'admin-delete'
}

export enum Status {
  APPROVED = 'approved',
  PENDING = 'pending'
}

export enum StatusColor {
  APPROVED = 'green',
  PENDING = 'volcano'
}

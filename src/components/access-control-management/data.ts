import { ERoles, EStatus, IDataType } from './types';

export const data: IDataType[] = [
  {
    key: '1',
    userId: 'aT3te0gmr3im9',
    name: 'Amy',
    email: 'amy.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: [ERoles.ADMIN, ERoles.NON_ADMIN],
    status: EStatus.INACTIVE
  },
  {
    key: '2',
    userId: 'cT3te0gmr3im9',
    name: 'Bobby',
    email: 'bobby.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: [ERoles.OWNER],
    status: EStatus.ACTIVE
  },
  {
    key: '3',
    userId: 'bT3te0gmr3im9',
    name: 'Dan',
    email: 'dan.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: [ERoles.ADMIN, ERoles.OWNER],
    status: EStatus.PENDING
  },
  {
    key: '4',
    userId: 'dT3te0gmr3im9',
    name: 'Cathy',
    email: 'cathy.brown@gmail.com',
    lastUpdated: '2021-10-14 12:02:33',
    roles: [ERoles.NON_ADMIN],
    status: EStatus.ACTIVE
  }
];

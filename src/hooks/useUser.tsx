import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axiosInstance from '../axios';
import { useAuth } from '../providers';

enum Permission {
  USER = 'user',
  ADMIN_READ = 'admin-read',
  ADMIN_WRITE = 'admin-write',
  ADMIN_DELETE = 'admin-delete'
}

interface Role {
  organizationId: string;
  permission: Permission;
}

interface IUser {
  id: string;
  phoneNumber: string | null;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  birthDate: string;
  role: Role[];
  updatedAt: number;
}

export const useUser = () => {
  const { jwtToken } = useAuth();
  const [userData, setUserData] = useState<IUser>();

  const fetcher = (url: string) =>
    axiosInstance
      .get(url, { headers: { Authorization: 'Bearer ' + jwtToken ?? '' } })
      .then(res => res.data);

  const { data, error } = useSWR<IUser>('/', fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    refreshInterval: 0
  });

  useEffect(() => {
    if (!error && data) {
      setUserData(data);
    }
  }, [data]);

  return { userData };
};

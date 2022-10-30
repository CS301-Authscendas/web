import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axiosInstance from '../axios';
import { useAuth } from '../providers';

interface IUser {
  id: string;
  organizationId: string[];
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  birthDate: string;
  twoFATokenSecret: string | null;
  role: string;
  phoneNumber: string | null;
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

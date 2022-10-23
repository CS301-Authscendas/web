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
  const { ssoAccessToken, hostedAccessToken } = useAuth();
  const [accessToken, setAccessToken] = useState<string>('');
  const [userData, setUserData] = useState<IUser>();

  const fetcher = (url: string) =>
    axiosInstance
      .get(url, { headers: { Authorization: 'Bearer ' + accessToken ?? '' } })
      .then(res => res.data);

  const { data, error } = useSWR<IUser>('/', fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    refreshInterval: 0
  });

  useEffect(() => {
    const localAccessToken = hostedAccessToken || ssoAccessToken;

    if (localAccessToken) {
      setAccessToken(localAccessToken);
    }
  }, [ssoAccessToken, hostedAccessToken]);

  useEffect(() => {
    if (!error && data) {
      setUserData(data);
    }
  }, [data]);

  return { userData };
};

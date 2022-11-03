import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthCode from 'react-auth-code-input';
import { Button } from '../components/common';
import { AUTH_ENDPOINTS, ENDPOINTS, LoginMethod } from '../consts';
import { useAuth } from '../providers';
import { openNotification } from '../utils/utils';

const TwoFAPage: NextPage = () => {
  const [token, setToken] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { setJwtToken, setLoginMethod } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email as string);
    }
  }, [router.query]);

  const handleOnChange = (value: string) => {
    setToken(value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${ENDPOINTS.GATEWAY}${AUTH_ENDPOINTS.VALIDATE_2FA}`,
        {
          email,
          token
        }
      );
      setJwtToken(res.data.token);
      localStorage.setItem('jwtToken', res.data.token);
      setLoginMethod(LoginMethod.HOSTED);
      localStorage.setItem('loginMethod', LoginMethod.HOSTED);
      router.push('/organisations');
    } catch (e) {
      openNotification(
        'top',
        'Invalid 2fa token',
        'Please key in the correct 2fa token.'
      );
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img
          className="object-contain self-center w-1/4"
          src="/assets/2fa.png"
        />
        <p className="text-2xl text-center font-semibold my-4">
          Verify Your Account
        </p>
        <p className="text-center font-normal">
          Thank you for registering! Please enter the 2FA
          <br />
          token sent to your email within 10 minutes.
        </p>
        <AuthCode
          onChange={handleOnChange}
          containerClassName="p-5"
          inputClassName="h-10 w-10 text-uppercase text-center text-2xl text-custom-blue-default border border-custom-blue-light rounded-lg mr-3"
        />
        <Button width="w-1/3" text="Submit" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default TwoFAPage;

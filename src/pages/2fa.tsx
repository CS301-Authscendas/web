import type { NextPage } from 'next';
import { useState } from 'react';
import AuthCode from 'react-auth-code-input';
import { Button } from '../components/common';

const TwoFAPage: NextPage = () => {
  const [token, setToken] = useState<string>('');

  const handleOnChange = (value: string) => {
    setToken(value);
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
        <div className="text-center mb-5 text-custom-blue-default text-2xl tracking-widest underline underline-offset-8">
          {token}
        </div>
        <Button width="w-1/3" text="Submit" />
      </div>
    </div>
  );
};

export default TwoFAPage;

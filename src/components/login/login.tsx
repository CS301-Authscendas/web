import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AUTH_ENDPOINTS, ENDPOINTS } from '../../consts';
import { AuthService } from '../../services';
import { openNotification } from '../../utils/utils';
import { Button } from '../common/button';

export const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    switch (key) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
    }
  };

  useEffect(() => {
    setIsDisabled(!(email && password));
  }, [email, password]);

  const handleOnSubmit = async () => {
    try {
      await axios.post(`${ENDPOINTS.GATEWAY}${AUTH_ENDPOINTS.LOGIN}`, {
        email,
        password
      });
      router.push(
        {
          pathname: '/2fa',
          query: { email: email }
        },
        '/2fa'
      );
    } catch (e) {
      openNotification(
        'top',
        'Log in unsuccessful',
        'Please check your email and password.'
      );
    }
  };

  return (
    <div className="w-[30rem] space-y-3">
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <input
          className="rounded-lg border-gray-200 border p-3 focus:border-custom-blue-default"
          name="email"
          type="text"
          value={email}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <input
          className="rounded-lg border-gray-200 border p-3 focus:border-custom-blue-default"
          name="password"
          type="password"
          value={password}
          onChange={handleOnChange}
        />
      </div>
      <div className="text-center">
        <span>Forgot your password? </span>
        <a className="text-custom-blue-light visited:text-custom-blue-lighter underline">
          Reset password
        </a>
      </div>
      <Button onSubmit={handleOnSubmit} text="Login" isDisabled={isDisabled} />
      <div className="text-center">
        <span>Have QA credentials? </span>
        <a
          className="text-custom-blue-light visited:text-custom-blue-lighter underline"
          href={AuthService.ssoLoginRedirect()}
        >
          Sign in with SSO
        </a>
      </div>
    </div>
  );
};

import { Switch } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AUTH_ENDPOINTS, ENDPOINTS, LoginMethod } from '../../consts';
import { useAuth } from '../../providers';
import { AuthService } from '../../services';
import { openNotification } from '../../utils/utils';
import { Button } from '../common/button';

export const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isHosted, setIsHosted] = useState<boolean>(true);
  const { setJwtToken, setLoginMethod } = useAuth();

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
      const res = await axios.post(
        `${ENDPOINTS.GATEWAY}${
          isHosted ? AUTH_ENDPOINTS.LOGIN : AUTH_ENDPOINTS.AUTH0_LOGIN
        }`,
        {
          email,
          password
        }
      );
      if (isHosted) {
        router.push(
          {
            pathname: '/2fa',
            query: { email: email }
          },
          '/2fa'
        );
      } else {
        setJwtToken(res.data.token);
        localStorage.setItem('jwtToken', res.data.token);
        setLoginMethod(LoginMethod.AUTH0);
        localStorage.setItem('loginMethod', LoginMethod.AUTH0);
        router.push('/organisations');
      }
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
      <Switch
        checked={isHosted}
        onChange={setIsHosted}
        style={{ backgroundColor: '#4763E4', marginTop: 20, marginBottom: 20 }}
        checkedChildren="HOSTED"
        unCheckedChildren="AUTH0"
      />
      <div className="text-center">
        <span>Forgot your password? </span>
        <a className="text-custom-blue-light underline">Reset password</a>
      </div>
      <Button onSubmit={handleOnSubmit} text="Login" isDisabled={isDisabled} />
      <div className="text-center">
        <span>Have QA credentials? </span>
        <a
          className="text-custom-blue-light underline"
          href={AuthService.ssoLoginRedirect()}
        >
          Sign in with SSO
        </a>
      </div>
    </div>
  );
};

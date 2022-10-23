import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import validator from 'validator';
import { AuthService } from '../../services';
import { openNotification } from '../../utils/utils';
import { Button } from '../common/button';

export const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    switch (key) {
      case 'email':
        setEmail(value);
        if (!validator.isEmail(value)) {
          setErrorMessage('Invalid email address');
        }
        break;
      case 'password':
        setPassword(value);
    }
  };

  useEffect(() => {
    setIsDisabled(!(email && password));
  }, [email, password]);

  const handleOnSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/login`, {
        email,
        password
      })
      .then(response => {
        if (response.status == 201) {
          router.push(
            {
              pathname: '/2fa',
              query: { email: email }
            },
            '/2fa'
          );
        }
      })
      .catch(err => {
        openNotification(
          'top',
          'Log in unsuccessful',
          'Please check your email and password.'
        );
      });
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
        <Link href="/forgot-password">
          <a className="text-custom-blue-light visited:text-custom-blue-lighter underline">
            Reset password
          </a>
        </Link>
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

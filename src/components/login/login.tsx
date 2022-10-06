import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import validator from 'validator';
import { Button } from '../common/button';

export const Login: React.FC = () => {
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
    console.log(email, password);
  };

  return (
    <div className="w-[30rem] space-y-3">
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="rounded-md h-10 border-gray-200 border p-3 focus:border-custom-blue-default"
          name="email"
          type="text"
          value={email}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="rounded-md border-gray-200 border p-3 focus:border-custom-blue-default"
          name="password"
          type="password"
          value={password}
          onChange={handleOnChange}
        />
      </div>
      <div className="text-center">
        {'Forgot your password?'}
        <Link href="/forgot-password">
          <a className="text-custom-blue-light visited:text-custom-blue-lighter">
            {' '}
            Reset password
          </a>
        </Link>
      </div>
      <Button onSubmit={handleOnSubmit} text="Log in" isDisabled={isDisabled} />
      <div className="text-center">
        {"Don't have an account yet?"}
        <Link href="/register">
          <a className="text-custom-blue-light visited:text-custom-blue-lighter">
            {' '}
            Register
          </a>
        </Link>
      </div>
      <hr />
      <div className="text-center">
        {'Have QA credentials?'}
        <Link href="/register">
          <a className="text-custom-blue-light visited:text-custom-blue-lighter">
            {' '}
            Sign inwith SSO
          </a>
        </Link>
      </div>
    </div>
  );
};

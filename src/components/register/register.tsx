import React, { ChangeEvent, useEffect, useState } from 'react';
import validator from 'validator';
import { Button } from '../common';

interface IRegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  password: string;
  agreeTNC: boolean;
}

export const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [agreeTNC, setAgreeTNC] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();

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
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'birthDate':
        setBirthDate(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'agreeTNC':
        setAgreeTNC(!agreeTNC);
        break;
    }
  };

  useEffect(() => {
    setIsDisabled(
      !(
        email &&
        firstName &&
        lastName &&
        phoneNumber &&
        birthDate &&
        password &&
        agreeTNC
      )
    );
  }, [email, firstName, lastName, phoneNumber, birthDate, password, agreeTNC]);

  const handleOnSubmit = () => {
    console.log(
      email,
      firstName,
      lastName,
      phoneNumber,
      birthDate,
      password,
      agreeTNC
    );
  };

  return (
    <div className="w-[30rem] space-y-5">
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="rounded-lg border-gray-200 border p-3 focus:border-custom-blue-default"
          name="email"
          type="text"
          value={email}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex w-full space-x-5">
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">First Name</label>
          <input
            className="rounded-lg border-gray-200 border p-3 focus:border-custom-blue-default"
            name="firstName"
            type="text"
            value={firstName}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="rounded-lg border-gray-200 border p-3 focus:border-custom-blue-default"
            name="lastName"
            type="text"
            value={lastName}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          className="rounded-lg border-gray-200 border p-3 focus:border-custom-blue-default"
          name="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="birt">Birth Date</label>
        <input
          className="rounded-lg border-gray-200 border p-3 focus:border-custom-blue-default"
          name="birthDate"
          type="text"
          value={birthDate}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="rounded-lg border-gray-200 border p-3 focus:border-custom-blue-default"
          name="password"
          type="password"
          value={password}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex">
        <input
          name="agreeTNC"
          type="checkbox"
          checked={agreeTNC}
          onChange={handleOnChange}
        />
        <div>&nbsp;I accept the&nbsp;</div>
        <div className="text-custom-blue-default">terms and conditions</div>
      </div>
      <Button
        onSubmit={handleOnSubmit}
        text="Sign Up"
        isDisabled={isDisabled}
      />
    </div>
  );
};

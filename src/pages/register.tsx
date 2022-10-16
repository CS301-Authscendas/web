import type { NextPage } from 'next';
import { Logo, Register } from '../components';

const RegisterPage: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Logo width="w-1/6" />
      <Register />
    </div>
  );
};

export default RegisterPage;

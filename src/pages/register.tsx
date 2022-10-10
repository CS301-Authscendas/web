import type { NextPage } from 'next';
import { Logo, Register } from '../components';

const RegisterPage: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Logo />
      <Register />
    </div>
  );
};

export default RegisterPage;

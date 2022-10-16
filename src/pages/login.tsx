import type { NextPage } from 'next';
import { Login, Logo } from '../components';

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Logo width="w-1/6" />
      <Login />
    </div>
  );
};

export default LoginPage;

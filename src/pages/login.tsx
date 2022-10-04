import type { NextPage } from 'next';
import { Login } from '../components/login';

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Login />
    </div>
  );
};

export default LoginPage;

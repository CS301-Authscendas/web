import type { NextPage } from 'next';
import Image from 'next/image';
import { Login } from '../components/login';

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <div className="flex flex-col mb-6">
        <div className="flex justify-center">
          <img src="/assets/authcendas.png" className="w-1/6" />
        </div>
        <div className="text-xl text-center">
          Customer Engagement. Made Simple.
        </div>
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;

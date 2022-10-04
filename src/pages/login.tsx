import type { NextPage } from 'next';
import { Login } from '../components/login';

const LoginPage: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <div className="flex flex-col mb-16">
        <img src="/assets/authcendas.png" />
        <div className="font-normal text-xl">
          Customer Engagement. Made Simple.
        </div>
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;

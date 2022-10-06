import type { NextPage } from 'next';
import { Register } from '../components/register';

const RegisterPage: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <div className="flex flex-col mb-6">
        <div className="flex justify-center">
          <img className="w-1/6" src="/assets/authcendas.png" />
        </div>
        <div className="text-xl text-center">
          Customer Engagement. Made Simple.
        </div>
      </div>
      <Register />
    </div>
  );
};

export default RegisterPage;

import type { NextPage } from 'next';
import { Register } from '../components/register';

const RegisterPage: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <div className="flex flex-col mb-16">
        <img className="object-contain" src="/assets/authcendas.png" />
        <div className="font-normal text-xl">
          Customer Engagement. Made Simple.
        </div>
      </div>
      <Register />
    </div>
  );
};

export default RegisterPage;

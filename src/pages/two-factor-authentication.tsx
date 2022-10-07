import type { NextPage } from 'next';
import { Button } from '../components/common';

const twoFA: NextPage = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <div className="flex flex-col mb-6 justify-center w-1/4">
        <div className="flex justify-center">
          <img className="w-5/6" src="/assets/2fa.png" />
        </div>
        <p className="text-xl text-center font-bold">Verify your account</p>
        <p className="text-center font-normal">
          Thank you for registering! Please enter the 2FA
          <br />
          token sent to your email within 10 minutes.
        </p>
        <div className="text-center mb-5 text-custom-blue-default text-2xl tracking-widest underline underline-offset-8">
          ABCDEF
        </div>
        <Button text="Submit" />
      </div>
    </div>
  );
};

export default twoFA;

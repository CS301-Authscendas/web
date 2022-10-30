import Button from 'antd/lib/button';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

interface IProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const HomeContent = ({ title, children }: IProps) => {
  const router = useRouter();

  const changeOrganisation = () => {
    router.push('/organisations');
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="text-2xl font-medium mb-8">{title}</div>
        <Button type="primary" ghost={true} onClick={changeOrganisation}>
          Change organisation
        </Button>
      </div>
      {children}
    </>
  );
};

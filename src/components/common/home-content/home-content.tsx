import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useAuth } from '../../../providers';

interface IProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const HomeContent = ({ title, children }: IProps) => {
  const { logout } = useAuth();

  const router = useRouter();

  const changeOrganisation = () => {
    router.push('/organisations');
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-medium">{title}</div>
        <Button type="primary" ghost onClick={changeOrganisation}>
          Change organisation
        </Button>
      </div>
      {children}
    </Fragment>
  );
};

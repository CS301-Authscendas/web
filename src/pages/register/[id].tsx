import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Logo, Register } from '../../components';
import { AUTH_ENDPOINTS, ENDPOINTS } from '../../consts';
import { openNotification } from '../../utils/utils';

const RegisterPage: NextPage = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  useEffect(() => {
    console.log('data', data);
    if (!data.email) {
      openNotification(
        'top',
        'Unable to register',
        'Some possible reasons include: you have already logged in or your email is invalid.'
      );
      router.push('/');
    }
  }, [data]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <Logo width="w-1/6" />
      <Register email={data.email} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await fetch(
    `${ENDPOINTS.GATEWAY}${AUTH_ENDPOINTS.USER_SIGNUP_STATUS}/${context.params?.id}`
  );

  return {
    props: {
      data: {
        email: res.status === 200 ? await res.text() : ''
      }
    }
  };
};

export default RegisterPage;

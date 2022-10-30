import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { ELabels, LabelUrls, SideBar, TMenuHandleOnClick } from '..';
import { useAuth } from '../../../providers';

interface HomeLayoutProps {
  defaultKey: ELabels;
  children: JSX.Element | JSX.Element[];
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({
  defaultKey,
  children
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { jwtToken, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      router.push('/');
    }
  }, [router]);

  const handleOnClick: TMenuHandleOnClick = e => {
    const key = ELabels[e.key as keyof typeof ELabels];
    router.push(LabelUrls[key]);
  };

  const handleOnCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="h-screen">
      <SideBar
        collapsed={collapsed}
        handleOnClick={handleOnClick}
        handleOnCollapsed={handleOnCollapsed}
        defaultKey={defaultKey}
      />
      <Layout>
        <Layout.Content className="p-10 min-h-[360px] bg-custom-white-dark">
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

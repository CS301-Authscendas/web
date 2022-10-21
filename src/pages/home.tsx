import type { NextPage } from 'next';

import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  AccessControlManagement,
  ELabels,
  SideBar,
  TMenuHandleOnClick,
  UploadFile
} from '../components';
import { useAuth } from '../providers';

const Home: NextPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState<ELabels>(ELabels.ACCESS_CONTROL);
  const router = useRouter();
  const { setSsoCode, setIsLoading } = useAuth();

  useEffect(() => {
    if (router.isReady) {
      const { code } = router.query;
      console.log('--- SSO Login: ', code);
      setSsoCode(code as string);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleOnClick: TMenuHandleOnClick = e => {
    const key = ELabels[e.key as keyof typeof ELabels];
    setTab(key);
  };

  const handleOnCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderMenuItem = () => {
    switch (tab) {
      case ELabels.ACCESS_CONTROL:
        return <AccessControlManagement />;
      case ELabels.UPLOAD_FILE:
        return <UploadFile />;
      case ELabels.REWARDS:
        return <div className="text-2xl font-medium">Rewards</div>;
    }
  };

  return (
    <Layout className="h-screen">
      <SideBar
        collapsed={collapsed}
        handleOnClick={handleOnClick}
        handleOnCollapsed={handleOnCollapsed}
      />
      <Layout>
        <Layout.Content className="p-10 min-h-[360px] bg-custom-white-dark">
          {renderMenuItem()}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Home;

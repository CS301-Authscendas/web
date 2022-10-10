import type { NextPage } from 'next';

import { Layout } from 'antd';
import { useState } from 'react';
import {
  AccessControlManagement,
  ELabels,
  SideBar,
  TMenuHandleOnClick,
  UploadFile
} from '../components';

const Home: NextPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState<ELabels>(ELabels.ACCESS_CONTROL);

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

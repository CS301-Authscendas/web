import { Layout, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ELabels, LabelUrls, SideBar, TMenuHandleOnClick } from '..';
import { ENDPOINTS, USER_ENDPOINTS } from '../../../consts';
import { useAuth } from '../../../providers';
import { DeleteAccount } from '../delete-account';

interface HomeLayoutProps {
  defaultKey: ELabels;
  children: JSX.Element | JSX.Element[];
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({
  defaultKey,
  children
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { jwtToken, loginMethod, organisationId, logout } = useAuth();
  const router = useRouter();

  const onOk = async () => {
    try {
      await axios.delete(
        `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.DELETE_MYSELF}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'login-method': loginMethod,
            'organization-id': organisationId
          }
        }
      );
      setOpenModal(false);
      logout();
    } catch (e) {
      message.error('Error occurred deleting user');
    }
  };
  const handleOnClick: TMenuHandleOnClick = e => {
    const key = ELabels[e.key as keyof typeof ELabels];
    if (key === ELabels.DELETE_ACCOUNT) {
      setOpenModal(true);
    } else {
      router.push(LabelUrls[key]);
    }
  };

  const handleOnCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout hasSider className="min-h-screen">
      <SideBar
        collapsed={collapsed}
        handleOnClick={handleOnClick}
        handleOnCollapsed={handleOnCollapsed}
        defaultKey={defaultKey}
      />
      <Layout>
        <Layout.Content className="p-10 min-h-[360px] bg-custom-white-dark">
          {children}
          {openModal && (
            <DeleteAccount
              openModal={openModal}
              onOk={onOk}
              onCancel={() => setOpenModal(false)}
            />
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

import { Layout } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  const { jwtToken, loginMethod, organisationId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      router.push('/');
    }
  }, [router]);

  const onOk = () => {
    // TODO: add delete user end pt
    axios.delete(``, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'login-method': loginMethod,
        'organization-id': organisationId
      }
    });
    setOpenModal(false);
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

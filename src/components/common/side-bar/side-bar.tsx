import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { LoginMethod } from '../../../consts';
import { useAuth } from '../../../providers/auth';
import { getUserDetails } from '../../../utils/utils';
import { Role, RoleObj } from '../../access-control-management/types';
import { ColorScheme, Logo } from '../logo';
import { getItems } from './data';
import { ELabels, TMenuHandleOnClick } from './types';

interface IProps {
  collapsed: boolean;
  handleOnCollapsed: () => void;
  handleOnClick: TMenuHandleOnClick;
  defaultKey: ELabels;
}

export const SideBar: React.FC<IProps> = (props: IProps) => {
  const { organisationId, jwtToken, loginMethod, setUserDetails } = useAuth();
  const { collapsed, handleOnCollapsed, handleOnClick, defaultKey } = props;
  const [isCollapsible, setIsCollapsible] = useState<boolean>(true);
  const [roles, setRoles] = useState<Role[]>();

  const fetchUserDetails = async (token: string, method: LoginMethod) => {
    const details = await getUserDetails(token, method);
    setUserDetails(details);
    setRoles(
      details.roles.find(
        (role: RoleObj) => role.organizationId === organisationId
      ).permission
    );
  };

  useEffect(() => {
    if (!jwtToken || !loginMethod) {
      return;
    }
    fetchUserDetails(jwtToken, loginMethod);
  }, [jwtToken, loginMethod]);

  return (
    <Layout.Sider
      collapsible={isCollapsible}
      collapsed={collapsed}
      onBreakpoint={broken => {
        setIsCollapsible(!broken);
      }}
      breakpoint="lg"
      onCollapse={handleOnCollapsed}
    >
      <div className="p-5 mb-3 border-b border-b-gray-700">
        <Logo
          renderText={false}
          colorScheme={ColorScheme.DARK}
          small={collapsed}
        />
      </div>
      <Menu
        onClick={handleOnClick}
        theme="dark"
        defaultSelectedKeys={[defaultKey]}
        mode="inline"
        items={roles && getItems(roles)}
      />
    </Layout.Sider>
  );
};

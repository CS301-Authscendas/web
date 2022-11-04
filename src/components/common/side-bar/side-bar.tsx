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
  const {
    organisationId,
    jwtToken,
    loginMethod,
    setUserDetails,
    roles,
    setRoles
  } = useAuth();
  const { collapsed, handleOnCollapsed, handleOnClick, defaultKey } = props;
  const [isCollapsible, setIsCollapsible] = useState<boolean>(true);
  const [newRoles, setNewRoles] = useState<Role[]>(roles);

  const fetchUserDetails = async (token: string, method: LoginMethod) => {
    const details = await getUserDetails(token, method);
    setUserDetails(details);
    const updatedRoles = details.roles.find(
      (role: RoleObj) => role.organizationId === organisationId
    ).permission;
    setNewRoles(updatedRoles);
    setRoles(updatedRoles);
  };

  useEffect(() => {
    if (roles.length > 0) {
      setNewRoles(roles);
    } else if (!jwtToken || !loginMethod) {
      return;
    }
    fetchUserDetails(jwtToken, loginMethod!);
  }, [roles, jwtToken, loginMethod]);

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
        items={newRoles && getItems(newRoles)}
      />
    </Layout.Sider>
  );
};

import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { ColorScheme, Logo } from '../logo';
import { items } from './data';
import { ELabels, TMenuHandleOnClick } from './types';

interface IProps {
  collapsed: boolean;
  handleOnCollapsed: () => void;
  handleOnClick: TMenuHandleOnClick;
}

export const SideBar = ({
  collapsed,
  handleOnCollapsed,
  handleOnClick
}: IProps) => {
  const [isCollapsible, setIsCollapsible] = useState<boolean>(true);

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
        <Logo renderText={false} colorScheme={ColorScheme.DARK} />
      </div>
      <Menu
        onClick={handleOnClick}
        theme="dark"
        defaultSelectedKeys={[ELabels.ACCESS_CONTROL]}
        mode="inline"
        items={items}
      />
    </Layout.Sider>
  );
};

import { Layout, Menu } from 'antd';
import { Logo } from '../logo';
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
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={handleOnCollapsed}
    >
      <div className="p-5 mb-3 border-b border-b-gray-700">
        <Logo renderText={false} />
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

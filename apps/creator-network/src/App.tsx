import React, { useMemo } from 'react';
import {
  AppstoreOutlined,
  CloudOutlined,
  ApartmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AssetHubsMenu from './components/assetsHubsMenu';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useAssetHub } from '@repo/ui/context';
// import { Footer } from 'antd/es/layout/layout';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const account = useAccount()
  const { hubInfo } = useAssetHub();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = (key: string) => {
    navigate(key)
  }

  const items: MenuProps['items'] = useMemo(() => {
    if (account?.address && hubInfo?.id) {
      return [
        {
          key: 'dashboard',
          icon: <AppstoreOutlined />,
          label: '控制面板',
        }, 
        {
          key: 'assets',
          icon: <CloudOutlined />,
          label: '资产管理',
        }, 
        {
          key: 'assets-person',
          icon: <UserOutlined />,
          label: '个人资产',
        }, 
        {
          key: 'version',
          icon: <ApartmentOutlined />,
          label: '版本管理',
        }, 
      ]
    }

    return [
      {
        key: 'dashboard',
        icon: <AppstoreOutlined />,
        label: '控制面板',
      }, 
      {
        key: 'assets',
        icon: <CloudOutlined />,
        label: '资产管理',
      }, 
      {
        key: 'version',
        icon: <ApartmentOutlined />,
        label: '版本管理',
      }, 
    ]
  }, [hubInfo, account?.address])

  const defaultSelectedKey = useMemo(() => {
    if (location.pathname === '/') return 'dashboard'
    if (location.pathname.includes('assets')) return 'assets'
    if (location.pathname.includes('version')) return 'version'
    return 'dashboard'
  }, [location])

  return (
    <Layout hasSider className='w-100vw h-100vh'>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <AssetHubsMenu />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelectedKey]} items={items} onClick={(e) => onMenuClick(e.key)}/>
      </Sider>
      <Layout style={{ marginLeft: 200 }} className='fcc-between'>
        <Header style={{ padding: 0, background: colorBgContainer }} className='flex-0 fcc-center w-full' >
          <div className="w-full flex items-center justify-end mr-4">
            <ConnectButton />
          </div>
        </Header>
        <Content style={{ overflow: 'initial' }} className='flex-1 w-full h-full rounded-2 p-4'>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className='w-full h-full p-4 overflow-auto'
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }} className='flex-0 whitespace-nowrap w-full'>
          Creator Network ©{new Date().getFullYear()} Created by DeSchool
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;
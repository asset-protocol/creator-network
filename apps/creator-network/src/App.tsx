import React from 'react';
import {
  AppstoreOutlined,
  CloudOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Button } from '@repo/ui/button'
import {
  Outlet,
  useNavigate,
} from "react-router-dom";
import AssetHubsMenu from './components/assetsHubsMenu';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
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

const App: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = (key: string) => {
    navigate(key)
  }

  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <AssetHubsMenu />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} items={items} onClick={(e) => onMenuClick(e.key)}/>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Button appName='app' className='bg-red'>button</Button>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className='w-full bg-#333'
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
import { Avatar, Breadcrumb, Button, Col, Descriptions, Layout, Menu, PageHeader, Row } from 'antd';
import { FC, ReactNode, useCallback, useState } from 'react';
import type { MenuProps } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { tryLogout } from '../../modulos/autenticacao/thunks/autenticacao.thunk';

const { Header, Content, Footer, Sider } = Layout;

export interface FullScreenLayoutProps {
  children: ReactNode;
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

export const FullScreenLayout: FC<FullScreenLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch : AppDispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(tryLogout()), []);
  const items: MenuItem[] = [
    getItem('Dashboard', 'sub1', <UserOutlined />, [
      getItem((<Link to="/dashboard">Grafico</Link>), '3'),
      getItem((<Link to="/dashboard/text">Texto longo</Link>), '4'),
    ]),
    getItem('Logout', '1', <PieChartOutlined />, undefined, onLogout),
    getItem('Sub menu', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  ];
  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', paddingLeft: collapsed ? 80 : 200 }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />
    </Header>
    <Layout className='fullScreenLayout' hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} items={items}/>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', paddingTop: 60 }}>
          <Breadcrumb >
            <Breadcrumb.Item><HomeOutlined /></Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>{children}</div>
        </Content>
      <Footer style={{ textAlign: 'center' }}>POC - Vite + ReactJs + Antd + Typescript</Footer>
      </Layout>
    </Layout>
    </Layout>
  );
};
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Avatar } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  DashboardOutlined, 
  TeamOutlined, 
  ProjectOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { token } = theme.useToken();
  const location = useLocation();

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuVisible(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current active menu item based on path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return ['dashboard'];
    if (path.startsWith('/clients')) return ['clients'];
    if (path.startsWith('/projects')) return ['projects'];
    return ['dashboard'];
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          padding: 0,
          background: token.colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 24px' }}>
            能源管理系统
          </div>
          {mobileView ? (
            <Button 
              type="text" 
              icon={<MenuOutlined />} 
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
              style={{ marginLeft: 'auto', marginRight: '16px' }}
            />
          ) : (
            <>
              <Menu 
                mode="horizontal" 
                selectedKeys={getSelectedKey()}
                style={{ flex: 1, minWidth: 0, border: 'none' }}
              >
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                  <Link to="/dashboard">大屏</Link>
                </Menu.Item>
                <Menu.Item key="clients" icon={<TeamOutlined />}>
                  <Link to="/clients">客户管理</Link>
                </Menu.Item>
                <Menu.Item key="projects" icon={<ProjectOutlined />}>
                  <Link to="/projects">项目管理</Link>
                </Menu.Item>
              </Menu>
              <div style={{ paddingRight: '24px' }}>
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                  <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ margin: '0 8px' }}>管理员</span>
                    <DownOutlined />
                  </div>
                </Dropdown>
              </div>
            </>
          )}
        </div>
      </Header>
      <Layout style={{ marginTop: 64 }}>
        {(!mobileView || (mobileView && mobileMenuVisible)) && (
          <Sider
            collapsible={!mobileView}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 64,
              bottom: 0,
              zIndex: mobileView ? 999 : 1,
            }}
          >
            {mobileView && (
              <div style={{ padding: '16px', textAlign: 'right' }}>
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                  <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ margin: '0 8px', color: 'white' }}>管理员</span>
                    <DownOutlined style={{ color: 'white' }} />
                  </div>
                </Dropdown>
              </div>
            )}
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={getSelectedKey()}
              items={[
                {
                  key: 'dashboard',
                  icon: <DashboardOutlined />,
                  label: <Link to="/dashboard">大屏</Link>,
                },
                {
                  key: 'clients',
                  icon: <TeamOutlined />,
                  label: <Link to="/clients">客户管理</Link>,
                },
                {
                  key: 'projects',
                  icon: <ProjectOutlined />,
                  label: <Link to="/projects">项目管理</Link>,
                  children: [
                    {
                      key: 'all-projects',
                      label: <Link to="/projects">所有项目</Link>,
                    },
                    {
                      key: 'solar-projects',
                      label: <Link to="/projects?type=solar">太阳能项目</Link>,
                    },
                    {
                      key: 'wind-projects',
                      label: <Link to="/projects?type=wind">风能项目</Link>,
                    },
                    {
                      key: 'hydro-projects',
                      label: <Link to="/projects?type=hydro">水能项目</Link>,
                    },
                    {
                      key: 'biomass-projects',
                      label: <Link to="/projects?type=biomass">生物质能项目</Link>,
                    },
                    {
                      key: 'geothermal-projects',
                      label: <Link to="/projects?type=geothermal">地热能项目</Link>,
                    },
                  ],
                },
              ]}
              onClick={() => mobileView && setMobileMenuVisible(false)}
            />
          </Sider>
        )}
        <Layout style={{ 
          marginLeft: mobileView ? (mobileMenuVisible ? 200 : 0) : (collapsed ? 80 : 200), 
          transition: 'margin-left 0.2s' 
        }}>
          <Content
            style={{
              margin: mobileView ? '16px 8px' : '24px 16px',
              padding: mobileView ? 16 : 24,
              minHeight: 280,
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG,
              overflow: 'initial',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 
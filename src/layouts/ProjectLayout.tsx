import React, { useState, useEffect, ReactNode } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Avatar, Breadcrumb, Spin } from 'antd';
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
  MenuOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  BulbOutlined,
  DatabaseOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { projects, Project, ModuleType } from '../mock/data';

// 解析项目ID
const useProject = (projectId?: string): { project: Project | null, loading: boolean } => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = () => {
      setLoading(true);
      // 模拟API请求
      setTimeout(() => {
        if (projectId) {
          const foundProject = projects.find(p => p.id === projectId);
          setProject(foundProject || null);
        } else {
          setProject(null);
        }
        setLoading(false);
      }, 300);
    };

    fetchProject();
  }, [projectId]);

  return { project, loading };
};

// 模块菜单配置
const moduleMenuItems: Record<ModuleType, { icon: React.ReactElement, subMenus: Record<string, string[]> }> = {
  '源': { 
    icon: <ThunderboltOutlined />, 
    subMenus: {
      '光伏对接': ['光伏综合看板', '光伏监控']
    }
  },
  '网': { 
    icon: <ApiOutlined />, 
    subMenus: {
      '能耗统计系统': ['仪表信息', '能耗总览', '能耗地图', '用水量统计', '用电量统计', '企业能耗', '企业能耗汇总'],
      '能耗分析': ['网关设备管理', '仪表设备管理', '仪表数据监控', '回路管理', '能耗数据']
    }
  },
  '荷': { 
    icon: <BulbOutlined />, 
    subMenus: {
      '智能照明系统': ['网关设备', '远程电表', '开关模块', '照明回路', '场景配置', '定时任务', '任务日志'],
      '电梯节能系统': ['节电综合概览', '网关设备', '终端设备', '电梯运行情况', '电梯机房', '能量反馈数据', '费用数据', '电梯运行数据'],
      '空调管理': ['水冷空调接入', 'VRV空调接入']
    }
  },
  '储': { 
    icon: <DatabaseOutlined />, 
    subMenus: {
      '储能': ['储能']
    }
  },
  '充': { 
    icon: <RocketOutlined />, 
    subMenus: {
      '充电桩': ['充电桩看板', '充电桩监控']
    }
  }
};

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const ProjectLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { token } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { project, loading } = useProject(id);

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

  // Generate menu items based on project modules
  const generateMenuItems = () => {
    if (!project) return [];

    return project.modules.map(moduleName => {
      const moduleConfig = moduleMenuItems[moduleName];
      
      // 生成子菜单
      const children: any[] = [];
      Object.entries(moduleConfig.subMenus).forEach(([subMenuName, menuItems]) => {
        children.push({
          key: `${moduleName}-${subMenuName}`,
          label: subMenuName,
          children: menuItems.map(item => ({
            key: `${moduleName}-${subMenuName}-${item}`,
            label: item,
            onClick: () => {
              navigate(`/projects/module/${id}/${moduleName}/${subMenuName}/${item}`);
            }
          }))
        });
      });

      return {
        key: moduleName,
        icon: moduleConfig.icon,
        label: moduleName,
        children
      };
    });
  };

  // Handle navigation back to projects list
  const handleBackToProjects = () => {
    navigate('/projects');
  };

  // 导航到项目详情页
  const handleBackToProject = () => {
    navigate(`/projects/detail/${id}`);
  };

  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [
      {
        title: <Link to="/dashboard"><HomeOutlined /> 大屏</Link>,
        key: 'dashboard'
      },
      {
        title: <Link to="/projects"><ProjectOutlined /> 项目管理</Link>,
        key: 'projects'
      }
    ];

    if (project) {
      items.push({
        title: <Link to={`/projects/detail/${id}`}>{project.name}</Link>,
        key: 'project-detail'
      });
      
      // 获取当前选中的菜单项
      const pathParts = location.pathname.split('/');
      const modulePart = pathParts[pathParts.length - 3]; // 适应新的URL格式
      const subModulePart = pathParts[pathParts.length - 2];
      const pagePart = pathParts[pathParts.length - 1];
      
      if (modulePart && modulePart !== 'detail') {
        items.push({
          title: <span>{modulePart}</span>,
          key: modulePart
        });
        
        if (subModulePart) {
          items.push({
            title: <span>{subModulePart}</span>,
            key: subModulePart
          });

          if (pagePart) {
            items.push({
              title: <span>{pagePart}</span>,
              key: pagePart
            });
          }
        }
      }
    }

    return items;
  };

  // Get current active menu item based on path
  const getSelectedKey = () => {
    const path = location.pathname;
    const pathParts = path.split('/');
    // 取最后两部分作为选择键
    if (pathParts.length >= 5) {
      const modulePart = pathParts[pathParts.length - 2];
      const pagePart = pathParts[pathParts.length - 1];
      return [`${modulePart}-${pagePart}`];
    }
    return [];
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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="加载项目信息..." />
      </div>
    );
  }

  if (!project) {
    navigate('/projects');
    return null;
  }

  const menuItems = generateMenuItems();

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
          <div style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
            <Button type="link" onClick={handleBackToProject} icon={<ProjectOutlined />} style={{ paddingLeft: 0 }}>
              {project.name}
            </Button>
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
              <div style={{ flex: 1, minWidth: 0 }}></div>
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
              defaultOpenKeys={[project.modules[0]]}
              defaultSelectedKeys={getSelectedKey()}
              items={menuItems}
              onClick={() => mobileView && setMobileMenuVisible(false)}
            />
          </Sider>
        )}
        <Layout style={{ 
          marginLeft: mobileView ? (mobileMenuVisible ? 200 : 0) : (collapsed ? 80 : 200), 
          transition: 'margin-left 0.2s' 
        }}>
          <div style={{ 
            padding: '16px 24px', 
            background: token.colorBgContainer,
            marginBottom: '16px',
            borderRadius: token.borderRadiusLG,
            margin: mobileView ? '16px 8px 0' : '24px 16px 0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
          }}>
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>
          <Content
            style={{
              margin: mobileView ? '0 8px 16px' : '0 16px 24px',
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

export default ProjectLayout; 
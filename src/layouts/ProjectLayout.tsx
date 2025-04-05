import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Dropdown, Avatar, Breadcrumb, Spin } from 'antd';
import { 
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

    // 首页菜单项（项目详情）
    const menuItems: any[] = [
      {
        key: 'project-home',
        icon: <HomeOutlined />,
        label: '首页',
        onClick: () => navigate(`/projects/${id}`)
      }
    ];

    // 添加模块菜单
    project.modules.forEach(moduleName => {
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
              // 确保URL中的中文字符被正确编码
              const encodedModule = encodeURIComponent(moduleName);
              const encodedSubModule = encodeURIComponent(subMenuName);
              const encodedPage = encodeURIComponent(item);
              navigate(`/projects/${id}/${encodedModule}/${encodedSubModule}/${encodedPage}`);
            }
          }))
        });
      });

      menuItems.push({
        key: moduleName,
        icon: moduleConfig.icon,
        label: moduleName,
        children
      });
    });

    return menuItems;
  };

  // Handle navigation back to projects list
  const handleBackToProjects = () => {
    navigate('/projects');
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
      // 添加项目名称作为面包屑项
      if (location.pathname === `/projects/${id}`) {
        // 如果是项目首页，项目名称作为末级面包屑
        items.push({
          title: <span>{project.name}</span>,
          key: 'project-detail'
        });
      } else {
        // 如果是模块页面，项目名称作为可点击的面包屑
        items.push({
          title: <Link to={`/projects/${id}`}>{project.name}</Link>,
          key: 'project-detail'
        });
        
        // 解析URL路径
        const pathParts = location.pathname.split('/').filter(part => part);
        
        // 找到项目ID后的部分
        const idIndex = pathParts.findIndex(part => part === id);
        if (idIndex >= 0 && idIndex < pathParts.length - 1) {
          // 提取并处理路径中的所有剩余部分
          const remainingParts = pathParts.slice(idIndex + 1);
          
          // 添加每个部分作为面包屑项
          remainingParts.forEach((part, index) => {
            const decodedPart = decodeURIComponent(part);
            
            if (index === remainingParts.length - 1) {
              // 最后一项不可点击
              items.push({
                title: <span>{decodedPart}</span>,
                key: `breadcrumb-${index}`
              });
            } else {
              // 构建到当前部分的路径
              const pathToHere = `/projects/${id}/${remainingParts.slice(0, index + 1).join('/')}`;
              items.push({
                title: <Link to={pathToHere}>{decodedPart}</Link>,
                key: `breadcrumb-${index}`
              });
            }
          });
        }
      }
    }

    return items;
  };

  // Get current active menu item based on path
  const getSelectedKey = () => {
    const path = location.pathname;
    
    // 如果是项目首页
    if (path === `/projects/${id}`) {
      return ['project-home'];
    }
    
    // 如果是模块页面
    const pathParts = path.split('/').filter(part => part);
    const idIndex = pathParts.findIndex(part => part === id);
    
    if (idIndex >= 0 && idIndex + 3 < pathParts.length) {
      // 解码URL参数
      const encodedModule = pathParts[idIndex + 1];
      const encodedSubModule = pathParts[idIndex + 2];
      const encodedPage = pathParts[idIndex + 3];
      
      const module = decodeURIComponent(encodedModule);
      const subModule = decodeURIComponent(encodedSubModule);
      const page = decodeURIComponent(encodedPage);
      
      // 返回完整的菜单项键
      return [`${module}-${subModule}-${page}`];
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
            <Button type="link" onClick={handleBackToProjects} icon={<ProjectOutlined />} style={{ paddingLeft: 0 }}>
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
              overflow: 'hidden',
              height: 'calc(100vh - 64px)',
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
            {/* 菜单滚动容器 */}
            <div style={{ 
              height: 'calc(100%)', 
              overflow: 'auto',
            }}>
              <Menu
                theme="dark"
                mode="inline"
                defaultOpenKeys={['project-home']}
                selectedKeys={getSelectedKey()}
                items={menuItems}
                onClick={() => mobileView && setMobileMenuVisible(false)}
              />
            </div>
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
              overflow: 'auto',
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
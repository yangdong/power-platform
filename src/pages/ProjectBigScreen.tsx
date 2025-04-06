import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  HomeOutlined,
  ThunderboltOutlined,
  ApiOutlined,
  BulbOutlined,
  DatabaseOutlined,
  RocketOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import dashboardImage from '../assets/images/dashboard.png';
import { projects, Project, ModuleType } from '../mock/data';

const { Sider } = Layout;

// 模块菜单配置
const moduleMenuItems: Record<ModuleType, { icon: React.ReactElement, title: string }> = {
  '源': { icon: <ThunderboltOutlined />, title: '能源' },
  '网': { icon: <ApiOutlined />, title: '能网' },
  '荷': { icon: <BulbOutlined />, title: '负荷' },
  '储': { icon: <DatabaseOutlined />, title: '储能' },
  '充': { icon: <RocketOutlined />, title: '充电' }
};

const ProjectBigScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  // 加载项目数据
  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === id);
      setProject(foundProject || null);
    }
  }, [id]);

  // Add effect to ensure the body has no margin/padding
  useEffect(() => {
    // Store original styles
    const originalOverflow = document.body.style.overflow;
    const originalMargin = document.body.style.margin;
    const originalPadding = document.body.style.padding;
    
    // Set styles for full screen view
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Cleanup function to restore original styles
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.margin = originalMargin;
      document.body.style.padding = originalPadding;
    };
  }, []);

  // 返回项目详情页
  const handleBackToProject = () => {
    if (id) {
      navigate(`/projects/${id}`);
    }
  };

  // 生成菜单项
  const generateMenuItems = () => {
    if (!project) return [];

    // 首页菜单项
    const menuItems: any[] = [
      {
        key: 'back',
        icon: <ArrowLeftOutlined />,
        label: '返回项目',
        onClick: handleBackToProject
      },
      {
        key: 'overview',
        icon: <HomeOutlined />,
        label: '项目概览',
        onClick: () => {/* 暂时保持当前视图 */}
      }
    ];

    // 添加模块菜单
    project.modules.forEach(moduleName => {
      const moduleConfig = moduleMenuItems[moduleName];
      menuItems.push({
        key: moduleName,
        icon: moduleConfig.icon,
        label: `${moduleName}${moduleConfig.title}大屏`
      });
    });

    return menuItems;
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider
        width={200}
        style={{
          background: '#031527',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          boxShadow: '2px 0 8px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ 
          color: '#fff', 
          textAlign: 'center', 
          padding: '20px 0',
          fontSize: '16px',
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {project?.name || '项目'} 大屏
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['overview']}
          style={{ background: '#031527', marginTop: '10px' }}
          items={generateMenuItems()}
        />
      </Sider>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#031527',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 200,
        right: 0,
        bottom: 0
      }}>
        <img 
          src={dashboardImage} 
          alt="园区智慧能源管理系统" 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            margin: 0,
            padding: 0
          }} 
        />
      </div>
    </Layout>
  );
};

export default ProjectBigScreen; 
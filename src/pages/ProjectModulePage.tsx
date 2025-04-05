import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Empty, Spin, Result, Button } from 'antd';
import { projects, Project, ModuleType } from '../mock/data';
import SolarDashboard from '../components/solar/SolarDashboard';

// 定义模块页面展示内容
interface ModulePageContentProps {
  project: Project;
  module: ModuleType;
  subModule: string;
  page: string;
}

const ModulePageContent: React.FC<ModulePageContentProps> = ({ project, module, subModule, page }) => {
  // 源-光伏对接-光伏综合看板
  if (module === '源' && subModule === '光伏对接' && page === '光伏综合看板') {
    return <SolarDashboard projectId={project.id} />;
  }
  
  // 其他模块页面
  return (
    <Card title={`${subModule} - ${page}`}>
      <p>这是项目 <strong>{project.name}</strong> 的 <strong>{module}</strong> 模块下的 <strong>{subModule}</strong> 功能中的 <strong>{page}</strong> 页面。</p>
      <p>在实际应用中，这里将显示对应模块的具体功能内容。</p>
      
      <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
        <h3>模块信息</h3>
        <p><strong>项目ID:</strong> {project.id}</p>
        <p><strong>模块:</strong> {module}</p>
        <p><strong>子模块:</strong> {subModule}</p>
        <p><strong>页面:</strong> {page}</p>
        <p><strong>项目类型:</strong> {project.type}</p>
        <p><strong>项目状态:</strong> {project.status}</p>
      </div>
      
      <Result
        status="info"
        title="功能正在开发中"
        subTitle="该功能页面尚在开发阶段，敬请期待！"
      />
    </Card>
  );
};

const ProjectModulePage: React.FC = () => {
  // 获取并解码URL参数
  const params = useParams<{ id: string; module: string; subModule: string; page: string }>();
  const id = params.id;
  const module = params.module ? decodeURIComponent(params.module) : undefined;
  const subModule = params.subModule ? decodeURIComponent(params.subModule) : undefined;
  const page = params.page ? decodeURIComponent(params.page) : undefined;
  
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // 模拟加载数据
    setLoading(true);
    setTimeout(() => {
      if (id) {
        const foundProject = projects.find(p => p.id === id);
        if (foundProject) {
          setProject(foundProject);
          
          // 验证模块是否存在于项目中
          if (module && !foundProject.modules.includes(module as ModuleType)) {
            setError(`项目 ${foundProject.name} 不包含 ${module} 模块`);
          } else {
            setError(null);
          }
        } else {
          setError('找不到项目');
        }
      } else {
        setError('无效的项目ID');
      }
      setLoading(false);
    }, 500);
  }, [id, module]);
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }
  
  if (error || !project || !module || !subModule || !page) {
    return (
      <Empty 
        description={error || '无效的页面路径'} 
        image={Empty.PRESENTED_IMAGE_SIMPLE} 
      />
    );
  }
  
  return (
    <ModulePageContent 
      project={project} 
      module={module as ModuleType} 
      subModule={subModule} 
      page={page} 
    />
  );
};

export default ProjectModulePage; 
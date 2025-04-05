import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Descriptions, Divider, Statistic, Space, Empty, Tag } from 'antd';
import { 
  ArrowLeftOutlined, 
  TeamOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  PercentageOutlined,
  EnvironmentOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { projects, clients, Project, Client, ModuleType } from '../mock/data';
import { getStatusTag, getTypeTag } from '../utils/helpers';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (id) {
      // Find project data
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
        
        // Find associated client
        const foundClient = clients.find(c => c.id === foundProject.clientId);
        if (foundClient) {
          setClient(foundClient);
        }
      } else {
        // Project not found, redirect to projects list
        navigate('/projects');
      }
    }
  }, [id, navigate]);

  const goBack = () => {
    navigate('/projects');
  };

  const goToClient = () => {
    if (client) {
      navigate(`/clients/${client.id}`);
    }
  };

  // Map the project type to a human-readable name in Chinese
  const getProjectTypeName = (type: Project['type']): string => {
    const typeMap: Record<Project['type'], string> = {
      'solar': '太阳能',
      'wind': '风能',
      'hydro': '水能',
      'biomass': '生物质能',
      'geothermal': '地热能'
    };
    
    return typeMap[type] || type;
  };
  
  // Map the project status to a human-readable name in Chinese
  const getProjectStatusName = (status: Project['status']): string => {
    const statusMap: Record<Project['status'], string> = {
      'planning': '规划中',
      'construction': '建设中',
      'operational': '运营中',
      'maintenance': '维护中'
    };
    
    return statusMap[status] || status;
  };

  // Get module tag color
  const getModuleTagColor = (module: ModuleType): string => {
    const colorMap: Record<ModuleType, string> = {
      '源': 'volcano',
      '网': 'geekblue',
      '荷': 'purple',
      '储': 'gold',
      '充': 'green'
    };
    
    return colorMap[module] || 'default';
  };

  if (!project) {
    return loading ? <div>加载中...</div> : <Empty description="找不到该项目" />;
  }

  return (
    <div className="project-detail-page">
      <div style={{ marginBottom: 16 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={goBack}
        >
          返回项目列表
        </Button>
      </div>

      <Row gutter={[16, 24]}>
        <Col xs={24} md={16}>
          <Card 
            title={`项目详情: ${project.name}`}
            bordered={false}
          >
            <Descriptions layout="vertical" bordered column={{ xs: 1, sm: 2, md: 3 }}>
              <Descriptions.Item label="项目名称">
                {project.name}
              </Descriptions.Item>
              <Descriptions.Item label="项目类型">
                {getTypeTag(project.type)} {getProjectTypeName(project.type)}
              </Descriptions.Item>
              <Descriptions.Item label="项目状态">
                {getStatusTag(project.status)} {getProjectStatusName(project.status)}
              </Descriptions.Item>
              <Descriptions.Item label="客户">
                <span className="link-style" onClick={goToClient}>
                  {project.clientName}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="开始日期">
                <Space>
                  <ClockCircleOutlined />
                  {project.startDate}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="位置">
                <Space>
                  <EnvironmentOutlined />
                  {project.location.address}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="装机容量">
                <Space>
                  <ThunderboltOutlined />
                  {project.capacity} MW
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="效率">
                <Space>
                  <PercentageOutlined />
                  {project.efficiency}%
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="年发电量">
                {project.annualOutput.toLocaleString()} MWh
              </Descriptions.Item>
              <Descriptions.Item label="减碳量" span={2}>
                {project.carbonReduction.toLocaleString()} 吨CO₂
              </Descriptions.Item>
              <Descriptions.Item label="模块配置" span={3}>
                <Space>
                  <AppstoreOutlined />
                  {project.modules.map((module) => (
                    <Tag key={module} color={getModuleTagColor(module)}>
                      {module}
                    </Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="坐标" span={2}>
                纬度: {project.location.latitude}, 经度: {project.location.longitude}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card 
            title="项目统计"
            bordered={false}
          >
            <Statistic
              title="装机容量"
              value={project.capacity}
              suffix="MW"
              style={{ marginBottom: 16 }}
            />
            <Divider style={{ margin: '16px 0' }} />
            <Statistic
              title="年发电量"
              value={project.annualOutput.toLocaleString()}
              suffix="MWh"
              style={{ marginBottom: 16 }}
            />
            <Divider style={{ margin: '16px 0' }} />
            <Statistic
              title="效率"
              value={project.efficiency}
              suffix="%"
              style={{ marginBottom: 16 }}
            />
            <Divider style={{ margin: '16px 0' }} />
            <Statistic
              title="减碳量"
              value={project.carbonReduction.toLocaleString()}
              suffix="吨CO₂"
              style={{ marginBottom: 16 }}
            />
          </Card>
        </Col>
      </Row>

      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TeamOutlined style={{ marginRight: 8 }} />
                <span>客户信息</span>
              </div>
            } 
            bordered={false}
          >
            {client ? (
              <Descriptions layout="vertical" bordered column={{ xs: 1, sm: 2, md: 3 }}>
                <Descriptions.Item label="客户名称">
                  <span className="link-style" onClick={goToClient}>
                    {client.name}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="联系人">
                  {client.contact}
                </Descriptions.Item>
                <Descriptions.Item label="电话">
                  {client.phone}
                </Descriptions.Item>
                <Descriptions.Item label="电子邮箱">
                  {client.email}
                </Descriptions.Item>
                <Descriptions.Item label="地址" span={2}>
                  {client.address}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Empty description="无关联客户信息" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail; 
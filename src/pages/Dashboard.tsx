import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Divider, Table, Tag } from 'antd';
import { 
  ProjectOutlined, 
  TeamOutlined, 
  ThunderboltOutlined, 
  CheckCircleOutlined
} from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { dashboardStats, projects, Project } from '../mock/data';
import { getStatusTag, getTypeTag } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different project types
const getProjectIcon = (type: Project['type']) => {
  const iconSize: [number, number] = [25, 41];
  const iconAnchor: [number, number] = [12, 41];
  const popupAnchor: [number, number] = [1, -34];
  const shadowSize: [number, number] = [41, 41];
  
  let iconUrl = '';
  
  switch(type) {
    case 'solar':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png';
      break;
    case 'wind':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
      break;
    case 'hydro':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
      break;
    case 'biomass':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
      break;
    case 'geothermal':
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
      break;
    default:
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png';
  }
  
  return L.icon({
    iconUrl,
    iconSize,
    iconAnchor,
    popupAnchor,
    shadowSize
  });
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Table columns - Moved inside the component to access navigate
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Project) => (
        <span className="link-style" onClick={() => navigate(`/projects/${record.id}`)}>
          {text}
        </span>
      ),
    },
    {
      title: '客户',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (text: string, record: Project) => (
        <span className="link-style" onClick={() => navigate(`/clients/${record.clientId}`)}>
          {text}
        </span>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: Project['type']) => getTypeTag(type),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Project['status']) => getStatusTag(status),
    },
    {
      title: '装机容量 (MW)',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: '年发电量 (MWh)',
      dataIndex: 'annualOutput',
      key: 'annualOutput',
    },
  ];
  
  // Calculate the center of the map based on all project coordinates
  const calculateMapCenter = () => {
    if (projects.length === 0) return [35.8617, 104.1954]; // Default to center of China
    
    const sumLat = projects.reduce((sum, project) => sum + project.location.latitude, 0);
    const sumLng = projects.reduce((sum, project) => sum + project.location.longitude, 0);
    
    return [sumLat / projects.length, sumLng / projects.length];
  };
  
  const mapCenter = calculateMapCenter();
  
  return (
    <div className="dashboard">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="能源管理系统 - 综合概览" bordered={false}>
            <Row gutter={[32, 32]}>
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="客户总数" 
                  value={dashboardStats.totalClients} 
                  prefix={<TeamOutlined />} 
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="项目总数" 
                  value={dashboardStats.totalProjects} 
                  prefix={<ProjectOutlined />} 
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="总装机容量 (MW)" 
                  value={dashboardStats.totalCapacity} 
                  prefix={<ThunderboltOutlined />} 
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="运行中项目" 
                  value={dashboardStats.operationalProjects} 
                  prefix={<CheckCircleOutlined />} 
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="项目地图分布" bordered={false}>
            <div style={{ height: '500px', width: '100%' }}>
              <MapContainer 
                center={[mapCenter[0], mapCenter[1]]} 
                zoom={5} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {projects.map((project) => (
                  <Marker 
                    key={project.id}
                    position={[project.location.latitude, project.location.longitude]}
                    icon={getProjectIcon(project.type)}
                  >
                    <Popup>
                      <div>
                        <h3 
                          style={{ cursor: 'pointer', color: '#1890ff' }}
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          {project.name}
                        </h3>
                        <p>
                          <strong>客户:</strong>{' '}
                          <span 
                            style={{ cursor: 'pointer', color: '#1890ff' }}
                            onClick={() => navigate(`/clients/${project.clientId}`)}
                          >
                            {project.clientName}
                          </span>
                        </p>
                        <p><strong>类型:</strong> {project.type}</p>
                        <p><strong>装机容量:</strong> {project.capacity} MW</p>
                        <p><strong>效率:</strong> {project.efficiency}%</p>
                        <p><strong>状态:</strong> {project.status}</p>
                        <p><strong>地址:</strong> {project.location.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="项目列表" bordered={false}>
            <div className="responsive-table">
              <Table 
                dataSource={projects.map(project => ({ ...project, key: project.id }))} 
                columns={columns} 
                pagination={{ pageSize: 5 }}
                loading={loading}
              />
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card title="项目类型分布" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic 
                  title="太阳能" 
                  value={dashboardStats.projectsByType.solar} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="风能" 
                  value={dashboardStats.projectsByType.wind} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="水能" 
                  value={dashboardStats.projectsByType.hydro} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
              <Col span={8}>
                <Statistic 
                  title="生物质能" 
                  value={dashboardStats.projectsByType.biomass} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
              <Col span={8}>
                <Statistic 
                  title="地热能" 
                  value={dashboardStats.projectsByType.geothermal} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="环境效益" bordered={false}>
            <Statistic 
              title="年总发电量 (MWh)" 
              value={dashboardStats.totalAnnualOutput.toLocaleString()} 
              valueStyle={{ color: '#3f8600' }}
            />
            <Statistic 
              title="年减碳量 (吨CO₂)" 
              value={dashboardStats.totalCarbonReduction.toLocaleString()} 
              valueStyle={{ color: '#3f8600' }}
              style={{ marginTop: '16px' }}
            />
          </Card>
        </Col>
      </Row>

      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="项目模块分布" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8} md={4} lg={4}>
                <Statistic 
                  title={<Tag color="volcano">源</Tag>} 
                  value={dashboardStats.moduleStats['源']} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
              <Col xs={12} sm={8} md={4} lg={4}>
                <Statistic 
                  title={<Tag color="geekblue">网</Tag>} 
                  value={dashboardStats.moduleStats['网']} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
              <Col xs={12} sm={8} md={4} lg={4}>
                <Statistic 
                  title={<Tag color="purple">荷</Tag>} 
                  value={dashboardStats.moduleStats['荷']} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
              <Col xs={12} sm={8} md={4} lg={4}>
                <Statistic 
                  title={<Tag color="gold">储</Tag>} 
                  value={dashboardStats.moduleStats['储']} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
              <Col xs={12} sm={8} md={4} lg={4}>
                <Statistic 
                  title={<Tag color="green">充</Tag>} 
                  value={dashboardStats.moduleStats['充']} 
                  suffix={`/ ${dashboardStats.totalProjects}`} 
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 
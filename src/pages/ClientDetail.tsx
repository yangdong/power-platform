import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Descriptions, Divider, Table, Tag, Statistic, Space, Empty } from 'antd';
import { 
  ArrowLeftOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  ProjectOutlined
} from '@ant-design/icons';
import { clients, projects, Client, Project } from '../mock/data';
import { getStatusTag, getTypeTag } from '../utils/helpers';

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Client | null>(null);
  const [clientProjects, setClientProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (id) {
      // Find client data
      const foundClient = clients.find(c => c.id === id);
      if (foundClient) {
        setClient(foundClient);
        
        // Find projects for this client
        const clientProjects = projects.filter(p => p.clientId === id);
        setClientProjects(clientProjects);
      } else {
        // Client not found, redirect to clients list
        navigate('/clients');
      }
    }
  }, [id, navigate]);

  const goBack = () => {
    navigate('/clients');
  };

  // Table columns for projects
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Project) => (
        <a onClick={() => navigate(`/projects/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: Project['type']) => getTypeTag(type),
    },
    {
      title: '容量 (MW)',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: '效率',
      dataIndex: 'efficiency',
      key: 'efficiency',
      render: (efficiency: number) => `${efficiency}%`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Project['status']) => getStatusTag(status),
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '年发电量 (MWh)',
      dataIndex: 'annualOutput',
      key: 'annualOutput',
    },
  ];

  // Calculate stats for client projects
  const stats = {
    totalProjects: clientProjects.length,
    totalCapacity: clientProjects.reduce((sum, project) => sum + project.capacity, 0),
    operationalProjects: clientProjects.filter(p => p.status === 'operational').length,
    totalAnnualOutput: clientProjects.reduce((sum, project) => sum + project.annualOutput, 0),
  };

  if (!client) {
    return <div>加载中...</div>;
  }

  return (
    <div className="client-detail-page">
      <div style={{ marginBottom: 16 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={goBack}
        >
          返回客户列表
        </Button>
      </div>

      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Card 
            title={`客户详情: ${client.name}`}
            bordered={false}
          >
            <Descriptions layout="vertical" bordered column={{ xs: 1, sm: 2, md: 3 }}>
              <Descriptions.Item label="客户名称">
                {client.name}
              </Descriptions.Item>
              <Descriptions.Item label="联系人">
                {client.contact}
              </Descriptions.Item>
              <Descriptions.Item label="电话">
                <Space>
                  <PhoneOutlined />
                  {client.phone}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="电子邮箱">
                <Space>
                  <MailOutlined />
                  {client.email}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="地址" span={2}>
                <Space>
                  <EnvironmentOutlined />
                  {client.address}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ProjectOutlined style={{ marginRight: 8 }} />
                <span>项目列表</span>
              </div>
            } 
            bordered={false}
          >
            {clientProjects.length > 0 ? (
              <>
                <Row gutter={[32, 16]} style={{ marginBottom: 24 }}>
                  <Col xs={24} sm={12} md={6}>
                    <Statistic 
                      title="项目数量" 
                      value={stats.totalProjects} 
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Statistic 
                      title="总装机容量 (MW)" 
                      value={stats.totalCapacity.toFixed(1)} 
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Statistic 
                      title="运行中项目" 
                      value={stats.operationalProjects} 
                      suffix={`/ ${stats.totalProjects}`}
                    />
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Statistic 
                      title="年发电量 (MWh)" 
                      value={stats.totalAnnualOutput.toLocaleString()} 
                    />
                  </Col>
                </Row>
                
                <div className="responsive-table">
                  <Table
                    columns={columns}
                    dataSource={clientProjects.map(project => ({ ...project, key: project.id }))}
                    pagination={{ pageSize: 5 }}
                    loading={loading}
                  />
                </div>
              </>
            ) : (
              <Empty description="该客户暂无项目" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ClientDetail; 
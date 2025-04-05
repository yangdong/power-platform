import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Descriptions, Tag, Skeleton, Divider, Typography, List, Avatar, Space } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Project, projects, clients } from '../mock/data';
import { PhoneOutlined, MailOutlined, HomeOutlined, TeamOutlined, BankOutlined } from '@ant-design/icons';
import { getStatusTag, getTypeTag } from '../utils/helpers';

const { Title, Text } = Typography;

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (id) {
        const projectData = projects.find(p => p.id === id);
        setProject(projectData || null);
        
        if (projectData) {
          const clientData = clients.find(c => c.id === projectData.clientId);
          setClient(clientData || null);
        }
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '24px' }}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '32px' }}>
            <Title level={4}>项目不存在或已被删除</Title>
            <div style={{ marginTop: '24px' }}>
              <a onClick={() => navigate('/projects')}>返回项目列表</a>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{project.name}</span>
                {getTypeTag(project.type)}
                {getStatusTag(project.status)}
              </Space>
            }
            bordered={false}
          >
            <Descriptions layout="vertical" column={{ xs: 1, sm: 2, md: 3 }}>
              <Descriptions.Item label="项目编号">{project.id}</Descriptions.Item>
              <Descriptions.Item label="项目类型">{project.type}</Descriptions.Item>
              <Descriptions.Item label="项目状态">{project.status}</Descriptions.Item>
              <Descriptions.Item label="开始日期">{project.startDate}</Descriptions.Item>
              <Descriptions.Item label="结束日期">{project.endDate || '未设置'}</Descriptions.Item>
              <Descriptions.Item label="项目经理">{project.manager}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{project.createdAt}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>项目描述</Title>
            <div style={{ marginBottom: '16px' }}>
              <Text>{project.description}</Text>
            </div>

            <Title level={5}>项目备注</Title>
            <div>
              <Text>{project.notes || '暂无备注'}</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title={<Space><TeamOutlined /> <span>客户信息</span></Space>} 
            bordered={false}
          >
            {client ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <Avatar size={64} icon={<BankOutlined />} />
                  <Title level={4} style={{ marginTop: '16px', marginBottom: '0' }}>{client.name}</Title>
                  <Text type="secondary">{client.industry}</Text>
                </div>
                
                <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />
                
                <List itemLayout="horizontal">
                  <List.Item>
                    <List.Item.Meta
                      avatar={<PhoneOutlined />}
                      title="联系电话"
                      description={client.phone}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<MailOutlined />}
                      title="电子邮箱"
                      description={client.email}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<HomeOutlined />}
                      title="联系地址"
                      description={client.address}
                    />
                  </List.Item>
                </List>
                
                <Divider style={{ marginTop: '16px', marginBottom: '16px' }} />
                
                <div>
                  <Text strong>联系人:</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text>{client.contactPerson} ({client.contactTitle})</Text>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px' }}>
                <Text>无法获取客户信息</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail; 
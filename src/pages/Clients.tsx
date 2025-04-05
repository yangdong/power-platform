import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, Row, Col, Statistic, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ProjectOutlined } from '@ant-design/icons';
import { clients, Client } from '../mock/data';
import { useNavigate } from 'react-router-dom';

const Clients: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientsList, setClientsList] = useState<Client[]>(clients);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handlers for modal
  const showModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      form.setFieldsValue(client);
    } else {
      setEditingClient(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingClient) {
        // Update existing client
        const updatedClients = clientsList.map((client) =>
          client.id === editingClient.id ? { ...client, ...values } : client
        );
        setClientsList(updatedClients);
      } else {
        // Add new client
        const newClient: Client = {
          id: String(clientsList.length + 1),
          projectsCount: 0,
          ...values,
        };
        setClientsList([...clientsList, newClient]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  // Handler for delete
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除此客户吗？删除后无法恢复。',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const updatedClients = clientsList.filter((client) => client.id !== id);
        setClientsList(updatedClients);
      },
    });
  };

  // 导航到客户详情页
  const goToClientDetail = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  // Table columns
  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Client) => (
        <span className="link-style" onClick={() => goToClientDetail(record.id)}>
          {text}
        </span>
      ),
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '项目数量',
      dataIndex: 'projectsCount',
      key: 'projectsCount',
      render: (count: number) => (
        <Tag color={count > 0 ? 'green' : 'default'} icon={<ProjectOutlined />}>
          {count}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Client) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          >
            编辑
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // Calculate stats
  const stats = {
    totalClients: clientsList.length,
    totalProjects: clientsList.reduce((sum, client) => sum + client.projectsCount, 0),
    averageProjects: clientsList.length > 0
      ? clientsList.reduce((sum, client) => sum + client.projectsCount, 0) / clientsList.length
      : 0,
  };

  return (
    <div className="clients-page">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Card title="客户管理" bordered={false}>
            <Row gutter={[32, 16]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={8}>
                <Statistic 
                  title="客户总数" 
                  value={stats.totalClients} 
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic 
                  title="总项目数" 
                  value={stats.totalProjects} 
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic 
                  title="平均项目数/客户" 
                  value={stats.averageProjects.toFixed(1)} 
                />
              </Col>
            </Row>
            
            <Divider />
            
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => showModal()}
              >
                添加客户
              </Button>
            </div>
            
            <div className="responsive-table">
              <Table 
                columns={columns} 
                dataSource={clientsList.map(client => ({ ...client, key: client.id }))} 
                pagination={{ pageSize: 10 }}
                loading={loading}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Client Form Modal */}
      <Modal
        title={editingClient ? '编辑客户' : '添加客户'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingClient ? '保存' : '添加'}
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          name="clientForm"
        >
          <Form.Item
            name="name"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input placeholder="请输入客户名称" />
          </Form.Item>
          <Form.Item
            name="contact"
            label="联系人"
            rules={[{ required: true, message: '请输入联系人姓名' }]}
          >
            <Input placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="电子邮箱"
            rules={[
              { required: true, message: '请输入电子邮箱' },
              { type: 'email', message: '请输入有效的电子邮箱' }
            ]}
          >
            <Input placeholder="请输入电子邮箱" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
            rules={[{ required: true, message: '请输入电话号码' }]}
          >
            <Input placeholder="请输入电话号码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients; 
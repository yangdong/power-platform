import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, DatePicker, Row, Col, Statistic, Divider, Tabs, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined } from '@ant-design/icons';
import { projects, Project, clients, ModuleType } from '../mock/data';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getStatusTag, getTypeTag } from '../utils/helpers';

const { TabPane } = Tabs;
const { Option } = Select;

// 模块选项
const moduleOptions = [
  { label: '源', value: '源' },
  { label: '网', value: '网' },
  { label: '荷', value: '荷' },
  { label: '储', value: '储' },
  { label: '充', value: '充' },
];

// 获取模块标签颜色
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

const Projects: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle filtering by type from URL query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeFilter = params.get('type');
    
    if (typeFilter) {
      setFilteredProjects(projectsList.filter(project => project.type === typeFilter));
    } else {
      setFilteredProjects(projectsList);
    }
  }, [location.search, projectsList]);

  // Handlers for modal
  const showModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      form.setFieldsValue({
        ...project,
        startDate: moment(project.startDate),
        clientId: project.clientId,
        modules: project.modules,
        // 解构位置信息
        address: project.location.address,
        latitude: project.location.latitude,
        longitude: project.location.longitude,
      });
    } else {
      setEditingProject(null);
      form.resetFields();
      // 设置默认值
      form.setFieldsValue({
        modules: ['源', '网'], // 默认选择源和网模块
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const client = clients.find(c => c.id === values.clientId);
      
      const formattedValues = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        clientName: client ? client.name : '',
        location: {
          address: values.address,
          latitude: values.latitude,
          longitude: values.longitude,
        },
        // 确保模块属性存在
        modules: values.modules || [],
      };
      
      // Remove the separate location fields that aren't in the project structure
      delete formattedValues.address;
      delete formattedValues.latitude;
      delete formattedValues.longitude;
      
      if (editingProject) {
        // Update existing project
        const updatedProjects = projectsList.map((project) =>
          project.id === editingProject.id ? { ...project, ...formattedValues } : project
        );
        setProjectsList(updatedProjects);
      } else {
        // Add new project
        const newProject: Project = {
          id: String(projectsList.length + 1),
          ...formattedValues,
        };
        setProjectsList([...projectsList, newProject]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  // Handler for delete
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除此项目吗？删除后无法恢复。',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const updatedProjects = projectsList.filter((project) => project.id !== id);
        setProjectsList(updatedProjects);
      },
    });
  };

  // Handle tab change
  const handleTabChange = (activeKey: string) => {
    if (activeKey === 'all') {
      navigate('/projects');
    } else {
      navigate(`/projects?type=${activeKey}`);
    }
  };

  // Table columns
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Project) => (
        <span className="link-style" onClick={() => navigate(`/projects/detail/${record.id}`)}>
          {text}
        </span>
      ),
    },
    {
      title: '客户',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: Project['type']) => getTypeTag(type),
    },
    {
      title: '模块',
      dataIndex: 'modules',
      key: 'modules',
      render: (modules: ModuleType[]) => (
        <Space>
          {modules.map(module => (
            <Tag key={module} color={getModuleTagColor(module)}>
              {module}
            </Tag>
          ))}
        </Space>
      ),
      filters: moduleOptions.map(option => ({ text: option.label, value: option.value })),
      onFilter: (value: any, record: Project) => 
        record.modules.includes(value as ModuleType),
    },
    {
      title: '容量 (MW)',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a: Project, b: Project) => a.capacity - b.capacity,
    },
    {
      title: '效率',
      dataIndex: 'efficiency',
      key: 'efficiency',
      render: (efficiency: number) => `${efficiency}%`,
      sorter: (a: Project, b: Project) => a.efficiency - b.efficiency,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Project['status']) => getStatusTag(status),
      filters: [
        { text: '规划中', value: 'planning' },
        { text: '建设中', value: 'construction' },
        { text: '运营中', value: 'operational' },
        { text: '维护中', value: 'maintenance' },
      ],
      onFilter: (value: any, record: Project) => record.status === value,
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a: Project, b: Project) => moment(a.startDate).unix() - moment(b.startDate).unix(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Project) => (
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

  // Calculate stats for current filtered list
  const stats = {
    totalProjects: filteredProjects.length,
    totalCapacity: filteredProjects.reduce((sum, project) => sum + project.capacity, 0),
    avgEfficiency: filteredProjects.length > 0
      ? filteredProjects.reduce((sum, project) => sum + project.efficiency, 0) / filteredProjects.length
      : 0,
    operationalProjects: filteredProjects.filter(p => p.status === 'operational').length,
  };

  return (
    <div className="projects-page">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Card title="项目管理" bordered={false}>
            <Row gutter={[32, 16]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="项目总数" 
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
                  title="平均效率" 
                  value={`${stats.avgEfficiency.toFixed(1)}%`} 
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic 
                  title="运行中项目" 
                  value={stats.operationalProjects} 
                  suffix={`/ ${stats.totalProjects}`}
                />
              </Col>
            </Row>
            
            <Divider />
            
            <Tabs 
              defaultActiveKey="all" 
              onChange={handleTabChange}
              activeKey={location.search ? location.search.split('=')[1] : 'all'}
              tabBarExtraContent={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => showModal()}
                >
                  添加项目
                </Button>
              }
            >
              <TabPane tab="所有项目" key="all" />
              <TabPane tab="太阳能" key="solar" />
              <TabPane tab="风能" key="wind" />
              <TabPane tab="水能" key="hydro" />
              <TabPane tab="生物质能" key="biomass" />
              <TabPane tab="地热能" key="geothermal" />
            </Tabs>
            
            <div className="responsive-table">
              <Table 
                columns={columns} 
                dataSource={filteredProjects.map(project => ({ ...project, key: project.id }))} 
                pagination={{ pageSize: 10 }}
                loading={loading}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Project Form Modal */}
      <Modal
        title={editingProject ? '编辑项目' : '添加项目'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingProject ? '保存' : '添加'}
        cancelText="取消"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          name="projectForm"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="项目名称"
                rules={[{ required: true, message: '请输入项目名称' }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="clientId"
                label="所属客户"
                rules={[{ required: true, message: '请选择客户' }]}
              >
                <Select placeholder="请选择客户">
                  {clients.map(client => (
                    <Option key={client.id} value={client.id}>{client.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="项目类型"
                rules={[{ required: true, message: '请选择项目类型' }]}
              >
                <Select placeholder="请选择项目类型">
                  <Option value="solar">太阳能</Option>
                  <Option value="wind">风能</Option>
                  <Option value="hydro">水能</Option>
                  <Option value="biomass">生物质能</Option>
                  <Option value="geothermal">地热能</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="项目状态"
                rules={[{ required: true, message: '请选择项目状态' }]}
              >
                <Select placeholder="请选择项目状态">
                  <Option value="planning">规划中</Option>
                  <Option value="construction">建设中</Option>
                  <Option value="operational">运营中</Option>
                  <Option value="maintenance">维护中</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="capacity"
                label="装机容量 (MW)"
                rules={[{ required: true, message: '请输入装机容量' }]}
              >
                <InputNumber min={0} placeholder="MW" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="efficiency"
                label="效率 (%)"
                rules={[{ required: true, message: '请输入效率' }]}
              >
                <InputNumber min={0} max={100} placeholder="%" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="startDate"
                label="开始日期"
                rules={[{ required: true, message: '请选择开始日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="modules"
                label={
                  <Space>
                    <AppstoreOutlined />
                    <span>模块配置（最多选择5个）</span>
                  </Space>
                }
                rules={[
                  { required: true, message: '请选择至少一个模块' },
                  {
                    validator: (_, value) => {
                      if (value && value.length > 5) {
                        return Promise.reject('最多选择5个模块');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Checkbox.Group options={moduleOptions} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="地址"
                initialValue={editingProject?.location.address}
                rules={[{ required: true, message: '请输入地址' }]}
              >
                <Input placeholder="请输入地址" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="latitude"
                label="纬度"
                initialValue={editingProject?.location.latitude}
                rules={[{ required: true, message: '请输入纬度' }]}
              >
                <InputNumber min={-90} max={90} placeholder="纬度" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="longitude"
                label="经度"
                initialValue={editingProject?.location.longitude}
                rules={[{ required: true, message: '请输入经度' }]}
              >
                <InputNumber min={-180} max={180} placeholder="经度" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="annualOutput"
                label="年发电量 (MWh)"
                rules={[{ required: true, message: '请输入年发电量' }]}
              >
                <InputNumber min={0} placeholder="MWh" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="carbonReduction"
                label="年减碳量 (吨CO₂)"
                rules={[{ required: true, message: '请输入年减碳量' }]}
              >
                <InputNumber min={0} placeholder="吨CO₂" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Projects; 
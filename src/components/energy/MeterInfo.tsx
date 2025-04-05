import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Tabs, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  Spin, 
  Tooltip, 
  Row, 
  Col, 
  Descriptions, 
  Badge, 
  Select, 
  Drawer, 
  InputNumber,
  message
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  ThunderboltOutlined, 
  ExperimentOutlined, 
  SyncOutlined, 
  HistoryOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { 
  Meter, 
  MeterReading, 
  MeterType, 
  MeterStatus, 
  getMeterData, 
  electricMeters, 
  waterMeters, 
  meterReadings 
} from '../../mock/data';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

/**
 * 仪表信息组件
 */
const MeterInfo: React.FC<{ projectId: string }> = ({ projectId }) => {
  // 状态
  const [loading, setLoading] = useState(true);
  const [activeTabKey, setActiveTabKey] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [meters, setMeters] = useState<Meter[]>([]);
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
  const [readingVisible, setReadingVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [meterReadingHistory, setMeterReadingHistory] = useState<MeterReading[]>([]);
  const [manualReadingForm] = Form.useForm();

  // 加载数据
  useEffect(() => {
    const fetchMeterData = async () => {
      setLoading(true);
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 从mock数据获取仪表信息
      const { allMeters, meterReadings } = getMeterData(projectId);
      setMeters(allMeters);
      setReadings(meterReadings);
      setLoading(false);
    };

    fetchMeterData();
  }, [projectId]);

  // 过滤后的仪表数据
  const filteredMeters = meters.filter(meter => {
    if (!searchText) return true;
    
    const searchLower = searchText.toLowerCase();
    return (
      meter.name.toLowerCase().includes(searchLower) ||
      meter.serialNumber.toLowerCase().includes(searchLower) ||
      meter.location.toLowerCase().includes(searchLower) ||
      meter.buildingName.toLowerCase().includes(searchLower)
    );
  });

  // 分类仪表数据
  const getMetersByType = (type: string) => {
    if (type === 'all') return filteredMeters;
    if (type === 'electric') return filteredMeters.filter(meter => meter.type === 'electric');
    if (type === 'water') return filteredMeters.filter(meter => meter.type === 'water');
    return [];
  };

  // Tab 配置
  const tabItems: TabsProps['items'] = [
    {
      key: 'all',
      label: '全部仪表',
      children: <MeterTable 
                  meters={getMetersByType('all')} 
                  loading={loading} 
                  onView={handleViewMeter}
                  onAddReading={handleAddReading}
                  onViewHistory={handleViewHistory}
                />
    },
    {
      key: 'electric',
      label: (
        <span>
          <ThunderboltOutlined /> 电表
        </span>
      ),
      children: <MeterTable 
                  meters={getMetersByType('electric')} 
                  loading={loading} 
                  onView={handleViewMeter}
                  onAddReading={handleAddReading}
                  onViewHistory={handleViewHistory}
                />,
    },
    {
      key: 'water',
      label: (
        <span>
          <ExperimentOutlined /> 水表
        </span>
      ),
      children: <MeterTable 
                  meters={getMetersByType('water')} 
                  loading={loading} 
                  onView={handleViewMeter}
                  onAddReading={handleAddReading}
                  onViewHistory={handleViewHistory}
                />,
    },
  ];

  // 处理 Tab 切换
  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 查看仪表详情
  function handleViewMeter(meter: Meter) {
    setSelectedMeter(meter);
    setDetailVisible(true);
  }

  // 添加手动抄表记录
  function handleAddReading(meter: Meter) {
    setSelectedMeter(meter);
    setReadingVisible(true);
    manualReadingForm.setFieldsValue({
      readingDate: dayjs(),
      previousValue: meter.lastReadingValue,
    });
  }

  // 查看抄表历史
  function handleViewHistory(meter: Meter) {
    setSelectedMeter(meter);
    // 查找该仪表的抄表历史
    const history = readings.filter(reading => reading.meterId === meter.id);
    setMeterReadingHistory(history);
    setHistoryVisible(true);
  }

  // 提交手动抄表
  const handleManualReadingSubmit = () => {
    manualReadingForm.validateFields().then(values => {
      if (!selectedMeter) return;
      
      const { readingValue, remark } = values;
      const readingDate = values.readingDate.format('YYYY-MM-DD HH:mm:ss');
      const previousValue = selectedMeter.lastReadingValue;
      const consumption = readingValue - previousValue;
      
      // 检查读数是否合理
      if (consumption < 0) {
        message.error('本次读数不能小于上次读数');
        return;
      }
      
      // 创建新的抄表记录
      const newReading: MeterReading = {
        id: `reading-${selectedMeter.id}-${new Date().toISOString()}`,
        meterId: selectedMeter.id,
        meterName: selectedMeter.name,
        meterType: selectedMeter.type,
        readingDate: readingDate,
        readingValue: readingValue,
        previousValue: previousValue,
        consumption: parseFloat(consumption.toFixed(1)),
        operator: '当前用户',
        readingMethod: 'manual',
        remark: remark || '',
        unit: selectedMeter.unit,
        status: 'normal'
      };
      
      // 更新抄表记录
      const updatedReadings = [newReading, ...readings];
      setReadings(updatedReadings);
      
      // 更新仪表数据
      const updatedMeters = meters.map(meter => {
        if (meter.id === selectedMeter.id) {
          return {
            ...meter,
            lastReadingDate: readingDate,
            lastReadingValue: readingValue
          };
        }
        return meter;
      });
      setMeters(updatedMeters);
      
      message.success('抄表记录添加成功');
      setReadingVisible(false);
      manualReadingForm.resetFields();
    });
  };

  // 渲染仪表状态标签
  const renderMeterStatusTag = (status: MeterStatus) => {
    switch (status) {
      case 'normal':
        return <Tag color="success">正常</Tag>;
      case 'fault':
        return <Tag color="error">故障</Tag>;
      case 'offline':
        return <Tag color="default">离线</Tag>;
      case 'maintenance':
        return <Tag color="warning">维护中</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  return (
    <div className="meter-info">
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Title level={4}>仪表信息</Title>
            <Text type="secondary">管理水表和电表信息，支持手动抄表操作</Text>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} md={8} lg={6}>
            <Input
              placeholder="搜索仪表名称、编号、位置..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              allowClear
            />
          </Col>
          <Col xs={24} md={16} lg={18} style={{ textAlign: 'right' }}>
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>添加仪表</Button>
              <Button icon={<SyncOutlined />} onClick={() => window.location.reload()}>刷新</Button>
            </Space>
          </Col>
        </Row>
        
        <Tabs activeKey={activeTabKey} onChange={handleTabChange} items={tabItems} />
      </Card>
      
      {/* 仪表详情抽屉 */}
      {selectedMeter && (
        <Drawer
          title={`仪表详情 - ${selectedMeter.name}`}
          width={720}
          placement="right"
          onClose={() => setDetailVisible(false)}
          open={detailVisible}
          extra={
            <Space>
              <Button onClick={() => setDetailVisible(false)}>关闭</Button>
            </Space>
          }
        >
          <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
            <Descriptions.Item label="仪表名称">{selectedMeter.name}</Descriptions.Item>
            <Descriptions.Item label="仪表类型">
              {selectedMeter.type === 'electric' ? 
                <span><ThunderboltOutlined style={{ color: '#1890ff' }} /> 电表</span> : 
                <span><ExperimentOutlined style={{ color: '#52c41a' }} /> 水表</span>
              }
            </Descriptions.Item>
            <Descriptions.Item label="仪表型号">{selectedMeter.model}</Descriptions.Item>
            <Descriptions.Item label="序列号">{selectedMeter.serialNumber}</Descriptions.Item>
            <Descriptions.Item label="安装日期">{selectedMeter.installationDate}</Descriptions.Item>
            <Descriptions.Item label="状态">{renderMeterStatusTag(selectedMeter.status)}</Descriptions.Item>
            <Descriptions.Item label="最近读数时间">{selectedMeter.lastReadingDate}</Descriptions.Item>
            <Descriptions.Item label="最近读数">
              {selectedMeter.lastReadingValue} {selectedMeter.unit}
            </Descriptions.Item>
            <Descriptions.Item label="抄表方式">
              {selectedMeter.readingMethod === 'auto' ? 
                <Badge status="processing" text="自动抄表" /> : 
                <Badge status="warning" text="手动抄表" />
              }
            </Descriptions.Item>
            <Descriptions.Item label="抄表周期">
              {selectedMeter.readingCycle === 'hourly' && '每小时'}
              {selectedMeter.readingCycle === 'daily' && '每天'}
              {selectedMeter.readingCycle === 'weekly' && '每周'}
              {selectedMeter.readingCycle === 'monthly' && '每月'}
            </Descriptions.Item>
            <Descriptions.Item label="位置" span={2}>{selectedMeter.location}</Descriptions.Item>
            <Descriptions.Item label="所属建筑" span={2}>
              {selectedMeter.buildingName}
              {selectedMeter.floorName && ` - ${selectedMeter.floorName}`}
              {selectedMeter.roomName && ` - ${selectedMeter.roomName}`}
            </Descriptions.Item>
            <Descriptions.Item label="制造商">{selectedMeter.manufacturer}</Descriptions.Item>
            <Descriptions.Item label="联系人">
              {selectedMeter.contacts} - {selectedMeter.contactPhone}
            </Descriptions.Item>
            {selectedMeter.gateway && (
            <Descriptions.Item label="网关信息" span={2}>
              {selectedMeter.gateway} (ID: {selectedMeter.gatewayId})
            </Descriptions.Item>
            )}
            <Descriptions.Item label="初始读数">
              {selectedMeter.initialReading} {selectedMeter.unit}
            </Descriptions.Item>
            <Descriptions.Item label="累计用量">
              {(selectedMeter.lastReadingValue - selectedMeter.initialReading).toFixed(1)} {selectedMeter.unit}
            </Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>{selectedMeter.description || '无'}</Descriptions.Item>
          </Descriptions>
          
          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusCircleOutlined />} 
                onClick={() => handleAddReading(selectedMeter)}
              >
                手动抄表
              </Button>
              <Button 
                icon={<HistoryOutlined />} 
                onClick={() => handleViewHistory(selectedMeter)}
              >
                查看抄表历史
              </Button>
            </Space>
          </div>
        </Drawer>
      )}
      
      {/* 手动抄表模态框 */}
      <Modal
        title="手动抄表"
        open={readingVisible}
        onCancel={() => setReadingVisible(false)}
        onOk={handleManualReadingSubmit}
        maskClosable={false}
      >
        {selectedMeter && (
          <Form
            form={manualReadingForm}
            layout="vertical"
          >
            <Form.Item label="仪表信息">
              <Input 
                value={`${selectedMeter.name} (${selectedMeter.type === 'electric' ? '电表' : '水表'}) - ${selectedMeter.location}`} 
                disabled 
              />
            </Form.Item>
            
            <Form.Item label="上次读数">
              <Input 
                value={`${selectedMeter.lastReadingValue} ${selectedMeter.unit} (${selectedMeter.lastReadingDate})`} 
                disabled 
              />
            </Form.Item>
            
            <Form.Item
              name="readingDate"
              label="抄表时间"
              rules={[{ required: true, message: '请选择抄表时间' }]}
            >
              <DatePicker 
                showTime 
                style={{ width: '100%' }} 
                format="YYYY-MM-DD HH:mm:ss" 
              />
            </Form.Item>
            
            <Form.Item
              name="readingValue"
              label={`本次读数 (${selectedMeter.unit})`}
              rules={[
                { required: true, message: '请输入本次读数' },
                { 
                  validator: (_, value) => {
                    if (value < selectedMeter.lastReadingValue) {
                      return Promise.reject(new Error('本次读数不能小于上次读数'));
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <InputNumber 
                style={{ width: '100%' }} 
                min={selectedMeter.lastReadingValue} 
                step={0.1} 
                precision={1}
              />
            </Form.Item>
            
            <Form.Item
              name="remark"
              label="备注"
            >
              <TextArea rows={3} placeholder="可选填写备注信息" />
            </Form.Item>
            
            <Form.Item
              name="previousValue"
              hidden
            >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
      
      {/* 抄表历史记录抽屉 */}
      <Drawer
        title={`抄表历史记录 - ${selectedMeter?.name}`}
        width={800}
        placement="right"
        onClose={() => setHistoryVisible(false)}
        open={historyVisible}
      >
        <Table
          dataSource={meterReadingHistory}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          columns={[
            {
              title: '抄表时间',
              dataIndex: 'readingDate',
              key: 'readingDate',
              width: 180,
              render: (date) => (
                <span>{date}</span>
              )
            },
            {
              title: '读数',
              dataIndex: 'readingValue',
              key: 'readingValue',
              render: (value, record) => (
                <span>{value} {record.unit}</span>
              )
            },
            {
              title: '上次读数',
              dataIndex: 'previousValue',
              key: 'previousValue',
              render: (value, record) => (
                <span>{value} {record.unit}</span>
              )
            },
            {
              title: '用量',
              dataIndex: 'consumption',
              key: 'consumption',
              render: (value, record) => (
                <span>{value} {record.unit}</span>
              )
            },
            {
              title: '抄表人',
              dataIndex: 'operator',
              key: 'operator',
            },
            {
              title: '方式',
              dataIndex: 'readingMethod',
              key: 'readingMethod',
              render: (method) => (
                method === 'auto' ? 
                <Tag color="blue">自动</Tag> : 
                <Tag color="orange">手动</Tag>
              )
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              render: (status) => (
                status === 'normal' ? 
                <Tag color="success">正常</Tag> : 
                <Tag color="error">异常</Tag>
              )
            },
            {
              title: '备注',
              dataIndex: 'remark',
              key: 'remark',
              ellipsis: true,
            }
          ]}
        />
      </Drawer>
    </div>
  );
};

/**
 * 仪表表格组件
 */
interface MeterTableProps {
  meters: Meter[];
  loading: boolean;
  onView: (meter: Meter) => void;
  onAddReading: (meter: Meter) => void;
  onViewHistory: (meter: Meter) => void;
}

const MeterTable: React.FC<MeterTableProps> = ({ 
  meters, 
  loading, 
  onView, 
  onAddReading, 
  onViewHistory 
}) => {
  // 表格列定义
  const columns = [
    {
      title: '仪表名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Meter) => (
        <a onClick={() => onView(record)}>
          {record.type === 'electric' ? 
            <ThunderboltOutlined style={{ color: '#1890ff', marginRight: 8 }} /> : 
            <ExperimentOutlined style={{ color: '#52c41a', marginRight: 8 }} />
          }
          {text}
        </a>
      )
    },
    {
      title: '型号/序列号',
      dataIndex: 'model',
      key: 'model',
      render: (model: string, record: Meter) => (
        <>
          <div>{model}</div>
          <Text type="secondary">{record.serialNumber}</Text>
        </>
      )
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      render: (location: string, record: Meter) => (
        <>
          <div>{location}</div>
          <Text type="secondary">{record.buildingName}</Text>
        </>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: MeterStatus) => {
        switch (status) {
          case 'normal':
            return <Tag color="success">正常</Tag>;
          case 'fault':
            return <Tag color="error">故障</Tag>;
          case 'offline':
            return <Tag color="default">离线</Tag>;
          case 'maintenance':
            return <Tag color="warning">维护中</Tag>;
          default:
            return <Tag color="default">未知</Tag>;
        }
      }
    },
    {
      title: '最近抄表',
      dataIndex: 'lastReadingDate',
      key: 'lastReadingDate',
      render: (date: string, record: Meter) => (
        <>
          <div>{date}</div>
          <Text type="secondary">
            {record.lastReadingValue} {record.unit}
          </Text>
        </>
      )
    },
    {
      title: '抄表方式',
      dataIndex: 'readingMethod',
      key: 'readingMethod',
      width: 100,
      render: (method: string) => (
        method === 'auto' ? 
          <Tag color="blue">自动</Tag> : 
          <Tag color="orange">手动</Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_: any, record: Meter) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => onView(record)} 
            />
          </Tooltip>
          <Tooltip title="手动抄表">
            <Button 
              type="text" 
              icon={<PlusCircleOutlined />} 
              onClick={() => onAddReading(record)} 
            />
          </Tooltip>
          <Tooltip title="抄表历史">
            <Button 
              type="text" 
              icon={<HistoryOutlined />} 
              onClick={() => onViewHistory(record)} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={meters} 
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default MeterInfo; 
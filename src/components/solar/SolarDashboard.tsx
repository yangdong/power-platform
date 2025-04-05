import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Divider, Table, Badge, Typography, Spin } from 'antd';
import { 
  ThunderboltOutlined, 
  LineChartOutlined, 
  DollarOutlined, 
  BarChartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ToolOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { SolarDashboardData, SolarStation, generateSolarDashboardData } from '../../mock/data';

const { Title } = Typography;

const SolarDashboard: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<SolarDashboardData | null>(null);

  useEffect(() => {
    // 模拟API请求获取数据
    const fetchData = async () => {
      setLoading(true);
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = generateSolarDashboardData();
      setDashboardData(data);
      setLoading(false);
    };

    fetchData();
  }, [projectId]);

  if (loading || !dashboardData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" tip="加载数据中..." />
      </div>
    );
  }

  // 处理饼图数据
  const pieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} kWh ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: dashboardData.yearGenerationByStation.map(item => item.stationName)
    },
    series: [
      {
        name: '年发电量占比',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: dashboardData.yearGenerationByStation.map(item => ({
          value: item.value,
          name: item.stationName
        }))
      }
    ]
  };

  // 处理折线图数据
  const lineOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} kWh'
    },
    xAxis: {
      type: 'category',
      data: dashboardData.yearGenerationTrend.map(item => item.month)
    },
    yAxis: {
      type: 'value',
      name: '发电量 (kWh)'
    },
    series: [
      {
        name: '月发电量',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 10,
          shadowOffsetY: 8
        },
        data: dashboardData.yearGenerationTrend.map(item => item.value),
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };

  // 电站状态表格列定义
  const columns = [
    {
      title: '电站名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '装机容量(kW)',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a: SolarStation, b: SolarStation) => a.capacity - b.capacity,
    },
    {
      title: '当前功率(kW)',
      dataIndex: 'currentPower',
      key: 'currentPower',
      sorter: (a: SolarStation, b: SolarStation) => a.currentPower - b.currentPower,
      render: (power: number) => power.toFixed(1)
    },
    {
      title: '今日发电量(kWh)',
      dataIndex: 'todayGeneration',
      key: 'todayGeneration',
      sorter: (a: SolarStation, b: SolarStation) => a.todayGeneration - b.todayGeneration,
      render: (gen: number) => gen.toFixed(1)
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'normal') {
          return <Badge status="success" text="正常运行" />;
        } else if (status === 'fault') {
          return <Badge status="error" text="故障" />;
        } else if (status === 'maintenance') {
          return <Badge status="warning" text="维护中" />;
        }
        return <Badge status="default" text="未知" />;
      },
      filters: [
        { text: '正常运行', value: 'normal' },
        { text: '故障', value: 'fault' },
        { text: '维护中', value: 'maintenance' }
      ],
      onFilter: (value: any, record: SolarStation) => record.status === value,
    }
  ];

  // 格式化数字显示
  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN', { maximumFractionDigits: 2 });
  };

  // 状态统计数据
  const normalStations = dashboardData.stations.filter(s => s.status === 'normal').length;
  const faultStations = dashboardData.stations.filter(s => s.status === 'fault').length;
  const maintenanceStations = dashboardData.stations.filter(s => s.status === 'maintenance').length;

  return (
    <div className="solar-dashboard">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={4}>光伏综合看板</Title>
        </Col>
      </Row>

      {/* 基本指标统计卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="电站数量"
              value={dashboardData.stationCount}
              suffix="个"
              valueStyle={{ color: '#3f8600' }}
              prefix={<ThunderboltOutlined />}
            />
            <div style={{ marginTop: 10 }}>
              <span style={{ marginRight: 10 }}>
                <Badge status="success" text={`正常：${normalStations}`} />
              </span>
              <span style={{ marginRight: 10 }}>
                <Badge status="error" text={`故障：${faultStations}`} />
              </span>
              <span>
                <Badge status="warning" text={`维护：${maintenanceStations}`} />
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="总装机容量"
              value={formatNumber(dashboardData.totalCapacity)}
              suffix="kW"
              valueStyle={{ color: '#1890ff' }}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="发电总功率"
              value={formatNumber(dashboardData.totalCurrentPower)}
              suffix="kW"
              valueStyle={{ color: '#cf1322' }}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 发电量信息 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="发电量信息">
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Statistic
                  title="今日发电量"
                  value={formatNumber(dashboardData.todayGeneration)}
                  suffix="kWh"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title="当月发电量"
                  value={formatNumber(dashboardData.monthGeneration)}
                  suffix="kWh"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title="当年发电量"
                  value={formatNumber(dashboardData.yearGeneration)}
                  suffix="kWh"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 收益信息 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="收益信息">
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Statistic
                  title="今日收益"
                  value={formatNumber(dashboardData.todayIncome)}
                  suffix="元"
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<DollarOutlined />}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title="当月收益"
                  value={formatNumber(dashboardData.monthIncome)}
                  suffix="元"
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<DollarOutlined />}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title="当年收益"
                  value={formatNumber(dashboardData.yearIncome)}
                  suffix="元"
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 数据可视化 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="年发电量占比">
            <ReactECharts option={pieOption} style={{ height: 400 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="年发电量趋势">
            <ReactECharts option={lineOption} style={{ height: 400 }} />
          </Card>
        </Col>
      </Row>

      {/* 电站列表 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="电站列表">
            <Table 
              columns={columns} 
              dataSource={dashboardData.stations} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SolarDashboard; 
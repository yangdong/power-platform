import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  Radio, 
  Tabs, 
  Spin, 
  Empty, 
  Typography, 
  Tooltip,
  Badge,
  Table,
  Divider
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  ThunderboltOutlined, 
  ExperimentOutlined,
  CalendarOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  SyncOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import ReactECharts from 'echarts-for-react';
import { 
  ConsumptionOverview as ConsumptionOverviewData, 
  ConsumptionPeriod, 
  getConsumptionData,
  BuildingConsumption,
  ConsumptionStats
} from '../../mock/data';

const { Title, Text } = Typography;

/**
 * 能耗总览组件 - 展示水电表用量统计信息
 */
const ConsumptionOverview: React.FC<{ projectId: string }> = ({ projectId }) => {
  // 状态
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<ConsumptionPeriod>('month');
  const [activeTabKey, setActiveTabKey] = useState('overview');
  const [data, setData] = useState<ConsumptionOverviewData | null>(null);

  // 加载数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // 获取能耗统计数据
      const consumptionData = getConsumptionData(projectId, period);
      setData(consumptionData);
      setLoading(false);
    };

    fetchData();
  }, [projectId, period]);

  // 处理周期切换
  const handlePeriodChange = (e: any) => {
    setPeriod(e.target.value);
  };

  // 处理Tab切换
  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  // Tab 配置
  const tabItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: (
        <span>
          <BarChartOutlined /> 总览
        </span>
      ),
      children: <OverviewTab data={data} period={period} loading={loading} />
    },
    {
      key: 'electric',
      label: (
        <span>
          <ThunderboltOutlined /> 用电统计
        </span>
      ),
      children: <ElectricTab data={data} period={period} loading={loading} />
    },
    {
      key: 'water',
      label: (
        <span>
          <ExperimentOutlined /> 用水统计
        </span>
      ),
      children: <WaterTab data={data} period={period} loading={loading} />
    },
    {
      key: 'building',
      label: (
        <span>
          <PieChartOutlined /> 建筑分布
        </span>
      ),
      children: <BuildingTab data={data} loading={loading} />
    },
  ];

  return (
    <div className="consumption-overview">
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} md={12}>
            <Title level={4}>能耗总览</Title>
            <Text type="secondary">
              园区内水电能耗统计分析，支持日、月、年多维度查看
            </Text>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Radio.Group 
              value={period} 
              onChange={handlePeriodChange} 
              buttonStyle="solid"
              style={{ marginRight: 16 }}
            >
              <Radio.Button value="day">日</Radio.Button>
              <Radio.Button value="month">月</Radio.Button>
              <Radio.Button value="year">年</Radio.Button>
            </Radio.Group>
            
            <Button 
              icon={<SyncOutlined />} 
              onClick={() => window.location.reload()}
            >
              刷新
            </Button>
          </Col>
        </Row>

        <Tabs activeKey={activeTabKey} onChange={handleTabChange} items={tabItems} />
      </Card>
    </div>
  );
};

/**
 * 总览标签页
 */
interface TabProps {
  data: ConsumptionOverviewData | null;
  period: ConsumptionPeriod;
  loading: boolean;
}

const OverviewTab: React.FC<TabProps> = ({ data, period, loading }) => {
  if (loading) {
    return <div style={{ padding: '20px 0', textAlign: 'center' }}><Spin size="large" /></div>;
  }

  if (!data) {
    return <Empty description="暂无数据" />;
  }

  // 展示当前周期的数据
  let consumptionData : {
    electric: ConsumptionStats[];
    water: ConsumptionStats[];
  };
  let chartTitle: string;
  let chartSubtitle: string;

  switch(period) {
    case 'day':
      consumptionData = {
        electric: data.hourlyElectricConsumption,
        water: data.hourlyWaterConsumption
      };
      chartTitle = '今日能耗趋势';
      chartSubtitle = '按小时统计';
      break;
    case 'month':
      consumptionData = {
        electric: data.dailyElectricConsumption,
        water: data.dailyWaterConsumption
      };
      chartTitle = '本月能耗趋势';
      chartSubtitle = '按日统计';
      break;
    case 'year':
      consumptionData = {
        electric: data.monthlyElectricConsumption,
        water: data.monthlyWaterConsumption
      };
      chartTitle = '本年能耗趋势';
      chartSubtitle = '按月统计';
      break;
  }

  // 合并线图配置
  const getLineChartOption = () => {
    const xAxisData = consumptionData.electric.map((item: ConsumptionStats) => item.time);
    const electricSeries = consumptionData.electric.map((item: ConsumptionStats) => item.value);
    const waterSeries = consumptionData.water.map((item: ConsumptionStats) => item.value);

    return {
      title: {
        text: chartTitle,
        subtext: chartSubtitle,
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params: any) {
          let tooltip = params[0].name + '<br/>';
          params.forEach((param: any) => {
            const unit = param.seriesIndex === 0 ? 'kWh' : 'm³';
            tooltip += param.marker + ' ' + param.seriesName + ': ' + param.value + ' ' + unit + '<br/>';
          });
          return tooltip;
        }
      },
      legend: {
        data: ['电量', '水量'],
        right: '10%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData
      },
      yAxis: [
        {
          type: 'value',
          name: '电量 (kWh)',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#5470C6'
            }
          }
        },
        {
          type: 'value',
          name: '水量 (m³)',
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#91CC75'
            }
          }
        }
      ],
      series: [
        {
          name: '电量',
          type: 'line',
          yAxisIndex: 0,
          data: electricSeries,
          itemStyle: {
            color: '#5470C6'
          }
        },
        {
          name: '水量',
          type: 'line',
          yAxisIndex: 1,
          data: waterSeries,
          itemStyle: {
            color: '#91CC75'
          }
        }
      ]
    };
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>当前统计周期：{data.currentPeriod}</Title>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总用电量"
              value={data.totalElectricConsumption}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ThunderboltOutlined />}
              suffix="kWh"
            />
            <div style={{ marginTop: 8 }}>
              {data.electricYoy > 0 ? (
                <Tooltip title="同比增长">
                  <Text type="danger">
                    <ArrowUpOutlined /> {(data.electricYoy * 100).toFixed(1)}%
                  </Text>
                </Tooltip>
              ) : (
                <Tooltip title="同比下降">
                  <Text type="success">
                    <ArrowDownOutlined /> {(Math.abs(data.electricYoy) * 100).toFixed(1)}%
                  </Text>
                </Tooltip>
              )}
              {period !== 'year' && (
                <Tooltip title="环比增长" style={{ marginLeft: 8 }}>
                  <Text type={data.electricMom > 0 ? "danger" : "success"}>
                    {data.electricMom > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {' '}{(Math.abs(data.electricMom) * 100).toFixed(1)}%
                  </Text>
                </Tooltip>
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总用水量"
              value={data.totalWaterConsumption}
              precision={2}
              valueStyle={{ color: '#52c41a' }}
              prefix={<ExperimentOutlined />}
              suffix="m³"
            />
            <div style={{ marginTop: 8 }}>
              {data.waterYoy > 0 ? (
                <Tooltip title="同比增长">
                  <Text type="danger">
                    <ArrowUpOutlined /> {(data.waterYoy * 100).toFixed(1)}%
                  </Text>
                </Tooltip>
              ) : (
                <Tooltip title="同比下降">
                  <Text type="success">
                    <ArrowDownOutlined /> {(Math.abs(data.waterYoy) * 100).toFixed(1)}%
                  </Text>
                </Tooltip>
              )}
              {period !== 'year' && (
                <Tooltip title="环比增长" style={{ marginLeft: 8 }}>
                  <Text type={data.waterMom > 0 ? "danger" : "success"}>
                    {data.waterMom > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {' '}{(Math.abs(data.waterMom) * 100).toFixed(1)}%
                  </Text>
                </Tooltip>
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="电量峰值"
              value={data.electricPeak}
              precision={2}
              valueStyle={{ color: '#722ed1' }}
              prefix={<ThunderboltOutlined />}
              suffix="kWh"
            />
            <div style={{ marginTop: 8 }}>
              <Badge color="blue" text={
                period === 'day' ? "小时峰值" : 
                period === 'month' ? "日峰值" : "月峰值"
              } />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="水量峰值"
              value={data.waterPeak}
              precision={2}
              valueStyle={{ color: '#13c2c2' }}
              prefix={<ExperimentOutlined />}
              suffix="m³"
            />
            <div style={{ marginTop: 8 }}>
              <Badge color="green" text={
                period === 'day' ? "小时峰值" : 
                period === 'month' ? "日峰值" : "月峰值"
              } />
            </div>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">能耗趋势</Divider>
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <ReactECharts option={getLineChartOption()} style={{ height: 400 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

/**
 * 用电统计标签页
 */
const ElectricTab: React.FC<TabProps> = ({ data, period, loading }) => {
  if (loading) {
    return <div style={{ padding: '20px 0', textAlign: 'center' }}><Spin size="large" /></div>;
  }

  if (!data) {
    return <Empty description="暂无数据" />;
  }

  // 选择当前周期的数据和长期趋势数据
  let currentData: ConsumptionStats[];
  let longTermData: ConsumptionStats[];
  let chartTitle: string;
  let chartSubtitle: string;

  switch(period) {
    case 'day':
      currentData = data.hourlyElectricConsumption;
      longTermData = data.dailyElectricConsumption;
      chartTitle = '今日用电趋势';
      chartSubtitle = '按小时统计';
      break;
    case 'month':
      currentData = data.dailyElectricConsumption;
      longTermData = data.monthlyElectricConsumption;
      chartTitle = '本月用电趋势';
      chartSubtitle = '按日统计';
      break;
    case 'year':
      currentData = data.monthlyElectricConsumption;
      longTermData = data.yearlyElectricConsumption;
      chartTitle = '本年用电趋势';
      chartSubtitle = '按月统计';
      break;
  }

  // 柱状图配置
  const getBarChartOption = () => {
    return {
      title: {
        text: chartTitle,
        subtext: chartSubtitle,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function(params: any) {
          const param = params[0];
          return param.name + '<br/>' + param.marker + ' ' + 
                 param.seriesName + ': ' + param.value + ' kWh';
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: currentData.map((item: ConsumptionStats) => item.time)
      },
      yAxis: {
        type: 'value',
        name: '电量 (kWh)'
      },
      series: [
        {
          name: '用电量',
          type: 'bar',
          data: currentData.map((item: ConsumptionStats) => item.value),
          itemStyle: {
            color: '#5470C6'
          }
        }
      ]
    };
  };

  // 长期趋势折线图配置
  const getLongTermChartOption = () => {
    return {
      title: {
        text: period === 'day' ? '近30天用电趋势' : 
              period === 'month' ? '近12个月用电趋势' : '近5年用电趋势',
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params: any) {
          const param = params[0];
          return param.name + '<br/>' + param.marker + ' ' + 
                 param.seriesName + ': ' + param.value + ' kWh';
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: longTermData.map((item: ConsumptionStats) => item.time)
      },
      yAxis: {
        type: 'value',
        name: '电量 (kWh)'
      },
      series: [
        {
          name: '用电量',
          type: 'line',
          data: longTermData.map((item: ConsumptionStats) => item.value),
          areaStyle: {},
          itemStyle: {
            color: '#5470C6'
          }
        }
      ]
    };
  };

  // 为当前数据制作表格
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '用电量 (kWh)',
      dataIndex: 'value',
      key: 'value',
      sorter: (a: ConsumptionStats, b: ConsumptionStats) => a.value - b.value,
    },
    {
      title: '同比',
      dataIndex: 'yoy',
      key: 'yoy',
      render: (yoy: number) => (
        <span style={{ color: yoy > 0 ? '#f5222d' : '#52c41a' }}>
          {yoy > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {(Math.abs(yoy) * 100).toFixed(1)}%
        </span>
      ),
      sorter: (a: ConsumptionStats, b: ConsumptionStats) => (a.yoy || 0) - (b.yoy || 0),
    },
    {
      title: '环比',
      dataIndex: 'mom',
      key: 'mom',
      render: (mom: number) => (
        period !== 'year' ? (
          <span style={{ color: mom > 0 ? '#f5222d' : '#52c41a' }}>
            {mom > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {(Math.abs(mom) * 100).toFixed(1)}%
          </span>
        ) : <span>-</span>
      ),
      sorter: (a: ConsumptionStats, b: ConsumptionStats) => (a.mom || 0) - (b.mom || 0),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="电力消耗统计">
            <Statistic
              title="总用电量"
              value={data.totalElectricConsumption}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ThunderboltOutlined />}
              suffix="kWh"
            />
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="同比"
                  value={data.electricYoy * 100}
                  precision={1}
                  valueStyle={{ color: data.electricYoy > 0 ? '#f5222d' : '#52c41a' }}
                  prefix={data.electricYoy > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="环比"
                  value={period !== 'year' ? data.electricMom * 100 : 0}
                  precision={1}
                  valueStyle={{ color: data.electricMom > 0 ? '#f5222d' : '#52c41a' }}
                  prefix={data.electricMom > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="用电量分析">
            <ReactECharts option={getBarChartOption()} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="用电明细">
            <Table 
              dataSource={currentData.map((item: ConsumptionStats, index: number) => ({...item, key: index}))} 
              columns={columns} 
              size="small"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="长期趋势">
            <ReactECharts option={getLongTermChartOption()} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

/**
 * A copy of ElectricTab but for water usage
 */
const WaterTab: React.FC<TabProps> = ({ data, period, loading }) => {
  if (loading) {
    return <div style={{ padding: '20px 0', textAlign: 'center' }}><Spin size="large" /></div>;
  }

  if (!data) {
    return <Empty description="暂无数据" />;
  }

  // 选择当前周期的数据和长期趋势数据
  let currentData: ConsumptionStats[];
  let longTermData: ConsumptionStats[];
  let chartTitle: string;
  let chartSubtitle: string;

  switch(period) {
    case 'day':
      currentData = data.hourlyWaterConsumption;
      longTermData = data.dailyWaterConsumption;
      chartTitle = '今日用水趋势';
      chartSubtitle = '按小时统计';
      break;
    case 'month':
      currentData = data.dailyWaterConsumption;
      longTermData = data.monthlyWaterConsumption;
      chartTitle = '本月用水趋势';
      chartSubtitle = '按日统计';
      break;
    case 'year':
      currentData = data.monthlyWaterConsumption;
      longTermData = data.yearlyWaterConsumption;
      chartTitle = '本年用水趋势';
      chartSubtitle = '按月统计';
      break;
  }

  // 柱状图配置
  const getBarChartOption = () => {
    return {
      title: {
        text: chartTitle,
        subtext: chartSubtitle,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function(params: any) {
          const param = params[0];
          return param.name + '<br/>' + param.marker + ' ' + 
                 param.seriesName + ': ' + param.value + ' m³';
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: currentData.map((item: ConsumptionStats) => item.time)
      },
      yAxis: {
        type: 'value',
        name: '水量 (m³)'
      },
      series: [
        {
          name: '用水量',
          type: 'bar',
          data: currentData.map((item: ConsumptionStats) => item.value),
          itemStyle: {
            color: '#91CC75'
          }
        }
      ]
    };
  };

  // 长期趋势折线图配置
  const getLongTermChartOption = () => {
    return {
      title: {
        text: period === 'day' ? '近30天用水趋势' : 
              period === 'month' ? '近12个月用水趋势' : '近5年用水趋势',
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params: any) {
          const param = params[0];
          return param.name + '<br/>' + param.marker + ' ' + 
                 param.seriesName + ': ' + param.value + ' m³';
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: longTermData.map((item: ConsumptionStats) => item.time)
      },
      yAxis: {
        type: 'value',
        name: '水量 (m³)'
      },
      series: [
        {
          name: '用水量',
          type: 'line',
          data: longTermData.map((item: ConsumptionStats) => item.value),
          areaStyle: {},
          itemStyle: {
            color: '#91CC75'
          }
        }
      ]
    };
  };

  // 为当前数据制作表格
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '用水量 (m³)',
      dataIndex: 'value',
      key: 'value',
      sorter: (a: ConsumptionStats, b: ConsumptionStats) => a.value - b.value,
    },
    {
      title: '同比',
      dataIndex: 'yoy',
      key: 'yoy',
      render: (yoy: number) => (
        <span style={{ color: yoy > 0 ? '#f5222d' : '#52c41a' }}>
          {yoy > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {(Math.abs(yoy) * 100).toFixed(1)}%
        </span>
      ),
      sorter: (a: ConsumptionStats, b: ConsumptionStats) => (a.yoy || 0) - (b.yoy || 0),
    },
    {
      title: '环比',
      dataIndex: 'mom',
      key: 'mom',
      render: (mom: number) => (
        period !== 'year' ? (
          <span style={{ color: mom > 0 ? '#f5222d' : '#52c41a' }}>
            {mom > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {(Math.abs(mom) * 100).toFixed(1)}%
          </span>
        ) : <span>-</span>
      ),
      sorter: (a: ConsumptionStats, b: ConsumptionStats) => (a.mom || 0) - (b.mom || 0),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="用水消耗统计">
            <Statistic
              title="总用水量"
              value={data.totalWaterConsumption}
              precision={2}
              valueStyle={{ color: '#52c41a' }}
              prefix={<ExperimentOutlined />}
              suffix="m³"
            />
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="同比"
                  value={data.waterYoy * 100}
                  precision={1}
                  valueStyle={{ color: data.waterYoy > 0 ? '#f5222d' : '#52c41a' }}
                  prefix={data.waterYoy > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="环比"
                  value={period !== 'year' ? data.waterMom * 100 : 0}
                  precision={1}
                  valueStyle={{ color: data.waterMom > 0 ? '#f5222d' : '#52c41a' }}
                  prefix={data.waterMom > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="用水量分析">
            <ReactECharts option={getBarChartOption()} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="用水明细">
            <Table 
              dataSource={currentData.map((item: ConsumptionStats, index: number) => ({...item, key: index}))} 
              columns={columns} 
              size="small"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="长期趋势">
            <ReactECharts option={getLongTermChartOption()} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

/**
 * 建筑分布标签页
 */
interface BuildingTabProps {
  data: ConsumptionOverviewData | null;
  loading: boolean;
}

const BuildingTab: React.FC<BuildingTabProps> = ({ data, loading }) => {
  if (loading) {
    return <div style={{ padding: '20px 0', textAlign: 'center' }}><Spin size="large" /></div>;
  }

  if (!data) {
    return <Empty description="暂无数据" />;
  }

  // 饼图配置 - 用电量分布
  const getElectricPieOption = () => {
    return {
      title: {
        text: '建筑用电分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} kWh ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: data.buildingConsumption.map(item => item.buildingName)
      },
      series: [
        {
          name: '用电量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data.buildingConsumption.map(item => ({
            name: item.buildingName,
            value: item.electricConsumption
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  };

  // 饼图配置 - 用水量分布
  const getWaterPieOption = () => {
    return {
      title: {
        text: '建筑用水分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} m³ ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: data.buildingConsumption.map(item => item.buildingName)
      },
      series: [
        {
          name: '用水量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data.buildingConsumption.map(item => ({
            name: item.buildingName,
            value: item.waterConsumption
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  };

  // 建筑物用能表格列
  const columns = [
    {
      title: '建筑名称',
      dataIndex: 'buildingName',
      key: 'buildingName',
    },
    {
      title: '用电量 (kWh)',
      dataIndex: 'electricConsumption',
      key: 'electricConsumption',
      sorter: (a: BuildingConsumption, b: BuildingConsumption) => 
        a.electricConsumption - b.electricConsumption,
    },
    {
      title: '用电占比',
      dataIndex: 'electricPercentage',
      key: 'electricPercentage',
      render: (percentage: number) => `${percentage.toFixed(1)}%`,
      sorter: (a: BuildingConsumption, b: BuildingConsumption) => 
        a.electricPercentage - b.electricPercentage,
    },
    {
      title: '用水量 (m³)',
      dataIndex: 'waterConsumption',
      key: 'waterConsumption',
      sorter: (a: BuildingConsumption, b: BuildingConsumption) => 
        a.waterConsumption - b.waterConsumption,
    },
    {
      title: '用水占比',
      dataIndex: 'waterPercentage',
      key: 'waterPercentage',
      render: (percentage: number) => `${percentage.toFixed(1)}%`,
      sorter: (a: BuildingConsumption, b: BuildingConsumption) => 
        a.waterPercentage - b.waterPercentage,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="用电分布">
            <ReactECharts option={getElectricPieOption()} style={{ height: 350 }} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="用水分布">
            <ReactECharts option={getWaterPieOption()} style={{ height: 350 }} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="建筑用能详情">
            <Table 
              dataSource={data.buildingConsumption} 
              columns={columns} 
              rowKey="buildingId"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ConsumptionOverview; 
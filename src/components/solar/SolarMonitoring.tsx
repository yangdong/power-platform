import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Spin, Table, Divider, Progress } from 'antd';
import { 
  ThunderboltOutlined,
  UploadOutlined,
  DownloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { SolarMonitoringData, generateSolarMonitoringData } from '../../mock/data';

const { Title, Text } = Typography;

/**
 * 光伏监控组件
 */
const SolarMonitoring: React.FC<{ projectId: string; stationId?: string }> = ({ projectId, stationId }) => {
  const [loading, setLoading] = useState(true);
  const [monitoringData, setMonitoringData] = useState<SolarMonitoringData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 模拟获取数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = generateSolarMonitoringData();
      setMonitoringData(data);
      setLoading(false);
    };

    fetchData();

    // 设置定时器每分钟更新一次数据和时间
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // 实际生产环境中，会定期从服务器获取最新数据
      // 这里模拟数据更新
      const newData = generateSolarMonitoringData();
      setMonitoringData(prevData => {
        if (!prevData) return newData;
        
        // 合并数据，只更新实时相关的数据
        return {
          ...prevData,
          realTimeGeneration: newData.realTimeGeneration,
          energyFlow: newData.energyFlow
        };
      });
    }, 60000); // 每分钟更新一次

    return () => clearInterval(timer);
  }, [projectId, stationId]);

  if (loading || !monitoringData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" tip="加载监控数据中..." />
      </div>
    );
  }

  // 格式化时间显示
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // 能量流向图配置
  const energyFlowOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} kW'
    },
    legend: {
      data: ['光伏发电', '负载用电', '市电输入', '上网电量', '自用电量'],
      bottom: 10
    },
    series: [
      {
        name: '能量流向',
        type: 'sankey',
        left: 50,
        right: 50,
        data: [
          { name: '光伏发电' },
          { name: '负载用电' },
          { name: '市电输入' },
          { name: '上网电量' },
          { name: '自用电量' }
        ],
        links: [
          { source: '光伏发电', target: '上网电量', value: monitoringData.energyFlow.toGrid },
          { source: '光伏发电', target: '自用电量', value: monitoringData.energyFlow.selfConsumption },
          { source: '市电输入', target: '负载用电', value: monitoringData.energyFlow.fromGrid },
          { source: '自用电量', target: '负载用电', value: monitoringData.energyFlow.selfConsumption }
        ],
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        },
        itemStyle: {
          color: '#1890ff',
          borderColor: '#fff'
        },
        label: {
          color: 'rgba(0,0,0,0.7)',
          fontFamily: 'Arial',
          fontSize: 12
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4
          }
        }
      }
    ]
  };

  // 24小时发电量对比图配置
  const hourlyGenerationOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params: any) {
        const current = params[0].data;
        const previous = params[1].data;
        const diff = current - previous;
        const diffText = diff >= 0 ? 
          `<span style="color:#52c41a">+${diff.toFixed(1)}</span>` : 
          `<span style="color:#f5222d">${diff.toFixed(1)}</span>`;
        
        return `${params[0].name}<br/>
                本期: ${current.toFixed(1)} kWh<br/>
                上期: ${previous.toFixed(1)} kWh<br/>
                差值: ${diffText} kWh`;
      }
    },
    legend: {
      data: ['本期发电量', '上期发电量'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: monitoringData.hourlyGeneration.map(item => item.time)
    },
    yAxis: {
      type: 'value',
      name: '发电量 (kWh)'
    },
    series: [
      {
        name: '本期发电量',
        type: 'bar',
        data: monitoringData.hourlyGeneration.map(item => item.current),
        itemStyle: {
          color: '#1890ff'
        }
      },
      {
        name: '上期发电量',
        type: 'line',
        smooth: true,
        data: monitoringData.hourlyGeneration.map(item => item.previous),
        itemStyle: {
          color: '#52c41a'
        },
        lineStyle: {
          width: 2,
          type: 'dashed'
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  };

  // 24小时发电量表格列定义
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: '25%',
    },
    {
      title: '本期发电量 (kWh)',
      dataIndex: 'current',
      key: 'current',
      width: '25%',
      sorter: (a: any, b: any) => a.current - b.current,
    },
    {
      title: '上期发电量 (kWh)',
      dataIndex: 'previous',
      key: 'previous',
      width: '25%',
      sorter: (a: any, b: any) => a.previous - b.previous,
    },
    {
      title: '增/减发电量 (kWh)',
      dataIndex: 'difference',
      key: 'difference',
      width: '25%',
      sorter: (a: any, b: any) => a.difference - b.difference,
      render: (diff: number) => {
        const color = diff >= 0 ? '#52c41a' : '#f5222d';
        const prefix = diff >= 0 ? '+' : '';
        return <span style={{ color }}>{prefix}{diff.toFixed(1)}</span>;
      }
    }
  ];

  return (
    <div className="solar-monitoring">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={4}>光伏监控</Title>
          <Text type="secondary">实时数据更新时间: {formatTime(currentTime)}</Text>
        </Col>
      </Row>

      {/* 实时发电量 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Statistic
                  title="当前实时发电量"
                  value={monitoringData.realTimeGeneration.toFixed(1)}
                  suffix="kW"
                  valueStyle={{ color: '#1890ff', fontSize: '28px' }}
                  prefix={<ThunderboltOutlined />}
                />
                <Progress 
                  percent={Math.min(100, monitoringData.realTimeGeneration / 10)} 
                  strokeColor="#1890ff" 
                  showInfo={false}
                  style={{ marginTop: 10 }}
                />
              </Col>
              <Col xs={24} md={16}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Card title="今日发电" size="small" bordered={false} style={{ background: '#f9f9f9' }}>
                      <div style={{ marginBottom: 10 }}>
                        <Text>总发电量:</Text>
                        <Text strong style={{ float: 'right' }}>{monitoringData.todayGeneration.total.toFixed(1)} kWh</Text>
                      </div>
                      <div>
                        <Text>上网电量:</Text>
                        <Text strong style={{ float: 'right' }}>{monitoringData.todayGeneration.toGrid.toFixed(1)} kWh</Text>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card title="今日耗电" size="small" bordered={false} style={{ background: '#f9f9f9' }}>
                      <div style={{ marginBottom: 10 }}>
                        <Text>自用电量:</Text>
                        <Text strong style={{ float: 'right' }}>{monitoringData.todayConsumption.selfConsumption.toFixed(1)} kWh</Text>
                      </div>
                      <div>
                        <Text>市电用电量:</Text>
                        <Text strong style={{ float: 'right' }}>{monitoringData.todayConsumption.gridConsumption.toFixed(1)} kWh</Text>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 能量流向图 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="市电-光伏发电-负载相互转换图">
            <div style={{ height: 400 }}>
              <ReactECharts option={energyFlowOption} style={{ height: '100%' }} />
            </div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', margin: '0 10px' }}>
                <ThunderboltOutlined style={{ fontSize: 24, color: '#faad14' }} />
                <div>光伏发电</div>
                <div style={{ fontWeight: 'bold' }}>{monitoringData.energyFlow.fromSolar.toFixed(1)} kW</div>
              </div>
              <div style={{ textAlign: 'center', margin: '0 10px' }}>
                <UploadOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                <div>上网电量</div>
                <div style={{ fontWeight: 'bold' }}>{monitoringData.energyFlow.toGrid.toFixed(1)} kW</div>
              </div>
              <div style={{ textAlign: 'center', margin: '0 10px' }}>
                <DownloadOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                <div>自用电量</div>
                <div style={{ fontWeight: 'bold' }}>{monitoringData.energyFlow.selfConsumption.toFixed(1)} kW</div>
              </div>
              <div style={{ textAlign: 'center', margin: '0 10px' }}>
                <ArrowDownOutlined style={{ fontSize: 24, color: '#f5222d' }} />
                <div>市电输入</div>
                <div style={{ fontWeight: 'bold' }}>{monitoringData.energyFlow.fromGrid.toFixed(1)} kW</div>
              </div>
              <div style={{ textAlign: 'center', margin: '0 10px' }}>
                <ArrowUpOutlined style={{ fontSize: 24, color: '#722ed1' }} />
                <div>负载用电</div>
                <div style={{ fontWeight: 'bold' }}>{monitoringData.energyFlow.toLoad.toFixed(1)} kW</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 24小时发电量统计 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="光伏电站发电量统计">
            <Divider orientation="left">今日24小时发电量实时统计兼上期发电量对比</Divider>
            <div style={{ height: 400 }}>
              <ReactECharts option={hourlyGenerationOption} style={{ height: '100%' }} />
            </div>
            
            <Divider orientation="left">今日24小时发电量详细表格</Divider>
            <Table 
              columns={columns} 
              dataSource={monitoringData.hourlyGeneration.map((item, index) => ({ ...item, key: index }))}
              pagination={{ pageSize: 8 }}
              size="middle"
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SolarMonitoring; 
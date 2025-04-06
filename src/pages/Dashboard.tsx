import React, { useState, useEffect, useRef } from 'react';
import { dashboardStats, projects, Project } from '../mock/data';
import { getStatusTag, getTypeTag } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { EChartsOption, EChartsReactProps } from 'echarts-for-react';

// Import map manually to ensure it's available
import chinaMap from '../assets/map/china.json';

// Industrial dashboard style
const dashboardStyle: React.CSSProperties = {
  background: '#0a192f',
  color: '#fff',
  minHeight: '100vh',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const sectionStyle: React.CSSProperties = {
  background: 'rgba(13, 28, 50, 0.7)',
  borderRadius: '5px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(86, 143, 209, 0.3)',
  padding: '15px',
  marginBottom: '20px',
};

const headerStyle: React.CSSProperties = {
  color: '#56b8ff',
  fontSize: '1.2em',
  fontWeight: 'bold',
  borderBottom: '1px solid rgba(86, 143, 209, 0.5)',
  paddingBottom: '10px',
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const kpiCardStyle: React.CSSProperties = {
  background: 'rgba(19, 42, 71, 0.7)',
  borderRadius: '5px',
  padding: '15px',
  margin: '0 0 15px 0',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(86, 143, 209, 0.2)',
};

const kpiValueStyle: React.CSSProperties = {
  fontSize: '1.8em',
  fontWeight: 'bold',
  color: '#56deff',
  marginBottom: '5px',
};

const kpiLabelStyle: React.CSSProperties = {
  fontSize: '0.85em',
  color: '#8bacce',
};

// Dashboard component
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapLoaded, setMapLoaded] = useState(false);
  const echartsRef = useRef<ReactECharts>(null);
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Update time every second
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timerID);
  }, []);
  
  // Different status count
  const statusCounts = projects.reduce((counts, project) => {
    counts[project.status] = (counts[project.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Projects by type pie chart option
  const pieOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['太阳能', '风能', '水能', '生物质能', '地热能'],
      textStyle: {
        color: '#8bacce'
      }
    },
    series: [
      {
        name: '项目类型',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
            color: '#fff'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: dashboardStats.projectsByType.solar, name: '太阳能', itemStyle: { color: '#fdcb6e' } },
          { value: dashboardStats.projectsByType.wind, name: '风能', itemStyle: { color: '#74b9ff' } },
          { value: dashboardStats.projectsByType.hydro, name: '水能', itemStyle: { color: '#55efc4' } },
          { value: dashboardStats.projectsByType.biomass, name: '生物质能', itemStyle: { color: '#ff7675' } },
          { value: dashboardStats.projectsByType.geothermal, name: '地热能', itemStyle: { color: '#a29bfe' } }
        ]
      }
    ]
  };

  // Energy production bar chart option
  const barOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['装机容量 (MW)', '年发电量 (MWh/1000)'],
      textStyle: {
        color: '#8bacce'
      }
    },
    xAxis: {
      type: 'category',
      data: ['太阳能', '风能', '水能', '生物质能', '地热能'],
      axisLine: {
        lineStyle: {
          color: '#8bacce'
        }
      },
      axisLabel: {
        color: '#8bacce'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#8bacce'
        }
      },
      axisLabel: {
        color: '#8bacce'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(86, 143, 209, 0.2)'
        }
      }
    },
    series: [
      {
        name: '装机容量 (MW)',
        type: 'bar',
        data: [
          projects.filter(p => p.type === 'solar').reduce((sum, p) => sum + p.capacity, 0),
          projects.filter(p => p.type === 'wind').reduce((sum, p) => sum + p.capacity, 0),
          projects.filter(p => p.type === 'hydro').reduce((sum, p) => sum + p.capacity, 0),
          projects.filter(p => p.type === 'biomass').reduce((sum, p) => sum + p.capacity, 0),
          projects.filter(p => p.type === 'geothermal').reduce((sum, p) => sum + p.capacity, 0)
        ],
        itemStyle: {
          color: '#56deff'
        }
      },
      {
        name: '年发电量 (MWh/1000)',
        type: 'bar',
        data: [
          projects.filter(p => p.type === 'solar').reduce((sum, p) => sum + p.annualOutput, 0) / 1000,
          projects.filter(p => p.type === 'wind').reduce((sum, p) => sum + p.annualOutput, 0) / 1000,
          projects.filter(p => p.type === 'hydro').reduce((sum, p) => sum + p.annualOutput, 0) / 1000,
          projects.filter(p => p.type === 'biomass').reduce((sum, p) => sum + p.annualOutput, 0) / 1000,
          projects.filter(p => p.type === 'geothermal').reduce((sum, p) => sum + p.annualOutput, 0) / 1000
        ],
        itemStyle: {
          color: '#ff7675'
        }
      }
    ]
  };

  // Energy efficiency line chart
  const lineOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['效率'],
      textStyle: {
        color: '#8bacce'
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
      data: projects.slice(0, 10).map(p => p.name.substring(0, 4)),
      axisLine: {
        lineStyle: {
          color: '#8bacce'
        }
      },
      axisLabel: {
        color: '#8bacce',
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      min: 70,
      axisLine: {
        lineStyle: {
          color: '#8bacce'
        }
      },
      axisLabel: {
        color: '#8bacce'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(86, 143, 209, 0.2)'
        }
      }
    },
    series: [
      {
        name: '效率',
        type: 'line',
        data: projects.slice(0, 10).map(p => p.efficiency),
        itemStyle: {
          color: '#56deff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(86, 222, 255, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(86, 222, 255, 0.1)'
              }
            ]
          }
        }
      }
    ]
  };

  // Map chart option
  const getMapOption = () => {
    if (!mapLoaded) {
      return {
        backgroundColor: 'transparent',
        title: {
          text: '地图加载中...',
          textStyle: {
            color: '#8bacce'
          },
          left: 'center',
          top: 'center'
        }
      };
    }
    
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.data && params.data.name) {
            const project = projects.find(p => p.name === params.data.name);
            if (project) {
              return `
                <div style="color: black; padding: 5px;">
                  <strong>${project.name}</strong><br/>
                  <span>${project.clientName}</span><br/>
                  <span>${project.type} · ${project.status}</span><br/>
                  <span>装机容量: ${project.capacity} MW</span><br/>
                  <span>效率: ${project.efficiency}%</span>
                </div>
              `;
            }
          }
          return '';
        }
      },
      geo: {
        map: 'china',
        roam: true,
        zoom: 1.2,
        center: [104, 38],
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          areaColor: 'rgba(13, 28, 50, 0.4)',
          borderColor: '#0C4E8F',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgba(19, 42, 71, 0.8)'
          }
        }
      },
      series: [
        {
          name: '项目分布',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: projects.map(project => ({
            name: project.name,
            value: [
              project.location.longitude,
              project.location.latitude,
              project.capacity
            ],
            itemStyle: {
              color: getProjectColor(project.type)
            }
          })),
          symbolSize: (val: any) => {
            // 根据容量大小设置点的大小，但不小于15，不大于40
            return Math.max(Math.min(Math.sqrt(val[2]) * 3 + 10, 40), 15);
          },
          // 不设置animation，但增加其他视觉效果
          symbol: 'circle',
          emphasis: {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            }
          },
          // 完全禁用所有动画
          animation: false,
          hoverAnimation: false
        }
      ]
    };
  };

  // Register ECharts map of China and ensure it's loaded before rendering
  useEffect(() => {
    try {
      console.log('Loading China map data...');
      
      // 直接使用ECharts内置的中国地图
      import('echarts/map/json/china.json').then(chinaJson => {
        console.log('China map loaded:', chinaJson);
        echarts.registerMap('china', chinaJson.default);
        console.log('Map registered successfully');
        setMapLoaded(true);
      }).catch(error => {
        console.error('Failed to load China map:', error);
        
        // 使用本地备份数据作为fallback
        console.log('Trying with local map data...');
        if (chinaMap) {
          // 简化地图注册，直接使用as any绕过类型检查
          console.log('Using local map data');
          echarts.registerMap('china', chinaMap as any);
          console.log('Map registered successfully with local data');
          setMapLoaded(true);
        }
      });
    } catch (error) {
      console.error('Failed to register map:', error);
    }
  }, []);

  // Debug projects data
  useEffect(() => {
    console.log('Projects for mapping:', projects.map(project => ({
      name: project.name,
      location: [project.location.longitude, project.location.latitude]
    })));
  }, [projects]);

  // Force chart update when map is loaded
  useEffect(() => {
    if (mapLoaded && echartsRef.current) {
      console.log("Updating map with loaded data");
      
      // 创建完整的地图选项
      const mapOptions = getMapOption();
      console.log("Map options:", mapOptions);
      
      // 更新实例
      const echartInstance = echartsRef.current.getEchartsInstance();
      echartInstance.setOption(mapOptions, true);
      
      console.log("Map updated successfully");
    }
  }, [mapLoaded]);
  
  const moduleCountsByType = {
    '源': projects.filter(p => p.modules.includes('源')).length,
    '网': projects.filter(p => p.modules.includes('网')).length,
    '荷': projects.filter(p => p.modules.includes('荷')).length,
    '储': projects.filter(p => p.modules.includes('储')).length,
    '充': projects.filter(p => p.modules.includes('充')).length,
  };

  // Handle map chart click event
  const onMapChartClick = (params: any) => {
    if (params.componentType === 'series' && params.seriesType === 'scatter') {
      const projectName = params.data?.name;
      if (projectName) {
        const project = projects.find(p => p.name === projectName);
        if (project) {
          // 检查Shift键是否被按下，如果是则导航到大屏页面
          if (params.event.event.shiftKey) {
            navigate(`/projects/${project.id}/bigscreen`);
          } else {
            navigate(`/projects/${project.id}`);
          }
        }
      }
    }
  };

  return (
    <div style={dashboardStyle}>
      <header style={{ 
        borderBottom: '1px solid rgba(86, 143, 209, 0.5)', 
        paddingBottom: '15px', 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: '#56b8ff', margin: 0 }}>能源管理系统 - 实时监控大屏</h1>
        <div style={{ color: '#8bacce', fontSize: '0.9em' }}>
          {currentTime.toLocaleString('zh-CN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}
        </div>
      </header>

      <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 130px)' }}>
        {/* Left Column */}
        <div style={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
          {/* KPI Stats */}
          <div style={sectionStyle}>
            <div style={headerStyle}>
              <span>运行总览</span>
              <span style={{ fontSize: '0.8em', color: '#8bacce' }}>实时数据</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              <div style={kpiCardStyle}>
                <div style={kpiValueStyle}>{dashboardStats.totalClients}</div>
                <div style={kpiLabelStyle}>客户总数</div>
              </div>
              <div style={kpiCardStyle}>
                <div style={kpiValueStyle}>{dashboardStats.totalProjects}</div>
                <div style={kpiLabelStyle}>项目总数</div>
              </div>
              <div style={kpiCardStyle}>
                <div style={kpiValueStyle}>{dashboardStats.totalCapacity.toLocaleString()}</div>
                <div style={kpiLabelStyle}>总装机容量 (MW)</div>
              </div>
              <div style={kpiCardStyle}>
                <div style={kpiValueStyle}>{dashboardStats.operationalProjects}</div>
                <div style={kpiLabelStyle}>运行中项目</div>
              </div>
            </div>
          </div>

          {/* Project Status */}
          <div style={sectionStyle}>
            <div style={headerStyle}>
              <span>项目状态分布</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8bacce' }}>规划中</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: `${(statusCounts.planning || 0) * 100 / dashboardStats.totalProjects}%`, 
                    height: '10px', 
                    background: '#3498db', 
                    borderRadius: '5px' 
                  }}></div>
                  <span style={{ color: '#fff' }}>{statusCounts.planning || 0}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8bacce' }}>建设中</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: `${(statusCounts.construction || 0) * 100 / dashboardStats.totalProjects}%`, 
                    height: '10px', 
                    background: '#e67e22', 
                    borderRadius: '5px' 
                  }}></div>
                  <span style={{ color: '#fff' }}>{statusCounts.construction || 0}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8bacce' }}>运行中</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: `${(statusCounts.operational || 0) * 100 / dashboardStats.totalProjects}%`, 
                    height: '10px', 
                    background: '#2ecc71', 
                    borderRadius: '5px' 
                  }}></div>
                  <span style={{ color: '#fff' }}>{statusCounts.operational || 0}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8bacce' }}>维护中</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: `${(statusCounts.maintenance || 0) * 100 / dashboardStats.totalProjects}%`, 
                    height: '10px', 
                    background: '#e74c3c', 
                    borderRadius: '5px' 
                  }}></div>
                  <span style={{ color: '#fff' }}>{statusCounts.maintenance || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Type Distribution */}
          <div style={{ ...sectionStyle, flex: 1 }}>
            <div style={headerStyle}>
              <span>项目类型分布</span>
            </div>
            <ReactECharts 
              option={pieOption} 
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>

        {/* Center Map */}
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...sectionStyle, flex: 1 }}>
            <div style={headerStyle}>
              <span>项目地图分布</span>
              <span style={{ fontSize: '0.8em', color: '#8bacce' }}>总数: {dashboardStats.totalProjects}</span>
            </div>
            <div style={{ fontSize: '0.8em', color: '#8bacce', marginBottom: '10px', textAlign: 'center' }}>
              提示: 按住Shift键点击项目点可直接访问项目大屏
            </div>
            <div style={{ height: 'calc(100% - 50px)', width: '100%', position: 'relative' }}>
              {/* Map corner decorations */}
              <div style={{
                position: 'absolute',
                top: -3,
                left: -3,
                width: '30px',
                height: '30px',
                borderTop: '3px solid #56deff',
                borderLeft: '3px solid #56deff',
                zIndex: 10,
                pointerEvents: 'none',
              }}></div>
              <div style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: '30px',
                height: '30px',
                borderTop: '3px solid #56deff',
                borderRight: '3px solid #56deff',
                zIndex: 10,
                pointerEvents: 'none',
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: -3,
                left: -3,
                width: '30px',
                height: '30px',
                borderBottom: '3px solid #56deff',
                borderLeft: '3px solid #56deff',
                zIndex: 10,
                pointerEvents: 'none',
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: -3,
                right: -3,
                width: '30px',
                height: '30px',
                borderBottom: '3px solid #56deff',
                borderRight: '3px solid #56deff',
                zIndex: 10,
                pointerEvents: 'none',
              }}></div>
              
              <ReactECharts 
                ref={echartsRef}
                option={getMapOption()}
                style={{ height: '100%', width: '100%', borderRadius: '5px' }}
                notMerge={true}
                lazyUpdate={false}
                onEvents={{
                  'click': onMapChartClick
                }}
              />
            </div>
          </div>
          
          {/* Energy Module Distribution */}
          <div style={{ ...sectionStyle, height: '150px' }}>
            <div style={headerStyle}>
              <span>项目模块分布情况</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', height: 'calc(100% - 40px)' }}>
              {Object.entries(moduleCountsByType).map(([key, value]) => (
                <div key={key} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ 
                    width: '50px',
                    height: '50px',
                    margin: '0 auto',
                    borderRadius: '50%',
                    background: 'rgba(86, 143, 209, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4em',
                    fontWeight: 'bold',
                    color: getModuleColor(key),
                    border: `2px solid ${getModuleColor(key)}`
                  }}>
                    {key}
                  </div>
                  <div style={{ 
                    color: '#56deff',
                    fontSize: '1.2em',
                    marginTop: '5px', 
                    fontWeight: 'bold' 
                  }}>
                    {value}
                  </div>
                  <div style={{ color: '#8bacce', fontSize: '0.8em' }}>
                    {getModuleName(key)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: '25%', display: 'flex', flexDirection: 'column' }}>
          {/* Environmental Benefits */}
          <div style={sectionStyle}>
            <div style={headerStyle}>
              <span>环境效益</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={kpiCardStyle}>
                <div style={kpiLabelStyle}>年总发电量 (MWh)</div>
                <div style={{ ...kpiValueStyle, color: '#2ecc71' }}>
                  {dashboardStats.totalAnnualOutput.toLocaleString()}
                </div>
              </div>
              <div style={kpiCardStyle}>
                <div style={kpiLabelStyle}>年减碳量 (吨CO₂)</div>
                <div style={{ ...kpiValueStyle, color: '#2ecc71' }}>
                  {dashboardStats.totalCarbonReduction.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Energy Production Chart */}
          <div style={{ ...sectionStyle, flex: 1 }}>
            <div style={headerStyle}>
              <span>能源生产对比</span>
            </div>
            <ReactECharts 
              option={barOption} 
              style={{ height: '100%', width: '100%' }}
            />
          </div>

          {/* Project Efficiency Chart */}
          <div style={{ ...sectionStyle, flex: 1 }}>
            <div style={headerStyle}>
              <span>能源项目效率</span>
            </div>
            <ReactECharts 
              option={lineOption} 
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get project color by type
const getProjectColor = (type: Project['type']): string => {
  switch(type) {
    case 'solar':
      return '#fdcb6e';
    case 'wind':
      return '#74b9ff';
    case 'hydro':
      return '#55efc4';
    case 'biomass':
      return '#ff7675';
    case 'geothermal':
      return '#a29bfe';
    default:
      return '#dfe6e9';
  }
};

// Helper function to get module color
const getModuleColor = (moduleType: string): string => {
  switch(moduleType) {
    case '源':
      return '#e74c3c';
    case '网':
      return '#3498db';
    case '荷':
      return '#9b59b6';
    case '储':
      return '#f1c40f';
    case '充':
      return '#2ecc71';
    default:
      return '#95a5a6';
  }
};

// Helper function to get module name
const getModuleName = (moduleType: string): string => {
  switch(moduleType) {
    case '源':
      return '能源';
    case '网':
      return '电网';
    case '荷':
      return '负载';
    case '储':
      return '储能';
    case '充':
      return '充电';
    default:
      return '';
  }
};

export default Dashboard;
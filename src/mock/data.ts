// Mock clients data
export interface Client {
  id: string;
  name: string;
  contact?: string;
  contactPerson?: string;
  contactTitle?: string;
  email: string;
  phone: string;
  address: string;
  industry?: string;
  projectsCount: number;
}

export const clients: Client[] = [
  {
    id: '1',
    name: '北京能源集团',
    contact: '张三',
    contactPerson: '张三',
    contactTitle: '技术总监',
    email: 'zhangsan@example.com',
    phone: '13800000001',
    address: '北京市朝阳区',
    industry: '能源',
    projectsCount: 3,
  },
  {
    id: '2',
    name: '上海电力有限公司',
    contact: '李四',
    contactPerson: '李四',
    contactTitle: '项目经理',
    email: 'lisi@example.com',
    phone: '13800000002',
    address: '上海市浦东新区',
    industry: '电力',
    projectsCount: 2,
  },
  {
    id: '3',
    name: '广州新能源科技',
    contact: '王五',
    contactPerson: '王五',
    contactTitle: '总工程师',
    email: 'wangwu@example.com',
    phone: '13800000003',
    address: '广州市天河区',
    industry: '新能源科技',
    projectsCount: 4,
  },
  {
    id: '4',
    name: '深圳绿色能源集团',
    contact: '赵六',
    contactPerson: '赵六',
    contactTitle: '执行总监',
    email: 'zhaoliu@example.com',
    phone: '13800000004',
    address: '深圳市南山区',
    industry: '绿色能源',
    projectsCount: 1,
  },
];

// 项目模块类型
export type ModuleType = '源' | '网' | '荷' | '储' | '充';

// Mock projects data
export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  type: 'solar' | 'wind' | 'hydro' | 'biomass' | 'geothermal';
  capacity: number; // in MW
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  startDate: string;
  endDate?: string;
  status: 'planning' | 'construction' | 'operational' | 'maintenance';
  efficiency: number; // percentage
  annualOutput: number; // MWh
  carbonReduction: number; // tons of CO2
  modules: ModuleType[]; // 项目模块
  budget?: number;
  manager?: string;
  team?: string[];
  createdAt?: string;
  description?: string;
  notes?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: '北京朝阳太阳能项目',
    clientId: '1',
    clientName: '北京能源集团',
    type: 'solar',
    capacity: 50,
    location: {
      address: '北京市朝阳区太阳宫',
      latitude: 39.9512,
      longitude: 116.4307,
    },
    startDate: '2023-01-15',
    endDate: '2025-01-15',
    status: 'operational',
    efficiency: 87,
    annualOutput: 87600,
    carbonReduction: 43800,
    modules: ['源', '网', '储'],
    budget: 1500000,
    manager: '李明',
    team: ['李明', '王强', '张红', '赵伟'],
    createdAt: '2022-11-10',
    description: '这是位于北京朝阳区的大型太阳能项目，总装机容量50MW，年发电量达87600MWh，为周边区域提供清洁能源，减少碳排放。',
    notes: '该项目采用最新的光伏技术，效率高，维护成本低。已与周边社区建立了良好的合作关系。'
  },
  {
    id: '2',
    name: '北京海淀风电场',
    clientId: '1',
    clientName: '北京能源集团',
    type: 'wind',
    capacity: 75,
    location: {
      address: '北京市海淀区西北部',
      latitude: 40.0321,
      longitude: 116.2534,
    },
    startDate: '2022-11-20',
    endDate: '2025-11-20',
    status: 'operational',
    efficiency: 92,
    annualOutput: 131400,
    carbonReduction: 65700,
    modules: ['源', '网', '荷'],
    budget: 2200000,
    manager: '刘志强',
    team: ['刘志强', '李小明', '陈华', '吴芳'],
    createdAt: '2022-08-15',
    description: '这是位于北京海淀区的风力发电项目，总装机容量75MW，年发电量达131400MWh，利用该区域丰富的风力资源，为北京地区提供清洁电力。',
    notes: '风力资源评估良好，发电效率高于预期。需要注意季节性风向变化对发电量的影响。'
  },
  {
    id: '3',
    name: '北京通州生物质能项目',
    clientId: '1',
    clientName: '北京能源集团',
    type: 'biomass',
    capacity: 30,
    location: {
      address: '北京市通州区',
      latitude: 39.9087,
      longitude: 116.6569,
    },
    startDate: '2023-05-10',
    endDate: '2026-05-10',
    status: 'construction',
    efficiency: 78,
    annualOutput: 45552,
    carbonReduction: 22776,
    modules: ['源', '网'],
    budget: 1200000,
    manager: '张建国',
    team: ['张建国', '王建华', '李梅'],
    createdAt: '2023-02-03',
    description: '这是位于北京通州区的生物质能发电项目，利用当地农业废弃物进行发电，总装机容量30MW，年发电量预计达45552MWh。',
    notes: '需要建立稳定的生物质燃料供应链，与当地农业合作社保持良好关系以确保燃料供应。'
  },
  {
    id: '4',
    name: '上海浦东太阳能电站',
    clientId: '2',
    clientName: '上海电力有限公司',
    type: 'solar',
    capacity: 60,
    location: {
      address: '上海市浦东新区',
      latitude: 31.2304,
      longitude: 121.5404,
    },
    startDate: '2023-02-28',
    status: 'operational',
    efficiency: 89,
    annualOutput: 104226,
    carbonReduction: 52113,
    modules: ['源', '网', '储', '充']
  },
  {
    id: '5',
    name: '上海青浦水电站',
    clientId: '2',
    clientName: '上海电力有限公司',
    type: 'hydro',
    capacity: 45,
    location: {
      address: '上海市青浦区',
      latitude: 31.1496,
      longitude: 121.1272,
    },
    startDate: '2022-12-15',
    status: 'operational',
    efficiency: 94,
    annualOutput: 83106,
    carbonReduction: 41553,
    modules: ['源', '网', '荷', '储']
  },
  {
    id: '6',
    name: '广州从化太阳能项目',
    clientId: '3',
    clientName: '广州新能源科技',
    type: 'solar',
    capacity: 40,
    location: {
      address: '广州市从化区',
      latitude: 23.5689,
      longitude: 113.5933,
    },
    startDate: '2023-03-20',
    status: 'operational',
    efficiency: 85,
    annualOutput: 66742,
    carbonReduction: 33371,
    modules: ['源', '网', '储', '充']
  },
  {
    id: '7',
    name: '广州南沙风电场',
    clientId: '3',
    clientName: '广州新能源科技',
    type: 'wind',
    capacity: 80,
    location: {
      address: '广州市南沙区',
      latitude: 22.8016,
      longitude: 113.5325,
    },
    startDate: '2023-04-10',
    status: 'operational',
    efficiency: 90,
    annualOutput: 140160,
    carbonReduction: 70080,
    modules: ['源', '网', '荷']
  },
  {
    id: '8',
    name: '广州花都地热能项目',
    clientId: '3',
    clientName: '广州新能源科技',
    type: 'geothermal',
    capacity: 25,
    location: {
      address: '广州市花都区',
      latitude: 23.4036,
      longitude: 113.2187,
    },
    startDate: '2023-06-01',
    status: 'construction',
    efficiency: 82,
    annualOutput: 40150,
    carbonReduction: 20075,
    modules: ['源', '网', '荷', '储', '充']
  },
  {
    id: '9',
    name: '广州黄埔生物质能项目',
    clientId: '3',
    clientName: '广州新能源科技',
    type: 'biomass',
    capacity: 35,
    location: {
      address: '广州市黄埔区',
      latitude: 23.1091,
      longitude: 113.4590,
    },
    startDate: '2023-01-05',
    status: 'planning',
    efficiency: 75,
    annualOutput: 51450,
    carbonReduction: 25725,
    modules: ['源', '网', '荷']
  },
  {
    id: '10',
    name: '深圳龙岗太阳能电站',
    clientId: '4',
    clientName: '深圳绿色能源集团',
    type: 'solar',
    capacity: 55,
    location: {
      address: '深圳市龙岗区',
      latitude: 22.7206,
      longitude: 114.2462,
    },
    startDate: '2023-02-10',
    status: 'operational',
    efficiency: 88,
    annualOutput: 94886,
    carbonReduction: 47443,
    modules: ['源', '网', '荷', '储', '充']
  },
];

// Dashboard stats
export const dashboardStats = {
  totalClients: clients.length,
  totalProjects: projects.length,
  totalCapacity: projects.reduce((sum, project) => sum + project.capacity, 0),
  operationalProjects: projects.filter(p => p.status === 'operational').length,
  projectsByType: {
    solar: projects.filter(p => p.type === 'solar').length,
    wind: projects.filter(p => p.type === 'wind').length,
    hydro: projects.filter(p => p.type === 'hydro').length,
    biomass: projects.filter(p => p.type === 'biomass').length,
    geothermal: projects.filter(p => p.type === 'geothermal').length,
  },
  // 模块统计
  moduleStats: {
    '源': projects.filter(p => p.modules.includes('源')).length,
    '网': projects.filter(p => p.modules.includes('网')).length,
    '荷': projects.filter(p => p.modules.includes('荷')).length,
    '储': projects.filter(p => p.modules.includes('储')).length,
    '充': projects.filter(p => p.modules.includes('充')).length,
  },
  totalAnnualOutput: projects.reduce((sum, project) => sum + project.annualOutput, 0),
  totalCarbonReduction: projects.reduce((sum, project) => sum + project.carbonReduction, 0),
};

// 光伏电站数据模型
export interface SolarStation {
  id: string;
  name: string;
  capacity: number; // 装机容量 (kW)
  location: {
    province: string;
    city: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  operationDate: string; // 投运日期
  status: 'normal' | 'fault' | 'maintenance'; // 运行状态
  currentPower: number; // 当前发电功率 (kW)
  totalPower: number; // 累计发电量 (kWh)
  todayGeneration: number; // 今日发电量 (kWh)
  monthGeneration: number; // 当月发电量 (kWh)
  yearGeneration: number; // 当年发电量 (kWh)
  todayIncome: number; // 今日收益 (元)
  monthIncome: number; // 当月收益 (元)
  yearIncome: number; // 当年收益 (元)
  efficiency: number; // 发电效率 (%)
  co2Reduction: number; // CO2减排量 (吨)
}

// 光伏综合看板数据模型
export interface SolarDashboardData {
  stationCount: number; // 电站数量
  totalCapacity: number; // 总装机容量 (kW)
  totalCurrentPower: number; // 发电总功率 (kW)
  
  // 发电量信息
  todayGeneration: number; // 今日发电量 (kWh)
  monthGeneration: number; // 当月发电量 (kWh)
  yearGeneration: number; // 当年发电量 (kWh)
  
  // 收益信息
  todayIncome: number; // 今日收益 (元)
  monthIncome: number; // 当月收益 (元)
  yearIncome: number; // 当年收益 (元)
  
  // 饼图数据 - 各电站年发电量占比
  yearGenerationByStation: {
    stationName: string;
    value: number;
  }[];
  
  // 折线图数据 - 年发电量趋势
  yearGenerationTrend: {
    month: string;
    value: number;
  }[];
  
  // 电站列表
  stations: SolarStation[];
}

// 模拟数据 - 光伏电站
export const solarStations: SolarStation[] = [
  {
    id: 'station-001',
    name: '朝阳太阳能一号站',
    capacity: 2500,
    location: {
      province: '北京',
      city: '朝阳区',
      address: '朝阳区太阳宫北街1号',
      latitude: 39.9641,
      longitude: 116.4532
    },
    operationDate: '2022-06-15',
    status: 'normal',
    currentPower: 1876.5,
    totalPower: 4587621,
    todayGeneration: 8765.2,
    monthGeneration: 198452.8,
    yearGeneration: 1567432.5,
    todayIncome: 7012.16,
    monthIncome: 158762.24,
    yearIncome: 1253946.00,
    efficiency: 85.3,
    co2Reduction: 1254.9
  },
  {
    id: 'station-002',
    name: '海淀太阳能园区',
    capacity: 3200,
    location: {
      province: '北京',
      city: '海淀区',
      address: '海淀区西北旺东路10号',
      latitude: 40.0357,
      longitude: 116.2895
    },
    operationDate: '2021-09-20',
    status: 'normal',
    currentPower: 2458.6,
    totalPower: 8934521,
    todayGeneration: 12543.7,
    monthGeneration: 289763.1,
    yearGeneration: 2345678.2,
    todayIncome: 10034.96,
    monthIncome: 231810.48,
    yearIncome: 1876542.56,
    efficiency: 88.7,
    co2Reduction: 1876.5
  },
  {
    id: 'station-003',
    name: '顺义太阳能电站',
    capacity: 1800,
    location: {
      province: '北京',
      city: '顺义区',
      address: '顺义区安华街9号',
      latitude: 40.1300,
      longitude: 116.6580
    },
    operationDate: '2022-03-08',
    status: 'maintenance',
    currentPower: 0,
    totalPower: 3254678,
    todayGeneration: 0,
    monthGeneration: 95462.3,
    yearGeneration: 876543.1,
    todayIncome: 0,
    monthIncome: 76369.84,
    yearIncome: 701234.48,
    efficiency: 82.1,
    co2Reduction: 701.2
  },
  {
    id: 'station-004',
    name: '通州光伏产业园',
    capacity: 4500,
    location: {
      province: '北京',
      city: '通州区',
      address: '通州区宋庄镇富豪路88号',
      latitude: 39.8936,
      longitude: 116.6569
    },
    operationDate: '2021-05-10',
    status: 'normal',
    currentPower: 3876.2,
    totalPower: 12456789,
    todayGeneration: 18762.4,
    monthGeneration: 387654.2,
    yearGeneration: 3762154.8,
    todayIncome: 15009.92,
    monthIncome: 310123.36,
    yearIncome: 3009723.84,
    efficiency: 91.2,
    co2Reduction: 3009.7
  },
  {
    id: 'station-005',
    name: '大兴太阳能基地',
    capacity: 3800,
    location: {
      province: '北京',
      city: '大兴区',
      address: '大兴区黄村镇兴业路99号',
      latitude: 39.7267,
      longitude: 116.3381
    },
    operationDate: '2022-01-25',
    status: 'fault',
    currentPower: 0,
    totalPower: 5432876,
    todayGeneration: 0,
    monthGeneration: 156789.3,
    yearGeneration: 1543210.5,
    todayIncome: 0,
    monthIncome: 125431.44,
    yearIncome: 1234568.40,
    efficiency: 86.8,
    co2Reduction: 1234.6
  }
];

// 生成光伏综合看板数据
export const generateSolarDashboardData = (): SolarDashboardData => {
  // 计算汇总数据
  const stationCount = solarStations.length;
  const totalCapacity = solarStations.reduce((sum, station) => sum + station.capacity, 0);
  const totalCurrentPower = solarStations.reduce((sum, station) => sum + station.currentPower, 0);
  
  const todayGeneration = solarStations.reduce((sum, station) => sum + station.todayGeneration, 0);
  const monthGeneration = solarStations.reduce((sum, station) => sum + station.monthGeneration, 0);
  const yearGeneration = solarStations.reduce((sum, station) => sum + station.yearGeneration, 0);
  
  const todayIncome = solarStations.reduce((sum, station) => sum + station.todayIncome, 0);
  const monthIncome = solarStations.reduce((sum, station) => sum + station.monthIncome, 0);
  const yearIncome = solarStations.reduce((sum, station) => sum + station.yearIncome, 0);
  
  // 生成饼图数据
  const yearGenerationByStation = solarStations.map(station => ({
    stationName: station.name,
    value: station.yearGeneration
  }));
  
  // 生成年发电量趋势
  const yearGenerationTrend = [
    { month: '1月', value: 586432 },
    { month: '2月', value: 623145 },
    { month: '3月', value: 789632 },
    { month: '4月', value: 845621 },
    { month: '5月', value: 965432 },
    { month: '6月', value: 1054321 },
    { month: '7月', value: 1123456 },
    { month: '8月', value: 1098765 },
    { month: '9月', value: 987654 },
    { month: '10月', value: 876543 },
    { month: '11月', value: 745632 },
    { month: '12月', value: 654321 }
  ];
  
  return {
    stationCount,
    totalCapacity,
    totalCurrentPower,
    todayGeneration,
    monthGeneration,
    yearGeneration,
    todayIncome,
    monthIncome,
    yearIncome,
    yearGenerationByStation,
    yearGenerationTrend,
    stations: solarStations
  };
};

// 光伏监控数据模型
export interface SolarMonitoringData {
  // 当日实时数据
  realTimeGeneration: number; // 当前实时发电量 (kW)
  
  // 今日发电信息
  todayGeneration: {
    total: number; // 总发电量 (kWh)
    toGrid: number; // 上网电量 (kWh)
  };
  
  // 今日耗电信息
  todayConsumption: {
    selfConsumption: number; // 自用电量 (kWh)
    gridConsumption: number; // 市电用电量 (kWh)
  };
  
  // 能量流向数据
  energyFlow: {
    fromSolar: number; // 光伏发电输出 (kW)
    toLoad: number; // 负载用电 (kW)
    fromGrid: number; // 市电输入 (kW)
    toGrid: number; // 上网电量 (kW)
    selfConsumption: number; // 自用电量 (kW)
  };
  
  // 24小时发电量统计
  hourlyGeneration: {
    time: string; // 时间点
    current: number; // 本期发电量 (kWh)
    previous: number; // 上期发电量 (kWh)
    difference: number; // 增加发电量 (kWh)
  }[];
}

// 生成模拟的光伏监控数据
export const generateSolarMonitoringData = (): SolarMonitoringData => {
  // 模拟当前小时
  const now = new Date();
  const currentHour = now.getHours();
  
  // 生成24小时发电量数据
  const hourlyGeneration = Array.from({ length: 24 }, (_, index) => {
    // 生成随机发电量，上午和下午高，早晚低
    const getGeneration = (hour: number) => {
      if (hour >= 6 && hour <= 18) {
        // 日照时间段
        const peak = Math.sin((hour - 6) / 12 * Math.PI) * 250; // 峰值在正午
        return Math.max(0, peak + Math.random() * 20 - 10);
      } else {
        // 夜间时段
        return Math.random() * 5; // 微小的发电量
      }
    };
    
    const hour = index;
    const hourStr = hour.toString().padStart(2, '0') + ':00';
    const current = getGeneration(hour);
    // 上期发电量略有不同
    const previous = current * (0.9 + Math.random() * 0.2);
    const difference = current - previous;
    
    return {
      time: hourStr,
      current: parseFloat(current.toFixed(1)),
      previous: parseFloat(previous.toFixed(1)),
      difference: parseFloat(difference.toFixed(1))
    };
  });

  // 计算当前实时发电量 (基于当前小时的数据)
  const realTimeGeneration = hourlyGeneration[currentHour].current * (0.9 + Math.random() * 0.2);
  
  // 计算今日总发电量
  const totalGeneration = hourlyGeneration
    .filter((_, index) => index <= currentHour)
    .reduce((sum, item) => sum + item.current, 0);
  
  // 计算上网电量 (约70%的总发电量)
  const toGrid = totalGeneration * 0.7;
  
  // 计算自用电量 (约30%的总发电量)
  const selfConsumption = totalGeneration * 0.3;
  
  // 计算市电用电量
  const gridConsumption = selfConsumption * 0.5; // 假设自用电量的50%来自市电
  
  // 能量流向实时数据
  const energyFlow = {
    fromSolar: realTimeGeneration,
    toLoad: realTimeGeneration * 0.3 + gridConsumption, // 负载用电 = 光伏自用 + 市电用电
    fromGrid: gridConsumption,
    toGrid: realTimeGeneration * 0.7, // 上网电量
    selfConsumption: realTimeGeneration * 0.3 // 自用电量
  };
  
  return {
    realTimeGeneration,
    todayGeneration: {
      total: parseFloat(totalGeneration.toFixed(1)),
      toGrid: parseFloat(toGrid.toFixed(1))
    },
    todayConsumption: {
      selfConsumption: parseFloat(selfConsumption.toFixed(1)),
      gridConsumption: parseFloat(gridConsumption.toFixed(1))
    },
    energyFlow,
    hourlyGeneration
  };
};

// ==================== 能耗统计系统数据模型 ====================

// 仪表类型
export type MeterType = 'electric' | 'water';

// 仪表状态
export type MeterStatus = 'normal' | 'fault' | 'offline' | 'maintenance';

// 抄表方式
export type ReadingMethod = 'auto' | 'manual';

// 仪表信息数据模型
export interface Meter {
  id: string;
  name: string;
  type: MeterType;
  model: string;
  serialNumber: string;
  installationDate: string;
  location: string;
  buildingId: string;
  buildingName: string;
  floorId?: string;
  floorName?: string;
  roomId?: string;
  roomName?: string;
  status: MeterStatus;
  lastReadingDate: string;
  lastReadingValue: number;
  unit: string; // kWh或m³
  readingMethod: ReadingMethod;
  readingCycle: 'hourly' | 'daily' | 'weekly' | 'monthly';
  manufacturer: string;
  contacts: string;
  contactPhone: string;
  gateway?: string;
  gatewayId?: string;
  description?: string;
  initialReading: number; // 初始读数
}

// 抄表记录数据模型
export interface MeterReading {
  id: string;
  meterId: string;
  meterName: string;
  meterType: MeterType;
  readingDate: string;
  readingValue: number;
  previousValue: number;
  consumption: number; // 本次用量
  operator: string;
  readingMethod: ReadingMethod;
  remark?: string;
  unit: string;
  status: 'normal' | 'abnormal';
  abnormalReason?: string;
}

// 模拟电表数据
export const electricMeters: Meter[] = [
  {
    id: 'em-001',
    name: '主楼总电表',
    type: 'electric',
    model: 'DTSD1352',
    serialNumber: 'E2023051001',
    installationDate: '2023-01-15',
    location: '主楼配电室',
    buildingId: 'building-001',
    buildingName: '主楼',
    status: 'normal',
    lastReadingDate: '2023-11-01 08:30:00',
    lastReadingValue: 125678.5,
    unit: 'kWh',
    readingMethod: 'auto',
    readingCycle: 'hourly',
    manufacturer: '杭州华立电子',
    contacts: '李工',
    contactPhone: '13900000001',
    gateway: 'GW-ZL-001',
    gatewayId: 'gw-001',
    description: '主楼总用电计量',
    initialReading: 100000.0
  },
  {
    id: 'em-002',
    name: 'A区配电箱',
    type: 'electric',
    model: 'DTSD1352',
    serialNumber: 'E2023051002',
    installationDate: '2023-01-20',
    location: '主楼A区配电室',
    buildingId: 'building-001',
    buildingName: '主楼',
    floorId: 'floor-001',
    floorName: '1楼',
    status: 'normal',
    lastReadingDate: '2023-11-01 08:30:00',
    lastReadingValue: 45678.2,
    unit: 'kWh',
    readingMethod: 'auto',
    readingCycle: 'hourly',
    manufacturer: '杭州华立电子',
    contacts: '李工',
    contactPhone: '13900000001',
    gateway: 'GW-ZL-001',
    gatewayId: 'gw-001',
    description: 'A区用电计量',
    initialReading: 40000.0
  },
  {
    id: 'em-003',
    name: 'B区配电箱',
    type: 'electric',
    model: 'DTSD1352',
    serialNumber: 'E2023051003',
    installationDate: '2023-01-20',
    location: '主楼B区配电室',
    buildingId: 'building-001',
    buildingName: '主楼',
    floorId: 'floor-002',
    floorName: '2楼',
    status: 'normal',
    lastReadingDate: '2023-11-01 08:30:00',
    lastReadingValue: 36789.8,
    unit: 'kWh',
    readingMethod: 'auto',
    readingCycle: 'hourly',
    manufacturer: '杭州华立电子',
    contacts: '李工',
    contactPhone: '13900000001',
    gateway: 'GW-ZL-001',
    gatewayId: 'gw-001',
    description: 'B区用电计量',
    initialReading: 30000.0
  },
  {
    id: 'em-004',
    name: '数据中心电表',
    type: 'electric',
    model: 'DTSD1352-M',
    serialNumber: 'E2023051004',
    installationDate: '2023-01-25',
    location: '数据中心机房',
    buildingId: 'building-002',
    buildingName: '数据中心',
    status: 'normal',
    lastReadingDate: '2023-11-01 08:30:00',
    lastReadingValue: 98765.3,
    unit: 'kWh',
    readingMethod: 'auto',
    readingCycle: 'hourly',
    manufacturer: '杭州华立电子',
    contacts: '王工',
    contactPhone: '13900000002',
    gateway: 'GW-SJZ-001',
    gatewayId: 'gw-002',
    description: '数据中心专用电表',
    initialReading: 80000.0
  },
  {
    id: 'em-005',
    name: '办公区电表',
    type: 'electric',
    model: 'DTSD1352',
    serialNumber: 'E2023051005',
    installationDate: '2023-01-30',
    location: '办公楼配电室',
    buildingId: 'building-003',
    buildingName: '办公楼',
    status: 'fault',
    lastReadingDate: '2023-10-30 08:30:00',
    lastReadingValue: 56432.1,
    unit: 'kWh',
    readingMethod: 'manual',
    readingCycle: 'daily',
    manufacturer: '杭州华立电子',
    contacts: '张工',
    contactPhone: '13900000003',
    description: '办公区用电计量，当前故障待维修',
    initialReading: 50000.0
  }
];

// 模拟水表数据
export const waterMeters: Meter[] = [
  {
    id: 'wm-001',
    name: '主楼总水表',
    type: 'water',
    model: 'LXS-50E',
    serialNumber: 'W2023051001',
    installationDate: '2023-01-15',
    location: '主楼水表井',
    buildingId: 'building-001',
    buildingName: '主楼',
    status: 'normal',
    lastReadingDate: '2023-11-01 08:30:00',
    lastReadingValue: 3567.8,
    unit: 'm³',
    readingMethod: 'auto',
    readingCycle: 'daily',
    manufacturer: '宁波水表股份',
    contacts: '赵工',
    contactPhone: '13900000004',
    gateway: 'GW-ZL-002',
    gatewayId: 'gw-003',
    description: '主楼总用水计量',
    initialReading: 3000.0
  },
  {
    id: 'wm-002',
    name: 'A区水表',
    type: 'water',
    model: 'LXS-25E',
    serialNumber: 'W2023051002',
    installationDate: '2023-01-20',
    location: '主楼A区水表间',
    buildingId: 'building-001',
    buildingName: '主楼',
    floorId: 'floor-001',
    floorName: '1楼',
    status: 'normal',
    lastReadingDate: '2023-11-01 08:30:00',
    lastReadingValue: 1234.5,
    unit: 'm³',
    readingMethod: 'auto',
    readingCycle: 'daily',
    manufacturer: '宁波水表股份',
    contacts: '赵工',
    contactPhone: '13900000004',
    gateway: 'GW-ZL-002',
    gatewayId: 'gw-003',
    description: 'A区用水计量',
    initialReading: 1000.0
  },
  {
    id: 'wm-003',
    name: 'B区水表',
    type: 'water',
    model: 'LXS-25E',
    serialNumber: 'W2023051003',
    installationDate: '2023-01-20',
    location: '主楼B区水表间',
    buildingId: 'building-001',
    buildingName: '主楼',
    floorId: 'floor-002',
    floorName: '2楼',
    status: 'normal',
    lastReadingDate: '2023-11-01 08:30:00',
    lastReadingValue: 987.6,
    unit: 'm³',
    readingMethod: 'auto',
    readingCycle: 'daily',
    manufacturer: '宁波水表股份',
    contacts: '赵工',
    contactPhone: '13900000004',
    gateway: 'GW-ZL-002',
    gatewayId: 'gw-003',
    description: 'B区用水计量',
    initialReading: 800.0
  },
  {
    id: 'wm-004',
    name: '办公楼水表',
    type: 'water',
    model: 'LXS-40E',
    serialNumber: 'W2023051004',
    installationDate: '2023-01-30',
    location: '办公楼水表井',
    buildingId: 'building-003',
    buildingName: '办公楼',
    status: 'maintenance',
    lastReadingDate: '2023-10-28 09:15:00',
    lastReadingValue: 2345.7,
    unit: 'm³',
    readingMethod: 'manual',
    readingCycle: 'weekly',
    manufacturer: '宁波水表股份',
    contacts: '陈工',
    contactPhone: '13900000005',
    description: '办公楼用水计量，当前维护中',
    initialReading: 2000.0
  },
  {
    id: 'wm-005',
    name: '绿化用水表',
    type: 'water',
    model: 'LXS-25E',
    serialNumber: 'W2023051005',
    installationDate: '2023-02-05',
    location: '园区绿化区',
    buildingId: 'building-000',
    buildingName: '园区公共区域',
    status: 'normal',
    lastReadingDate: '2023-11-01 08:30:00',
    lastReadingValue: 876.4,
    unit: 'm³',
    readingMethod: 'manual',
    readingCycle: 'weekly',
    manufacturer: '宁波水表股份',
    contacts: '陈工',
    contactPhone: '13900000005',
    description: '园区绿化用水计量',
    initialReading: 500.0
  }
];

// 合并所有仪表数据
export const meters: Meter[] = [...electricMeters, ...waterMeters];

// 生成抄表记录
const generateMeterReadings = (): MeterReading[] => {
  const readings: MeterReading[] = [];
  const now = new Date();
  
  // 为每个仪表生成最近30天的抄表记录
  meters.forEach(meter => {
    for (let i = 0; i < 30; i++) {
      const readingDate = new Date(now);
      readingDate.setDate(now.getDate() - i);
      
      // 自动抄表每天一次，手动抄表每周一次
      if (meter.readingMethod === 'manual' && i % 7 !== 0) {
        continue;
      }
      
      // 计算本次读数：随机增加一些用量
      let dailyConsumption = 0;
      
      if (meter.type === 'electric') {
        // 电表日均用量范围: 100-300 kWh
        dailyConsumption = 100 + Math.random() * 200;
      } else {
        // 水表日均用量范围: 5-15 m³
        dailyConsumption = 5 + Math.random() * 10;
      }
      
      // 调整用量 - 周末用量减少
      const dayOfWeek = readingDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        dailyConsumption *= 0.6;
      }
      
      // 如果是故障或维护状态，特定日期的读数异常
      const isAbnormal = 
        (meter.status === 'fault' && i < 3) || 
        (meter.status === 'maintenance' && i < 5) || 
        (Math.random() < 0.05); // 5%的概率产生异常读数
      
      if (isAbnormal) {
        // 异常读数：可能特别高或特别低
        dailyConsumption = Math.random() < 0.5 ? 
          dailyConsumption * 0.1 : // 异常低
          dailyConsumption * 5;    // 异常高
      }
      
      // 计算本次读数和前次读数
      const readingValue = meter.lastReadingValue - (dailyConsumption * i);
      const previousValue = readingValue - dailyConsumption;
      
      readings.push({
        id: `reading-${meter.id}-${readingDate.toISOString().split('T')[0]}`,
        meterId: meter.id,
        meterName: meter.name,
        meterType: meter.type,
        readingDate: readingDate.toISOString().replace('T', ' ').substring(0, 19),
        readingValue: parseFloat(readingValue.toFixed(1)),
        previousValue: parseFloat(previousValue.toFixed(1)),
        consumption: parseFloat(dailyConsumption.toFixed(1)),
        operator: meter.readingMethod === 'auto' ? '系统' : '张三',
        readingMethod: meter.readingMethod,
        unit: meter.unit,
        status: isAbnormal ? 'abnormal' : 'normal',
        abnormalReason: isAbnormal ? '读数异常波动' : undefined,
        remark: isAbnormal ? '需人工复核' : ''
      });
    }
  });
  
  // 按日期排序，最新的在前
  return readings.sort((a, b) => 
    new Date(b.readingDate).getTime() - new Date(a.readingDate).getTime()
  );
};

// 生成抄表记录
export const meterReadings: MeterReading[] = generateMeterReadings();

// 获取仪表信息数据
export const getMeterData = (projectId: string) => {
  return {
    electricMeters,
    waterMeters,
    allMeters: meters,
    meterReadings
  };
};

// ==================== 能耗统计数据模型 ====================

// 能耗统计周期
export type ConsumptionPeriod = 'day' | 'month' | 'year';

// 资源类型
export type ResourceType = 'electric' | 'water';

// 能耗统计数据
export interface ConsumptionStats {
  // 统计时间
  time: string;
  // 用量
  value: number;
  // 同比数据（与去年同期比较）
  yoy?: number; // year-over-year
  // 环比数据（与上一周期比较）
  mom?: number; // month-over-month
  // 单位 (kWh 或 m³)
  unit: string;
}

// 建筑物统计数据
export interface BuildingConsumption {
  buildingId: string;
  buildingName: string;
  electricConsumption: number;
  waterConsumption: number;
  electricUnit: string;
  waterUnit: string;
  // 建筑物占比
  electricPercentage: number;
  waterPercentage: number;
}

// 区域统计数据（用于地图展示）
export interface AreaConsumption {
  areaId: string;
  areaName: string;
  location: {
    latitude: number;
    longitude: number;
  };
  electricConsumption: number;
  waterConsumption: number;
  electricUnit: string;
  waterUnit: string;
  // 区域内建筑物
  buildings: BuildingConsumption[];
}

// 能耗总览数据
export interface ConsumptionOverview {
  // 当前周期
  currentPeriod: string;
  
  // 总能耗数据
  totalElectricConsumption: number;
  totalWaterConsumption: number;
  
  // 电量单位和水量单位
  electricUnit: string;
  waterUnit: string;
  
  // 同比增长率
  electricYoy: number;
  waterYoy: number;
  
  // 环比增长率
  electricMom: number;
  waterMom: number;
  
  // 峰值用量
  electricPeak: number;
  waterPeak: number;
  
  // 按小时统计（当天）
  hourlyElectricConsumption: ConsumptionStats[];
  hourlyWaterConsumption: ConsumptionStats[];
  
  // 按日统计（当月）
  dailyElectricConsumption: ConsumptionStats[];
  dailyWaterConsumption: ConsumptionStats[];
  
  // 按月统计（当年）
  monthlyElectricConsumption: ConsumptionStats[];
  monthlyWaterConsumption: ConsumptionStats[];
  
  // 按年统计（近5年）
  yearlyElectricConsumption: ConsumptionStats[];
  yearlyWaterConsumption: ConsumptionStats[];
  
  // 建筑物用能分布
  buildingConsumption: BuildingConsumption[];
  
  // 区域用能分布（用于地图）
  areaConsumption: AreaConsumption[];
}

// 生成小时用能统计数据
const generateHourlyConsumption = (type: ResourceType, date: Date): ConsumptionStats[] => {
  const result: ConsumptionStats[] = [];
  const unit = type === 'electric' ? 'kWh' : 'm³';
  const baseValue = type === 'electric' ? 200 : 15; // 基础用量：电200kWh，水15m³
  
  // 获取当前小时
  const currentHour = date.getHours();
  
  // 生成24小时数据
  for (let hour = 0; hour < 24; hour++) {
    // 工作时间段 (8:00-18:00) 用量高
    const isWorkHour = hour >= 8 && hour <= 18;
    // 如果是未来时间，设置为0
    const isFuture = hour > currentHour;
    
    // 计算用量
    let value = 0;
    if (!isFuture) {
      if (isWorkHour) {
        // 工作时间用量波动范围：基础用量的80%-120%
        value = baseValue * (0.8 + Math.random() * 0.4);
      } else {
        // 非工作时间用量波动范围：基础用量的20%-40%
        value = baseValue * (0.2 + Math.random() * 0.2);
      }
    }
    
    // 同比数据（比去年同期增加1%-10%）
    const yoy = Math.random() * 0.09 + 0.01;
    // 环比数据（比上月同期波动-5%-+8%）
    const mom = Math.random() * 0.13 - 0.05;
    
    result.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      value: parseFloat(value.toFixed(2)),
      yoy: parseFloat(yoy.toFixed(3)),
      mom: parseFloat(mom.toFixed(3)),
      unit
    });
  }
  
  return result;
};

// 生成每日用能统计数据
const generateDailyConsumption = (type: ResourceType, date: Date): ConsumptionStats[] => {
  const result: ConsumptionStats[] = [];
  const unit = type === 'electric' ? 'kWh' : 'm³';
  const baseValue = type === 'electric' ? 4500 : 350; // 基础用量：电4500kWh/天，水350m³/天
  
  // 获取当前日期和当月天数
  const currentDate = date.getDate();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  // 生成当月每日数据
  for (let day = 1; day <= daysInMonth; day++) {
    // 判断是否工作日
    const tempDate = new Date(date.getFullYear(), date.getMonth(), day);
    const isWeekend = tempDate.getDay() === 0 || tempDate.getDay() === 6;
    // 如果是未来日期，设置为0
    const isFuture = day > currentDate;
    
    // 计算用量
    let value = 0;
    if (!isFuture) {
      if (isWeekend) {
        // 周末用量波动范围：基础用量的30%-50%
        value = baseValue * (0.3 + Math.random() * 0.2);
      } else {
        // 工作日用量波动范围：基础用量的80%-120%
        value = baseValue * (0.8 + Math.random() * 0.4);
      }
    }
    
    // 同比数据（比去年同期增加2%-12%）
    const yoy = Math.random() * 0.1 + 0.02;
    // 环比数据（比上月同期波动-8%-+10%）
    const mom = Math.random() * 0.18 - 0.08;
    
    result.push({
      time: `${day}日`,
      value: parseFloat(value.toFixed(2)),
      yoy: parseFloat(yoy.toFixed(3)),
      mom: parseFloat(mom.toFixed(3)),
      unit
    });
  }
  
  return result;
};

// 生成每月用能统计数据
const generateMonthlyConsumption = (type: ResourceType, date: Date): ConsumptionStats[] => {
  const result: ConsumptionStats[] = [];
  const unit = type === 'electric' ? 'kWh' : 'm³';
  const baseValue = type === 'electric' ? 135000 : 10500; // 基础用量：电135000kWh/月，水10500m³/月
  
  // 获取当前月份
  const currentMonth = date.getMonth();
  
  // 生成12个月的数据
  for (let month = 0; month < 12; month++) {
    // 季节因素影响，夏季(6-8月)和冬季(11-1月)用量高
    const isSummer = month >= 5 && month <= 7;
    const isWinter = month >= 10 || month <= 0;
    // 如果是未来月份，设置为0
    const isFuture = month > currentMonth;
    
    // 计算用量
    let value = 0;
    if (!isFuture) {
      if (isSummer || isWinter) {
        // 夏季和冬季用量波动范围：基础用量的120%-150%
        value = baseValue * (1.2 + Math.random() * 0.3);
      } else {
        // 其他季节用量波动范围：基础用量的80%-110%
        value = baseValue * (0.8 + Math.random() * 0.3);
      }
    }
    
    // 同比数据（比去年同期增加3%-15%）
    const yoy = Math.random() * 0.12 + 0.03;
    // 环比数据（比上月同期波动-10%-+15%）
    const mom = Math.random() * 0.25 - 0.1;
    
    result.push({
      time: `${month + 1}月`,
      value: parseFloat(value.toFixed(2)),
      yoy: parseFloat(yoy.toFixed(3)),
      mom: parseFloat(mom.toFixed(3)),
      unit
    });
  }
  
  return result;
};

// 生成年度用能统计数据
const generateYearlyConsumption = (type: ResourceType, date: Date): ConsumptionStats[] => {
  const result: ConsumptionStats[] = [];
  const unit = type === 'electric' ? 'kWh' : 'm³';
  const baseValue = type === 'electric' ? 1620000 : 126000; // 基础用量：电1620000kWh/年，水126000m³/年
  
  // 获取当前年份
  const currentYear = date.getFullYear();
  
  // 生成近5年的数据
  for (let i = 0; i < 5; i++) {
    const year = currentYear - 4 + i;
    
    // 每年增长3%-8%
    const yearGrowth = 1 + (0.03 + Math.random() * 0.05) * i;
    const value = baseValue * yearGrowth;
    
    // 同比数据（比去年同期增加）
    const yoy = i === 0 ? 0 : (value / (baseValue * (1 + (0.03 + Math.random() * 0.05) * (i - 1))) - 1);
    // 对于年度数据，环比不适用，设为0
    const mom = 0;
    
    result.push({
      time: `${year}年`,
      value: parseFloat(value.toFixed(2)),
      yoy: parseFloat(yoy.toFixed(3)),
      mom: mom,
      unit
    });
  }
  
  return result;
};

// 生成建筑物用能分布数据
const generateBuildingConsumption = (): BuildingConsumption[] => {
  // 使用仪表数据中的建筑信息
  const buildings = Array.from(new Set(meters.map(meter => meter.buildingId)))
    .map(buildingId => {
      const meter = meters.find(m => m.buildingId === buildingId);
      return {
        buildingId,
        buildingName: meter?.buildingName || '未知建筑'
      };
    });
  
  // 总用量
  const totalElectric = 135000; // 电总量 135000 kWh
  const totalWater = 10500; // 水总量 10500 m³
  
  // 生成各建筑物用量数据
  return buildings.map((building, index) => {
    // 分配用量比例，确保总和为100%
    const electricPercentage = index === buildings.length - 1 
      ? 100 - buildings.slice(0, -1).reduce((sum, _, i) => sum + (5 + i * 3 + Math.random() * 5), 0)
      : 5 + index * 3 + Math.random() * 5;
    
    const waterPercentage = index === buildings.length - 1
      ? 100 - buildings.slice(0, -1).reduce((sum, _, i) => sum + (5 + i * 3 + Math.random() * 5), 0)
      : 5 + index * 3 + Math.random() * 5;
    
    return {
      buildingId: building.buildingId,
      buildingName: building.buildingName,
      electricConsumption: parseFloat((totalElectric * electricPercentage / 100).toFixed(2)),
      waterConsumption: parseFloat((totalWater * waterPercentage / 100).toFixed(2)),
      electricUnit: 'kWh',
      waterUnit: 'm³',
      electricPercentage: parseFloat(electricPercentage.toFixed(1)),
      waterPercentage: parseFloat(waterPercentage.toFixed(1))
    };
  });
};

// 生成区域用能分布数据
const generateAreaConsumption = (buildingConsumption: BuildingConsumption[]): AreaConsumption[] => {
  // 定义区域，根据项目中的位置信息构建
  const areas = [
    {
      areaId: 'area-001',
      areaName: '主园区',
      location: {
        latitude: 39.9641,
        longitude: 116.4532
      },
      buildings: ['building-001', 'building-002']
    },
    {
      areaId: 'area-002',
      areaName: '办公区',
      location: {
        latitude: 39.9736,
        longitude: 116.4421
      },
      buildings: ['building-003']
    },
    {
      areaId: 'area-003',
      areaName: '公共区域',
      location: {
        latitude: 39.9689,
        longitude: 116.4476
      },
      buildings: ['building-000']
    }
  ];
  
  // 生成区域用能数据
  return areas.map(area => {
    const areaBuildings = buildingConsumption.filter(b => area.buildings.includes(b.buildingId));
    
    return {
      areaId: area.areaId,
      areaName: area.areaName,
      location: area.location,
      electricConsumption: parseFloat(areaBuildings.reduce((sum, b) => sum + b.electricConsumption, 0).toFixed(2)),
      waterConsumption: parseFloat(areaBuildings.reduce((sum, b) => sum + b.waterConsumption, 0).toFixed(2)),
      electricUnit: 'kWh',
      waterUnit: 'm³',
      buildings: areaBuildings
    };
  });
};

// 生成能耗总览数据
export const generateConsumptionOverview = (period: ConsumptionPeriod = 'month'): ConsumptionOverview => {
  const now = new Date();
  
  // 生成建筑物用能分布
  const buildingConsumption = generateBuildingConsumption();
  // 生成区域用能分布
  const areaConsumption = generateAreaConsumption(buildingConsumption);
  
  // 生成不同周期的用能数据
  const hourlyElectricConsumption = generateHourlyConsumption('electric', now);
  const hourlyWaterConsumption = generateHourlyConsumption('water', now);
  const dailyElectricConsumption = generateDailyConsumption('electric', now);
  const dailyWaterConsumption = generateDailyConsumption('water', now);
  const monthlyElectricConsumption = generateMonthlyConsumption('electric', now);
  const monthlyWaterConsumption = generateMonthlyConsumption('water', now);
  const yearlyElectricConsumption = generateYearlyConsumption('electric', now);
  const yearlyWaterConsumption = generateYearlyConsumption('water', now);
  
  // 计算总用量
  let totalElectricConsumption = 0;
  let totalWaterConsumption = 0;
  let electricYoy = 0;
  let waterYoy = 0;
  let electricMom = 0;
  let waterMom = 0;
  let currentPeriod = '';
  
  // 根据统计周期设置当前值
  switch (period) {
    case 'day':
      currentPeriod = now.toISOString().split('T')[0];
      totalElectricConsumption = hourlyElectricConsumption.reduce((sum, item) => sum + item.value, 0);
      totalWaterConsumption = hourlyWaterConsumption.reduce((sum, item) => sum + item.value, 0);
      electricYoy = 0.08; // 同比增长8%
      waterYoy = 0.05; // 同比增长5%
      electricMom = 0.03; // 环比增长3%
      waterMom = 0.02; // 环比增长2%
      break;
    case 'month':
      currentPeriod = `${now.getFullYear()}年${now.getMonth() + 1}月`;
      totalElectricConsumption = dailyElectricConsumption.reduce((sum, item) => sum + item.value, 0);
      totalWaterConsumption = dailyWaterConsumption.reduce((sum, item) => sum + item.value, 0);
      electricYoy = 0.1; // 同比增长10%
      waterYoy = 0.07; // 同比增长7%
      electricMom = 0.04; // 环比增长4%
      waterMom = 0.03; // 环比增长3%
      break;
    case 'year':
      currentPeriod = `${now.getFullYear()}年`;
      totalElectricConsumption = monthlyElectricConsumption.reduce((sum, item) => sum + item.value, 0);
      totalWaterConsumption = monthlyWaterConsumption.reduce((sum, item) => sum + item.value, 0);
      electricYoy = 0.12; // 同比增长12%
      waterYoy = 0.09; // 同比增长9%
      electricMom = 0; // 年度数据无环比
      waterMom = 0; // 年度数据无环比
      break;
  }
  
  // 找出峰值用量
  const electricPeak = Math.max(...(period === 'day' ? hourlyElectricConsumption : period === 'month' ? dailyElectricConsumption : monthlyElectricConsumption).map(item => item.value));
  const waterPeak = Math.max(...(period === 'day' ? hourlyWaterConsumption : period === 'month' ? dailyWaterConsumption : monthlyWaterConsumption).map(item => item.value));
  
  return {
    currentPeriod,
    totalElectricConsumption: parseFloat(totalElectricConsumption.toFixed(2)),
    totalWaterConsumption: parseFloat(totalWaterConsumption.toFixed(2)),
    electricUnit: 'kWh',
    waterUnit: 'm³',
    electricYoy,
    waterYoy,
    electricMom,
    waterMom,
    electricPeak: parseFloat(electricPeak.toFixed(2)),
    waterPeak: parseFloat(waterPeak.toFixed(2)),
    hourlyElectricConsumption,
    hourlyWaterConsumption,
    dailyElectricConsumption,
    dailyWaterConsumption,
    monthlyElectricConsumption,
    monthlyWaterConsumption,
    yearlyElectricConsumption,
    yearlyWaterConsumption,
    buildingConsumption,
    areaConsumption
  };
};

// 获取能耗统计数据
export const getConsumptionData = (projectId: string, period: ConsumptionPeriod = 'month') => {
  return generateConsumptionOverview(period);
}; 
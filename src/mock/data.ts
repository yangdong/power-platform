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
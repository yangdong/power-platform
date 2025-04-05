// Mock clients data
export interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  projectsCount: number;
}

export const clients: Client[] = [
  {
    id: '1',
    name: '北京能源集团',
    contact: '张三',
    email: 'zhangsan@example.com',
    phone: '13800000001',
    address: '北京市朝阳区',
    projectsCount: 3,
  },
  {
    id: '2',
    name: '上海电力有限公司',
    contact: '李四',
    email: 'lisi@example.com',
    phone: '13800000002',
    address: '上海市浦东新区',
    projectsCount: 2,
  },
  {
    id: '3',
    name: '广州新能源科技',
    contact: '王五',
    email: 'wangwu@example.com',
    phone: '13800000003',
    address: '广州市天河区',
    projectsCount: 4,
  },
  {
    id: '4',
    name: '深圳绿色能源集团',
    contact: '赵六',
    email: 'zhaoliu@example.com',
    phone: '13800000004',
    address: '深圳市南山区',
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
  status: 'planning' | 'construction' | 'operational' | 'maintenance';
  efficiency: number; // percentage
  annualOutput: number; // MWh
  carbonReduction: number; // tons of CO2
  modules: ModuleType[]; // 项目模块
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
    status: 'operational',
    efficiency: 87,
    annualOutput: 87600,
    carbonReduction: 43800,
    modules: ['源', '网', '储']
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
    status: 'operational',
    efficiency: 92,
    annualOutput: 131400,
    carbonReduction: 65700,
    modules: ['源', '网', '荷']
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
    status: 'construction',
    efficiency: 78,
    annualOutput: 45552,
    carbonReduction: 22776,
    modules: ['源', '网']
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
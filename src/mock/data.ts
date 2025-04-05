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
import React from 'react';
import { Tag } from 'antd';
import { Project } from '../mock/data';

// Status tags for the table
export const getStatusTag = (status: Project['status']) => {
  let color = '';
  
  switch(status) {
    case 'planning':
      color = 'blue';
      break;
    case 'construction':
      color = 'orange';
      break;
    case 'operational':
      color = 'green';
      break;
    case 'maintenance':
      color = 'red';
      break;
    default:
      color = 'default';
  }
  
  return <Tag color={color}>{status}</Tag>;
};

// Type tags for the table
export const getTypeTag = (type: Project['type']) => {
  let color = '';
  
  switch(type) {
    case 'solar':
      color = 'gold';
      break;
    case 'wind':
      color = 'blue';
      break;
    case 'hydro':
      color = 'green';
      break;
    case 'biomass':
      color = 'orange';
      break;
    case 'geothermal':
      color = 'red';
      break;
    default:
      color = 'default';
  }
  
  return <Tag color={color}>{type}</Tag>;
}; 
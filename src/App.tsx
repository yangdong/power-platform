import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import ProjectLayout from './layouts/ProjectLayout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import ClientDetail from './pages/ClientDetail';
import ProjectDetail from './pages/ProjectDetail';
import ProjectModulePage from './pages/ProjectModulePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/detail/:id" element={<ProjectDetail />} />
        </Route>
        
        {/* 项目模块页面使用独立布局 */}
        <Route path="projects/module/:id/:module/:subModule/:page" element={<ProjectLayout />}>
          <Route index element={<ProjectModulePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

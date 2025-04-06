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
import ProjectBigScreen from './pages/ProjectBigScreen';

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
        </Route>
        
        {/* 项目布局 - 包含项目详情和模块页面 */}
        <Route path="projects/:id" element={<ProjectLayout />}>
          {/* 项目首页（项目详情） */}
          <Route index element={<ProjectDetail />} />
          {/* 项目模块页面 */}
          <Route path=":module/:subModule/:page" element={<ProjectModulePage />} />
        </Route>

        {/* 项目大屏页面 - 独立路由 */}
        <Route path="projects/:id/bigscreen" element={<ProjectBigScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

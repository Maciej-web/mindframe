import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BrainDumpPage from './pages/BrainDumpPage';
import ClusterViewPage from './pages/ClusterViewPage';
import ClusterDetailPage from './pages/ClusterDetailPage';
import ResultsPage from './pages/ResultsPage';

export const BrainOrganizerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BrainDumpPage />} />
      <Route path="/clusters" element={<ClusterViewPage />} />
      <Route path="/clusters/:clusterId" element={<ClusterDetailPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
};
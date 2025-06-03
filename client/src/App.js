import Layout from './layouts/llayout';
import CampaignForm from './components/CampaignForm';
import CampaignHistory from './components/CampaignHistory';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import Login from './auth/Login';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-querybuilder/dist/query-builder.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <Layout><CampaignForm /></Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <Layout><CampaignHistory /></Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    audience: 0,
  });
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get('http://localhost:5000/api/campaigns', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const data = res.data;
      setCampaigns(data);

      const totals = data.reduce((acc, c) => {
        acc.total++;
        acc.sent += c.sent || 0;
        acc.failed += c.failed || 0;
        acc.audience += c.audienceSize || 0;
        return acc;
      }, { total: 0, sent: 0, failed: 0, audience: 0 });

      setStats(totals);
    };

    fetchStats();
  }, []);

  const chartData = campaigns.slice(0, 5).map(c => ({
    name: c.name,
    sent: c.sent,
    failed: c.failed,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📊 Campaign Overview</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Campaigns" value={stats.total} color="bg-blue-500" />
        <StatCard title="Total Sent" value={stats.sent} color="bg-green-500" />
        <StatCard title="Total Failed" value={stats.failed} color="bg-red-500" />
        <StatCard title="Total Audience" value={stats.audience} color="bg-purple-500" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Campaign Delivery</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sent" fill="#4ade80" />
            <Bar dataKey="failed" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`p-4 rounded shadow text-white ${color}`}>
    <h3 className="text-md">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;

import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, Clock, AlertTriangle, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/tasks/dashboard');
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="container" style={{ marginTop: '50px' }}>Loading dashboard...</div>;

  return (
    <div className="container animate-fade-in">
      <div className="flex justify-between items-center" style={{ marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user?.name}. Here's what's happening.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div className="glass stat-card">
          <div className="flex justify-between items-center" style={{ width: '100%', marginBottom: '16px' }}>
            <span className="stat-title">Total Tasks</span>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--info)' }}>
              <ListTodo size={24} />
            </div>
          </div>
          <span className="stat-value">{stats?.total || 0}</span>
        </div>

        <div className="glass stat-card">
          <div className="flex justify-between items-center" style={{ width: '100%', marginBottom: '16px' }}>
            <span className="stat-title">To Do</span>
            <div style={{ background: 'rgba(96, 165, 250, 0.1)', padding: '10px', borderRadius: '12px', color: '#60a5fa' }}>
              <Clock size={24} />
            </div>
          </div>
          <span className="stat-value">{stats?.todo || 0}</span>
        </div>

        <div className="glass stat-card">
          <div className="flex justify-between items-center" style={{ width: '100%', marginBottom: '16px' }}>
            <span className="stat-title">In Progress</span>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--warning)' }}>
              <Clock size={24} />
            </div>
          </div>
          <span className="stat-value">{stats?.inProgress || 0}</span>
        </div>

        <div className="glass stat-card">
          <div className="flex justify-between items-center" style={{ width: '100%', marginBottom: '16px' }}>
            <span className="stat-title">Completed</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--secondary)' }}>
              <CheckCircle size={24} />
            </div>
          </div>
          <span className="stat-value">{stats?.done || 0}</span>
        </div>

        <div className="glass stat-card">
          <div className="flex justify-between items-center" style={{ width: '100%', marginBottom: '16px' }}>
            <span className="stat-title">Overdue</span>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--danger)' }}>
              <AlertTriangle size={24} />
            </div>
          </div>
          <span className="stat-value">{stats?.overdue || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

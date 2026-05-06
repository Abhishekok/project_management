import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, CheckCircle, Clock, Circle, Calendar } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, projRes, usersRes] = await Promise.all([
        api.get('/tasks'),
        user?.role === 'Admin' ? api.get('/projects') : Promise.resolve({ data: [] }),
        user?.role === 'Admin' ? api.get('/auth/users') : Promise.resolve({ data: [] })
      ]);
      setTasks(tasksRes.data);
      if (user?.role === 'Admin') {
        setProjects(projRes.data);
        setUsers(usersRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { 
        title, 
        description, 
        project: projectId, 
        assignedTo: assignedTo || null, 
        dueDate: dueDate || null 
      });
      setShowModal(false);
      setTitle(''); setDescription(''); setProjectId(''); setAssignedTo(''); setDueDate('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/tasks/${id}`, { status });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status, date) => {
    if (status === 'Done') return <span className="badge badge-done">Done</span>;
    if (date && new Date(date) < new Date() && status !== 'Done') return <span className="badge badge-overdue">Overdue</span>;
    if (status === 'In Progress') return <span className="badge badge-progress">In Progress</span>;
    return <span className="badge badge-todo">Todo</span>;
  };

  const getStatusIcon = (status) => {
    if (status === 'Done') return <CheckCircle size={18} color="var(--secondary)" />;
    if (status === 'In Progress') return <Clock size={18} color="var(--warning)" />;
    return <Circle size={18} color="var(--info)" />;
  };

  if (loading) return <div className="container">Loading tasks...</div>;

  return (
    <>
      <div className="container animate-fade-in">
      <div className="flex justify-between items-center" style={{ marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Tasks</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track and update task progress</p>
        </div>
        {user?.role === 'Admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> New Task
          </button>
        )}
      </div>

      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Task</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Project</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Assigned To</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Due Date</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No tasks found.</td>
              </tr>
            ) : tasks.map(task => (
              <tr key={task._id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <div style={{ fontWeight: 500 }}>{task.title}</div>
                      {task.description && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{task.description}</div>}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>{task.project?.name || 'N/A'}</td>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>{task.assignedTo?.name || 'Unassigned'}</td>
                <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>
                  {task.dueDate ? (
                    <div className="flex items-center gap-2">
                      <Calendar size={14} color="var(--text-muted)" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  ) : '-'}
                </td>
                <td style={{ padding: '16px 24px' }}>{getStatusBadge(task.status, task.dueDate)}</td>
                <td style={{ padding: '16px 24px' }}>
                  <select 
                    className="form-control" 
                    style={{ padding: '6px 12px', fontSize: '0.85rem', width: 'auto' }}
                    value={task.status}
                    onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="glass glass-panel modal-content animate-fade-in">
            <h2 style={{ marginBottom: '20px' }}>Create New Task</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Task Title</label>
                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} rows="2"></textarea>
              </div>
              <div className="form-group">
                <label>Project</label>
                <select className="form-control" value={projectId} onChange={e => setProjectId(e.target.value)} required>
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
              </div>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Assign To</label>
                  <select className="form-control" value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
                    <option value="">Unassigned</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-between gap-4" style={{ marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          width: 100%; max-width: 500px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
};

export default Tasks;

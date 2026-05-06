import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Folder } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', { name, description });
      setShowModal(false);
      setName('');
      setDescription('');
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="container">Loading projects...</div>;

  return (
    <>
      <div className="container animate-fade-in">
      <div className="flex justify-between items-center" style={{ marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Projects</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your team projects</p>
        </div>
        {user?.role === 'Admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> New Project
          </button>
        )}
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {projects.map(project => (
          <div key={project._id} className="glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                <Folder size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{project.name}</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', flexGrow: 1 }}>
              {project.description || 'No description provided.'}
            </p>
            <div className="flex justify-between items-center" style={{ marginTop: 'auto', borderTop: '1px solid var(--surface-border)', paddingTop: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Created by: {project.createdBy?.name || 'Unknown'}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="glass glass-panel modal-content animate-fade-in">
            <h2 style={{ marginBottom: '20px' }}>Create New Project</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Project Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="form-control" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-between gap-4" style={{ marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          width: 100%;
          max-width: 500px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
};

export default Projects;

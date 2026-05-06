import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, FolderKanban, CheckSquare, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar glass">
      <div className="container flex justify-between items-center" style={{ height: '70px' }}>
        <div className="nav-brand">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             Taski
          </h2>
        </div>
        
        <div className="nav-links flex gap-4 items-center">
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>
            <FolderKanban size={18} /> Projects
          </Link>
          <Link to="/tasks" className={`nav-link ${isActive('/tasks')}`}>
            <CheckSquare size={18} /> Tasks
          </Link>
        </div>

        <div className="nav-user flex items-center gap-4">
          <div className="user-info flex items-center gap-2">
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-col">
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user?.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 12px' }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          border-radius: 0;
          border-top: none;
          border-left: none;
          border-right: none;
          margin-bottom: 30px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s;
          font-weight: 500;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.1);
        }
        .nav-link.active {
          color: var(--primary);
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

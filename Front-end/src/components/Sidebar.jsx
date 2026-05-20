import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Architect CMS</h1>
      </div>
      <nav className="sidebar-nav">
        <button
          className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
        >
          <span className="nav-icon"><i className="fa-solid fa-chart-bar"></i></span>
          Dashboard
        </button>
        <button
          className={`nav-link ${isActive('/manage') ? 'active' : ''}`}
          onClick={() => navigate('/manage')}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
        >
          <span className="nav-icon"><i className="fa-solid fa-file-lines"></i></span>
          Posts
        </button>
        <button
          className={`nav-link ${isActive('/create') ? 'active' : ''}`}
          onClick={() => navigate('/create')}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
        >
          <span className="nav-icon"><i className="fa-solid fa-pen"></i></span>
          New Post
        </button>
        <div className="nav-spacer"></div>
        <button
          className="nav-link"
          onClick={handleLogout}
          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
        >
          <span className="nav-icon"><i className="fa-solid fa-right-from-bracket"></i></span>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

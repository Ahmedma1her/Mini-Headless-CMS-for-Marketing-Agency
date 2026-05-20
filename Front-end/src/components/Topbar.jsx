import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import img from '../assets/img(4).png';

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">Overview</h1>
      </div>
      <div className="topbar-right d-flex align-items-center gap-3">
        {user && (
          <span style={{ fontSize: '13px', color: '#666' }}>
            {user.name || user.email}
          </span>
        )}
        <img
          src={img}
          alt="User"
          className="user-avatar"
          style={{ cursor: 'pointer' }}
          title="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Topbar;

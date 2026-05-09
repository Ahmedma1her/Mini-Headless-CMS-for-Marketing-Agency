import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Architect CMS</h1>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="nav-link">
          <span className="nav-icon">📊</span>
          Dashboard
        </a>
        <a href="#" className="nav-link active">
          <span className="nav-icon">📄</span>
          Posts
        </a>
        <a href="#" className="nav-link">
          <span className="nav-icon">📂</span>
          Categories
        </a>
        <div className="nav-spacer"></div>
        <a href="#" className="nav-link">
          <span className="nav-icon">🚪</span>
          Logout
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;

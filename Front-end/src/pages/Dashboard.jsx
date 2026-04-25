import React from 'react';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import ActionButton from '../components/ActionButton';
import PostItem from '../components/PostItem';
import img1 from '../assets/img(1).png';
import img2 from '../assets/img(2).png';
import img3 from '../assets/img(3).png';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Topbar />
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back, Architect.</h2>
          <p>Your content ecosystem is thriving. Here's the latest pulse.</p>
        </div>

        <div className="stats-grid">
          <StatCard
            icon="📄"
            label="Total Posts"
            value="1,284"
            trend="+12%"
            trendText="THIS MONTH"
          />
          <StatCard
            icon="✓"
            label="Published"
            value="842"
          />
          <StatCard
            icon="✎"
            label="Active Drafts"
            value="442"
          />
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <ActionButton label="+ Create New Post" isPrimary={true} />
            <ActionButton label="🔒 Import Assets" />
            <ActionButton label="⚙ CMS Settings" />
          </div>
        </div>

        <div className="recently-edited">
          <div className="section-header">
            <h3>Recently Edited</h3>
            <a href="#" className="view-all">View all posts</a>
          </div>
          <div className="posts-list">
            <PostItem
              image={img1}
              title="The Future of Minimalist Architecture"
              subtitle="Architecture"
              status="PUBLISHED"
              timeAgo="LAST EDITED 2H AGO"
              author="ELENA K."
            />
            <PostItem
              image={img2}
              title="Sustainability in High-Rise Design"
              status="DRAFT"
              timeAgo="LAST EDITED 6H AGO"
              author="MARCUS T."
            />
            <PostItem
              image={img3}
              title="Brutalist Revival in Modern Cities"
              status="PUBLISHED"
              timeAgo="LAST EDITED 1D AGO"
              author="ELENA K."
            />
          </div>
        </div>
      </div>

      <div className="bottom-nav">
        <button className="nav-item active">🏠 Home</button>
        <button className="nav-item">📝 Posts</button>
        <button className="nav-item">👤 Profile</button>
        <button className="nav-item">⚙ Settings</button>
      </div>
    </div>
  );
};

export default Dashboard;

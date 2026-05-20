import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import ActionButton from '../components/ActionButton';
import PostItem from '../components/PostItem';
import { getAllPosts } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data || []);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        } else {
          setError('Failed to load posts.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [logout, navigate]);

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === 'published').length;
  const draftPosts = posts.filter((p) => p.status === 'draft').length;

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 3);

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return 'JUST NOW';
    if (diff < 3600) return `${Math.floor(diff / 60)}M AGO`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}H AGO`;
    return `${Math.floor(diff / 86400)}D AGO`;
  };

  return (
    <div className="dashboard">
      <Topbar />

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back, Architect.</h2>
          <p>Your content ecosystem is thriving. Here's the latest pulse.</p>
        </div>

        <div className="stats-grid">
          {loading ? (
            <div className="stat-card">
              <span className="spinner-border text-primary" role="status" />
            </div>
          ) : (
            <>
              <StatCard iconClass="fa-solid fa-file-alt"      label="Total Posts"   value={totalPosts.toLocaleString()} />
              <StatCard iconClass="fa-solid fa-circle-check"  label="Published"     value={publishedPosts.toLocaleString()} />
              <StatCard iconClass="fa-solid fa-pencil"        label="Active Drafts" value={draftPosts.toLocaleString()} />
            </>
          )}
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <ActionButton label="Create New Post" isPrimary={true} onClick={() => navigate('/create')} />
            <ActionButton label="Manage Posts"                      onClick={() => navigate('/manage')} />
          </div>
        </div>

        <div className="recently-edited">
          <div className="section-header">
            <h3>Recently Edited</h3>
            <button
              className="view-all"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => navigate('/manage')}
            >
              View all posts
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="posts-list">
            {loading ? (
              <div className="d-flex justify-content-center p-4">
                <span className="spinner-border text-primary" role="status" />
              </div>
            ) : recentPosts.length === 0 ? (
              <p className="text-muted">No posts yet. Create your first one!</p>
            ) : (
              recentPosts.map((post) => (
                <PostItem
                  key={post._id}
                  image={
                    post.image
                      ? `http://localhost:5000/uploads/${post.image}`
                      : `https://placehold.co/64x64/e3f2fd/0056b3?text=CMS`
                  }
                  title={post.title}
                  description={post.description}
                  subtitle={post.category}
                  status={post.status?.toUpperCase()}
                  timeAgo={`LAST EDITED ${formatTimeAgo(post.updatedAt || post.createdAt)}`}
                  author={post.author?.name || ''}
                  onClick={() => navigate(`/edit/${post._id}`)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bottom-nav">
        <button className="nav-item active" onClick={() => navigate('/dashboard')}>
          <i className="fa-solid fa-house"></i> Home
        </button>
        <button className="nav-item" onClick={() => navigate('/manage')}>
          <i className="fa-solid fa-newspaper"></i> Posts
        </button>
        <button className="nav-item" onClick={() => navigate('/create')}>
          <i className="fa-solid fa-plus"></i> New
        </button>
        <button className="nav-item" onClick={() => { logout(); navigate('/login'); }}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

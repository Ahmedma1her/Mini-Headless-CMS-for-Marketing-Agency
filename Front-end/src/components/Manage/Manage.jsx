import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { getAllPosts, deletePost } from '../../services/api';
import style from './Manage.module.css';

const parseDescription = (text) => {
  if (!text) return '';
  
  let parts = [];
  let lastIndex = 0;
  
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]]*)/g;
  
  let matches = [];
  let match;
  
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    matches.push({
      type: 'markdown',
      start: match.index,
      end: markdownLinkRegex.lastIndex,
      text: match[1],
      url: match[2]
    });
  }
  
  while ((match = urlRegex.exec(text)) !== null) {
    const isOverlapping = matches.some(m => 
      (match.index >= m.start && match.index < m.end) ||
      (match.index + match[0].length > m.start && match.index + match[0].length <= m.end)
    );
    
    if (!isOverlapping) {
      matches.push({
        type: 'plain',
        start: match.index,
        end: urlRegex.lastIndex,
        url: match[0]
      });
    }
  }
  
  matches.sort((a, b) => a.start - b.start);
  
  lastIndex = 0;
  matches.forEach(match => {
    if (match.start > lastIndex) {
      parts.push({ 
        type: 'text', 
        content: text.substring(lastIndex, match.start) 
      });
    }
    
    if (match.type === 'markdown') {
      parts.push({ 
        type: 'link', 
        text: match.text, 
        url: match.url 
      });
    } else if (match.type === 'plain') {
      parts.push({ 
        type: 'link', 
        text: match.url, 
        url: match.url 
      });
    }
    
    lastIndex = match.end;
  });
  
  if (lastIndex < text.length) {
    parts.push({ 
      type: 'text', 
      content: text.substring(lastIndex) 
    });
  }
  
  return parts.length > 0 ? parts : [{ type: 'text', content: text }];
};

const DescriptionWithLinks = ({ description }) => {
  const parts = parseDescription(description);
  
  return (
    <p className="card-text text-muted small" style={{ wordBreak: 'break-word' }}>
      {parts.map((part, idx) => 
        part.type === 'link' ? (
          <a
            key={idx}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              color: '#0056b3',
              textDecoration: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              borderBottom: '1px solid #0056b3'
            }}
            onMouseEnter={(e) => e.target.style.color = '#003d82'}
            onMouseLeave={(e) => e.target.style.color = '#0056b3'}
            title={part.url}
          >
            {part.text}
          </a>
        ) : (
          <span key={idx}>{part.content}</span>
        )
      )}
    </p>
  );
};

export default function Manage() {
  const [posts, setPosts]       = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res  = await getAllPosts();
      const data = res.data || [];
      setPosts(data);
      setFiltered(data);
    } catch (err) {
      if (err.response?.status === 401) { logout(); navigate('/login'); }
      else setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(posts.filter(
      (p) => p.title?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    ));
  }, [search, posts]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setDeletingId(id);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete post.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {/* Topbar */}
      <div className={`${style.header} d-flex justify-content-between align-items-center p-3 m-3`}>
        <div className="d-flex align-items-center gap-3">
          <i className="fa-solid fa-bars"></i>
          <h1 className="mb-0">Overview</h1>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/dashboard')}>
          <i className="fa-solid fa-arrow-left"></i> Dashboard
        </button>
      </div>

      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2>Manage Content</h2>
            <p className="text-muted">Curate and refine your editorial flow.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/create')}>
            <i className="fa-solid fa-plus"></i> Create Post
          </button>
        </div>

        <input
          type="search"
          className="form-control mb-4"
          placeholder="Search posts by title or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="d-flex justify-content-center p-5">
            <span className="spinner-border text-primary" role="status" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted p-5">
            <p>No posts found.</p>
            <button className="btn btn-primary" onClick={() => navigate('/create')}>
              <i className="fa-solid fa-plus"></i> Create your first post
            </button>
          </div>
        ) : (
          <div className="row">
            {filtered.map((card) => (
              <div className="col-md-4 mb-4" key={card._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={
                      card.image
                        ? `http://localhost:5000/uploads/${card.image}`
                        : `https://placehold.co/400x200/e3f2fd/0056b3?text=${encodeURIComponent(card.title || 'Post')}`
                    }
                    alt={card.title}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />

                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-secondary text-capitalize">
                        {card.category || 'Uncategorized'}
                      </span>
                      <small className="text-muted">
                        {card.createdAt
                          ? new Date(card.createdAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })
                          : ''}
                      </small>
                    </div>
                    <h5 className="card-title">{card.title}</h5>
                    <DescriptionWithLinks description={card.description} />
                  </div>

                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <span className={`${style.state} ${style[card.status]}`}>
                      {card.status}
                    </span>
                    <div className="d-flex gap-3">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        title="Preview"
                        onClick={() => navigate(`/edit/${card._id}`)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        title="Edit"
                        onClick={() => navigate(`/edit/${card._id}`)}
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                        onClick={() => handleDelete(card._id)}
                        disabled={deletingId === card._id}
                      >
                        {deletingId === card._id
                          ? <span className="spinner-border spinner-border-sm" />
                          : <i className="fa-solid fa-trash-can"></i>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

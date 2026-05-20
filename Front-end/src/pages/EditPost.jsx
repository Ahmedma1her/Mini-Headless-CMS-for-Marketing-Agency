import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/EditPost.css';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { createPost, updatePost, getAllPosts } from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [postTitle, setPostTitle]     = useState('');
  const [postContent, setPostContent] = useState('');
  const [category, setCategory]       = useState('Architecture Trends');
  const [isPublished, setIsPublished] = useState(false);
  const [imageFile, setImageFile]     = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isBold, setIsBold]           = useState(false);
  const [isItalic, setIsItalic]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [fetchingPost, setFetchingPost] = useState(isEditing);
  const [error, setError]             = useState('');
  const [savedAt, setSavedAt]         = useState('Not saved yet');

  const textareaRef = useRef(null);

  const insertMarkdown = (prefix, suffix = '', multiLine = false) => {
    const el = textareaRef.current;
    if (!el) return;
    const start    = el.selectionStart;
    const end      = el.selectionEnd;
    const selected = postContent.slice(start, end);
    let replacement;

    if (multiLine && selected) {
      replacement = selected.split('\n').map((line) => `${prefix}${line}`).join('\n');
    } else {
      replacement = `${prefix}${selected || 'text'}${suffix}`;
    }

    const newContent = postContent.slice(0, start) + replacement + postContent.slice(end);
    setPostContent(newContent);

    requestAnimationFrame(() => {
      el.focus();
      const cursorPos = start + prefix.length;
      el.setSelectionRange(cursorPos, cursorPos + (selected || 'text').length);
    });
  };

  const handleLink = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start    = el.selectionStart;
    const end      = el.selectionEnd;
    const selected = postContent.slice(start, end) || 'link text';
    const url      = window.prompt('Enter the URL:', 'https://');
    if (!url) return;
    const replacement = `[${selected}](${url})`;
    const newContent  = postContent.slice(0, start) + replacement + postContent.slice(end);
    setPostContent(newContent);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + 1, start + 1 + selected.length);
    });
  };

  useEffect(() => {
    if (!isEditing) return;
    const loadPost = async () => {
      try {
        const res   = await getAllPosts();
        const found = (res.data || []).find((p) => p._id === id);
        if (found) {
          setPostTitle(found.title || '');
          setPostContent(found.description || '');
          setCategory(found.category || 'Architecture Trends');
          setIsPublished(found.status === 'published');
          if (found.image) setImagePreview(`http://localhost:5000/uploads/${found.image}`);
        }
      } catch {
        setError('Failed to load post data.');
      } finally {
        setFetchingPost(false);
      }
    };
    loadPost();
  }, [id, isEditing]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('title',       postTitle);
    fd.append('description', postContent);
    fd.append('category',    category);
    fd.append('status',      isPublished ? 'published' : 'draft');
    if (imageFile) fd.append('image', imageFile);
    return fd;
  };

  const handleSaveDraft = async () => {
    if (!postTitle.trim()) { setError('Please enter a title.'); return; }
    setError('');
    setLoading(true);
    try {
      const fd = buildFormData();
      fd.set('status', 'draft');
      isEditing ? await updatePost(id, fd) : await createPost(fd);
      setSavedAt(new Date().toLocaleTimeString());
      navigate('/manage');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save draft.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!postTitle.trim()) { setError('Please enter a title.'); return; }
    setError('');
    setLoading(true);
    try {
      const fd = buildFormData();
      fd.set('status', 'published');
      isEditing ? await updatePost(id, fd) : await createPost(fd);
      navigate('/manage');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post.');
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Discard changes and go back?')) navigate('/manage');
  };

  if (fetchingPost) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <span className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="edit-post-container">
      <Sidebar />

      <div className="edit-post-main">
        <Topbar />

        <main className="edit-post-content">
          <div className="edit-post-wrapper">

            <div className="edit-post-header">
              <div className="breadcrumbs">
                <span>Content</span>
                <span className="breadcrumb-separator">›</span>
                <span>Posts</span>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-current">{isEditing ? 'Edit Post' : 'New Draft'}</span>
              </div>
              <div className="save-status">Last saved: {savedAt}</div>
            </div>

            {error && <div className="alert alert-danger mb-4">{error}</div>}

            <div className="edit-post-grid">
              <section className="edit-post-main-content">
                <div className="title-section">
                  <input
                    type="text"
                    className="post-title-input"
                    placeholder="Post Title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </div>

                <div className="editor-container">
                  <div className="editor-toolbar">
                    <button
                      className={`toolbar-btn ${isBold ? 'active' : ''}`}
                      onClick={() => setIsBold(!isBold)}
                      title="Bold"
                    >
                      <i className="fa-solid fa-bold"></i>
                    </button>
                    <button
                      className={`toolbar-btn ${isItalic ? 'active' : ''}`}
                      onClick={() => setIsItalic(!isItalic)}
                      title="Italic"
                    >
                      <i className="fa-solid fa-italic"></i>
                    </button>
                    <button
                      className="toolbar-btn"
                      title="Bullet List"
                      onClick={() => insertMarkdown('- ', '', true)}
                    >
                      <i className="fa-solid fa-list-ul"></i>
                    </button>
                    <div className="toolbar-divider"></div>
                    <button
                      className="toolbar-btn"
                      title="Insert Link"
                      onClick={handleLink}
                    >
                      <i className="fa-solid fa-link"></i>
                    </button>
                    <button
                      className="toolbar-btn"
                      title="Inline Code"
                      onClick={() => insertMarkdown('`', '`')}
                    >
                      <i className="fa-solid fa-code"></i>
                    </button>
                  </div>

                  <div className="editor-content">
                    <textarea
                      ref={textareaRef}
                      className="editor-textarea"
                      style={{
                        fontWeight: isBold   ? 'bold'   : 'normal',
                        fontStyle:  isItalic ? 'italic' : 'normal',
                      }}
                      placeholder="Start writing your masterpiece…"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                  </div>

                  <div className="editor-tip">
                    <i className="fa-solid fa-keyboard"></i>
                    <span style={{ marginLeft: '6px' }}>Markdown Enabled</span>
                  </div>
                </div>
              </section>

              <aside className="edit-post-sidebar">
                <div className="sidebar-card">
                  <h3 className="card-title">Publishing Status</h3>

                  <div className="status-control">
                    <label className="toggle-label">
                      <span className="label-text">Post Status</span>
                      <input
                        type="checkbox"
                        className="toggle-checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="status-indicator">
                    <div
                      className="status-dot"
                      style={{ backgroundColor: isPublished ? '#28a745' : '#ff9800' }}
                    ></div>
                    <span className="status-text">
                      {isPublished ? 'Visible to public after publish' : 'Draft – not visible publicly'}
                    </span>
                  </div>

                  <div className="category-section">
                    <label className="dropdown-label">Primary Category</label>
                    <div className="dropdown-wrapper">
                      <select
                        className="category-dropdown"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Architecture Trends</option>
                        <option>Minimalism</option>
                        <option>Urban Design</option>
                        <option>Case Studies</option>
                        <option>Technology</option>
                        <option>Editorial</option>
                        <option>Marketing</option>
                      </select>
                      <span className="dropdown-icon">
                        <i className="fa-solid fa-chevron-down"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-card cover-card">
                  <h3 className="card-title">Cover Image</h3>
                  <div className="cover-preview-wrapper">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Cover Preview" className="cover-preview-img" />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%', background: '#e3f2fd',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#0056b3', fontSize: '14px', gap: '8px',
                      }}>
                        <i className="fa-solid fa-image"></i>
                        No image selected
                      </div>
                    )}
                    <div className="cover-overlay">
                      <label className="change-image-btn" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-image"></i>
                        <span style={{ marginLeft: '6px' }}>Change Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="cover-info">
                    <p className="cover-filename">{imageFile ? imageFile.name : 'No file selected'}</p>
                    <p className="cover-note">Click image to change</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <div className="edit-post-footer">
          <div className="footer-content">
            <button className="btn-discard" onClick={handleDiscard}>
              <i className="fa-solid fa-trash"></i>
              <span style={{ marginLeft: '6px' }}>Discard</span>
            </button>
            <div className="footer-actions">
              <button className="btn-save-draft" onClick={handleSaveDraft} disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <><i className="fa-solid fa-floppy-disk"></i><span style={{ marginLeft: '6px' }}>Save Draft</span></>
                )}
              </button>
              <button className="btn-publish" onClick={handlePublish} disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <><i className="fa-solid fa-upload"></i><span style={{ marginLeft: '6px' }}>{isEditing ? 'Update Post' : 'Publish Post'}</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

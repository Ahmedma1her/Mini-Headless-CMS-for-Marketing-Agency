import React, { useState } from 'react';
import '../styles/EditPost.css';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import img from '../assets/img(4).png';
import coverImg from '../assets/img(1).png';

const EditPost = ({ onBack }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [category, setCategory] = useState('Architecture Trends');
  const [isPublished, setIsPublished] = useState(true);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleBoldClick = () => setIsBold(!isBold);
  const handleItalicClick = () => setIsItalic(!isItalic);
  
  const handleDiscardDraft = () => {
    if (onBack) onBack();
  };

  const handlePublish = () => {
    console.log('Publishing post:', { postTitle, postContent, category });
    if (onBack) onBack();
  };

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
                <span className="breadcrumb-current">New Draft</span>
              </div>
              <div className="save-status">
                <span>Last saved: Just now</span>
              </div>
            </div>

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
                      onClick={handleBoldClick}
                      title="Bold"
                    >
                      <span className="icon">B</span>
                    </button>
                    <button
                      className={`toolbar-btn ${isItalic ? 'active' : ''}`}
                      onClick={handleItalicClick}
                      title="Italic"
                    >
                      <span className="icon">I</span>
                    </button>
                    <button className="toolbar-btn" title="List">
                      <span className="icon">≡</span>
                    </button>
                    <div className="toolbar-divider"></div>
                    <button className="toolbar-btn" title="Link">
                      <span className="icon">🔗</span>
                    </button>
                    <button className="toolbar-btn" title="Image">
                      <span className="icon">🖼️</span>
                    </button>
                    <button className="toolbar-btn" title="Code">
                      <span className="icon">&lt;/&gt;</span>
                    </button>
                  </div>

                  <div className="editor-content">
                    <textarea
                      className="editor-textarea"
                      placeholder="Start writing your masterpiece..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="editor-tip">
                    <span className="tip-icon">⌨️</span>
                    <span>Markdown Enabled</span>
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
                    <div className="status-dot"></div>
                    <span className="status-text">Visible to public after publish</span>
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
                      </select>
                      <span className="dropdown-icon">▼</span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-card cover-card">
                  <h3 className="card-title">Cover Preview</h3>
                  <div className="cover-preview-wrapper">
                    <img
                      src={coverImg}
                      alt="Cover Preview"
                      className="cover-preview-img"
                    />
                    <div className="cover-overlay">
                      <button className="change-image-btn">
                        <span className="btn-icon">✏️</span>
                        Change Image
                      </button>
                    </div>
                  </div>
                  <div className="cover-info">
                    <p className="cover-filename">seo-slug-v1.html</p>
                    <p className="cover-note">Permalinks automatically generated</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <div className="edit-post-footer">
          <div className="footer-content">
            <button className="btn-discard" onClick={handleDiscardDraft}>
              <span className="btn-icon">🗑️</span>
              Discard Draft
            </button>
            <div className="footer-actions">
              <button className="btn-save-draft">Save Draft</button>
              <button className="btn-publish" onClick={handlePublish}>Publish Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

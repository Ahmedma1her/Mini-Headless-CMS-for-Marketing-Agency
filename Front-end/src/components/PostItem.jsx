import React from 'react';

const PostItem = ({ image, title, subtitle, status, timeAgo, author }) => {
  return (
    <div className="post-item">
      <img src={image} alt={title} className="post-image" />
      <div className="post-content">
        <h4 className="post-title">{title}</h4>
        <p className="post-subtitle">{subtitle}</p>
        <p className="post-meta">
          <span className="post-time">{timeAgo}</span>
          {author && <span className="post-author">BY {author}</span>}
        </p>
      </div>
      {status && <span className={`post-status ${status.toLowerCase()}`}>{status}</span>}
    </div>
  );
};

export default PostItem;

import React from 'react';

const PostItem = ({ image, title, subtitle, description, status, timeAgo, author }) => {
  const parseText = (text) => {
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

  const displayText = description || subtitle;
  const parsedParts = parseText(displayText);

  return (
    <div className="post-item">
      <img src={image} alt={title} className="post-image" />
      <div className="post-content">
        <h4 className="post-title">{title}</h4>
        <p className="post-subtitle" style={{ wordBreak: 'break-word', margin: 0 }}>
          {parsedParts.map((part, idx) => 
            part.type === 'link' ? (
              <a
                key={idx}
                href={part.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  color: '#0066cc',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: '500',
                  marginLeft: '2px',
                  marginRight: '2px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#003d82';
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#0066cc';
                  e.target.style.textDecoration = 'underline';
                }}
              >
                {part.text}
              </a>
            ) : (
              <span key={idx}>{part.content}</span>
            )
          )}
        </p>
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

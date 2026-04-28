import React from 'react';

const ActionButton = ({ icon, label, isPrimary, onClick }) => {
  return (
    <button className={`action-button ${isPrimary ? 'primary' : 'secondary'}`} onClick={onClick}>
      {icon && <span className="action-icon">{icon}</span>}
      <span className="action-label">{label}</span>
    </button>
  );
};

export default ActionButton;

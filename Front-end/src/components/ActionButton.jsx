import React from 'react';

const ActionButton = ({ icon, label, isPrimary }) => {
  return (
    <button className={`action-button ${isPrimary ? 'primary' : 'secondary'}`}>
      {icon && <span className="action-icon">{icon}</span>}
      <span className="action-label">{label}</span>
    </button>
  );
};

export default ActionButton;

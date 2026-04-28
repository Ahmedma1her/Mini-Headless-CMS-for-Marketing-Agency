import React from 'react';

<<<<<<< HEAD
const ActionButton = ({ icon, label, isPrimary, onClick }) => {
  return (
    <button className={`action-button ${isPrimary ? 'primary' : 'secondary'}`} onClick={onClick}>
=======
const ActionButton = ({ icon, label, isPrimary }) => {
  return (
    <button className={`action-button ${isPrimary ? 'primary' : 'secondary'}`}>
>>>>>>> b2eefc5562284c21fe5910332291cc17fa9b11c3
      {icon && <span className="action-icon">{icon}</span>}
      <span className="action-label">{label}</span>
    </button>
  );
};

export default ActionButton;

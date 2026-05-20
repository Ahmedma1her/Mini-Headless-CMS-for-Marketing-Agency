import React from 'react';

const StatCard = ({ iconClass, label, value, trend, trendText }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <i className={iconClass}></i>
      </div>
      <div className="stat-content">
        {trend && <p className="stat-trend">{trend} {trendText}</p>}
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;

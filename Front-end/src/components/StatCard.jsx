import React from 'react';

const StatCard = ({ icon, label, value, trend, trendText }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
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

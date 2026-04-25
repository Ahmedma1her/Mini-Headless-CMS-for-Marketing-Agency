import React from 'react';
import img from '../assets/img(4).png';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">Overview</h1>
      </div>
      <div className="topbar-right">
        <img src={img} alt="User" className="user-avatar" />
      </div>
    </div>
  );
};

export default Topbar;

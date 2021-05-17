import React from "react";
import "./index.css";

const StatContainer = () => {
  return (
    <div className="bg-stat-container mb-4">
      <div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
        <div className="stat-box">
          <p className="stat-heading">Total Fasts</p>
          <h1 className="stat-value">14</h1>
        </div>
        <div className="stat-box">
          <p className="stat-heading">7 Fast avg.</p>
          <h1 className="stat-value">14</h1>
        </div>
        <div className="stat-box">
          <p className="stat-heading">Longest Fast</p>
          <h1 className="stat-value"> 18.1h</h1>
        </div>
        <div className="stat-box">
          <p className="stat-heading">Longest Streak</p>
          <h1 className="stat-value">14</h1>
        </div>
        <div className="stat-box">
          <p className="stat-heading">Current Streak</p>
          <h1 className="stat-value">14</h1>
        </div>
      </div>
    </div>
  );
};

export default StatContainer;

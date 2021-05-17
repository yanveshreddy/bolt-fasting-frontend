import React from "react";
import "./index.css";

import WeeklyFastingGraph from "../WeeklyFastingGraph";
import Timer from "../Timer";
import StatContainer from "../StatContainer";
const Dashboard = () => {
  return (
    <div className="container bg-container mt-5">
      <div className="row">
        <div className="col-12 col-md-4 mb-5">
          <Timer />
        </div>
        <div className="col-12 col-md-8 mb-5">
          <WeeklyFastingGraph />
        </div>
        <div className="col-12">
          <StatContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

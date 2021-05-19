import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";

const StatContainer = () => {
  const [statData, setStatData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // getFastingData();
  useEffect(() => {
    if (!isDataLoaded) {
      getFastingData();
    }
  }, []);
  async function getFastingData() {
    try {
      let url = "http://localhost:3001/users/2/getfastingdetails";
      let response = await axios(url);
      setStatData(response.data.data);
      setIsDataLoaded(!isDataLoaded);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-stat-container mb-4">
      {statData && (
        <div className="d-flex flex-row justify-content-between align-items-center flex-wrap">
          <div className="stat-box">
            <p className="stat-heading">Total Fasts</p>
            <h1 className="stat-value">{statData.total_fasts}</h1>
          </div>
          <div className="stat-box">
            <p className="stat-heading">7 Fast avg.</p>
            <h1 className="stat-value">14h</h1>
          </div>
          <div className="stat-box">
            <p className="stat-heading">Longest Fast</p>
            <h1 className="stat-value"> {statData.longest_fast}h</h1>
          </div>
          <div className="stat-box">
            <p className="stat-heading">Longest Streak</p>
            <h1 className="stat-value">{statData.longest_streak}</h1>
          </div>
          <div className="stat-box">
            <p className="stat-heading">Current Streak</p>
            <h1 className="stat-value">{statData.current_streak}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatContainer;

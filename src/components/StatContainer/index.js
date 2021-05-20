import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";
import UserFastingService from "../../services/userFastingService";

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
      // let url = "http://localhost:3001/users/2/getfastingdetails";
      let response = await UserFastingService.getFastingDetails();
      setStatData(response.data);
      setIsDataLoaded(!isDataLoaded);
      console.log(response.data);
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
            <p className="stat-heading"> Avg Fast </p>
            <h1 className="stat-value">
              {(Math.round(statData.avg_fast / 3600) * 10) / 10}h
            </h1>
          </div>
          <div className="stat-box">
            <p className="stat-heading">Longest Fast</p>
            <h1 className="stat-value">
              {(Math.round(statData.longest_fast / 3600) * 10) / 10}h
            </h1>
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

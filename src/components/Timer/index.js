import React from "react";
import "./index.css";
import pencilImage from "../../assets/pencil.svg";

const Timer = () => {
  return (
    <div className="bg-timer p-3 d-flex flex-column justify-content-between align-items-start">
      <div className="align-self-center">
        <select>
          <option>16:8</option>
          <option>18:6</option>
          <option>20:4</option>
        </select>
        <img src={pencilImage} />
      </div>
      <div className="align-self-center">
        <p className="timer-heading">Fasting Time</p>
        <h3 className="timer-value">13:34:25</h3>
      </div>
      <div className="align-self-center">
        <button className="btn button">End</button>
      </div>
      {/* <div className="d-flex flex-row justify-content-between"> */}
      <div className="d-flex flex-row justify-content-between">
        <div className="mr-4">
          <p className="time-heading">STARTED</p>
          <div className="d-flex flex-row align-items-start">
            <h3 className="time-value mr-1">14th Feb 9:45PM</h3>
            <img src={pencilImage} />
          </div>
        </div>
        <div>
          <p className="time-heading">FAST ENDING</p>
          <div className="d-flex flex-row align-items-start">
            <h3 className="time-value mr-1">14th Feb 9:45PM</h3>
            <img src={pencilImage} />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Timer;

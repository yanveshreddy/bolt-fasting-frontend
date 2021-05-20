import React, { useState, useEffect } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import pencilImage from "../../assets/pencil.svg";
import {
  format,
  addHours,
  addSeconds,
  getUnixTime,
  fromUnixTime,
} from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateTime } from "./timerLogic";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UserFastingService from "../../services/userFastingService";
import Cookies from "js-cookie";

const Timer = (props) => {
  const [isY, setIsY] = useState(true);

  let curDate = new Date();
  let curDateTimeStamp = getUnixTime(new Date());

  const [fastingData, setFastingData] = useState({
    goalTime: 16,
    startTime: curDateTimeStamp,
    estEndTime: addHours(curDate, 16),
    is_end_clicked: false,
  });

  const [time, setTime] = useState({
    second: "00",
    minute: "00",
    hour: "00",
    counter: 0,
    goalPercentage: 0,
  });
  const [isActive, setIsActive] = useState(false);

  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const hourCounter = Math.floor(time.counter / (60 * 60));
        const minuteCounter = Math.floor(time.counter / 60) - hourCounter * 60;

        const secondCounter = time.counter % 60;

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        const computedHour =
          String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

        let goalPercentage =
          (time.counter / (fastingData.goalTime * 3600)) * 100;
        // console.log(computedSecond);
        setTime((prevState) => ({
          second: computedSecond,
          minute: computedMinute,
          hour: computedHour,
          counter: prevState.counter + 1,
          goalPercentage: goalPercentage,
        }));
      }, 1000);
    }
    if (fastingData.is_end_clicked) {
      sendUserFastingHistoryData();
    }
    return () => clearInterval(intervalId);
  }, [isActive, time, fastingData]);

  const [prevStartTimeValue, setPrevTimerValue] = React.useState(
    localStorage.getItem("prevStartTime") || 0
  );

  // useEffect(() => {
  //   localStorage.setItem("prevStartTime", prevStartTimeValue);
  // }, [prevStartTimeValue]);

  function handleGoalChange(e) {
    let updatedGoalTime = e.target.value;

    setFastingData((fastingData) => ({
      ...fastingData,
      goalTime: updatedGoalTime,
      estEndTime: addHours(
        fromUnixTime(fastingData.startTime),
        updatedGoalTime
      ),
    }));
  }

  function startTimer() {
    setIsActive(true);
    let startTime = new Date();

    let startTimeValue = getUnixTime(startTime);
    let estEndTimeValue = addHours(startTime, fastingData.goalTime);
    console.log(startTimeValue);
    console.log(estEndTimeValue);

    setFastingData((fastingData) => ({
      ...fastingData,
      startTime: startTimeValue,
      estEndTime: estEndTimeValue,
      is_end_clicked: false,
    }));
  }

  function onStartTimeEdit(datetime1) {
    // console.log(datetime1);
    let startTimeValue = getUnixTime(datetime1);
    let estEndTimeValue = addHours(datetime1, fastingData.goalTime);
    let counter =
      getUnixTime(new Date()) - startTimeValue < 0
        ? 0
        : getUnixTime(new Date()) - startTimeValue;
    updateTimer(counter);
    setIsActive(true);
    setFastingData((fastingData) => ({
      ...fastingData,
      startTime: startTimeValue,
      estEndTime: estEndTimeValue,
      is_end_clicked: false,
    }));
  }

  function onEndTimeEdit(datetimeobj) {
    let endTimeValue = getUnixTime(datetimeobj);
    let fastingTimeValue = endTimeValue - fastingData.startTime;
    updateTimer(fastingTimeValue);
    console.log(fastingTimeValue);
    setIsActive(false);
    setFastingData((fastingData) => ({
      ...fastingData,
      endTime: endTimeValue,
      fastingTime: fastingTimeValue,
      is_end_clicked: true,
    }));
  }

  function updateTimer(counter) {
    let { computedHour, computedMinute, computedSecond } =
      calculateTime(counter);

    setTime((prevState) => ({
      second: computedSecond,
      minute: computedMinute,
      hour: computedHour,
      counter: counter,
    }));
    console.log(time.counter);
  }
  function handleEndTimeEditClick() {
    if (isActive) {
      setEndPicker(!endPicker);
    }
  }

  function stopTimer() {
    setIsActive(false);

    let endTimeValue = getUnixTime(new Date());
    let fastingTimeValue = endTimeValue - fastingData.startTime;

    setFastingData((fastingData) => ({
      ...fastingData,
      endTime: endTimeValue,
      fastingTime: fastingTimeValue,
      is_end_clicked: true,
    }));
  }

  async function sendUserFastingHistoryData() {
    try {
      let values = {
        ...fastingData,
        userId: 2,
        // prevStartTime: prevStartTimeValue,
        // prevStartTime:
        //   fastingData.startTime - prevStartTimeValue > 240   ? 0
        //     : prevStartTimeValue,
      };

      let response = await UserFastingService.postUserFastingHistory(values);

      setPrevTimerValue(response.data.startTime);

      sendUserFastingDetailsData();
    } catch (error) {}
  }

  async function sendUserFastingDetailsData() {
    try {
      let values = {
        ...fastingData,
        userId: 2,
      };

      let response = await UserFastingService.postUserFastingDetails(values);

      console.log(response.data);

      setTimeout(() => {
        reset();
      }, 2000);
    } catch (error) {}
  }

  function reset() {
    setTime({
      second: "00",
      minute: "00",
      hour: "00",
      counter: 0,
      goalPercentage: 0,
    });
    setIsY(!isY);
    props.callBack(isY);

    setFastingData({
      goalTime: 16,
      startTime: curDateTimeStamp,
      estEndTime: addHours(curDate, 16),
      is_end_clicked: false,
    });
  }

  return (
    <div className="bg-timer p-3 d-flex flex-column justify-content-between">
      <div className="align-self-center mb-4">
        <select className="custom-dropdown" onChange={handleGoalChange}>
          <option defaultValue="16" value="16">
            16:8
          </option>
          <option value="18">18:6</option>
          <option value="20">20:4</option>
        </select>
        {/* <img src={pencilImage} /> */}
      </div>
      <div className="align-self-center">
        {/* <p className="timer-heading">Fasting Time</p> */}
        {/* <div className="timer-value">
          <span className="hours">{time.hour}</span>
          <span>:</span>
          <span className="minute">{time.minute}</span>
          <span>:</span>
          <span className="second">{time.second}</span>
        </div> */}
        {/* <h3 className="timer-value">13:34:25</h3> */}
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar
            value={time.goalPercentage}
            text={`${time.hour}:${time.minute}:${time.second}`}
            circleRatio={0.8}
            styles={buildStyles({
              rotation: 0.5 + (1 - 80 / 100) / 2,
              textColor: "#ffffff",
              pathColor: "#f2b3a1",
              trailColor: "#232370",
              textSize: "14px",
            })}
          />
        </div>
      </div>
      <div className="align-self-center relative">
        {isActive ? (
          <button onClick={stopTimer} className="button">
            End
          </button>
        ) : (
          <button onClick={startTimer} className="button">
            Start
          </button>
        )}
      </div>
      {/* <div className="d-flex flex-row justify-content-between"> */}
      <div className=" time-container  mt-4">
        {/* <div className="d-flex flex-row justify-content-around"> */}
        <div className="mr-4">
          <p className="time-heading">STARTED</p>
          <div
            className="d-flex flex-row align-items-start"
            onClick={() => setStartPicker(!startPicker)}
          >
            <h3 className="time-value mr-1">
              {format(fromUnixTime(fastingData.startTime), "do MMM, hh:mm a")}
            </h3>
            <div className="">
              {startPicker ? (
                <DatePicker
                  open={startPicker}
                  onClickOutside={() => setStartPicker(!startPicker)}
                  onChange={onStartTimeEdit}
                  dateFormat={false}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                />
              ) : (
                <></>
              )}
            </div>
            <img
              onBlur={() => setStartPicker(!startPicker)}
              src={pencilImage}
            />
          </div>
        </div>
        <div>
          <p className="time-heading">FAST ENDING</p>
          <div
            className="d-flex flex-row align-items-start"
            onClick={() => setEndPicker(!endPicker)}
          >
            <h3 className="time-value mr-1">
              {format(fastingData.estEndTime, "do MMM, hh:mm a")}
            </h3>

            <div className="">
              {endPicker ? (
                <DatePicker
                  open={endPicker}
                  onClickOutside={() => setEndPicker(!endPicker)}
                  onChange={onEndTimeEdit}
                  dateFormat={false}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                />
              ) : (
                <></>
              )}
            </div>
            <img onBlur={() => setEndPicker(!endPicker)} src={pencilImage} />
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* </div> */}
    </div>
  );
};

export default withRouter(Timer);

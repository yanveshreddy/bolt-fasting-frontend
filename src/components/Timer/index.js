import React, { useState, useEffect } from "react";
import "./index.css";
import pencilImage from "../../assets/pencil.svg";
import { compareAsc, format } from "date-fns";
import isToday from "date-fns/isToday";
import addHours from "date-fns/addHours";
import addSeconds from "date-fns/addSeconds";
import getUnixTime from "date-fns/getUnixTime";
import fromUnixTime from "date-fns/fromUnixTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateTime } from "./timerLogic";

const Timer = () => {
  // const [isTimerEnd, setIsTimerEnd] = useState(false);

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
        // console.log(computedSecond);
        setTime((prevState) => ({
          second: computedSecond,
          minute: computedMinute,
          hour: computedHour,
          counter: prevState.counter + 1,
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

  useEffect(() => {
    localStorage.setItem("prevStartTime", prevStartTimeValue);
    console.log("kk");
  }, [prevStartTimeValue]);

  function handleGoalChange(e) {
    let updatedGoalTime = e.target.value;

    setFastingData((fastingData) => ({
      ...fastingData,
      goalTime: updatedGoalTime,
      estEndTime: addSeconds(
        fastingData.startTime,
        fastingData.goalTime * 3600
      ),
    }));
  }

  function startTimer() {
    setIsActive(true);
    let startTimeValue = getUnixTime(new Date());
    let estEndTimeValue = getUnixTime(
      addSeconds(startTimeValue, fastingData.goalTime * 3600)
    );
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
    console.log(datetime1);
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
        prevStartTime:
          fastingData.startTime - prevStartTimeValue > 240
            ? 0
            : prevStartTimeValue,
      };
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      };
      console.log(options.body);
      let url = "http://localhost:3001/users/fastinghistory";
      let response = await fetch(url, options);
      let resData = await response.json();
      setPrevTimerValue(resData.data.startTime);

      sendUserFastingDetailsData();
    } catch (error) {}
  }

  async function sendUserFastingDetailsData() {
    try {
      let values = {
        ...fastingData,
        userId: 2,
      };
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      };
      console.log(options.body);
      let url = " http://localhost:3001/users/fastingdetails";
      let response = await fetch(url, options);
      let resData = await response.json();
      console.log(resData);
    } catch (error) {}
  }
  return (
    <div className="bg-timer p-3 d-flex flex-column justify-content-between align-items-start">
      <div className="align-self-center">
        <select onChange={handleGoalChange}>
          <option defaultValue="16" value="16">
            16:8
          </option>
          <option value="18">18:6</option>
          <option value="20">20:4</option>
        </select>
        <img src={pencilImage} />
      </div>
      <div className="align-self-center">
        <p className="timer-heading">Fasting Time</p>
        <div className="timer-value">
          <span className="hours">{time.hour}</span>
          <span>:</span>
          <span className="minute">{time.minute}</span>
          <span>:</span>
          <span className="second">{time.second}</span>
        </div>
        {/* <h3 className="timer-value">13:34:25</h3> */}
      </div>
      <div className="align-self-center">
        {isActive ? (
          <button onClick={stopTimer} className="btn button">
            End
          </button>
        ) : (
          <button onClick={startTimer} className="btn button">
            Start
          </button>
        )}
      </div>
      {/* <div className="d-flex flex-row justify-content-between"> */}
      <div className="d-flex flex-row justify-content-between">
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
            onClick={handleEndTimeEditClick}
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
      </div>
      {/* </div> */}
    </div>
  );
};

export default Timer;

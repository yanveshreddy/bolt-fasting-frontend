import React, { useState, useEffect } from "react";
import "./index.css";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";
import UserFastingService from "../../services/userFastingService";
// const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const WeeklyFastingGraph = () => {
  const [barApiData, setBarApiData] = useState({
    labelList: [],
    valuesList: [],
    colorsList: [],
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // getFastingData();
  useEffect(() => {
    getweeklyData();
  }, [barApiData]);
  async function getweeklyData() {
    try {
      if (!isDataLoaded) {
        // let url = "http://localhost:3001/users/2/getweeklyfastingData";

        // let response = await axios(url);
        let response = await UserFastingService.getWeeklyFastingData();
        let dataList = response.data;
        let label_list = [];
        let values_list = [];
        let colors_list = [];
        dataList.forEach((element) => {
          let datetimestamp = element.started_at;
          let dateLabel = format(fromUnixTime(datetimestamp), "MMM do");
          label_list.push(dateLabel);
          values_list.push(Math.round(element.fasting_time / 3600));
          if (element.fasting_time >= 960) {
            colors_list.push("#5DD362");
          } else if (
            (element.fasting_time >= 300) &
            (element.fasting_time < 960)
          ) {
            colors_list.push("#A3A3A3");
          } else {
            colors_list.push("#EDB98A");
          }
        });

        setBarApiData(() => ({
          labelList: label_list,
          valuesList: values_list,
          colorsList: colors_list,
        }));
        setIsDataLoaded(!isDataLoaded);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const barData = {
    labels: barApiData.labelList,
    datasets: [
      {
        label: "Recent Fasts",
        barPercentage: 0.8,
        barThickness: 10,
        // maxBarThickness: 6,
        // minBarLength: 2,
        data: barApiData.valuesList,
        backgroundColor: barApiData.colorsList,
        borderWidth: 0,
        borderRadius: 10,
        pointStyle: "circle",
        drawtick: false,
      },
    ],
  };
  // set options
  const barOptions = {
    options: {
      scales: {
        xAxes: [
          {
            barPercentage: 0.4,
          },
          {
            linewidth: 0,
          },
        ],
        y: {
          max: 24,
          min: 0,
          ticks: {
            stepSize: 2,
          },

          linewidth: 0.1,
        },
      },
      title: {
        display: true,
        text: "Data Orgranized In Bars",
        fontSize: 25,
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="bg-weekly-graph d-flex flex-column justify-content-center">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h5 className="head-text">
          Average:
          {Math.floor(barApiData.valuesList.reduce((a, b) => a + b, 0) / 7)} sec
        </h5>
      </div>
      <Bar data={barData} options={barOptions.options} />
    </div>
  );
};

export default WeeklyFastingGraph;

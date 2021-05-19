import React, { useState, useEffect } from "react";
import "./index.css";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { format, fromUnixTime } from "date-fns";

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
    getweeklyFastingData();
  }, [barApiData]);
  async function getweeklyFastingData() {
    try {
      if (!isDataLoaded) {
        let url = "http://localhost:3001/users/2/getweeklyfastingData";
        let response = await axios(url);
        let dataList = response.data.data;
        let label_list = [];
        let values_list = [];
        let colors_list = [];
        dataList.forEach((element) => {
          let datetimestamp = element.started_at;
          let dateLabel = format(fromUnixTime(datetimestamp), "MMM do");
          label_list.push(dateLabel);
          values_list.push(element.fasting_time);
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
        barPercentage: 0.6,
        barThickness: 8,
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
          max: 2000,
          min: 0,
          ticks: {
            stepSize: 200,
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
    <div className="bg-weekly-graph">
      <div className="d-flex flex-row justify-content-between">
        <h5 className="text-black">
          Average:
          {Math.floor(barApiData.valuesList.reduce((a, b) => a + b, 0) / 7)}sec
        </h5>
      </div>
      <Bar data={barData} options={barOptions.options} />
    </div>
  );
};

export default WeeklyFastingGraph;

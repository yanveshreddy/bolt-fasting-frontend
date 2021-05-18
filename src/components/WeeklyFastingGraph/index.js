// import React from "react";
// import "./index.css";

// const WeeklyFastingGraph = () => {
//   return <div className="bg-weekly-graph "></div>;
// };

// export default WeeklyFastingGraph;

import React, { useState } from "react";
// import * as chart from "chart.js";
import { Bar } from "react-chartjs-2";
// const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const WeeklyFastingGraph = () => {
  // const [barData, setBarData] = useState({});

  //   // set options
  //   const [barOptions, setBarOptions] = useState({});
  const [barData, setBarData] = useState({
    labels: ["label 1", "label 2", "label 3", "label 4", "label 5", "label 6"],
    datasets: [
      {
        label: "test label",
        // barPercentage: 0.6,
        barThickness: 8,
        // maxBarThickness: 6,
        // minBarLength: 2,
        data: [48, 35, 73, 82, 64, 35],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderWidth: 3,
      },
    ],
  });
  // set options
  const [barOptions, setBarOptions] = useState({
    options: {
      scales: {
        xAxes: [
          {
            barPercentage: 0.5,
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 20,
              stepSize: 5,
            },
          },
        ],
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
  });

  return (
    <div>
      <Bar data={barData} options={barOptions.options} />
    </div>
  );
};

export default WeeklyFastingGraph;

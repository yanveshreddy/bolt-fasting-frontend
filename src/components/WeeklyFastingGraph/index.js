import React, { useState } from "react";
import "./index.css";
import { Bar } from "react-chartjs-2";

// const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const WeeklyFastingGraph = () => {
  const [barData, setBarData] = useState({
    labels: ["label 1", "label 2", "label 3", "label 4", "label 5", "label 6"],
    datasets: [
      {
        label: "test label",
        barPercentage: 0.6,
        barThickness: 8,
        // maxBarThickness: 6,
        // minBarLength: 2,
        data: [0, 16, 20, 14, 12, 18],
        backgroundColor: [
          "#5DD362",
          "#A3A3A3",
          "#42BC53",
          "#A3A3A3",
          "#EDB98A",
        ],
        borderWidth: 0,
        borderRadius: 10,
        pointStyle: "circle",
        drawtick: false,
      },
    ],
  });
  // set options
  const [barOptions, setBarOptions] = useState({
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
            stepSize: 4,
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
  });

  return (
    <div className="bg-weekly-graph">
      <Bar data={barData} options={barOptions.options} />
    </div>
  );
};

export default WeeklyFastingGraph;

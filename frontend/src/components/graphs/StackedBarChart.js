import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);

export default function StackedBarChart({ answers }) {
  const options = {
    title: {
      text: "My chart",
    },
    chart: {
      type: "bar",
    },
    series: answers.map((el) => {
      return {
        name: el.category,
        data: [el.percentage],
      };
    }),
    yAxis: {
      min: 0,
    max: 100,

    },
    xAxis: [
      {
        categories: ["Answers"],
      },
    ],
    plotOptions: {
      column: {
        // colorByPoint: true,
        
      },
      series: {
        stacking: "normal",
      },
      colors: {
        fill: [
          "#000000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#00FFFF",
          "#FF00FF",
        ],
      },

    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

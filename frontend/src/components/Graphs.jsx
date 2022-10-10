import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import axios from "axios";
import PieOrBarChart from "./graphs/PieOrBarChart";
import StackedBarChart from "./graphs/StackedBarChart";
import ChartJsTest from "./graphs/ChartJsTest";

require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);

export default function Graphs() {
  const [answers, setAnswers] = useState([]);
  const [chartData, setChartData] = useState({
    datasets: []
  });

  useEffect(() => {
    axios
      .get("/api/answer", {
        params: { country: "Kosova", language: "Albanian", questionId: 1 },
      })
      .then((response) => {
        setAnswers(response.data);
        console.log(response.data);
        setChartData({
          labels: response.data.map((answer) => answer.category),
          datasets: [
            {
              label: "Popularity of colours",
              data: response.data.map((answer) => answer.percentage),
              backgroundColor: [
                "#ffbb11",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
              ],
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  const displayChart = () => {
    if (selectedGraphType === "packedbubble") return <PieOrBarChart answers={answers} selectedGraphType={selectedGraphType} />;
    if (selectedGraphType === "stackedbar") return <StackedBarChart answers={answers}/>;
    return (
      <PieOrBarChart answers={answers} selectedGraphType={selectedGraphType} />
    );
    // return <ChartJsTest chartData={chartData}></ChartJsTest>
  };
  const graphTypes = [
    {
      type: "pie",
      label: "Pie",
    },
    {
      type: "column",
      label: "Bar",
    },
    {
      type: "packedbubble",
      label: "Bubble",
    },

    {
      type: "stackedbar",
      label: "stacked bar",
    },
  ];
  const [selectedGraphType, setSelectedGraphType] = useState("column");

  return (
    <div>
      {graphTypes.map((graphType, index) => {
        return (
          <button
            key={index}
            onClick={() => setSelectedGraphType(graphType.type)}
          >
            {graphType.label}
          </button>
        );
      })}
      {displayChart()}
    </div>
  );
}

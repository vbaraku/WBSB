import React from "react";
import Highcharts from "highcharts";
import "highcharts/more";
import HighchartsReact from "highcharts-react-official";
import {useEffect, useState} from 'react'
import axios from "axios";
export default function Graphs() {
    const [answers, setAnswers] = useState({});
    useEffect(() => {
        axios.get("/api/answer",{params:{country:"Kosova",language:"Albanian", questionId:1}})
            .then((response) => {
                setAnswers(response.data)
                console.log(JSON.stringify(response.data))
            });
    }, []);

    const [graphTypes, setGraphTypes] = useState([
        {
            type:"pie",
            label:"Pie"
        },
        {
            type:"bar",
            label:"Bar"
        },
        {
            type:"packedbubble",
            label:"Bubble"
        },
    
        {
            type:"line",
            label:"line"
        }
    ]);
    const [selectedGraphType, setSelectedGraphType] = useState("bar");

        
  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        type:selectedGraphType,
        data: Object.values(answers),
        // innerSize:"50%"
      },
    ],
    xAxis: [
        {
        //   labels: {
        //     formatter: function () {
        //       return JSON.stringify(Object.keys(answers)[0]) || "dss"; // no to be customize
        //     }
        //   }
            categories: Object.keys(answers)
        },
        {
          linkedTo: 0,
          labels: {
            useHTML: true,
            formatter: function () {
              return answers[0]; // goal - insert component here
            }
          }
        }
      ]
  };
  return (
    <div>
        
        {
            graphTypes.map((graphType, index) => {
                return (
                    <button key={index} onClick={()=>setSelectedGraphType(graphType.type)}>{graphType.label}</button>
                )
            })
        }
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

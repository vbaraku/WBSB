import React from "react";
import Highcharts from "highcharts";
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

        
  const options = {
    title: {
      text: "My chart",
    },
    series: [
      {
        type:'pie',
        data: Object.values(answers),
        innerSize:"50%"
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
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

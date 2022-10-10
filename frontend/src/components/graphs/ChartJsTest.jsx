import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
const ChartJsTest = ({ chartData }) => {
  return (
    <div style={{height:"500px", width:"1000px"}}>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Cryptocurrency prices"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          },
          scales:{
            y: {
                stacked: true,
            },
            x:{
                stacked: true
            }
          }
        }}
        
      />
    </div>
  );
};
export default ChartJsTest;
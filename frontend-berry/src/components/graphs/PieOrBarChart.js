import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default function PieChart({ answers, selectedGraphType }) {
    const options = {
        title: {
            text: 'My chart'
        },
        chart: {
            type: selectedGraphType
        },
        series: {
            name: 'Answers',
            data: answers.map((el) => ({
                name: el.category,
                y: el.percentage
                //  color: categoryToColor(el.category),
            }))
        },
        xAxis: [
            {
                categories: answers.map((el) => el.category)
            }
        ],
        plotOptions: {
            packedbubble: {
                minSize: '30%',
                maxSize: '80%',
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 250
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            },
            column: {
                colorByPoint: true
            },
            pie: {
                innerSize: '60%'
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            colors: {
                fill: ['#000000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF']
            }
        }
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

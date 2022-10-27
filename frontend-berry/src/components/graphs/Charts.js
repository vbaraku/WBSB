import React from 'react';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default function Charts({ question, answers, selectedGraphType }) {
    let options = {};
    if (selectedGraphType === 'stackedbar') {
        options = {
            title: {
                text: question?.text
            },
            chart: {
                type: 'bar'
            },
            series: answers.map((el) => ({
                name: el.category,
                data: [el.percentage]
            })),
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                max: 100
            },
            xAxis: [
                {
                    categories: ['Answers']
                }
            ],
            plotOptions: {
                column: {
                    // colorByPoint: true,
                },
                series: {
                    stacking: 'normal'
                },
                colors: {
                    fill: ['#000000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF']
                }
            }
        };
    } else {
        options = {
            title: {
                text: question?.text
            },
            subtitle: {
                text: 'Burimi: securitybarometer.qkss.org'
            },
            chart: {
                type: selectedGraphType
            },
            credits: {
                enabled: false
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
                    categories: answers.map((el) => el.category),
                    animation: false
                }
            ],
            yAxis: [
                {
                    // categories: answers.map((el) => el.category),
                    labels: {
                        enabled: false,
                        animation: false
                    }
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
                        animation: false,
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
                    colorByPoint: true,
                    // dataLabels: {
                    //     enabled: false
                    // },
                    showInLegend: true
                },
                pie: {
                    innerSize: '60%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        animation: false
                    },
                    showInLegend: true
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
    }
    options.chart = {
        ...options.chart,
        animation: {
            duration: 200
        }
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

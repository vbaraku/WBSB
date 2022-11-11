import React, { useEffect, useState } from 'react';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useLanguage, useLanguageUpdate } from '../../LanguageContext';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default function Charts({ question, answers, selectedGraphType }) {
    const { language, dictionary } = useLanguage();

    Highcharts.setOptions({
        colors: [
            'rgb(28, 91, 171)',
            'rgb(221, 59, 54)',
            'rgb(245, 212, 45)',
            'rgb(112, 135, 127)',
            'rgb(6, 167, 125)',
            '#05B2DC',
            '#CB48B7',
            '#18f2b2',
            '#ED7D3A',
            '#FFA3AF'
        ]
    });

    function getChartOptions() {
        let options = {
            credits: {
                enabled: false
            },
            title: {
                text: question?.text
            },
            subtitle: {
                text: dictionary.SOURCE
            }
        };

        options = {
            ...options,
            chart: {
                type: selectedGraphType
            },
            series: {
                name: 'Answers',
                data: answers.map((el) => ({
                    name: el.category,
                    y: el.percentage
                }))
            },
            xAxis: [
                {
                    categories: answers.map((el) => el.category),
                    animation: false
                }
            ],
            yAxis: {
                min: null,
                max: null
            },
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
                        enabled: true
                    }
                },
                column: {
                    colorByPoint: true,
                    // dataLabels: {
                    //     enabled: false
                    // },
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%',
                        style: {
                            color: 'black',
                            fontSize: '12px',
                            fontWeight: 'normal'
                        },
                        inside: false
                    }
                },
                pie: {
                    innerSize: '60%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    size: '100%',
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%',
                        style: {
                            color: 'black',
                            fontSize: '12px',
                            fontWeight: 'normal'
                        }
                    }
                }
            }
        };
        if (selectedGraphType === 'stackedbar') {
            options = {
                chart: {
                    type: 'bar'
                },
                series: answers.map((el) => ({
                    name: el.category,
                    data: [el.percentage]
                })),
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
                    series: {
                        stacking: 'normal'
                    },
                    stackedbar: {
                        dataLabels: {
                            enabled: false,
                            format: '{point.y}%',
                            style: {
                                color: 'red',
                                fontSize: '12px',
                                fontWeight: 'normal'
                            }
                        }
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
        return options;
    }
    const [chartOptions, setChartOptions] = useState(getChartOptions());

    useEffect(() => {
        setChartOptions(null);
        setChartOptions(getChartOptions());
    }, [selectedGraphType]);

    return (
        <div style={{ width: '90%' }}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps={{}} />;
        </div>
    );
}

/* eslint-disable prefer-template */
import React, { useEffect, useState } from 'react';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useLanguage, useLanguageUpdate } from '../../LanguageContext';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default function SingleQuestionChart() {
    const { language, dictionary } = useLanguage();
    const [question, setQuestion] = useState({ text: '' });
    const [answers, setAnswers] = useState([]);
    const selectedGraphType = 'column';
    console.log(answers);

    useEffect(() => {
        axios
            .get('/api/questions/' + Math.floor(Math.random() * 220), {
                params: {
                    language,
                    country: 'Kosovo'
                }
            })
            .then((res) => {
                setQuestion(res.data);

                axios
                    .get(`/api/answer`, {
                        params: {
                            language,
                            country: 'Kosovo',
                            questionId: res.data.id
                        }
                    })
                    .then((res) => {
                        setAnswers(res.data.breakdown);
                    });
            });
    }, [language]);

    function getChartOptions() {
        let options = {
            credits: {
                enabled: false
            },
            title: {
                text: question?.text
            }
        };

        options = {
            ...options,
            chart: {
                type: selectedGraphType
            },
            series: {
                // name: 'Answers',
                data: answers.map((el) => ({
                    name: el.category,
                    y: el.percentage
                }))
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            yAxis: {
                title: false
            },
            xAxis: [
                {
                    categories: answers.map((el) => el.category),
                    animation: false,
                    labels: {
                        rotation: 0,
                        whiteSpace: 'wrap'
                    }
                }
            ],
            legend: { enabled: false },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '80%',
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02
                    }
                    // dataLabels: {
                    //     animation: false,
                    //     enabled: true
                    // }
                },
                column: {
                    colorByPoint: true,
                    // dataLabels: {
                    //     enabled: false
                    // },
                    dataLabels: {
                        enabled: false,
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
                    size: '100%',
                    dataLabels: {
                        enabled: false,
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
        return options;
    }
    const [chartOptions, setChartOptions] = useState(getChartOptions());

    useEffect(() => {
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
            // responsive: {
            //     rules: [
            //         {
            //             condition: {
            //                 maxHeight: '300px'
            //             }
            //         }
            //     ]
            // }
        });
        setChartOptions(null);
        setChartOptions(getChartOptions());
    }, [question, answers]);

    if (!(question.id && answers.length)) {
        return (
            <div style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center', height: '350px' }}>
                <InfinitySpin color="white" />
            </div>
        );
    }
    return (
        <div
            style={{
                width: 'auto',
                height: '350px',
                marginTop: '30px',
                marginBottom: '30px',
                borderRadius: '8px',
                padding: '10px',
                background: 'white',
                boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 0%)'
            }}
        >
            <HighchartsReact highcharts={Highcharts} options={chartOptions} containerProps={{ style: { height: '100%' } }} />
        </div>
    );
}

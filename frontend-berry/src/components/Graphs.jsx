import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import Charts from './graphs/Charts';
import Button from '@mui/material/Button';
import { InfinitySpin } from 'react-loader-spinner';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useLanguage, useLanguageUpdate } from '../LanguageContext';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default function Graphs({ question, answers, displaySecond, loading }) {
    const { language, dictionary } = useLanguage();
    const [selectedGraphType, setSelectedGraphType] = useState('column');
    // const [graph, setGraph] = useState(null);

    // useEffect(() => {
    //     if (selectedGraphType === 'packedbubble') {
    //         setGraph(<PieOrBarChart question={question} answers={answers} selectedGraphType={selectedGraphType} />);
    //     } else if (selectedGraphType === 'stackedbar') {
    //         setGraph(<StackedBarChart question={question} answers={answers} />);
    //     } else {
    //         setGraph(<PieOrBarChart question={question} answers={answers} selectedGraphType={selectedGraphType} />);
    //     }
    // }, [selectedGraphType]);

    // const displayChart = () => {
    //     console.log('displayChart');
    //     if (selectedGraphType === 'packedbubble') {
    //     }
    //     return <Charts question={question} answers={answers} selectedGraphType={selectedGraphType} />;
    // };
    const graphTypes = [
        {
            type: 'pie',
            label: 'Pie'
        },
        {
            type: 'column',
            label: 'Bar'
        },
        // {
        //     type: 'packedbubble',
        //     label: 'Bubble'
        // },

        {
            type: 'stackedbar',
            label: 'stacked bar'
        }
    ];

    useEffect(() => {
        console.log('question', question);
    }, [question]);

    if (answers?.length < 1 || loading) {
        return (
            <div style={{ height: '200px', display: 'flex', 'align-items': 'center' }}>
                <InfinitySpin color="blue" />
            </div>
        );
    }
    if (answers == null) {
        return (
            <div style={{ height: '200px', display: 'flex', 'align-items': 'center' }}>
                {dictionary.NO_ANSWERS} <SearchOffIcon style={{ marginLeft: 10 }} fontSize="large" />
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                alignSelf: 'stretch',
                marginTop: '50px'
            }}
        >
            <div style={{ display: 'flex', height: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                {graphTypes.map((graphType, index) => (
                    <Button
                        sx={{ marginLeft: 1, padding: '5px', paddingLeft: '12px', paddingRight: '12px', margin: '5px' }}
                        variant="outlined"
                        type="submit"
                        backgroundColor="#ADD8E6"
                        key={index}
                        onClick={() => setSelectedGraphType(graphType.type)}
                    >
                        {graphType.label}
                    </Button>
                ))}
            </div>
            <Charts question={question} answers={answers} selectedGraphType={selectedGraphType} displaySecond={displaySecond} />
            {/* {displayChart()} */}
        </div>
    );
}

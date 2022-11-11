import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import axios from 'axios';
import Charts from './graphs/Charts';
import StackedBarChart from './graphs/StackedBarChart';
import QuestionNav from './QuestionNav';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { InfinitySpin } from 'react-loader-spinner';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default function Graphs({ question, answers }) {
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

    const displayChart = () => {
        if (selectedGraphType === 'packedbubble') {
            return <Charts question={question} answers={answers} selectedGraphType={selectedGraphType} />;
        }
        return <Charts question={question} answers={answers} selectedGraphType={selectedGraphType} />;
    };
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

    if (answers.length < 1) {
        return <InfinitySpin color="blue" />;
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
            {displayChart()}
        </div>
    );
}

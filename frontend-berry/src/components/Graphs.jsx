import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import axios from 'axios';
import PieOrBarChart from './graphs/PieOrBarChart';
import StackedBarChart from './graphs/StackedBarChart';
import QuestionNav from './QuestionNav';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default function Graphs({ answers }) {
    const [selectedGraphType, setSelectedGraphType] = useState('column');

    const displayChart = () => {
        if (selectedGraphType === 'packedbubble') return <PieOrBarChart answers={answers} selectedGraphType={selectedGraphType} />;
        if (selectedGraphType === 'stackedbar') return <StackedBarChart answers={answers} />;
        return <PieOrBarChart answers={answers} selectedGraphType={selectedGraphType} />;
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
        {
            type: 'packedbubble',
            label: 'Bubble'
        },

        {
            type: 'stackedbar',
            label: 'stacked bar'
        }
    ];

    return (
        <div>
            <div>
                {graphTypes.map((graphType, index) => (
                    <button type="button" key={index} onClick={() => setSelectedGraphType(graphType.type)}>
                        {graphType.label}
                    </button>
                ))}
                {displayChart()}
            </div>
        </div>
    );
}

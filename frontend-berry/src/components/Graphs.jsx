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

import { albanianDict, englishtDict, serbianDict } from '../utils/dictionaries';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default function Graphs() {
    const [answers, setAnswers] = useState([]);
    const [chartData, setChartData] = useState({
        datasets: []
    });

    const [selectedGraphType, setSelectedGraphType] = useState('column');

    // TODO: add a context for the language || in other words, make the bottom thing dynamic (not always albanian)
    const dict = albanianDict;

    const years = [dict.ALL, 2021] || [];
    const regions = dict.ALBANIA_REGIONS || [];
    const regionTypes = dict.REGION_TYPES || [];
    const nationalities = dict.ALBANIA_NATIONALITIES || [];
    const genders = dict.GENDERS || [];
    const ages = [dict.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+'] || [];

    const [filters, setFilters] = useState({
        year: 2021,
        region: dict.ALL,
        regionType: dict.ALL,
        nationality: dict.ALL,
        gender: dict.ALL,
        age: dict.ALL
    });
    // const [year, setYear] = useState(2021);
    // const [region, setRegion] = useState(dict.ALL);
    // const [regionType, setRegionType] = useState(dict.ALL);
    // const [nationality, setNationality] = useState(dict.ALL);
    // const [gender, setGender] = useState(dict.ALL);
    // const [age, setAge] = useState(dict.ALL);

    useEffect(() => {
        const params = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== dict.ALL) {
                acc[key] = value;
            }
            return acc;
        }, {});
        params.questionId = 1;
        params.country = 'Kosova';
        params.language = 'Albanian';

        axios
            .get('/api/answer', {
                params
                // params: { country: "Kosova", language: "Albanian", questionId: 1 },
            })
            .then((response) => {
                setAnswers(response.data);
                console.log(response.data);
                setChartData({
                    labels: response.data.map((answer) => answer.category),
                    datasets: [
                        {
                            label: 'Popularity of colours',
                            data: response.data.map((answer) => answer.percentage),
                            borderWidth: 1
                        }
                    ]
                });
            });
    }, [filters]);

    const displayChart = () => {
        if (selectedGraphType === 'packedbubble') return <PieOrBarChart answers={answers} selectedGraphType={selectedGraphType} />;
        if (selectedGraphType === 'stackedbar') return <StackedBarChart answers={answers} />;
        return <PieOrBarChart answers={answers} selectedGraphType={selectedGraphType} />;
        // return <ChartJsTest chartData={chartData}></ChartJsTest>
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

    const handleChange = (filter, value) => {
        // switch (filter) {
        //   case "year":
        //     setYear(value);
        //     break;
        //   case "region":
        //     setRegion(value);
        //     break;
        //   case "regionType":
        //     setRegionType(value);
        //     break;
        //   case "nationality":
        //     setNationality(value);
        //     break;
        //   case "age":
        //     setAge(value);
        //     break;
        //   case "gender":
        //     setGender(value);
        //     break;
        //   default:
        //     break;
        // }
        setFilters({ ...filters, [filter]: value });
    };
    return (
        <div>
            <SelectForm
                value={filters.year}
                values={years}
                label={dict.YEAR_LABEL}
                handleChange={(e) => {
                    handleChange('year', e.target.value);
                }}
            />
            <SelectForm
                value={filters.region}
                values={regions}
                label={dict.REGION_LABEL}
                handleChange={(e) => {
                    handleChange('region', e.target.value);
                }}
            />
            <SelectForm
                value={filters.regionType}
                values={regionTypes}
                label={dict.REGION_TYPE_LABEL}
                handleChange={(e) => {
                    handleChange('regionType', e.target.value);
                }}
            />
            <SelectForm
                value={filters.nationality}
                values={nationalities}
                label={dict.NATIONALITY_LABEL}
                handleChange={(e) => {
                    handleChange('nationality', e.target.value);
                }}
            />
            <SelectForm
                value={filters.gender}
                values={genders}
                label={dict.GENDER_LABEL}
                handleChange={(e) => {
                    handleChange('gender', e.target.value);
                }}
            />
            <SelectForm
                value={filters.age}
                values={ages}
                label={dict.AGE_LABEL}
                handleChange={(e) => {
                    handleChange('age', e.target.value);
                }}
            />

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

const SelectForm = ({ value, values, label, handleChange }) => (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`demo-simple-select-helper-label-${label}`}>{label}</InputLabel>
        <Select
            labelId={`demo-simple-select-helper-label-${label}`}
            id={`demo-simple-select-helper-${label}`}
            value={value}
            label={label}
            onChange={handleChange}
        >
            {values.map((el) => (
                <MenuItem value={el} key={el}>
                    {el}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

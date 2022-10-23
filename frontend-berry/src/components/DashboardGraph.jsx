import React, { useState, useEffect } from 'react';
import Graphs from './Graphs';
import MiniDrawer from './MiniDrawer';
import { albanianDict, englishtDict, serbianDict } from '../utils/dictionaries';
import axios from 'axios';
import FilterBar from './FilterBar';
import { Button } from '@mui/material';

export default function DashboardGraph({ selectedQuestion, country, selectedLanguage }) {
    const [answers, setAnswers] = useState([]);
    // TODO: add a context for the language || in other words, make the bottom thing dynamic (not always albanian)
    const [dict, setDictionary] = useState(albanianDict);

    function updateLanguage() {
        if (selectedLanguage === 'ALB') {
            setDictionary(albanianDict);
        } else if (selectedLanguage === 'ENG') {
            setDictionary(englishtDict);
        } else if (selectedLanguage === 'SRB') {
            setDictionary(serbianDict);
        }
    }

    const [filters, setFilters] = useState({
        year: 2021,
        region: dict.ALL,
        regionType: dict.ALL,
        nationality: dict.ALL,
        gender: dict.ALL,
        age: dict.ALL
    });

    const [filterOptions, setFilterOptions] = useState({
        years: [],
        regions: [],
        regionTypes: [],
        nationalities: [],
        genders: [],
        ages: [dict.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+'] || []
    });

    useEffect(() => {
        if (!selectedQuestion?.id) return;
        axios
            .get('/api/answer/filters', {
                params: {
                    country,
                    language: selectedLanguage,
                    questionId: selectedQuestion.id
                }
            })
            .then((response) => {
                updateLanguage();
                setFilterOptions({
                    ...filterOptions,
                    years: response.data.years.concat(dict.ALL),
                    regions: response.data.regions.concat(dict.ALL),
                    regionTypes: response.data.regionTypes.concat(dict.ALL),
                    nationalities: response.data.nationalities.concat(dict.ALL),
                    genders: response.data.genders.concat(dict.ALL)
                });
                // setAnswers(response.data);
            });
    }, [selectedQuestion, country, selectedLanguage]);

    useEffect(() => {
        if (!selectedQuestion?.id) return;

        const params = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== dict.ALL) {
                acc[key] = value;
            }
            return acc;
        }, {});
        params.questionId = selectedQuestion.id || 1;
        params.country = country;
        params.language = selectedLanguage;

        axios.get('/api/answer', { params }).then((response) => {
            setAnswers(response.data);
        });
    }, [filters, selectedQuestion, country]);

    return (
        <div style={{ display: 'flex', marginTop: '100px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '85%' }}>
                <div>
                    <FilterBar dict={dict} filters={filters} setFilters={setFilters} filterOptions={filterOptions} />

                    <Graphs question={selectedQuestion} answers={answers} />
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import Graphs from './Graphs';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';
import FilterBar from './FilterBar';
import { Button, Box, Divider } from '@mui/material';
import { useLanguage } from '../LanguageContext';

export default function DashboardGraph({ selectedQuestion, country, selectedLanguage, displaySecond }) {
    const [answers, setAnswers] = useState([]);
    const { dictionary } = useLanguage();

    const [loading, setLoading] = useState(true);
    const [filtersLoaded, setFiltersLoaded] = useState(false);
    const [requestTime, setRequestTime] = useState(0);

    const [filters, setFilters] = useState({
        year: 2022,
        region: dictionary.ALL,
        regionType: dictionary.ALL,
        nationality: dictionary.ALL,
        gender: dictionary.ALL,
        age: dictionary.ALL
    });

    function getFilters() {
        if (!dictionary) return {};
        if (country === 'Kosovo') {
            return {
                years: dictionary.YEARS,
                regions: dictionary.KOSOVO_REGIONS,
                regionTypes: dictionary.REGION_TYPES_KS,
                nationalities: dictionary.KOSOVO_NATIONALITIES,
                genders: dictionary.GENDERS,
                ages: [dictionary.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
            };
        }
        if (country === 'Albania') {
            return {
                years: dictionary.YEARS,
                regions: dictionary.ALBANIA_REGIONS,
                regionTypes: dictionary.REGION_TYPES,
                nationalities: dictionary.ALBANIA_NATIONALITIES,
                genders: dictionary.GENDERS,
                ages: [dictionary.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
            };
        }
        const filters = {
            years: dictionary.YEARS,
            regions: dictionary.SERBIA_REGIONS,
            regionTypes: dictionary.REGION_TYPES,
            nationalities: dictionary.SERBIA_NATIONALITIES,
            genders: dictionary.GENDERS,
            ages: [dictionary.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
        };
        return filters;
    }

    const [filterOptions, setFilterOptions] = useState(getFilters());

    useEffect(() => {
        setFilterOptions(getFilters());
    }, [dictionary, country]);

    useEffect(() => {
        if (!selectedQuestion?.id) return;
        // const dictionary = updateLanguage();
        setFilters({
            year: 2022,
            region: dictionary.ALL,
            regionType: dictionary.ALL,
            nationality: dictionary.ALL,
            gender: dictionary.ALL,
            age: dictionary.ALL
        });
        if (!filtersLoaded) setFiltersLoaded(true);
        // setAnswers(response.data);
    }, [selectedQuestion, country, selectedLanguage]);

    useEffect(() => {
        if (!selectedQuestion?.id) return;
        if (!filtersLoaded) return;
        const params = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== dictionary.ALL) {
                acc[key] = value;
            }
            return acc;
        }, {});
        params.questionId = selectedQuestion.id || 1;
        params.country = country;
        params.language = selectedLanguage;
        setLoading(true);
        setRequestTime(Date.now());

        axios.get('/api/answer', { params }).then((response) => {
            if (response.data.length === 0) {
                setAnswers(null);
            } else {
                setAnswers(response.data);
            }
            setLoading(false);
        });
    }, [filters, country, filtersLoaded]);

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '4px',
                boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
                flexGrow: 1
            }}
        >
            <Box sx={{ backgroundColor: '#fff', marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 1 }}>
                <FilterBar dictionary={dictionary} filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
            </Box>
            <Divider style={{ width: '95%' }} />
            <Graphs question={selectedQuestion} answers={answers} displaySecond={displaySecond} loading={loading} />
        </Box>
    );
}

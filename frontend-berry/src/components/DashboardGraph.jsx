import React, { useState, useEffect } from 'react';
import Graphs from './Graphs';
import MiniDrawer from './MiniDrawer';
import { albanianDict, englishDict, serbianDict } from '../utils/dictionaries';
import axios from 'axios';
import FilterBar from './FilterBar';
import { Button, Box, Divider } from '@mui/material';

export default function DashboardGraph({ selectedQuestion, country, selectedLanguage, displaySecond }) {
    const [answers, setAnswers] = useState([]);
    // TODO: add a context for the language || in other words, make the bottom thing dynamic (not always albanian)
    const [dict, setDictionary] = useState(albanianDict);

    const [filtersLoaded, setFiltersLoaded] = useState(false);

    function updateLanguage() {
        if (selectedLanguage === 'SRB') {
            setDictionary(serbianDict);
            return serbianDict;
        }

        if (selectedLanguage === 'ENG') {
            setDictionary(englishDict);
            return englishDict;
        }
        setDictionary(albanianDict);
        return albanianDict;
    }

    const [filters, setFilters] = useState({
        year: dict.ALL,
        region: dict.ALL,
        regionType: dict.ALL,
        nationality: dict.ALL,
        gender: dict.ALL,
        age: dict.ALL
    });

    function getFilters() {
        if (!dict) return {};
        if (country === 'Kosovo') {
            const filters = {
                years: dict.YEARS,
                regions: dict.KOSOVO_REGIONS,
                regionTypes: dict.REGION_TYPES,
                nationalities: dict.KOSOVO_NATIONALITIES,
                genders: dict.GENDERS,
                ages: [dict.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
            };
            console.log(filters);
            return {
                years: dict.YEARS,
                regions: dict.KOSOVO_REGIONS,
                regionTypes: dict.REGION_TYPES_KS,
                nationalities: dict.KOSOVO_NATIONALITIES,
                genders: dict.GENDERS,
                ages: [dict.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
            };
        }
        if (country === 'Albania') {
            return {
                years: dict.YEARS,
                regions: dict.ALBANIA_REGIONS,
                regionTypes: dict.REGION_TYPES,
                nationalities: dict.ALBANIA_NATIONALITIES,
                genders: dict.GENDERS,
                ages: [dict.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
            };
        }
        const filters = {
            years: dict.YEARS,
            regions: dict.SERBIA_REGIONS,
            regionTypes: dict.REGION_TYPES,
            nationalities: dict.SERBIA_NATIONALITIES,
            genders: dict.GENDERS,
            ages: [dict.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+']
        };
        console.log('filters', filters);
        return filters;
    }

    const [filterOptions, setFilterOptions] = useState(getFilters());

    useEffect(() => {
        setFilterOptions(getFilters());
    }, [dict, country]);

    useEffect(() => {
        if (!selectedQuestion?.id) return;
        // axios
        //     .get('/api/answer/filters', {
        //         params: {
        //             country,
        //             language: selectedLanguage,
        //             questionId: selectedQuestion.id
        //         }
        //     })
        //     .then((response) => {
        //         console.log('here');
        //         console.log(response.data);
        //     });
        const dict = updateLanguage();
        const ages = filterOptions.ages;
        ages.pop();
        ages.push(dict.ALL);
        // setFilterOptions({
        //     ...filterOptions,
        //     years: response.data.years.concat(dict.ALL),
        //     regions: response.data.regions.concat(dict.ALL),
        //     regionTypes: response.data.regionTypes.concat(dict.ALL),
        //     nationalities: response.data.nationalities.concat(dict.ALL),
        //     genders: response.data.genders.concat(dict.ALL),
        //     ages
        // });
        setFilters({
            year: dict.ALL,
            region: dict.ALL,
            regionType: dict.ALL,
            nationality: dict.ALL,
            gender: dict.ALL,
            age: dict.ALL
        });
        if (!filtersLoaded) setFiltersLoaded(true);
        // setAnswers(response.data);
    }, [selectedQuestion, country, selectedLanguage]);

    useEffect(() => {
        if (!selectedQuestion?.id) return;
        if (!filtersLoaded) return;
        const params = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== albanianDict.ALL && value !== englishDict.ALL && value !== serbianDict.ALL) {
                acc[key] = value;
            }
            return acc;
        }, {});
        params.questionId = selectedQuestion.id || 1;
        params.country = country;
        params.language = selectedLanguage;
        axios.get('/api/answer', { params }).then((response) => {
            if (response.data.length === 0) {
                setAnswers(null);
            } else {
                setAnswers(response.data);
            }
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
                <FilterBar dict={dict} filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
            </Box>
            <Divider style={{ width: '95%' }} />
            <Graphs question={selectedQuestion} answers={answers} displaySecond={displaySecond} />
        </Box>
    );
}

import React from 'react';

import QuestionNav from './QuestionNav';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import { Row, Col } from 'react-bootstrap';
import { useLanguage } from 'LanguageContext';

export default function FilterBar({ filters, setFilters, filterOptions }) {
    // const years = [dict.ALL, 2021] || [];
    // const regions = dict.ALBANIA_REGIONS || [];
    // const regionTypes = dict.REGION_TYPES || [];
    // const nationalities = dict.ALBANIA_NATIONALITIES || [];
    // const genders = dict.GENDERS || [];

    // const [filterOptions, setFilterOptions] = React.useState({
    //     year: years[0],
    //     region: regions[0],
    //     regionType: regionTypes[0]
    // });

    const languageContext = useLanguage();
    const dict = languageContext.dictionary;
    const handleChange = (filter, value) => {
        setFilters({ ...filters, [filter]: value });
    };
    return (
        <Row>
            <Col lg={4} md={4} xs={6}>
                <SelectForm
                    value={filters.year}
                    values={filterOptions.years}
                    label={dict.YEAR_LABEL}
                    handleChange={(e) => {
                        handleChange('year', e.target.value);
                    }}
                />
            </Col>
            <Col lg={4} md={4} xs={6}>
                <SelectForm
                    value={filters.region}
                    values={filterOptions.regions}
                    label={dict.REGION_LABEL}
                    handleChange={(e) => {
                        handleChange('region', e.target.value);
                    }}
                />
            </Col>

            <Col lg={4} md={4} xs={6}>
                <SelectForm
                    value={filters.regionType}
                    values={filterOptions.regionTypes}
                    label={dict.REGION_TYPE_LABEL}
                    handleChange={(e) => {
                        handleChange('regionType', e.target.value);
                    }}
                />
            </Col>

            <Col lg={4} md={4} xs={6}>
                <SelectForm
                    value={filters.nationality}
                    values={filterOptions.nationalities}
                    label={dict.NATIONALITY_LABEL}
                    handleChange={(e) => {
                        handleChange('nationality', e.target.value);
                    }}
                />
            </Col>

            <Col lg={4} md={4} xs={6}>
                <SelectForm
                    value={filters.gender}
                    values={filterOptions.genders}
                    label={dict.GENDER_LABEL}
                    handleChange={(e) => {
                        handleChange('gender', e.target.value);
                    }}
                />
            </Col>

            <Col lg={4} md={4} xs={6}>
                <SelectForm
                    value={filters.age}
                    values={filterOptions.ages}
                    label={dict.AGE_LABEL}
                    handleChange={(e) => {
                        handleChange('age', e.target.value);
                    }}
                />
            </Col>
        </Row>
    );
}

const SelectForm = ({ value, values, label, handleChange }) => (
    <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id={`demo-simple-select-helper-label-${label}`}>{label}</InputLabel>
        <Select
            labelId={`demo-simple-select-helper-label-${label}`}
            id={`demo-simple-select-helper-${label}`}
            value={value}
            label={label}
            onChange={handleChange}
            style={{ borderRadius: '9px', width: '100%' }}
        >
            {values.map((el) => (
                <MenuItem value={el} key={el}>
                    {el}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

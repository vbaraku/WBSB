import React from 'react';

import QuestionNav from './QuestionNav';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function FilterBar({ dict, filters, setFilters }) {
    const years = [dict.ALL, 2021] || [];
    const regions = dict.ALBANIA_REGIONS || [];
    const regionTypes = dict.REGION_TYPES || [];
    const nationalities = dict.ALBANIA_NATIONALITIES || [];
    const genders = dict.GENDERS || [];
    const ages = [dict.ALL, '18-25', '26-35', '36-45', '46-55', '56-65', '65+'] || [];
    const handleChange = (filter, value) => {
        setFilters({ ...filters, [filter]: value });
    };
    return (
        <>
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
        </>
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

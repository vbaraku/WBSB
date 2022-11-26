/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardMedia, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import fileDownload from 'js-file-download';
import { Link } from 'react-router-dom';
import PublicationList from 'PublicationList';
import { useLanguage } from 'LanguageContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Publications() {
    const [year, setYear] = useState(0);
    const { language, dictionary } = useLanguage();
    const [years, setYears] = useState([]);

    return (
        <div className="homepage" style={{ marginTop: '0' }}>
            <Container id="publications" fluid style={{ maxWidth: 1000, margin: 'auto', paddingTop: '60px', justifyContent: 'center' }}>
                <Row style={{ padding: '0px 20px' }}>
                    <h1 style={{ marginLeft: 5 }}>{dictionary.PUBLICATION}</h1>
                    <div style={{ flex: 1 }} />

                    <FormControl>
                        {/* <InputLabel id="publications-label">{dictionary.YEAR_LABEL}</InputLabel> */}
                        {/* <Select
                            value={year}
                            labelId="publications-label"
                            id="publication-label-select"
                            label={dictionary.YEAR_LABEL}
                            onChange={(e) => {
                                setYear(e.target.value);
                            }}
                            MenuProps={{
                                disableScrollLock: true
                            }}
                        >
                            <MenuItem value={0}>{dictionary.ALL}</MenuItem>

                            <MenuItem value={2021}>2021</MenuItem>
                            <MenuItem value={2022}>2022</MenuItem>
                        </Select> */}
                        <select value={year} className="year-select" onChange={(e) => setYear(e.target.value)}>
                            <option value={0}>{dictionary.ALL} </option>
                            {years.map((year) => (
                                <option value={year}>{year}</option>
                            ))}
                        </select>
                    </FormControl>
                </Row>
                <Row
                    style={{
                        maxWidth: 1000,
                        margin: 'auto',
                        'box-shadow':
                            '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 0%)',
                        background: 'white',
                        borderRadius: 15,
                        padding: '20px',
                        marginTop: '15px',
                        marginBottom: '60px'
                    }}
                >
                    <PublicationList year={year} setYears={setYears} />
                </Row>
            </Container>
        </div>
    );
}

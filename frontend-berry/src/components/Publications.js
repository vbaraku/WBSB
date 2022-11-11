import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardMedia, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import fileDownload from 'js-file-download';
import { Link } from 'react-router-dom';
import PublicationList from 'PublicationList';
import { useLanguage } from 'LanguageContext';

export default function Publications() {
    const [year, setYear] = useState(0);
    const { dictionary } = useLanguage();

    return (
        <div className="homepage">
            <Container id="publications" fluid style={{ maxWidth: 1000, margin: 'auto', paddingTop: '30px', justifyContent: 'center' }}>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        padding: '20px',
                        display: 'flex',
                        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 0%)'
                    }}
                >
                    <h1>{dictionary.PUBLICATION}</h1>
                    <div style={{ flex: 1 }} />
                    <FormControl sx={{ marginLeft: '15px', align: 'right' }}>
                        <InputLabel id="publications-label">{dictionary.YEAR_LABEL}</InputLabel>
                        <Select
                            value={year}
                            labelId="publications-label"
                            id="publication-label-select"
                            label={dictionary.YEAR_LABEL}
                            onChange={(e) => {
                                setYear(e.target.value);
                            }}
                        >
                            <MenuItem value={0}>{dictionary.ALL}</MenuItem>

                            <MenuItem value={2021}>2021</MenuItem>
                            <MenuItem value={2022}>2022</MenuItem>
                        </Select>
                        {/* <h1 style={{ marginBottom: 30 }} className="">
                Raportet
            </h1>
            <hr /> */}
                    </FormControl>
                    <hr />
                </div>

                <Row
                    style={{
                        maxWidth: 1000,
                        margin: 'auto',
                        'box-shadow':
                            '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 0%)',
                        background: 'white',
                        borderRadius: 15,
                        padding: '30px',
                        marginTop: '15px',
                        marginBottom: '60px'
                    }}
                >
                    <PublicationList year={year} />
                </Row>
            </Container>
        </div>
    );
}

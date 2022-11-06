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
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        axios.get('/api/publication').then((res) => {
            setPublications(res.data);
        });
    }, []);

    return (
        <Container id="publications" fluid style={{ maxWidth: 1000, margin: 'auto', marginTop: '90px', justifyContent: 'center' }}>
            <FormControl sx={{ marginLeft: '15px' }}>
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

            <Row style={{ maxWidth: 1000, margin: 'auto' }}>
                <PublicationList year={year} />
            </Row>
        </Container>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import fileDownload from 'js-file-download';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export default function PublicationList({ listSize, year, setYears }) {
    const [publications, setPublications] = useState([]);
    const { language, dictionary } = useLanguage();

    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://localhost:8080';
    } else {
        baseURL = 'https://r2bdb.herokuapp.com';
    }

    useEffect(() => {
        axios
            .get('/api/publication', { params: { language } })
            .then((res) => {
                setPublications(res.data.slice(0, listSize));
                if (setYears) {
                    // get unique years from res.data
                    const years = [...new Set(res.data.map((item) => item.date.slice(0, 4)))];
                    setYears(years);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [language]);
    function handleDownload(name, id) {
        axios.get(`/files/${id}.pdf`, { responseType: 'blob' }).then((response) => {
            fileDownload(response.data, `${name}.pdf`);
        });
    }

    function getPublications() {
        console.log(year);
        if (year && year !== 0 && year !== '0') {
            return publications.filter((pub) => pub.date.slice(0, 4) === String(year));
        }
        return publications;
    }
    return (
        <>
            {getPublications().map((publication, index) => (
                <Col lg={4} md={6} sm={12} key={index} style={{ marginTop: '25px', maxHeight: '100%' }}>
                    <Card className="publication-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            // style={{ padding: '30px 30px 30px 30px' }}
                            component="img"
                            image={`${baseURL}/images/${publication.imagePath}`}
                            alt="green iguana"
                        />
                        <CardContent style={{ marginTop: '10px', width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Typography
                                onClick={() => {
                                    handleDownload(publication.title, publication.id);
                                }}
                                gutterBottom
                                variant="h6"
                                className="clickable"
                                component="div"
                                style={{ color: '#185faf' }}
                            >
                                {publication.title}
                            </Typography>
                            <div style={{ color: '#185faf', marginTop: 'auto', marginBottom: 0 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {publication.date.slice(0, 7)}
                                </Typography>
                                <Link
                                    to=""
                                    onClick={() => {
                                        handleDownload(publication.title, publication.id);
                                    }}
                                >
                                    {dictionary.DOWNLOAD}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </Col>
            ))}
        </>
    );
}

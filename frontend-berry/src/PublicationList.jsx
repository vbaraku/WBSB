import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import fileDownload from 'js-file-download';
import { Link } from 'react-router-dom';

export default function PublicationList({ listSize, year }) {
    const [publications, setPublications] = useState([]);

    let baseURL = '';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://localhost:8080';
    } else {
        baseURL = 'https://r2bdb.herokuapp.com';
    }

    useEffect(() => {
        axios
            .get('/api/publication')
            .then((res) => {
                setPublications(res.data.slice(0, listSize));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    function handleDownload(name, id) {
        axios.get(`/files/${id}.pdf`, { responseType: 'blob' }).then((response) => {
            fileDownload(response.data, `${name}.pdf`);
        });
    }

    function getPublications() {
        if (year && year !== 0) {
            return publications.filter((pub) => pub.date.slice(0, 4) === String(year));
        }
        return publications;
    }
    return (
        <>
            {/* {getPublications().map((publication, index) => (
                <Col lg={4} md={6} sm={12} key={index} style={{ marginTop: '60px' }}>
                    <Card className="publication-card">
                        <CardMedia
                            // style={{ padding: '30px 30px 30px 30px' }}
                            component="img"
                            image={`${baseURL}/images/${publication.imagePath}`}
                            alt="green iguana"
                        />
                        <CardContent style={{ marginTop: '10px' }}>
                            <Typography
                                onClick={() => {
                                    handleDownload(publication.title, publication.id);
                                }}
                                gutterBottom
                                variant="h5"
                                className="clickable"
                                component="div"
                                style={{ color: '#185faf' }}
                            >
                                {publication.title}
                            </Typography>
                            <Typography style={{ marginTop: '20px' }} variant="body2" color="text.secondary">
                                {publication.date}
                            </Typography>
                            <Link
                                to=""
                                onClick={() => {
                                    handleDownload(publication.title, publication.id);
                                }}
                                style={{ color: '#185faf' }}
                            >
                                Download
                            </Link>
                        </CardContent>
                    </Card>
                </Col>
            ))} */}
        </>
    );
}

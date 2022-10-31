import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import fileDownload from 'js-file-download';
import { Link } from 'react-router-dom';

export default function PublicationList({ listSize }) {
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
    return (
        <>
            {publications.map((publication, index) => (
                <Col lg={4} md={6} sm={12} key={index} style={{ marginBottom: '60px' }}>
                    {/* <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={reportImage} />
                                <Card.Body>
                                    <Card.Title>{publication.title}</Card.Title>
                                    <Card.Text>{publication.text}</Card.Text>
                                    <Card.Text>18 gusht 2022</Card.Text>

                                    <Link to="te-dhenat">Raed more</Link>
                                </Card.Body>
                            </Card> */}
                    <Card className="publication-card">
                        {/* <CardActionArea> */}
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
                        {/* </CardActionArea> */}
                        {/* <CardActions /> */}
                    </Card>
                </Col>
            ))}
        </>
    );
}

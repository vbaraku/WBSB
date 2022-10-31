import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardMedia, CardContent, Typography, Select } from '@mui/material';
import fileDownload from 'js-file-download';
import { Link } from 'react-router-dom';
import PublicationList from 'PublicationList';

export default function Publications() {
    return (
        <Container id="publications" fluid style={{ maxWidth: 1240, margin: 'auto', marginTop: '90px', justifyContent: 'center' }}>
            <Select>
                <option value="all">All</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
            </Select>
            {/* <h1 style={{ marginBottom: 30 }} className="">
                Raportet
            </h1>
            <hr /> */}

            <Row style={{ maxWidth: 1000, margin: 'auto' }}>
                <PublicationList />
            </Row>
        </Container>
    );
}

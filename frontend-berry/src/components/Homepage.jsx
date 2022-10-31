/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, CardActionArea, CardMedia, CardContent, Typography, CardActions, Divider } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
// import image from '../assets/images/test.svg';
import { ReactComponent as Logo } from '../assets/images/test.svg';
import { CloudOff } from '@mui/icons-material';
import Slider from 'react-slick';
import logo from '../assets/images/logo.png';
import csdgLogo from '../assets/images/logo-csdg.jpg';
import bcspLogo from '../assets/images/logo-bcsp-orange.jpg';
import { useLanguage, useLanguageUpdate } from '../LanguageContext';
import reportImage from '../assets/images/report1.png';
import axios from 'axios';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import fileDownload from 'js-file-download';
import qkssLogo from '../assets/images/qkss-logo.png';
import PublicationList from 'PublicationList';

export default function Homepage() {
    const { language, dictionary } = useLanguage();

    const [partners, setPartners] = useState([
        {
            name: dictionary.PARTNER0,
            logo: qkssLogo,
            link: 'https://www.qkss.org/',
            description: dictionary.PARTNER0_DESC
        },
        {
            name: dictionary.PARTNER1,
            logo: bcspLogo,
            link: 'https://www.bcsp.org/',
            description: dictionary.PARTNER1_DESC
        },
        {
            name: dictionary.PARTNER2,
            logo: csdgLogo,
            link: 'https://www.csdg.org/',
            description: dictionary.PARTNER2_DESC
        }
    ]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));
    }, []);

    return (
        <>
            <Container fluid className="homepage-header">
                <Row className="homepage-banner">
                    <Col lg={6} md={12} sm={12} className="banner-text">
                        <span className="title">Barometri 2022 is now here</span>
                        <Link className="redirect-link" to="te-dhenat">
                            Explore our data ➜
                        </Link>
                    </Col>
                    <Col className="img-wrapper" lg={6} md={12} sm={12}>
                        <img className="banner-image" src={logo} alt="logo" />
                    </Col>
                </Row>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '26px',
                        fontWeight: '600'
                    }}
                >
                    <span
                        onClick={() => {
                            document.querySelector('.partner-section').scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ margin: '20px', cursor: 'pointer' }}
                    >
                        {dictionary.PARTNERS}
                    </span>

                    <span
                        onClick={() => {
                            document.querySelector('#publications').scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ margin: '20px', cursor: 'pointer' }}
                    >
                        Publications
                    </span>
                    <span style={{ margin: '20px' }}>test</span>
                </div>
            </Container>
            <Row style={{ margin: 'auto', maxWidth: 1240, marginTop: '90px' }}>
                <Col>
                    <p>{dictionary.METHODOLOGY_DESC1}</p>
                    <p>{dictionary.METHODOLOGY_DESC2}</p>
                    <p>{dictionary.METHODOLOGY_DESC3}</p>
                    <p>{dictionary.METHODOLOGY_DESC4}</p>
                </Col>
            </Row>
            <Row style={{ margin: 'auto', maxWidth: 1240, marginTop: '90px' }}>
                <Col className="hidden">
                    {/* <AnimationOnScroll animateIn="animate__fadeIn" animateOut="animate__fadeIn"> */}
                    <p>{dictionary.ABOUT_WBSB_DESC1}</p>
                    <p>{dictionary.ABOUT_WBSB_DESC2}</p>
                    <p>{dictionary.ABOUT_WBSB_DESC3}</p>
                    <p>{dictionary.ABOUT_WBSB_DESC4}</p>
                    {/* </AnimationOnScroll> */}
                </Col>
            </Row>

            <Container fluid className="partner-section">
                <div style={{ maxWidth: '1240px', textAlign: '' }}>
                    <h1 style={{ marginBottom: 10, fontSize: '40px' }} className="">
                        Partners
                    </h1>
                    <hr />

                    <Row
                        // className="row-fluid"
                        style={{ margin: 'auto', justifyContent: 'space-around', marginTop: '40px' }}
                    >
                        {partners.map((partner, index) => (
                            <Col
                                className="hidden partner-card"
                                lg={4}
                                md={6}
                                sm={12}
                                // style={{ maxWidth: '35%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                            >
                                <div className="img-wrapper">
                                    <img src={partner.logo} alt="logo" />
                                </div>
                                <div className="content">
                                    <h3>{partner.name}</h3>
                                    <Divider />
                                    <p>{partner.description}</p>
                                    <Link className="partner-link" to="te-dhenat">
                                        {dictionary.READ_MORE} ➜
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

            <Container id="publications" fluid style={{ maxWidth: 1240, margin: 'auto', marginTop: '90px', justifyContent: 'center' }}>
                <h1 style={{ marginBottom: 30 }} className="">
                    {dictionary.PUBLICATION}
                </h1>
                <hr />

                <Row style={{ maxWidth: 1000, margin: 'auto' }}>
                    <PublicationList listSize={3} />
                </Row>
            </Container>
        </>
    );
}

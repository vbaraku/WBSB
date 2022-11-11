/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, CardActionArea, CardMedia, CardContent, Chip, Typography, CardActions, Divider } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CircleIcon from '@mui/icons-material/Circle';
import Charts from './graphs/Charts';
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
import donor from '../assets/images/donor.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.scss';
import SwiperCore, { Autoplay } from 'swiper';
import SingleQuestionChart from './graphs/SingleQuestionChart';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/effect-flip/effect-flip.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

export default function Homepage() {
    const { language, dictionary } = useLanguage();
    SwiperCore.use([Autoplay]);
    function updatePartners() {
        return [
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
        ];
    }

    function updatePartners() {
        return [
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
        ];
    }

    const [partners, setPartners] = useState(updatePartners());

    useEffect(() => {
        setPartners(updatePartners());
    }, [language]);
    useEffect(() => {
        setPartners(updatePartners());
    }, [language]);
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
        <div className="homepage">
            <Container fluid className="homepage-header">
                <Row className="homepage-banner">
                    <Col lg={6} md={12} sm={12} className="banner-text">
                        <span className="title">{dictionary.TITLE}</span>
                        <Link className="redirect-link" to="te-dhenat">
                            {dictionary.EXPLORE} ➜
                        </Link>
                    </Col>
                    <Col lg={5} md={12} sm={12}>
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            autoplay={{
                                delay: 8000
                            }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide>
                                <SingleQuestionChart />
                            </SwiperSlide>
                            {/* <SwiperSlide style={{ padding: '30px' }}>
                                <SingleQuestionChart />
                            </SwiperSlide>
                            <SwiperSlide style={{ padding: '30px' }}>
                                <SingleQuestionChart />
                            </SwiperSlide>
                            <SwiperSlide style={{ padding: '30px' }}>
                                <SingleQuestionChart />
                            </SwiperSlide> */}
                        </Swiper>
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
                            document.querySelector('#methodology-section').scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ margin: '20px', cursor: 'pointer' }}
                    >
                        {dictionary.METHODOLOGY}
                    </span>

                    <span
                        onClick={() => {
                            document.querySelector('#about-section').scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ margin: '20px', cursor: 'pointer' }}
                    >
                        {dictionary.ABOUT_WBSB}
                    </span>

                    <span
                        onClick={() => {
                            document.querySelector('#partner-section').scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ margin: '20px', cursor: 'pointer' }}
                    >
                        {dictionary.PARTNERS}
                    </span>

                    <span
                        onClick={() => {
                            document.querySelector('#donor-section').scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ margin: '20px', cursor: 'pointer' }}
                    >
                        {dictionary.DONOR}
                    </span>
                    <span
                        onClick={() => {
                            document.querySelector('#publication-section').scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ margin: '20px', cursor: 'pointer' }}
                    >
                        {dictionary.PUBLICATION}
                    </span>
                </div>
            </Container>
            <Container id="methodology-section" fluid className="section" style={{ marginTop: '0px' }}>
                <div style={{ maxWidth: '1240px' }}>
                    <h1 style={{ marginBottom: 10, marginTop: 20, fontSize: '40px' }} className="">
                        {dictionary.METHODOLOGY}
                    </h1>
                    <hr />
                    <Row style={{ margin: 'auto', maxWidth: 1240, marginTop: '35px' }}>
                        <Col
                            lg={{ span: 5, offset: 0 }}
                            md={12}
                            sm={12}
                            className="banner-text"
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <div className="hidden">
                                <Typography variant="body2" align="right" style={{ marginRight: '-50px', fontSize: '18px' }}>
                                    {dictionary.METHODOLOGY_DESC1}
                                </Typography>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <Divider orientation="vertical">
                                <Chip label={<ArrowLeftIcon />} />
                            </Divider>
                        </Col>
                    </Row>
                    <Row style={{ margin: 'auto', maxWidth: 1240 }}>
                        <Col lg={{ span: 2, offset: 5 }}>
                            <Divider orientation="vertical">
                                <Chip label={<ArrowRightIcon />} />
                            </Divider>
                        </Col>
                        <Col
                            lg={{ span: 5 }}
                            md={12}
                            sm={12}
                            className="banner-text"
                            style={{ marginLeft: '-50px', display: 'flex', flexDirection: 'row' }}
                        >
                            <div className="hidden">
                                <Typography variant="body2" style={{ fontSize: '18px' }}>
                                    {dictionary.METHODOLOGY_DESC2}
                                </Typography>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ margin: 'auto', maxWidth: 1240 }}>
                        <Col
                            lg={{ span: 5, offset: 0 }}
                            md={12}
                            sm={12}
                            className="banner-text"
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <div className="hidden">
                                <Typography variant="body2" align="right" style={{ marginRight: '-50px', fontSize: '18px' }}>
                                    {dictionary.METHODOLOGY_DESC3}
                                </Typography>
                            </div>
                        </Col>
                        <Col lg={2}>
                            <Divider orientation="vertical">
                                <Chip label={<ArrowLeftIcon />} />
                            </Divider>
                        </Col>
                    </Row>
                    <Row style={{ margin: 'auto', maxWidth: 1240 }}>
                        <Col lg={{ span: 2, offset: 5 }}>
                            <Divider orientation="vertical">
                                <Chip label={<ArrowRightIcon />} />
                            </Divider>
                        </Col>
                        <Col lg={{ span: 5 }} md={12} sm={12} className="banner-text" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="hidden">
                                <Typography variant="body2" style={{ marginLeft: '-50px', fontSize: '18px' }}>
                                    {dictionary.METHODOLOGY_DESC4}
                                </Typography>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container id="about-section" fluid className="section" style={{ marginTop: '0px' }}>
                <div style={{ maxWidth: '1240px', textAlign: '' }}>
                    <h1 style={{ marginBottom: 10, marginTop: 10, fontSize: '40px', textAlign: 'left' }} className="">
                        {dictionary.ABOUT_WBSB}
                    </h1>
                    <hr />
                    <Row style={{ margin: 'auto', maxWidth: 1240, marginTop: '40px' }}>
                        <Col
                            className="hidden"
                            lg={5}
                            md={12}
                            sm={12}
                            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                        >
                            <img style={{ width: '100%' }} className="banner-image" src={logo} alt="logo" />
                        </Col>
                        <Col className="hidden" lg={7} md={12} sm={12}>
                            <Typography align="justify">{dictionary.ABOUT_WBSB_DESC1}</Typography>
                            <Typography align="justify">{dictionary.ABOUT_WBSB_DESC2}</Typography>
                            <Typography align="justify">{dictionary.ABOUT_WBSB_DESC3}</Typography>
                            <Typography align="justify">{dictionary.ABOUT_WBSB_DESC4}</Typography>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Container id="partner-section" fluid className="partner-section" style={{ marginTop: '0px' }}>
                <div style={{ maxWidth: '1240px', textAlign: '' }}>
                    <h1 style={{ marginBottom: 10, fontSize: '40px' }} className="">
                        {dictionary.PARTNERS}
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
                                    <a href={partner.link} className="partner-link">
                                        {dictionary.READ_MORE} ➜
                                    </a>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

            <Container id="donor-section" fluid style={{ maxWidth: 1240, margin: 'auto', justifyContent: 'center' }}>
                <h1 style={{ marginBottom: 30 }} className="">
                    {dictionary.DONOR}
                </h1>
                <hr />

                <Row style={{ maxWidth: 1240, margin: 'auto' }}>
                    <Col lg={6} md={12} sm={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <img style={{ width: '100%' }} className="banner-image hidden" src={donor} alt="donor" />
                    </Col>
                    <Col
                        className="hidden"
                        lg={6}
                        md={12}
                        sm={12}
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '18px' }}
                    >
                        <Typography variant="inherit">{dictionary.DONATOR}</Typography>
                        <a href="https://www.ned.org/" className="partner-link" style={{ width: 'fit-content', marginTop: 15 }}>
                            {dictionary.READ_MORE} ➜
                        </a>
                    </Col>
                </Row>
            </Container>

            <Container
                id="publication-section"
                fluid
                style={{ maxWidth: 1240, margin: 'auto', marginTop: '90px', justifyContent: 'center', marginBottom: '90px' }}
            >
                <h1 style={{ marginBottom: 30 }} className="">
                    {dictionary.PUBLICATION}
                </h1>
                <hr />

                <Row className="hidden" style={{ maxWidth: 1000, margin: 'auto' }}>
                    <PublicationList listSize={3} />
                </Row>
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }}>
                    <Link className="partner-link" to="publikime" style={{ textAlign: 'center' }}>
                        {dictionary.READ_MORE} ➜
                    </Link>
                </div>
            </Container>
            {/*  */}
        </div>
    );
}

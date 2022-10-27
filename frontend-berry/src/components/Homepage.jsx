import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import { Col, Row } from 'react-bootstrap';
// import image from '../assets/images/test.svg';
import { ReactComponent as Logo } from '../assets/images/test.svg';
import { CloudOff } from '@mui/icons-material';
import Slider from 'react-slick';

export default function Homepage() {
    const navigate = useNavigate();

    useEffect(() => {
        const countries = Array.from(document.querySelectorAll('.clickable-map'));
        const kosovo = document.querySelector('.kosovo-map');
        const colour = '';
        countries.forEach((country) => {
            country.onclick = () => {
                const countryName = country.classList[0];
                navigate(`/te-dhenat?shteti=${countryName}`);
            };

            country.onmouseover = () => {
                country.style.cursor = 'pointer';
                // colour = country.style.fill;
                country.style.opacity = 0.85;
                // country.style = '#e9e9e9';
            };

            country.onmouseout = () => {
                country.style.fill = colour;
                country.style.opacity = 1;
                // country.style.fill = '#f5f5f5';
            };
        });
    }, []);
    return (
        <div className="map_box">
            <Row style={{ width: '100%', maxHeight: '400px' }}>
                <Col
                    md={4}
                    lg={4}
                    sm={12}
                    style={{
                        justifyContent: 'flex-end',
                        alignContent: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '100%'
                    }}
                >
                    <ControlledCarousel />
                </Col>
                <Col
                    md={8}
                    lg={8}
                    sm={12}
                    style={{ justifyContent: 'center', alignContent: 'left', display: 'flex', flexDirection: 'column', maxHeight: '100%' }}
                >
                    <Logo className="wbsb-map" style={{ width: 'auto', height: '100%' }} viewBox="100 0 380 420" />
                </Col>
            </Row>
        </div>
    );
}

function ControlledCarousel() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    const text = `BSBP shërben si një instrument për të matur perceptimet e qytetarëve të Shqipërisë, Kosovës dhe Serbisë për çështje të ndryshme të lidhura me sigurinë, sundimin e ligjit, drejtësinë, bashkëpunimin rajonal dhe ndërtimin e paqes. Për më tepër, BSBP identifikon kërcënimet dhe sfidat e ndryshme ekzistuese dhe ato me potencial rritjeje siç perceptohen nga qytetarët e të tre vendeve.

`;

    // Split text into array with members of size 100 but not splitting words
    const splitText = text.match(/.{1,200}(\s|$)/g);
    return (
        <div style={{ background: 'lightblue', textAlign: 'center', margin: '0 5%' }}>
            <Slider {...settings}>
                {splitText.map((item, index) => (
                    <div key={index}>
                        <p>{item}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

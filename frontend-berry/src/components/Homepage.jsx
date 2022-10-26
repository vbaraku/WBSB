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
            <Row style={{ width: '100%', height: '100%' }}>
                <Col md={6} lg={6} sm={12}>
                    <ControlledCarousel />
                </Col>
                <Col md={6} lg={6} sm={12}>
                    <ControlledCarousel />
                </Col>
            </Row>
        </div>
    );
}

function ControlledCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div>
            <h2> Single Item</h2>
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    );
}

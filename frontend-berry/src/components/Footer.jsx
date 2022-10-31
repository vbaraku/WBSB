import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export default function Foter() {
    const { language, dictionary } = useLanguage();
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* link to about us page */}
                    <Link className="footer-link" to="/te-dhenat">
                        {dictionary.DATA}
                    </Link>
                    <Link className="footer-link" to="/te-dhenat">
                        {dictionary.REPORT}
                    </Link>
                    <Link className="footer-link" to="/te-dhenat">
                        {dictionary.OP_ED}
                    </Link>
                    <Link className="footer-link" to="/te-dhenat">
                        {dictionary.CONTACT}
                    </Link>
                </Col>
                <Col>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                </Col>
                <Col>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                    <h3>Footer</h3>
                </Col>
            </Row>
        </Container>
    );
}

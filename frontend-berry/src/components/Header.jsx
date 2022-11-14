import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TranslateIcon from '@mui/icons-material/Translate';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import { Container, Nav, Navbar, NavDropdown, Image, Button, Form } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import { FormControl } from '@mui/material';
import { useLanguage, useLanguageUpdate } from '../LanguageContext';

export default function Header() {
    const { language, dictionary } = useLanguage();
    const setLanguage = useLanguageUpdate();

    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand as={Link} to="/">
                <Image src={logo} alt="logo" style={{ width: 'auto', height: 'auto', maxWidth: '190px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkWrapper to="/">{dictionary.HOME}</LinkWrapper>
                        <LinkWrapper to="/te-dhenat">{dictionary.DATA}</LinkWrapper>
                        <LinkWrapper to="/publikime">{dictionary.PUBLICATION}</LinkWrapper>
                        {/* <LinkWrapper to="/about">Rreth WBSB</LinkWrapper> */}

                        {/* <DropdownWrapper title={dictionary.PUBLICATION} to="/publikime">
                            <NavDropdown.Item as={Link} to="/publikime/raporte">
                                Raporte
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/publikime/3.2">
                                Another action
                            </NavDropdown.Item>
                        </DropdownWrapper>

                        <DropdownWrapper title={dictionary.ABOUT_WBSB} to="/about">
                            <NavDropdown.Item as={Link} to="/about/proj">
                                About proj
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/publikime/3.2">
                                Another action
                            </NavDropdown.Item>
                        </DropdownWrapper>

                        <LinkWrapper to="/contact">{dictionary.CONTACT}</LinkWrapper> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {/* <IconButton color="primary" size="large" style={{ background: 'rgb(227, 242, 253)' }}>
                <TranslateIcon />
            </IconButton> */}
            {/* bootstrap select form  */}
            <div className="translateIcon">
                <TranslateIcon fontSize="small" style={{ marginRight: 7, color: '#969A97' }} />
            </div>
            <Box sx={{ marginRight: 3 }}>
                <FormControl variant="standard">
                    {/* <InputLabel id="language-select-label">Language</InputLabel> */}
                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value);
                        }}
                        className="form-select"
                        aria-label="Default select example"
                    >
                        <MenuItem value="ALB">{dictionary.ALBANIAN}</MenuItem>

                        <MenuItem value="ENG">{dictionary.ENGLISH}</MenuItem>

                        <MenuItem value="SRB">{dictionary.SERBIAN}</MenuItem>
                        {/* <option value="1">English</option>
                <option value="2">Albanian</option>
                <option value="3">Serbian</option> */}
                    </Select>
                </FormControl>
            </Box>
        </Navbar>
    );
}

const LinkWrapper = ({ to, children }) => {
    const path = useLocation().pathname;
    return (
        <Nav.Link as={Link} to={to} style={{ color: path === to ? '#108EDD' : '', fontWeight: 600, fontSize: '20px' }}>
            {children}
        </Nav.Link>
    );
};

const DropdownWrapper = ({ title, to, children }) => {
    const path = useLocation().pathname;
    const [show, setShow] = useState(false);
    console.log(path, to, path.includes(to));
    const showDropdown = (e) => {
        setShow(true);
    };
    const hideDropdown = (e) => {
        setShow(false);
    };

    return (
        <NavDropdown
            title={<span style={{ color: path.includes(to) ? '#108EDD' : '', fontWeight: 600, fontSize: '20px' }}>{title}</span>}
            show={show}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
            onClick={showDropdown}
            color={path.includes(to) ? '#108EDD' : ''}
        >
            {children}
        </NavDropdown>
    );
};

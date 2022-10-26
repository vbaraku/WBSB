import React, { useState } from 'react';
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

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand as={Link} to="/">
                <Image src={logo} alt="logo" style={{ width: 'auto', minHeight: '100px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkWrapper to="/te-dhenat">Të dhënat</LinkWrapper>
                        <LinkWrapper to="/ballina">Ballina</LinkWrapper>
                        {/* <LinkWrapper to="/">Publikime</LinkWrapper> */}
                        {/* <LinkWrapper to="/about">Rreth WBSB</LinkWrapper> */}

                        <DropdownWrapper title="Publikime" to="/publikime">
                            <NavDropdown.Item as={Link} to="/publikime/raporte">
                                Raporte
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/publikime/3.2">
                                Another action
                            </NavDropdown.Item>
                        </DropdownWrapper>

                        <DropdownWrapper title="Rreth WBSB" to="/about">
                            <NavDropdown.Item as={Link} to="/about/proj">
                                About proj
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/publikime/3.2">
                                Another action
                            </NavDropdown.Item>
                        </DropdownWrapper>

                        <LinkWrapper to="/contact">Kontakti</LinkWrapper>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {/* <IconButton color="primary" size="large" style={{ background: 'rgb(227, 242, 253)' }}>
                <TranslateIcon />
            </IconButton> */}
            {/* bootstrap select form  */}
            <Box>
                <FormControl variant="standard">
                    {/* <InputLabel id="language-select-label">Language</InputLabel> */}

                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value="Albanian"
                        className="form-select"
                        aria-label="Default select example"
                    >
                        <MenuItem value="Albanian"> Albanian </MenuItem>
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
        <Nav.Link as={Link} to={to} style={{ color: path.includes(to) ? '#108EDD' : '', fontWeight: 600, fontSize: '20px' }}>
            {children}
        </Nav.Link>
    );
};

const DropdownWrapper = ({ title, to, children }) => {
    const path = useLocation().pathname;
    const [show, setShow] = useState(false);
    console.log(path, to, path.includes(to));
    const showDropdown = (e) => {
        setShow(!show);
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
            color={path.includes(to) ? '#108EDD' : ''}
        >
            {children}
        </NavDropdown>
    );
};

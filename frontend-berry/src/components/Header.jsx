import { Link, useLocation } from 'react-router-dom';
import TranslateIcon from '@mui/icons-material/Translate';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
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
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <div className="translateIcon">
                <TranslateIcon fontSize="small" style={{ marginRight: 7, color: '#969A97' }} />
            </div>
            <Box sx={{ marginRight: 3 }}>
                <FormControl variant="standard">
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

// const DropdownWrapper = ({ title, to, children }) => {
//     const path = useLocation().pathname;
//     const [show, setShow] = useState(false);
//     const showDropdown = () => {
//         setShow(true);
//     };
//     const hideDropdown = () => {
//         setShow(false);
//     };

//     return (
//         <NavDropdown
//             title={<span style={{ color: path.includes(to) ? '#108EDD' : '', fontWeight: 600, fontSize: '20px' }}>{title}</span>}
//             show={show}
//             onMouseEnter={showDropdown}
//             onMouseLeave={hideDropdown}
//             onClick={showDropdown}
//             color={path.includes(to) ? '#108EDD' : ''}
//         >
//             {children}
//         </NavDropdown>
//     );
// };

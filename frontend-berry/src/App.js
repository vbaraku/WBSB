import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, StyledEngineProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import UploadReport from './components/UploadReport';
// import QuestionNav from './components/QuestionNav';
// import DashboardGra  ph from './components/DashboardGraph';
import Dashboard from 'components/Dashboard';
import Container from 'react-bootstrap/Container';
import Homepage from 'components/Homepage';
import LanguageProvider from './LanguageContext';
import Publications from 'components/Publications';

// import './assets/scss/style.scss';
import style from './assets/scss/style.scss';
// routing

// import Box from '@mui/material';
import Header from 'components/Header';
import Footer from 'components/Footer';
import publicaSans from './assets/fonts/PublicaSans-Light.otf';
import camptonLight from './assets/fonts/CamptonLight.otf';
import publicaSansBold from './assets/fonts/PublicaSans-Bold.otf';

// import { JWTProvider } from 'contexts/JWTContext';
// import { Auth0Provider } from 'contexts/Auth0Context';

import createTheme from '@mui/material/styles/createTheme';
// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    const theme = createTheme({
        typography: {
            fontFamily: 'Campton'
        },
        components: {
            // MuiCssBaseline: {
            //     styleOverrides: `
            //         @font-face {
            //         font-family: 'Publica Sans Light';
            //         font-style: normal;
            //         font-display: swap;
            //         font-weight: 400;
            //         src: local('Publica Sans Light'), url(${publicaSans}) format('opentype');
            //         unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            //         }
            //     `
            // }
        }
    });
    return (
        <>
            <LanguageProvider>
                <ThemeProvider theme={theme}>
                    <Header />
                    <Container fluid style={{ height: '100%' }}>
                        <Routes>
                            <Route path="/te-dhenat" element={<Dashboard />} />

                            <Route path="/upload" element={<UploadForm />} />
                            <Route path="/upload-report" element={<UploadReport />} />
                            <Route path="/publikime" element={<Publications />} />
                            <Route path="/" element={<Homepage />} />
                        </Routes>
                    </Container>
                </ThemeProvider>
                {/* <Footer /> */}
            </LanguageProvider>
        </>
    );
};

export default App;

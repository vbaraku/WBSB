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
import { useEffect } from 'react';

// import { JWTProvider } from 'contexts/JWTContext';
// import { Auth0Provider } from 'contexts/Auth0Context';

import createTheme from '@mui/material/styles/createTheme';
import axios from 'axios';
import ReactGA from 'react-ga';
// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const TRACKING_ID = 'UA-253190644-1'; // OUR_TRACKING_ID
    ReactGA.initialize(TRACKING_ID);

    let baseURL = '';
    const inProduction = process.env.NODE_ENV === 'production';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://localhost:8080';
        // baseURL = 'http://ec2-3-224-154-253.compute-1.amazonaws.com:8080/';
    } else {
        // baseURL = 'http://ec2-3-70-65-63.eu-central-1.compute.amazonaws.com:8080/';
        baseURL = '/';
    }

    axios.defaults.baseURL = baseURL;
    const theme = createTheme({
        typography: {
            fontFamily: 'Campton'
        }
    });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <>
            <LanguageProvider>
                <ThemeProvider theme={theme}>
                    <Header />
                    <Container fluid style={{ height: '100%' }}>
                        <Routes>
                            <Route path="/te-dhenat" element={<Dashboard />} />
                            {inProduction ? <Route path="/upload" element={<UploadForm />} /> : null}
                            {!inProduction && <Route path="/upload" element={<UploadForm />} />}
                            {!inProduction && <Route path="/upload-report" element={<UploadReport />} />}
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

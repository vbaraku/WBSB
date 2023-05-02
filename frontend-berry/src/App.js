import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import UploadReport from './components/UploadReport';
// import QuestionNav from './components/QuestionNav';
// import DashboardGra  ph from './components/DashboardGraph';
import Dashboard from 'components/Dashboard';
import Container from 'react-bootstrap/Container';
import Homepage from 'components/Homepage';
import LanguageProvider from './LanguageContext';
import Publications from 'components/Publications';
import OrderQuestions from 'components/OrderQuestions';
import Admin from 'components/Admin';
// import './assets/scss/style.scss';
import './assets/scss/style.scss';
// routing

// import Box from '@mui/material';
import Header from 'components/Header';
import { useEffect } from 'react';

// import { JWTProvider } from 'contexts/JWTContext';
// import { Auth0Provider } from 'contexts/Auth0Context';

import createTheme from '@mui/material/styles/createTheme';
import axios from 'axios';
import ReactGA from 'react-ga';
import PrivateRoute from 'components/PrivateRoute';
// ==============================|| APP ||============================== //

const App = () => {
    const TRACKING_ID = 'UA-253190644-1'; // OUR_TRACKING_ID
    ReactGA.initialize(TRACKING_ID);

    let baseURL = '';
    const inProduction = process.env.NODE_ENV === 'production';
    if (process.env.NODE_ENV === 'development') {
        baseURL = 'http://localhost:8080';
    } else {
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
                            {/* <Route path="/upload-report-qkss-sec" element={<UploadReport />} /> */}
                            {/* <PrivateRoute path="/upload-report" element={<UploadReport />} /> */}
                            {/* <Route
                                path="/admin/upload-data"
                                element={
                                    <PrivateRoute>
                                        <UploadForm />
                                    </PrivateRoute>
                                }
                            /> */}
                            <Route
                                path="/admin/upload-report"
                                element={
                                    <PrivateRoute>
                                        <UploadReport />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin/order-questions"
                                element={
                                    <PrivateRoute>
                                        <OrderQuestions />
                                    </PrivateRoute>
                                }
                            />

                            <Route path="/admin" element={<Admin />} />
                            {/* <PrivateRoute path="/rendit" element={<OrderQuestions />} /> */}
                            <Route path="/publikime" element={<Publications />} />
                            <Route path="/" element={<Homepage />} />
                        </Routes>
                    </Container>
                </ThemeProvider>
            </LanguageProvider>
        </>
    );
};

export default App;

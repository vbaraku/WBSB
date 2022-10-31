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

// defaultTheme
import themes from 'themes';

// import Box from '@mui/material';
import Header from 'components/Header';
import Footer from 'components/Footer';
// import { JWTProvider } from 'contexts/JWTContext';
// import { Auth0Provider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <>
            <LanguageProvider>
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
                {/* <Footer /> */}
            </LanguageProvider>
        </>
    );
};

export default App;

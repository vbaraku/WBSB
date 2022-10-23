import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadForm from './components/UploadForm';
// import QuestionNav from './components/QuestionNav';
// import DashboardGra  ph from './components/DashboardGraph';
import Dashboard from 'components/Dashboard';
// routing

// defaultTheme
import themes from 'themes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';

// auth provider
import { FirebaseProvider } from 'contexts/FirebaseContext';
// import { JWTProvider } from 'contexts/JWTContext';
// import { Auth0Provider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                {/* RTL layout */}
                {/* <RTLLayout> */}
                {/* <Routes /> */}
                {/* </RTLLayout> */}
                <Routes>
                    <Route path="/upload" element={<UploadForm />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;

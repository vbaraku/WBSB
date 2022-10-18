import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import UploadForm from './components/UploadForm';
// import QuestionNav from './components/QuestionNav';
// import DashboardGraph from './components/DashboardGraph';
import Dashboard from 'components/Dashboard';
// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
// import RTLLayout from 'ui-component/RTLLayout';
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
                {/* <Locales>
                    <NavigationScroll>
                        <FirebaseProvider>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </FirebaseProvider>
                    </NavigationScroll>
                </Locales> */}
                <>
                    {/* <UploadForm /> */}
                    <Dashboard />
                </>
                {/* </RTLLayout> */}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;

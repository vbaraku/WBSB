import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';

// style + assets
import 'assets/scss/style.scss';
import config from 'config';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <GoogleOAuthProvider clientId={config.googleClientId}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

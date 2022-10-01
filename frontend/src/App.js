import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

import axios from "axios";
import Cookies from "universal-cookie";
// routing
// import Routes from './routes';

// defaultTheme
import themes from "./themes/themes";
// import themes from 'themes';

// ==============================|| APP ||============================== //

const App = () => {
//   const customization = useSelector((state) => state.customization);
  // const cookies = new Cookies();
  // axios.interceptors.request.use(
  //     (config) => {

  //         const token = cookies.get("Authorization");
  //         if (token && token!="") {
  //             config.headers.Authorization = token;
  //         }
  //         return config;
  //     },
  //     (error) => {
  //         return Promise.reject(error);
  //     }
  // );
  return (
    <div>
      {/* <Locales /> */}
      hello
      {/* <Locales /> */}
    </div>
  );
};

export default App;

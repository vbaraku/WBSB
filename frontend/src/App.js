import UploadForm from "./components/UploadForm";
import QuestionNav from "./components/QuestionNav";
import Dashboard from "./components/Dashboard";
// routing
// import Routes from './routes';

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
    <>
      <UploadForm></UploadForm>
      <Dashboard></Dashboard>
    </>
  );
};

export default App;

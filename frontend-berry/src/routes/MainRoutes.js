import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Dashboard from 'components/Dashboard';
import UploadForm from 'components/UploadForm';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        // <AuthGuard>
        <MainLayout />
        // </AuthGuard>
    ),
    children: [
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/upload',
            element: <UploadForm />
        }
    ]
};

export default MainRoutes;

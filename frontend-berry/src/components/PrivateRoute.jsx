import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function PrivateRoute({ path, children }) {
    const [cookies] = useCookies(['token']);
    console.log(cookies);

    if (!cookies.token) {
        return <Navigate state={{ from: path }} replace to="/" />;
    }
    return children;

    // return <>{!cookies.token ? <Route {...props} path={path} /> : <Navigate state={{ from: path }} replace to="/" />}</>;
}

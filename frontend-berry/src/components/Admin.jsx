import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Admin() {
    const [cookies] = useCookies(['token']);
    if (!cookies.token) {
        return <Login />;
    }

    return (
        <div style={{ padding: '10%' }}>
            {/*
             Put a list of admin sub-pages here
            */}
            <h1>Admin subdirectories</h1>:
            <ul>
                {/* <li>
                    <Link to="/admin" aria-disabled>
                        Upload data through CSVs (Currently not implemented, needs testing)
                    </Link>
                </li> */}
                <li>
                    <Link to="/admin/order-questions">Change order of questions</Link>
                </li>
                <li>
                    <Link to="/admin/upload-report"> Upload report </Link>
                </li>
                <li>
                    <a href="https://app.contentful.com/spaces/fhx9ruex8qil/" target="_blank" rel="noreferrer">
                        Edit content (Contentful)
                    </a>
                </li>
            </ul>
        </div>
    );
}

const Login = () => {
    const navigate = useNavigate();
    const handleGoogleLogin = (resp) => {
        const credential = resp.credential;
        // send token to backend in Authorization header
        console.log(credential);
        axios
            .get('/api/auth/google', { headers: { Authorization: `Bearer ${credential}` } })
            .then((resp) => {
                // store in cookies that the user is logged in
                const token = resp.data;
                const decoded = jwtDecode(token);
                document.cookie = `token=${token}; expires=${new Date(decoded.exp * 1000).toUTCString()} path=/`;
                // alert('success');
                // navigate('/admin');
                window.location.reload();
            })
            .catch((err) => {
                alert('You are not authorized to access this page');
                navigate('/');
            });
    };
    return (
        <div
            // center to middle of page
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh'
            }}
        >
            <h1>Admin</h1>
            <p>
                This site is protected by Google OAuth. Please login with your Google account. If you are not authorized, you will be
                redirected to the home page.
            </p>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                    alert('err');
                }}
            />
        </div>
    );
};

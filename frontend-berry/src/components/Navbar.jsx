import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    console.log('Navbar');
    return (
        <nav className="navbar">
            <Link to="/">
                <h1>Albania Survey</h1>
            </Link>
            <ul className="nav-links">
                <Link to="/">
                    <li>Graphs</li>
                </Link>
                <Link to="/upload">
                    <li>Upload</li>
                </Link>
            </ul>
        </nav>
    );
}

/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [country, setCountry] = useState('Kosovo');
    const [language, setLanguage] = useState('ALB');
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('country', country);
        formData.append('language', language);
        try {
            axios.post('/api/answer', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        console.log(selectedFile);
    }, [selectedFile]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".csv" onChange={handleFileSelect} />
                {/* <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                    }}
                /> */}
                {/* <input
                    type="select"
                    name="language"
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                    }}
                /> */}
                <select
                    name="country"
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                    }}
                >
                    <option value="Albania">Albania</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Kosovo">Kosovo</option>
                </select>
                <select
                    name="language"
                    value={language}
                    onChange={(e) => {
                        setLanguage(e.target.value);
                    }}
                >
                    <option value="ALB">Albanian</option>
                    <option value="SRB">Serbian</option>
                    <option value="ENG">English</option>
                </select>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [country, setCountry] = useState('Kosovo');
    const [language, setLanguage] = useState('ALB');
    const [year, setYear] = useState(2021);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('country', country);
        formData.append('language', language);
        formData.append('year', year);
        try {
            axios
                .post('/api/answer', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    setData(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    useEffect(() => {
        axios.get('/api/answer/audit').then((resp) => {
            setData(resp.data);
        });
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '35%' }}>
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
                Country
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
                Language
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
                Year
                <select
                    name="year"
                    value={year}
                    onChange={(e) => {
                        setYear(e.target.value);
                    }}
                >
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
                <button type="submit" disabled={loading}>
                    Submit
                </button>
                {loading && <p>Loading...</p>}
            </form>
            {data.map((el) => (
                <div>{JSON.stringify(el)}</div>
            ))}
        </div>
    );
}

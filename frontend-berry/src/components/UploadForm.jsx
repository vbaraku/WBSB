/* eslint-disable jsx-a11y/no-onchange */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleLogin } from 'react-google-login';

export default function UploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [country, setCountry] = useState('Kosovo');
    const [language, setLanguage] = useState('ALB');
    const [year, setYear] = useState(2021);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [queue, setQueue] = useState([]);

    // useEffect(() => {
    //     // remove no-def rule
    //     // eslint-disable-next-line no-undef
    //     console.log('here', google);
    // }, []);

    function sendFile(country, language, year, selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('country', country);
        formData.append('language', language);
        formData.append('year', year);
        try {
            axios
                .post('/api/answer', formData, {
                    // eslint-disable-next-line prettier/prettier
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then((res) => {
                    setLoading(false);
                    setData(res.data);
                    if (queue.length > 0) {
                        const { selectedFile, country, language, year } = queue[0];
                        sendFile(country, language, year, selectedFile);
                        setQueue(queue.slice(1));
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (loading) {
            setQueue([...queue, { selectedFile, country, language, year }]);
            return;
        }

        setLoading(true);

        if (queue.length > 0) {
            const { selectedFile, country, language, year } = queue[0];
            sendFile(country, language, year, selectedFile);
            setQueue(queue.slice(1));
        } else {
            sendFile(country, language, year, selectedFile);
        }
    };
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        axios.get('/api/answer/audit').then((resp) => {
            setData(resp.data);
        });
    }, []);

    return (
        <div>
            <GoogleLogin
                onSuccess={(resp) => {
                    console.log(resp);
                }}
                onError={() => {
                    alert('err');
                }}
            />
            hello
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '35%' }}>
                <input type="file" accept=".csv" onChange={handleFileSelect} />
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
                <button type="submit">Submit</button>
                {loading && <p>Loading...</p>}
            </form>
            {data.map((el) => (
                <div>{JSON.stringify(el)}</div>
            ))}
        </div>
    );
}

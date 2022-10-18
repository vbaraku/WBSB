import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [country, setCountry] = useState('Kosovo');
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('country', country);
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
                <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                    }}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

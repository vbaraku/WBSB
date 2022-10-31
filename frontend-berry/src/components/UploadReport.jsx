/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('image', image);
        formData.append('title', title);
        try {
            axios.post('/api/publication', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleImageSelect = (event) => {
        setImage(event.target.files[0]);
    };

    useEffect(() => {
        console.log(selectedFile);
    }, [selectedFile]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf" onChange={handleFileSelect} />
                <input type="file" accept="image/*" onChange={handleImageSelect} />

                <input
                    name="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

import { useState } from 'react';
import { Input, Button, InputLabel, Typography, Card, Divider, Select, MenuItem } from '@mui/material';
import axios from 'axios';

export default function UploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState();
    // set default date to today in yyyy-mm-dd format
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [language, setLanguage] = useState();
    const [passCode, setPassCode] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('image', image);
        formData.append('date', date);
        formData.append('language', language);
        formData.append('title', title);
        formData.append('passcode', passCode);
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

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const handleLangChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="homepage" style={{ paddingTop: '50px' }}>
            <Card style={{ margin: 'auto', padding: '15px', maxWidth: '600px' }}>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 15,
                        maxWidth: '900px',
                        // textAlign: 'center',
                        margin: 'auto',
                        marginLeft: 5
                    }}
                >
                    <Typography variant="h4">Upload new publication</Typography>
                    <Divider sx={{ margin: 1, width: '610px', marginLeft: -5 }} />
                    <Typography style={{ fontSize: '22px', fontWeight: '300' }}>Publication Pdf</Typography>
                    <input type="file" accept=".pdf" onChange={handleFileSelect} />
                    <Divider sx={{ margin: 3, width: '580px', marginLeft: -3 }} />
                    <Typography style={{ fontSize: '22px', fontWeight: '300' }}>Publication image</Typography>
                    <input style={{ width: '250px' }} type="file" accept="image/*" onChange={handleImageSelect} />
                    <Divider sx={{ margin: 3, width: '580px', marginLeft: -3 }} />
                    <Typography style={{ fontSize: '22px', fontWeight: '300' }}>Publication title</Typography>
                    <Input
                        sx={{ width: '300px' }}
                        name="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <Typography style={{ fontSize: '22px', fontWeight: '300' }}>Passcode</Typography>

                    <Input
                        sx={{ width: '300px' }}
                        name="passCode"
                        value={passCode}
                        onChange={(e) => {
                            setPassCode(e.target.value);
                        }}
                    />
                    <Divider sx={{ margin: 3, width: '580px', marginLeft: -3 }} />
                    <Typography style={{ fontSize: '22px', fontWeight: '300' }}>Publication Date</Typography>
                    <input style={{ width: '300px' }} type="date" value={date} onChange={(e) => handleDateChange(e.target.value)} />
                    <Divider sx={{ margin: 3, width: '580px', marginLeft: -3 }} />
                    <InputLabel id="select-language">Language</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={language} onChange={handleLangChange}>
                        <MenuItem value="ALB">Albanian</MenuItem>
                        <MenuItem value="ENG">English</MenuItem>
                        <MenuItem value="SRB">Serbian</MenuItem>
                    </Select>
                    <Button type="submit" variant="contained" sx={{ width: '150px', margin: 'auto', marginTop: 3 }}>
                        Upload
                    </Button>
                </form>
            </Card>
        </div>
    );
}

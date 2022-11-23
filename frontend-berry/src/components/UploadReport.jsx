import React, { useEffect, useState } from 'react';
import { Input, Button, FormControl, InputLabel, Typography, TextField, Card, Divider } from '@mui/material';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
// import dayjs from 'dayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function UploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState();
    // set default date to today in yyyy-mm-dd format
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('image', image);
        formData.append('date', date);

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

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    useEffect(() => {
        console.log(selectedFile);
    }, [selectedFile]);

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
                    <Divider sx={{ margin: 3, width: '580px', marginLeft: -3 }} />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                    <Typography style={{ fontSize: '22px', fontWeight: '300' }}>Publication Date</Typography>
                    <input style={{ width: '300px' }} type="date" value={date} onChange={(e) => handleDateChange(e.target.value)} />
                    {/* </LocalizationProvider> */}
                    <Button type="submit" variant="contained" sx={{ width: '150px', margin: 'auto', marginTop: 3 }}>
                        Upload
                    </Button>
                </form>
            </Card>
        </div>
    );
}

import { Button, Box, Divider } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';

import { DataGrid } from '@mui/x-data-grid';

export default function OrderQuestions() {
    const { language, dictionary } = useLanguage();
    // const { height, width } = useWindowDimensions();
    // const [countries, setCountries] = useState(['Albania', 'Kosovo', 'Serbia']);
    // const [countryMask, setCountryMask] = useState([true, true, true]);
    // const countriesLabel = [dictionary.ALBANIA, dictionary.KOSOVO, dictionary.SERBIA];
    // const [displaySecond, setDisplaySecond] = useState(false);
    // const [questions, setQuestions] = useState([]);
    // const [selectedQuestion, setSelectedQuestion] = useState({});
    // const [selectedCountry, setSelectedCountry] = useState('Kosovo');
    // const [selectedCountryLabel, setSelectedCountryLabel] = useState(dictionary.KOSOVO);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Pyetja',
            width: 700,
            editable: true
        },
        {
            field: 'category',
            headerName: 'Kategoria',
            width: 450,
            editable: true
        },
        {
            field: 'order',
            headerName: 'Renditja',
            type: 'number',
            width: 110,
            editable: true
        }
    ];

    const rows = [
        { id: 1, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 },
        { id: 2, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 },
        { id: 3, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 }
    ];

    // const [selectedLanguage, setSelectedLanguage] = useState('ALB');

    const drawerWidth = 240;

    useEffect(() => {
        // axios.get('/api/questions', { params: { language } }).then((response) => {
        //     const data = mergeCategories(response.data);
        //     setQuestions(data);
        //     findQuestionById(data, selectedQuestion?.id);
        // });
    }, [language]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="main"
                className="graph-wrapper"
                sx={{
                    borderRadius: '10px 10px 10px 10px',
                    backgroundColor: '#e3f2fd',
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Box sx={{ height: 700, width: '100%', backgroundColor: 'white' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
                <Button variant="contained">Save</Button>
            </Box>
        </Box>
    );
}

import { Button, Box, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DashboardGraph from './DashboardGraph';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';
import Loader from 'ui-component/Loader';
import MenuList from '../layout/MainLayout/Sidebar/MenuList/index';
import MainCard from 'ui-component/cards/MainCard';

export default function Dashboard() {
    const [displaySecond, setDisplaySecond] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('Kosovo');

    useEffect(() => {
        axios.get('/api/questions', { params: { country: selectedCountry, language: 'Albanian' } }).then((response) => {
            setQuestions(response.data);
            if (selectedQuestion.questionId === undefined) setSelectedQuestion(response.data[0]?.questions[0]);
        });
    }, [selectedCountry]);

    if (!selectedQuestion) return <Loader />;
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15%' }}>
                <MiniDrawer
                    categories={questions}
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                />
                {/* <MenuList /> */}
            </div>
            <MainCard style={{ width: '100%', display: 'flex' }}>
                <Box>
                    <DashboardGraph country={selectedCountry} selectedQuestion={selectedQuestion} />
                    {displaySecond ? (
                        <div>
                            <DashboardGraph selectedQuestion={selectedQuestion} />
                        </div>
                    ) : (
                        <div>
                            <Button
                                variant="contained"
                                type="button"
                                onClick={() => {
                                    setDisplaySecond(true);
                                }}
                            >
                                Krahaso +
                            </Button>
                        </div>
                    )}
                </Box>
            </MainCard>
        </div>
    );
}

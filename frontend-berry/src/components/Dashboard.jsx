import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DashboardGraph from './DashboardGraph';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';
import Loader from 'ui-component/Loader';

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
            </div>
            <div>
                <DashboardGraph country={selectedCountry} selectedQuestion={selectedQuestion} />
            </div>

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
                        +
                    </Button>
                </div>
            )}
        </div>
    );
}

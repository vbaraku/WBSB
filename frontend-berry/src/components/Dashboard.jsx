import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DashboardGraph from './DashboardGraph';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';

export default function Dashboard() {
    const [displaySecond, setDisplaySecond] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({ questionText: '', questionId: null });

    useEffect(() => {
        axios.get('/api/questions', { params: { country: 'Kosova', language: 'Albanian' } }).then((response) => {
            setQuestions(response.data);
            console.log(response.data[0].questions[0]);
            setSelectedQuestion(response.data[0].questions[0]);
        });
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15%' }}>
                <MiniDrawer categories={questions} setSelectedQuestion={setSelectedQuestion} />
            </div>
            <div>
                <DashboardGraph selectedQuestion={selectedQuestion} />
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

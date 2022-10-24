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
    const [selectedLanguage, setSelectedLanguage] = useState('ALB');

    function findQuestionById(categoryArray, id) {
        if (!id) {
            setSelectedQuestion(categoryArray[0]?.questions[0]);
            return;
        }
        for (let i = 0; i < categoryArray.length; i += 1) {
            for (let j = 0; j < categoryArray[i].questions.length; j += 1) {
                if (categoryArray[i].questions[j].id === id) {
                    setSelectedQuestion(categoryArray[i].questions[j]);
                    return;
                }
            }
        }
        setSelectedQuestion(categoryArray[0]?.questions[0]);
    }

    useEffect(() => {
        console.log('useEffect');
        axios.get('/api/questions', { params: { country: selectedCountry, language: selectedLanguage } }).then((response) => {
            const questionCount = selectedQuestion.count;
            setQuestions(response.data);
            findQuestionById(response.data, selectedQuestion.id);
        });
    }, [selectedLanguage, selectedCountry]);

    // if (!selectedQuestion) return <Loader />;
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15%' }}>
                <MiniDrawer
                    categories={questions}
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                />
                {/* <MenuList /> */}
            </div>
            <MainCard>
                <Box style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <DashboardGraph country={selectedCountry} selectedQuestion={selectedQuestion} selectedLanguage={selectedLanguage} />
                    {displaySecond ? (
                        <div>
                            <DashboardGraph
                                country={selectedCountry}
                                selectedQuestion={selectedQuestion}
                                selectedLanguage={selectedLanguage}
                            />
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

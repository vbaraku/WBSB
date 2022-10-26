import { Button, Box, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DashboardGraph from './DashboardGraph';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Dashboard() {
    const [displaySecond, setDisplaySecond] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('Kosovo');
    const [selectedLanguage, setSelectedLanguage] = useState('ALB');
    const drawerWidth = 240;
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
        <Box sx={{ display: 'flex' }}>
            <MiniDrawer
                categories={questions}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
            />
            <Box
                component="main"
                sx={{
                    borderRadius: '10px 10px 10px 10px',
                    backgroundColor: '#f5f5f5',
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Box
                    sx={{
                        p: 3
                    }}
                >
                    <DashboardGraph country={selectedCountry} selectedQuestion={selectedQuestion} selectedLanguage={selectedLanguage} />
                    {displaySecond ? (
                        <>
                            <div style={{ marginTop: '20px' }}>
                                <DashboardGraph
                                    country={selectedCountry}
                                    selectedQuestion={selectedQuestion}
                                    selectedLanguage={selectedLanguage}
                                />
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={() => {
                                        setDisplaySecond(false);
                                    }}
                                    style={{ borderRadius: '0px 0px 12px 12px', backgroundColor: '#ed5e68' }}
                                    endIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div>
                            <Button
                                variant="contained"
                                type="button"
                                onClick={() => {
                                    setDisplaySecond(true);
                                }}
                                style={{ borderRadius: '0px 0px 12px 12px' }}
                                endIcon={<AddIcon />}
                            >
                                Krahaso
                            </Button>
                        </div>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

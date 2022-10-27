import { Button, Box, Divider } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import DashboardGraph from './DashboardGraph';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Row, Col } from 'react-bootstrap';
import useWindowDimensions from 'utils/useWindowDimensions';
import MenuIcon from '@mui/icons-material/Menu';
import { borderRadius, maxWidth } from '@mui/system';

export default function Dashboard() {
    const { height, width } = useWindowDimensions();
    const countries = ['Albania', 'Kosovo', 'Serbia'];
    const [displaySecond, setDisplaySecond] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('Kosovo');
    const [selectedLanguage, setSelectedLanguage] = useState('ALB');

    const ref = useRef(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
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
            setQuestions(response.data);
            findQuestionById(response.data, selectedQuestion?.id);
        });
    }, [selectedLanguage, selectedCountry]);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            console.log(e.target.classList);
            if (!(ref?.current?.contains(e.target) || e.target.classList?.contains('category'))) {
                setDrawerOpen(false);
            }
        });

        return () => {
            document.removeEventListener('click', () => {});
        };
    }, []);

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
                drawerOpen={drawerOpen}
            />
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
                <Button
                    variant="contained"
                    type="button"
                    className="drawer-button"
                    style={{
                        display: width < 768 ? 'block' : 'none',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        borderRadius: '0px 5px 5px 0px',
                        marginBottom: '10px',
                        left: '0px',
                        position: 'absolute'
                    }}
                    ref={ref}
                    onClick={() => {
                        setDrawerOpen(!drawerOpen);
                    }}
                >
                    {/* Questions */}
                    <MenuIcon />
                </Button>
                <Box className="data-section" style={{ zIndez: 3 }}>
                    <Row className="country-select">
                        {countries.map((country) => (
                            <Button
                                variant="contained"
                                type="button"
                                className={`btn country-option ${selectedCountry === country ? 'selected-country' : ''}`}
                                onClick={() => setSelectedCountry(country)}
                            >
                                {country}
                            </Button>
                        ))}
                    </Row>
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

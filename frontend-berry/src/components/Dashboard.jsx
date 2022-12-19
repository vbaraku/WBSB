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
import { useLanguage } from '../LanguageContext';

import { Audio } from 'react-loader-spinner';

export default function Dashboard() {
    const { language, dictionary } = useLanguage();
    const { height, width } = useWindowDimensions();
    const countries = ['Albania', 'Kosovo', 'Serbia'];
    const countriesLabel = [dictionary.ALBANIA, dictionary.KOSOVO, dictionary.SERBIA];
    const [displaySecond, setDisplaySecond] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('Kosovo');
    const [selectedCountryLabel, setSelectedCountryLabel] = useState(dictionary.KOSOVO);

    // const [selectedLanguage, setSelectedLanguage] = useState('ALB');

    const ref = useRef(null);

    const chartComponent = useRef(null);

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

    function mergeCategories(questions) {
        // The data comes in the form of an array of categories, each category has an array of questions
        // Some categories have the same name, but start with 3 different first characters. These need to be merged. The first 3 characters dictate the order of the categories

        // First, we need to find the categories that need to be merged
        console.log(questions);
        const categoriesToMerge = {};
        for (let i = 0; i < questions.length; i += 1) {
            const category = questions[i].category;
            if (categoriesToMerge[category.substring(3)]) {
                categoriesToMerge[category.substring(3)].questions.push(questions[i]);
            } else {
                categoriesToMerge[category.substring(3)] = {
                    order: category.substring(0, 3),
                    questions: [questions[i]]
                };
            }
        }

        // Now we need to merge the arrays in the same key

        Object.keys(categoriesToMerge).forEach((key) => {
            if (categoriesToMerge[key].length > 1) {
                const mergedQuestions = [];
                categoriesToMerge[key].forEach((category) => {
                    mergedQuestions.push(...category.questions);
                });
                categoriesToMerge[key] = {
                    order: categoriesToMerge[key][0].category.substring(0, 3),
                    questions: mergedQuestions
                };
            }
        });

        // Sort the categories by the order property
        const sortedCategories = Object.values(categoriesToMerge).sort((a, b) => {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        });

        // // Remove the first 3 characters from the category names
        sortedCategories.forEach((category) => {
            category.questions.forEach((question) => {
                question.category = question.category.substring(3);
            });
        });

        // Return the data to an array of categories, with each category having an array of questions

        questions = sortedCategories.map((category) => ({
            category: category.questions[0].category,
            questions: category.questions[0].questions
        }));

        console.log(questions);

        return questions;
    }

    useEffect(() => {
        console.log('useEffect');
        axios.get('/api/questions', { params: { country: selectedCountry, language } }).then((response) => {
            const data = mergeCategories(response.data);
            setQuestions(data);
            findQuestionById(data, selectedQuestion?.id);
        });
    }, [language, selectedCountry]);

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

    return (
        <Box sx={{ display: 'flex' }}>
            <MiniDrawer
                categories={questions}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedLanguage={language}
                // setSelectedLanguage={setSelectedLanguage}
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
                        {countries.map((country, index) => (
                            <Button
                                variant="contained"
                                type="button"
                                className={`btn country-option ${selectedCountry === country ? 'selected-country' : ''}`}
                                onClick={() => setSelectedCountry(country)}
                            >
                                {countriesLabel[index]}
                            </Button>
                        ))}
                    </Row>
                    <Row>
                        <Col lg={displaySecond ? 6 : 12} md={12} sm={12}>
                            <DashboardGraph
                                ref={chartComponent}
                                country={selectedCountry}
                                selectedQuestion={selectedQuestion}
                                selectedLanguage={language}
                                displaySecond={displaySecond}
                            />
                        </Col>
                        {displaySecond ? (
                            <>
                                <Col lg={6} md={12} sm={12}>
                                    <div className="dashboard">
                                        <DashboardGraph
                                            country={selectedCountry}
                                            selectedQuestion={selectedQuestion}
                                            selectedLanguage={language}
                                            // displaySecond={displaySecond}
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
                                            {dictionary.DELETE}
                                        </Button>
                                    </div>
                                </Col>
                            </>
                        ) : (
                            <div>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={() => {
                                        setDisplaySecond(true);
                                        console.log('v');
                                        console.log(chartComponent.current);
                                    }}
                                    style={{ borderRadius: '0px 0px 12px 12px', marginLeft: '15px' }}
                                    endIcon={<AddIcon />}
                                >
                                    {dictionary.COMPARE}
                                </Button>
                            </div>
                        )}
                    </Row>
                </Box>
            </Box>
        </Box>
    );
}

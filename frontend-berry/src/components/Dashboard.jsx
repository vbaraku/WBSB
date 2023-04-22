import { Button, Box } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import DashboardGraph from './DashboardGraph';
import MiniDrawer from './MiniDrawer';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Row, Col } from 'react-bootstrap';
import useWindowDimensions from 'utils/useWindowDimensions';
import MenuIcon from '@mui/icons-material/Menu';
import { useLanguage } from '../LanguageContext';

export default function Dashboard() {
    const { language, dictionary } = useLanguage();
    const { width } = useWindowDimensions();
    const [countries] = useState(['Albania', 'Kosovo', 'Serbia']);
    const [countryMask, setCountryMask] = useState([true, true, true]);
    const countriesLabel = [dictionary.ALBANIA, dictionary.KOSOVO, dictionary.SERBIA];
    const [displaySecond, setDisplaySecond] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('Kosovo');

    // const [selectedLanguage, setSelectedLanguage] = useState('ALB');

    useEffect(() => {
        if (countryMask[countries.indexOf(selectedCountry)] === false) {
            setSelectedCountry(countries[countryMask.indexOf(true)]);
        }
    }, [countryMask]);
    const ref = useRef(null);

    const chartComponent = useRef(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerWidth = 240;
    function findQuestionById(categoryArray, id) {
        let question = {};
        for (let i = 0; i < categoryArray.length; i += 1) {
            for (let j = 0; j < categoryArray[i].questions.length; j += 1) {
                if (categoryArray[i].questions[j].id === id) {
                    question = categoryArray[i].questions[j];
                    setSelectedQuestion(question);

                    return;
                }
            }
        }

        if (!id) {
            setSelectedQuestion(categoryArray[0]?.questions[0]);
            return;
        }
        setSelectedQuestion(categoryArray[0]?.questions[0]);
    }

    function mergeCategories(categories) {
        // The data comes in the form of an array of categories, each category has an array of questions
        // Some categories have the same name, but start with 3 different first characters. These need to be merged. The first 3 characters dictate the order of the categories

        // First, we need to find the categories that need to be merged
        const categoriesToMerge = {};
        for (let i = 0; i < categories.length; i += 1) {
            const category = categories[i].category;
            if (categoriesToMerge[category.substring(3)]) {
                categoriesToMerge[category.substring(3)].questions = categoriesToMerge[category.substring(3)].questions.concat(
                    categories[i].questions
                );
            } else {
                categoriesToMerge[category.substring(3)] = categories[i];
            }
        }

        // Now we need to sort the categories by the category name
        const sortedCategories = Object.values(categoriesToMerge).sort((a, b) => {
            if (a.category < b.category) {
                return -1;
            }
            if (a.category > b.category) {
                return 1;
            }
            return 0;
        });

        sortedCategories.forEach((category) => {
            category.questions.sort((a, b) => {
                if (a.text < b.text) {
                    return -1;
                }
                if (a.text > b.text) {
                    return 1;
                }
                return 0;
            });
        });

        // remove the first 3 characters from the category name
        sortedCategories.forEach((category) => {
            category.category = category.category.substring(3);
        });

        // now sort the questions by the question rank
        sortedCategories.forEach((category) => {
            category.questions.sort((a, b) => {
                if (a.rank < b.rank) {
                    return -1;
                }
                if (a.rank > b.rank) {
                    return 1;
                }
                return 0;
            });
        });

        return sortedCategories;
    }

    useEffect(() => {
        axios.get('/api/questions', { params: { language } }).then((response) => {
            const data = mergeCategories(response.data);
            setQuestions(data);
            findQuestionById(data, selectedQuestion?.id);
        });
    }, [language]);

    useEffect(() => {
        document.addEventListener('click', (e) => {
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
                        {countries.map(
                            (country, index) =>
                                countryMask[index] && (
                                    <Button
                                        variant="contained"
                                        type="button"
                                        className={`btn country-option ${selectedCountry === country ? 'selected-country' : ''}`}
                                        onClick={() => setSelectedCountry(country)}
                                    >
                                        {countriesLabel[index]}
                                    </Button>
                                )
                        )}
                    </Row>
                    <Row>
                        <Col lg={displaySecond ? 6 : 12} md={12} sm={12}>
                            <DashboardGraph
                                ref={chartComponent}
                                country={selectedCountry}
                                selectedQuestion={selectedQuestion}
                                selectedLanguage={language}
                                displaySecond={displaySecond}
                                countryMask={countryMask}
                                setCountryMask={setCountryMask}
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

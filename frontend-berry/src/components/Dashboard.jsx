import React, { useState, useEffect } from 'react';
import Graphs from './Graphs';
import MiniDrawer from './MiniDrawer';
import { albanianDict, englishtDict, serbianDict } from '../utils/dictionaries';
import axios from 'axios';
import FilterBar from './FilterBar';

export default function Dashboard() {
    const [answers, setAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(1);
    // TODO: add a context for the language || in other words, make the bottom thing dynamic (not always albanian)
    const dict = albanianDict;

    const [filters, setFilters] = useState({
        year: 2021,
        region: dict.ALL,
        regionType: dict.ALL,
        nationality: dict.ALL,
        gender: dict.ALL,
        age: dict.ALL
    });
    useEffect(() => {
        const params = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== dict.ALL) {
                acc[key] = value;
            }
            return acc;
        }, {});
        params.questionId = selectedQuestion;
        params.country = 'Kosova';
        params.language = 'Albanian';

        axios.get('/api/answer', { params }).then((response) => {
            setAnswers(response.data);
        });
    }, [filters, dict.ALL, selectedQuestion]);

    useEffect(() => {
        axios.get('/api/questions', { params: { country: 'Kosova', language: 'Albanian' } }).then((response) => {
            setQuestions(response.data);
        });
    }, []);

    return (
        <div style={{ display: 'flex', marginTop: '100px' }}>
            {/* <QuestionNav></QuestionNav> */}

            <div style={{ width: '15%' }}>
                <MiniDrawer categories={questions} setSelectedQuestion={setSelectedQuestion} />
            </div>
            <div style={{ width: '85%' }}>
                <FilterBar dict={dict} filters={filters} setFilters={setFilters} />

                <Graphs answers={answers} />
            </div>
        </div>
    );
}

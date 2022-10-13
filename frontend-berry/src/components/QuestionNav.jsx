import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuestionNav() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get('/api/questions', { params: { country: 'Kosova', language: 'Albanian' } }).then((response) => {
            setQuestions(response.data);
            console.log(response.data);
        });
    }, []);
    return (
        <div>
            QUESTIONS
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question.text}</p>
                </div>
            ))}
        </div>
    );
}

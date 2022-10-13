package com.example.wbsb.Question;

import java.util.List;
import java.util.stream.Collectors;

public class QuestionDTO {
    String category;
    List<String> questions;

    public QuestionDTO() {
    }

    public QuestionDTO(String category, List<Question> questions) {
        this.category = category;
        this.questions = questions.stream().map(question -> question.getText()).collect(Collectors.toList());
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }
}

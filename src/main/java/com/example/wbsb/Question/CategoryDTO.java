package com.example.wbsb.Question;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryDTO {
    String category;
    List<Question> questions;

    public CategoryDTO() {
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        List<Question> questionDTOS = questions;
        this.questions = questionDTOS;
    }
}

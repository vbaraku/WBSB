package com.example.wbsb.Question;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryDTO {
    String category;
    List<QuestionDTO> questions;

    public CategoryDTO() {
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        List<QuestionDTO> questionDTOS = questions.stream().map(el->{
            return new QuestionDTO(el.getText(),el.getId());
        }).collect(Collectors.toList());
        this.questions = questionDTOS;
    }
}

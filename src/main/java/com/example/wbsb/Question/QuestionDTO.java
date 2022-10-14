package com.example.wbsb.Question;

public class QuestionDTO {
    private String questionText;
    private Integer questionId;

    public QuestionDTO(String questionText, Integer questionId) {
        this.questionText = questionText;
        this.questionId = questionId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }
}

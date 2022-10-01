package com.example.demo.Answers;

public class AnswerDTO {

    private Integer question;
    private Integer rating;

    public AnswerDTO(){}

    public AnswerDTO(Integer question, Long user, Integer Rating) {
        super();
        this.question = question;
        this.rating = rating;
    }

    public Integer getQuestion() {
        return question;
    }

    public void setQuestion(Integer question) {
        this.question = question;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }


}

package com.example.wbsb.Question;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class QuestionMeta  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String country;
    private int year;

    private int questionPosition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns(value = {
            @JoinColumn(name = "question_id",  referencedColumnName = "id"),
            @JoinColumn(name = "question_lang",  referencedColumnName = "language")
    })
    private Question question;

    public QuestionMeta(String country, int year, Question question, int questionPosition) {
        this.country = country;
        this.year = year;
        this.question = question;
        this.questionPosition = questionPosition;
    }

    public QuestionMeta() {
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }


    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }


}

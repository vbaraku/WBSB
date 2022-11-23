package com.example.wbsb.Question;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class QuestionMeta implements Serializable {
    private String country;
    private int year;

    public QuestionMeta(String country, int year) {
        this.country = country;
        this.year = year;
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
}

package com.example.wbsb.Question;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class QuestionMeta implements Serializable {
    private String country;

    public QuestionMeta(String country) {
        this.country = country;
    }

    public QuestionMeta() {
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }


}

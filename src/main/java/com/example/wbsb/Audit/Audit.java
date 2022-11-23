package com.example.wbsb.Audit;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "audit_sequence")
    private Integer id;

    String country;

    String language;

    int year;

    LocalDate timestamp;

    public Audit( String country, String language, int year) {
        this.country = country;
        this.language = language;
        this.year = year;
        this.timestamp = LocalDate.now();
    }

    public Audit() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public LocalDate getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }
}

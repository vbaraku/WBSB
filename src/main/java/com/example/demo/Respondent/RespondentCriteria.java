package com.example.demo.Respondent;

public class RespondentCriteria {
    Integer year;
    String region;
    String regionType;
    String nationality;
    String gender;
    String age;
    String country;
    String language;
    Long questionId;

    public RespondentCriteria(Integer year, String region, String regionType, String nationality, String gender, String age, String country, String language, Long questionId) {
        this.year = year;
        this.region = region;
        this.regionType = regionType;
        this.nationality = nationality;
        this.gender = gender;
        this.age = age;
        this.country = country;
        this.language = language;
        this.questionId = questionId;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getRegionType() {
        return regionType;
    }

    public void setRegionType(String regionType) {
        this.regionType = regionType;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
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

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

}
package com.example.wbsb.Respondent;

//import com.example.demo.Answers.Answers;

import com.example.wbsb.Answers.Answer;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table
public class Respondent {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="emp_sequence")
    @SequenceGenerator(name="emp_sequence", sequenceName = "emp_id_seq", allocationSize = 1000)
    private long id;

    private String region;
    private String regionType;
    private String municipality;
    private String gender;
    private Integer age;
    private String nationality;
    private Integer year;


    @OneToMany(mappedBy = "respondent", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Answer> answers;

    public Respondent(){
        super();
    }

    public Respondent(String region, String regionType, String municipality, String gender, String age, String nationality, Integer year) {
        this.region = region.trim();
        this.regionType = regionType.trim();
        this.municipality = municipality.trim();
        this.gender = gender.trim();
        try{
            this.age = Integer.parseInt(age.trim());
        }catch(NumberFormatException e){
            this.age = 0;
        }
        this.year = year;
        this.nationality = nationality.trim();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}


    //    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
//            cascade = CascadeType.ALL)
//    private Set<Answers> answers;

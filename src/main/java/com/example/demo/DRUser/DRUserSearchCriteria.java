package com.example.demo.DRUser;

public class DRUserSearchCriteria {
    private String country;
    private String vetType;
    private String size;
    private String email;



    public DRUserSearchCriteria(String country, String vetType, String size, String email) {
        this.country = country;
        this.vetType = vetType;
        this.size = size;
        this.email = email;
    }

    public DRUserSearchCriteria(String country, String vetType, String size) {
        this.country = country;
        this.vetType = vetType;
        this.size = size;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getVetType() {
        return vetType;
    }

    public void setVetType(String vetType) {
        this.vetType = vetType;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}

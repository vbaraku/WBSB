package com.example.wbsb.Answers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


public class Filter {
    List<Integer> years;
    List<String> regions;
    List<String> regionTypes;
    List<String> nationalities;
    List<String> genders;

    public Filter() {
    }

    public Filter(List<Integer> years, List<String> regions, List<String> regionTypes, List<String> nationalities, List<String> genders) {
        this.years = years;
        this.regions = regions;
        this.regionTypes = regionTypes;
        this.nationalities = nationalities;
        this.genders = genders;
    }

    public void setYears(List<Integer> years) {
        this.years = years;
    }

    public void setRegions(List<String> regions) {
        this.regions = regions;
    }

    public void setRegionTypes(List<String> regionTypes) {
        this.regionTypes = regionTypes;
    }

    public void setNationalities(List<String> nationalities) {
        this.nationalities = nationalities;
    }

    public void setGenders(List<String> genders) {
        this.genders = genders;
    }

    public List<Integer> getYears() {
        return years;
    }

    public List<String> getRegions() {
        return regions;
    }

    public List<String> getRegionTypes() {
        return regionTypes;
    }

    public List<String> getNationalities() {
        return nationalities;
    }

    public List<String> getGenders() {
        return genders;
    }
}

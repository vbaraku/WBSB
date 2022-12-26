package com.example.wbsb.Answers;

import com.example.wbsb.Respondent.BreakdownQueryDTO;

import java.util.List;

public class BreakdownResponse {
    private List<BreakdownQueryDTO> breakdown;
    private List<String> countries;
    public BreakdownResponse(List<String> countries, List<BreakdownQueryDTO> dto) {
        this.countries = countries;
        this.breakdown = dto;
    }

    public BreakdownResponse() {
    }

    public List<BreakdownQueryDTO> getBreakdown() {
        return breakdown;
    }

    public void setBreakdown(List<BreakdownQueryDTO> breakdown) {
        this.breakdown = breakdown;
    }

    public List<String> getCountries() {
        return countries;
    }

    public void setCountries(List<String> countries) {
        this.countries = countries;
    }

}

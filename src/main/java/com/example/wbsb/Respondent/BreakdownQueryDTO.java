package com.example.wbsb.Respondent;

public class BreakdownQueryDTO {
    private Float percentage;
    private String category;

    public BreakdownQueryDTO(Float percentage, String category) {
        this.percentage = percentage;
        this.category = category;
    }

    public BreakdownQueryDTO() {
    }

    public Float getPercentage() {
        return percentage;
    }

    public void setPercentage(Float percentage) {
        this.percentage = percentage;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}

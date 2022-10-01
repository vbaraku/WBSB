package com.example.demo.DRUser;

public class AverageQuery {
    private Double score;
    private String thematicElement;

    public AverageQuery(Double score, String thematicElement) {
        setScore(score);
        this.thematicElement = thematicElement;
    }

    public AverageQuery(String thematicElement) {
        setScore(0d);
        this.thematicElement = thematicElement;
    }

    public String getId() {
        return thematicElement;
    }

    public void setId(String thematicElement) {
        this.thematicElement = thematicElement;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        if(score == null) this.score = 0d;
        else this.score = score;
    }
}

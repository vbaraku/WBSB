package com.example.wbsb.Respondent;

public class BreakdownQuery {
    private Long count;
    private String answer;

    public BreakdownQuery(Long score, String answer) {
        setCount(score);
        this.answer = answer;
    }

    public BreakdownQuery(String answer) {
        setCount(0L);
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        if(count == null) this.count = 0L;
        else this.count = count;
    }
}

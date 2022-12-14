package com.example.wbsb.Answers;

import com.example.wbsb.Respondent.Respondent;
import com.example.wbsb.Question.Question;

import javax.persistence.*;

@Entity
@Table
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "answer_sequence")
    @SequenceGenerator(name = "answer_sequence", sequenceName = "answer_id_seq", allocationSize = 100000)
    private Integer id;


//	@Column(name = "rating")
//	private Integer rating;

    @ManyToOne(fetch = FetchType.LAZY   )
    @JoinColumns(value = {
			@JoinColumn(name = "question_id",  referencedColumnName = "id"),
			@JoinColumn(name = "question_lang",  referencedColumnName = "language")
	})
    Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "respondent_id"  )
    Respondent respondent;


    String text;

    Integer year;
    public Answer() {
    }

//	public Answer(Integer id, Long userId, Long questionId, String text) {
//		super();
//		this.id = id;
//		this.text = text;
//	}

    public Answer(Respondent respondent, Question question, String text, int year) {
        this.question = question;
        this.respondent = respondent;
        this.year = year;
        this.text = text.replaceAll("^\"|\"$", "").trim();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getText() {
        return text;
    }

//    public void setRating(String text) {
//        this.text = text;
//    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

}

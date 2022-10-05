package com.example.demo.Answers;

import com.example.demo.DRUser.Respondent;
import com.example.demo.Question.Question;
import org.springframework.http.ResponseEntity;

import javax.persistence.*;

@Entity
@Table
public class Answer {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="answer_sequence")
	@SequenceGenerator(name="answer_sequence", sequenceName = "answer_id_seq", allocationSize = 10000)
	private Integer id;


//	@Column(name = "rating")
//	private Integer rating;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "question_id", nullable = false)
	Question question;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "respondent_id", nullable = false)
	Respondent respondent;


	String text;

	public Answer(){}

//	public Answer(Integer id, Long userId, Long questionId, String text) {
//		super();
//		this.id = id;
//		this.text = text;
//	}

	public Answer(Respondent respondent, Question question, String text) {
		this.question = question;
		this.respondent = respondent;
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

	public void setRating(String text) {
		this.text = text;
	}


}

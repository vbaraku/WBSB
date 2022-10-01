package com.example.demo.Answers;

import com.example.demo.DRUser.DRUser;
import com.example.demo.Questions.Questions;

import javax.persistence.*;

@Entity
@Table(name = "answers", uniqueConstraints = {@UniqueConstraint(name="uniqueQuestionAndUser", columnNames = {"question_id","user_id"})})
public class Answers {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "rating")
	private Integer rating;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "question_id", nullable = false)
	Questions question;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	DRUser user;

	public Answers(){}

	public Answers(Integer id, Long userId, Long questionId, Integer rating) {
		super();
		this.id = id;
		this.rating = rating;
	}

	public Answers(AnswerDTO answer, DRUser user, Questions question) {
		this.question = question;
		this.rating = answer.getRating();
		this.user = user;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}


}

package com.example.demo.Question;

//import com.example.demo.Answers.Answers;

import com.example.demo.Answers.Answer;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "question")
public class Question {

	//TODO: Sequence generation strategy
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
//	@Column()

	private Integer id; //CRUD

	private Integer questionCount;

	@Column(length = 1000)
	private String category;

	@Column(length = 5500)
	private String text;

	@Column (length = 32)
	private String language;


	@OneToMany(mappedBy = "question", fetch = FetchType.LAZY,
			cascade = CascadeType.ALL)
	private Set<Answer> answers;
//	@OneToMany
	@ElementCollection

	//TODO: When a csv is processed and we have the same question twice, we just edit countries
	//field instead of adding multiple questions of the same text
	private Set<String> countries;


	public Question(){

	}
	public Question(int questionCount, String category, String text, String language, String country){
		this.questionCount = questionCount;
		this.category = category.replaceAll("^\"|\"$", "");
		this.text = text.replaceAll("^\"|\"$", "");
		this.language = language;
		countries = new HashSet<>();
		countries.add(country);

	}
	//Worth considering adding a year here, in case they want user to be able
	//to filter only questions of a specific year, rather than just answers


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getQuestionCount() {
		return questionCount;
	}

	public void setQuestionCount(Integer questionCount) {
		this.questionCount = questionCount;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public Set<String> getCountries() {
		return countries;
	}

	public void setCountries(Set<String> countries) {
		this.countries = countries;
	}
}

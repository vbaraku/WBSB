package com.example.demo.Question;

//import com.example.demo.Answers.Answers;

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



//
//	@OneToMany(mappedBy = "question", fetch = FetchType.LAZY,
//			cascade = CascadeType.ALL)
//	private Set<Answers> answers;
//	public Questions(){}
//
//	public Questions(Integer id, String thematicElement, String subElement, String statement, String explanation) {
//		super();
//		this.id = id;
//		this.thematicElement = thematicElement;
//		this.subElement = subElement;
//		this.statement = statement;
//		this.explanation = explanation;
//	}
//
//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}
//
//	public String getThematicElement() {
//		return thematicElement;
//	}
//
//	public void setThematicElement(String thematicElement) {
//		this.thematicElement = thematicElement;
//	}
//
//	public String getSubElement() {
//		return subElement;
//	}
//
//	public void setSubElement(String subElement) {
//		this.subElement = subElement;
//	}
//
//	public String getStatement() {
//		return statement;
//	}
//
//	public void setStatement(String statement) {
//		this.statement = statement;
//	}
//
//	public String getExplanation() {
//		return explanation;
//	}
//
//	public void setExplanation(String explanation) {
//		this.explanation = explanation;
//	}
//

}

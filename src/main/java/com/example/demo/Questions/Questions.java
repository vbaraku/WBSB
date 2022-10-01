package com.example.demo.Questions;

import com.example.demo.Answers.Answers;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "questions")
public class Questions {
	
	@Id
//	@Column()
	private Integer id; //CRUD

	private Integer questionCount;

	@Column(length = 1000)
	private String category;

	@Column(length = 5500)
	private String text;

	@Column (length = 32)
	private String language;

	private Set<Countries> countries;

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

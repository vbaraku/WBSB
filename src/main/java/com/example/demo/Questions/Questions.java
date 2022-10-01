package com.example.demo.Questions;

import com.example.demo.Answers.Answers;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "questions")
public class Questions {
	
	@Id
	@Column(name = "Id")
	private Integer id;
	
	@Column(name = "thematic_element", length = 1000)
	private String thematicElement;
	
	@Column(name = "sub_element", length = 1000)
	private String subElement;
	
	
	@Column(name = "Statement", length = 1000)
	private String statement;
	
	@Column(name = "Explanation", length = 5500)
	private String explanation;

	@OneToMany(mappedBy = "question", fetch = FetchType.LAZY,
			cascade = CascadeType.ALL)
	private Set<Answers> answers;
	public Questions(){}
	
	public Questions(Integer id, String thematicElement, String subElement, String statement, String explanation) {
		super();
		this.id = id;
		this.thematicElement = thematicElement;
		this.subElement = subElement;
		this.statement = statement;
		this.explanation = explanation;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getThematicElement() {
		return thematicElement;
	}

	public void setThematicElement(String thematicElement) {
		this.thematicElement = thematicElement;
	}

	public String getSubElement() {
		return subElement;
	}

	public void setSubElement(String subElement) {
		this.subElement = subElement;
	}

	public String getStatement() {
		return statement;
	}

	public void setStatement(String statement) {
		this.statement = statement;
	}

	public String getExplanation() {
		return explanation;
	}

	public void setExplanation(String explanation) {
		this.explanation = explanation;
	}


}

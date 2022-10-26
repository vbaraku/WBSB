package com.example.wbsb.Question;

//import com.example.demo.Answers.Answers;

import com.example.wbsb.Answers.Answer;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Entity
@Table(name = "question")
@IdClass(QuestionId.class)
public class Question {

    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO, generator = "question_sequence")
//    @SequenceGenerator(name = "question_sequence", sequenceName = "question_id_seq", allocationSize = 500)
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String id;

    @Id
    String language;

//    @EmbeddedId
//    QuestionId id;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Answer> answers;


    @Column(length = 5500, unique = true)
    private String text;

    private int count;

    @Column(length = 1000)
    private String category;
    //Worth considering adding a year here, in case they want user to be able
    //to filter only questions of a specific year, rather than just answers


    /*The only way to match two language datasets is to ensure that Q1 of Lang1 is
     * matched with Q1 of Lang2. QuestionOrder stores the position in which a question
     * was placed in when inserted
     */
    @Column(name = "question_meta")
    @ElementCollection
    private Set<QuestionMeta> metaData;


    public Question() {
    }

    public Question(String id, String text, String category, String language) {
        this.id = id;
        setText(text);
        this.text = text;
        this.category = category;
        this.language = language;
    }

    public Question(String text, String category, String language, String country, int count) {
        this.setText(text);
        this.category = category;
        this.metaData = new HashSet<QuestionMeta>();
        this.metaData.add(new QuestionMeta(country));
        this.count = count;
        this.id = UUID.randomUUID().toString();
//        this.country = country;
//        this.id.language = language;
        this.language = language;
    }

    private void setText(String text) {
        this.text = text.trim();
    }

    public Question(String id, String language) {
        this.id = id;
        this.language = language;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }


    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

//    public QuestionId getId() {
//        return id;
//    }
//
//    public void setId(QuestionId id) {
//        this.id = id;
//    }
//
//    public String getLanguage() {
//        return id.language;
//    }
//
//    public void setLanguage(String language) {
//        this.id.language = language;
//    }

    @JsonIgnore
    public Set<QuestionMeta> getMeta() {
        return metaData;
    }


    public void setCountries(Set<QuestionMeta> metaData) {
        this.metaData = metaData;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    //    @JsonInclude(JsonInclude.Include.NON_NULL)
//    public String getLanguage() {
//        return language;
//    }

}

@Embeddable
class QuestionId implements Serializable {
    @Id
            @Column(length = 1000)
    String id;

    @Id
    String language;
}




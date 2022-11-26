package com.example.wbsb.Question;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    //		List<Question> findByThematicElementContaining(String thematicElement);
//    Optional<Question> findById(Integer id);

    @Query("SELECT new Question(q.id, q.text, q.category, q.language) from Question q " +
            " join q.metaData md " +
            "where md.country = :country " +
            "order by md.questionPosition")
    List<Question> findAllByCountry(@Param("country") String country);


    @Query("SELECT new Question(q.id, q.text, q.category, q.language) from Question q " +
            " join q.metaData md " +
            "where md.country = :country " +
            "and md.year = :year " +
            "order by md.questionPosition")
    List<Question> findAllByCountryAndYear(@Param("country") String country, @Param("year") int year);

    List<Question> findAllByLanguage(String language);



    @Query("SELECT new Question(q.id,  q.text, q.category, q.language) from Question q " +
            "join q.metaData md " +
            "where md.country = :country and q.language = :language")
    List<Question> findAllByCountryAndLanguage(String country, String language);

    @Query("SELECT new Question(q.id, q.text, q.category, q.language) from Question q " +
            "join q.metaData md " +
            "where md.country = :country and q.language = :language and md.year = :year")
    List<Question> findAllByCountryAndLanguageAndYear(String country, String language, int year);

}

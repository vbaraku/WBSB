package com.example.wbsb.Question;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    //		List<Question> findByThematicElementContaining(String thematicElement);
    Optional<Question> findById(Integer id);

    @Query("SELECT new Question(q.id, q.text, q.category,md, :language) from Question q" +
            " join q.metaData md " +
            "where md.country = :country")
    List<Question> findAllByCountryAndLanguage(@Param("country") String country, @Param("language") String language);

}

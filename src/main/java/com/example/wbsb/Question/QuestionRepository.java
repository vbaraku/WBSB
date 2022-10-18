package com.example.wbsb.Question;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
//		List<Question> findByThematicElementContaining(String thematicElement);
		Optional<Question> findById(Integer id);
		List<Question> findAllByCountriesAndAndLanguage(String country, String language);
		Optional<Question> findByText(String text);
}

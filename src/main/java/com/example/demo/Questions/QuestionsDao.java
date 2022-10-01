package com.example.demo.Questions;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionsDao extends JpaRepository<Questions, Long> {
		List<Questions> findByThematicElementContaining(String thematicElement);
		Optional<Questions> findById(Integer id);
}

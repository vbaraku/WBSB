package com.example.demo.Question;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

	QuestionRepository questionRepository;

	@Autowired
	public QuestionController(QuestionRepository questionRepository){
		this.questionRepository = questionRepository;
	}
	@GetMapping
	public List<Question> getAllQuestions(@RequestParam String country, @RequestParam String language) {
		try {
			List<Question> questions = new ArrayList<>();
			questionRepository.findAllByCountriesAndAndLanguage(country, language).forEach(questions::add);
			return questions;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}


}

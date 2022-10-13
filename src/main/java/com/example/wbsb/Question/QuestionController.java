package com.example.wbsb.Question;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
	public List<QuestionDTO> getAllQuestions(@RequestParam String country, @RequestParam String language) {
		try {
			List<Question> questions = new ArrayList<>();
			questionRepository.findAllByCountriesAndAndLanguage(country, language).forEach(questions::add);
			Map<String, List<Question>> questionsByCategory = questions.stream().collect(Collectors.groupingBy(Question::getCategory));
			List<QuestionDTO> questionDTOs = new ArrayList<>();
			for (Map.Entry<String, List<Question>> entry : questionsByCategory.entrySet()) {
				QuestionDTO questionDTO = new QuestionDTO();
				questionDTO.setCategory(entry.getKey());
				questionDTO.setQuestions(entry.getValue().stream().map(el->el.getText()).collect(Collectors.toList()));
				questionDTOs.add(questionDTO);
			}
			return questionDTOs;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}







}

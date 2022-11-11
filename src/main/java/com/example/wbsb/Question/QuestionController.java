package com.example.wbsb.Question;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

	QuestionRepository questionRepository;

	@Autowired
	public QuestionController(QuestionRepository questionRepository){
		this.questionRepository = questionRepository;
	}
	@GetMapping
	public List<CategoryDTO> getAllQuestions(@RequestParam String country, @RequestParam String language) {
		try {
			List<Question> questions = new ArrayList<>();
			questionRepository.findAllByCountryAndLanguage(country, language).forEach(questions::add);
//			SortedMap<String, List<Question>> questionsByCategory = questions.stream().collect(Collectors.toMap(Question::getCategory,Question::getText, (v1->v2)));
			LinkedHashMap<String, List<Question>> questionsByCategory = new LinkedHashMap<>();
			questions.stream().forEach(question ->
			{
				String category = question.getCategory();
				if (questionsByCategory.containsKey(category)){
					questionsByCategory.get(category).add(question);
				}else{
					ArrayList list = new ArrayList();
					list.add(question);
					questionsByCategory.put(category,list);

				}
			});
			List<CategoryDTO> questionDTOs = new ArrayList<>();
			for (Map.Entry<String, List<Question>> entry : questionsByCategory.entrySet()) {
				CategoryDTO questionDTO = new CategoryDTO();
				questionDTO.setCategory(entry.getKey());
				questionDTO.setQuestions(entry.getValue());
				questionDTOs.add(questionDTO);
			}
			return questionDTOs;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping(path = "/{id}")
	public Question getQuestion(@RequestParam String country, @RequestParam String language, @PathVariable int id) {
			List<Question> question = questionRepository.findAllByCountryAndLanguage(country,language);
			return question.get(id);
	}






}

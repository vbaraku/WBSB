package com.example.wbsb.Question;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
	public List<CategoryDTO> getAllQuestions(@RequestParam String language) {
		try {
			HashMap<String,Question> questionMap = new HashMap<>();
			questionRepository.findAllByLanguageOrderByText(language).forEach(element -> {
				questionMap.put(element.getText(), element);
			});

			//remove questions with the same text property
			LinkedList<Question> questions = questionMap.values().stream().collect(Collectors.toCollection(LinkedList::new));
			LinkedHashMap<String, List<Question>> questionsByCategory = new LinkedHashMap<>();
			System.out.println(questions.size());

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

			//sort questions by category (categories have a number in the beginning)
			questionDTOs.sort(Comparator.comparing(CategoryDTO::getCategory));

			return questionDTOs;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@PostMapping("/order")
	@Transactional
	public ResponseEntity<?> changeOrder(@RequestBody Object[] changes){
		HashMap[] changesArray = Arrays.copyOf(changes, changes.length, HashMap[].class);
		for (HashMap change : changesArray){
			String id = change.get("id").toString();
			int rank = Integer.parseInt(change.get("value").toString());
			System.out.println(id + " " + rank);
			questionRepository.updateRank(id, rank);
		}
//		questionRepository./*/
		return ResponseEntity.ok().build();
	}



	@GetMapping(path = "/{id}")
	public Question getQuestion(@RequestParam String country, @RequestParam String language, @PathVariable int id) {
			List<Question> question = questionRepository.findAllByCountryAndLanguage(country,language);
			return question.get(id);
	}

//	@GetMapping(path = "/details")
//	public List<String> getQuestionById(@RequestParam String id, @RequestParam String language) {
//		return question;
//	}
}

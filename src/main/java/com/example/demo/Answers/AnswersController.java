package com.example.demo.Answers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.example.demo.DRUser.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin(origins = "http://localhost:3000")
public class AnswersController {
	
	@Autowired
	AnswersDao answersDao;

	@Autowired
	AnswersService answersService;

	@Autowired
	DRUserDao userDao;

	@Autowired
	DRUserCriteriaRepository userCriteriaRepository;

	@GetMapping
	public List<Answers> getAllAnswers(@RequestParam(required = false) String userId) {
		try {
			List<Answers> answers = new ArrayList<>();
			if (userId == null)
				answersDao.findAll().forEach(answers::add);
			else
				answersDao.findByUserIdContaining(userId).forEach(answers::add);
			if (answers.isEmpty()) {
				return null;
			}
			return answers;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("/completed")
	public Long getNumberOfCompletions(
			@RequestParam(required = false) String country,
			@RequestParam(required = false) String size,
			@RequestParam(required = false) String vetType,
			@RequestParam(required = false) Boolean self,
			Principal principal

	) {
		try {
			DRUserSearchCriteria criteria;

			if(self != null && self==true){
				criteria = new DRUserSearchCriteria(country,vetType, size, principal.getName());
			}else{
				criteria = new DRUserSearchCriteria(country,vetType, size);
			}
			return userCriteriaRepository.countAllCompleted(criteria);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

		@GetMapping("/average")
	public Double getAverage(
			@RequestParam(required = false) String country,
			@RequestParam(required = false) String size,
			@RequestParam(required = false) String vetType,
			@RequestParam(required = false) Boolean self,
			Principal principal
	) {
		try {
			DRUserSearchCriteria criteria;
			if(self != null && self==true){
				criteria = new DRUserSearchCriteria(country,vetType, size, principal.getName());
			}else{
				criteria = new DRUserSearchCriteria(country,vetType, size);
			}
			return userCriteriaRepository.getAverageScore(criteria);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("/average_thematic")
	public Map<String, Double> getAverageByThematic(
			@RequestParam(required = false) String country,
			@RequestParam(required = false) String size,
			@RequestParam(required = false) String vetType,
			@RequestParam(required = false) Boolean self,
			Principal principal
	) {
		try {
			DRUserSearchCriteria criteria;

			if(self != null && self==true){
				criteria = new DRUserSearchCriteria(country,vetType, size, principal.getName());
			}else{
				criteria = new DRUserSearchCriteria(country,vetType, size);
			}
			return userCriteriaRepository.getAverageScoreByThematic(criteria);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}


	@PostMapping("/bulk_submit")
	public List<Answers> bulkSubmit(@RequestBody ArrayList<AnswerDTO> answers, Principal principal) {
		System.out.println(principal.toString());
		try {
			return answersService.insertAnswers(answers, principal.getName());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
//		return answers;
	}
	

}

package com.example.demo.Answers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import com.example.demo.Respondent.Respondent;
import com.example.demo.Respondent.RespondentCriteria;
import com.example.demo.Respondent.RespondentCriteriaRepository;
import com.example.demo.Respondent.RespondentRepository;
import com.example.demo.Question.Question;
import com.example.demo.Question.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@RestController
@RequestMapping("/api/answer")
public class AnswerController {

    QuestionRepository questionRepository;

    RespondentRepository respondentRepository;

    AnswerRepository answerRepository;

    RespondentCriteriaRepository respondentCriteriaRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    public AnswerController(QuestionRepository questionRepository,
                            RespondentRepository respondentRepository,
                            AnswerRepository answerRepository,
                            RespondentCriteriaRepository respondentCriteriaRepository
    ) {
        this.questionRepository = questionRepository;
        this.respondentRepository = respondentRepository;
        this.answerRepository = answerRepository;
        this.respondentCriteriaRepository = respondentCriteriaRepository;
    }

    public AnswerController() {

    }

//
//	@Autowired
////	AnswersService answersService;
//
//	@Autowired
////	DRUserDao userDao;

//	@Autowired
//	DRUserCriteriaRepository userCriteriaRepository;

    @PostMapping(consumes = "multipart/form-data")
    @Transactional
    public ResponseEntity<?> uploadCSV(@RequestPart MultipartFile file) {

        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), "ISO-8859-1"));
            String line = reader.readLine();
            List<Question> questions = insertQuestions(line);

            List<String> row;
            List<Respondent> respondents = new ArrayList<>();
            List<Answer> answers = new ArrayList<>();
            int count = 0;
            while ((line = reader.readLine()) != null) {
                row = Arrays.asList(line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)"));
                Respondent respondent = new Respondent(
                        row.get(0),
                        row.get(1),
                        row.get(2),
                        row.get(3),
                        row.get(4),
                        row.get(5),
                        2021
                );
                //TODO: Do something about the year above, maybe from form, idfk

                int index = 6; // change to 7 if empty column maybe, or remove empty column in csv processing
                //7:1, 8:2, 9:3
                for (Question question : questions) {
                    Answer answer = new Answer(respondent, question, row.get(index++));
                    answers.add(answer);
                }
                count++;
                respondents.add(respondent);
            }

            respondentRepository.saveAll(respondents);
            answerRepository.saveAll(answers);
            /*
                Question q = text.get();

             */


        } catch (IOException io) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok().build();
//        Object obj = selectedFile;
//        System.out.println(selectedFile.getOriginalFilename());
//        return ResponseEntity.ok(selectedFile.getName());
    }

    private List<Question> insertQuestions(String line) throws IOException {
        List<String> headers = Arrays.asList(line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)"));
        //TODO: Discuss with client about adding filters/demographics (needs developer intervention)
        //TODO: Inform client to add column between user/answer with category name
        headers = headers.subList(6, headers.size());

        AtomicInteger questionCount = new AtomicInteger();
        List<Question> questions = headers.stream().map((question) -> {
            return new Question(questionCount.getAndIncrement(), "Sample Category", question, "Albanian", "Kosova");
        }).collect(Collectors.toList());

        questionRepository.saveAll(questions);
        return questions;
    }

    @GetMapping
    public Map<String, Float> getAnswerBreakdown(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String regionType,
            @RequestParam(required = false) String nationality,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String age,
            @RequestParam String country,
            @RequestParam String language,
            @RequestParam Long questionId
    ) {
        try {
            Map<String, Float> answers = new HashMap<>();
            RespondentCriteria criteria = new RespondentCriteria(year, region, regionType, nationality, gender, age, country, language, questionId);
            answers = respondentCriteriaRepository.getBreakdown(criteria);
            return answers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
//
//	@GetMapping("/completed")
//	public Long getNumberOfCompletions(
//			@RequestParam(required = false) String country,
//			@RequestParam(required = false) String size,
//			@RequestParam(required = false) String vetType,
//			@RequestParam(required = false) Boolean self,
//			Principal principal
//
//	) {
//		try {
//			DRUserSearchCriteria criteria;
//
//			if(self != null && self==true){
//				criteria = new DRUserSearchCriteria(country,vetType, size, principal.getName());
//			}else{
//				criteria = new DRUserSearchCriteria(country,vetType, size);
//			}
//			return userCriteriaRepository.countAllCompleted(criteria);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}
//
//		@GetMapping("/average")
//	public Double getAverage(
//			@RequestParam(required = false) String country,
//			@RequestParam(required = false) String size,
//			@RequestParam(required = false) String vetType,
//			@RequestParam(required = false) Boolean self,
//			Principal principal
//	) {
//		try {
//			DRUserSearchCriteria criteria;
//			if(self != null && self==true){
//				criteria = new DRUserSearchCriteria(country,vetType, size, principal.getName());
//			}else{
//				criteria = new DRUserSearchCriteria(country,vetType, size);
//			}
//			return userCriteriaRepository.getAverageScore(criteria);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}
//
//	@GetMapping("/average_thematic")
//	public Map<String, Double> getAverageByThematic(
//			@RequestParam(required = false) String country,
//			@RequestParam(required = false) String size,
//			@RequestParam(required = false) String vetType,
//			@RequestParam(required = false) Boolean self,
//			Principal principal
//	) {
//		try {
//			DRUserSearchCriteria criteria;
//
//			if(self != null && self==true){
//				criteria = new DRUserSearchCriteria(country,vetType, size, principal.getName());
//			}else{
//				criteria = new DRUserSearchCriteria(country,vetType, size);
//			}
//			return userCriteriaRepository.getAverageScoreByThematic(criteria);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}
//
//
//	@PostMapping("/bulk_submit")
//	public List<Answers> bulkSubmit(@RequestBody ArrayList<AnswerDTO> answers, Principal principal) {
//		System.out.println(principal.toString());
//		try {
//			return answersService.insertAnswers(answers, principal.getName());
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
////		return answers;
//	}


}

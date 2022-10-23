package com.example.wbsb.Answers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import com.example.wbsb.Question.QuestionMeta;
import com.example.wbsb.Respondent.*;
import com.example.wbsb.Question.Question;
import com.example.wbsb.Question.QuestionRepository;
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

    @PostMapping(consumes = "multipart/form-data")
    @Transactional
    public ResponseEntity<?> uploadCSV(@RequestPart MultipartFile file, @RequestPart String country, @RequestPart String language) {

        System.out.println(country);
        System.out.println(language);
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), "ISO-8859-1"));
            String line = reader.readLine();
            List<String> headers = Arrays.asList(line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)"));

            String duplicateQuestion = getDuplicate(headers);
            if(duplicateQuestion != null){
                return ResponseEntity.status(400).body("One of the questions is duplicated: \n" + duplicateQuestion);
            }


            List<Question> questions = insertQuestions(headers, language, country);

            List<String> row;
            List<Respondent> respondents = new ArrayList<>();
            List<Answer> answers = new ArrayList<>();
            while ((line = reader.readLine()) != null) {
                row = Arrays.asList(line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)"));
                Respondent respondent = new Respondent(
                        row.get(0),
                        row.get(1),
                        row.get(2),
                        row.get(3),
                        row.get(4),
                        row.get(5),
                        2021,
                        country,
                        language
                );
                //TODO: Do something about the year above, maybe from form, idfk

                int index = 6; // change to 7 if empty column maybe, or remove empty column in csv processing
                //7:1, 8:2, 9:3
                for (Question question : questions) {
                    while (headers.get(index).contains("Category:")) {
                        index++;
                    }
                    if(row.get(index).equals("")){
                        index++;
                        continue;
                    }
                    Answer answer = new Answer(respondent, question, row.get(index++));
                    answers.add(answer);
                }
                respondents.add(respondent);
            }

            respondentRepository.saveAll(respondents);
            answerRepository.saveAll(answers);


        } catch (IOException io) {
            return ResponseEntity.status(500).build();
        }
        System.out.println("ok :)");
        return ResponseEntity.ok().build();
//        Object obj = selectedFile;
//        System.out.println(selectedFile.getOriginalFilename());
//        return ResponseEntity.ok(selectedFile.getName());
    }

    private String getDuplicate(List<String> list){
        Map<String, Integer> stringCount = new HashMap<>();
        for(String element : list) {
            if (stringCount.containsKey(element)) {
                return element;
            }
            stringCount.put(element, 1);
        }
        return null;

    }

    @GetMapping("/filters")
    public Filter getFilters(
            @RequestParam String country,
            @RequestParam String language,
            @RequestParam Long questionId
    ) {
        RespondentCriteria criteria = new RespondentCriteria(country, language, questionId);
        List<String> regions = respondentCriteriaRepository.getFilters(criteria, "region").stream().map(el -> (String) el).collect(Collectors.toList());
        List<String> nationalities = respondentCriteriaRepository.getFilters(criteria, "nationality").stream().map(el -> (String) el).collect(Collectors.toList());
        List<String> regionTypes = respondentCriteriaRepository.getFilters(criteria, "regionType").stream().map(el -> (String) el).collect(Collectors.toList());
        List<String> genders = respondentCriteriaRepository.getFilters(criteria, "gender").stream().map(el -> (String) el).collect(Collectors.toList());
        List<Integer> years = respondentCriteriaRepository.getFilters(criteria, "year").stream().map(el -> (Integer) (el)).collect(Collectors.toList());

        Filter filters = new Filter(years, regions, regionTypes, nationalities, genders);

        return filters;
    }

    private List<Question> insertQuestions(List<String> headers, String language, String country) throws IOException {
        //TODO: Discuss with client about adding filters/demographics (needs developer intervention)
        //TODO: Inform client to add column between user/answer with category name
        headers = headers.subList(6, headers.size());

        String currentCategory = "";
        List<Question> questions = new ArrayList<>();
        AtomicInteger questionCount = new AtomicInteger();
        AtomicInteger categoryIndex = new AtomicInteger();

        for (String element : headers) {
            element = element.replaceAll("^\"|\"$", "");
            if (element.contains("Category:")) {
                currentCategory = element.replace("Category: ", "");
                categoryIndex.incrementAndGet();
            } else {

                Optional<Question> question = null;



                if( !question.isPresent()) {
                    Question newQ = new Question(
                            element,
                            currentCategory,
                            language,
                            country);
//                    newQ.setText(element, language);
//                    newQ.setCategory(currentCategory, language);
                    questions.add(newQ);

                }else{
                    Question q1 = question.get();
                    q1.getMeta().add(new QuestionMeta(country));
                    questions.add(q1);
                }
            }

        }

        questionRepository.saveAll(questions);
        return questions;
    }

    @GetMapping
    public List<BreakdownQueryDTO> getAnswerBreakdown(
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
            RespondentCriteria criteria = new RespondentCriteria(year, region, regionType, nationality, gender, age, country, language, questionId);
            return respondentCriteriaRepository.getBreakdown(criteria);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

package com.example.wbsb.Answers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Blob;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import com.example.wbsb.Audit.Audit;
import com.example.wbsb.Audit.AuditRepository;
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

    AuditRepository auditRepository;
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    public AnswerController(QuestionRepository questionRepository,
                            RespondentRepository respondentRepository,
                            AnswerRepository answerRepository,
                            RespondentCriteriaRepository respondentCriteriaRepository,
                            AuditRepository auditRepository
    ) {
        this.questionRepository = questionRepository;
        this.respondentRepository = respondentRepository;
        this.answerRepository = answerRepository;
        this.respondentCriteriaRepository = respondentCriteriaRepository;
        this.auditRepository = auditRepository;
    }

    public AnswerController() {

    }

    @PostMapping(consumes = "multipart/form-data")
    @Transactional
    public ResponseEntity<?> uploadCSV(@RequestPart MultipartFile file, @RequestPart String country, @RequestPart String language, @RequestPart(name = "year") String yearString) {
        int year = Integer.parseInt(yearString);
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
            String line = reader.readLine();
            List<String> headers = Arrays.asList(line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"));

            List<String> duplicateQuestion = getDuplicate(headers);
            if (duplicateQuestion.size() > 0) {
                return ResponseEntity.status(400).body("One of the questions is duplicated: \n" + duplicateQuestion);
            }


            List<Question> questions = insertQuestions(headers, language, country, year);

            List<String> row;
            List<Respondent> respondents = new ArrayList<>();
            List<Answer> answers = new ArrayList<>();
            while ((line = reader.readLine()) != null) {
                row = Arrays.asList(line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)"));
                Respondent respondent;
                try {
                    respondent = new Respondent(
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
                } catch (Exception e) {
                    return ResponseEntity.status(400).body("Respondent data is not valid");
                }
                //TODO: Do something about the year above, maybe from form, idfk

                int index = 6; // change to 7 if empty column maybe, or remove empty column in csv processing
                for (Question question : questions) {
                    if(headers.get(index).contains("Category:")){
                        index++;
                    }

                    if (row.get(index).trim().equals("")) {
                        index++;
                        continue;
                    }
                    Answer answer = new Answer(respondent, question, row.get(index), year);
                    index++;
                    answers.add(answer);
                }
                respondents.add(respondent);
            }

            respondentRepository.saveAll(respondents);
            answerRepository.saveAll(answers);


        } catch (IOException io) {
            return ResponseEntity.status(500).build();
        }

        auditRepository.save(new Audit(country,language,year));
        return ResponseEntity.ok().build();
//        Object obj = selectedFile;
//        System.out.println(selectedFile.getOriginalFilename());
//        return ResponseEntity.ok(selectedFile.getName());
    }

    private List<String> getDuplicate(List<String> list) {
        Map<String, Integer> stringCount = new HashMap<>();
        List<String> duplicates = new ArrayList<>();
        for (String element : list) {
            if (stringCount.containsKey(element)) {
                duplicates.add(element);
            }else{
                stringCount.put(element, 1);
            }
        }
        return duplicates;

    }

    @GetMapping("/filters")
    public Filter getFilters(
            @RequestParam String country,
            @RequestParam String language,
            @RequestParam String questionId
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

    private List<Question> insertQuestions(List<String> headers, String language, String country, int year) throws IOException {
        //TODO: Discuss with client about adding filters/demographics (needs developer intervention)
        //TODO: Inform client to add column between user/answer with category name
        headers = headers.subList(6, headers.size());

        String currentCategory = "";
        List<Question> questions = new ArrayList<>();

        //1. If dataset exists in different language, zip them up
        List<Question> storedQuestions = questionRepository.findAllByCountryAndYear(country, year);

        if (storedQuestions.size() > 0) {
            matchByCountry(headers, language, country, year, currentCategory, questions, storedQuestions);
        } else {
            // 2. If dataset is new, insert all questions, but don't insert duplicates
            List<Question> questionsByLanguage = questionRepository.findAllByLanguage(language);
            HashMap<String, Question> storedQuestionsMap = new HashMap<>();

            for (Question q : questionsByLanguage) {
                storedQuestionsMap.put(q.getText(), q);
            }
            for (int i = 0; i<headers.size(); i++){
                String element = headers.get(i);
                element = element.replaceAll("^\"|\"$", "").trim();
                if (element.contains("Category:")) {
                    currentCategory = element.replace("Category: ", "");
                    continue;
                }
                //If question doesn't exist, insert it
                if(storedQuestionsMap.get(element) == null){
                    questions.add(new Question(
                            element,
                            currentCategory,
                            language,
                            country,
                            i,
                            year));
                }else{
                    //If question exists, add meta info about it (country and year)
                    Question q1 = storedQuestionsMap.get(element);
                    q1.getMeta().add(new QuestionMeta(country, year));
                    questions.add(q1);
                }

            }
        }
        questionRepository.saveAll(questions);
        questionRepository.flush();
        return questions;
    }

    private static void matchByCountry(List<String> headers, String language, String country, int year, String currentCategory, List<Question> questions, List<Question> storedQuestions) {
        AtomicInteger count = new AtomicInteger(0);
        for (String element : headers) {
            element = element.replaceAll("^\"|\"$", "");
            if (element.contains("Category:")) {
                currentCategory = element.replace("Category: ", "");
                continue;
            }
            Question newQ = new Question(
                    element,
                    currentCategory,
                    language,
                    country,
                    count.getAndIncrement(),
                    year);
            questions.add(newQ);
        }

        for (int i = 0; i < storedQuestions.size(); i++) {
            questions.get(i).setId(storedQuestions.get(i).getId());
        }
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
            @RequestParam String questionId
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

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
import com.example.wbsb.Question.*;
import com.example.wbsb.Respondent.*;
import org.hibernate.Hibernate;
import org.hibernate.Session;
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

    QuestionMetaRepository questionMetaRepository;
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    public AnswerController(QuestionRepository questionRepository,
                            RespondentRepository respondentRepository,
                            AnswerRepository answerRepository,
                            RespondentCriteriaRepository respondentCriteriaRepository,
                            AuditRepository auditRepository,
                            QuestionMetaRepository questionMetaRepository
    ) {
        this.questionRepository = questionRepository;
        this.respondentRepository = respondentRepository;
        this.answerRepository = answerRepository;
        this.respondentCriteriaRepository = respondentCriteriaRepository;
        this.auditRepository = auditRepository;
        this.questionMetaRepository = questionMetaRepository;
    }

    public AnswerController() {

    }

    @PostMapping(consumes = "multipart/form-data")
    @Transactional
    public ResponseEntity<?> uploadCSV(@RequestPart MultipartFile file, @RequestPart String country, @RequestPart String language, @RequestPart(name = "year") String yearString) {
        int year = Integer.parseInt(yearString);
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), "ISO-8859-1"));
            String line = reader.readLine();
            List<String> headers = Arrays.asList(line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"));

            List<String> duplicateQuestion = getDuplicate(headers);
            if (duplicateQuestion.size() > 0) {
                return ResponseEntity.status(400).body("One of the questions is duplicated: \n" + duplicateQuestion);
            }


            List<Question> questions = insertQuestions(headers, language, country, year);

            System.out.println(questions.size());
            List<String> row;
            List<Respondent> respondents = new ArrayList<>();
            List<Answer> answers = new ArrayList<>();
            while ((line = reader.readLine()) != null) {
                row = Arrays.asList(line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)"));
                Respondent respondent;
                if(row.size() < 6)
                    System.out.println(row);
                try {
                    respondent = new Respondent(
                            row.get(0),
                            row.get(1),
                            row.get(2),
                            row.get(3),
                            row.get(4),
                            row.get(5),
                            year,
                            country,
                            language
                    );
                } catch (Exception e) {
                    e.printStackTrace();
                    return ResponseEntity.status(400).body("Respondent data is not valid");
                }

                int index = 6; // change to 7 if empty column maybe, or remove empty column in csv processing
                try {
                    for (Question question : questions) {
                        if (headers.get(index).contains("Category:")) {
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
                } catch (Exception e) {
                    return ResponseEntity.status(400).body("Answer data is not valid");
                }
                respondents.add(respondent);
            }

            respondentRepository.saveAll(respondents);
            answerRepository.saveAll(answers);


        } catch (IOException io) {
            return ResponseEntity.status(500).build();
        }

        auditRepository.save(new Audit(country,language,year));
        List<Audit> audits = auditRepository.findAll();
        return ResponseEntity.ok(audits);
    }

    @GetMapping("/audit")
    public ResponseEntity<?> getAudit(){
        List<Audit> audits = auditRepository.findAll();
        return ResponseEntity.ok(audits);
    }

    private List<String> getDuplicate(List<String> list) {
        Map<String, Integer> stringCount = new HashMap<>();
        List<String> duplicates = new ArrayList<>();
        for (String element : list) {
            if (stringCount.get(element) == null) {
                stringCount.put(element, 1);
            }else{
                duplicates.add(element);

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
        headers = headers.subList(6, headers.size());

        List<Question> questions = new ArrayList<>();

        //1. If dataset exists in different language, zip them up
        List<Question> storedQuestions = questionRepository.findAllByCountryAndYear(country, year);
        // Remove duplicate IDs from stored questions
        storedQuestions = removeDuplicateIds(storedQuestions);
        if (storedQuestions.size() > 0) { //if dataset exists
            questions = matchByCountry(headers, language, country, year, storedQuestions);
        }else{
            questions = headerToList(headers, language, country, year);
        }
        questions = matchByLanguage(questions, language, country, year);
//        List<QuestionMeta> questionMetas = questions.stream().map(q -> new QuestionMeta(country,year,language, q)).collect(Collectors.toList());
        List<QuestionMeta> questionMetas = new ArrayList<>();
        for (int i = 0; i < questions.size(); i++) {
            QuestionMeta questionMeta = new QuestionMeta(country,year, questions.get(i),i);
            questionMetas.add(questionMeta);
        }

        questionMetaRepository.saveAll(questionMetas);
        questionRepository.flush();
        return questions;
    }

    private List<Question> removeDuplicateIds(List<Question> questions){
        if (questions.size() == 0) return questions;
        Question q1 = questions.get(0);
        // Remove questions with language other than q1's
        questions = questions.stream().filter(q -> q.getLanguage().equals(q1.getLanguage())).collect(Collectors.toList());

        return questions;
    }
    private List<Question> headerToList(List<String> headers, String language, String country, int year) {
        List<Question> questions = new ArrayList<>();
        String currentCategory = "";
        int categoryIndex = 1;
        for (int i = 0; i<headers.size(); i++){
            String element = headers.get(i);
            element = element.replaceAll("^\"|\"$", "").trim();
            if (element.contains("Category:")) {
                currentCategory = element.replace("Category: ", String.format("%02d", categoryIndex++)+"-") ;
                continue;
            }
            questions.add(new Question(
                    element,
                    currentCategory,
                    language));
        }
        return questions;
    }


    private List<Question> matchByLanguage(List<Question> questions, String language, String country, int year){
        // 2. If dataset is new, insert all questions, but don't insert duplicates
        List<Question> questionsByLanguage = questionRepository.findAllByLanguage(language);
        HashMap<String, Question> storedQuestionsMap = new HashMap<>();
        List<Question> newQuestions = new ArrayList<>();
        int inIf = 0;
        int inElse = 0;
        for (Question q : questionsByLanguage) {
            storedQuestionsMap.put(q.getText(), q);
        }
        for (int i = 0; i<questions.size(); i++) {
            String element = questions.get(i).getText();
            //If question doesn't exist, insert it
            if (storedQuestionsMap.get(element) == null) {
                newQuestions.add(questions.get(i));

                inIf++;
            } else {
                //If question exists, add meta info about it (country and year)

                Question q = storedQuestionsMap.get(element);
                if(!q.getId().equals(questions.get(i).getId())){
       /*             System.out.println("ID mismatch");
                    System.out.println(q.getId());
                    System.out.println(questions.get(i).getId());*/
                }
                newQuestions.add(q);
                inElse++;
            }
        }
//        System.out.println("Unique questions: " + inIf);
//        System.out.println("Repeated questions: " + inElse);
//        System.out.println("Total questions before saveall: " + questionRepository.findAll().size());
        List<Question> questions1 = questionRepository.saveAll(newQuestions);
//        System.out.println("Total questions after saveall: " + questionRepository.findAll().size());

        questionRepository.flush();
        return questions1;
    }


    private static List<Question> matchByCountry(List<String> headers, String language, String country, int year, List<Question> storedQuestions) {
        List<Question> questions = new ArrayList<>();
        AtomicInteger count = new AtomicInteger(0);
        String currentCategory = "";
        int categoryIndex = 1;
        for (String element : headers) {
            element = element.replaceAll("^\"|\"$", "");

            if (element.contains("Category:")) {
                currentCategory = element.replace("Category: ", String.format("%02d", categoryIndex++)+"-");
                continue;
            }
            Question newQ = new Question(
                    element,
                    currentCategory,
                    language);
            questions.add(newQ);
        }

        //Question 1 in english will be the same id as question 1 in albanian
        System.out.println(storedQuestions.size());
        for (int i = 0; i < storedQuestions.size(); i++) {
            questions.get(i).setId(storedQuestions.get(i).getId());
        }
        return questions;
    }

    @GetMapping
    public ResponseEntity<?> getAnswerBreakdown(
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
            List<String> countries = questionRepository.findQuestionByIdAndLang(questionId, language);
            List<BreakdownQueryDTO> dto =  respondentCriteriaRepository.getBreakdown(criteria);
            return ResponseEntity.ok().body(new BreakdownResponse(countries, dto));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

package com.example.demo.Answers;

import com.example.demo.DRUser.DRUser;
import com.example.demo.DRUser.DRUserDao;
import com.example.demo.Questions.Questions;
import com.example.demo.Questions.QuestionsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AnswersService {

    AnswersDao answersDao;
    DRUserDao userDao;
    QuestionsDao questionsDao;


    @Autowired
    public AnswersService(AnswersDao answersDao, DRUserDao userDao, QuestionsDao questionsDao) {
        this.answersDao = answersDao;
        this.userDao = userDao;
        this.questionsDao = questionsDao;
    }

    public List<Answers> insertAnswers(ArrayList<AnswerDTO> answers, String  email) {
        DRUser user = userDao.findByEmail(email).get();
        List<Answers> answerList = answers.stream().map(answer-> {
            Questions question = questionsDao.findById(answer.getQuestion()).get();
            return new Answers(answer, user, question);
                }
        ).collect(Collectors.toList());
        try {
            answersDao.saveAll(answerList);
        }catch (DataIntegrityViolationException e){
            e.printStackTrace();
        }
        return answerList;
    }
}

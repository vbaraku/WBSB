package com.example.wbsb.Respondent;

import com.example.wbsb.Answers.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.*;

@Repository
public class RespondentCriteriaRepository {
    private final EntityManager em;
    private final CriteriaBuilder cb;

    @Autowired
    public RespondentCriteriaRepository(EntityManager em) {
        this.em = em;
        this.cb = em.getCriteriaBuilder();
    }



    public List<BreakdownQueryDTO> getBreakdown(RespondentCriteria respondentCriteria) {
        CriteriaQuery<BreakdownQuery> criteriaQuery = cb.createQuery(BreakdownQuery.class);
        Root<Respondent> respondentRoot = criteriaQuery.from(Respondent.class);


        Join<Respondent, Answer> answers = respondentRoot.join("answers", JoinType.INNER);
//        Join<Questions, Answers> questions = answers.join("question", JoinType.INNER);
        Predicate predicate = getPredicate(respondentCriteria, respondentRoot, answers);

        criteriaQuery.multiselect(cb.count(answers.get("id")), answers.get("text"))
                .where(predicate)
                .groupBy(answers.get("text"));

        TypedQuery<BreakdownQuery> typedQuery = em.createQuery(criteriaQuery);
        List<BreakdownQuery> res = typedQuery.getResultList();
        Long sum = res.stream().mapToLong(el -> el.getCount()).sum();
        List<BreakdownQueryDTO> resList = new ArrayList<BreakdownQueryDTO>();
        res.forEach(el -> resList.add(new BreakdownQueryDTO(((float) el.getCount() / sum * 100f), el.getAnswer())));

        return resList;
    }


    private Predicate getPredicate(RespondentCriteria userSearchCriteria,
                                   Root<Respondent> userRoot,
                                   Join<Respondent, Answer> answerRoot) {
        List<Predicate> predicateList = new ArrayList<>();


        if (userSearchCriteria.getGender() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("gender"), userSearchCriteria.getGender())
            );
        }

        if (userSearchCriteria.getNationality() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("nationality"), userSearchCriteria.getNationality())
            );
        }

        if (userSearchCriteria.getRegion() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("region"), userSearchCriteria.getRegion())
            );
        }

        if (userSearchCriteria.getRegionType() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("regionType"), userSearchCriteria.getRegionType())
            );
        }

        if (userSearchCriteria.getYear() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("year"), userSearchCriteria.getYear())
            );
        }

        predicateList.add(
                cb.equal(answerRoot.get("question"), userSearchCriteria.getQuestionId())
        );

        predicateList.add(
                cb.equal(userRoot.get("country"), userSearchCriteria.getCountry())
        );
        predicateList.add(
                cb.equal(userRoot.get("language"), userSearchCriteria.getLanguage())
        );

        String age = userSearchCriteria.getAge();
        if (age != null) {
            Predicate predicate;

            if (age.equals("65+")) {
                predicate = cb.greaterThanOrEqualTo(userRoot.get("age"), 65);
            } else {
                String[] ages = age.split("-");
                int startAge = Integer.parseInt(ages[0]);
                int endAge = Integer.parseInt(ages[1]);
                predicate = cb.between(userRoot.get("age"), startAge, endAge);
            }
            predicateList.add(
                    predicate
            );

        }
        return cb.and(predicateList.toArray(new Predicate[0]));

    }

    public List<Object> getFilters(RespondentCriteria criteria, String filter) {
        CriteriaQuery<Object> criteriaQuery = cb.createQuery(Object.class);
        Root<Respondent> respondentRoot = criteriaQuery.from(Respondent.class);
        Join<Respondent, Answer> answers = respondentRoot.join("answers", JoinType.INNER);
        Predicate predicate = getPredicate(criteria, respondentRoot, answers);

        criteriaQuery.select(respondentRoot.get(filter)).distinct(true)
                .where(predicate);


        TypedQuery<Object> typedQuery = em.createQuery(criteriaQuery);
        List<Object> res = typedQuery.getResultList();
        return res;
    }
}

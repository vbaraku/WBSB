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


//    public HashMap<String, Float> findAllWithFilters(RespondentCriteria respondentCriteria) {
//        CriteriaQuery<Respondent> criteriaQuery = cb.createQuery(Respondent.class);
//        Root<Respondent> drUserRoot = criteriaQuery.from(Respondent.class);
//        Predicate predicate = getPredicate(respondentCriteria, drUserRoot);
//        criteriaQuery.where(predicate);
//
//        TypedQuery<Respondent> typedQuery = em.createQuery(criteriaQuery);
//        return typedQuery.getResultList();
//    }

//    public Long countAllCompleted(RespondentSearchCriteria userSearchCriteria) {
//        CriteriaQuery<Long> criteriaQuery = cb.createQuery(Long.class);
//
//        Root<Respondent> drUserRoot = criteriaQuery.from(Respondent.class);
//
//        Predicate predicate = getPredicate(userSearchCriteria, drUserRoot);
//
////        Metamodel m = em.getMetamodel();
////        EntityType<Answers> Answers_ = m.entity(Answers.class);
//
//        Join<Respondent, Answers> answers = drUserRoot.join("answers", JoinType.INNER);
//        criteriaQuery.select(cb.countDistinct(answers.get("user"))).where(predicate);
//
//        TypedQuery<Long> typedQuery = em.createQuery(criteriaQuery);
//        return typedQuery.getSingleResult();
//
//    }


    public Map<String, Float> getBreakdown(RespondentCriteria respondentCriteria) {
        CriteriaQuery<BreakdownQuery> criteriaQuery = cb.createQuery(BreakdownQuery.class);
        Root<Respondent> respondentRoot = criteriaQuery.from(Respondent.class);


        Join<Respondent, Answer> answers = respondentRoot.join("answers", JoinType.INNER);
//        Join<Questions, Answers> questions = answers.join("question", JoinType.INNER);
        Predicate predicate = getPredicate(respondentCriteria, respondentRoot, answers);

        HashMap<String, Float> resMap = new HashMap<>();


        criteriaQuery.multiselect(cb.count(answers.get("id")), answers.get("text"))
                .where(predicate)
                .groupBy(answers.get("text"));

        TypedQuery<BreakdownQuery> typedQuery = em.createQuery(criteriaQuery);
        List<BreakdownQuery> res = typedQuery.getResultList();
        Long sum = res.stream().mapToLong(el->el.getCount()).sum();
        res.forEach(el->resMap.put(el.getAnswer(), ((float)el.getCount()/sum*100f)));

        return resMap;
    }

    private HashMap<String, Double> getEmptyCategories() {
        HashMap<String, Double> averageQueries = new HashMap<>();
        String[] questions = {"Content and Curricula",
                "Collaboration and Networking",
                "Assessment practices",
                "Professional Development",
                "Infrastructure",
                "Leadership & Governance Practices",
                "Teaching and Learning Practices"};
       Arrays.asList(questions).stream().forEach(el->{
           averageQueries.put(el, 0d);
       });
       return averageQueries;
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

        predicateList.add(
                cb.equal(answerRoot.get("question"), userSearchCriteria.getQuestionId())
        );

        if (userSearchCriteria.getYear() != null){
            predicateList.add(
                    cb.equal(userRoot.get("year"), userSearchCriteria.getYear())
            );
        }

        String age = userSearchCriteria.getAge();
        if(age != null){
            Predicate predicate;

            if(age.equals("65+")) {
                predicate = cb.greaterThanOrEqualTo(userRoot.get("age"),65);
            }else{
                String[] ages = age.split("-");
                int startAge = Integer.parseInt(ages[0]);
                int endAge = Integer.parseInt(ages[1]);
                predicate = cb.between(userRoot.get("age"),startAge, endAge);
            }
            predicateList.add(
predicate
            );
        }
        return cb.and(predicateList.toArray(new Predicate[0]));

    }
}

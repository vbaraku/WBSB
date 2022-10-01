package com.example.demo.DRUser;

import com.example.demo.Answers.Answers;
import com.example.demo.Questions.Questions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.lang.reflect.Array;
import java.util.*;

@Repository
public class DRUserCriteriaRepository {
    private final EntityManager em;
    private final CriteriaBuilder cb;

    @Autowired
    public DRUserCriteriaRepository(EntityManager em) {
        this.em = em;
        this.cb = em.getCriteriaBuilder();
    }


    public List<DRUser> findAllWithFilters(DRUserSearchCriteria drUserSearchCriteria) {
        CriteriaQuery<DRUser> criteriaQuery = cb.createQuery(DRUser.class);
        Root<DRUser> drUserRoot = criteriaQuery.from(DRUser.class);
        Predicate predicate = getPredicate(drUserSearchCriteria, drUserRoot);
        criteriaQuery.where(predicate);

        TypedQuery<DRUser> typedQuery = em.createQuery(criteriaQuery);
        return typedQuery.getResultList();
    }

    public Long countAllCompleted(DRUserSearchCriteria userSearchCriteria) {
        CriteriaQuery<Long> criteriaQuery = cb.createQuery(Long.class);

        Root<DRUser> drUserRoot = criteriaQuery.from(DRUser.class);

        Predicate predicate = getPredicate(userSearchCriteria, drUserRoot);

//        Metamodel m = em.getMetamodel();
//        EntityType<Answers> Answers_ = m.entity(Answers.class);

        Join<DRUser, Answers> answers = drUserRoot.join("answers", JoinType.INNER);
        criteriaQuery.select(cb.countDistinct(answers.get("user"))).where(predicate);

        TypedQuery<Long> typedQuery = em.createQuery(criteriaQuery);
        return typedQuery.getSingleResult();

    }

    public Double getAverageScore(DRUserSearchCriteria userSearchCriteria) {
        CriteriaQuery<Double> criteriaQuery = cb.createQuery(Double.class);

        Root<DRUser> drUserRoot = criteriaQuery.from(DRUser.class);

        Predicate predicate = getPredicate(userSearchCriteria, drUserRoot);


        Join<DRUser, Answers> answers = drUserRoot.join("answers", JoinType.INNER);
        criteriaQuery.select(cb.avg(answers.get("rating"))).where(predicate);

        TypedQuery<Double> typedQuery = em.createQuery(criteriaQuery);
        Double res = typedQuery.getSingleResult();
        return res;

    }

    public Map<String, Double> getAverageScoreByThematic(DRUserSearchCriteria userSearchCriteria) {
        CriteriaQuery<AverageQuery> criteriaQuery = cb.createQuery(AverageQuery.class);

//        Root<Questions> questionsRoot = criteriaQuery.from(Questions.class);
        Root<DRUser> drUserRoot = criteriaQuery.from(DRUser.class);
//        Root<Answers> answersRoot = criteriaQuery.from(Answers.class);

        Predicate predicate = getPredicate(userSearchCriteria, drUserRoot);


        Join<DRUser, Answers> answers = drUserRoot.join("answers", JoinType.INNER);
        Join<Questions, Answers> questions = answers.join("question", JoinType.INNER);

        HashMap<String, Double> resMap = getEmptyCategories();


        criteriaQuery.multiselect(cb.avg(answers.get("rating")), questions.get("thematicElement")).where(predicate).groupBy(questions.get("thematicElement"));

        TypedQuery<AverageQuery> typedQuery = em.createQuery(criteriaQuery);
        List<AverageQuery> res = typedQuery.getResultList();
        res.forEach(el->resMap.put(el.getId(), el.getScore()));
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


    private Predicate getPredicate(DRUserSearchCriteria userSearchCriteria,
                                   Root<DRUser> userRoot) {
        List<Predicate> predicateList = new ArrayList<>();


        if (userSearchCriteria.getCountry() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("country"), userSearchCriteria.getCountry())
            );
        }

        if (userSearchCriteria.getSize() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("size"), userSearchCriteria.getSize())
            );
        }

        if (userSearchCriteria.getVetType() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("vetType"), userSearchCriteria.getVetType())
            );
        }

        if (userSearchCriteria.getEmail() != null) {
            predicateList.add(
                    cb.equal(userRoot.get("email"), userSearchCriteria.getEmail())
            );
        }

        return cb.and(predicateList.toArray(new Predicate[0]));

    }
}

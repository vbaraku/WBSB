package com.example.demo.DRUser;

import com.example.demo.Answers.Answers;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;

public class DRUserSpecifications {
    public static Specification<DRUser> equalCountry(String country) {
        if (country == null) {
            return null;
        }
        return (root, query, cb) -> cb.equal(root.get("country"), country);
    }

    public static Specification<DRUser> equalVetType(String vetType) {
        if (vetType == null) {
            return null;
        }
        return (root, query, cb) -> cb.equal(root.get("vetType"), vetType);
    }

    public static Specification<DRUser> equalSize(String equalSize) {
        if (equalSize == null) {
            return null;
        }
        return (root, query, cb) -> cb.equal(root.get("size"), equalSize);
    }

//    public static Specification<Answers> equalCountryJoin(String country) {
//        return (root, query, cb) -> {
//            Join<DRUser, Answers> moduleJoin = root.join("user", JoinType.LEFT);
//            final Predicate namePredicate = cb.equal(moduleJoin.get("country"), country);
//            return cb.and(namePredicate);
//        };
//    }

    public static Specification equalCountryJoin(String country) {
        return (root, query, cb) -> {
            Join<Answers, DRUser> moduleJoin = root.join("answers", JoinType.INNER);
            final Predicate namePredicate = cb.equal(root.get("country"), country);
            return cb.and(namePredicate);
        };
    }

    public static Specification<Answers> equalSizeJoin(String size) {
        return (root, query, cb) -> {
            Join<Answers, DRUser> moduleJoin = root.join("answers", JoinType.INNER);
            final Predicate namePredicate = cb.equal(root.get("size"), size);
            return cb.and(namePredicate);
        };
    }

    public static Specification<Answers> equalVetTypeJoin(String vetType) {
        return (root, query, cb) -> {
            Join<Answers, DRUser> moduleJoin = root.join("answers", JoinType.INNER);
            final Predicate namePredicate = cb.equal(root.get("vetType"), vetType);
            return cb.and(namePredicate);
        };
    }

    public static Specification<DRUser> distinct() {
        return (root, query, cb) -> {
            Join<Answers, DRUser> moduleJoin = root.join("answers", JoinType.INNER);
            query.distinct(true);
            return null;
        };
    }


}

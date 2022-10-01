package com.example.demo.Answers;

import java.util.List;

import com.example.demo.DRUser.DRUser;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Questions.Questions;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswersDao extends JpaRepository<Answers, Long>, JpaSpecificationExecutor<Answers> {
	List<Answers> findByUserIdContaining(String userId);

	@Query("select count(e) from Answers e group by e.user having count(e) >= 1")
	List<Long> getFinishedSurveys();

	@Query("select count(distinct a.user) from Answers a")
	Long countDistinctUsers();
}

package com.example.wbsb.Respondent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RespondentRepository extends JpaRepository<Respondent, Long>, JpaSpecificationExecutor<Respondent>{
}

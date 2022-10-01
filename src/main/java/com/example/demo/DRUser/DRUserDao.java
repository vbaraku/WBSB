package com.example.demo.DRUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DRUserDao extends JpaRepository<DRUser, Long>, JpaSpecificationExecutor<DRUser>{
    public Optional<DRUser> findByEmail(String email);
}

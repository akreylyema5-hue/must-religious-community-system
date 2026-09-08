package com.must.religious.repository;

import com.must.religious.entity.ProgramChangeApplication;
import com.must.religious.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgramChangeApplicationRepository
        extends JpaRepository<ProgramChangeApplication, Long> {

    List<ProgramChangeApplication> findByStudent(User student);

    List<ProgramChangeApplication> findByStatus(String status);

    boolean existsByStudentAndStatus(
            User student,
            String status);
}
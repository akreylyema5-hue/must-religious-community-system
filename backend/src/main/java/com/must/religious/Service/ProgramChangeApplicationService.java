package com.must.religious.Service;

import com.must.religious.entity.ProgramChangeApplication;
import com.must.religious.entity.User;
import com.must.religious.repository.ProgramChangeApplicationRepository;
import com.must.religious.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramChangeApplicationService {

    private final ProgramChangeApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public ProgramChangeApplicationService(
            ProgramChangeApplicationRepository applicationRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    public ProgramChangeApplication submitApplication(
            String email,
            ProgramChangeApplication application) {

        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (application.getRequestedProgramme() == null ||
                application.getRequestedProgramme().isBlank()) {

            throw new RuntimeException(
                    "Requested programme is required");
        }

        if (application.getReason() == null ||
                application.getReason().isBlank()) {

            throw new RuntimeException(
                    "Reason is required");
        }

        // Prevent multiple pending applications
        if (applicationRepository.existsByStudentAndStatus(
                student, "PENDING")) {

            throw new RuntimeException(
                    "You already have a pending programme change application");
        }

        application.setStudent(student);
        application.setStatus("PENDING");

        return applicationRepository.save(application);
    }

    public List<ProgramChangeApplication> getMyApplications(
            String email) {

        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return applicationRepository.findByStudent(student);
    }

    public ProgramChangeApplication getApplication(
            String email,
            Long applicationId) {

        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProgramChangeApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException(
                        "Application not found"));

        if (!application.getStudent()
                .getId()
                .equals(student.getId())) {

            throw new RuntimeException(
                    "You are not allowed to view this application");
        }

        return application;
    }
}
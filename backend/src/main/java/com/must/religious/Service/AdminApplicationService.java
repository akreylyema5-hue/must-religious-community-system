package com.must.religious.Service;

import com.must.religious.entity.ProgramChangeApplication;
import com.must.religious.entity.StudentProfile;
import com.must.religious.repository.ProgramChangeApplicationRepository;
import com.must.religious.repository.StudentProfileRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminApplicationService {

    private final ProgramChangeApplicationRepository applicationRepository;
    private final StudentProfileRepository profileRepository;

    public AdminApplicationService(
            ProgramChangeApplicationRepository applicationRepository,
            StudentProfileRepository profileRepository) {

        this.applicationRepository = applicationRepository;
        this.profileRepository = profileRepository;
    }

    public List<ProgramChangeApplication> getPendingApplications() {

        return applicationRepository.findByStatus("PENDING");
    }

    public ProgramChangeApplication getApplication(Long id) {

        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Application not found"));
    }

    public ProgramChangeApplication approveApplication(
            Long id,
            String comment) {

        ProgramChangeApplication application = getApplication(id);

        if (!"PENDING".equals(application.getStatus())) {
            throw new RuntimeException(
                    "Application has already been reviewed");
        }

        application.setStatus("APPROVED");
        application.setReviewedAt(LocalDateTime.now());
        application.setReviewComment(comment);

        StudentProfile profile = profileRepository
                .findByUser(application.getStudent())
                .orElseThrow(() -> new RuntimeException(
                        "Student profile not found"));

        profile.setProgramme(
                application.getRequestedProgramme());

        profileRepository.save(profile);

        return applicationRepository.save(application);
    }

    public ProgramChangeApplication rejectApplication(
            Long id,
            String comment) {

        ProgramChangeApplication application = getApplication(id);

        if (!"PENDING".equals(application.getStatus())) {
            throw new RuntimeException(
                    "Application has already been reviewed");
        }

        application.setStatus("REJECTED");
        application.setReviewedAt(LocalDateTime.now());
        application.setReviewComment(comment);

        return applicationRepository.save(application);
    }
}
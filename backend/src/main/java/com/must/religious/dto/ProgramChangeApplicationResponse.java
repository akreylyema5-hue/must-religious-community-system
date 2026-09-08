package com.must.religious.dto;

import com.must.religious.entity.ProgramChangeApplication;

import java.time.LocalDateTime;

public class ProgramChangeApplicationResponse {

    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String registrationNumber;

    private String currentProgramme;
    private String requestedProgramme;
    private String reason;
    private String status;
    private LocalDateTime submittedAt;
    private LocalDateTime reviewedAt;
    private String reviewComment;

    public ProgramChangeApplicationResponse(
            ProgramChangeApplication application) {

        this.id = application.getId();

        if (application.getStudent() != null) {
            this.studentId = application.getStudent().getId();
            this.studentName = application.getStudent().getFullName();
            this.studentEmail = application.getStudent().getEmail();
            this.registrationNumber = application.getStudent().getRegistrationNumber();
        }

        this.currentProgramme = application.getCurrentProgramme();

        this.requestedProgramme = application.getRequestedProgramme();

        this.reason = application.getReason();

        this.status = application.getStatus();

        this.submittedAt = application.getSubmittedAt();

        this.reviewedAt = application.getReviewedAt();

        this.reviewComment = application.getReviewComment();
    }

    public Long getId() {
        return id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public String getCurrentProgramme() {
        return currentProgramme;
    }

    public String getRequestedProgramme() {
        return requestedProgramme;
    }

    public String getReason() {
        return reason;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    public String getReviewComment() {
        return reviewComment;
    }
}
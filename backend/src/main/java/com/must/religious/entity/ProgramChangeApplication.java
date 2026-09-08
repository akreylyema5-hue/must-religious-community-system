package com.must.religious.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "program_change_applications")
public class ProgramChangeApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(nullable = false)
    private String currentProgramme;

    @Column(nullable = false)
    private String requestedProgramme;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    private LocalDateTime reviewedAt;

    private String reviewComment;

    public ProgramChangeApplication() {
    }

    @PrePersist
    public void onCreate() {

        if (submittedAt == null) {
            submittedAt = LocalDateTime.now();
        }

        if (status == null || status.isBlank()) {
            status = "PENDING";
        }
    }

    public Long getId() {
        return id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public String getCurrentProgramme() {
        return currentProgramme;
    }

    public void setCurrentProgramme(String currentProgramme) {
        this.currentProgramme = currentProgramme;
    }

    public String getRequestedProgramme() {
        return requestedProgramme;
    }

    public void setRequestedProgramme(String requestedProgramme) {
        this.requestedProgramme = requestedProgramme;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }

    public String getReviewComment() {
        return reviewComment;
    }

    public void setReviewComment(String reviewComment) {
        this.reviewComment = reviewComment;
    }
}
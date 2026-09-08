package com.must.religious.dto;

import com.must.religious.entity.StudentProfile;

public class StudentProfileResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String registrationNumber;

    private String programme;
    private String college;
    private String department;
    private Integer yearOfStudy;
    private String semester;
    private String status;

    public StudentProfileResponse(StudentProfile profile) {

        this.id = profile.getId();

        if (profile.getUser() != null) {
            this.userId = profile.getUser().getId();
            this.fullName = profile.getUser().getFullName();
            this.email = profile.getUser().getEmail();
            this.registrationNumber = profile.getUser().getRegistrationNumber();
        }

        this.programme = profile.getProgramme();
        this.college = profile.getCollege();
        this.department = profile.getDepartment();
        this.yearOfStudy = profile.getYearOfStudy();
        this.semester = profile.getSemester();
        this.status = profile.getStatus();
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public String getProgramme() {
        return programme;
    }

    public String getCollege() {
        return college;
    }

    public String getDepartment() {
        return department;
    }

    public Integer getYearOfStudy() {
        return yearOfStudy;
    }

    public String getSemester() {
        return semester;
    }

    public String getStatus() {
        return status;
    }
}
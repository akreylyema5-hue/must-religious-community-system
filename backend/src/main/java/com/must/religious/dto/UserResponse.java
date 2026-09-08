package com.must.religious.dto;

import com.must.religious.entity.User;

public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private String registrationNumber;
    private String role;

    public UserResponse(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.registrationNumber = user.getRegistrationNumber();
        this.role = user.getRole();
    }

    public Long getId() {
        return id;
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

    public String getRole() {
        return role;
    }
}
package com.must.religious.controller;

import com.must.religious.Service.StudentProfileService;
import com.must.religious.dto.StudentProfileResponse;
import com.must.religious.entity.StudentProfile;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student-profile")
@CrossOrigin(origins = "*")
public class StudentProfileController {

    private final StudentProfileService profileService;

    public StudentProfileController(
            StudentProfileService profileService) {

        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<?> createProfile(
            Authentication authentication,
            @RequestBody StudentProfile profile) {

        try {

            StudentProfile savedProfile = profileService.createProfile(
                    authentication.getName(),
                    profile);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new StudentProfileResponse(savedProfile));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getProfile(
            Authentication authentication) {

        try {

            StudentProfile profile = profileService.getProfile(
                    authentication.getName());

            return ResponseEntity.ok(
                    new StudentProfileResponse(profile));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @RequestBody StudentProfile profile) {

        try {

            StudentProfile updatedProfile = profileService.updateProfile(
                    authentication.getName(),
                    profile);

            return ResponseEntity.ok(
                    new StudentProfileResponse(updatedProfile));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
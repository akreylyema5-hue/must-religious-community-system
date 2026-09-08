package com.must.religious.controller;

import com.must.religious.Service.ProgramChangeApplicationService;
import com.must.religious.dto.ProgramChangeApplicationResponse;
import com.must.religious.entity.ProgramChangeApplication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/program-change")
@CrossOrigin(origins = "*")
public class ProgramChangeApplicationController {

    private final ProgramChangeApplicationService applicationService;

    public ProgramChangeApplicationController(
            ProgramChangeApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<?> submitApplication(
            Authentication authentication,
            @RequestBody ProgramChangeApplication application) {

        try {

            ProgramChangeApplication saved = applicationService.submitApplication(
                    authentication.getName(),
                    application);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                            new ProgramChangeApplicationResponse(saved));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getMyApplications(
            Authentication authentication) {

        try {

            List<ProgramChangeApplicationResponse> applications = applicationService
                    .getMyApplications(
                            authentication.getName())
                    .stream()
                    .map(ProgramChangeApplicationResponse::new)
                    .toList();

            return ResponseEntity.ok(applications);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getApplication(
            Authentication authentication,
            @PathVariable Long id) {

        try {

            ProgramChangeApplication application = applicationService.getApplication(
                    authentication.getName(),
                    id);

            return ResponseEntity.ok(
                    new ProgramChangeApplicationResponse(application));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
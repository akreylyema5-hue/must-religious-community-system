package com.must.religious.controller;

import com.must.religious.Service.AdminApplicationService;
import com.must.religious.dto.ProgramChangeApplicationResponse;
import com.must.religious.entity.ProgramChangeApplication;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/program-change")
@CrossOrigin(origins = "*")
public class AdminApplicationController {

    private final AdminApplicationService adminService;

    public AdminApplicationController(
            AdminApplicationService adminService) {

        this.adminService = adminService;
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ProgramChangeApplicationResponse>> getPendingApplications() {

        List<ProgramChangeApplicationResponse> applications = adminService.getPendingApplications()
                .stream()
                .map(ProgramChangeApplicationResponse::new)
                .toList();

        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getApplication(
            @PathVariable Long id) {

        try {

            ProgramChangeApplication application = adminService.getApplication(id);

            return ResponseEntity.ok(
                    new ProgramChangeApplicationResponse(application));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveApplication(
            @PathVariable Long id,
            @RequestBody ReviewRequest request) {

        try {

            ProgramChangeApplication application = adminService.approveApplication(
                    id,
                    request.getComment());

            return ResponseEntity.ok(
                    new ProgramChangeApplicationResponse(application));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectApplication(
            @PathVariable Long id,
            @RequestBody ReviewRequest request) {

        try {

            ProgramChangeApplication application = adminService.rejectApplication(
                    id,
                    request.getComment());

            return ResponseEntity.ok(
                    new ProgramChangeApplicationResponse(application));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    public static class ReviewRequest {

        private String comment;

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }
    }
}
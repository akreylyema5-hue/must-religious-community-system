package com.must.religious.controller;

import com.must.religious.Service.UserService;
import com.must.religious.entity.User;
import com.must.religious.security.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(
            UserService userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            User user = userService.login(
                    request.getEmail(),
                    request.getPassword());

            String token = jwtService.generateToken(
                    user.getEmail(),
                    user.getRole());

            return ResponseEntity.ok(
                    new LoginResponse(
                            token,
                            user.getId(),
                            user.getFullName(),
                            user.getEmail(),
                            user.getRegistrationNumber(),
                            user.getRole()));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    public static class LoginRequest {

        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class LoginResponse {

        private String token;
        private Long id;
        private String fullName;
        private String email;
        private String registrationNumber;
        private String role;

        public LoginResponse(
                String token,
                Long id,
                String fullName,
                String email,
                String registrationNumber,
                String role) {

            this.token = token;
            this.id = id;
            this.fullName = fullName;
            this.email = email;
            this.registrationNumber = registrationNumber;
            this.role = role;
        }

        public String getToken() {
            return token;
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
}
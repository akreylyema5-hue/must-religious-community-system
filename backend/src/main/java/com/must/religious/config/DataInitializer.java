package com.must.religious.config;

import com.must.religious.entity.User;
import com.must.religious.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            String adminEmail = "admin@must.ac.tz";

            if (!userRepository.existsByEmail(adminEmail)) {

                User admin = new User();

                admin.setFullName("System Administrator");
                admin.setEmail(adminEmail);
                admin.setRegistrationNumber("ADMIN001");

                admin.setPassword(
                        passwordEncoder.encode("Admin@1234"));

                admin.setRole("ADMIN");

                userRepository.save(admin);

                System.out.println(
                        "======================================");
                System.out.println(
                        "ADMIN ACCOUNT CREATED");
                System.out.println(
                        "Email: admin@must.ac.tz");
                System.out.println(
                        "Password: Admin@1234");
                System.out.println(
                        "======================================");
            }
        };
    }
}
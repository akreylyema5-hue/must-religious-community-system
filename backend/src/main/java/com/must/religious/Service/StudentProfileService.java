package com.must.religious.Service;

import com.must.religious.entity.StudentProfile;
import com.must.religious.entity.User;
import com.must.religious.repository.StudentProfileRepository;
import com.must.religious.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class StudentProfileService {

    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;

    public StudentProfileService(
            StudentProfileRepository profileRepository,
            UserRepository userRepository) {

        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public StudentProfile createProfile(
            String email,
            StudentProfile profile) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (profileRepository.findByUser(user).isPresent()) {
            throw new RuntimeException(
                    "Student profile already exists");
        }

        profile.setUser(user);

        if (profile.getStatus() == null ||
                profile.getStatus().isBlank()) {
            profile.setStatus("ACTIVE");
        }

        return profileRepository.save(profile);
    }

    public StudentProfile getProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException(
                        "Student profile not found"));
    }

    public StudentProfile updateProfile(
            String email,
            StudentProfile updatedProfile) {

        StudentProfile existingProfile = getProfile(email);

        existingProfile.setProgramme(
                updatedProfile.getProgramme());

        existingProfile.setCollege(
                updatedProfile.getCollege());

        existingProfile.setDepartment(
                updatedProfile.getDepartment());

        existingProfile.setYearOfStudy(
                updatedProfile.getYearOfStudy());

        existingProfile.setSemester(
                updatedProfile.getSemester());

        return profileRepository.save(existingProfile);
    }
}
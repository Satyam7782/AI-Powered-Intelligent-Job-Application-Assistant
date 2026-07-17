package com.jobassistant.service;

import com.jobassistant.dto.ProfileDTO;
import com.jobassistant.entity.Profile;
import com.jobassistant.entity.User;
import com.jobassistant.repository.ProfileRepository;
import com.jobassistant.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }

    @Transactional(readOnly = true)
    public ProfileDTO getProfile() {
        User user = getCurrentUser();
        Profile profile = profileRepository.findByUser(user).orElse(new Profile());
        return buildDTO(user, profile);
    }

    @Transactional
    public ProfileDTO saveProfile(ProfileDTO dto) {
        User user = getCurrentUser();

        // Update name if provided
        if (dto.getName() != null && !dto.getName().isBlank()) {
            user.setName(dto.getName());
            userRepository.save(user);
        }

        Profile profile = profileRepository.findByUser(user)
                .orElse(Profile.builder().user(user).build());

        profile.setEducation(dto.getEducation());
        profile.setSkills(dto.getSkills());
        profile.setProjects(dto.getProjects());
        profile.setExperience(dto.getExperience());
        profile.setCertifications(dto.getCertifications());
        profile.setCareerInterests(dto.getCareerInterests());

        Profile saved = profileRepository.save(profile);
        return buildDTO(user, saved);
    }

    private ProfileDTO buildDTO(User user, Profile profile) {
        return ProfileDTO.builder()
                .id(profile.getId())
                .name(user.getName())
                .email(user.getEmail())
                .education(profile.getEducation())
                .skills(profile.getSkills())
                .projects(profile.getProjects())
                .experience(profile.getExperience())
                .certifications(profile.getCertifications())
                .careerInterests(profile.getCareerInterests())
                .build();
    }
}

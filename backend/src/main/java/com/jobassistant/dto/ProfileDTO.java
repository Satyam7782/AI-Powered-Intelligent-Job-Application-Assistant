package com.jobassistant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String education;
    private String skills;
    private String projects;
    private String experience;
    private String certifications;
    private String careerInterests;
}

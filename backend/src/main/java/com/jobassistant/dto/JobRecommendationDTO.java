package com.jobassistant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class JobRecommendationDTO {
    private String title;
    private String company;
    private int matchPercentage;
    private String location;
    private String type;
    private List<String> skills;
    private String description;
}

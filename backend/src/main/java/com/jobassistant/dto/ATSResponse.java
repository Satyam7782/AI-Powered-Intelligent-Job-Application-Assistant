package com.jobassistant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ATSResponse {
    private int score;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> suggestions;
    private String summary;
}

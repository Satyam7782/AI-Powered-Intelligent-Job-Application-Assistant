package com.jobassistant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ResumeTailoringResponse {
    private String originalResume;
    private String tailoredResume;
    private List<String> improvements;
    private int improvementScore;
}
